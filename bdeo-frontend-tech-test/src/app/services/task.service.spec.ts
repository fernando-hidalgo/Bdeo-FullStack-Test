import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { Task } from '../models/task.model';
import { HOST } from '../app.constants';
import { AppEndpoints } from '../app.endpoints';

describe('TaskService', () => {
  let service: TaskService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    service = TestBed.inject(TaskService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve tasks from the API via GET', () => {
    const mockTasks: Task[] = [
      { _id: '1', title: 'Task 1', description: 'Description for Task 1' },
      { _id: '2', title: 'Task 2', description: 'Description for Task 2' }
    ];

    service.getTasks().subscribe(tasks => {
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpTestingController.expectOne(`${HOST}${AppEndpoints.TASKS}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockTasks);
  });

  it('should retrieve a task by ID from the API via GET', () => {
    const taskId = '1';
    const mockTask: Task = { _id: taskId, title: 'Task 1', description: 'Description for Task 1' };

    service.getTaskByID(taskId).subscribe(task => {
      expect(task).toEqual(mockTask);
    });

    const req = httpTestingController.expectOne(`${HOST}${AppEndpoints.TASKS}${taskId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockTask);
  });

  it('should send a task to the API via POST', () => {
    const newTask: Task = { _id: '3', title: 'Task 3', description: 'Description for Task 3' };

    service.createTask(newTask).subscribe(task => {
      expect(task).toEqual(newTask);
    });

    const req = httpTestingController.expectOne(`${HOST}${AppEndpoints.TASKS}`);
    expect(req.request.method).toEqual('POST');
    req.flush(newTask);
  });

  it('should update a task via PUT', () => {
    const taskId = '1';
    const updatedTask: Task = { _id: taskId, title: 'Updated Task 1', description: 'Updated Description' };

    service.editTask(taskId, updatedTask).subscribe(task => {
      expect(task).toEqual(updatedTask);
    });

    const req = httpTestingController.expectOne(`${HOST}${AppEndpoints.TASKS}${taskId}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(updatedTask);
  });

  it('should delete a task via DELETE', () => {
    const taskId = '1';
    const mockDeletedTask: Task = { _id: taskId, title: 'Task 1', description: 'Description for Task 1' };

    service.deleteTask(taskId).subscribe(task => {
      expect(task).toEqual(mockDeletedTask);
    });

    const req = httpTestingController.expectOne(`${HOST}${AppEndpoints.TASKS}${taskId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(mockDeletedTask);
  });
});


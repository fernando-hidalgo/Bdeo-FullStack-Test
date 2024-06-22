import { Component } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-v-home',
  templateUrl: './v-home.component.html',
  styleUrl: './v-home.component.scss'
})
export class VHomeComponent {

  constructor(private taskService: TaskService) { }

  tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$?: Observable<Task[]> = this.tasksSubject.asObservable();
  private destroy$: Subject<void> = new Subject<void>();

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(tasks => {
        this.tasksSubject.next(tasks);
      });
  }

  onTaskDeleted(taskId: string) { //TODO: Warning Modal
    const currentTasks = this.tasksSubject.getValue();
    const updatedTasks = currentTasks.filter(task => task._id !== taskId);
    this.tasksSubject.next(updatedTasks);
  }

}

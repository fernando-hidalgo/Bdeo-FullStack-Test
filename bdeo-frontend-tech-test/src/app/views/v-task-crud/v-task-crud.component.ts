import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CRUDFormFields, Navigation, TaskStatus, URLParams } from '../../app.constants';
import { Task } from '../../models/task.model';
import { switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-v-task-crud',
  templateUrl: './v-task-crud.component.html',
  styleUrl: './v-task-crud.component.scss'
})
export class VTaskCrudComponent {
  crudForm!: FormGroup;
  selectedStatus: string | undefined;
  statusOptions: string[] = Object.values(TaskStatus)
  currentUrl: string | undefined;
  taskId: string | undefined;
  taskStatus: string | undefined; // Estado actual de la tarea

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.crudForm = this.fb.group({
      taskTitle: [{ value: '', disabled: false }, {
        validators: [Validators.required],
        updateOn: 'change' // or 'blur' or 'submit'
      }],
      taskDescription: ['', {
        validators: [Validators.required],
        updateOn: 'change' // or 'blur' or 'submit'
      }],
      taskStatus: ['', {
        validators: [Validators.required],
        updateOn: 'change' // or 'blur' or 'submit'
      }],
    });
  }

  ngOnInit(): void {
    this.currentUrl = this.router.url;
    if (this.currentUrl.includes(Navigation.EDIT)) {
      this.route.paramMap.pipe(
        switchMap(params => {
          this.taskId = params.get(URLParams.taskId) ?? '';
          return this.taskService.getTaskByID(this.taskId).pipe(take(1));
        })
      ).subscribe(data => {
        this.crudForm.patchValue({
          taskTitle: data.title,
          taskDescription: data.description,
          taskStatus: data.status,
        });
        this.taskStatus = data.status;
  
        // Enable or disable taskTitle based on taskStatus
        if (this.taskStatus !== TaskStatus.TODO) {
          this.crudForm.get(CRUDFormFields.taskTitle)?.disable();
        } else {
          this.crudForm.get(CRUDFormFields.taskTitle)?.enable();
        }
      });
    }
  }

  isOptionDisabled(option: string): boolean { //Validates the status pipeline To Do <-> In Progress <-> Done
    return (
      (this.taskStatus === TaskStatus.TODO && option === TaskStatus.DONE) ||
      (this.taskStatus === TaskStatus.DONE && option === TaskStatus.TODO)
    );
  }

  onStatusSelected(event: any): void {
    this.selectedStatus = event.value;
  }

  createTask() {
    const { taskTitle, taskDescription, taskStatus } = this.crudForm.value;
    const task: Task = {
      title: taskTitle,
      description: taskDescription,
      status: taskStatus,
    };

    const saveTask$ = this.taskId ?
      this.taskService.editTask(this.taskId, task) :
      this.taskService.createTask(task);

    saveTask$.pipe(
      tap(() => this.router.navigate([Navigation.BASE]))
    ).subscribe();
  }
}

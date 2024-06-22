import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { Navigation } from '../../app.constants';

@Component({
  selector: 'app-c-task-card',
  templateUrl: './c-task-card.component.html',
  styleUrl: './c-task-card.component.scss'
})
export class CTaskCardComponent {
  @Input() id: string | undefined
  @Input() title: string | undefined
  @Input() description: string | undefined
  @Input() status: string | undefined

  @Output() taskDeleted = new EventEmitter<string>();

  constructor(private taskService: TaskService,private router: Router) { }

  editTask() {
    const currentUrl = this.router.url;
    this.router.navigate([this.id, Navigation.EDIT]);
  }

  deleteTask(){
    if (this.id) {
      this.taskService.deleteTask(this.id).subscribe(() => {
        this.taskDeleted.emit(this.id);
      })
    }
  }
}

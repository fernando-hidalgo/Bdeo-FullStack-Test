import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VTaskCrudComponent } from './v-task-crud.component';

const routes: Routes = [
  {
    path: '',
    component: VTaskCrudComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VTaskCrudRoutingModule { }
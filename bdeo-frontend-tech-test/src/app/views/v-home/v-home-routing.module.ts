import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VHomeComponent } from './v-home.component';

const routes: Routes = [
  {
    path: '',
    component: VHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VHomeRoutingModule { }
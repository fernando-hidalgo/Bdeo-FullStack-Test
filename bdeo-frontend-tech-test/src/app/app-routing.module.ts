import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '', component: AppComponent, children: [
      {
        path: '',
        loadChildren: () => import('./views/v-home/v-home.module').then(x => x.VHomeModule)
      },
      {
        path: 'new',
        loadChildren: () => import('./views/v-task-crud/v-task-crud.module').then(x => x.VTaskCrudModule)
      },
      {
        path: ':taskId/edit',
        loadChildren: () => import('./views/v-task-crud/v-task-crud.module').then(x => x.VTaskCrudModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

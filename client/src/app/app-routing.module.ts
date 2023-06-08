import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponentComponent } from './pages/auth/login-component/login-component.component';
import { RegisterComponentComponent } from './pages/auth/register-component/register-component.component';
import { PageNotFoundComponent } from './partials/page-not-found/page-not-found.component';
import { TaskIndexComponentComponent } from './pages/task/task-index-component/task-index-component.component';
import { TrashIndexComponentComponent } from './pages/trash/trash-index-component/trash-index-component.component';
import { TaskDashboardComponentComponent } from './pages/task/task-dashboard-component/task-dashboard-component.component';
import { TaskEditComponentComponent } from './pages/task/task-edit-component/task-edit-component.component';

const routes: Routes = [
  //ROUTE EMPTY
  {path: '', component: LoginComponentComponent},

  //ROUTE AUTH
  {path: 'login', component: LoginComponentComponent},
  {path: 'register', component: RegisterComponentComponent},

  //ROUTES TASK
  {path: 'dashboard', component: TaskDashboardComponentComponent},
  {path: 'task', component: TaskIndexComponentComponent},
  {path: 'task/edit/:id', component: TaskEditComponentComponent},

  //ROUTE TRASH
  {path: 'tash', component: TrashIndexComponentComponent},

  //ROUTE 404
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

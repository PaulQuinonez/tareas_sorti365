import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './pages/auth/login-component/login-component.component';
import { RegisterComponentComponent } from './pages/auth/register-component/register-component.component';
import { SidebarComponent } from './partials/sidebar/sidebar.component';
import { PageNotFoundComponent } from './partials/page-not-found/page-not-found.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TaskIndexComponentComponent } from './pages/task/task-index-component/task-index-component.component';
import { TaskEditComponentComponent } from './pages/task/task-edit-component/task-edit-component.component';
import { TrashIndexComponentComponent } from './pages/trash/trash-index-component/trash-index-component.component';
import { TaskDashboardComponentComponent } from './pages/task/task-dashboard-component/task-dashboard-component.component';
import { NavbarComponent } from './partials/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    RegisterComponentComponent,
    SidebarComponent,
    PageNotFoundComponent,
    TaskIndexComponentComponent,
    TaskEditComponentComponent,
    TrashIndexComponentComponent,
    TaskDashboardComponentComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

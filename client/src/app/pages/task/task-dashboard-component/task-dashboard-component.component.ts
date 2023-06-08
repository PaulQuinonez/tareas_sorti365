import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-task-dashboard-component',
  templateUrl: './task-dashboard-component.component.html',
  styleUrls: ['./task-dashboard-component.component.css']
})
export class TaskDashboardComponentComponent implements OnInit {

  public identity : any
  public tarea : any;
  public tareas : any
  public contadorTareas : any;
  public contadorPending : any = 0;
  public contadorComplete : any = 0;
  public contadorTrashed : any = 0;

  constructor(
    public _tareaService : TaskService,
    public _authService : AuthService,
    private _router: Router
  ) {
    this.identity = this._authService.getIdentity();
  }

  ngOnInit(): void {
    if(this.identity.cedula){
      this.contadorTaskTotal();
    }
  }

  contadorTaskTotal(){
    this._tareaService.get_tareaUser(this.identity.id).subscribe(
      response => {
        this.tarea = response.tarea
        this.contadorTaskTotal = this.tarea.length

        this.tarea.forEach((element: { estado: string; }) => {
          if(element.estado === "Pending"){
            this.contadorPending++
          }else if (element.estado === "Complete") {
            this.contadorComplete++;
          } else if (element.estado === "Dashing") {
            this.contadorTrashed++;
          }
        });
      }
    )
  }

  recentTasks(){
    this._tareaService.get_tareaUser(this.identity.id).subscribe(
      response => {
        this.tareas = response.tarea.slice(0,5);
      }
    )
  }

}

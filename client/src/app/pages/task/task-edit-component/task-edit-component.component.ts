import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { TaskService } from 'src/app/core/services/task.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-edit-component',
  templateUrl: './task-edit-component.component.html',
  styleUrls: ['./task-edit-component.component.css']
})
export class TaskEditComponentComponent implements OnInit {

  public tarea: any;
  // public filtroText: any;
  public p: any;
  public identity: any;
  public dificul: number = 0;
  public tarea_id: any;
  public id: any;

  constructor(
    private _tareaService: TaskService,
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this, this.identity = this._authService.getIdentity();
  }

  ngOnInit(): void {
    if (this.identity.cedula) {
      this._route.params.subscribe(params => {
        this.id = params['id'];
        this._tareaService.get_tareaById(this.id).subscribe(
          response => {
            console.log(response.tarea);

            this.tarea = response.tarea,
              this.dificul = response.tarea.dificultad
          }
        )
      })
    } else {
      this._router.navigate(['']);
    }
  }

  editar_task(taskForm: any) {
    if (taskForm.valid) {
      this._tareaService.put_tareas({
        id: this.id,
        titulo: taskForm.value.titulo,
        descripcion: taskForm.value.descripcion,
        dificultad: this.dificul,
      }).subscribe(
        response => {

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tarea actualizada correctamente!',
            footer: '<p>Sorti 365</p>',
            showConfirmButton: false,
            timer: 1500
          })

          this._router.navigate(['task'])

        },
        error => {

        }
      )


    } else {
      Swal.fire({
        icon: 'error',
        title: 'Algo salió mal!',
        text: 'Rellena todos los campos del formulario!',
        footer: '<p>Sorti 365</p>'
      })
    }
  }

}

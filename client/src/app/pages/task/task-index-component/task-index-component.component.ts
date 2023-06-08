import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tarea } from 'src/app/core/models/taskModel';
import { AuthService } from 'src/app/core/services/auth.service';
import { TaskService } from 'src/app/core/services/task.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-index-component',
  templateUrl: './task-index-component.component.html',
  styleUrls: ['./task-index-component.component.css']
})
export class TaskIndexComponentComponent implements OnInit {

  public tareas: any;
  public tarea: any;
  public id : any;
  public filtrotext : any;
  public change: {} | undefined;
  public changF: {} | undefined;
  // public filtroText: any;
  public p: any;
  public identity: any;
  public dificul: number = 0;
  public tarea_id: any;

  constructor(
    private _tareaService: TaskService,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.tarea = new Tarea('', '', '', 1, '', '');
    this.identity = this._authService.getIdentity();
  }

  ngOnInit(): void {

    if (this.identity.cedula) {
      this.getTaskUser();
    } else {
      this._router.navigate(['']);
    }
  }

  setState(id: any) {
    this.identity = this._authService.getIdentity()
    if(this.identity.cedula){
      this._tareaService.get_tareaById(id).subscribe(
        response => {
          if (response.tarea.estado == 'Pending') {
            this.change = {
              id: id,
              estado: 'In Progress'
            }
          } else {
            if (response.tarea.estado == 'In Progress') {
              this.change = {
                id: id,
                estado: 'Complete'
              }
            } else {
              this.change = {
                id: id,
                estado: 'Pending'
              }
            }
          }
          this._tareaService.put_estado(this.change).subscribe(
            response => {
              this.getTaskUser();
            }
          )
        }
      )
    } else {
      this._router.navigate(['']);
    }

  }

  discard(id: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-3',
        cancelButton: 'btn btn-danger mx-3'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Seguro quieres desechar la tarea?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, desechar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Desechada!',
          'La tarea fue desechada correctamente.',
          'success'
        )
        this.change = {
          id: id,
          estado: 'Dashing'
        }
        this._tareaService.put_estado(this.change).subscribe(
          response => {
            this.getTaskUser();
          },
          error => {

          }
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Se canceló la petición',
          'error'
        )
      }
    })
  }

  getTaskUser() {
    this._tareaService.get_tarea(this.identity.id).subscribe(
      response => {
        this.tareas = response.tarea;
      }
    )
  }

  search(searchForm : any){
    this.changF = {
      id : this.identity.id,
      filtro : searchForm.value.filtro
    }
    this._tareaService.filtroTask(this.changF).subscribe(
      response =>{
        this.tareas = response.tarea;
      },
      error => {

      }
    )
  }

  registrar_task(taskForm: any) {
    if (taskForm.valid) {
      var data = {
        titulo: taskForm.value.titulo,
        descripcion: taskForm.value.descripcion,
        dificultad: this.dificul,
        IdUsuario: this.identity.id
      }

      this._tareaService.post_tarea(data).subscribe(
        response => {
          this._tareaService.get_tareaUser(this.identity.id).subscribe(
            response => {
              this.tareas = response.tarea;
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Tarea registrada correctamente!',
                footer: '<p>Sorti 365 System</p>',
                showConfirmButton: false,
                timer: 1500
              })
            }
          )
        },
        error => {

        }
      )

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Algo salió mal!',
        text: 'Rellena todos los campos del formulario!',
        footer: '<p>Sorti 365 System</p>'
      })
    }

  }

  obtenerIdTarea(id: any) {
    this.tarea_id = id
  }

}

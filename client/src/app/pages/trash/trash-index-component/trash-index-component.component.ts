import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { TaskService } from 'src/app/core/services/task.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trash-index-component',
  templateUrl: './trash-index-component.component.html',
  styleUrls: ['./trash-index-component.component.css']
})
export class TrashIndexComponentComponent implements OnInit {

  public tareas : any;
  public p: any;
  public identity: any;
  public id : any;
  public filtrotext : any;
  public changF: {} | undefined;
  public dificul: number = 0;
  public tarea_id: any;
  public change: {} | undefined;

  constructor(
    private _tareaService: TaskService,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.identity = this._authService.getIdentity();
  }

  ngOnInit(): void {
    if(this.identity.cedula){
      this.getTaskTrash()
    } else {
      this._router.navigate([''])
    }
  }

  recovery(id: any){
    this.change = {
      id : id,
      estado : 'Pending'
    }
    this._tareaService.put_estado(this.change).subscribe(
      response => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Tarea recuperada correctamente!',
          footer: '<p>Sorti 365 System</p>',
          showConfirmButton: false,
          timer: 1500
        })
        this.getTaskTrash();
      }
    )
  }

  search(searchForm : any){
    this.changF = {
      id : this.identity.id,
      filtro : searchForm.value.filtro
    }
    this._tareaService.filtroTrash(this.changF).subscribe(
      response =>{
        this.tareas = response.tarea;
      },
      error => {

      }
    )
  }

  getTaskTrash() {
    this._tareaService.get_trashById(this.identity.id).subscribe(
      response => {
        this.tareas = response.tarea
      }
    )
  }


  delete(id: any){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-3',
        cancelButton: 'btn btn-danger mx-3'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Seguro quieres eliminar la tarea?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Eliminado!',
          'La tarea fue eliminada correctamente.',
          'success'
        )

        this._tareaService.eliminar_tarea(id).subscribe(
          response => {
            this._tareaService.get_trashById(this.identity.id).subscribe(
              response => {
                this.tareas = response.tarea;
              },
              error => {

              }
            )
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

}

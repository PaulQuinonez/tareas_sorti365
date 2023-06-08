import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/models/userModel';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponentComponent implements OnInit {

  public user: any;
  public identity: any;
  public data_error: any;

  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) {
    this.user = new Usuario('', '', '', '', '', '', '');
    this.identity = this._authService.getIdentity();
  }

  ngOnInit(): void {
    if (this.identity.cedula) {
      this._router.navigate(['dashboard'])
    }
  }

  onSubmit(userForm: any) {
    if (userForm.valid) {
      this._authService.post_users({
        nombres: userForm.value.nombres,
        apellidos: userForm.value.apellidos,
        cedula: userForm.value.cedula,
        telefono: userForm.value.telefono,
        correo: userForm.value.correo,
        password: userForm.value.password,
      }).subscribe(
        response => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario Registrado con Exito!',
            footer: '<p>Sorti 365 System<</p>',
            showConfirmButton: false,
            timer: 1500
          });
          this.user = new Usuario('', '', '', '', '', '', '');
          this._router.navigate(['login'])
        }, error =>
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: "Ocurrió un error!",
          text: this.data_error = error.error.message,
          showConfirmButton: false,
          timer: 1500
        })
      )
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Algo salio mal!',
        text: 'Rellena todos los campos!',
        footer: '<p>Sorti 365 System</p>',
      })
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/models/userModel';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  public user : any;
  public token: any;
  public identity: any;
  public data_error: any;
  public email_userText: any;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
    this.identity = this._authService.getIdentity();
    this.user = new Usuario('', '', '', '', '', '', '');
   }

  ngOnInit(): void {
    if(this.identity.cedula){
      this._router.navigate(['dashboard'])
    }
  }

  login(loginForm: any) {
    if (loginForm.valid) {
      this._authService.login(this.user).subscribe(
        response => {
          this.token = response.jwt;
          localStorage.setItem('token', this.token);

          this._authService.login(this.user, true).subscribe(
            response => {
              localStorage.setItem('identity', JSON.stringify(response.user));
              this._router.navigate(['dashboard'])
            }
          )

        }, error => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: "Ocurrió un error!",
            text: this.data_error = error.error.message,
            showConfirmButton: false,
            footer: '<p>Sorti 365 Tareas</p>',
            timer: 2000
          })
      })

    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: "Ocurrió un error!",
        text: "Debes rellenar todo los campos del formulario",
        showConfirmButton: false,
        footer: '<p>Sorti 365 Tareas</p>',
        timer: 2000
      })
    }
  }

  forgot_password(forgotPasswordForm : any){
    if(forgotPasswordForm.valid){
      this._authService.forgotPassword({
        correo : forgotPasswordForm.value.email_user,
      }).subscribe(
        response => {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Correo Enviado con exito!',
                footer: '<p>Sorti 365 System</p>',
                showConfirmButton: false,
                timer: 1500
              })
        },error=>{
          Swal.fire({
            icon: 'error',
            title: 'Algo salió mal!',
            text: (this.data_error = error.error.message),
            footer: '<p>Sorti 365 System</p>'
          })
        }
      )
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Algo salió mal!',
        text: 'Rellena todos los campos del formulario',
        footer: '<p>Sorti 365 System</p>'
      })
    }
  }

}

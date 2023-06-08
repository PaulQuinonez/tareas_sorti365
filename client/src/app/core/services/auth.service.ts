import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public url: any;
  public token: any;
  public identity: any;

  constructor(
    private _http: HttpClient
  ) {
    this.url = environment.apiUrl;
  }

  login(user: any, getToken = false): Observable<any> {
    const json = user;

    if (getToken != false) {
      user.getToken = true;
    }

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'usuario/ingresar', json, { headers: headers });
  }

  getToken(): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      this.token = token;
    } else {
      this.token = null;
    }

    return this.token;
  }

  getIdentity(): Observable<any> {

    const identity = JSON.parse(localStorage.getItem('identity') || '[]');

    if (identity) {
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return identity;

  }

  forgotPassword(data: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'usuario/olvidarContrasena', data, { headers: headers })
  }

  post_users(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'usuario/registrarse', data, { headers: headers })
  }

}

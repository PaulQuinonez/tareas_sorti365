import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url: any;
  public token: any;

  constructor(
    private _http : HttpClient,
  ) {
    this.url = environment.apiUrl;
  }

  get_user(id:any) : Observable<any>{

    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'usuario/' + id, {headers : headers})

  }

  put_user(data:any) : Observable<any> {
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url + 'usuario/actualizar/' + data._id ,data , {headers : headers})
  }
}

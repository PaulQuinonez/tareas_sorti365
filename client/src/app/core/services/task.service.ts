import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tarea } from '../models/taskModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public url : any;
  public tarea : any;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = environment.apiUrl;
    this.tarea = new Tarea('', '', '', 1, '', '');
  }

  post_tarea(data:any) : Observable<any> {
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'tarea/crear' ,data , {headers : headers})
  }

  get_tareas(id:any) : Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'tarea/buscarTareas/' + id, {headers : headers})
  }

  get_tareaUser(id:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'tarea/BuscarTareasUsuario/' + id, {headers:headers})
  }

  get_tareaById(id:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'tarea/BuscarTareasId/' + id, {headers:headers})
  }

  put_tareas(data:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url + 'tarea/editar/' + data.id, data, {headers:headers})
  }

  put_estado(data:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url + 'tarea/editarEstado/' + data.id, data, {headers:headers})
  }

  eliminar_tarea(id:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url + 'tarea/eliminar/' + id, {headers:headers})
  }

  get_trashById(id:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'tarea/basura/' + id, {headers:headers})
  }

  get_tarea(id:any) : Observable<any>{

    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url + 'tarea/' + id, {headers : headers})

  }

  filtro(data:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'tarea/filtro/' + data.id, data, {headers:headers})
  }

  filtroTask(data:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'tarea/filtroTasks/' + data.id, data, {headers:headers})
  }

  filtroTrash(data:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url + 'tarea/filtroTrash/' + data.id, data, {headers:headers})
  }
}

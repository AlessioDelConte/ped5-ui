import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InternalService {

  constructor(private http: HttpClient) { }

  getServerName(): Observable<any> {
    const url = environment.ws;
    return this.http.get(url);
  }
}

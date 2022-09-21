import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExternalService {

  constructor(private http: HttpClient) { }

  getUniprotData(uniprotACC): Observable<any> {
    const url = "https://www.ebi.ac.uk/proteins/api/proteins?offset=0&size=100&format=json&accession=" + uniprotACC;
    return this.http.get(url, {
      responseType: 'json'
    });
  }

  getDisprotProtData(uniprotACC, params): Observable<any> {
    const url = "https://disprot.org/api/" + uniprotACC;
    return this.http.get(url, {
      responseType: 'json', 
      params: params
    });
  }
}

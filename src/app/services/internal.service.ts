import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class InternalService {
    public ws = environment.ws;

    constructor(private http: HttpClient, private router: Router) {
    }

    public basicErrorHandler = (err) => {
        console.log('err', err);
        if (err.status === 404) this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
          this.router.navigate(["/notfound"]);
        });
      }

    getServerName(): Observable<any> {
        const url = environment.ws;
        return this.http.get(url);
    }

    getHomeStats(): Observable<any> {
        const url = environment.ws + 'statistics/';
        return this.http.get(url);
    }

    getEntry(params): Observable<any> {
        const url = environment.ws + 'entries/';
        return this.http.get(url, {
            responseType: 'json',
            params: params
        });
    }

    getPublicEntry(entryId): Observable<any> {
        const url = environment.ws + 'entries/' + entryId + "/";
        return this.http.get(url, {
            responseType: 'json'
        });
    }

    searchEntries(params): Observable<any> {
        const url = environment.ws + 'entries/' /* Add query string */;
        return this.http.get(url, { 
            responseType: 'json',
            params: params
        });
    }

    getDSSPConsensus(entryId, ensembleId, onlyFeatures=false): Observable<any>{
        const url = environment.ws + 'entries/' + entryId + "/ensembles/" + ensembleId + "/dssp-consensus/";
        return this.http.get(url, {
            responseType: 'json'
        });
    }

    getOntology(): Observable<any> {
        const url = environment.ws + 'get_ontology/';
        return this.http.get(url, {
            responseType: 'json'
        });
    }

}

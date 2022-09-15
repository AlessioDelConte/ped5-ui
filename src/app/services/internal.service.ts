import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InternalService {

    constructor(private http: HttpClient) {
    }

    getServerName(): Observable<any> {
        const url = environment.ws;
        return this.http.get(url);
    }

    getEntry(params): Observable<any> {
        const url = environment.ws + 'entries/';
        return this.http.get(url, {
            responseType: 'json',
            params: params
        });
    }

    getPublicEntry(entryIdentifier): Observable<any> {
        const url = environment.ws + 'entries/' + entryIdentifier + "/";
        return this.http.get(url, {
            responseType: 'json'
        });
    }

    searchEntries(params): Observable<any> {
        // TODO add params to query string
        const url = environment.ws + 'entries/' /* Add query string */;
        return this.http.get(url, {
            responseType: 'json'
        });
    }

}

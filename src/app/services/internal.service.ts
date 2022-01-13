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

    GetLogOut(): Observable<any> {
        const url = environment.ws + 'logout';
        return this.http.get(url, {responseType: 'json'});
    }

    GetAuth(): Observable<any> {
        const url = environment.ws + 'profile';
        return this.http.get(url, {responseType: 'json'});
    }

    getServerName(): Observable<any> {
        const url = environment.ws;
        return this.http.get(url);
    }

    postSubmission(files): Observable<any> {
        const url = environment.ws + 'submission';
        return this.http.post(url, files,
            {
                reportProgress: true,
                observe: 'events'
            });
    }

    getEntry(params): Observable<any> {
        const url = environment.ws + 'entries';
        return this.http.get(url, {
            responseType: 'json',
            params: params
        });
    }

    getPublicEntry(entryIdentifier): Observable<any> {
        const url = 'https://proteinensemble.org/api/' + entryIdentifier;
        return this.http.get(url, {
            responseType: 'json'
        });
    }

    sendTask(formData): Observable<any> {
        const url = environment.submission_server + 'task/';
        return this.http.post(url, formData,
            {
                reportProgress: true,
                observe: 'events'
            });
    }

    getFile(submissionID, fileName): Observable<any> {
        const url = environment.submission_server + 'task/' + submissionID + '/file/' + fileName;
        return this.http.get(url, {responseType: 'json'});
    }


}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InternalService {

    constructor(private http: HttpClient) {
    }

    GetLogOut(): Observable<any> {
        const url = environment.ws + 'logout';
        return this.http.get(url, { responseType: 'json' });
    }

    GetAuth(): Observable<any> {
        const url = environment.ws + 'profile';
        return this.http.get(url, { responseType: 'json' });
    }

    getServerName(): Observable<any> {
        const url = environment.ws;
        return this.http.get(url);
    }

    getOntology(): Observable<any> {
        const url = environment.ws + 'get_ontology';
        return this.http.get(url, {
            responseType: 'json'
        });
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
        const url = environment.ws + 'jobs/';
        return this.http.post(url, formData,
            {
                reportProgress: true,
                observe: 'events'
            });
    }

    getJobs(): Observable<any> {
        const url = environment.ws + 'jobs/';
        return this.http.get(url, { responseType: 'json' });
    }

    getJob(entryIdentifier): Observable<any> {
        const url = environment.ws + 'jobs/' + entryIdentifier;
        return this.http.get(url, {
            responseType: 'json'
        });
    }

    getDrafts(): Observable<any> {
        const url = environment.ws + 'drafts/';
        return this.http.get(url, { responseType: 'json' });
    }

    getDraft(entryIdentifier): Observable<any> {
        const url = environment.ws + 'drafts/' + entryIdentifier;
        return this.http.get(url, {
            responseType: 'json'
        });
    }

    patchDraft(entryIdentifier, patchValues): Observable<any> {
        const url = environment.ws + 'drafts/' + entryIdentifier + "/";
        return this.http.patch(url, patchValues, { responseType: 'json' });
    }

    upgradeToDraft(job_id: string, cover_letter: string): Observable<any> {
        const url = environment.ws + 'drafts/';
        return this.http.post(url, {
            job_id: job_id,
            cover_letter: cover_letter
        }, { responseType: 'json' });
    }

    getFile(submissionID, fileName): Observable<any> {
        const url = environment.submission_server + 'task/' + submissionID + '/file/' + fileName;
        return this.http.get(url, { responseType: 'json' });
    }

    searchPMC(query): Observable<any> {
        return this.http.get(environment.pmcURL + query, { responseType: 'json' });
    }

    searchTaxonomyById(tax_id): Observable<any> {
        return this.http.get(environment.enaTaxonomy + tax_id, { responseType: 'json' });
    }
}

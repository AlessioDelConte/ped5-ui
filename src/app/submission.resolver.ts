import {Injectable} from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {InternalService} from './services/internal.service';
import {catchError} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class SubmissionResolver implements Resolve<any> {
    constructor(private internalService: InternalService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        if (/PED\d{5}/.test(route.queryParams.entry_id)) {
            return this.internalService.getPublicEntry(route.queryParams.entry_id).pipe(
                catchError((error) => {
                    return of({
                        no_valid_entry_id: true
                    });
                })
        );
        } else if (/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(route.queryParams.submission_id)) {
            return this.internalService.getEntry({
                submission_id: route.queryParams.submission_id
            }).pipe(
                catchError((error) => {
                    return of({
                        no_valid_submission_id: true
                    });
                })
            );
        }
        return of({});
    }
}

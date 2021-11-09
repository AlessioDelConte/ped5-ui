import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {InternalService} from './internal.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    profileObj = new BehaviorSubject<object>({
        authorized: false
    });

    constructor(private internalService: InternalService) {
    }

    authentication(): void {
        this.internalService.GetAuth().subscribe(
            profileObj => {
                if (this.profileObj.value !== profileObj) {
                    this.profileObj.next(profileObj);
                }
            },
            error => {
                this.profileObj.next({
                    authorized: false
                });
            },
            () => {
                console.log('authentication finished');
            });
    }

    logout(): void {
        this.internalService.GetLogOut().subscribe(result => {
            this.profileObj.next({
                authorized: false
            });
        }, error => {
        }, () => {
        });
    }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { InternalService } from './internal.service';

export interface UserProfile {
    orcid?: string,
    displayedName?: string,
    role?: string
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    profileObj = new BehaviorSubject<UserProfile>({
    });

    constructor(private internalService: InternalService, private router: Router) {
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
                });
            },
            () => {
                console.log('authentication finished');
            });
    }

    logout(): void {
        this.internalService.GetLogOut().subscribe(result => {
            this.profileObj.next({
            });
            this.router.navigateByUrl('/').then(() => {
                this.router.navigate(['/']);
            });
        }, error => {
            this.profileObj.next({
            });
            this.router.navigateByUrl('/').then(() => {
                this.router.navigate(['/']);
            });
        });
    }
}

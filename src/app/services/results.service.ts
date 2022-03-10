import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { InternalService } from './internal.service';

export enum ResultsServiceMode {
  JOB = "job",
  DRAFT = "draft",
  PUBLIC = "public"
}

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  public currViewMode: ResultsServiceMode;
  public currentUUID: string;

  public entryObj = {
    constructs: []
  };

  public resultSubj = new BehaviorSubject<Object>({});

  public errors = [];

  constructor(private internalService: InternalService, private router: Router) { }

  public getMetadata() {
    if (this.currViewMode === ResultsServiceMode.JOB) {
      return this.internalService.getJob(this.currentUUID).subscribe(currJob => {
        this.resultSubj.next(currJob);
        this.entryObj = currJob.metadata
        this.entryObj['errors'] = this.entryObj['errors'].map(currErr => {
          currErr['message'] = currErr['message'].replaceAll('\n', '<br>');
          return currErr;
        });
        console.log(this.resultSubj.value)
      },
        err => {
          console.log('err', err);
          if (err.status === 401) this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(["/unauthorized"]);
          });
        }, () => { });
    } else if (this.currViewMode === ResultsServiceMode.DRAFT) {
      return this.internalService.getDraft(this.currentUUID).subscribe(currDraft => {
        this.resultSubj.next(currDraft);
        this.entryObj = currDraft.metadata;
        this.entryObj['errors'] = this.entryObj['errors'].map(currErr => {
          currErr['message'] = currErr['message'].replaceAll('\n', '<br>');
          return currErr;
        });
      },
        err => {
          console.log('err', err);
          if (err.status === 401) this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(["/unauthorized"]);
          });
        }, () => { });
    } else {
      this.errors.push({
        "message": "Result type (Job, Draft or Public) need to be specified"
      })
    }
  }
}

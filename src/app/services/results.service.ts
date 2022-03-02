import { Injectable } from '@angular/core';
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

  constructor(private internalService: InternalService) { }

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
        }, () => { });
    }else{
      this.errors.push({
        "message": "Result type (Job, Draft or Public) need to be specified"
      })
    }
  }
}

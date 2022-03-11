import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { InternalService } from './internal.service';

export enum ResultsServiceMode {
  JOB = "job",
  DRAFT = "draft",
  PUBLIC = "public"
}

export enum EnsembleStatus {
  ENSEMBLE_UPLOADED = "ensemble_uploaded",
  ENSEMBLE_REJECTED = "ensemble_rejected",
  ENSEMBLE_VALIDATED = "ensemble_validated",
  ENSEMBLE_PROCESSED = "ensemble_processed",
  ENSEMBLE_COMPLETED = "ensemble_completed"
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

  private basicErrorHandler = (err) => {
    console.log('err', err);
    if (err.status === 401) this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(["/unauthorized"]);
    });
    if (err.status === 404) this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(["/notfound"]);
    });
    if (err.status === 500) {
      this.errors.push({
        "message": "Fatal error. Please contact us for more information."
      })
    }
  }

  public getMetadata() {
    if (this.currViewMode === ResultsServiceMode.JOB) {
      // Case Job
      return this.internalService.getJob(this.currentUUID).subscribe(currJob => {
        this.resultSubj.next(currJob);
        this.entryObj = currJob.metadata
        this.errors = this.entryObj['errors'].map(currErr => {
          currErr['message'] = currErr['message'].replaceAll('\n', '<br>');
          return currErr;
        });
        if (this.entryObj["status"] === "failed" || this.entryObj["status"] === undefined) {
          if (Array.isArray(this.entryObj['ensembles']) && this.entryObj['ensembles'].length > 0) {
            this.entryObj['ensembles'].forEach(ensemble => {
              switch (ensemble["ped_last_status"]) {
                case EnsembleStatus.ENSEMBLE_UPLOADED:
                  this.errors.push({
                    "message": "Fatal error in validation for ensemble " + ensemble["ensemble_id"] + ". Please contact us."
                  })
                  break;
                case EnsembleStatus.ENSEMBLE_REJECTED:
                  this.errors.push({
                    "message": "Ensemble " + ensemble["ensemble_id"] + " rejected."
                  })
                  break;
                case EnsembleStatus.ENSEMBLE_VALIDATED:
                  this.errors.push({
                    "message": "Fatal error in stats calculation for ensemble " + ensemble["ensemble_id"] + ". Please contact us."
                  })
                  break;
                case EnsembleStatus.ENSEMBLE_PROCESSED:
                  this.errors.push({
                    "message": "Fatal error in report generation for ensemble " + ensemble["ensemble_id"] + ". Please contact us."
                  })
                  break;
                default:
                  break;
              }
            })
          } else {
            this.errors.push({
              "message": "Fatal error. Please contact us."
            })
          }
        }
        console.log(this.resultSubj.value)
        console.log(this.entryObj)
        console.log(this.errors)
      }, this.basicErrorHandler);
    } else if (this.currViewMode === ResultsServiceMode.DRAFT) {
      // Case Draft
      return this.internalService.getDraft(this.currentUUID).subscribe(currDraft => {
        this.resultSubj.next(currDraft);
        this.entryObj = currDraft.metadata;
      }, this.basicErrorHandler);
    } else {
      this.errors.push({
        "message": "Result type (Job, Draft or Public) need to be specified"
      })
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { InternalService } from 'src/app/services/internal.service';
import { ResultsService, ResultsServiceMode } from 'src/app/services/results.service';
import { Offcanvas, Modal } from 'node_modules/bootstrap/dist/js/bootstrap.esm.min.js'
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import moment from 'moment';

@Component({
  selector: 'app-job-result-view',
  templateUrl: './job-result-view.component.html',
  styleUrls: ['./job-result-view.component.scss']
})
export class JobResultViewComponent implements OnInit {
  public jobObj;
  public profileObj;

  public jobStatus = new BehaviorSubject<string>("created");
  public reloadSub: Subscription;

  public isSubmitting = false;

  public firstSubmitForm = new FormGroup({
    job_id: new FormControl(null),
    cover_letter: new FormControl(null)
  })

  constructor(private internalService: InternalService,
    public resultsService: ResultsService,
    private authService: AuthService,
    private route: ActivatedRoute) {
    this.authService.profileObj.subscribe(profileObj => this.profileObj = profileObj);
    

    this.resultsService.currViewMode = ResultsServiceMode.JOB;
    this.resultsService.currentUUID = this.route.snapshot.paramMap.get('identifier');

    // Invoke reload sub
    this.reloadSub = interval(10000).subscribe(val => this.resultsService.getMetadata());
    this.jobStatus.subscribe(val => {
      if(["done","failed"].includes(this.jobStatus.value)){
        this.reloadSub.unsubscribe();
      }
    })

    // Init first time
    this.resultsService.getMetadata()
    this.resultsService.resultSubj.subscribe( result => {
      this.jobObj=result;
      this.jobStatus.next(this.jobObj["status"])
    });

    this.firstSubmitForm.get("job_id").setValue(this.resultsService.currentUUID);
  }

  ngOnInit(): void {

  }

  public submitFirst(): void {
    // Disable button of submission
    this.isSubmitting = true;
    this.internalService.upgradeToDraft(this.firstSubmitForm.value["job_id"], this.firstSubmitForm.value["cover_letter"]).subscribe((data) => {
      window.location.reload();
    }, err => { this.isSubmitting = false })
  }

  formatTimestamp(tmstmp: string): string{
    return moment(tmstmp).format("dddd, MMMM Do YYYY, h:mm:ss a [GMT]Z")
  }

  ngOnDestroy(){
    this.reloadSub.unsubscribe();
  }
}

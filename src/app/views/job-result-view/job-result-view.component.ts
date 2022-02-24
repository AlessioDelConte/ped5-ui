import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { InternalService } from 'src/app/services/internal.service';
import { ResultsService } from 'src/app/services/results.service';
import { Offcanvas, Modal } from 'node_modules/bootstrap/dist/js/bootstrap.esm.min.js'
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-job-result-view',
  templateUrl: './job-result-view.component.html',
  styleUrls: ['./job-result-view.component.scss']
})
export class JobResultViewComponent implements OnInit {
  jobObj;
  entryObj = {};
  profileObj;

  public isSubmitting = false;

  public firstSubmitForm = new FormGroup({
    job_id: new FormControl(null),
    cover_letter: new FormControl(null)
  })

  constructor(private internalService: InternalService,
    public resultsService: ResultsService,
    private authService: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.url)
    this.authService.profileObj.subscribe(profileObj => this.profileObj = profileObj);

    this.resultsService.currentUUID = this.route.snapshot.paramMap.get('identifier');
    this.firstSubmitForm.get("job_id").setValue(this.resultsService.currentUUID);
    this.internalService.getJob(this.resultsService.currentUUID).subscribe(currJob => {
      this.jobObj = currJob;
      let currObj = currJob.metadata;
      this.resultsService.parse(currObj);
      this.entryObj = currObj;
      this.entryObj['errors'] = this.entryObj['errors'].map(currErr => {
        currErr['message'] = currErr['message'].replaceAll('\n', '<br>');
        return currErr;
      });
      this.resultsService.currViewMode = 'scheduler';
      console.log(this.entryObj)
    },
      err => {
        console.log('err', err);
      }, () => { });
  }

  public submitFirst():void{
    this.isSubmitting = true;
    this.internalService.upgradeToDraft(this.firstSubmitForm.value["job_id"], this.firstSubmitForm.value["cover_letter"]).subscribe((data)=>{

      window.location.reload();
    },err=>{this.isSubmitting=false})
  }
}

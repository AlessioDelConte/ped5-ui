import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { InternalService } from 'src/app/services/internal.service';
import { ResultsService } from 'src/app/services/results.service';
import { Offcanvas, Modal } from 'node_modules/bootstrap/dist/js/bootstrap.esm.min.js'

@Component({
  selector: 'app-job-result-view',
  templateUrl: './job-result-view.component.html',
  styleUrls: ['./job-result-view.component.scss']
})
export class JobResultViewComponent implements OnInit {
  jobObj;
  entryObj = {};
  profileObj;

  constructor(private internalService: InternalService,
              public resultsService: ResultsService,
              private authService: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.url)
    this.authService.profileObj.subscribe(profileObj => this.profileObj = profileObj);

    this.resultsService.currentUUID = this.route.snapshot.paramMap.get('identifier');
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
        },  () => {});
  }
  openOffcanvas(CanvasID) {
    const myOffcanvas = document.getElementById(CanvasID);
    const bsOffcanvas = new Offcanvas(myOffcanvas);
    bsOffcanvas.toggle();
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { InternalService } from 'src/app/services/internal.service';
import { ResultsService } from 'src/app/services/results.service';

@Component({
  selector: 'app-draft-result-view',
  templateUrl: './draft-result-view.component.html',
  styleUrls: ['./draft-result-view.component.scss']
})
export class DraftResultViewComponent implements OnInit {
  draftObj;
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

    this.internalService.getDraft(this.resultsService.currentUUID).subscribe(currDraft => {
      this.draftObj = currDraft;
      let currObj = currDraft.metadata;
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
}

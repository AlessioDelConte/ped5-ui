import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { InternalService } from 'src/app/services/internal.service';
import { ResultsService, ResultsServiceMode } from 'src/app/services/results.service';

@Component({
  selector: 'app-draft-result-view',
  templateUrl: './draft-result-view.component.html',
  styleUrls: ['./draft-result-view.component.scss']
})
export class DraftResultViewComponent implements OnInit {
  public draftObj;
  public profileObj;


  constructor(private internalService: InternalService,
    public resultsService: ResultsService,
    private authService: AuthService,
    private route: ActivatedRoute) {
    this.authService.profileObj.subscribe(profileObj => this.profileObj = profileObj);

    this.resultsService.currViewMode = ResultsServiceMode.DRAFT;
    this.resultsService.currentUUID = this.route.snapshot.paramMap.get('identifier');
    this.resultsService.getMetadata();
    this.resultsService.resultSubj.subscribe(result => this.draftObj = result)
  }

  ngOnInit(): void {

  }
}

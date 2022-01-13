import { Component, OnInit } from '@angular/core';
import { InternalService } from '../../services/internal.service';
import {ActivatedRoute} from '@angular/router';
import {ResultsService} from '../../services/results.service';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit {
  entryObj = {};

  constructor(private internalService: InternalService,
              private resultsService: ResultsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.resultsService.currentUUID = this.route.snapshot.paramMap.get('identifier');
 // console.log(currentUUID);
    this.internalService.getFile(this.resultsService.currentUUID, 'submission/metadata.json').subscribe(currObj => {
      this.resultsService.parse(currObj);
      this.entryObj = currObj;
      this.resultsService.currViewMode = 'scheduler';
      // console.log(this.entryObj);
    });

  }

}

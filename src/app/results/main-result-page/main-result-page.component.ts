import { Component, OnInit } from '@angular/core';
import {InternalService} from '../../services/internal.service';
import {ResultsService} from '../../services/results.service';
import {ActivatedRoute} from '@angular/router';
import { Offcanvas } from 'node_modules/bootstrap/dist/js/bootstrap.esm.min.js'
import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-main-result-page',
  templateUrl: './main-result-page.component.html',
  styleUrls: ['./main-result-page.component.scss']
})
export class MainResultPageComponent implements OnInit {
  entryObj = {};
  profileObj;

  constructor(private internalService: InternalService,
              public resultsService: ResultsService,
              private authService: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.authService.profileObj.subscribe(profileObj => this.profileObj = profileObj);

    this.resultsService.currentUUID = this.route.snapshot.paramMap.get('identifier');
    this.internalService.getFile(this.resultsService.currentUUID, 'submission/metadata.json').subscribe(currObj => {
      this.resultsService.parse(currObj);
      this.entryObj = currObj;
      this.entryObj['errors'] = this.entryObj['errors'].map(currObj => {
        currObj['message'] = currObj['message'].replaceAll('\n', '<br>');
        return currObj;
      });
      this.resultsService.currViewMode = 'scheduler';
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

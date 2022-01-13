import { Component, OnInit } from '@angular/core';
import { InternalService } from '../services/internal.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit {
  entryObj = {};

  constructor(private internalService: InternalService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const currentUUID = this.route.snapshot.paramMap.get('identifier');
 console.log(currentUUID);
    this.internalService.getFile(currentUUID, 'metadata.json').subscribe(currObj => {
      this.entryObj = currObj;
      console.log(this.entryObj);

    });

  }

}

import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { InternalService } from 'src/app/services/internal.service';

@Component({
  selector: 'app-drafts-browse',
  templateUrl: './drafts-browse.component.html',
  styleUrls: ['./drafts-browse.component.scss']
})
export class DraftsBrowseComponent implements OnInit {
  draftsData = []

  constructor(private internalService: InternalService) { }

  ngOnInit(): void {
    this.internalService.getDrafts().subscribe(
      responseData => {
        console.log(responseData)
        this.draftsData = responseData
      });
  }

  formatTimestamp(tmstmp: string): string{
    return moment(tmstmp).calendar()
  }
}

import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { InternalService } from 'src/app/services/internal.service';

@Component({
  selector: 'app-jobs-browse',
  templateUrl: './jobs-browse.component.html',
  styleUrls: ['./jobs-browse.component.scss']
})
export class JobsBrowseComponent implements OnInit {
  jobsData = []

  constructor(private internalService: InternalService) { }

  ngOnInit(): void {
    this.internalService.getJobs().subscribe(
      responseData => {
        console.log(responseData)
        this.jobsData = responseData
      },
      e => {
      },
      () => {
      });
  }


  formatTimestamp(tmstmp: string): string{
    return moment(tmstmp).calendar()
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InternalService } from 'src/app/services/internal.service';

@Component({
  selector: 'app-result-view',
  templateUrl: './result-view.component.html',
  styleUrls: ['./result-view.component.scss']
})
export class ResultViewComponent implements OnInit {
  public metadata = {};
  public job_data = {}

  constructor(private internalService: InternalService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let identifier = this.route.snapshot.paramMap.get('identifier');
    this.internalService.getJob(identifier).subscribe(responseData => {
      this.metadata = responseData.metadata;
      this.job_data = {
        job_id: responseData.job_id,
        status: responseData.status
      }
    })


  }

}

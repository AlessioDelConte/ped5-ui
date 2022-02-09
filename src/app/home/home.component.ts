import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {InternalService} from '../services/internal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  serverName = null;
  jobsData = []

  constructor(private router: Router, private internalService: InternalService
  ) {
  }

  ngOnInit(): void {
    this.internalService.getServerName().subscribe(
      responseData => {
        this.serverName = responseData;
      },
      e => {
      },
      () => {
      });

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

  ngAfterViewInit(): void {

  }

}

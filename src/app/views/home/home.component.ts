import {Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import {Router} from '@angular/router';
import {InternalService} from '../../services/internal.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public searchFormControl = new FormControl();
  public serverName = null;
  public statsData = {};

  constructor(private titleService: Title, private router: Router, private internalService: InternalService
  ) {
    this.titleService.setTitle('Home - PED');
  }

  ngOnInit(): void {
    Notify.info('Welcome! You are on the new version of PED. You can access the legacy version at <a href="https://old.proteinensemble.org/" style="color: white"><strong>https://old.proteinensemble.org/</strong></a>.', {
      position: 'right-bottom',
      plainText: false,
      messageMaxLength: 1000,
      // timeout: 10000,
      // clickToClose: true,
      closeButton: true,
      showOnlyTheLastOne: true,
      useIcon: false,
      info: {
        background: '#2274a5'
      }
    });

    this.internalService.getServerName().subscribe(
      responseData => {
        this.serverName = responseData;
      },
      e => {
      },
      () => {
      });

    this.internalService.getHomeStats().subscribe(
      data => {
        this.statsData = data;
      }
    );
  }

  goToBrowsePage(): number {
    // check PED identifier
    if (/^PED\d{5}$|^PED\d{5}e\d{3}$/.test(this.searchFormControl.value)) {
      this.router.navigate(['entries/' + this.searchFormControl.value]);
      return 0;
    }
    // check UniProt ACC
    if (/^[OPQ][0-9][A-Z0-9]{3}[0-9]|[A-NR-Z][0-9]([A-Z][A-Z0-9]{2}[0-9]){1,2}$/.test(this.searchFormControl.value)) {
      this.router.navigate(['proteins/uniprot/' + this.searchFormControl.value]);
      return 0;
    }
    this.router.navigate(['browse'], {queryParams: {free_text: this.searchFormControl.value}});
  }

}

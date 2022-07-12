import {Component, OnInit, AfterViewInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import {Router} from '@angular/router';
import {InternalService} from '../../services/internal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  searchFormControl = new FormControl();
  serverName = null;

  constructor(private titleService:Title, private router: Router, private internalService: InternalService
  ) {
    this.titleService.setTitle("PED - Home");
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
  }

  ngAfterViewInit(): void {

  }

  goToBrowsePage() {
    // check PED identifier
    if (/^PED\d{5}$|^PED\d{5}e\d{3}$/.test(this.searchFormControl.value)) {
      this.router.navigate([this.searchFormControl.value]);
      return 0;
    }
    // check UniProt ACC
    if (/^[OPQ][0-9][A-Z0-9]{3}[0-9]|[A-NR-Z][0-9]([A-Z][A-Z0-9]{2}[0-9]){1,2}$/.test(this.searchFormControl.value)) {
      this.router.navigate([this.searchFormControl.value]);
      return 0;
    }
    this.router.navigate(['browse'], {queryParams: {free_text: this.searchFormControl.value}});
  }

}

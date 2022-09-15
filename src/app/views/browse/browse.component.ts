import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { InternalService } from 'src/app/services/internal.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  public resultData = [];
  dummy = 'PED00001'

  constructor(private titleService: Title, private internalService: InternalService,
    public route: ActivatedRoute,
    public router: Router) {
    this.titleService.setTitle("PED - Browse");
  }

  ngOnInit(): void {
    this.internalService.searchEntries({}).subscribe(data => {
      this.resultData = data;
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InternalService } from 'src/app/services/internal.service';

@Component({
  selector: 'app-entry-view',
  templateUrl: './entry-view.component.html',
  styleUrls: ['./entry-view.component.scss']
})
export class EntryViewComponent implements OnInit {

  public entryID;
  public entryData;

  constructor(private internalService: InternalService,
    private route: ActivatedRoute) { }

  ngOnInit(): void { 
    this.entryID = this.route.snapshot.paramMap.get('identifier');
    this.internalService.getPublicEntry(this.entryID).subscribe( data => {
      this.entryData = data;
    })
  }

}

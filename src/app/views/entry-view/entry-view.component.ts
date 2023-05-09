import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Block, Loading } from 'notiflix';
import { InternalService } from 'src/app/services/internal.service';

@Component({
  selector: 'app-entry-view',
  templateUrl: './entry-view.component.html',
  styleUrls: ['./entry-view.component.scss']
})
export class EntryViewComponent implements OnInit {

  public entryID;
  public entryData;

  constructor(private titleService: Title, private internalService: InternalService,
    private route: ActivatedRoute) {
    this.entryID = this.route.snapshot.paramMap.get('identifier');
    this.titleService.setTitle("Entry " + this.entryID + " - PED");
  }

  ngOnInit(): void {
    Block.standard("#result-view");
    this.internalService.getPublicEntry(this.entryID).subscribe(data => {
      console.log(data)
      this.entryData = data;
      Block.remove("#result-view");
    })
  }

}

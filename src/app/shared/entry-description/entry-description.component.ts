import { Component, Input, OnInit } from '@angular/core';
import { Collapse } from 'node_modules/bootstrap/dist/js/bootstrap.esm.min.js';

@Component({
  selector: 'app-entry-description',
  templateUrl: './entry-description.component.html',
  styleUrls: ['./entry-description.component.scss']
})
export class EntryDescriptionComponent implements OnInit {

  @Input() entryId: string;
  @Input() descriptionObj: object;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  toogleCollapse(id): void {
    const myCollapse = document.getElementById(id);
    const bsCollapse = new Collapse(myCollapse, { toggle: false });
    bsCollapse.toggle();
  }

}

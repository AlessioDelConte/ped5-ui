import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry-construct-section',
  templateUrl: './entry-construct-section.component.html',
  styleUrls: ['./entry-construct-section.component.scss']
})
export class EntryConstructSectionComponent implements OnInit {

  @Input() constructData = [];

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry-tab-section',
  templateUrl: './entry-tab-section.component.html',
  styleUrls: ['./entry-tab-section.component.scss']
})
export class EntryTabSectionComponent implements OnInit {

  @Input() entryData;
  activeTab = "construct"

  constructor() { }

  ngOnInit(): void {
  }

  selectTab(tabName) {
    this.activeTab = tabName;
  }

}

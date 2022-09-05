import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry-ensembles-section',
  templateUrl: './entry-ensembles-section.component.html',
  styleUrls: ['./entry-ensembles-section.component.scss']
})
export class EntryEnsemblesSectionComponent implements OnInit {

  @Input() entryData;

  constructor() { }

  ngOnInit(): void {
  }

}

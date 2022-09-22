import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-protein-card',
  templateUrl: './protein-card.component.html',
  styleUrls: ['./protein-card.component.scss']
})
export class ProteinCardComponent implements OnInit {
  @Input() entryData;

  constructor() { }

  ngOnInit(): void {

  }

}

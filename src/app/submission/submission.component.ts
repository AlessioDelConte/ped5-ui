import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss']
})
export class SubmissionComponent implements OnInit {
  activeComponent = '';
  constructor() { }

  ngOnInit(): void {
  }

  toggle(activeComponent): void {
    this.activeComponent = activeComponent !== this.activeComponent ? activeComponent : '';
  }
}

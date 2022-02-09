import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubmissionService } from '../services/submission.service';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss']
})
export class SubmissionComponent implements OnInit {
  activeComponent = '';

  constructor(private route: ActivatedRoute, public submissionService: SubmissionService) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: {
      entry: any
    }) => {
      if (Array.isArray(data.entry) && data.entry.length > 0) {
        this.submissionService.FormParser(data.entry[0]);

      } else {
        this.submissionService.FormParser(data.entry);

      }
    });
    this.toggle('upload')
  }

  toggle(activeComponent): void {
    this.activeComponent = activeComponent !== this.activeComponent ? activeComponent : '';
  }
}

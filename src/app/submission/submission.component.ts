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

  aux = ""

  constructor(private route: ActivatedRoute, public submissionService: SubmissionService) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: {
      entry: any
    }) => {
      if (Array.isArray(data.entry) && data.entry.length > 0) {
        // this.submissionService.FormParser(data.entry[0]);

      } else {
        // this.submissionService.FormParser(data.entry);

      }
    });
    this.toggle('description')
    console.log(this.submissionService.form.value)
  }

  toggle(activeComponent): void {
    this.activeComponent = activeComponent !== this.activeComponent ? activeComponent : '';
  }

  auxFun(){
    this.aux = this.submissionService.getInputMetadata()
  }
}

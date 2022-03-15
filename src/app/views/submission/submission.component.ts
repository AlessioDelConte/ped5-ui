import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubmissionService } from '../../services/submission.service';

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
      console.log(data.entry.input_metadata)
      if(data.entry.input_metadata){
        // For jobs
        if (data.entry.job_id) this.submissionService.options.parent_job_id = data.entry.job_id;
        if (data.entry.linked_draft_id) this.submissionService.options.linked_draft_id = data.entry.linked_draft_id;

        // For drafts
        if (data.entry.draft_id) this.submissionService.options.linked_draft_id = data.entry.draft_id;

        this.submissionService.parseForm(data.entry.input_metadata);
      }
    });
    this.toggle('upload')
    console.log(this.submissionService.form.value)
  }

  toggle(activeComponent): void {
    this.activeComponent = activeComponent !== this.activeComponent ? activeComponent : '';
  }

  auxFun(){
    this.aux = this.submissionService.getInputMetadata()
  }
}

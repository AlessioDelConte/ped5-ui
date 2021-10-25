import { Component, OnInit } from '@angular/core';
import { SubmissionService } from '../services/submission.service';

@Component({
  selector: 'app-form-files',
  templateUrl: './form-files.component.html',
  styleUrls: ['./form-files.component.scss']
})
export class FormFilesComponent implements OnInit {

  constructor(public submissionService: SubmissionService) { }

  ngOnInit(): void {
    // console.log(this.submissionService.form['controls']['ensembles']['controls'])
  }

}

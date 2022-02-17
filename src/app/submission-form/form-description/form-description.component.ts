import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { InternalService } from 'src/app/services/internal.service';
import { SubmissionService } from 'src/app/services/submission.service';


@Component({
  selector: 'app-form-description',
  templateUrl: './form-description.component.html',
  styleUrls: ['./form-description.component.scss']
})
export class FormDescriptionComponent implements OnInit {

  constructor(public submissionService: SubmissionService, public internalService: InternalService) { }

  ngOnInit(): void {

    let submissionForm: FormGroup = this.submissionService.form;
    submissionForm.get('experimental_procedure').valueChanges.subscribe(data => {
      this.submissionService.findTerms();
    });
    submissionForm.get('structural_ensembles_calculation').valueChanges.subscribe(data => {
      this.submissionService.findTerms();
    });
    submissionForm.get('md_calculation').valueChanges.subscribe(data => {
      this.submissionService.findTerms();
    });

  }

}

import { Component, OnInit } from '@angular/core';
import { SubmissionService } from 'src/app/services/submission.service';


@Component({
  selector: 'app-form-description',
  templateUrl: './form-description.component.html',
  styleUrls: ['./form-description.component.scss']
})
export class FormDescriptionComponent implements OnInit {

  constructor(public submissionService: SubmissionService) { }

  ngOnInit(): void {
  }

}

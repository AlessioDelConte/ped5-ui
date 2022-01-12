import { Component, OnInit } from '@angular/core';
import { SubmissionService } from '../../services/submission.service';

@Component({
  selector: 'app-form-construct',
  templateUrl: './form-construct.component.html',
  styleUrls: ['./form-construct.component.scss']
})
export class FormConstructComponent implements OnInit {

  constructor(public submissionService: SubmissionService) { }

  ngOnInit(): void {
  }

}

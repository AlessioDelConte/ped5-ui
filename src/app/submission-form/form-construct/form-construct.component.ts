import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  resetUnusedFragmentType(chain_idx, fragment_idx) {
    let fragment: FormControl = this.submissionService.form.get('constructs').controls[chain_idx].get("fragments").controls[fragment_idx];
    if (fragment.get("definition_type").value === "Uniprot ACC") {
      fragment.get("sequence").reset();
    } else if (fragment.get("definition_type").value === "Sequence") {
      fragment.get("uniprot_acc").reset();
      fragment.get("uniprot_start_position").reset();
      fragment.get("uniprot_end_position").reset();
    }
  }
}

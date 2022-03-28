import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { InternalService } from 'src/app/services/internal.service';
import { SubmissionService } from 'src/app/services/submission.service';


@Component({
  selector: 'app-form-description',
  templateUrl: './form-description.component.html',
  styleUrls: ['./form-description.component.scss']
})
export class FormDescriptionComponent implements OnInit {

  public profileObj;

  constructor(public submissionService: SubmissionService, public internalService: InternalService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.profileObj.subscribe(profileObj => this.profileObj = profileObj);

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

    submissionForm.get('publication_identifier').valueChanges.subscribe(newData => {
      this.getPublicationDetail(submissionForm.get("publication_source").value, newData);
    });

  }

  public getPublicationDetail(source, identifier) {
    let submissionForm: FormGroup = this.submissionService.form;
    if (typeof identifier === "string" && identifier.length > 0) {
      let newId;
      if (source === "pubmed") {
        newId = "ext_id%3A" + identifier;
      } else if (source === "doi") {
        newId = "doi%3A" + identifier
      }
      if (newId) {
        this.internalService.searchPMC(newId).subscribe(
          (result) => {
            if (result.resultList.result.length > 0) {
              const pmidData = result.resultList.result[0];
              let pubhtml = pmidData['title'] + ' <i> ' + pmidData['authorString'] + ' </i> ';
              if (pmidData['journalInfo'] && pmidData['journalInfo']['journal'] && pmidData['journalInfo']['journal']['medlineAbbreviation']) {
                pubhtml += pmidData['journalInfo']['journal']['medlineAbbreviation'] + ', '
              }
              pubhtml += pmidData['pubYear']
              submissionForm.get('publication_html').setValue(pubhtml);
            } else {
              submissionForm.get("publication_html").reset();
            }
          }, (error) => {
            submissionForm.get("publication_html").reset();
          });
      } else {
        submissionForm.get("publication_html").reset();
      }
    } else {
      submissionForm.get("publication_html").reset();
    }
  }

  public onChangePubDetails() {
    let submissionForm: FormGroup = this.submissionService.form;
    if (submissionForm.get("publication_status").value !== 'Published') {
      submissionForm.get("publication_source").reset();
    }
    submissionForm.get("publication_identifier").reset();
    submissionForm.get("publication_html").reset();
  }

}

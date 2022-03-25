import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard'
import moment from 'moment';
import { AuthService, UserProfile } from 'src/app/services/auth.service';
import { InternalService } from 'src/app/services/internal.service';
import { ResultsService, ResultsServiceMode } from 'src/app/services/results.service';

@Component({
  selector: 'app-draft-result-view',
  templateUrl: './draft-result-view.component.html',
  styleUrls: ['./draft-result-view.component.scss']
})
export class DraftResultViewComponent implements OnInit {
  public draftObj;
  public profileObj: UserProfile;

  public draftForm = new FormGroup({
    assigned_entry_id: new FormControl(null, [Validators.required])
  })

  public shareLink: string;

  constructor(private internalService: InternalService,
    public resultsService: ResultsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private _clipboardService: ClipboardService) {

    this.authService.profileObj.subscribe(profileObj => this.profileObj = profileObj);

    this.resultsService.currViewMode = ResultsServiceMode.DRAFT;
    this.resultsService.currentUUID = this.route.snapshot.paramMap.get('identifier');
    this.resultsService.prepublicationAccess = this.route.snapshot.queryParamMap.get("prepublication_access")
    this.resultsService.getMetadata();
    this.resultsService.resultSubj.subscribe(result => this.draftObj = result)
  }

  ngOnInit(): void {

  }

  public assignEntryID() {
    this.internalService.patchDraft(this.resultsService.currentUUID, this.draftForm.value).subscribe(data => {
      window.location.reload()
    })
  }

  public changeStatusDraft(newStatus) {
    this.internalService.patchDraft(this.resultsService.currentUUID, { status: newStatus}).subscribe(data => {
      window.location.reload()
    })
  }

  public generateToken(){
    this.internalService.generateDraftAccessToken(this.resultsService.currentUUID).subscribe(data => {
      this.shareLink = window.location.protocol + '//'+ window.location.host+ window.location.pathname + '?prepublication_access=' + data["token"]
    })
  }

  public formatTimestamp(tmstmp: string): string {
    return moment(tmstmp).format("dddd, MMMM Do YYYY, h:mm:ss a [GMT]Z")
  }
}

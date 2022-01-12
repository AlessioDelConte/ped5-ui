import { Component, Input, OnInit , TemplateRef, ViewChild} from '@angular/core';
import { SubmissionService } from '../../services/submission.service';

@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.scss']
})
export class FormUploadComponent implements OnInit {
  @Input() indexEnsemble;
  @Input() ensembleObj;
  @ViewChild('fileW') fileW;
  @ViewChild('fileC') fileC;

  file_nameW: string = null;
  file_nameC: string = null;
  constructor(public submissionService: SubmissionService) { }

  ngOnInit(): void {
    console.log('this.ensembleObj', this.ensembleObj);
  }
  addFilesW(): void {
    this.fileW.nativeElement.click();
  }
  addFilesC(): void {
    this.fileC.nativeElement.click();
  }
  onFilesAddedW(): void {
    console.log(this.fileW.nativeElement.files[0].name);
    this.submissionService.formData.append('weights_' + this.indexEnsemble.toString(), this.fileW.nativeElement.files[0], this.fileW.nativeElement.files[0].name);
    this.file_nameW = this.fileW.nativeElement.files[0].name;
  }

  onFilesAddedC(): void {
    console.log(this.fileC.nativeElement.files[0].name);
    this.submissionService.formData.append( 'conformations_' + this.indexEnsemble.toString(), this.fileC.nativeElement.files[0], this.fileC.nativeElement.files[0].name);
    this.file_nameC = this.fileC.nativeElement.files[0].name;
  }

}

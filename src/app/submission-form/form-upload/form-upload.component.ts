import { Component, Input, OnInit , TemplateRef, ViewChild} from '@angular/core';
import { SubmissionService } from '../../services/submission.service';

@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.scss']
})
export class FormUploadComponent implements OnInit {
  @Input() indexEnsemble;
  @Input() ensembleCtrl;
  @ViewChild('fileW') fileW;
  @ViewChild('fileC') fileC;

  file_nameW: string = null;
  file_nameC: string = null;
  constructor(public submissionService: SubmissionService) { }

  ngOnInit(): void {
  }
  addFilesW(): void {
    this.fileW.nativeElement.click();
  }
  addFilesC(): void {
    this.fileC.nativeElement.click();
  }
  onFilesAddedW(): void {
    const filenameFormData = 'weights_' + this.ensembleCtrl.get("ensemble_id").value + '_' + this.fileC.nativeElement.files[0].name.substr(this.fileC.nativeElement.files[0].name.indexOf('.'));
    this.submissionService.formData.append('weights_file', this.fileW.nativeElement.files[0], filenameFormData);
    this.file_nameW = this.fileW.nativeElement.files[0].name;
  }

  onFilesAddedC(): void {
    const filenameFormData = 'conformations_' + this.ensembleCtrl.get("ensemble_id").value  + '_' + this.fileC.nativeElement.files[0].name.substr(this.fileC.nativeElement.files[0].name.indexOf('.'));
    this.submissionService.formData.append( 'conformations_file', this.fileC.nativeElement.files[0], filenameFormData);
    this.file_nameC = this.fileC.nativeElement.files[0].name;

    this.ensembleCtrl.get("conformations_file_strategy").setValue("direct");
    this.ensembleCtrl.get("conformations_file_name").setValue(filenameFormData);
  }

}

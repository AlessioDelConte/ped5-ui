import {Component, OnInit, AfterViewInit, Input} from '@angular/core';
import {ResultsService, ResultsServiceMode} from '../../services/results.service';
import { Collapse } from 'node_modules/bootstrap/dist/js/bootstrap.esm.min.js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit, AfterViewInit {
  @Input() entryObj: object;

  currLinks = {
    report: ""
  }

  constructor(private resultsService: ResultsService) { }

  ngOnInit(): void {
    if (this.resultsService.currViewMode === ResultsServiceMode.DRAFT) {
      this.currLinks.report = environment.ws + 'drafts/' + this.resultsService.currentUUID + '/report/';
    } else if (this.resultsService.currViewMode === ResultsServiceMode.JOB) {
      this.currLinks.report = environment.ws + 'jobs/' + this.resultsService.currentUUID + '/report/';
    }
  }

  ngAfterViewInit(): void {
    const textExperimentalProcedure = document.getElementById('textExperimentalProcedure');
    const buttonExperimentalProcedure = document.getElementById('buttonExperimentalProcedure');

    textExperimentalProcedure.addEventListener('hidden.bs.collapse', function () {
      buttonExperimentalProcedure.textContent = 'Read more';
    });
    textExperimentalProcedure.addEventListener('shown.bs.collapse', function () {
        buttonExperimentalProcedure.textContent = 'Read less';
    });

    const textStructuralEnsembles = document.getElementById('textStructuralEnsembles');
    const buttonStructuralEnsembles = document.getElementById('buttonStructuralEnsembles');

    textStructuralEnsembles.addEventListener('hidden.bs.collapse', function () {
      buttonStructuralEnsembles.textContent = 'Read more';
    });
    textStructuralEnsembles.addEventListener('shown.bs.collapse', function () {
      buttonStructuralEnsembles.textContent = 'Read less';
    });

    const textMolecularDynamics = document.getElementById('textMolecularDynamics');
    const buttonMolecularDynamics = document.getElementById('buttonMolecularDynamics');

    textMolecularDynamics.addEventListener('hidden.bs.collapse', function () {
      buttonMolecularDynamics.textContent = 'Read more';
    });
    textMolecularDynamics.addEventListener('shown.bs.collapse', function () {
      buttonMolecularDynamics.textContent = 'Read less';
    });
  }

  toogleCollapse(id): void {
    const myCollapse = document.getElementById(id);
    const bsCollapse = new Collapse(myCollapse , {toggle: false});
    bsCollapse.toggle();
  }
}

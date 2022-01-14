import { Component, OnInit, AfterViewInit } from '@angular/core';
import { InternalService } from '../../services/internal.service';
import {ActivatedRoute} from '@angular/router';
import {ResultsService} from '../../services/results.service';
import { Collapse } from 'node_modules/bootstrap/dist/js/bootstrap.esm.min.js';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit, AfterViewInit {
  entryObj = {};


  constructor(private internalService: InternalService,
              private resultsService: ResultsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.resultsService.currentUUID = this.route.snapshot.paramMap.get('identifier');
    this.internalService.getFile(this.resultsService.currentUUID, 'submission/metadata.json').subscribe(currObj => {
      this.resultsService.parse(currObj);
      this.entryObj = currObj;
      this.resultsService.currViewMode = 'scheduler';

    });
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

import { Component, OnInit, Input } from '@angular/core';
import {environment} from '../../../environments/environment';
import {BehaviorSubject} from 'rxjs';
import {ResultsService} from '../../services/results.service';

@Component({
  selector: 'app-ensemble-card',
  templateUrl: './ensemble-card.component.html',
  styleUrls: ['./ensemble-card.component.scss']
})
export class EnsembleCardComponent implements OnInit {
  @Input() currEnsmeble: object;
  currChainName = new BehaviorSubject<string>('');
  currStatData = {
    relative_asa_mean: 0.0,
    entropy_dssp_mean: 0.0,
    rg_mean: 0.0
  };
  currLinks = {
    ramachandran_plot: '',
    rg_boxplot: ''
  };

  constructor(public resultsService: ResultsService) { }

  ngOnInit(): void {
    this.currChainName.next(this.resultsService.entryObj.constructs.sort((a, b) => a.chain_name > b.chain_name ? 1 : -1)[0]['chain_name']);
    this.currChainName.subscribe(currChainName => {
      this.currStatData = this.resultsService.entryObj['data_per_chain'].filter(x => x.ensemble_id === this.currEnsmeble['ensemble_id'] && x.chain === currChainName)[0] || this.currStatData;
      if (this.resultsService.currViewMode === 'scheduler') {
        this.currLinks.ramachandran_plot =  environment.submission_server + '/task/' + this.resultsService.currentUUID + '/file/submission/figure/' + this.currEnsmeble['ensemble_id'] + '_' +  this.currChainName.value + '_rama_angles.svg';
        this.currLinks.rg_boxplot =  environment.submission_server + '/task/' + this.resultsService.currentUUID + '/file/submission/figure/' + this.currEnsmeble['ensemble_id'] + '_' +  this.currChainName.value + '_rg_boxplot_NG.svg';
      } else {
        this.currLinks.ramachandran_plot =  environment.ws + 'ramachandran_plot/' + this.currEnsmeble['ensemble_id'] + '/' +  this.currChainName.value;
        this.currLinks.rg_boxplot =  environment.ws + 'rg_boxplot/' + this.currEnsmeble['ensemble_id'] + '/' + this.currChainName.value;
      }


    });
  }

}

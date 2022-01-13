import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import {environment} from '../../../environments/environment';
import {BehaviorSubject} from 'rxjs';
import {ResultsService} from '../../services/results.service';
declare const PDBeMolstarPlugin: any;

@Component({
  selector: 'app-ensemble-card',
  templateUrl: './ensemble-card.component.html',
  styleUrls: ['./ensemble-card.component.scss']
})
export class EnsembleCardComponent implements OnInit, AfterViewInit {
  @Input() currEnsmeble: object;
  currChainName = new BehaviorSubject<string>('');
  currStatData = {
    relative_asa_mean: 0.0,
    entropy_dssp_mean: 0.0,
    rg_mean: 0.0
  };
  currLinks = {
    ramachandran_plot: '',
    rg_boxplot: '',
    mmcif: ''
  };
  viewerInstance = null;

  show_struct_viewer = new BehaviorSubject<string>('');

  constructor(public resultsService: ResultsService) { }

  ngOnInit(): void {
    this.currChainName.next(this.resultsService.entryObj.constructs.sort((a, b) => a.chain_name > b.chain_name ? 1 : -1)[0]['chain_name']);
    this.currChainName.subscribe(currChainName => {
      this.currStatData = this.resultsService.entryObj['data_per_chain'].filter(x => x.ensemble_id === this.currEnsmeble['ensemble_id'] && x.chain === currChainName)[0] || this.currStatData;
      if (this.resultsService.currViewMode === 'scheduler') {
        this.currLinks.ramachandran_plot =  environment.submission_server + '/task/' + this.resultsService.currentUUID + '/file/submission/figure/' + this.currEnsmeble['ensemble_id'] + '_' +  currChainName + '_rama_angles.svg';
        this.currLinks.rg_boxplot =  environment.submission_server + '/task/' + this.resultsService.currentUUID + '/file/submission/figure/' + this.currEnsmeble['ensemble_id'] + '_' +  currChainName + '_rg_boxplot_NG.svg';
        this.currLinks.mmcif =  environment.submission_server + '/task/' + this.resultsService.currentUUID + '/file/submission/cif_files/' + this.currEnsmeble['ensemble_id'] + '_rep10_MC_Rg.cif';
      } else {
        this.currLinks.ramachandran_plot =  environment.ws + 'ramachandran_plot/' + this.currEnsmeble['ensemble_id'] + '/' +  currChainName;
        this.currLinks.rg_boxplot =  environment.ws + 'rg_boxplot/' + this.currEnsmeble['ensemble_id'] + '/' + currChainName;
        this.currLinks.mmcif =  environment.ws + 'ensemble_sample/' + this.currEnsmeble['ensemble_id'];

      }


    });
  }

  ngAfterViewInit() {


    this.show_struct_viewer.subscribe(showStructViewer => {
      if (showStructViewer) {
        if (this.viewerInstance) {

        } else {
          let backroundColor = {r: 255, g: 255, b: 255};
          if (window.matchMedia &&
              window.matchMedia('(prefers-color-scheme: dark)').matches) {
            backroundColor = {r: 0, g: 0, b: 0};
          }
          this.viewerInstance = new PDBeMolstarPlugin();
          // console.log('this.URLarams', this.URLarams);
          const options = {
            customData: {
              url: this.currLinks.mmcif,
              format: 'mmcif'
            },
            assemblyId: '1',
            hideControls: true,
            bgColor: backroundColor,
          };
          if (showStructViewer === 'representatives') {
            options.customData.url = this.currLinks.mmcif;
            options.customData.format = 'mmcif';
          }
          const viewerContainer = document.getElementById('molstar' + this.currEnsmeble['ensemble_id']);
          document.getElementById('molstar' + this.currEnsmeble['ensemble_id']).style['min-height'] = '300px';
          this.viewerInstance.render(viewerContainer, options);
          this.viewerInstance.events.loadComplete.subscribe(() => {
            if (this.currChainName.value) {
              this.viewerInstance.visual.select({data: [ {auth_asym_id: this.currChainName.value, color: { r: 50, g: 105, b: 81}}], nonSelectedColor: {r: 240, g: 240 , b: 240}});
              this.currChainName.subscribe(currCainName => {
                if (currCainName) {
                  this.viewerInstance.visual.select({data: [ {auth_asym_id: currCainName, color: { r: 50, g: 105, b: 81}}], nonSelectedColor: {r: 240, g: 240 , b: 240}});
                }
              });
            }
          });

          window.addEventListener('scroll', event => {
            // console.log('viewerInstance.isExpanded: ', this.viewerInstance.plugin.layout._state.isExpanded);
            if (this.viewerInstance.plugin.layout._state.isExpanded) {
              document.getElementById('ped_logo_nav').style['max-height'] = '35px';
              document.getElementById('ped_logo_nav').style['margin'] = '0rem 0rem';
            }
          });

          window.matchMedia('(prefers-color-scheme: dark)')
              .addEventListener('change', event => {
                if (event.matches) {
                  this.viewerInstance.canvas.setBgColor({r: 0, g: 0, b: 0});
                } else {
                  this.viewerInstance.canvas.setBgColor({r: 255, g: 255, b: 255});
                }
              });
        }
      }
    });
    this.show_struct_viewer.next('representatives');
  }


}

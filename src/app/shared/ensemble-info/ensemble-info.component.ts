import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
declare const PDBeMolstarPlugin: any;

@Component({
  selector: 'app-ensemble-info',
  templateUrl: './ensemble-info.component.html',
  styleUrls: ['./ensemble-info.component.scss']
})
export class EnsembleInfoComponent implements OnInit {
  @Input() entryId = ""; 
  @Input() ensembleData; // { "models": 0, "chains": {"A": { "currStatData": {...}, "currLinks": {...} }: "B": {...} }}
  chainNames = [];
  chainsData = {};
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
  showStructViewer = new BehaviorSubject<string>('');

  constructor() { 
    
  }

  ngOnInit(): void {
    this.chainNames = this.ensembleData.chains.map( chain => {
      this.chainsData[chain["chain_name"]] = chain;
      return chain["chain_name"]
    }).sort()

    this.currChainName.next(this.chainNames[0]);

    this.currChainName.subscribe(currChainName => {
      console.log("change")
      console.log(currChainName)
      console.log(this.chainsData)
      this.currStatData.relative_asa_mean = this.chainsData[currChainName].relative_asa_mean;
      this.currStatData.entropy_dssp_mean = this.chainsData[currChainName].entropy_dssp_mean;
      this.currStatData.rg_mean = this.chainsData[currChainName].rg_mean;
      this.currLinks.mmcif = environment.ws + "entries/" + this.entryId + "/ensembles/" + this.ensembleData["ensemble_id"] + "/ensemble-sample/";
      this.currLinks.ramachandran_plot = environment.ws + "entries/" + this.entryId + "/ensembles/" + this.ensembleData["ensemble_id"] + "/chains/" + currChainName + "/ramachandran-plot/";
      this.currLinks.rg_boxplot = environment.ws + "entries/" + this.entryId + "/ensembles/" + this.ensembleData["ensemble_id"] + "/chains/" + currChainName + "/rg-boxplot/";
    });

  }

  ngAfterViewInit() {

    // Start Mol*
    this.showStructViewer.subscribe(showStructViewer => {
      if (showStructViewer) {
        if (this.viewerInstance) {

        } else {
          let backroundColor = { r: 255, g: 255, b: 255 };
          if (window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches) {
            backroundColor = { r: 0, g: 0, b: 0 };
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
          const viewerContainer = document.getElementById('molstar' + this.ensembleData['ensemble_id']);
          document.getElementById('molstar' + this.ensembleData['ensemble_id']).style['min-height'] = '300px';
          this.viewerInstance.render(viewerContainer, options);
          this.viewerInstance.events.loadComplete.subscribe(() => {
            if (this.currChainName.value) {
              this.viewerInstance.visual.select({ data: [{ auth_asym_id: this.currChainName.value, color: { r: 50, g: 105, b: 81 } }], nonSelectedColor: { r: 240, g: 240, b: 240 } });
              this.currChainName.subscribe(currCainName => {
                if (currCainName) {
                  this.viewerInstance.visual.select({ data: [{ auth_asym_id: currCainName, color: { r: 50, g: 105, b: 81 } }], nonSelectedColor: { r: 240, g: 240, b: 240 } });
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
                this.viewerInstance.canvas.setBgColor({ r: 0, g: 0, b: 0 });
              } else {
                this.viewerInstance.canvas.setBgColor({ r: 255, g: 255, b: 255 });
              }
            });
        }
      }
    });
    this.showStructViewer.next('representatives');
    // End Mol *



  }



}

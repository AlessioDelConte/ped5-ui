import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import {FeatureViewer} from 'feature-viewer-typescript/lib/feature-viewer';

@Component({
  selector: 'app-feature-viewer-ensemble',
  templateUrl: './feature-viewer-ensemble.component.html',
  styleUrls: ['./feature-viewer-ensemble.component.scss']
})
export class FeatureViewerEnsembleComponent implements OnInit, AfterViewInit {
  fv = null;

  @Input() chain: object;
  @Input() fv_id: string;
  @Input() entryObj: object;

  constructor() {
  }

  ngOnInit() {
  }

  
  ngAfterViewInit() {
    
    const colors_stack = ['#ffff3f99', '#007f5f99', '#55a63099', '#80b91899', '#bfd20099'];

    if (this.chain['sequence']) {
      console.log(this.fv_id);
      this.fv = new FeatureViewer(this.chain['sequence'],
        '#' + this.fv_id, {
          showAxis: true,
          showSequence: true,
          toolbar: false, // zoom
          toolbarPosition: 'left',
          sideBar: false,
          backgroundcolor: 'white',
          zoomMax: 10,       // define the maximum range of the zoom
          flagColor: 'white',
          flagTrack: 400,
          flagTrackMobile: 125
        });


      let position = 0;
      let index_color = 0;
      const protein_row = {
        type: 'rect',
        id: 'Construct' + this.chain['chain_name'],
        label: 'Chain ' + this.chain['chain_name'],
        data: this.chain['fragments'].map((currFragment, indexCurrConstruct) => {
          index_color += 1;
          const start = currFragment.fragment_sequence.start_position_alig + 1;
          position = currFragment.fragment_sequence.end_position_alig + 1;


          // if (this.entryObj['fragment_sequence'] && this.entryObj['fragment_sequence'][this.chain['chain_name']].hasOwnProperty(indexCurrConstruct + 1)) {
          //   start = this.entryObj['fragment_sequence'][this.chain['chain_name']][indexCurrConstruct + 1]['start_position_alig'] + 1;
          //   position = this.entryObj['fragment_sequence'][this.chain['chain_name']][indexCurrConstruct + 1]['end_position_alig'] + 1;
          // }

          let fragmentName = '';
          if (typeof currFragment.description === 'string') {
            fragmentName += '<strong>' + currFragment.description + '</strong>';
          }
          if (typeof currFragment.uniprot_acc === 'string' && currFragment.uniprot_acc.length > 0) {
            fragmentName += ' (' + currFragment.uniprot_acc + ')';
            if (currFragment.uniprot_start_position && currFragment.uniprot_end_position) {
              fragmentName += ' <br> fragment:' + currFragment.uniprot_start_position.toString() + '-' + currFragment.uniprot_end_position.toString();
            }
          }
          return {
            x: start,
            y: position,
            label: currFragment.uniprot_acc ? currFragment.uniprot_acc : '',
            color: colors_stack[index_color % 5],
            tooltip: ' <p>' + fragmentName + ' </p>'
          };
        })
      };

      this.fv.addFeatures([protein_row]);
      let data_mutations = [];
      console.log('this.chain', this.chain);
      if (this.chain.hasOwnProperty('mutations')) {
        data_mutations = data_mutations.concat(this.chain['mutations'].map(currItem => {
          return {
            x: currItem.start_position_alig + 1,
            y: currItem.end_position_alig + 1,
            tooltip: 'type: ' + currItem.type + ' from: ' + currItem.from_aa + ' to: ' + currItem.to_aa
          };
        }));
      }
      if (this.chain.hasOwnProperty('missings')) {
        data_mutations = data_mutations.concat(this.chain['missings'].map(currItem => {
          return {
            x: currItem.start_position_alig + 1,
            y: currItem.end_position_alig + 1,
            tooltip: 'type: deletion'
          };
        }));
      }
      let data_ptm = [];
      if (this.chain.hasOwnProperty('modifications')) {
        // console.log('this.chain[\'modifications\']', this.chain['modifications']);
        data_ptm = data_ptm.concat(this.chain['modifications'].map(currItem => {
          // console.log('this.chain[\'modifications\']   currItem', currItem);

          return {
            x: currItem.start_position_alig + 1,
            color: 'red',
            tooltip: 'type: ' + currItem.modification_code
          };
        }));
      }

      if (data_mutations.length > 0) {
        this.fv.addFeatures([{
          type: 'rect',
          id: this.chain['chain_name'] + 'mutation',
          label: 'Mutation',
          color: '#84716a',
          data: data_mutations
        }]);
      }

      // console.log('data_ptm', data_ptm);

      if (data_ptm.length > 0) {
        this.fv.addFeatures([{
          type: 'unique',
          id: this.chain['chain_name'] + 'ptm',
          label: 'PTMs',
          color: '#84716a',
          data: data_ptm
        }]);
      }

      if (this.entryObj.hasOwnProperty('data_residue')) {
        const rowsToFV = [];

        this.entryObj['ensembles'].forEach(currEnsemble => {
          const flagID = currEnsemble.ensemble_id + '_' + this.chain['chain_name'];
          const filteredRows = this.entryObj['data_residue'].filter(
            currRow => currRow.ensemble_id === currEnsemble.ensemble_id && currRow.chain === this.chain['chain_name']).sort( (a, b) => a.alignment_position > b.alignment_position ? 1 : -1);
          let fvOnj = [
            {
              type: 'curve',
              id: 'sec_struct' + flagID,
              label: currEnsemble.ensemble_id + ' Secondary structure entropy',
              height: 1,
              yLim: 1,
              color: '#2274a5',
              data: filteredRows.map(currRow => {
                return {
                  x: parseInt(currRow.alignment_position) + 1,
                  y: parseFloat(currRow.entropy_dssp)
                };
              }),
              subfeatures: [
                {
                  type: 'curve',
                  id: 'heleix' + flagID,
                  label: 'Helix',
                  height: 1,
                  color: '#8ac926',
                  data: filteredRows.map(currRow => {
                    return {
                      x: parseInt(currRow.alignment_position) + 1,
                      y: parseFloat(currRow.helix_dssp_percent)
                    };
                  }),
                  yLim: 1
                },
                {
                  type: 'curve',
                  id: 'beta' + flagID,
                  label: 'Beta',
                  height: 1,
                  color: '#1982c4',
                  data: filteredRows.map(currRow => {
                    return {
                      x: parseInt(currRow.alignment_position) + 1,
                      y: parseFloat(currRow.beta_dssp_percent)
                    };
                  }),
                  yLim: 1
                },
                {
                  type: 'curve',
                  id: 'coil' + flagID,
                  label: 'Coil',
                  height: 1,
                  color: '#ff595e',
                  data: filteredRows.map(currRow => {
                    return {
                      x: parseInt(currRow.alignment_position) + 1,
                      y: parseFloat(currRow.coil_dssp_percent !== 'nan' ? currRow.coil_dssp_percent : '0')
                    };
                  }),
                  yLim: 1
                }
              ]
            },
            {
              type: 'curve',
              id: 'rel_asa' + flagID,
              label: currEnsemble.ensemble_id + ' Relative ASA ',
              height: 1,
              color: '#2274a5',
              data: filteredRows.map(currRow => {
                return {
                  x: parseInt(currRow.alignment_position) + 1,
                  y: parseFloat(currRow.mean_relative_ASA !== 'nan' ? currRow.mean_relative_ASA : '0')
                };
              }),
              yLim: 1

            }
          ];
          console.log(fvOnj);
          this.fv.addFeatures(
            fvOnj
          );
        });

      }


    }
    
  }

}

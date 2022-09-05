import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FeatureViewer } from 'feature-viewer-typescript/lib/feature-viewer';

@Component({
  selector: 'app-fv-draft-alignment',
  templateUrl: './fv-draft-alignment.component.html',
  styleUrls: ['./fv-draft-alignment.component.scss']
})
export class FvDraftAlignmentComponent implements OnInit, AfterViewInit {

  @Input() fvId: string;
  @Input() chainData: object;
  fv = null;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    const colors_stack = ['#ffff3f99', '#007f5f99', '#55a63099', '#80b91899', '#bfd20099'];

    console.log("Alignment", this.chainData)
    this.fv = new FeatureViewer(this.chainData['alignment']["pdb_sequence"],
      '#' + this.fvId, {
      showAxis: true,
      showSequence: true,
      toolbar: false, // zoom
      toolbarPosition: 'left',
      sideBar: false,
      backgroundcolor: 'white',
      zoomMax: 10,       // define the maximum range of the zoom
      flagColor: 'white',
      flagTrack: 200,
      flagTrackMobile: 50
    });


    let position = 0;
    let index_color = 0;
    const protein_row = {
      type: 'rect',
      id: 'Construct' + this.chainData['chain_name'],
      label: 'Chain ' + this.chainData['chain_name'],
      data: this.chainData['fragments'].map((currFragment, indexCurrConstruct) => {
        let currFragmentStats = this.chainData['fragments_stats'][indexCurrConstruct]
        index_color += 1;
        const start = currFragmentStats.start_position_alig + 1;
        position = currFragmentStats.end_position_alig + 1;

        let fragmentName = '';
        if (typeof currFragment.description === 'string') {
          fragmentName += '<strong>' + currFragment.description + '</strong>';
        }
        if (typeof currFragment.uniprot_acc === 'string' && currFragment.uniprot_acc.length > 0) {
          fragmentName += ' (' + currFragment.uniprot_acc + ')';
          if (currFragmentStats.uniprot_start_position && currFragmentStats.uniprot_end_position) {
            fragmentName += ' <br> fragment:' + currFragmentStats.uniprot_start_position.toString() + '-' + currFragment.uniprot_end_position.toString();
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


    // Mutations
    let data_mutations = [];
    console.log('this.chain', this.chainData);
    if (this.chainData.hasOwnProperty('mutations')) {
      data_mutations = data_mutations.concat(this.chainData['mutations'].map(currItem => {
        return {
          x: currItem.start_position_alig + 1,
          y: currItem.end_position_alig + 1,
          tooltip: 'type: ' + currItem.type + ' from: ' + currItem.from_aa + ' to: ' + currItem.to_aa
        };
      }));
    }
    if (this.chainData.hasOwnProperty('missings')) {
      data_mutations = data_mutations.concat(this.chainData['missings'].map(currItem => {
        return {
          x: currItem.start_position_alig + 1,
          y: currItem.end_position_alig + 1,
          tooltip: 'type: deletion'
        };
      }));
    }
    if (data_mutations.length > 0) {
      this.fv.addFeatures([{
        type: 'rect',
        id: this.chainData['chain_name'] + 'mutation',
        label: 'Mutation',
        color: '#84716a',
        data: data_mutations
      }]);
    }

    // PTMS
    let data_ptm = [];
    if (this.chainData.hasOwnProperty('modifications')) {
      // console.log('this.chain[\'modifications\']', this.chain['modifications']);
      data_ptm = data_ptm.concat(this.chainData['modifications'].map(currItem => {
        // console.log('this.chain[\'modifications\']   currItem', currItem);

        return {
          x: currItem.start_position_alig + 1,
          color: 'red',
          tooltip: 'type: ' + currItem.modification_code
        };
      }));
    }
    if (data_ptm.length > 0) {
      this.fv.addFeatures([{
        type: 'unique',
        id: this.chainData['chain_name'] + 'ptm',
        label: 'PTMs',
        color: '#84716a',
        data: data_ptm
      }]);
    }

  }
}

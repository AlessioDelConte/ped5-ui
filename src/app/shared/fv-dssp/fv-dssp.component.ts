import { Component, Input, OnInit } from '@angular/core';
import { FeatureViewer } from 'feature-viewer-typescript/lib/feature-viewer';

@Component({
  selector: 'app-fv-dssp',
  templateUrl: './fv-dssp.component.html',
  styleUrls: ['./fv-dssp.component.scss']
})
export class FvDsspComponent implements OnInit {

  @Input() sequence: string;
  @Input() fvId: string;
  @Input() dsspData;
  @Input() chainName: string;

  fv;
  constructor() { }

  ngOnInit(): void {
    console.log(this.fvId)
    console.log(this.chainName)
    console.log(this.dsspData)
  }

  ngAfterViewInit() {
    this.fv = new FeatureViewer(this.sequence,
      '#' + this.fvId, {
      showAxis: true,
      showSequence: true,
      toolbar: false, // zoom
      toolbarPosition: 'left',
      sideBar: false,
      backgroundcolor: 'white',
      zoomMax: 10,       // define the maximum range of the zoom
      flagColor: 'white',
      flagTrack: 300,
      flagTrackMobile: 125
    });

    let ensNames = Object.keys(this.dsspData)

    ensNames.forEach(ensembleId => {
      const flagID = ensembleId + '_' + this.chainName;
      const filteredRows = this.dsspData[ensembleId].filter(
        currRow => currRow.chain === this.chainName).sort((a, b) => a.residue_number > b.residue_number ? 1 : -1);
      let resNumOffset = filteredRows[0]["residue_number"];

      let fvOnj = [
        {
          type: 'curve',
          id: 'sec_struct' + flagID,
          label: ensembleId + ' Secondary structure entropy',
          height: 1,
          yLim: 1,
          color: '#2274a5',
          data: filteredRows.map(currRow => {
            return {
              x: parseInt(currRow.residue_number) - resNumOffset + 1,
              y: parseFloat(currRow.merge_dssp_entropy)
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
                  x: parseInt(currRow.residue_number) - resNumOffset + 1,
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
                  x: parseInt(currRow.residue_number) - resNumOffset + 1,
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
                let y = parseFloat(currRow.coil_dssp_percent !== 'nan' ? currRow.coil_dssp_percent : '0');
                if (parseInt(currRow.residue_number) === 0) {
                  y = 0;
                }
                return {
                  x: parseInt(currRow.residue_number) - resNumOffset + 1,
                  y
                };
              }),
              yLim: 1
            }
          ]
        },
        {
          type: 'curve',
          id: 'rel_asa' + flagID,
          label: ensembleId + ' Relative ASA',
          height: 1,
          color: '#2274a5',
          data: filteredRows.map(currRow => {
            let y = parseFloat(currRow.relative_ASA_mean !== 'nan' ? currRow.relative_ASA_mean : '0');
            if (parseInt(currRow.residue_number) === 0) {
              y = 0;
            }
            return {
              x: parseInt(currRow.residue_number) - resNumOffset + 1,
              y
            };
          }),
          yLim: 1

        }
      ];
      console.log("fvOnj: ", fvOnj);
      this.fv.addFeatures(
        fvOnj
      );
    })


  }

}

import { Component, Input, OnInit } from '@angular/core';
import { InternalService } from 'src/app/services/internal.service';

@Component({
  selector: 'app-assets-download-menu',
  templateUrl: './assets-download-menu.component.html',
  styleUrls: ['./assets-download-menu.component.scss']
})
export class AssetsDownloadMenuComponent implements OnInit {
  @Input() entryId;
  @Input() ensembleId;
  @Input() ensembleData;

  public selectedAsset = "PDB";
  public baseAssetURL;

  public menuData = [];

  constructor(public internalService: InternalService) { }

  ngOnInit(): void {
    this.baseAssetURL = this.internalService.ws + 'entries/' + this.entryId + '/ensembles/' + this.ensembleId;

    this.menuData = [
      {
        "category": "General",
        "assets": {
          "PDB": {},
          "Weights": {}
        }
      }
    ];

    if (!this.ensembleData["only_CA"]) {
      this.menuData.push({
        "category": "Secondary Structure",
        "assets": {
          "DSSP Consensus": {},
          "DSSP Data": {}
        }
      })
      if (this.ensembleData["models"] <= 1000) {
        this.menuData.push({
          "category": "Molprobity",
          "assets": {
            "C-beta Deviations": {},
            "Ramachandran": {},
            "Clash Analysis": {},
            "Geometry Bonds": {},
            "Rotamer": {},
          }
        })
      }
    }

    this.menuData.push({
      "category": "Other",
      "assets": {
        "Maximum Diameter": {},
        "Gyration": {}
      }
    })

  }

  public changeSelectedAsset(newAsset) {
    this.selectedAsset = newAsset;
  }

}

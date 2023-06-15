import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-protein-card',
  templateUrl: './protein-card.component.html',
  styleUrls: ['./protein-card.component.scss']
})
export class ProteinCardComponent implements OnInit {
  @Input() entryData;
  @Input() selectedProtein;
  public coverages = {};
  public validChains = [];

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < this.entryData['construct_chains'].length; i++) {
      const chainData = this.entryData['construct_chains'][i];
      let auxCoverages = chainData["fragments_stats"].filter(el => { return el.uniprot == this.selectedProtein }).map(el => {
        return el.cov_nogaps_frag_unip;
      })
      if(auxCoverages.length > 0){
        this.coverages[chainData["chain_name"]] = auxCoverages;
        this.validChains.push(chainData["chain_name"])
      }
    }
  }

}

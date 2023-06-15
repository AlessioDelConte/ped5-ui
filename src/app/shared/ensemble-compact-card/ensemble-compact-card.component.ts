import { Component, Input, OnInit } from '@angular/core';
import { InternalService } from 'src/app/services/internal.service';

@Component({
  selector: 'app-ensemble-compact-card',
  templateUrl: './ensemble-compact-card.component.html',
  styleUrls: ['./ensemble-compact-card.component.scss']
})
export class EnsembleCompactCardComponent implements OnInit {
  @Input() entryData;
  @Input() ensData;
  @Input() validChains=[];
  ws;
  curChain = "A";

  public curStats = {
    entropy_dssp_mean: 0,
    relative_asa_mean: 0,
    rg_mean: 0
  }

  constructor( private internalService: InternalService) { 
    this.ws = this.internalService.ws;
  }

  updateChainData(){
    this.ensData["chains"].forEach(data => {
      if (data['chain_name'] == this.curChain){
        this.curStats.entropy_dssp_mean = data.entropy_dssp_mean;
        this.curStats.relative_asa_mean = data.relative_asa_mean;
        this.curStats.rg_mean = data.rg_mean;
      }
    });
  }

  ngOnInit(): void {
    this.updateChainData()
  }

  assignChain(chainName){
    this.curChain = chainName;
    this.updateChainData()
  }

}

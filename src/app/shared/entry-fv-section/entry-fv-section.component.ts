import { Component, Input, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { InternalService } from 'src/app/services/internal.service';

@Component({
  selector: 'app-entry-fv-section',
  templateUrl: './entry-fv-section.component.html',
  styleUrls: ['./entry-fv-section.component.scss']
})
export class EntryFvSectionComponent implements OnInit {
  @Input() entryData;
  isLoading=true;
  dsspData = {}

  constructor(private internalService: InternalService) { }

  ngOnInit(): void {
    let ensNames = this.entryData["ensembles"].map(ens => {
      return ens["ensemble_id"];
    })
    let obsEnsL = this.entryData["ensembles"].map(ens => {
      return this.internalService.getDSSPConsensus(this.entryData["entry_id"], ens["ensemble_id"], true);
    })


    forkJoin(obsEnsL).subscribe((datas: Array<any>) => {
      let i = 0;
      datas.forEach(data => {
        this.dsspData[ensNames[i]] = data
        i++;
      })
      console.log(this.dsspData)
      this.isLoading=false;
    })

  }

}

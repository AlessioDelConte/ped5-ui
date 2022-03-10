import {Component, Input, OnInit,  AfterViewInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ProSeqViewer} from 'proseqviewer/dist';

@Component({
  selector: 'app-seq-viewer',
  templateUrl: './seq-viewer.component.html',
  styleUrls: ['./seq-viewer.component.scss']
})
export class SeqViewerComponent implements OnInit, AfterViewInit {
  @Input() isCollapsed = new BehaviorSubject(false);
  @Input() entryObj: BehaviorSubject<object>;
  loadingDOM = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const sequenceForViewer = [{sequence: this.entryObj.value['sequence'], id: 1}];
    const proseqviewer = new ProSeqViewer('sqv');
    this.entryObj.subscribe((entryObj) => {
      this.loadingDOM = true;
      const regionsData = [];
      const seq = [...Array(this.entryObj.value['sequence'].length + 1)].fill(0);
      entryObj['fuzzy_region'].forEach(currRegion => {
        const begin = currRegion.start - 1 > 0 ? currRegion.start - 1 : 0;
        const end = currRegion.end > this.entryObj.value['sequence'].length ? this.entryObj.value['sequence'].length : currRegion.end;
        let j: number;
        for (j = begin; j < end; j++) {
          seq[j]++;
        }
      });
      let newRegStart = 1;
      let newRegEnd = 1;
      let k: number;
      for (k = 0; k < this.entryObj.value['sequence'].length; k++) {
        if (seq[k] > 0 && seq[k + 1] === 0) {
          regionsData.push({
            sequenceId: 1,
            start: newRegStart,
            end: newRegEnd,
            backgroundColor: '#1D4E89',
            color: '#FFFFFF'
          });
        } else if (seq[k] === 0 && seq[k + 1] > 0) {
          newRegStart = k + 2;
        }
        newRegEnd += 1;
      }


      this.isCollapsed.subscribe(isCollapsed => {
        if (!isCollapsed) {
          // console.log('this.isCollapsed', this.isCollapsed);


          setTimeout(() => {
            this.loadingDOM = false;
            proseqviewer.draw({
              sequences: sequenceForViewer,
              regions: regionsData,
              options: {
                indexesLocation: 'lateral'
              }
            });

            setTimeout(() => {
              this.loadingDOM = false;
            }, 200);
          }, 250);
        }
      });

    });


  }
}

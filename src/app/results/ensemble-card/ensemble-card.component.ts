import { Component, OnInit, Input } from '@angular/core';
import {environment} from '../../../environments/environment';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-ensemble-card',
  templateUrl: './ensemble-card.component.html',
  styleUrls: ['./ensemble-card.component.scss']
})
export class EnsembleCardComponent implements OnInit {
  @Input() currEnsmeble: object;
  @Input() currConstructs: object[];
  currChainName = new BehaviorSubject<string>('');
  submissionServerURL = environment.submission_server;
  constructor() { }

  ngOnInit(): void {
  }

}

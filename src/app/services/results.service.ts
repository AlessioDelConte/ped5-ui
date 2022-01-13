import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  entryObj = {
    constructs: []
  };
  currViewMode = '';
  currentUUID = '';
  submissionServerURL = environment.submission_server;

  constructor() { }

  parse(currEntryObj): void {
    this.entryObj = currEntryObj;

  }

  get
}

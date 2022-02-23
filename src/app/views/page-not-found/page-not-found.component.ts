import { Component, OnInit } from '@angular/core';
import { Toast, Tooltip} from 'bootstrap';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
    // const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    // const tooltipList = tooltipTriggerList.map(tooltipTriggerEl => {
    //   return new Tooltip(tooltipTriggerEl);
    // });
  }

  showToast(): void {
    // const myToast = new Toast(document.getElementById('liveToast2'));
    // myToast.show();
  }
}

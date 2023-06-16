import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle("Help - PED");
  }

  ngOnInit(): void {
  }

  public scroll(el: HTMLElement) {
    const y = el.getBoundingClientRect().top + window.scrollY - 75;
    window.scrollTo({ top: y, behavior: "smooth" })
    // el.scrollIntoView(true);
  }

}

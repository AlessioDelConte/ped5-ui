import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { Dropdown, Collapse } from 'bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  profileObj;
  url = '';
  currentUser = {};
  previousPosition = 0;

  constructor(public router: Router) {
  }

  ngOnInit(): void {
  }

  closeMenu(): void {
    const myCollapse = document.getElementById('navbarText');
    // console.log(myCollapse);
    const bsCollapse = new Collapse(myCollapse , {toggle: false});
    bsCollapse.toggle();
  }
  toggleUserDropDown(menuID): void {
    const myDropdown = new Dropdown( document.getElementById(menuID));
    myDropdown.toggle();
  }


}

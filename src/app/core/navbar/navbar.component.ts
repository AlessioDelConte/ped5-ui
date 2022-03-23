import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dropdown, Collapse } from 'bootstrap';
import { AuthService } from '../../services/auth.service';

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


  darkMode = false;

  constructor(public router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.authentication();
    this.authService.profileObj.subscribe(profileObj => this.profileObj = profileObj);
  }

  closeMenu(): void {
    const myCollapse = document.getElementById('navbarText');
    // console.log(myCollapse);
    const bsCollapse = new Collapse(myCollapse, { toggle: false });
    bsCollapse.toggle();
  }
  toggleUserDropDown(menuID): void {
    const myDropdown = new Dropdown(document.getElementById(menuID));
    myDropdown.toggle();
  }

  switchDarkMode(): void {
    if (this.darkMode) {
      document.documentElement.setAttribute('data-theme', 'light');
      this.darkMode = false;
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      this.darkMode = true;
      window.matchMedia("(prefers-color-scheme: dark)").media
    }
  }

  logout(){
    this.authService.logout()
  }


}

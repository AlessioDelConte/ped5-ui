import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  env;
  profileObj;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.env = environment;
    this.authService.authentication();
    this.authService.profileObj.subscribe(profileObj => this.profileObj = profileObj);
  }

}

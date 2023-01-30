import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import SwaggerUI from 'swagger-ui';

@Component({
  selector: 'app-swagger-ui',
  templateUrl: './swagger-ui.component.html',
  styleUrls: ['./swagger-ui.component.scss']
})
export class SwaggerUiComponent implements OnInit {

  constructor(private titleService: Title) { 
    this.titleService.setTitle("API - PED");
  }

  ngOnInit(): void {
    SwaggerUI({
      domNode: document.getElementById('swagger-ui-item'),
      url: '../assets/ped_api_v1.json'
    });
  }

}

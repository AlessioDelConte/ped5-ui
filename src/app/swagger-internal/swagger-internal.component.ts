import { Component, OnInit } from '@angular/core';
import SwaggerUI from 'swagger-ui';

@Component({
  selector: 'app-swagger-internal',
  templateUrl: './swagger-internal.component.html',
  styleUrls: ['./swagger-internal.component.scss']
})
export class SwaggerInternalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    SwaggerUI({
      domNode: document.getElementById('swagger-ui-item'),
      url: '../assets/biocuration_form.openapi.json'
    });
  }

}

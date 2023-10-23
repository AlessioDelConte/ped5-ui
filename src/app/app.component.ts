import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import dataCatalog from '../assets/bioschemas/dataCatalog.json';

@Component({
  selector : 'app-root',
  templateUrl : './app.component.html',
  styleUrls : ['./app.component.scss'],
})
export class AppComponent {
  title = 'ped5-ui';

  // Regex to check if the current page is an entry page
  pedEntryRegex = new RegExp('^/entries/PED\\d{5}$|^/entries/PED\\d{5}e\\d{3}$');


  constructor(private router: Router) {

    // Add BioSchema DataCatalog on the home page and remove it from all other pages
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        // console.log(val);
        if (val.url === '/') {
          if (!document.getElementById('dataCatalog')) {
            const scriptTag = document.createElement('script'); // creates the script tag
            scriptTag.text = JSON.stringify(dataCatalog); // sets the source (insert url in between quotes)
            scriptTag.type = 'application/ld+json'; // set the script type
            scriptTag.id = 'dataCatalog'; // set the script type
            scriptTag.async = true; // makes script run asynchronously
            document.getElementsByTagName('head')[0].appendChild(scriptTag);
          }
        } else {
          if (document.getElementById('dataCatalog')) {
            document.getElementById('dataCatalog').remove();
          }
        }

        // Remove dataRecord from all not entry pages
        if (!val.url.toUpperCase().match(this.pedEntryRegex)) {
          if (document.getElementById('dataRecord')) {
            document.getElementById('dataRecord').remove();
          }
        }
      }
    });
  }

}

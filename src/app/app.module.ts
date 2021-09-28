import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, UrlMatchResult, Routes} from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CdkTableModule} from '@angular/cdk/table';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {HomeComponent} from './home/home.component';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';



const appRoutes: Routes = [

  {path: '', component: HomeComponent},
  {path: '**', component: PageNotFoundComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes, {
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
        scrollOffset: [0, 150]
      }
      // { enableTracing: true } // <-- debugging purposes only
    ),
    ReactiveFormsModule,
    FormsModule,
    CdkTableModule,
    HttpClientModule,
    PaginationModule.forRoot(),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

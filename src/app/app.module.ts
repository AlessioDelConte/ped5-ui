import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, UrlMatchResult, Routes} from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CdkTableModule} from '@angular/cdk/table';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {NavbarComponent} from './core/navbar/navbar.component';
import {FooterComponent} from './core/footer/footer.component';
import {HomeComponent} from './views/home/home.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { SwaggerUiComponent } from './swagger-ui/swagger-ui.component';
import { SwaggerInternalComponent } from './swagger-internal/swagger-internal.component';
import { RecaptchaDirective } from './recaptcha.directive';
import { BrowseComponent} from './views/browse/browse.component';
import { AboutComponent } from './views/about/about.component';
import { EntryViewComponent } from './views/entry-view/entry-view.component';
import { ProteinViewComponent } from './views/protein-view/protein-view.component';
import { EntryDescriptionComponent } from './shared/entry-description/entry-description.component';



const appRoutes: Routes = [
  {
    path: 'entries/:identifier',
    component: EntryViewComponent
  },
  {
    path: 'browse',
    component: BrowseComponent
  },
  {path: 'api', component: SwaggerUiComponent},
  {path: 'api-form', component: SwaggerInternalComponent},
  {path: '', component: HomeComponent},
  {path: '**', component: PageNotFoundComponent}
];


// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    SwaggerUiComponent,
    SwaggerInternalComponent,
    RecaptchaDirective,
    AboutComponent,
    EntryViewComponent,
    ProteinViewComponent,
    EntryDescriptionComponent,
    BrowseComponent
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
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CdkTableModule,
    PaginationModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

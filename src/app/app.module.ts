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
import { SwaggerUiComponent } from './swagger-ui/swagger-ui.component';
import { SwaggerInternalComponent } from './swagger-internal/swagger-internal.component';
import { RecaptchaDirective } from './recaptcha.directive';
import { SubmissionComponent } from './submission/submission.component';
import { FormDescriptionComponent } from './form-description/form-description.component';
import { FormConstructComponent } from './form-construct/form-construct.component';
import { FormFilesComponent } from './form-files/form-files.component';
import { LoginComponent } from './login/login.component';
import {SubmissionResolver} from './submission.resolver';
import { FormUploadComponent } from './form-upload/form-upload.component';
import { ResultPageComponent } from './result-page/result-page.component';



const appRoutes: Routes = [

  { path: 'submission',
    component: SubmissionComponent,
    resolve: {entry: SubmissionResolver}
  },
  {
    path: 'results/:identifier',
    component: ResultPageComponent
  },
  {path: 'api', component: SwaggerUiComponent},
  {path: 'api-form', component: SwaggerInternalComponent},
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
    SwaggerUiComponent,
    SwaggerInternalComponent,
    RecaptchaDirective,
    SubmissionComponent,
    FormDescriptionComponent,
    FormConstructComponent,
    FormFilesComponent,
    LoginComponent,
    FormUploadComponent,
    ResultPageComponent,
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

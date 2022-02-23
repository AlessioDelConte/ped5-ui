import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, UrlMatchResult, Routes} from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CdkTableModule} from '@angular/cdk/table';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {NavbarComponent} from './core/navbar/navbar.component';
import {FooterComponent} from './core/footer/footer.component';
import {HomeComponent} from './views/home/home.component';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {PageNotFoundComponent} from './views/page-not-found/page-not-found.component';
import { SwaggerUiComponent } from './views/swagger-ui/swagger-ui.component';
import { SwaggerInternalComponent } from './views/swagger-internal/swagger-internal.component';
import { RecaptchaDirective } from './recaptcha.directive';
import { SubmissionComponent } from './views/submission/submission.component';
import { FormDescriptionComponent } from './submission-form/form-description/form-description.component';
import { FormConstructComponent } from './submission-form/form-construct/form-construct.component';
import { FormFilesComponent } from './submission-form/form-files/form-files.component';
import { LoginComponent } from './views/login/login.component';
import { SubmissionResolver } from './submission.resolver';
import { FormUploadComponent } from './submission-form/form-upload/form-upload.component';
import { ResultPageComponent } from './results/result-page/result-page.component';
import { EnsembleCardComponent } from './results/ensemble-card/ensemble-card.component';
import { JobsBrowseComponent } from './views/jobs-browse/jobs-browse.component';
import { JobResultViewComponent } from './views/job-result-view/job-result-view.component';



const appRoutes: Routes = [

  { path: 'submission',
    component: SubmissionComponent,
    resolve: {entry: SubmissionResolver}
  },
  {
    path: 'jobs/browse',
    component: JobsBrowseComponent
  },
  {
    path: 'job/:identifier',
    component: JobResultViewComponent
  },
  {
    path: 'login',
    component: LoginComponent
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
    SubmissionComponent,
    FormDescriptionComponent,
    FormConstructComponent,
    FormFilesComponent,
    LoginComponent,
    FormUploadComponent,
    ResultPageComponent,
    EnsembleCardComponent,
    JobsBrowseComponent,
    JobResultViewComponent,
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

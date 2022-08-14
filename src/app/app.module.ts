import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { routes } from './app.route';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { getFullApi } from './common/services/ApiCalls/getFullApi.service';
import { handleFunction } from './common/services/functions/handleFunctions';
import { HandleDataService } from './common/services/Data/handle-data.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ExcelService } from './common/services/sharedServices/excel.service';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
  MatSelectModule, 
  MatIconModule,
  MatSidenavModule
} from '@angular/material';
import { ApiCallsService } from './common/services/ApiCalls/ApiCalls.service';
import { Http } from '@angular/http';
import { ExamComponent } from './pages/Exam/exam/exam.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    MainPageComponent,
    ExamComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatTooltipModule,
    MatSelectModule,
    MatSidenavModule,
    MatIconModule,
    RouterModule.forRoot(routes),
    Ng4LoadingSpinnerModule.forRoot()

  ],
  providers: [getFullApi, handleFunction,ApiCallsService,Http, HandleDataService, ExcelService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }

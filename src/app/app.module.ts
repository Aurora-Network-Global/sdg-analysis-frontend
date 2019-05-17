import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {DropdownModule, InputTextModule, MessagesModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/button';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {appRouting} from './app.routing';
import {QueryService} from './services/query.service';
import {RunnerService} from './services/runner.service';
import {ResultsService} from './services/results.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ProjectService} from './services/project.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ButtonModule,
    InputTextModule,
    MessagesModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    DropdownModule,
    BrowserAnimationsModule,
    appRouting
  ],
  providers: [HttpClientModule, QueryService, RunnerService, ResultsService, ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }

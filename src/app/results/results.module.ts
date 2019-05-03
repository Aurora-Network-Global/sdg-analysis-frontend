import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ResultsComponent} from './results.component';
import {resultsRouting} from './results.routing';
import {FileUploadModule, SpinnerModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    FileUploadModule,
    SpinnerModule,
    TableModule,
  resultsRouting],
  declarations: [ResultsComponent],
  exports: [ResultsComponent],
  providers: []
})

export class ResultsModule {}

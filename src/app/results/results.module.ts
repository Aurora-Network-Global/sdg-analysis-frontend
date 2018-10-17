import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ResultsComponent} from './results.component';
import {resultsRouting} from './results.routing';
import {FileUploadModule} from 'primeng/primeng';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    FileUploadModule,
  resultsRouting],
  declarations: [ResultsComponent],
  exports: [ResultsComponent],
  providers: []
})

export class ResultsModule {}

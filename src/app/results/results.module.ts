import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {EidsComponent} from './eids.component';
import {resultsRouting} from './results.routing';
import {FileUploadModule, SpinnerModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {RecordsComponent} from './records.component';
import {KeywordsComponent} from './keywords.component';
import {ScivalComponent} from './scival.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    FileUploadModule,
    SpinnerModule,
    TableModule,
  resultsRouting],
  declarations: [EidsComponent, RecordsComponent, KeywordsComponent, ScivalComponent],
  exports: [EidsComponent, RecordsComponent, KeywordsComponent, ScivalComponent],
  providers: []
})

export class ResultsModule {}

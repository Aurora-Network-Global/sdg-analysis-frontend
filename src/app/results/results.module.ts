import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {EidsComponent} from './eids.component';
import {resultsRouting} from './results.routing';
import {FileUploadModule, MessageModule, MessagesModule, SpinnerModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {RecordsComponent} from './records.component';
import {KeywordsComponent} from './keywords.component';
import {ScivalComponent} from './scival.component';
import {EidsService} from '../services/eids.service';
import {RelevanceMeasuresComponent} from './relevance.measures.component';
import {ClipboardModule, ClipboardService} from 'ngx-clipboard';
import {RunnerService} from '../services/runner.service';
import {MessageService} from 'primeng/components/common/messageservice';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    MessagesModule,
    MessageModule,
    ClipboardModule,
    FormsModule,
    FileUploadModule,
    SpinnerModule,
    TableModule,
  resultsRouting],
  declarations: [EidsComponent, RecordsComponent, KeywordsComponent, ScivalComponent, RelevanceMeasuresComponent],
  exports: [EidsComponent, RecordsComponent, KeywordsComponent, ScivalComponent, RelevanceMeasuresComponent],
  providers: [EidsService, ClipboardService, MessageService]
})

export class ResultsModule {}

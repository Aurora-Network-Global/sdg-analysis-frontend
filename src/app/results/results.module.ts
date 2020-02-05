import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {EidsComponent} from './eids.component';
import {resultsRouting} from './results.routing';
import {FileUploadModule, InputTextModule, MessageModule, MessagesModule} from 'primeng/primeng';
import {SpinnerModule} from 'primeng/spinner';
import {TableModule} from 'primeng/table';
import {RecordsComponent} from './records.component';
import {KeywordsComponent} from './keywords.component';
import {ScivalComponent} from './scival.component';
import {EidsService} from '../services/eids.service';
import {RelevanceMeasuresComponent} from './relevance.measures.component';
import {ClipboardModule, ClipboardService} from 'ngx-clipboard';
import {MessageService} from 'primeng/components/common/messageservice';
import {ToastModule} from 'primeng/toast';
import {SurveyComponent} from './survey.component';
import {SurveyService} from '../services/survey.service';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    ClipboardModule,
    FormsModule,
    InputTextModule,
    FileUploadModule,
    SpinnerModule,
    TableModule,
  resultsRouting],
  declarations: [EidsComponent, RecordsComponent, KeywordsComponent, ScivalComponent, RelevanceMeasuresComponent, SurveyComponent],
  exports: [EidsComponent, RecordsComponent, KeywordsComponent, ScivalComponent, RelevanceMeasuresComponent, SurveyComponent],
  providers: [EidsService, ClipboardService, MessageService, SurveyService]
})

export class ResultsModule {}

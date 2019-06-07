import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {QueriesComponent} from './queries.component';
import {FileUploadModule, InputTextareaModule, InputTextModule, ProgressBarModule} from 'primeng/primeng';
import {queriesRouting} from './queries.routing';
import {ButtonModule} from 'primeng/button';
import {ClipboardModule, ClipboardService} from 'ngx-clipboard';
import {ToastModule} from 'primeng/toast';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    InputTextareaModule,
    InputTextModule,
    ButtonModule,
    FileUploadModule,
    ProgressBarModule,
    ClipboardModule,
    queriesRouting,
    ToastModule
  ],
  declarations: [QueriesComponent],
  exports: [QueriesComponent],
  providers: [ClipboardService]
})

export class QueriesModule {}

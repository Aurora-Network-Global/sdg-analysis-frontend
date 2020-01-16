import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {QueriesComponent} from './queries.component';
import {FileUploadModule} from 'primeng/fileupload';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressBarModule} from 'primeng/progressbar';
import {queriesRouting} from './queries.routing';
import {ButtonModule} from 'primeng/button';
import {ClipboardModule, ClipboardService} from 'ngx-clipboard';
import {ToastModule} from 'primeng/toast';
import {QueriesXmlComponent} from './queries.xml.component';
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    InputTextareaModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    FileUploadModule,
    ProgressBarModule,
    ClipboardModule,
    queriesRouting,
    ToastModule
  ],
  declarations: [QueriesComponent, QueriesXmlComponent],
  exports: [QueriesComponent, QueriesXmlComponent],
  providers: [ClipboardService]
})

export class QueriesModule {}

import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ButtonModule, FileUploadModule, InputTextareaModule, InputTextModule, ProgressBarModule} from 'primeng/primeng';
import {contentsRouting} from './contents.routing';
import {ContentsComponent} from './contents.component';

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
    contentsRouting],
  declarations: [ContentsComponent],
  exports: [ContentsComponent],
  providers: []
})

export class ContentsModule { }

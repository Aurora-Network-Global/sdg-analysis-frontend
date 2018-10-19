import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {QueriesComponent} from './queries.component';
import {FileUploadModule, InputTextareaModule, InputTextModule} from 'primeng/primeng';
import {queriesRouting} from './queries.routing';
import {ButtonModule} from 'primeng/button';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    InputTextareaModule,
    InputTextModule,
    ButtonModule,
    FileUploadModule,
  queriesRouting],
  declarations: [QueriesComponent],
  exports: [QueriesComponent],
  providers: []
})

export class QueriesModule {}

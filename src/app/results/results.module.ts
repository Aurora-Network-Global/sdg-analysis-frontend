import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ResultsComponent} from './results.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule],
  declarations: [ResultsComponent],
  exports: [ResultsComponent],
  providers: []
})

export class ResultsModule {}

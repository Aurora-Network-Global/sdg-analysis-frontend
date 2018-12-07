import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {StartComponent} from './start.component';
import {startRouting} from './start.routing';
import {ButtonModule} from 'primeng/button';
import {AutoCompleteModule, DropdownModule} from 'primeng/primeng';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    AutoCompleteModule,
    DropdownModule,
    startRouting
  ],
  declarations: [StartComponent],
  exports: [StartComponent],
  providers: []
})

export class StartModule {}

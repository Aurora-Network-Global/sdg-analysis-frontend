import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FacettesComponent} from './facettes.component';
import {FileUploadModule, InputTextareaModule, InputTextModule, ProgressBarModule} from 'primeng/primeng';
import {facettesRouting} from './facettes.routing';
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
    facettesRouting,
    ToastModule
  ],
  declarations: [FacettesComponent],
  exports: [FacettesComponent],
  providers: [ClipboardService]
})

export class FacettesModule {}

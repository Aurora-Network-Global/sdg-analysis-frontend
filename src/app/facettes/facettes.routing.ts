import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FacettesComponent} from './facettes.component';


const routes: Routes = [
  { path : ':queryId', component: FacettesComponent }
];

export const facettesRouting: ModuleWithProviders = RouterModule.forChild(routes);

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StartComponent} from './start.component';


const routes: Routes = [
  { path : '', component: StartComponent }
];

export const startRouting: ModuleWithProviders = RouterModule.forChild(routes);

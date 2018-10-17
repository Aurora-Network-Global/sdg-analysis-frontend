import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ResultsComponent} from './results.component';


const routes: Routes = [
  { path : ':query_id', component: ResultsComponent }
];

export const resultsRouting: ModuleWithProviders = RouterModule.forChild(routes);

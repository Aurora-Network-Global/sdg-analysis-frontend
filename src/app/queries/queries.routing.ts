import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QueriesComponent} from './queries.component';


const routes: Routes = [
  { path : ':queryId', component: QueriesComponent }
];

export const queriesRouting: ModuleWithProviders = RouterModule.forChild(routes);

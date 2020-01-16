import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QueriesComponent} from './queries.component';
import {QueriesXmlComponent} from './queries.xml.component';


const routes: Routes = [
  { path : ':queryId', component: QueriesXmlComponent }
];

export const queriesRouting: ModuleWithProviders = RouterModule.forChild(routes);

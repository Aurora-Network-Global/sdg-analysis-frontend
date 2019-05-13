import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EidsComponent} from './eids.component';
import {RecordsComponent} from './records.component';
import {KeywordsComponent} from './keywords.component';
import {ScivalComponent} from './scival.component';


const routes: Routes = [
  {path: 'eids/:queryId', component: EidsComponent },
  {path: 'records/:queryId', component: RecordsComponent},
  {path: 'keywords/:queryId', component: KeywordsComponent},
  {path: 'scival/:queryId', component: ScivalComponent}
];

export const resultsRouting: ModuleWithProviders = RouterModule.forChild(routes);

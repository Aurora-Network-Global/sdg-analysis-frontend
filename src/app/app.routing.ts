import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

const routes: Routes = [
  {path: 'start', loadChildren: 'app/start/start.module#StartModule'},
  {path: 'queries', loadChildren: 'app/queries/queries.module#QueriesModule'},
  {path: 'results', loadChildren: 'app/results/results.module#ResultsModule'},
  {path: 'facettes', loadChildren: 'app/facettes/facettes.module#FacettesModule'},
  {path: '', redirectTo: '/start', pathMatch: 'full'}
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(routes);

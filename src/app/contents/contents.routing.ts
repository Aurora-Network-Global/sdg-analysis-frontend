import {RouterModule, Routes} from '@angular/router';
import {ContentsComponent} from '../contents/contents.component';
import {ModuleWithProviders} from '@angular/core';

const routes: Routes = [
  { path : ':query_id', component: ContentsComponent }
];

export const contentsRouting: ModuleWithProviders = RouterModule.forChild(routes);

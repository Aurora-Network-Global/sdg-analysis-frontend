import {HttpHeaders} from '@angular/common/http';

export const resultsPages = [{
  key: 'eids',
  title: 'EIDs'
}, {
  key: 'relevance',
  title: 'Relevance'
}, {
  key: 'records',
  title: 'Records'
}, {
  key: 'keywords',
  title: 'Keywords'
}, {
  key: 'scival',
  title: 'Scival'
}, {
  key: 'survey',
  title: 'Survey'
}];

export const headers = new HttpHeaders().set('Content-Type', 'application/json');

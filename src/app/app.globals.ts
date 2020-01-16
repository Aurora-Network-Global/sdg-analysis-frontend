import {HttpHeaders} from '@angular/common/http';

// export const serverAddress = '/queryExecution';
export const serverAddress = 'http://localhost:5000';

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

export const queryUrl = serverAddress + '/query/';
export const statusUrl = serverAddress + '/status/collection_progress/';
export const keywordsUrl = serverAddress + '/keywords/collect/';
export const relevanceMeasuresUrl = serverAddress + '/relevanceMeasures/single/';
export const getScopusSearchString = serverAddress + '/query/scopusSearchString/';
export const headers = new HttpHeaders().set('Content-Type', 'application/json');

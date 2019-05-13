import {HttpHeaders} from '@angular/common/http';

// export const serverAddress = '/queryExecution';
export const serverAddress = 'http://localhost:5000';

export const uploadScivalDataUrl = serverAddress + '/scival/single/';
export const checkScival = serverAddress + '/scival/check/';
export const queryUrl = serverAddress + '/query/';
export const statusUrl = serverAddress + '/status/single/';
export const keywordsUrl = serverAddress + '/keywords/';
export const relevanceMeasuresUrl = serverAddress + '/relevanceMeasures/single/';
export const getScopusSearchString = serverAddress + '/query/scopusSearchString/';
export const headers = new HttpHeaders().set('Content-Type', 'application/json');

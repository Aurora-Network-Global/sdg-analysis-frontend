import {HttpHeaders} from '@angular/common/http';

const serverAddress = '/queryExecution';

export const uploadScivalDataUrl = serverAddress + '/uploadScivalData/';
export const uploadTestDataUrl = serverAddress + '/uploadTestData/';
export const checkScival = serverAddress + '/checkScival/';
export const downloadEidsURL = serverAddress + '/downloadEids/';
export const checkEids = serverAddress + '/checkEids/';
export const listQueries = serverAddress + '/listQueries';
export const saveQuery = serverAddress + '/saveQuery/';
export const getQuery = serverAddress + '/getQuery/';
export const statusUrl = serverAddress + '/getStatus/';
export const keywordsUrl = serverAddress + '/getKeywords/';
export const relevanceMeasuresUrl = serverAddress + '/getRelevanceMeasures/';
export const runQueryUrl = serverAddress + '/query_execution/';
export const getScopusSearchString = serverAddress + '/getScopusSearchString/';
export const headers = new HttpHeaders().set('Content-Type', 'application/json');

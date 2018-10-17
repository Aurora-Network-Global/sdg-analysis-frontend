import {HttpHeaders} from '@angular/common/http';

const serverAddress = 'http://localhost:5000';

export const uploadScivalDataUrl = serverAddress + '/uploadScivalData/';
export const importScivalDataUrl = serverAddress + '/importScivalData/';
export const checkScival = serverAddress + '/checkScival';
export const downloadEidsURL = serverAddress + '/downloadEids/';
export const checkEids = serverAddress + '/checkEids';
export const listQueries = serverAddress + '/listQueries';
export const saveQuery = serverAddress + '/saveQuery/';
export const getQuery = serverAddress + '/getQuery/';
export const statusUrl = serverAddress + '/getStatus/'
export const runQueryUrl = serverAddress + '/query_execution/';
export const getScopusSearchString = serverAddress + '/getScopusSearchString/';
export const query_executionUrl = serverAddress + '/query_execution/';
export const headers = new HttpHeaders().set('Content-Type', 'application/json');

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import * as appGlobals from '../app.globals';
import {Query} from '../model/Query';
import {Project} from '../model/Project';

@Injectable()
export class FileService {

    constructor(private http: HttpClient) {
    }

    isEids(query_id: string): Observable<boolean> {
      return this.http.get<boolean>(appGlobals.checkEids + query_id);
    }

    isScival(query_id: string): Observable<boolean> {
      return this.http.get<boolean>(appGlobals.checkScival + query_id);
    }

    saveQuery(query: Query, query_id: string): Observable<Query> {
      return this.http.post<Query>(appGlobals.saveQuery + query_id, JSON.stringify(query), {headers: appGlobals.headers});
    }

    getQuery(query_id: string): Observable<Query> {
      return this.http.get<Query>(appGlobals.getQuery + query_id);
    }
}

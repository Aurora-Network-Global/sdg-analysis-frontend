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

    private eidsUrl = appGlobals.serverAddress + '/eids';

    isEids(query_id: string): Observable<boolean> {
      return this.http.get<boolean>(this.eidsUrl + '/check/' + query_id);
    }

    isScival(query_id: string): Observable<boolean> {
      return this.http.get<boolean>(appGlobals.checkScival + query_id);
    }

    saveQuery(query: Query, query_id: string): Observable<Query> {
      return this.http.post<Query>(appGlobals.queryUrl + 'single/' + query_id, JSON.stringify(query), {headers: appGlobals.headers});
    }

    getQuery(query_id: string): Observable<Query> {
      return this.http.get<Query>(appGlobals.queryUrl + 'single/' + query_id);
    }
}

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import * as appGlobals from '../app.globals';
import {Query} from '../model/Query';

@Injectable()
export class QueryService {

    constructor(private http: HttpClient) {
    }

    saveQuery(query: Query, query_id: string): Observable<Query> {
      return this.http.post<Query>(appGlobals.queryUrl + 'single/' + query_id, JSON.stringify(query), {headers: appGlobals.headers});
    }

    getQuery(query_id: string): Observable<Query> {
      return this.http.get<Query>(appGlobals.queryUrl + 'single/' + query_id);
    }
}

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import * as appGlobals from '../app.globals';
import {Query} from '../model/Query';

@Injectable()
export class QueryService {

    constructor(private http: HttpClient) {
    }

    saveQuery(query: Query, queryId: string): Observable<Query> {
      return this.http.post<Query>(appGlobals.queryUrl + 'single/' + queryId, JSON.stringify(query), {headers: appGlobals.headers});
    }

    getQuery(queryId: string): Observable<Query> {
      return this.http.get<Query>(appGlobals.queryUrl + 'single/' + queryId);
    }

    getSearchString(queryId: string, target: string): Observable<string> {
      return this.http.get(appGlobals.queryUrl + target + 'SearchString/' + queryId, {responseType: 'text'});
    }
}

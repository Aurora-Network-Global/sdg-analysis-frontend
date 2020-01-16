import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import * as appGlobals from '../app.globals';
import {QueryOld} from '../model/QueryOld';
import {Query} from '../model/Query';
import {ScopusQueries} from '../model/ScopusQueries';

@Injectable()
export class QueryService {

  constructor(private http: HttpClient) {
  }

  saveQuery(query: QueryOld, queryId: string): Observable<QueryOld> {
    return this.http.post<QueryOld>(appGlobals.queryUrl + 'single/' + queryId, JSON.stringify(query), {headers: appGlobals.headers});
  }

  getQuery(queryId: string): Observable<QueryOld> {
    return this.http.get<QueryOld>(appGlobals.queryUrl + 'single/' + queryId);
  }

  getQueryFromXml(queryId: string): Observable<Query> {
    return this.http.get<Query>(appGlobals.queryUrl + 'single_xml/' + queryId);
  }

  saveQueryAsXml(query: Query, queryId: string): Observable<Query> {
    return this.http.post<Query>(appGlobals.queryUrl + 'single_xml/' + queryId, JSON.stringify(query), {headers: appGlobals.headers});
  }

  getSearchString(queryId: string, target: string): Observable<ScopusQueries> {
    return this.http.get<ScopusQueries>(appGlobals.queryUrl + target + 'SearchString/' + queryId,);
  }
}

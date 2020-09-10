import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import * as appGlobals from '../app.globals';
import {Query} from '../model/Query';
import {ScopusQueries} from '../model/ScopusQueries';
import {environment} from '../../environments/environment';

@Injectable()
export class QueryService {

  constructor(private http: HttpClient) {
  }

  private queryUrl = environment.serverAddress + '/query';

  getQueryFromXml(queryId: string): Observable<Query> {
    return this.http.get<Query>(this.queryUrl + '/single/' + queryId);
  }

  saveQueryAsXml(query: Query, queryId: string): Observable<Query> {
    return this.http.post<Query>(this.queryUrl + '/single_xml/' + queryId, JSON.stringify(query), {headers: appGlobals.headers});
  }

  getSearchString(queryId: string, target: string): Observable<ScopusQueries> {
    return this.http.get<ScopusQueries>(this.queryUrl + '/' + target + '/SearchString/' + queryId,);
  }
}

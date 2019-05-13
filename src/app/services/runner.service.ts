import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import * as appGlobals from '../app.globals';
import {Query} from '../model/Query';
import {Status} from '../model/Status';

@Injectable()
export class RunnerService {

  constructor(private http: HttpClient) {
  }

  runQuery(queryId: string): Observable<string> {
    return this.http.post<string>(appGlobals.serverAddress + '/query/execution/' + queryId, {}, {headers: appGlobals.headers});
  }

  getStatus(queryId): Observable<Status> {
    return this.http.get<Status>(appGlobals.statusUrl + queryId);
  }

  collectData(queryId: string): Observable<string> {
    return this.http.post<string>(appGlobals.serverAddress + '/collect_data/' + queryId, {}, {headers: appGlobals.headers});
  }
}

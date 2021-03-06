import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import * as appGlobals from '../app.globals';
import {Status} from '../model/Status';
import {environment} from '../../environments/environment';

@Injectable()
export class RunnerService {

  constructor(private http: HttpClient) {
  }

  private statusUrl = environment.serverAddress + '/status/collection_progress/';

  runQuery(queryId: string): Observable<string> {
    return this.http.post<string>(environment.serverAddress + '/query/execution/' + queryId, {}, {headers: appGlobals.headers});
  }

  getStatus(queryId): Observable<Status> {
    return this.http.get<Status>(this.statusUrl + queryId);
  }

  collectData(queryId: string): Observable<string> {
    return this.http.post<string>(environment.serverAddress + '/collect_data/' + queryId, {}, {headers: appGlobals.headers});
  }

  collectMissingData(queryId: string): Observable<string> {
    return this.http.post<string>(environment.serverAddress + '/collect_data/' + queryId + '?mode=missed_', {}, {headers: appGlobals.headers});
  }

  setQueryIds(projectId) {
    return this.http.post<string>(environment.serverAddress + '/set_query_ids/' + projectId, {}, {headers: appGlobals.headers});
  }
}

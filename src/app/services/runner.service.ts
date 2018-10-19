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

    runQuery(query: Query, query_id: string): Observable<string> {
      return this.http.post<string>(appGlobals.runQueryUrl + query_id, JSON.stringify(query), {headers: appGlobals.headers});
    }

    getStatus(query_id): Observable<Status> {
      return this.http.get<Status>(appGlobals.statusUrl + query_id);
    }
}

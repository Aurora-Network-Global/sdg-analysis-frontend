import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import * as appGlobals from '../app.globals';

@Injectable()
export class EidsService {

  eidsUrl = appGlobals.serverAddress + '/eids';

  constructor(private http: HttpClient) {}

  public getLength(queryId: string, prefix: string): Observable<number> {
    return this.http.get<number>(this.eidsUrl + '/length/' + queryId + '?prefix=' + prefix);
  }

  public getScopusSearchString(queryId: string, prefix: string): Observable<string> {
    return this.http.get<string>(this.eidsUrl + '/scopusSearchString/' + queryId + '?prefix=' + prefix);
  }
}

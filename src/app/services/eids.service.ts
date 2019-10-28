import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as appGlobals from '../app.globals';

@Injectable()
export class EidsService {

  eidsUrl = appGlobals.serverAddress + '/eids';

  constructor(private http: HttpClient) {
  }

  public getLength(queryId: string, prefix: string): Observable<number> {
    return this.http.get<number>(this.eidsUrl + '/length/' + queryId + '?prefix=' + prefix);
  }

  public getScopusSearchString(queryId: string, prefix: string): Observable<string> {
    // @ts-ignore
    return this.http.get(this.eidsUrl + '/scopusSearchString/' + queryId + '?prefix=' + prefix, {responseType: 'text'});
  }

  public getSampleScopusSearchString(queryId: string, sampleSize: number): Observable<string> {
    return this.http.get(this.eidsUrl + '/scopusSearchString/' + queryId + '?prefix=sample_&sample_size=' + String(sampleSize), {responseType: 'text'});
  }
}

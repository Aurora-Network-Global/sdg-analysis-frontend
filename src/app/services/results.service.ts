import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {KeywordFrequency} from '../model/KeywordFrequency';
import * as appGlobals from '../app.globals';
import {RelevanceMeasures} from '../model/RelevanceMeasures';

@Injectable()
export class ResultsService {

  constructor(private http: HttpClient) {
  }

  getKeywords(query_id: string): Observable<KeywordFrequency[]> {
    return this.http.get<KeywordFrequency[]>(appGlobals.keywordsUrl + query_id);
  }

  getRelevanceMeasures(query_id: string): Observable<RelevanceMeasures> {
    return this.http.get<RelevanceMeasures>(appGlobals.relevanceMeasuresUrl + query_id);
  }

  calculateRecall(query_id: string): Observable<RelevanceMeasures> {
    return this.http.get<RelevanceMeasures>(appGlobals.serverAddress + '/relevanceMeasures/getRecall/' + query_id);
  }
}

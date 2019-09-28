import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {KeywordFrequency} from '../model/KeywordFrequency';
import * as appGlobals from '../app.globals';
import {RelevanceMeasures} from '../model/RelevanceMeasures';
import {SurveyResults} from '../model/SurveyResults';

@Injectable()
export class ResultsService {

  constructor(private http: HttpClient) {
  }

  getKeywords(query_id: string): Observable<KeywordFrequency[]> {
    return this.http.get<KeywordFrequency[]>(appGlobals.keywordsUrl + query_id);
  }

  getRelevanceMeasures(query_id: string): Observable<RelevanceMeasures> {
    return this.http.get<RelevanceMeasures>(appGlobals.serverAddress + '/relevanceMeasures/single/' + query_id);
  }

  calculateRecall(query_id: string): Observable<RelevanceMeasures> {
    return this.http.get<RelevanceMeasures>(appGlobals.serverAddress + '/relevanceMeasures/getRecall/' + query_id);
  }

  calculatePrecision(query_id: string): Observable<RelevanceMeasures> {
    return this.http.get<RelevanceMeasures>(appGlobals.serverAddress + '/relevanceMeasures/getPrecision/' + query_id);
  }

  getSurveyResults(query_id: string): Observable<SurveyResults[]> {
    return this.http.get<SurveyResults[]>(appGlobals.serverAddress + '/survey_analyzer/import/' + query_id);
  }

  getSurveyResultsForId(query_id: string, survey_id: string): Observable<SurveyResults[]> {
    return this.http.get<SurveyResults[]>(appGlobals.serverAddress + '/survey_analyzer/collect/' + query_id + '?survey_id=' + survey_id);
  }
}

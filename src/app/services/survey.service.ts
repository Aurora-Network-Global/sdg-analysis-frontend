import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as appGlobals from '../app.globals';
import {SurveyResults} from '../model/SurveyResults';

@Injectable()
export class SurveyService {

  constructor(private http: HttpClient) {
  }

  getSurveyResults(query_id: string): Observable<SurveyResults[]> {
    return this.http.get<SurveyResults[]>(appGlobals.serverAddress + '/survey_analyzer/load/' + query_id);
  }

  recollectSurveyResults(query_id: string): Observable<SurveyResults[]> {
    return this.http.get<SurveyResults[]>(appGlobals.serverAddress + '/survey_analyzer/collect/' + query_id);
  }

  setSurveyId(projectId: string, surveyId: string) {
    const formdata = new FormData();
    formdata.set('survey_id', surveyId);
    return this.http.post(appGlobals.serverAddress + '/survey_analyzer/setSurveyId/' + projectId, formdata);
  }
}

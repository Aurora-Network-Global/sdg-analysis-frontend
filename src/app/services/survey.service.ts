import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SurveyResults} from '../model/SurveyResults';
import {environment} from '../../environments/environment';

@Injectable()
export class SurveyService {

  constructor(private http: HttpClient) {
  }

  getSurveyResults(query_id: string): Observable<SurveyResults[]> {
    return this.http.get<SurveyResults[]>(environment.serverAddress + '/survey_analyzer/load/' + query_id);
  }

  recollectSurveyResults(query_id: string): Observable<SurveyResults[]> {
    return this.http.get<SurveyResults[]>(environment.serverAddress + '/survey_analyzer/collect/' + query_id);
  }

  setSurveyId(projectId: string, surveyId: string) {
    const formdata = new FormData();
    formdata.set('survey_id', surveyId);
    return this.http.post(environment.serverAddress + '/survey_analyzer/setSurveyId/' + projectId, formdata);
  }
}

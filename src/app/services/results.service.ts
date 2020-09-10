import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {KeywordFrequency} from '../model/KeywordFrequency';
import {RelevanceMeasures} from '../model/RelevanceMeasures';
import {environment} from '../../environments/environment';

@Injectable()
export class ResultsService {

  constructor(private http: HttpClient) {
  }

  private relevanceMeasuresUrl = environment.serverAddress + '/relevanceMeasures';

  private keywordsUrl = environment.serverAddress + '/keywords/collect/';

  getKeywords(query_id: string): Observable<KeywordFrequency[]> {
    return this.http.get<KeywordFrequency[]>(this.keywordsUrl + query_id);
  }

  getRelevanceMeasures(query_id: string): Observable<RelevanceMeasures> {
    return this.http.get<RelevanceMeasures>(this.relevanceMeasuresUrl + '/single/' + query_id);
  }

  calculateRecall(query_id: string): Observable<RelevanceMeasures> {
    return this.http.get<RelevanceMeasures>(this.relevanceMeasuresUrl + '/getRecall/' + query_id);
  }

  calculatePrecision(query_id: string): Observable<RelevanceMeasures> {
    return this.http.get<RelevanceMeasures>(this.relevanceMeasuresUrl + '/getPrecision/' + query_id);
  }
}


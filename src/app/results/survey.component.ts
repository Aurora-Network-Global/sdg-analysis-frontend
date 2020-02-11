import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../services/project.service';
import * as appGlobals from '../app.globals';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SurveyResults} from '../model/SurveyResults';
import {KeywordFrequency} from '../model/KeywordFrequency';
import {ClipboardService} from 'ngx-clipboard';
import {MessageService} from 'primeng/api';
import {SurveyService} from '../services/survey.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html'
})
export class SurveyComponent implements OnInit {

  public loading: boolean;

  public queryId: string;

  public busy = false;

  public results: SurveyResults[] = [];

  public surveyId = '';

  public journalCols: any[];

  public keywordCols: any[];

  public articleCols: any[];

  public suggestedKeywordList: KeywordFrequency[] = [];

  public suggestedJournalList: KeywordFrequency[] = [];

  public suggestedKeywordSelection: KeywordFrequency[] = [];

  public suggestedJournalSelection: KeywordFrequency[] = [];

  public selectedKeywordList: KeywordFrequency[] = [];

  public selectedJournalList: KeywordFrequency[] = [];

  public unselectedKeywordList: KeywordFrequency[] = [];

  public unselectedJournalList: KeywordFrequency[] = [];

  public acceptedArticlelList: KeywordFrequency[] = [];

  public rejectedArticleList: KeywordFrequency[] = [];

  public selectedRejectedArticles: KeywordFrequency[];

  public selectedAcceptedArticles: KeywordFrequency[];

  public selectedJournalsSelection: KeywordFrequency[];

  public selectedKeywordsSelection: KeywordFrequency[];

  public unselectedJournalsSelection: KeywordFrequency[];

  public unselectedKeywordsSelection: KeywordFrequency[];

  public acceptedArticles: Map<string, number> = new Map<string, number>();

  public rejectedArticles: Map<string, number> = new Map<string, number>();

  private uploadUrl = appGlobals.serverAddress + '/survey_analyzer/upload/';

  resultPages = appGlobals.resultsPages;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private clipboardService: ClipboardService,
              private messageService: MessageService,
              private projectService: ProjectService,
              private surveyService: SurveyService) {

  }

  ngOnInit(): void {
    this.journalCols = [
      { field: 'keyword', header: 'Journal' },
      { field: 'count', header: 'Count' }
    ];
    this.keywordCols = [
      { field: 'keyword', header: 'Keyword' },
      { field: 'count', header: 'Count' }
    ];
    this.articleCols = [
      { field: 'keyword', header: 'Article' },
      { field: 'count', header: 'Count' }
    ];
    this.loading = true;
    this.route.params.subscribe(
      params => {
        this.queryId = params['queryId'];
        this.route.queryParams.subscribe((queryParams: Params) => {
          if (queryParams['surveyId'] !== undefined) {
            this.surveyId = queryParams['surveyId'];
          }
        });
        this.uploadUrl = this.uploadUrl + this.queryId;
        if (this.projectService.activeProject == null) {
          this.updateProject();
        } else {
          this.loading = false;
        }
        this.loadSurveydata();
      }
    );
  }

  updateProject() {
    this.projectService.getProject(this.queryId).subscribe(
      data => {
        this.projectService.activeProject = data;
        if (this.surveyId !== '') {
          this.setSurveyId();
        }
        this.loading = false;
      }
    );
  }

  loadSurveydata() {
    this.busy = true;
    this.surveyService.getSurveyResults(this.queryId).subscribe(
      data => {
        this.results = data;
        this.countResults();
        this.busy = false;
      }
    );
  }

  reloadSurveydata() {
    this.busy = true;
    this.surveyService.recollectSurveyResults(this.queryId).subscribe(
      data => {
        this.results = data;
        this.countResults();
        this.busy = false;
      }
    );
  }

  countResults() {
    this.acceptedArticles = new Map<string, number>();
    this.rejectedArticles = new Map<string, number>();
    const allSuggestedKeywords = [];
    const allSuggestedJournals = [];
    const allSelectedKeywords = [];
    const allUnselectedKeywords = [];
    const allSelectedJournals = [];
    const allUnselectedJournals = [];
    this.results.forEach(
      result => {
        result.judgements.forEach(
          judgement => {
            if (judgement.judgement) {
              let count;
              if (this.acceptedArticles.has(judgement.eid)) {
                count = this.acceptedArticles.get(judgement.eid);
                count = count + 1;
              } else {
                count = 1;
              }
              this.acceptedArticles.set(judgement.eid, count);
            } else {
              let count;
              if (this.rejectedArticles.has(judgement.eid)) {
                count = this.rejectedArticles.get(judgement.eid);
                count = count + 1;
              } else {
                count = 1;
              }
              this.rejectedArticles.set(judgement.eid, count);
            }
          }
        );
        allSuggestedKeywords.push(...result.suggested_keywords);
        allSuggestedJournals.push(...result.suggested_journals);
        allSelectedKeywords.push(...result.selected_keywords);
        allUnselectedKeywords.push(...result.unselected_keywords);
        allSelectedJournals.push(...result.selected_journals);
        allUnselectedJournals.push(...result.unselected_journals);
      }
    );
    console.log(allUnselectedKeywords.length);

    this.selectedKeywordList = this.buildStatistics(allSelectedKeywords);
    this.selectedJournalList = this.buildStatistics(allSelectedJournals);
    this.unselectedKeywordList = this.buildStatistics(allUnselectedKeywords);
    this.unselectedJournalList = this.buildStatistics(allUnselectedJournals);
    this.suggestedJournalList = this.buildStatistics(allSuggestedJournals);
    this.suggestedKeywordList = this.buildStatistics(allSuggestedKeywords);
    this.acceptedArticlelList = [];
    this.rejectedArticleList = [];
    this.selectedRejectedArticles = [];
    this.selectedAcceptedArticles = [];
    this.selectedJournalsSelection = [];
    this.selectedKeywordsSelection = [];
    this.unselectedJournalsSelection = [];
    this.unselectedKeywordsSelection = [];
    this.rejectedArticles.forEach(
      (entry, key) => this.rejectedArticleList.push(new KeywordFrequency(entry, key))
    );
    this.acceptedArticles.forEach(
      (entry, key) => this.acceptedArticlelList.push(new KeywordFrequency(entry, key))
    );
  }

  buildStatistics(list: string[]) {
    const frequencyList = [];
    const map = new Map<string, number>();
    list.forEach(
      entry => {
        let count;
        if (map.has(entry)) {
          count = map.get(entry);
          count = count + 1;
          map.set(entry, count);
        } else {
          map.set(entry, 1);
        }
      }
    );
    map.forEach((entry, key) => frequencyList.push(new KeywordFrequency(entry, key)));
    return frequencyList;
  }


  copyScopusSearch(eidList: KeywordFrequency[], field: string) {
    let searchString = field + '(';
    eidList.forEach(
      entry => searchString = searchString + '"' + entry.keyword + '" OR '
    );
    searchString = searchString.substring(0, searchString.length - 4) + ')';
    this.clipboardService.copyFromContent(searchString);
    this.messageService.add({
      severity: 'success',
      summary: 'Search copied',
      detail: 'The Scopus search string was copied to the clipboard'
    });
  }

  setSurveyId() {
    this.busy = true;
    this.surveyService.setSurveyId(this.queryId, this.surveyId).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Survey connected',
          detail: 'The survey has been successfully connected to the project'
        });
        this.projectService.getProject(this.queryId).subscribe(
          project => this.projectService.activeProject = project
        );
        this.surveyService.recollectSurveyResults(this.queryId).subscribe(
          data => {
            this.results = data;
            this.busy = false;
          }
        );
      });
  }
}

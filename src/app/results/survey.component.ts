import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../services/project.service';
import {ResultsService} from '../services/results.service';
import * as appGlobals from '../app.globals';
import {ActivatedRoute, Router} from '@angular/router';
import {SurveyResults} from '../model/SurveyResults';
import {KeywordFrequency} from '../model/KeywordFrequency';
import {ClipboardService} from 'ngx-clipboard';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html'
})
export class SurveyComponent implements OnInit {

  public loading: boolean;

  public queryId: string;

  public importing = false;

  public results: SurveyResults[] = [];

  public selectedKeywordList: KeywordFrequency[] = [];

  public selectedJournalList: KeywordFrequency[] = [];

  public acceptedArticlelList: KeywordFrequency[] = [];

  public rejectedArticleList: KeywordFrequency[] = [];

  public selectedRejectedArticles: KeywordFrequency[];

  public selectedAcceptedArticles: KeywordFrequency[];

  public selectedJournalsSelection: KeywordFrequency[];

  public selectedKeywordsSelection: KeywordFrequency[];

  public acceptedArticles: Map<string, number> = new Map<string, number>();

  public selectedKeywords: Map<string, number> = new Map<string, number>();

  public selectedJournals: Map<string, number> = new Map<string, number>();

  public rejectedArticles: Map<string, number> = new Map<string, number>();

  private uploadUrl = appGlobals.serverAddress + '/survey_analyzer/upload/';

  resultPages = appGlobals.resultsPages;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private clipboardService: ClipboardService,
              private messageService: MessageService,
              private projectService: ProjectService,
              private resultsService: ResultsService) {

  }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(
      params => {
        this.queryId = params['queryId'];
        this.uploadUrl = this.uploadUrl + this.queryId;
        if (this.projectService.activeProject == null) {
          this.updateProject();
        } else {
          this.loading = false;
        }
        this.collectSurveyResponses();
      }
    );
  }

  updateProject() {
    this.projectService.getProject(this.queryId).subscribe(
      data => {
        this.projectService.activeProject = data;
        this.loading = false;
      }
    );
  }


  collectSurveyResponses() {
    this.importing = false;
    this.resultsService.getSurveyResults(this.queryId).subscribe(
      data => {
        this.results = data;
        this.countResults();
        this.loading = false;
      });
  }

  countResults() {
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
        result.selected_journals.forEach(
          journal => {
            let count;
            if (this.selectedJournals.has(journal)) {
              count = this.selectedJournals.get(journal);
              count = count + 1;
            } else {
              count = 1;
            }
            this.selectedJournals.set(journal, count);
          }
        );
        result.selected_keywords.forEach(
          keyword => {
            let count;
            if (this.selectedKeywords.has(keyword)) {
              count = this.selectedKeywords.get(keyword);
              count = count + 1;
            } else {
              count = 1;
            }
            this.selectedKeywords.set(keyword, count);
          }
        );
      }
    );
    this.selectedJournals.forEach(
      (entry, key) => this.selectedJournalList.push(new KeywordFrequency(entry, key))
    );
    this.selectedKeywords.forEach(
      (entry, key) => this.selectedKeywordList.push(new KeywordFrequency(entry, key))
    );
    this.rejectedArticles.forEach(
      (entry, key) => this.acceptedArticlelList.push(new KeywordFrequency(entry, key))
    );
    this.acceptedArticles.forEach(
      (entry, key) => this.rejectedArticleList.push(new KeywordFrequency(entry, key))
    );
  }

  copyScopusSearch(eidList: KeywordFrequency[], field: string) {
    let searchString = field + '(';
    eidList.forEach(
      entry => searchString = searchString + '"' +  entry.keyword + '" OR '
    );
    searchString = searchString.substring(0, searchString.length - 4) + ')';
    this.clipboardService.copyFromContent(searchString);
    this.messageService.add({
      severity: 'success',
      summary: 'Search copied',
      detail: 'The Scopus search string was copied to the clipboard'
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../services/project.service';
import {ResultsService} from '../services/results.service';
import {RunnerService} from '../services/runner.service';
import {KeywordFrequency} from '../model/KeywordFrequency';
import * as appGlobals from '../app.globals';

@Component({
  selector: 'app-keywords',
  templateUrl: './keywords.component.html'
})
export class KeywordsComponent implements OnInit {

  loading: boolean;

  queryId: string;

  keywordFrequencyList: KeywordFrequency[];

  resultPages = appGlobals.resultsPages;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public projectService: ProjectService,
    private resultsService: ResultsService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(
      params => {
        this.queryId = params['queryId'];
        if (this.projectService.activeProject == null) {
          this.updateProject();
        } else {
          this.loading = false;
        }
        this.resultsService.getKeywords(this.queryId).subscribe(
          data => this.keywordFrequencyList = data,
          error => console.log('no keywords found')
        );
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
}

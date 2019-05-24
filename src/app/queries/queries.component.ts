import {Component, OnInit} from '@angular/core';
import {QueryService} from '../services/query.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Query} from '../model/Query';
import * as appGlobals from '../app.globals';
import {ProjectService} from '../services/project.service';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html'
})
export class QueriesComponent implements OnInit {

  queryId: string;

  query: Query;

  loading: boolean;

  progress: number;

  resultPages = appGlobals.resultsPages;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public projectService: ProjectService,
              private queryService: QueryService,
              private fileservice: QueryService) {
  }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(
      params => {
        this.queryId = params['queryId'];
        if (this.projectService.activeProject == null) {
          this.projectService.getProject(this.queryId).subscribe(
            data => {
              this.projectService.activeProject = data;
            }
          );
        }
        this.fileservice.getQuery(this.queryId).subscribe(
          data => {
            this.query = data;
            this.loading = false;
          }
        );
      }
    );
  }

  save() {
    this.fileservice.saveQuery(this.query, this.queryId).subscribe(
      data => {
        this.query = data;
        if (!this.projectService.activeProject.isQueryDefined) {
          this.projectService.activeProject.isQueryDefined = true;
          this.saveProject();
        }
      }
    );
  }

  saveProject() {
    this.projectService.saveActiveProject().subscribe(
      project => this.projectService.activeProject = project
    );
  }

  goToTarget(target) {
    this.queryService.getSearchString(this.queryId, target).subscribe(
      text => {
        const targetUrl = 'https://www.scopus.com/results/results.uri?sort=plf-f&src=s&sot=a&sdt=a&sl=18&s=' + encodeURI(text) +
          '&origin=searchadvanced&editSaveSearch=';
        window.open(targetUrl);
      }
    );
  }
}

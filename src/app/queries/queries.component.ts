import {Component, OnInit} from '@angular/core';
import {FileService} from '../services/file.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Query} from '../model/Query';
import * as appGlobals from '../app.globals';
import {RunnerService} from '../services/runner.service';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html'
})
export class QueriesComponent implements OnInit {

  query_id: string;

  query: Query;

  loading: boolean;

  isQuerySaved: boolean;

  hasQueryRun: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fileservice: FileService,
              private runnerService: RunnerService) {
  }

  ngOnInit() {
    this.loading = true;
    this.isQuerySaved = false;
    this.hasQueryRun = false;
    this.route.params.subscribe(
      params => {
        this.query_id = params['query_id'];
        this.fileservice.getQuery(this.query_id).subscribe(
          data => {
            this.query = data;
            this.loading = false;
          }
        );
      }
    );
  }

  save() {
    console.log(this.query);
    this.fileservice.saveQuery(this.query, this.query_id).subscribe(
      data => {
        this.query = data;
        this.isQuerySaved = true;
      }
    );
  }

  getScopusSearchString() {
    const url = appGlobals.getScopusSearchString + this.query_id;
    window.open(url, '_blank');
  }

  runQuery() {
    this.runnerService.runQuery(this.query, this.query_id).subscribe(
      data => this.hasQueryRun = true
    );
  }
}

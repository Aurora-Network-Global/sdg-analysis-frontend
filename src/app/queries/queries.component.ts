import {Component, OnInit} from '@angular/core';
import {FileService} from '../services/file.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Query} from '../model/Query';
import * as appGlobals from '../app.globals';
import {RunnerService} from '../services/runner.service';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable';
import {Status} from '../model/Status';
import {ProjectService} from '../services/project.service';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html'
})
export class QueriesComponent implements OnInit {

  query_id: string;

  query: Query;

  loading: boolean;

  isQueryRunning: boolean;

  timer: any;

  status: Status;

  uploadUrl: string;

  progress: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public projectService: ProjectService,
              private fileservice: FileService,
              private runnerService: RunnerService) {
  }

  ngOnInit() {
    this.loading = true;
    this.status = null;
    this.route.params.subscribe(
      params => {
        this.query_id = params['query_id'];
        if (this.projectService.activeProject == null) {
          this.projectService.getProject(this.query_id).subscribe(
            data => this.projectService.activeProject = data
          );
        }
        this.uploadUrl = appGlobals.uploadTestDataUrl + this.query_id;
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
    this.fileservice.saveQuery(this.query, this.query_id).subscribe(
      data => {
        this.query = data;
        this.projectService.activeProject.is_query_defined = true;
        this.projectService.saveActiveProject().subscribe(project => this.projectService.activeProject = project);
      }
    );
  }

  getScopusSearchString() {
    const url = appGlobals.getScopusSearchString + this.query_id;
    window.open(url, '_blank');
  }

  runQuery() {
    this.save();
    this.isQueryRunning = true;
    this.projectService.activeProject.is_query_run = false;
    this.runnerService.runQuery(this.query, this.query_id).subscribe();
    this.timer = IntervalObservable.create(2000).subscribe(() => {
      this.getStatus();
    });
  }

  getStatus() {
    this.runnerService.getStatus(this.query_id).subscribe(
      data => {
        this.status = data;
      }
    );
    if (this.status && !this.projectService.activeProject.is_query_run) {
      if (this.status.progress && this.status.total) {
        this.progress = Math.round(this.status.progress / this.status.total * 100);
      } else {
        this.progress = 0;
      }
      if (this.status.status === 'FINISHED') {
        this.timer.unsubscribe();
        this.isQueryRunning = false;
        this.projectService.activeProject.is_query_run = true;
      } else if (this.status.status === 'ERROR') {
        this.timer.unsubscribe();
        this.isQueryRunning = false;
      }
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../services/project.service';
import {ResultsService} from '../services/results.service';
import * as appGlobals from '../app.globals';
import {RunnerService} from '../services/runner.service';
import {Status} from '../model/Status';
import {interval} from 'rxjs/internal/observable/interval';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html'
})
export class RecordsComponent implements OnInit {

  queryId: string;

  loading: boolean;

  eidsUrl = appGlobals.serverAddress + '/eids';

  isCollecting = false;

  private timer = interval(2000);

  private subscription: any;

  status: Status;

  progress;

  resultPages = appGlobals.resultsPages;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public projectService: ProjectService,
              private resultsService: ResultsService,
              private runnerService: RunnerService,
              private messageService: MessageService) {
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
              this.loading = false;
              if (this.projectService.activeProject.isDataCollecting) {
                this.getStatus();
                this.subscription = interval(2000).subscribe(() => {
                  this.getStatus();
                });
              } else if (this.projectService.activeProject.isDataCollected) {
                this.progress = 100;
              }
            }
          );
        } else {
          this.progress = 100;
          this.loading = false;
        }
      }
    );
  }

  getStatus() {
    this.runnerService.getStatus(this.queryId).subscribe(
      data => this.status = data,
      error => console.log(error)
    );
    if (this.status) {
      if (this.status.progress && this.status.total) {
        console.log(status);
        this.progress = Math.round(this.status.progress / this.status.total * 100);
      } else {
        this.progress = 0;
      }
      if (this.status.status === 'DATA_COLLECTED') {
        this.subscription.unsubscribe();
        this.isCollecting = false;
        this.projectService.activeProject.isDataCollected = true;
        this.projectService.activeProject.isDataCollecting = false;
        this.saveProject();
      } else if (this.status.status === 'ERROR') {
        this.subscription.unsubscribe();
        this.isCollecting = false;
      }
    }
  }

  saveProject() {
    this.projectService.saveActiveProject().subscribe(
      project => this.projectService.activeProject = project
    );
  }

  downloadMissedEids() {
    window.open(this.eidsUrl + '/missed/' + this.queryId, '_blank');
  }

  collectData() {
    this.isCollecting = true;
    this.runnerService.collectData(this.queryId).subscribe(
      data => {
        this.subscription.unsubscribe();
        this.messageService.add({
          severity: 'success',
          summary: 'Collection finished',
          detail: 'The Scopus record collection has finished, all records have been collected.'
        });
      },
      error => {
        this.subscription.unsubscribe();
        this.messageService.add({
          severity: 'error',
          summary: 'Collection aborted',
          detail: 'The Scopus record collection was aborted'
        });
      }
      );
    this.subscription = this.timer.subscribe(() => {
      this.getStatus();
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as appGlobals from '../app.globals';
import {ProjectService} from '../services/project.service';
import {RunnerService} from '../services/runner.service';
import {EidsService} from '../services/eids.service';
import {interval} from 'rxjs/internal/observable/interval';
import {ClipboardService} from 'ngx-clipboard';
import {MessageService} from 'primeng/api';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-eids',
  templateUrl: './eids.component.html'
})
export class EidsComponent implements OnInit {

  resultPages = appGlobals.resultsPages;

  queryId: string;

  loading: boolean;

  sampleSize = 100;

  isQueryRunning = false;

  private timer = interval(2000);

  private subscription: any;

  eidsUrl = environment.serverAddress + '/eids';

  constructor(private route: ActivatedRoute,
              public projectService: ProjectService,
              private runnerService: RunnerService,
              private eidsService: EidsService,
              private clipboardService: ClipboardService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(
      params => {
        this.queryId = params['queryId'];
        if (this.projectService.activeProject == null) {
          this.updateProject();
        } else {
          this.loading = false;
        }
        this.eidsService.getLength(this.queryId, 'sample_').subscribe(
          data => this.sampleSize = data
        );
      }
    );
  }

  updateProject() {
    this.projectService.getProject(this.queryId).subscribe(
      data => {
        this.projectService.activeProject = data;
        this.loading = false;
        if (this.projectService.activeProject.isEidsCollected) {
          this.isQueryRunning = false;
          if (this.timer) {
            this.subscription.unsubscribe();
          }
        }
      }
    );
  }

  copyScopuSearch() {
    this.eidsService.getSampleScopusSearchString(this.queryId, this.sampleSize).subscribe(
      data => {
        this.clipboardService.copyFromContent(data);
        this.messageService.add({
          severity: 'success',
          summary: 'Search copied',
          detail: 'The Scopus search string was copied to the clipboard'
        });
      });
  }

  downloadEids() {
    window.open(this.eidsUrl + '/all/' + this.queryId, '_blank');
  }

  downloadSampleEids() {
    window.open(this.eidsUrl + '/calculateSample/' + this.queryId + '?sample_size=' + String(this.sampleSize), '_blank');
  }

  runQuery() {
    this.isQueryRunning = true;
    this.runnerService.runQuery(this.queryId).subscribe(
      data => {
        this.timer = this.subscription.unsubscribe();
        this.messageService.add({
          severity: 'success',
          summary: 'Search finidhed',
          detail: 'The Scopus search has finished, all EIDs have been collected.'
        });
      },
      error => {
        this.timer = this.subscription.unsubscribe();
        this.messageService.add({
          severity: 'error',
          summary: 'Search aborted',
          detail: 'The Scopus search was aborted'
        });
      }
    );
    this.subscription = this.timer.subscribe(() => {
      this.updateProject();
    });
  }
}

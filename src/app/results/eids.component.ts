import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as appGlobals from '../app.globals';
import {ProjectService} from '../services/project.service';
import {RunnerService} from '../services/runner.service';
import {EidsService} from '../services/eids.service';
import {interval} from 'rxjs/internal/observable/interval';

@Component({
  selector: 'app-eids',
  templateUrl: './eids.component.html'
})
export class EidsComponent implements OnInit {

  resultPages = appGlobals.resultsPages;

  queryId: string;

  loading: boolean;

  sampleSize = 100;

  private timer: any;

  isQueryRunning = false;

  eidsUrl = appGlobals.serverAddress + '/eids';

  constructor(private route: ActivatedRoute,
              public projectService: ProjectService,
              private runnerService: RunnerService,
              private eidsService: EidsService) {
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
            this.timer.unsubscribe();
          }
        }
      }
    );
  }

  downloadEids() {
    window.open(this.eidsUrl + '/all/' + this.queryId, '_blank');
  }

  downloadSampleEids() {
    window.open(this.eidsUrl + '/calculateSample/' + this.queryId + '?sample_size=' + String(this.sampleSize), '_blank');
  }

  runQuery() {
    this.isQueryRunning = true;
    this.runnerService.runQuery(this.queryId).subscribe();
    this.timer = interval(2000).subscribe(() => {
      this.updateProject();
    });
  }

  goToScopusSearch() {
    this.eidsService.getSampleScopusSearchString(this.queryId, this.sampleSize).subscribe(
      data => {
        const url = 'https://www.scopus.com/results/results.uri?sort=plf-f&src=s&sot=a&sdt=a&sl=18&s=' + encodeURI(data) +
          '&origin=searchadvanced&editSaveSearch=';
        window.open(url);
      }
    );
  }
}

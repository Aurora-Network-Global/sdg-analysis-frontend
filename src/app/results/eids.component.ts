import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as appGlobals from '../app.globals';
import {ResultsService} from '../services/results.service';
import {RelevanceMeasures} from '../model/RelevanceMeasures';
import {ProjectService} from '../services/project.service';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable';
import {RunnerService} from '../services/runner.service';
import {Status} from '../model/Status';

@Component({
  selector: 'app-eids',
  templateUrl: './eids.component.html'
})
export class EidsComponent implements OnInit {

  queryId: string;

  loading: boolean;

  uploadUrl: string;

  sampleSize = '100';

  private timer: any;

  isQueryRunning = false;

  status: Status;

  eidsUrl = appGlobals.serverAddress + '/eids';


  relevanceMeasure: RelevanceMeasures;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public projectService: ProjectService,
              private resultsService: ResultsService,
              private runnerService: RunnerService) {
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
        this.uploadUrl = this.eidsUrl + '/test/' + this.queryId;
        this.resultsService.getRelevanceMeasures(this.queryId).subscribe(
          data => this.relevanceMeasure = data,
          error => console.log('no relevance measures found')
        );
      }
    );
  }

  updateProject() {
    this.projectService.getProject(this.queryId).subscribe(
      data => {
        this.projectService.activeProject = data;
        console.log(this.projectService.activeProject);
        this.loading = false;
        if (this.projectService.activeProject.isEidsCollected) {
          this.isQueryRunning = false;
          this.timer.unsubscribe();
        }
      }
    );
  }

  downloadEids() {
    window.open(this.eidsUrl + '/all/' + this.queryId, '_blank');
  }

  downloadSampleEids() {
    window.open(this.eidsUrl + '/calculateSample/' + this.queryId + '?sample_size=' + this.sampleSize, '_blank');
  }

  calculateRelevanceMeasures() {
    this.resultsService.calculateRelevanceMeasures(this.queryId).subscribe(
      data => this.relevanceMeasure = data
    );
  }

  runQuery() {
    this.isQueryRunning = true;
    this.runnerService.runQuery(this.queryId).subscribe();
    this.timer = IntervalObservable.create(2000).subscribe(() => {
      this.updateProject();
    });
  }
}

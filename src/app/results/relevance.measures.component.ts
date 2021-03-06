import {Component, OnInit} from '@angular/core';
import {EidsService} from '../services/eids.service';
import {ProjectService} from '../services/project.service';
import * as appGlobals from '../app.globals';
import {ActivatedRoute} from '@angular/router';
import {ResultsService} from '../services/results.service';
import {RelevanceMeasures} from '../model/RelevanceMeasures';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-relevance-measures',
  templateUrl: './relevance.measures.component.html'
})
export class RelevanceMeasuresComponent implements OnInit {

  resultPages = appGlobals.resultsPages;

  loading: boolean;

  queryId: string;

  testUploadUrl: string;
  sampleUploadUrl: string;

  relevanceMeasure: RelevanceMeasures;

  constructor(private eidsService: EidsService,
              private projectService: ProjectService,
              private route: ActivatedRoute,
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
        this.testUploadUrl = environment.serverAddress + '/eids/test/' + this.queryId;
        this.sampleUploadUrl = environment.serverAddress + '/eids/sample-judgement/' + this.queryId;
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
        this.loading = false;
      }
    );
  }

  calculateRecall() {
    this.resultsService.calculateRecall(this.queryId).subscribe(
      data => this.relevanceMeasure = data
    );
  }

  calculatePrecision() {
    this.resultsService.calculatePrecision(this.queryId).subscribe(
      data => this.relevanceMeasure = data
    );
  }
}

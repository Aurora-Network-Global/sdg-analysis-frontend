import {Component, OnInit} from '@angular/core';
import {EidsService} from '../services/eids.service';
import {ProjectService} from '../services/project.service';
import * as appGlobals from '../app.globals';
import {ActivatedRoute} from '@angular/router';
import {ResultsService} from '../services/results.service';
import {RelevanceMeasures} from '../model/RelevanceMeasures';

@Component({
  selector: 'app-relevance-measures',
  templateUrl: './relevance.measures.component.html'
})
export class RelevanceMeasuresComponent implements OnInit {

  resultPages = appGlobals.resultsPages;

  loading: boolean;

  queryId: string;

  uploadUrl: string;

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
        this.uploadUrl = appGlobals.serverAddress + '/eids' + '/test/' + this.queryId;
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
}

import {Component, OnInit} from '@angular/core';
import {FileService} from '../services/file.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as appGlobals from '../app.globals';
import {ResultsService} from '../services/results.service';
import {KeywordFrequency} from '../model/KeywordFrequency';
import {RelevanceMeasures} from '../model/RelevanceMeasures';
import {ProjectService} from '../services/project.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent implements OnInit {

  query_id: string;

  loading: boolean;

  uploadUrl: string;

  sampleSize = '100';

  eidsUrl = appGlobals.serverAddress + '/eids';

  keywordFrequencyList: KeywordFrequency[];

  relevanceMeasure: RelevanceMeasures;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public projectService: ProjectService,
              private resultsService: ResultsService) {
  }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(
      params => {
        this.query_id = params['query_id'];
        if (this.projectService.activeProject == null) {
          this.projectService.getProject(this.query_id).subscribe(
            data => {
              this.projectService.activeProject = data;
              this.loading = false;
            }
          );
        }
        this.uploadUrl = appGlobals.uploadScivalDataUrl + this.query_id;
        this.resultsService.getRelevanceMeasures(this.query_id).subscribe(
          data => this.relevanceMeasure = data
        );
        this.resultsService.getKeywords(this.query_id).subscribe(
          data => this.keywordFrequencyList = data
        );

      }
    );
  }

  downloadEids() {
    window.open(this.eidsUrl + '/all/' + this.query_id, '_blank');
  }

  downloadMissedEids() {
    window.open(this.eidsUrl + '/missed/' + this.query_id, '_blank');
  }

  downloadSampleEids() {
    window.open(this.eidsUrl + '/calculateSample/' + this.query_id + '?sample_size=' + this.sampleSize, '_blank');
  }
}

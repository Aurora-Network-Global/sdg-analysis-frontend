import {Component, OnInit} from '@angular/core';
import {FileService} from '../services/file.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as appGlobals from '../app.globals';
import {ResultsService} from '../services/results.service';
import {KeywordFrequency} from '../model/KeywordFrequency';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent implements OnInit {

  query_id: string;

  loading: boolean;

  uploadUrl: string;

  keywordFrequencyList: KeywordFrequency[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fileservice: FileService,
              private resultsService: ResultsService) {
  }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(
      params => {
        this.query_id = params['query_id'];
        this.uploadUrl = appGlobals.uploadScivalDataUrl + this.query_id;
        this.resultsService.getKeywords(this.query_id).subscribe(
          data => this.keywordFrequencyList = data
        );
        this.loading = false;
      }
    );
  }

  downloadEids() {
    window.open(appGlobals.downloadEidsURL + this.query_id, '_blank');
  }
}

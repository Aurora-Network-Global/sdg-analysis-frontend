import {Component, OnInit} from '@angular/core';
import {FileService} from '../services/file.service';
import {RunnerService} from '../services/runner.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as appGlobals from '../app.globals';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent implements OnInit {

  query_id: string;

  loading: boolean;

  uploadUrl: string;

  linkToEids: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fileservice: FileService,
              private runnerService: RunnerService) {
  }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(
      params => {
        this.query_id = params['query_id'];
        this.uploadUrl = appGlobals.uploadScivalDataUrl + this.query_id;
        this.fileservice.downloadEids(this.query_id).subscribe(
          data => this.linkToEids = data.link
        )
        this.loading = false;
      }
    );
  }

  downloadEids() {
    window.open(appGlobals.downloadEidsURL + this.query_id, '_blank');
  }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as appGlobals from '../app.globals';
import {ResultsService} from '../services/results.service';
import {RelevanceMeasures} from '../model/RelevanceMeasures';
import {ProjectService} from '../services/project.service';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable';
import {RunnerService} from '../services/runner.service';
import {Status} from '../model/Status';
import {EidsService} from '../services/eids.service';
import {ClipboardService} from 'ngx-clipboard';
import {Message} from 'primeng/api';
import {MessageService} from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-eids',
  templateUrl: './eids.component.html'
})
export class EidsComponent implements OnInit {

  resultPages = appGlobals.resultsPages;

  queryId: string;

  messages: Message[];

  loading: boolean;

  uploadUrl: string;

  sampleSize = '100';

  private timer: any;

  isQueryRunning = false;

  status: Status;

  searchString: string;

  eidsUrl = appGlobals.serverAddress + '/eids';


  relevanceMeasure: RelevanceMeasures;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public projectService: ProjectService,
              private resultsService: ResultsService,
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

  copySearchString() {
    this.eidsService.getScopusSearchString(this.queryId, 'sample_').subscribe(
      data => this.clipboardService.copyFromContent(data)
    );
    this.messageService.add({
      severity: 'success',
      summary: 'Query copied!',
      detail: 'The Scopus search term was copied to the clipboard.'
    });
  }


  runQuery() {
    this.isQueryRunning = true;
    this.runnerService.runQuery(this.queryId).subscribe();
    this.timer = IntervalObservable.create(2000).subscribe(() => {
      this.updateProject();
    });
  }

  getScopusSearchString(prefix: string) {
    this.eidsService.getScopusSearchString(this.queryId, prefix).subscribe(
      data => this.searchString = data
    );
  }
}

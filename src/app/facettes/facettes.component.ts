import {Component, OnInit} from '@angular/core';
import {QueryService} from '../services/query.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Query} from '../model/Query';
import * as appGlobals from '../app.globals';
import {ProjectService} from '../services/project.service';
import {MessageService} from 'primeng/api';
import {ClipboardService} from 'ngx-clipboard';

@Component({
  selector: 'app-queries',
  templateUrl: './facettes.component.html'
})
export class FacettesComponent implements OnInit {

  public queryId: string;

  public uploadUrlJournals: string;

  public uploadUrlKeywords: string;

  loading: boolean;

  constructor(private route: ActivatedRoute,
              public projectService: ProjectService) {
  }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(
      params => {
        this.queryId = params['queryId'];
        this.uploadUrlJournals =  appGlobals.serverAddress + '/facettes/journal/' + this.queryId;
        this.uploadUrlKeywords =  appGlobals.serverAddress + '/facettes/keyword/' + this.queryId;
        if (this.projectService.activeProject == null) {
          this.projectService.getProject(this.queryId).subscribe(
            data => {
              this.projectService.activeProject = data;
              this.loading = false;
            }
          );
        } else {
          this.loading = false;
        }
      }
    );
  }
}

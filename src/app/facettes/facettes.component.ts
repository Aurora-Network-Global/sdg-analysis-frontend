import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as appGlobals from '../app.globals';
import {ProjectService} from '../services/project.service';

@Component({
  selector: 'app-queries',
  templateUrl: './facettes.component.html'
})
export class FacettesComponent implements OnInit {

  public queryId: string;

  public uploadUrlJournals: string;

  loading: boolean;

  constructor(private route: ActivatedRoute,
              public projectService: ProjectService) {
  }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(
      params => {
        this.queryId = params['queryId'];
        this.uploadUrlJournals =  appGlobals.serverAddress + '/facettes/upload/' + this.queryId;
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

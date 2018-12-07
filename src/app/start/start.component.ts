import {Component, OnInit} from '@angular/core';
import {Project} from '../model/Project';
import {ProjectService} from '../services/project.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html'
})
export class StartComponent implements OnInit {

  new_project: string;

  projects: Project[];

  busy: boolean;

  constructor( private router: Router,
               public projectService: ProjectService) {
  }

  ngOnInit() {
    this.busy = true;
    this.projectService.listProjects().subscribe(
      data => {
        this.projects = data;
        this.busy = false;
        if (this.projects.length > 0) {
          this.projectService.activeProject = this.projects[0];
        }
      }
    );
  }

  createProject() {
    this.projectService.activeProject = new Project(this.new_project, new Date().getTime().toString());
    this.projectService.saveActiveProject().subscribe(
      () =>  this.router.navigate(['/queries', this.projectService.activeProject.project_id]));
  }
}

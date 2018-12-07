import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import * as appGlobals from '../app.globals';
import {Query} from '../model/Query';
import {Project} from '../model/Project';

@Injectable()
export class ProjectService {

  public activeProject: Project;

  constructor(private http: HttpClient) {
  }

  listProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(appGlobals.projects);
  }

  getproject(project_id: string): Observable<Project> {
    return this.http.get<Project>(appGlobals.projects + '/' + project_id);
  }

  saveProject(project: Project): Observable<Project> {
    return this.http.post<Project>(appGlobals.projects, JSON.stringify(project), {headers: appGlobals.headers});
  }

  saveActiveProject(): Observable<Project> {
    return this.http.post<Project>(appGlobals.projects, JSON.stringify(this.activeProject), {headers: appGlobals.headers});
  }
}

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import * as appGlobals from '../app.globals';
import {Project} from '../model/Project';

@Injectable()
export class ProjectService {

  public activeProject: Project;

  private projectUrl = appGlobals.serverAddress + '/project';

  constructor(private http: HttpClient) {
  }

  listProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectUrl + '/all');
  }

  getProject(project_id: string): Observable<Project> {
    return this.http.get<Project>(this.projectUrl + '/single/' + project_id);
  }

  saveActiveProject(): Observable<Project> {
    return this.http.post<Project>(this.projectUrl, JSON.stringify(this.activeProject), {headers: appGlobals.headers});
  }
}

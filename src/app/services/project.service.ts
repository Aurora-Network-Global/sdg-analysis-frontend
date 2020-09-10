import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import * as appGlobals from '../app.globals';
import {Project} from '../model/Project';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable()
export class ProjectService {

  public activeProject: Project;

  private projectUrl = environment.serverAddress + '/project';

  constructor(private http: HttpClient) {
  }

  listProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectUrl + '/all').pipe(map(entry => entry['projects']));
  }

  getProject(project_id: string): Observable<Project> {
    return this.http.get<Project>(this.projectUrl + '/single/' + project_id);
  }

  saveActiveProject(): Observable<Project> {
    return this.http.post<Project>(this.projectUrl + '/new', JSON.stringify(this.activeProject), {headers: appGlobals.headers});
  }
}

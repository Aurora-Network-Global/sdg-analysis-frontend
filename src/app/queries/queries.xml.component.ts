import {Component, OnInit} from '@angular/core';
import {Query} from '../model/Query';
import * as appGlobals from '../app.globals';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../services/project.service';
import {QueryService} from '../services/query.service';
import {MessageService, SelectItem} from 'primeng/api';
import {ClipboardService} from 'ngx-clipboard';
import {QueryDefintion} from '../model/QueryDefintion';
import {QueryLine} from '../model/QueryLine';
import {QueryFilter} from '../model/QueryFilter';
import {QueryDefintions} from '../model/QueryDefinitions';
import {QueryFilters} from '../model/QueryFilters';
import {Timerange} from '../model/Timerange';

@Component({
  selector: 'app-queries-xml',
  templateUrl: './queries.xml.component.html'
})
export class QueriesXmlComponent implements OnInit {

  public query: Query;

  public queryId: string;

  public loading: boolean;

  public uploadUrl: string;

  public downloadUrl: string;

  public progress: number;

  public show: object = {};

  public resultPages = appGlobals.resultsPages;

  public syntaxOptions: SelectItem[] = [];

  public syntaxStrings = ['SCOPUS'];

  public filterTypeStrings = ['Affiliation', 'People', 'Funding', 'Subject area', 'Document'];

  public filterTypeOptions: SelectItem[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              public projectService: ProjectService,
              private queryService: QueryService,
              private fileservice: QueryService,
              private messageService: MessageService,
              private clipboardService: ClipboardService) {
  }

  ngOnInit(): void {
    this.syntaxStrings.forEach(
      entry => this.syntaxOptions.push({label: entry, value: entry}));
    this.filterTypeStrings.forEach(
      entry => this.filterTypeOptions.push({label: entry, value: entry}));
    this.show['globalFilters'] = false;
    this.show['partialFilters'] = false;
    this.loading = true;
    this.route.params.subscribe(
      params => {
        this.queryId = params['queryId'];
        this.uploadUrl = appGlobals.serverAddress + '/query/save_xml_upload/' + this.queryId;
        this.downloadUrl = appGlobals.serverAddress + '/query/xml_file/' + this.queryId;
        if (this.projectService.activeProject == null) {
          this.projectService.getProject(this.queryId).subscribe(
            data => {
              this.projectService.activeProject = data;
            }
          );
        }
        this.loadXmlQuery();
      }
    );
  }

  save() {
    this.query.date_modified = new Date().toISOString().slice(0, 10);
    console.log(this.query);
    this.fileservice.saveQueryAsXml(this.query, this.queryId).subscribe(
      data => {
        this.query = data;
        if (!this.projectService.activeProject.isQueryDefined) {
          this.projectService.activeProject.isQueryDefined = true;
          this.saveProject();
        }
      }
    );
  }

  loadXmlQuery() {
    this.fileservice.getQueryFromXml(this.queryId).subscribe(
      data => {
        this.query = data;
        this.loading = false;
      },
      error => {
        const queryDefintions = new QueryDefintions([], new QueryFilters([], new Timerange('', '', '')), 'SCOPUS');
        this.query = new Query('', '1', '', '', '', new Date().toISOString().slice(0, 10), '', '', queryDefintions);
        this.loading = false;
      }
    );
  }

  saveProject() {
    this.projectService.saveActiveProject().subscribe(
      project => this.projectService.activeProject = project
    );
  }

  copySearchString(target) {
    this.queryService.getSearchString(this.queryId, target).subscribe(
      data => {
        this.clipboardService.copyFromContent(data.overall);
        this.messageService.add({
          severity: 'success',
          summary: 'Search copied',
          detail: 'The Scopus search string was copied to the clipboard'
        });
      });
  }

  toggleShow(view: string) {
    this.show[view] = !this.show[view];
  }

  addGlobalFilter() {
    this.query.query_definitions.query_filters.query_filters.push(new QueryFilter('Field', 'Affiliation', ''));
  }

  addQueryLine(queryDefintion: QueryDefintion) {
    queryDefintion.query_lines.push(new QueryLine('TITLE-ABS-KEY', ''));
  }

  addDescriptionBlock(queryDefintion: QueryDefintion) {
    queryDefintion.descriptions.push('New Description');
  }

  addPartialFilter(queryDefintion: QueryDefintion) {
  }

  addQueryDefinition() {
    const index_number = this.query.query_definitions.query_definition.length + 1;
    this.query.query_definitions.query_definition.push(
      new QueryDefintion([], index_number.toString(), ['description'], null)
    );
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  removeQueryLine(queryLine: QueryLine, queryDefinition: QueryDefintion) {
    queryDefinition.query_lines = queryDefinition.query_lines.filter(obj => obj !== queryLine);
  }
}

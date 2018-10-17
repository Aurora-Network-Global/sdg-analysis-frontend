import {Component, OnInit} from '@angular/core';
import {FileService} from '../services/file.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html'
})
export class StartComponent implements OnInit {

  query_id: string;

  new_query_id: string;

  query_ids: string[];

  filteredQueries: string[];

  constructor( private fileservice: FileService) {
  }

  ngOnInit() {
    this.fileservice.listQueries().subscribe(
      data => this.query_ids = data
    );
  }

  filterQueries(event) {
    this.filteredQueries = [];
    for (let i = 0; i < this.query_ids.length; i++) {
      const testQuery = this.query_ids[i];
      if (testQuery.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
        this.filteredQueries.push(testQuery);
      }
    }
  }
}

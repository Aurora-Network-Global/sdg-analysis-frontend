import {Component, OnInit} from '@angular/core';
import {FileService} from '../services/file.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent implements OnInit {

  query_id: string;

  query_ids: string[];

  constructor(private fileservice: FileService) {
  }

  ngOnInit() {
    this.fileservice.listQueries().subscribe(
      data => this.query_ids = data
    );
  }
}

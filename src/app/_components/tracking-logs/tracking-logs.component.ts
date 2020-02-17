import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'tracking-logs',
  templateUrl: './tracking-logs.component.html',
  styleUrls: ['./tracking-logs.component.scss']
})
export class TrackingLogsComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('logs') logs: Array<string>;

  text = 'View More';
  limit = 1;
  constructor() { }

  ngOnInit() {
  }

  view(length: number) {
    if (this.text === 'View Less') {
      this.limit = 1;
      this.text = 'View More';
    } else {
    this.limit = length;
    this.text = 'View Less';
    }
  }
}

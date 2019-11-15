import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {

  color = 'warn';
  mode = 'indeterminate';
  value = 20;
  loading = false;
  constructor(
  ) { }

  ngOnInit() {
    this.loading = true;
    setTimeout(()=>{
      this.loading = false;
    }, 1000);
  }

}

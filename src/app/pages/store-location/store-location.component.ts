import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-location',
  templateUrl: './store-location.component.html',
  styleUrls: ['./store-location.component.scss']
})
export class StoreLocationComponent implements OnInit {

  color = 'warn';
  mode = 'indeterminate';
  value = 20;
  loading = false;
  constructor() { }

  ngOnInit() {
    this.loading = true;
    setTimeout(()=>{
      this.loading = false;
    }, 1000);
  }

}

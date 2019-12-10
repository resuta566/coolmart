import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.paramMap.pipe().subscribe(param=>{

    });
  }

  ngOnInit() {
    let string = 'James Lester -- Tunasan';
    let spliter = string.split('--');
    console.log(spliter);

  }

}

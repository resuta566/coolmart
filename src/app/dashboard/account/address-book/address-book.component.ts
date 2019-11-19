import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit {

  dataSource = [
    {
      name:"James Lester",
      address: "Pinayagan, Sur",
      postcode: "Bohol - Tubigon - Pinayagan Sur",
      mobile: '09060044485',
      info:'Default Shipping Address',
      edit: 'Edit'
    }
    ];

  displayedColumns: string[] = ['name', 'address','postcode', 'mobile', 'info', 'edit'];
  constructor() { }

  ngOnInit() {
  }

}

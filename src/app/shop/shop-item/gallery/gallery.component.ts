import { Component, OnInit, Input } from '@angular/core';
import { Products } from '@app/_models/products';

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @Input('product') product: Products;


  constructor() { }

  ngOnInit() {

  }



}

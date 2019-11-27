import { Component, OnInit } from '@angular/core';
import { ReviewService } from '@app/_service/order/reviews/review.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  reviews: any;
  apiUrl = `${environment.apiUrl}`;
  imageUrl = 'assets/images/noimage2.jpg';
  constructor(
    private reviewService: ReviewService
  ) { }

  ngOnInit() {
    this.review();

  }

  review(){
    this.reviewService.reviews().pipe().subscribe((data:any)=>{
      this.reviews = data.data;
    })
  }
}

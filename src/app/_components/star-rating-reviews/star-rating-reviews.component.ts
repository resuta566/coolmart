import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'review-star-rating',
  templateUrl: './star-rating-review.component.html',
  styles: [`button:hover{
              background-color: #ffffff00 !important;
              border-color: #ffffff00 !important;
            }
            button:focus{
              background-color: #ffffff00 !important;
              border-color: #ffffff00 !important;
            }
            button:focus:active{
              background-color: #ffffff00 !important;
              border-color: #ffffff00 !important;
            }
            button{
              background-color: #ffffff00 !important;
              border-color: #ffffff00 !important;
            }`
          ],
  encapsulation: ViewEncapsulation.Emulated
})
export class StarRatingReviewComponent implements OnInit {

  @Input('rating') rating: number = 5;
  @Input('starCount') starCount: number = 5;
  @Input('color') color: string = 'accent';
  @Output() private ratingUpdated = new EventEmitter();

  private snackBarDuration: number = 2000;
  ratingArr = [];
  message:string = "Excellent";

  constructor(private snackBar: MatSnackBar) {
  }


  ngOnInit() {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
  onClick(rating:number) {

    if(rating == 1) this.message = "Worst";
    if(rating == 2) this.message = "Very Bad";
    if(rating == 3) this.message = "Fair";
    if(rating == 4) this.message = "Good";
    if(rating == 5) this.message = "Excellent";
    this.snackBar.open('You rated ' + rating + ' / ' + this.starCount +' '+this.message, '', {
      duration: this.snackBarDuration
    });
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

}
export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}

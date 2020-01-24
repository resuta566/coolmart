import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReviewService } from '@app/_service/order/reviews/review.service';
import { environment } from '@environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StarRatingColor } from '@app/_components/star-rating/star-rating.component';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit, OnDestroy {

  checkcomment = '';
  reviews: any;
  rating = 5;
  starCount = 5;
  starColor: StarRatingColor = StarRatingColor.accent;
  reviewsPage: any;
  reviewsChangePage = '';
  reviewsMeta: any;
  reviewListCount = 0;
  reviewedList: any;
  reviewedListCount = 0;
  reviewedChangePage = '';
  apiUrl = `${environment.apiUrl}`;
  imageUrl = 'assets/images/noimage2.jpg';
  loadingHistory = false;
  mode = 'indeterminate';
  value = 20;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private reviewService: ReviewService
  ) { }

  ngOnInit() {
    this.review();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  destroy() {
    this.destroy$.next(true); // For Memory Leaks same below
    this.destroy$.unsubscribe();
  }

  review() {
    this.reviewService.reviews(this.reviewsChangePage).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.reviews = data.data;
      this.reviewsPage = data.links;
      this.reviewsMeta = data.meta;
      this.reviewListCount = this.reviews.length;
    });
  }

  changePageReviews(page: string) {
    this.reviewsChangePage = page;
    this.review();
  }

  reviewed() {
    this.loadingHistory = true;
    this.reviewService.reviewed(this.reviewedChangePage).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.reviewedList = data;

      setTimeout(() => {
        this.reviewedListCount = data.data.length;
        this.loadingHistory = false;
      }, 400);
    });
  }
  changePageReviewed(page: string) {

    this.reviewedChangePage = page;
    this.reviewed();
  }

  tabClicked($event) {
    if (+$event.index === 1) {
      this.reviewed();
    }
  }
}

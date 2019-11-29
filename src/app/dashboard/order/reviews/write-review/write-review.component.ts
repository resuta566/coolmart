import { Component, OnInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { StarRatingColor } from '@app/_components/star-rating/star-rating.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, first } from 'rxjs/operators';
import { ReviewService } from '@app/_service/order/reviews/review.service';
import { environment } from '@environments/environment';
import { NOTYF } from '@app/_helpers/notyf.token';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.scss']
})
export class WriteReviewComponent implements OnInit, OnDestroy {

  comment: string;
  rating:number = 5;
  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.accent;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  paramsData: any;
  product: any;
  prodId: number;
  apiUrl = `${environment.apiUrl}`;
  updateReview = false;
  constructor(
    @Inject(NOTYF) private notyf: Notyf,
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private router: Router
  ) {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.paramsData = params;
      console.log(this.paramsData);
      // The queryParam is Reviewed is string not boolean
      if(this.paramsData.isReviewed == 'true'){ // If isReviewed is true call Update else create One
        this.updateItem(this.paramsData.slug);
        this.updateReview = true;
      }else{
        this.getItem(this.paramsData.slug);
        this.updateReview = false;
      }
    });
  }

  ngOnInit() {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(paramId=> {
      this.prodId = +paramId.get('id');
    });
  }

  ngOnDestroy(){
    this.destroy$.next(true); //For Memory Leaks same below
    this.destroy$.unsubscribe();
  }

  getItem(slug: string){
    this.reviewService.writeReview(slug).pipe(takeUntil(this.destroy$)).subscribe(data=>{
      this.product = data;
    },
    error=>{
      this.notyf.success(error);
    })
  }

  updateItem(slug: string){
    this.reviewService.oneReviewed(slug).pipe(takeUntil(this.destroy$)).subscribe(data=>{
      this.product = data;
      this.prodId = +this.product.item_id;
      this.rating = +this.product.review_stars;
      this.comment = this.product.review_comment;
    },
    error=>{
      this.notyf.success(error);
    })
  }

  submit(){
    this.reviewService.sendReview(this.prodId, this.rating, this.comment).pipe(first()).subscribe((data:any)=> {
      this.notyf.success(data);
      setTimeout(()=>{
        this.router.navigate(['/dashboard/order/reviews']);
      },1000);
    },
    error=>{
      this.notyf.success(error);
    });
    // this.reviewService.sendReview(this.prodId,)
  }

  onRatingChanged(rating: number){
    this.rating = rating;
  }
}

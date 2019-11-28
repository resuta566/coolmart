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
  message: any;
  rating:number = 5;
  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.accent;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  paramsData: any;
  product: any;
  prodId: number;
  apiUrl = `${environment.apiUrl}`;
  constructor(
    @Inject(NOTYF) private notyf: Notyf,
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private router: Router
  ) {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      console.log(params);

      this.paramsData = params;
      this.getItem(this.paramsData.slug);

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
      console.log(this.product);

    })
  }

  submit(comment: string){
    this.reviewService.sendReview(this.prodId, this.rating, comment).pipe(first()).subscribe((data:any)=> {
      this.notyf.success(data);
      setTimeout(()=>{
        this.router.navigate(['/dashboard/order/reviews']);
      },1000);
    },
    error=>{
      console.log(error);
    });
    // this.reviewService.sendReview(this.prodId,)
  }

  onRatingChanged(rating: number){
    this.rating = rating;
  }
}

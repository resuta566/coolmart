import { Component, OnInit, OnDestroy } from '@angular/core';
import { TermsFaqService } from '@app/_service/terms-faq.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnInit, OnDestroy {

  terms: any;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private termsService: TermsFaqService
  ) { }

  ngOnInit() {
    this.termsService.getTerms().pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.terms = data.data;
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next(true); //For Memory Leaks same below
    this.destroy$.unsubscribe();
  }
}

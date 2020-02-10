import { Component, OnInit, OnDestroy } from '@angular/core';
import { TermsFaqService } from '@app/_service/terms-faq.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit, OnDestroy {
  faqs: any;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private faqService: TermsFaqService
  ) { }

  ngOnInit() {
    this.faqService.getFaqs().pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.faqs = data.data;
    });
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { TermsFaqService } from '@app/_service/terms-faq.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  faqs: any;
  constructor(
    private faqService: TermsFaqService
  ) { }

  ngOnInit() {
    this.faqService.getFaqs().subscribe((data: any) => {
      this.faqs = data.data;
      console.log(this.faqs);
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { TermsFaqService } from '@app/_service/terms-faq.service';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnInit {
  terms: any;
  constructor(
    private termsService: TermsFaqService
  ) { }

  ngOnInit() {
    this.termsService.getTerms().subscribe((data: any) => {
      this.terms = data.data;
      console.log(this.terms);
    });
  }

}

import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { lightGreenBackgroundColor, sortBackgroundColor } from 'src/environments/typography';
import { OrderTypeEnum } from 'src/app/shared/models/order-type.enum';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
})
export class UserDisplayComponent implements OnInit, AfterViewInit {
  @ViewChild('sortByCoffee') sortByCoffee;
  @ViewChild('sortByRating') sortByRating;
  @ViewChild('sortByDate') sortByDate;

  htmlSortItemsSm: HTMLElement[] = [];

  @Input() coffeesHtmlView: any;
  //function
  @Input() onUser;

  // sorting flags
  sortTotalCoffeesFlag = false;
  sortFilteredAvgOverall = false;
  sortOriginSubmitDateFlag = false;

  showTotalCoffeesSortingWrapper = false;
  showAvgOverallSortingWrapper = false;
  showOriginSubmitDateSortingWrapper = false;

  constructor(private shared: SharedService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.htmlSortItemsSm = [this.sortByCoffee, this.sortByRating, this.sortByDate];
  }

  // sorting methods
  sortTotalCoffees() {
    this.showTotalCoffeesSortingWrapper = true;
    this.showAvgOverallSortingWrapper = false;
    this.showOriginSubmitDateSortingWrapper = false;
    this.shared.applyBackgroundColorOnClick(this.htmlSortItemsSm, sortBackgroundColor, null, null);
    if ((this.sortTotalCoffeesFlag = !this.sortTotalCoffeesFlag)) {
      this.coffeesHtmlView = this.coffeesHtmlView.sort(
        this.shared.compareNum2('totalCoffees', 'amount', OrderTypeEnum.ASC)
      );
    } else {
      this.coffeesHtmlView = this.coffeesHtmlView.sort(
        this.shared.compareNum2('totalCoffees', 'amount', OrderTypeEnum.DESC)
      );
    }
  }

  sortAvgOverallRating() {
    this.showTotalCoffeesSortingWrapper = false;
    this.showAvgOverallSortingWrapper = true;
    this.showOriginSubmitDateSortingWrapper = false;

    this.shared.applyBackgroundColorOnClick(this.htmlSortItemsSm, null, sortBackgroundColor, null);
    if ((this.sortFilteredAvgOverall = !this.sortFilteredAvgOverall)) {
      this.coffeesHtmlView = this.coffeesHtmlView.sort(
        this.shared.compareNum1('avgOverall', OrderTypeEnum.ASC)
      );
    } else {
      this.coffeesHtmlView = this.coffeesHtmlView.sort(
        this.shared.compareNum1('avgOverall', OrderTypeEnum.DESC)
      );
    }
  }

  sortOriginSubmitDate() {
    this.showTotalCoffeesSortingWrapper = false;
    this.showAvgOverallSortingWrapper = false;
    this.showOriginSubmitDateSortingWrapper = true;

    this.shared.applyBackgroundColorOnClick(this.htmlSortItemsSm, null, null, sortBackgroundColor);
    if ((this.sortOriginSubmitDateFlag = !this.sortOriginSubmitDateFlag)) {
      this.coffeesHtmlView = this.coffeesHtmlView.sort(
        this.shared.compareDate('lastSubmittedCoffee', OrderTypeEnum.ASC)
      );
    } else {
      this.coffeesHtmlView = this.coffeesHtmlView.sort(
        this.shared.compareDate('lastSubmittedCoffee', OrderTypeEnum.DESC)
      );
    }
  }
}

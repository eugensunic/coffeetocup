import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import {
  lightGreenBackgroundColor,
  fruityBarBackgroundColor,
  nuttyBarBackgroundColor,
  chocoBarBackgroundColor,
  caramelBarBackgroundColor,
  floralBarBackgroundColor,
  sortBackgroundColor,
} from 'src/environments/typography';
import { Store } from '@ngxs/store';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Router } from '@angular/router';
import { OrderTypeEnum } from 'src/app/shared/models/order-type.enum';

@Component({
  selector: 'app-origin-display',
  templateUrl: './origin-display.component.html',
})
export class OriginDisplayComponent implements OnInit, AfterViewInit {
  // colors
  readonly fruityBarBackgroundColor = fruityBarBackgroundColor;
  readonly nuttyBarBackgroundColor = nuttyBarBackgroundColor;
  readonly chocoBarBackgroundColor = chocoBarBackgroundColor;
  readonly caramelBarBackgroundColor = caramelBarBackgroundColor;
  readonly floralBarBackgroundColor = floralBarBackgroundColor;

  @Input() countryFilter;
  @Input() selectedCountry;
  @Input() coffeeJson;
  @Input() coffeesHtmlView;
  @Input() allUsers;
  @Input() svgName: string;

  // functions
  @Input() onCountryNameChange;
  @Input() navigateOnClick;

  @ViewChild('sortByOrigin') sortByOrigin;
  @ViewChild('sortByCoffee') sortByCoffee;
  @ViewChild('sortByBrewing') sortByBrewing;
  @ViewChild('sortByDate') sortByDate;

  htmlSortItemsSm: HTMLElement[] = [];

  // sorting wrappers
  showCountrySortingWrapper = false;
  showTotalCoffeesSortingWrapper = false;
  showTotalBrewsSortingWrapper = false;
  showOriginSubmitDateSortingWrapper = false;
  //sorting flags
  sortCountryFlag = false;
  sortTotalCoffeesFlag = false;
  sortTotalBrewsFlag = false;
  sortOriginSubmitDateFlag = false;

  constructor(private shared: SharedService, private router: Router, private store: Store) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.htmlSortItemsSm = [this.sortByOrigin, this.sortByCoffee, this.sortByBrewing, this.sortByDate];
  }

  // sorting methods
  sortCountry() {
    this.showCountrySortingWrapper = true;
    this.showTotalCoffeesSortingWrapper = false;
    this.showTotalBrewsSortingWrapper = false;
    this.showOriginSubmitDateSortingWrapper = false;

    this.shared.applyBackgroundColorOnClick(this.htmlSortItemsSm, sortBackgroundColor, null, null, null);
    if ((this.sortCountryFlag = !this.sortCountryFlag)) {
      this.coffeesHtmlView = this.coffeesHtmlView.sort(
        this.shared.compareString('country', OrderTypeEnum.ASC)
      );
    } else {
      this.coffeesHtmlView = this.coffeesHtmlView.sort(
        this.shared.compareString('country', OrderTypeEnum.DESC)
      );
    }
  }

  sortTotalCoffees() {
    this.showCountrySortingWrapper = false;
    this.showTotalCoffeesSortingWrapper = true;
    this.showTotalBrewsSortingWrapper = false;
    this.showOriginSubmitDateSortingWrapper = false;

    this.shared.applyBackgroundColorOnClick(this.htmlSortItemsSm, null, sortBackgroundColor, null, null);
    if ((this.sortTotalCoffeesFlag = !this.sortTotalCoffeesFlag)) {
      this.coffeesHtmlView = this.coffeesHtmlView.sort(
        this.shared.compareNum2('totalCoffee', 'amount', OrderTypeEnum.ASC)
      );
    } else {
      this.coffeesHtmlView = this.coffeesHtmlView.sort(
        this.shared.compareNum2('totalCoffee', 'amount', OrderTypeEnum.DESC)
      );
    }
  }

  sortTotalBrews() {
    this.showCountrySortingWrapper = false;
    this.showTotalCoffeesSortingWrapper = false;
    this.showTotalBrewsSortingWrapper = true;
    this.showOriginSubmitDateSortingWrapper = false;

    this.shared.applyBackgroundColorOnClick(this.htmlSortItemsSm, null, null, sortBackgroundColor, null);
    if ((this.sortTotalBrewsFlag = !this.sortTotalBrewsFlag)) {
      this.coffeesHtmlView = this.coffeesHtmlView.sort(
        this.shared.compareNum2('totalBrew', 'amount', OrderTypeEnum.ASC)
      );
    } else {
      this.coffeesHtmlView = this.coffeesHtmlView.sort(
        this.shared.compareNum2('totalBrew', 'amount', OrderTypeEnum.DESC)
      );
    }
  }

  sortOriginSubmitDate() {
    this.showCountrySortingWrapper = false;
    this.showTotalCoffeesSortingWrapper = false;
    this.showTotalBrewsSortingWrapper = false;
    this.showOriginSubmitDateSortingWrapper = true;

    this.shared.applyBackgroundColorOnClick(this.htmlSortItemsSm, null, null, null, sortBackgroundColor);
    if ((this.sortOriginSubmitDateFlag = !this.sortOriginSubmitDateFlag)) {
      this.coffeesHtmlView = this.coffeesHtmlView.sort(this.shared.compareDate('date', OrderTypeEnum.ASC));
    } else {
      this.coffeesHtmlView = this.coffeesHtmlView.sort(this.shared.compareDate('date', OrderTypeEnum.DESC));
    }
  }
}

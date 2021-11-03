import { OrderTypeEnum } from '../../models/order-type.enum';
import { Component, OnInit, Input, ViewChild, ApplicationRef } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import {
  lightGreenBackgroundColor,
  sortBackgroundColor,
  brewsSectionBackground,
  attributesSectionBackground,
} from 'src/environments/typography';
import { UserProfileService } from 'src/app/user-profile/services/user-profile.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StatisticsService } from 'src/app/user-profile/services/statistics.service';
import { Store } from '@ngxs/store';
import { URL } from '../../../../environments/url';
import { NgbdModalComponent } from '../ngbd-modal/ngbd-modal.component';
import {
  HeadingOverviewStatsState,
  SetHeadingOverviewStats,
} from 'src/app/user-profile/states/heading-overview-stats.action';
import { distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
})
export class DataListComponent implements OnInit {
  readonly lightGreenBackgroundColor = lightGreenBackgroundColor;
  readonly brewsSectionBackground = brewsSectionBackground;
  readonly attributesSectionBackground = attributesSectionBackground;
  @ViewChild('sortByBrew') sortByBrew;
  @ViewChild('sortByDate') sortByDate;
  @ViewChild('sortByRate') sortByRate;

  @Input() isGuest: boolean;
  // input functions
  @Input() hideSharedIcon: boolean;
  @Input() hasQueryParams: boolean;

  @Input() useCoffee: (item: any) => any;
  @Input() archiveCoffee: (item: any) => any;
  @Input() deleteCoffeeOrigin: (item: any) => any;
  @Input() editOrigin: (item: any) => any;
  @Input()
  showComments: (item: any) => any;

  // input values, these 2 are unknown check them out
  @Input() showButtonSection: boolean;
  @Input() showActionPartSmDefault: any[];
  @Input() countryFilter: string;

  @Input() showTable: boolean;
  @Input() showActionSection: boolean;
  @Input() showDeleteCoffeeOrigin: boolean;
  @Input() showBrewsNums: any[];
  @Input() showAttributesNums: any[];

  sharedCoffeeOriginId = [];

  currentCheckboxIndexBrew = -1;
  currentCheckboxIndexAttribute = -1;

  showBrewsSortingWrapper = false;
  showAvgSortingWrapper = false;
  showFormSubmitDateSortingWrapper = false;

  sortFormSubmitDateFlag = false;
  sortFilteredAvgOverall = false;
  sortFilteredBrewsAttributes = false;

  sortOverallFlag = false;
  sortBrewSubmitDateFlag = false;

  @Input() coffeeJson: any[];
  htmlSortItemsSm: HTMLElement[] = [];

  constructor(
    private shared: SharedService,
    private userProfileService: UserProfileService,
    private modalService: NgbModal,
    private appRef: ApplicationRef,
    public statistics: StatisticsService,
    private store: Store
  ) {}

  ngOnInit() {
    // sort observables
    this.shared.getSmTotalBrewsSort().subscribe((_) => {
      this.sortTotalBrewsAttributes(null);
    });
    this.shared.getSmAvgOverallSort().subscribe((_) => {
      this.sortAvgOverallRating(null);
    });
    this.shared.getSmLastBrewDateSort().subscribe((_) => {
      this.sortLastBrewSubmitDateTime(null);
    });

    this.shared.getDeletedCoffee().subscribe((x) => {
      this.coffeeJson = x;
    });
    this.coffeeJson =
      this.coffeeJson &&
      this.coffeeJson.map((x) => {
        return {
          ...x,
          roastingType: { ...x.roastingType, type: this.shared.roastingTypeNameMapping(x.roastingType.type) },
          coffeeBrew: x.coffeeBrew.map((y) => ({
            ...y,
            ratio: { ...y.ratio, ratio: Number(y.ratio.ratio).toFixed() },
          })),
        };
      });
  }

  ngAfterViewInit() {
    this.htmlSortItemsSm = [this.sortByBrew, this.sortByDate, this.sortByRate];
  }

  deleteCoffeeBrewAttribute(brewId: string, attributeId: string, i: number, j: number) {
    const modalRef = this.modalService.open(NgbdModalComponent);

    modalRef.componentInstance.name = 'Delete brew & attribute';
    modalRef.componentInstance.content = `
    Your coffee brew and attribute will be deleted permanently`;
    modalRef.componentInstance.rightButtonName = 'Delete';
    modalRef.componentInstance.onConfirm = () => {
      this.userProfileService
        .deleteCoffeeOriginBrewAttributesData(URL.apiBrewAttributesDelete, {
          brewId: brewId,
          attributeId: attributeId,
        })
        .subscribe(
          (x) => {
            // hide id here;
            this.showBrewsNums[i] = -1;
            this.showAttributesNums[i][j] = -1;
            this.currentCheckboxIndexAttribute = -1;
            this.currentCheckboxIndexBrew = -1;
            this.showActionPartSmDefault[i] = -1;

            this.coffeeJson = this.statistics.onCoffeeDeleteCallback(this.coffeeJson, i, j);
            this.userProfileService.transferUniqueCountryData(this.coffeeJson);

            // modify brewAttributes header number only
            const headerState = this.store.selectSnapshot(HeadingOverviewStatsState);
            this.store.dispatch(
              new SetHeadingOverviewStats(
                headerState.originAmount,
                headerState.countryAmount,
                headerState.archiveAmount,
                headerState.brewAttributesAmount - 1
              )
            );
            this.shared.sendDeleteCoffee(this.coffeeJson);
            this.appRef.tick();
          },
          (err) => {}
        );
    };
  }

  showActionPartDefault(index) {
    if (this.showActionPartSmDefault[index] === -1) {
      this.closeAllLevelOneRows(this.showActionPartSmDefault);
      this.showActionPartSmDefault[index] = index;
    } else {
      this.showActionPartSmDefault[index] = -1;
    }
  }

  // Show sub-rows BEGIN
  showAttributes(indexI: number, indexJ: number) {
    this.closeAllLevelTwoRows(this.showAttributesNums);
    if (this.currentCheckboxIndexAttribute === indexJ) {
      this.showAttributesNums[indexI][indexJ] = -1;
      this.currentCheckboxIndexAttribute = -1;
      return;
    } else {
      this.showAttributesNums[indexI][indexJ] = indexJ;
      this.currentCheckboxIndexAttribute = indexJ;
    }
  }

  // sort origin (level 1) data, if-else because of toggle
  showBrews(index: number) {
    this.showActionPartDefault(index);
    this.closeAllLevelOneRows(this.showBrewsNums);
    if (this.currentCheckboxIndexBrew === index) {
      this.showBrewsNums[index] = -1;
      this.currentCheckboxIndexBrew = -1;
      return;
    } else {
      this.showBrewsNums[index] = index;
      this.currentCheckboxIndexBrew = index;
    }
  }

  // first level sorts begin
  sortTotalBrewsAttributes(e) {
    this.actionPartReset();
    this.showBrewsSortingWrapper = true;
    this.showAvgSortingWrapper = false;
    this.showFormSubmitDateSortingWrapper = false;

    this.shared.applyBackgroundColorOnClick(this.htmlSortItemsSm, sortBackgroundColor, null, null);
    this.closeAllLevelOneRows(this.showBrewsNums);
    if ((this.sortFilteredBrewsAttributes = !this.sortFilteredBrewsAttributes)) {
      this.coffeeJson = [...this.coffeeJson].sort(this.shared.compareNum1('brewsAmount', OrderTypeEnum.ASC));
    } else {
      this.coffeeJson = [...this.coffeeJson].sort(this.shared.compareNum1('brewsAmount', OrderTypeEnum.DESC));
    }
    e && this.shared.sendLgTotalBrewsSort();
  }

  sortAvgOverallRating(e) {
    this.actionPartReset();
    this.showBrewsSortingWrapper = false;
    this.showAvgSortingWrapper = true;
    this.showFormSubmitDateSortingWrapper = false;

    this.shared.applyBackgroundColorOnClick(this.htmlSortItemsSm, null, null, sortBackgroundColor);
    this.currentCheckboxIndexBrew = -1;
    this.closeAllLevelOneRows(this.showBrewsNums);
    if ((this.sortFilteredAvgOverall = !this.sortFilteredAvgOverall)) {
      this.coffeeJson = [...this.coffeeJson].sort(this.shared.compareNum1('avgRating', OrderTypeEnum.ASC));
    } else {
      this.coffeeJson = [...this.coffeeJson].sort(this.shared.compareNum1('avgRating', OrderTypeEnum.DESC));
    }
    e && this.shared.sendLgAvgOverallSort();
  }

  sortLastBrewSubmitDateTime(e) {
    this.actionPartReset();
    this.showBrewsSortingWrapper = false;
    this.showAvgSortingWrapper = false;
    this.showFormSubmitDateSortingWrapper = true;

    this.shared.applyBackgroundColorOnClick(this.htmlSortItemsSm, null, sortBackgroundColor, null);
    this.currentCheckboxIndexBrew = -1;
    this.closeAllLevelOneRows(this.showBrewsNums);
    if ((this.sortFormSubmitDateFlag = !this.sortFormSubmitDateFlag)) {
      this.coffeeJson = [...this.coffeeJson].sort(
        this.shared.compareDate('lastBrewSubmitDateTime', OrderTypeEnum.ASC)
      );
    } else {
      this.coffeeJson = [...this.coffeeJson].sort(
        this.shared.compareDate('lastBrewSubmitDateTime', OrderTypeEnum.DESC)
      );
    }
    e && this.shared.sendLgLastBrewDateSort();
  }

  closeAllLevelOneRows(array: number[]) {
    this.currentCheckboxIndexAttribute = -1;
    for (let i = 0; i < array.length; i++) {
      array[i] = -1;
    }
  }

  closeAllLevelTwoRows(array: number[][]) {
    for (let i = 0; i < array.length; i++) {
      const a = array[i];
      for (let j = 0; j < a.length; j++) {
        a[j] = -1;
      }
    }
  }

  actionPartReset() {
    this.showActionPartSmDefault = this.showActionPartSmDefault.map(() => -1);
  }

  generateDataUrl(item, i) {
    this.shared
      .generateCoffeeUrl(URL.apiGenerateUrl, {
        coffeeOriginId: item._id,
        userId: item.user_FK,
      })
      .subscribe(({ originId }) => {
        this.sharedCoffeeOriginId[i] = originId;
      });
  }

  onGeneratedLinkClick(e, index) {
    e.preventDefault();
    e.stopPropagation();
    window.open('shared/' + this.sharedCoffeeOriginId[index], '_blank');
    this.sharedCoffeeOriginId[index] = null;
  }
}

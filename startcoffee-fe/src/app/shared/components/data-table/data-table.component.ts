import { SharedService } from '../../services/shared.service';
import { Component, OnInit, Input, AfterViewInit, ApplicationRef, ChangeDetectorRef } from '@angular/core';
import { OrderTypeEnum } from '../../models/order-type.enum';
import {
  lightGreenBackgroundColor,
  brewsSectionBackground,
  attributesSectionBackground,
} from 'src/environments/typography';
import { URL } from '../../../../environments/url';
import { Router } from '@angular/router';
import { UserProfileService } from 'src/app/user-profile/services/user-profile.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalComponent } from '../ngbd-modal/ngbd-modal.component';
import {
  SetHeadingOverviewStats,
  HeadingOverviewStatsState,
} from 'src/app/user-profile/states/heading-overview-stats.action';
import { StatisticsService } from 'src/app/user-profile/services/statistics.service';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
})
export class DataTableComponent implements OnInit {
  readonly lightGreenBackgroundColor = lightGreenBackgroundColor;
  readonly brewsSectionBackground = brewsSectionBackground;
  readonly attributesSectionBackground = attributesSectionBackground;

  sharedCoffeeOriginId = [];
  @Input() isGuest: boolean;
  @Input() isArchivePage: boolean;
  @Input() hideSharedIcon: boolean;
  @Input() hasQueryParams: boolean;
  @Input() countryFilter: string;

  // input functions
  @Input() useCoffee: (item: any) => any;
  @Input() archiveCoffee: (item: any) => any;

  // input functions
  @Input() deleteCoffeeOrigin: (item: any) => any;
  @Input() editOrigin: (item: any) => any;
  @Input() showComments: (country: string, formSubmitDate: string, attributeObj: any) => any;

  @Input() showTable: boolean;
  @Input() showActionSection: boolean;
  @Input() showDeleteCoffeeOrigin: boolean;
  @Input() showDeleteCoffeeAttributes: boolean;
  @Input() showBrewsNums: any[];
  @Input() showAttributesNums: any[];

  showWrapper = false;
  isDescSort = false;

  currentCheckboxIndexBrew = -1;
  currentCheckboxIndexAttribute = -1;

  showBrewsSortingWrapper = false;
  sortBrewsFlag = false;
  showAvgSortingWrapper = false;
  sortAvgRatingFlag = false;
  showFormSubmitDateSortingWrapper = false;
  sortFormSubmitDateFlag = false;
  showBrewSubmitDateSortingWrapper = false;
  sortBrewSubmitDateFlag = false;
  showOverallSortingWrapper = false;
  sortOverallFlag = false;

  // input values
  @Input() coffeeJson: any[];

  constructor(
    private shared: SharedService,
    private userProfileService: UserProfileService,
    private modalService: NgbModal,
    private appRef: ApplicationRef,
    public statistics: StatisticsService,
    private router: Router,
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.shared.getLgTotalBrewsSort().subscribe((x) => {
      this.sortTotalBrewsAttributes(null);
    });
    this.shared.getLgAvgOverallSort().subscribe((_) => {
      this.sortAvgOverallRating(null);
    });
    this.shared.getLgLastBrewDateSort().subscribe((_) => {
      this.sortLastBrewSubmitDateTime(null);
    });
    this.shared.getDeletedCoffee().subscribe((x) => {
      this.coffeeJson = x;
    });
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
            this.currentCheckboxIndexBrew = -1;
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

  // Show sub-rows BEGIN
  showAttributes(indexI: number, indexJ: number) {
    this.closeAllLevelTwoRows(this.showAttributesNums);
    if (this.currentCheckboxIndexAttribute === indexJ) {
      this.showAttributesNums[indexI][indexJ] = -1;
      this.currentCheckboxIndexAttribute = -1;
    } else {
      this.showAttributesNums[indexI][indexJ] = indexJ;
      this.currentCheckboxIndexAttribute = indexJ;
    }
  }

  // sort origin (level 1) data, if-else because of toggle
  showBrews(index: number) {
    this.closeAllLevelOneRows(this.showBrewsNums);
    if (this.currentCheckboxIndexBrew === index) {
      this.showBrewsNums[index] = -1;
      this.currentCheckboxIndexBrew = -1;
    } else {
      this.showBrewsNums[index] = index;
      this.currentCheckboxIndexBrew = index;
    }
  }
  // Show sub-rows END

  sortTotalBrewsAttributes(e) {
    this.showBrewsSortingWrapper = true;
    this.showAvgSortingWrapper = false;
    this.showFormSubmitDateSortingWrapper = false;

    this.closeAllLevelOneRows(this.showBrewsNums);
    if ((this.sortBrewsFlag = !this.sortBrewsFlag)) {
      this.coffeeJson = [...this.coffeeJson].sort(this.shared.compareNum1('brewsAmount', OrderTypeEnum.ASC));
    } else {
      this.coffeeJson = [...this.coffeeJson].sort(this.shared.compareNum1('brewsAmount', OrderTypeEnum.DESC));
    }

    e && this.shared.sendSmTotalBrewsSort();
  }

  sortAvgOverallRating(e) {
    this.showBrewsSortingWrapper = false;
    this.showAvgSortingWrapper = true;
    this.showFormSubmitDateSortingWrapper = false;
    this.closeAllLevelOneRows(this.showBrewsNums);
    if ((this.sortAvgRatingFlag = !this.sortAvgRatingFlag)) {
      this.coffeeJson = [...this.coffeeJson].sort(this.shared.compareNum1('avgRating', OrderTypeEnum.ASC));
    } else {
      this.coffeeJson = [...this.coffeeJson].sort(this.shared.compareNum1('avgRating', OrderTypeEnum.DESC));
    }
    e && this.shared.sendSmAvgOverallSort();
  }

  sortLastBrewSubmitDateTime(e) {
    this.showBrewsSortingWrapper = false;
    this.showAvgSortingWrapper = false;
    this.showFormSubmitDateSortingWrapper = true;
    this.closeAllLevelOneRows(this.showBrewsNums);
    this.currentCheckboxIndexBrew = -1;
    if ((this.sortFormSubmitDateFlag = !this.sortFormSubmitDateFlag)) {
      this.coffeeJson = [...this.coffeeJson].sort(
        this.shared.compareDate('lastBrewSubmitDateTime', OrderTypeEnum.ASC)
      );
    } else {
      this.coffeeJson = [...this.coffeeJson].sort(
        this.shared.compareDate('lastBrewSubmitDateTime', OrderTypeEnum.DESC)
      );
    }
    e && this.shared.sendSmLastBrewDateSort();
  }

  /*  sort brew (level 2) data, if-else because of toggle
   sorting attributes and brew, copied significant parameter to array */
  sortBrewSubmitDate(index) {
    this.showBrewSubmitDateSortingWrapper = true;
    if ((this.sortBrewSubmitDateFlag = !this.sortBrewSubmitDateFlag)) {
      this.coffeeJson[index].coffeeBrew = this.coffeeJson[index].coffeeBrew.sort(
        this.shared.compareDate('brewSubmitDate', OrderTypeEnum.DESC)
      );
      this.coffeeJson[index].coffeeAttributes = this.coffeeJson[index].coffeeAttributes.sort(
        this.shared.compareDate('brewSubmitDate', OrderTypeEnum.DESC)
      );
    } else {
      this.coffeeJson[index].coffeeBrew = this.coffeeJson[index].coffeeBrew.sort(
        this.shared.compareDate('brewSubmitDate', OrderTypeEnum.ASC)
      );
      this.coffeeJson[index].coffeeAttributes = this.coffeeJson[index].coffeeAttributes.sort(
        this.shared.compareDate('brewSubmitDate', OrderTypeEnum.ASC)
      );
    }
  }
  // sorting attributes and brew, copied significant parameter to array
  sortOverall(index) {
    this.showOverallSortingWrapper = true;
    if ((this.sortOverallFlag = !this.sortOverallFlag)) {
      this.coffeeJson[index].coffeeAttributes = this.coffeeJson[index].coffeeAttributes.sort(
        this.shared.compareNum1('overall', OrderTypeEnum.ASC)
      );
      this.coffeeJson[index].coffeeBrew = this.coffeeJson[index].coffeeBrew.sort(
        this.shared.compareDate('overall', OrderTypeEnum.ASC)
      );
    } else {
      this.coffeeJson[index].coffeeAttributes = this.coffeeJson[index].coffeeAttributes.sort(
        this.shared.compareNum1('overall', OrderTypeEnum.DESC)
      );
      this.coffeeJson[index].coffeeBrew = this.coffeeJson[index].coffeeBrew.sort(
        this.shared.compareDate('overall', OrderTypeEnum.DESC)
      );
    }
  }
  // Sort inner table by clicking on header cell name END

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

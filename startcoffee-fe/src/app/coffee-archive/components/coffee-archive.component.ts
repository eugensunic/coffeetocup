import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserProfileService } from 'src/app/user-profile/services/user-profile.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { URL } from '../../../environments/url';
import { StatisticsService } from 'src/app/user-profile/services/statistics.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalComponent } from 'src/app/shared/components/ngbd-modal/ngbd-modal.component';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-coffee-archive',
  templateUrl: './coffee-archive.component.html',
})
export class CoffeeArchiveComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  coffeeJson: any;

  showAttributesNums = [];
  showBrewsNums = [];
  showBasicTable = true;

  showActionPartSmDefault = [];

  avgPerOrigin = [];
  submitDates = [];

  showLoadingSpinner = true;

  constructor(
    private userProfileService: UserProfileService,
    private statistics: StatisticsService,
    private modalService: NgbModal,
  ) {}

  ngOnInit() {
    // this.shared.setBackgroundImage('assets/images/general/profile_background.png');

    this.userProfileService
      .getUserProfileData(URL.apiCoffeeArchive)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (x) => {
          this.showLoadingSpinner = false;
          this.avgPerOrigin = this.statistics.getAvgOverallPerOrigin(x);
          this.submitDates = this.statistics.getSubmitDate(x);

          // set arrays to -1 which means closing all subRows (brew, attributes)
          this.showActionPartSmDefault = Array.from(Array(x.length), (_, i) => -1);
          this.showBrewsNums = Array.from(Array(x.length), (_, i) => -1);
          this.showAttributesNums = x.map((item) => item.coffeeAttributes.map((_) => -1));

          // modifying main object variable for sorting purpose
          this.coffeeJson = x.map((y, i: number) => ({
            ...y,
            roastingType: { type: y.roastingType, index: this.getRoastingIndex(y.roastingType) },
            avgRating: this.avgPerOrigin[i],
            formSubmitDate: this.submitDates[i],
            coffeeAttributes: y.coffeeAttributes.map((z) => ({ ...z })),
          }));
        },
        (err) => {}
      );
  }

  deleteCoffeeOrigin(coffeeHtml: any) {
    const modalRef = this.modalService.open(NgbdModalComponent);

    modalRef.componentInstance.name = 'Delete Coffee permanently';
    modalRef.componentInstance.content = `
    Your coffee will be deleted permanently from this app.
    Are you sure you want to delete your coffee?
    `;
    modalRef.componentInstance.rightButtonName = 'Delete';
    modalRef.componentInstance.onConfirm = () => {
      this.userProfileService
        .deleteCoffeeEntireOriginData(URL.apiCoffeeOriginDelete, { originId: coffeeHtml._id })
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((_) => (this.coffeeJson = this.coffeeJson.filter((y: any) => y._id !== coffeeHtml._id)));
    };
  }

  openModalCommentSection(country: string, formSubmitDate: string, attrObj: any) {
    const modalRef = this.modalService.open(NgbdModalComponent);
    modalRef.componentInstance.showEditOrigin = false;

    modalRef.componentInstance.name = 'Comments';
    modalRef.componentInstance.content =
      country + ', ' + formSubmitDate + ', <p></p><strong>Comment:</strong><p></p> ' + attrObj.commentText;
    modalRef.componentInstance.rightButtonName = 'Close';
    modalRef.componentInstance.onConfirm = () => {};
  }

  // Use enums
  getRoastingIndex(roastingType): number {
    let index = 0;
    switch (roastingType) {
      case 'light':
        index = 1;
        break;
      case 'medium':
        index = 2;
        break;
      case 'dark':
        index = 3;
        break;
      default:
        index = -1;
        break;
    }
    return index;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

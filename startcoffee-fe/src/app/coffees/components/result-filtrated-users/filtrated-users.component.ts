import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Select } from '@ngxs/store';
import { StatisticsService } from 'src/app/user-profile/services/statistics.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FiltratedUsersState } from '../../states/filtrated-users.action';
import { NgbdModalComponent } from 'src/app/shared/components/ngbd-modal/ngbd-modal.component';
import { Router } from '@angular/router';
import { cookieObject, removeNavbarDropdown } from 'src/app/utils';

@Component({
  selector: 'app-filtrated-users',
  templateUrl: './filtrated-users.component.html',
})
export class FiltratedUsersComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  isGuest = false;

  @Select(FiltratedUsersState)
  coffees$: Observable<any>;

  coffeeJson: any;
  coffeeJsonDefault: any;
  selectedFilter = 'default';

  showAttributesNums = [];
  showActionPartSmDefault = [];
  avgPerOrigin: number[];
  submitDates: string[];

  headerArea = {
    id: '',
    username: '',
    country: '',
    brew: '',
  };

  constructor(
    private shared: SharedService,
    public statistics: StatisticsService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit() {
    this.coffees$.subscribe((x) => {
      this.headerArea = {
        ...this.headerArea,
        id: x.userId,
        username: x.users[0].username,
        country: x.country,
        brew: x.brew,
      };

      this.shared.sendLoadingSpinnerSignal(false);

      this.avgPerOrigin = this.statistics.getAvgOverallPerOrigin(x.users);
      this.submitDates = this.statistics.getSubmitDate(x.users);

      this.coffeeJson = x.users.map((y, i: number) => ({
        ...y,
        avgRating: this.avgPerOrigin[i],
        formSubmitDate: this.submitDates[i],
        roastingType: { type: y.roastingType, index: 0 },
        coffeeBrew: y.coffeeBrew.map((z, j) => ({
          ...z,
          overall: y.coffeeAttributes[j] && y.coffeeAttributes[j].overall,
        })),
        coffeeAttributes: y.coffeeAttributes.map((z, j) => ({
          ...z,
          formSubmitDate: y.coffeeAttributes[j].formSubmitDate,
        })),
      }));

      this.coffeeJsonDefault = [...this.coffeeJson];

      this.showActionPartSmDefault = Array.from(Array(this.coffeeJson.length), (_) => -1);
      this.showAttributesNums = this.coffeeJson.map((item) => item.coffeeAttributes.map((_) => -1));
    });
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

  filterDefault() {
    this.coffeeJson = this.coffeeJsonDefault;
  }

  filterByGrinding(grindType: string) {
    this.selectedFilter = grindType;
    this.coffeeJson = this.coffeeJsonDefault
      .map((x) => ({
        ...x,
        coffeeBrew: x.coffeeBrew.filter((y) => y.grindType === grindType),
        coffeeAttributes: x.coffeeAttributes
          .map((y, j) => {
            return { ...y, grindType: x.coffeeBrew[j].grindType };
          })
          .filter((y) => y.grindType === grindType),
      }))
      .filter((x) => x.coffeeBrew.length !== 0);
  }

  filterByRatio(lowerBound: number, higherBound: number) {
    this.selectedFilter = lowerBound.toString() + '-' + higherBound.toString();
    this.coffeeJson = this.coffeeJsonDefault
      .map((x) => ({
        ...x,
        coffeeBrew: x.coffeeBrew.filter((y) => y.ratio.ratio >= lowerBound && y.ratio.ratio <= higherBound),
        coffeeAttributes: x.coffeeAttributes
          .map((y, j) => {
            return { ...y, ratio: x.coffeeBrew[j].ratio.ratio };
          })
          .filter((y) => y.ratio >= lowerBound && y.ratio <= higherBound),
      }))
      .filter((x) => x.coffeeBrew.length !== 0);
  }

  viewUserProfile(id: string, username: string) {
    removeNavbarDropdown();
    if (id === cookieObject('auth').id) {
      this.router.navigate(['/profile/allcoffees']).then((_) => this.shared.scrollToPageTopView());
    } else {
      this.router
        .navigate(['/profile/allcoffees'], {
          queryParams: {
            name: username,
            id: id,
          },
        })
        .then((_) => this.shared.scrollToPageTopView());
    }
  }

  navigateToUsersList() {
    removeNavbarDropdown();
    window.history.back();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

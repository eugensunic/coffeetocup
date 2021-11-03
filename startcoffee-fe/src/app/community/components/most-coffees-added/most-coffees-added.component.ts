import { Subject } from 'rxjs/internal/Subject';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommunityService } from 'src/app/community/services/community.service';
import { URL } from '../../../../environments/url';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-most-coffees-added',
  templateUrl: './most-coffees-added.component.html',
})
export class MostCoffeesAddedComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  dataHtml;
  showLoadingSpinner = true;

  constructor(private communityService: CommunityService) {}

  ngOnInit() {
    this.communityService
      .getMostCoffeesStats(URL.apiCommunityOriginCoffees)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((x) => {
        this.showLoadingSpinner = false;
        this.dataHtml = x;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

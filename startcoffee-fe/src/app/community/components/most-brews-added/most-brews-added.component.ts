import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommunityService } from 'src/app/community/services/community.service';
import { URL } from '../../../../environments/url';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-most-brews-added',
  templateUrl: './most-brews-added.component.html',
})
export class MostBrewsAddedComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  dataHtml;
  showLoadingSpinner = true;

  constructor(private communityService: CommunityService) {}

  ngOnInit() {
    this.communityService
      .getMostBrewsStats(URL.apiCommunityBrewCoffee)
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

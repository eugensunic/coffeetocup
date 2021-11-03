import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Router } from '@angular/router';
import { greenTextColor, greenBorderColor } from 'src/environments/typography';
import { removeNavbarDropdown } from 'src/app/utils';
@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
})
export class CommunityComponent implements OnInit, AfterViewInit {
  @ViewChild('generalStatistics') generalStatistics;
  @ViewChild('mostCoffees') mostCoffees;
  @ViewChild('mostBrews') mostBrews;

  htmlNavbarItems: HTMLElement[] = [];
  htmlNavbarItemsSm: HTMLElement[] = [];

  @ViewChild('generalStatisticsSm') generalStatisticsSm;
  @ViewChild('mostCoffeesSm') mostCoffeesSm;
  @ViewChild('mostBrewsSm') mostBrewsSm;

  constructor(private shared: SharedService, private router: Router) {}

  ngOnInit() {
    this.shared.highlightNavHeading('community');
    // this.shared.setBackgroundImage('assets/images/general/community_background.png');
  }

  ngAfterViewInit() {
    this.htmlNavbarItems = [this.generalStatistics, this.mostCoffees, this.mostBrews];
    this.htmlNavbarItemsSm = [this.generalStatisticsSm, this.mostCoffeesSm, this.mostBrewsSm];
    this.applyBorderStyleToRoute(this.router.url);
    this.applyTextColorToRoute(this.router.url);
  }

  navigateToGeneralStatistics() {
    removeNavbarDropdown();
    this.shared.applyColorOnClick(this.htmlNavbarItems, greenTextColor, null, null);
    this.shared.applyBorderBottomOnClick(this.htmlNavbarItemsSm, greenBorderColor, null, null);

    this.router.navigate(['/community']);
  }

  navigateToMostCoffeesAdded() {
    removeNavbarDropdown();
    this.shared.applyColorOnClick(this.htmlNavbarItems, null, greenTextColor, null);
    this.shared.applyBorderBottomOnClick(this.htmlNavbarItemsSm, null, greenBorderColor, null);

    this.router.navigate(['/community/mostcoffees']);
  }

  navigateToMostBrewsAdded() {
    removeNavbarDropdown();
    this.shared.applyColorOnClick(this.htmlNavbarItems, null, null, greenTextColor);
    this.shared.applyBorderBottomOnClick(this.htmlNavbarItemsSm, null, null, greenBorderColor);

    this.router.navigate(['/community/mostbrews']);
  }

  applyTextColorToRoute(routeName) {
    const color = greenTextColor;
    switch (routeName) {
      case '/community/mostcoffees':
        this.mostCoffees.nativeElement.style.color = color;
        this.mostCoffees.nativeElement.style.fontWeight = 'bold';
        break;
      case '/community/mostbrews':
        this.mostBrews.nativeElement.style.color = color;
        this.mostBrews.nativeElement.style.fontWeight = 'bold';
        break;
      default:
        this.generalStatistics.nativeElement.style.color = color;
        this.generalStatistics.nativeElement.style.fontWeight = 'bold';
    }
  }

  applyBorderStyleToRoute(routeName) {
    const borderBottom = greenBorderColor;
    switch (routeName) {
      case '/community/mostcoffees':
        this.mostCoffeesSm.nativeElement.style.borderBottom = borderBottom;
        break;
      case '/community/mostbrews':
        this.mostBrewsSm.nativeElement.style.borderBottom = borderBottom;
        break;
      default:
        this.generalStatisticsSm.nativeElement.style.borderBottom = borderBottom;
    }
  }
}

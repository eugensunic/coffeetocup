import { Component, OnInit, Input } from '@angular/core';
import { cookieObject } from 'src/app/utils';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-community-coffee-list',
  templateUrl: './community-coffee-list.component.html',
})
export class CommunityCoffeeListComponent implements OnInit {
  //strings
  @Input() titleId;
  @Input() title;
  @Input() tableId;
  @Input() spinnerId;
  @Input() mainColumnName;
  @Input() sortCriteria;

  // variables
  @Input() dataHtml;
  @Input() showLoadingSpinner;

  constructor(private router: Router, private shared: SharedService) {}

  ngOnInit(): void {}

  navigateToUserProfile(id: string, username: string) {
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
}

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { URL } from '../../../../environments/url';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/shared/services/shared.service';
import { removeNavbarDropdown } from 'src/app/utils';

@Component({
  selector: 'app-user-search-box',
  templateUrl: './user-search-box.component.html',
})
export class UserSearchBoxComponent implements OnInit {
  users = [];
  usersHtml = [];

  @Input() placeholderValue: string;
  @Input() valueInput: string;
  @Input() styles = {};

  constructor(private shared: SharedService, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get(URL.apiCommunityUsers).subscribe((x: any) => {
      this.users = x.users.map((y, index) => ({
        id: y._id,
        firstName: y.firstName,
        lastName: y.lastName,
        username: y.username ? y.username : 'Not defined',
      }));
      // leave it although not needed
      this.users = this.removeDuplicateObjects().filter((x) => x.username !== 'Not defined');
      this.usersHtml = this.users.map((y) => (y.username ? y.username : ''));
    });
  }

  onUserChange(value: string) {
    removeNavbarDropdown();
    this.shared.sendSearchUserSignal({ search: true });
    this.router
      .navigate(['/profile/allcoffees'], {
        queryParams: {
          name: value,
          id: this.getUserId(value),
        },
      })
      .then((_) => this.shared.scrollToPageTopView());
  }

  getUserId(username: string): string | null {
    for (const i in this.users) {
      if (this.users[i].username === username) {
        return this.users[i].id;
      }
    }
    return null;
  }

  // not used
  addUsersPropertyIfNotExists(x) {
    return x.hasOwnProperty('users') ? x : { users: [...x] };
  }

  removeDuplicateObjects() {
    return this.users.filter((item, index) => {
      return (
        index ===
        this.users.findIndex((obj) => {
          return obj.username === item.username;
        })
      );
    });
  }
}

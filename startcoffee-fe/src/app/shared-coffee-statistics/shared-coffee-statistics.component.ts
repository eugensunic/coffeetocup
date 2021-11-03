import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { StatisticsService } from '../user-profile/services/statistics.service';

@Component({
  selector: 'app-shared-coffee-statistics',
  templateUrl: './shared-coffee-statistics.component.html',
})
export class SharedCoffeeStatisticsComponent implements OnInit {
  coffeeJson = [];
  avgPerOrigin: number[];
  submitDates: string[];
  showAttributesNums = [];
  hasError = false;
  username = null;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private statistics: StatisticsService
  ) {}

  generateSharedUserCoffee(url: string): Observable<any> {
    return this.http.get(url);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.generateSharedUserCoffee('/shared-coffee/?originId=' + params.token).subscribe(
        (x) => {
          this.avgPerOrigin = this.statistics.getAvgOverallPerOrigin(x);
          this.submitDates = this.statistics.getSubmitDate(x);
          this.username = x[0].username;
          this.coffeeJson = x.map((y, i: number) => ({
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

          this.showAttributesNums = Array(this.coffeeJson[0].coffeeAttributes.length).fill([0]);
        },
        (err) => {
          this.hasError = true;
        }
      );
    });
  }
}

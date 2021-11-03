import { CommunityService } from '../../services/community.service';
import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { URL } from '../../../../environments/url';

@Component({
  selector: 'app-general-statistics',
  templateUrl: './general-statistics.component.html'
})
export class GeneralStatisticsComponent implements OnInit {
  totalCoffees: number;
  totalBrews: number;
  avgAmountCoffeesPerBrew: number;
  avgAmountCoffeesPerWater: number;

  constructor(private communityService: CommunityService) {}

  ngOnInit() {
    combineLatest(
      this.communityService.getGeneralStats(URL.apiCommunityGeneralCoffees),
      this.communityService.getGeneralStats(URL.apiCommunityGeneralBrews),
      this.communityService.getGeneralStats(URL.apiCommunityGeneralAvgBrew),
      this.communityService.getGeneralStats(URL.apiCommunityGeneralAvgWater)
    ).subscribe(([i, j, k, z]) => {
      this.totalCoffees = i;
      this.totalBrews = j;
      this.avgAmountCoffeesPerBrew = k[0].avg.toFixed(2);
      this.avgAmountCoffeesPerWater = z[0].avg.toFixed(2);
      
    });
  }
}

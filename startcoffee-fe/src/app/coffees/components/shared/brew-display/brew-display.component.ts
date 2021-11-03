import { Component, OnInit, Input } from '@angular/core';
import { grindingBackgroundColor } from 'src/environments/typography';
import { CoffeeBrewFilterModel } from 'src/app/coffees/models/coffee-brew-filter.model';

@Component({
  selector: 'app-brew-display',
  templateUrl: './brew-display.component.html',
})
export class BrewDisplayComponent implements OnInit {
  readonly grindingBackgroundColor = grindingBackgroundColor;
  @Input() allUsers: any;
  @Input() svgName: string;
  @Input() coffeeJson: any;
  @Input() byBrewList: CoffeeBrewFilterModel;

  //functions
  @Input() navigateOnClick;

  constructor() {}

  ngOnInit(): void {}
}

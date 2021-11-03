import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-coffee-horizontal-bar',
  templateUrl: './coffee-horizontal-bar.component.html'
})
export class CoffeeHorizontalBarComponent implements OnInit {
  @Input() propName: string;
  @Input() propValue: number;
  @Input() backgroundColor: string;

  constructor() {}

  ngOnInit() {}
}

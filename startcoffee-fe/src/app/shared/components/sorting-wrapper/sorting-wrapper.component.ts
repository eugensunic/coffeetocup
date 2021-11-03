import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sorting-wrapper',
  templateUrl: './sorting-wrapper.component.html',
  styleUrls: ['./sorting-wrapper.component.scss'],
})
export class SortingWrapperComponent implements OnInit {
  @Input() showWrapper: boolean;
  @Input() isDescSort: boolean;
  constructor() {}

  ngOnInit(): void {}
}

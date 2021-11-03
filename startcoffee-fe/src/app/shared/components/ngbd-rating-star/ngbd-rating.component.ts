import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ngbd-rating',
  templateUrl: './ngbd-rating.component.html',
  styles: [
    `
      .star {
        position: relative;
        display: inline-block;
        font-size: 1rem;
        color: #d3d3d3;
      }
      .full {
        color: black;
      }
      .half {
        position: absolute;
        display: inline-block;
        overflow: hidden;
        color: black;
      }
    `,
  ],
})
export class NgbdRatingComponent implements OnInit {
  @Input() ratingValue: number;
  constructor() {}

  ngOnInit() {
    // this.ratingValue = Number((this.ratingValue / 2).toFixed(1));
  }
}

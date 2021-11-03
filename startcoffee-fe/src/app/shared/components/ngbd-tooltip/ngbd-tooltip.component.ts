import { Component, OnInit, Input } from '@angular/core';
import { NgbTooltipConfig, Placement } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tooltip',
  templateUrl: './ngbd-tooltip.component.html'
})
export class NgbdTooltipComponent implements OnInit {
  @Input() content: string;
  @Input() styleClass: string;
  @Input() placement: Placement;

  constructor(config: NgbTooltipConfig) {
    // customize default values of tooltip used by the component tree
    config.placement = this.placement;
    config.triggers = 'click';
  }

  ngOnInit() {}
}

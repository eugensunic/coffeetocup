import { Subject } from 'rxjs';
import { SetMetaData, CoffeeMetaDataState } from '../../../states/coffee-meta-data.action';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { DateTimePickerService } from '../../services/date-time-picker.service';
import { SetRoastingImage } from '../../../pour-over-form/components/coffee-origin-input/states/roasting-image.action';
import { ChooseCoffeeProcess } from '../../../pour-over-form/components/coffee-origin-input/states/coffee-process.action';
import { takeUntil } from 'rxjs/operators';
import { SetProductionDate } from '../../../pour-over-form/components/coffee-origin-input/states/coffee-production-date.action';
import { CoffeeOriginStates } from '../../../pour-over-form/components/coffee-origin-input/states/combined.states';
import { SetManufacturerName } from 'src/app/pour-over-form/components/coffee-origin-input/states/coffee-manufacturer';

@Component({
  selector: 'app-edit-origin',
  templateUrl: './edit-origin.component.html',
})
export class EditOriginComponent implements OnInit, OnDestroy {
  @Input() extraParam: any;
  private ngUnsubscribe = new Subject();

  originId = null;
  roastingTypeRadio = null;
  processingTypeRadio = null;
  manufacturer = '';
  productionDate = null;

  constructor(private store: Store, private dateTimePickerService: DateTimePickerService) {}

  ngOnInit() {
    const state = this.store.selectSnapshot(CoffeeMetaDataState);

    // id update
    this.originId = this.extraParam.originId;
    this.store.dispatch(new SetMetaData(this.originId, state.brewId, state.settings));

    // roasting processing update
    this.roastingTypeRadio = this.extraParam.roastingType.type;
    this.store.dispatch(new SetRoastingImage(this.roastingTypeRadio));
    this.processingTypeRadio = this.extraParam.processingType;
    this.store.dispatch(new ChooseCoffeeProcess(this.processingTypeRadio));

    // manufacturer
    this.manufacturer = this.extraParam.manufacturer;
    this.store.dispatch(new SetManufacturerName(this.manufacturer, null));

    // production date update
    this.productionDate = this.extraParam.productionDate;
    this.dateTimePickerService.sendDateTime(this.productionDate);
    this.dateTimePickerService
      .getDateTime()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((x) => {
        this.productionDate = x;
        this.store.dispatch(new SetProductionDate(x));
      });
  }

  onChangeProcess(event: any) {
    this.store.dispatch(new ChooseCoffeeProcess(event.target.value));
  }

  onChangeRoastingImage(event: any) {
    this.store.dispatch(new SetRoastingImage(event.target.value));
  }

  onChangeManufacturer(value) {
    this.manufacturer = value;
    this.store.dispatch(new SetManufacturerName(value, null));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

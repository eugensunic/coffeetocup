import { EmptyStringPipe } from './pipes/empty-string.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { EditOriginComponent } from './components/edit-origin/edit-origin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { TimepickerBasicComponent } from './components/timepicker-basic/timepicker-basic.component';
import { NgbdModalComponent } from './components/ngbd-modal/ngbd-modal.component';
import { NgbdTooltipComponent } from './components/ngbd-tooltip/ngbd-tooltip.component';
import { NgbDateFRParserFormatter } from './services/ngb-date-fr-parser-formatter';
import { DateTimePickerService } from './services/date-time-picker.service';
import { ChartElementComponent } from 'src/app/shared/components/chart-element/chart-element.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SortObjectPipe } from './pipes/sort-object.pipe';
import { UserSearchBoxComponent } from './components/user-search-box/user-search-box.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { CoffeeHorizontalBarComponent } from './components/coffee-horizontal-bar/coffee-horizontal-bar.component';
import { NgbdRatingComponent } from './components/ngbd-rating-star/ngbd-rating.component';
// svg components
import { SvgBrewingDetailsComponent } from './components/svg-icons/svg-brewing-details/svg-brewing-details.component';
import { SvgDetailsComponent } from './components/svg-icons/svg-details/svg-details.component';
import { SvgBrewIconComponent } from './components/svg-icons/svg-brew-icon/svg-brew-icon.component';
import { SvgEditIconComponent } from './components/svg-icons/svg-edit-icon/svg-edit-icon.component';
import { SvgArchiveIconComponent } from './components/svg-icons/svg-archive-icon/svg-archive-icon.component';
import { SvgProfileBrewStatsComponent } from './components/svg-icons/svg-profile-brew-stats/svg-profile-brew-stats.component';
import { SvgProfileCoffeeStatsComponent } from './components/svg-icons/svg-profile-coffee-stats/svg-profile-coffee-stats.component';
import { SvgFlavorAndCommentsComponent } from './components/svg-icons/svg-flavor-and-comments/svg-flavor-and-comments.component';
import { SvgDeleteCoffeeIconComponent } from './components/svg-icons/svg-delete-coffee-icon/svg-delete-coffee-icon.component';
import { SvgFirstStepComponent } from './components/svg-icons/svg-coffee-steps/svg-first-step/svg-first-step.component';
import { SvgSecondStepComponent } from './components/svg-icons/svg-coffee-steps/svg-second-step/svg-second-step.component';
import { SvgThirdStepComponent } from './components/svg-icons/svg-coffee-steps/svg-third-step/svg-third-step.component';
import { SvgShowBrewingDetailsComponent } from './components/svg-icons/svg-show-brewing-details/svg-show-brewing-details.component';
import { SvgShowUsersComponent } from './components/svg-icons/svg-show-users/svg-show-users.component';
import { SvgShowCountriesComponent } from './components/svg-icons/svg-show-countries/svg-show-countries.component';
import { SvgFlavorAndCommentsUpComponent } from './components/svg-icons/svg-flavor-and-comments-up/svg-flavor-and-comments-up.component';
import { SvgBrewingDetailsUpComponent } from './components/svg-icons/svg-brewing-details-up/svg-brewing-details-up.component';
import { SvgHorizontalLineComponent } from './components/svg-icons/svg-horizontal-line/svg-horizontal-line.component';
import { SvgGuidelinesUpComponent } from './components/svg-icons/svg-guidelines-up/svg-guidelines-up.component';
import { SvgGuidelinesDownComponent } from './components/svg-icons/svg-guidelines-down/svg-guidelines-down.component';
import { SvgCheckAddCommentsUpComponent } from './components/svg-icons/svg-check-add-comments-up/svg-check-add-comments-up.component';
import { SvgCheckAddCommentsDownComponent } from './components/svg-icons/svg-check-add-comments-down/svg-check-add-comments-down.component';
import { SvgUploadImageComponent } from './components/svg-icons/svg-upload-image/svg-upload-image.component';
import { SvgChartIconComponent } from './components/svg-icons/svg-chart-icon/svg-chart-icon.component';
import { SvgFlavorsIconDownComponent } from './components/svg-icons/svg-flavors-icon-down/svg-flavors-icon-down.component';
import { SvgFlavorsIconUpComponent } from './components/svg-icons/svg-flavors-icon-up/svg-flavors-icon-up.component';
import { SvgFirstStepSmComponent } from './components/svg-icons/svg-coffee-steps/svg-first-step-sm/svg-first-step-sm.component';
import { SvgSecondStepSmComponent } from './components/svg-icons/svg-coffee-steps/svg-second-step-sm/svg-second-step-sm.component';
import { SvgThirdStepSmComponent } from './components/svg-icons/svg-coffee-steps/svg-third-step-sm/svg-third-step-sm.component';
import { SvgSortIconComponent } from './components/svg-icons/svg-sort-icon/svg-sort-icon.component';
import { SvgSortIconUpComponent } from './components/svg-icons/svg-sort-icon-up/svg-sort-icon-up.component';
import { SortingWrapperComponent } from './components/sorting-wrapper/sorting-wrapper.component';
import { SvgPlusIconComponent } from './components/svg-icons/svg-plus-icon/svg-plus-icon.component';
import { SvgFlavorAndCommentsReducedComponent } from './components/svg-icons/svg-flavor-and-comments-reduced/svg-flavor-and-comments-reduced.component';
import { SvgFlavorAndCommentsUpReducedComponent } from './components/svg-icons/svg-flavor-and-comments-up-reduced/svg-flavor-and-comments-up-reduced.component';
import { SvgShareIconComponent } from './components/svg-icons/svg-share-icon/svg-share-icon.component';
import { SvgBackToOriginListComponent } from './components/svg-icons/svg-back-to-origin-list/svg-back-to-origin-list.component';
import { SvgBackToBrewComponent } from './components/svg-icons/svg-back-to-brew/svg-back-to-brew.component';
import { SvgBackToUsersComponent } from './components/svg-icons/svg-back-to-users/svg-back-to-users.component';
import { SvgFruityFlavorComponent } from './components/svg-icons/svg-fruity-flavor/svg-fruity-flavor.component';
import { SvgNuttyFlavorComponent } from './components/svg-icons/svg-nutty-flavor/svg-nutty-flavor.component';
import { SvgChocoFlavorComponent } from './components/svg-icons/svg-choco-flavor/svg-choco-flavor.component';
import { SvgCaramelFlavorComponent } from './components/svg-icons/svg-caramel-flavor/svg-caramel-flavor.component';
import { SvgFloralFlavorComponent } from './components/svg-icons/svg-floral-flavor/svg-floral-flavor.component';
import { FilterCountriesPipe } from './pipes/filter-countries.pipe';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule, NgSelectModule],
  declarations: [
    EmptyStringPipe,
    SanitizeHtmlPipe,
    EditOriginComponent,
    DatePickerComponent,
    StepperComponent,
    TimepickerBasicComponent,
    NgbdModalComponent,
    NgbdTooltipComponent,
    NgbdRatingComponent,
    ChartElementComponent,
    SortObjectPipe,
    UserSearchBoxComponent,
    DataTableComponent,
    DataListComponent,
    CoffeeHorizontalBarComponent,
    SvgBrewingDetailsComponent,
    SvgDetailsComponent,
    SvgBrewIconComponent,
    SvgEditIconComponent,
    SvgArchiveIconComponent,
    SvgProfileBrewStatsComponent,
    SvgProfileCoffeeStatsComponent,
    SvgFlavorAndCommentsComponent,
    SvgDeleteCoffeeIconComponent,
    SvgFirstStepComponent,
    SvgSecondStepComponent,
    SvgThirdStepComponent,
    SvgShowBrewingDetailsComponent,
    SvgShowUsersComponent,
    SvgShowCountriesComponent,
    SvgFlavorAndCommentsUpComponent,
    SvgBrewingDetailsUpComponent,
    SvgHorizontalLineComponent,
    SvgGuidelinesUpComponent,
    SvgGuidelinesDownComponent,
    SvgCheckAddCommentsUpComponent,
    SvgCheckAddCommentsDownComponent,
    SvgUploadImageComponent,
    SvgChartIconComponent,
    SvgFlavorsIconDownComponent,
    SvgFlavorsIconUpComponent,
    SvgFirstStepSmComponent,
    SvgSecondStepSmComponent,
    SvgThirdStepSmComponent,
    SvgSortIconComponent,
    SvgSortIconUpComponent,
    SortingWrapperComponent,
    SvgPlusIconComponent,
    SvgFlavorAndCommentsReducedComponent,
    SvgFlavorAndCommentsUpReducedComponent,
    SvgShareIconComponent,
    SvgBackToOriginListComponent,
    SvgBackToBrewComponent,
    SvgBackToUsersComponent,
    SvgFruityFlavorComponent,
    SvgNuttyFlavorComponent,
    SvgChocoFlavorComponent,
    SvgCaramelFlavorComponent,
    SvgFloralFlavorComponent,
    FilterCountriesPipe,
  ],
  entryComponents: [NgbdModalComponent],
  providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }, DateTimePickerService],
  exports: [
    EmptyStringPipe,
    SanitizeHtmlPipe,
    EditOriginComponent,
    DatePickerComponent,
    StepperComponent,
    TimepickerBasicComponent,
    NgbdModalComponent,
    NgbdTooltipComponent,
    NgbdRatingComponent,
    ChartElementComponent,
    SortObjectPipe,
    UserSearchBoxComponent,
    DataTableComponent,
    DataListComponent,
    CoffeeHorizontalBarComponent,
    FilterCountriesPipe,
    SvgBrewingDetailsComponent,
    SvgDetailsComponent,
    SvgBrewIconComponent,
    SvgEditIconComponent,
    SvgArchiveIconComponent,
    SvgProfileBrewStatsComponent,
    SvgProfileCoffeeStatsComponent,
    SvgFlavorAndCommentsComponent,
    SvgDeleteCoffeeIconComponent,
    SvgFirstStepComponent,
    SvgSecondStepComponent,
    SvgThirdStepComponent,
    SvgShowBrewingDetailsComponent,
    SvgShowUsersComponent,
    SvgShowCountriesComponent,
    SvgFlavorAndCommentsUpComponent,
    SvgBrewingDetailsUpComponent,
    SvgHorizontalLineComponent,
    SvgGuidelinesUpComponent,
    SvgGuidelinesDownComponent,
    SvgCheckAddCommentsUpComponent,
    SvgCheckAddCommentsDownComponent,
    SvgUploadImageComponent,
    SvgChartIconComponent,
    SvgFlavorsIconDownComponent,
    SvgFlavorsIconUpComponent,
    SvgFirstStepSmComponent,
    SvgSecondStepSmComponent,
    SvgThirdStepSmComponent,
    SvgSortIconComponent,
    SvgSortIconUpComponent,
    SortingWrapperComponent,
    SvgPlusIconComponent,
    SvgFlavorAndCommentsReducedComponent,
    SvgFlavorAndCommentsUpReducedComponent,
    SvgShareIconComponent,
    SvgBackToOriginListComponent,
    SvgBackToBrewComponent,
    SvgBackToUsersComponent,
    SvgFruityFlavorComponent,
    SvgNuttyFlavorComponent,
    SvgChocoFlavorComponent,
    SvgCaramelFlavorComponent,
    SvgFloralFlavorComponent,
  ],
})
export class SharedModule {}

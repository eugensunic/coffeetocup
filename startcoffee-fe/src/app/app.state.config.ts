import { UserInfoState } from './states/user-info.action';
import { AppPageIdState } from './states/page-meta-data-action';
import { CountryNameState } from './pour-over-form/components/coffee-origin-input/states/country-name.action';
import { MatchElevationState } from './pour-over-form/components/coffee-origin-input/states/country-match-elevation.action';
import { CountryElevationState } from './pour-over-form/components/coffee-origin-input/states/country-elevation.action';
import { RoastingImageState } from './pour-over-form/components/coffee-origin-input/states/roasting-image.action';
import { CoffeeProcessState } from './pour-over-form/components/coffee-origin-input/states/coffee-process.action';
import { CoffeeManufacturerState } from './pour-over-form/components/coffee-origin-input/states/coffee-manufacturer';
import { CountryProductionDateState } from './pour-over-form/components/coffee-origin-input/states/coffee-production-date.action';
import { CoffeeBrewMethodState } from './pour-over-form/components/brewing-process-input/states/brew-method.action';
import { CoffeeBrewTimeState } from './pour-over-form/components/brewing-process-input/states/brewing-time.action';
import { CoffeeWaterRatioState } from './pour-over-form/components/brewing-process-input/states/coffee-water-ration.action';
import { CoffeeGrindingTypeState } from './pour-over-form/components/brewing-process-input/states/grind-type.action';
import { CoffeeMetaDataState } from './states/coffee-meta-data.action';
import { CoffeeAttributesState } from './pour-over-form/components/coffee-attributes-input/states/attributes.action';
import { CoffeeFlavourState } from './pour-over-form/components/coffee-attributes-input/states/flavour.action';
import { CoffeeExtractionState } from './pour-over-form/components/coffee-attributes-input/states/extraction.action';
import { CommentTextState } from './pour-over-form/states/comment-area.state';
import { AllCoffeesUsersState, AllCoffeesUsersStateBrew } from './coffees/states/coffees-data.action';
import { FiltratedUsersState } from './coffees/states/filtrated-users.action';
import { HeadingColorState } from './coffees/states/highlight-heading.action';
import { HeadingOverviewStatsState } from './user-profile/states/heading-overview-stats.action';
import { ProfileCoffeesDataState } from './user-profile/states/user-profile-data.action';

export const AppState = [
  CountryNameState,
  MatchElevationState,
  CountryElevationState,
  RoastingImageState,
  CoffeeProcessState,
  CoffeeManufacturerState,
  CountryProductionDateState,
  CoffeeBrewMethodState,
  CoffeeBrewTimeState,
  CoffeeWaterRatioState,
  CoffeeGrindingTypeState,
  CoffeeMetaDataState,
  CoffeeAttributesState,
  CoffeeFlavourState,
  CoffeeExtractionState,
  CommentTextState,
  UserInfoState,
  AllCoffeesUsersState,
  AllCoffeesUsersStateBrew,
  FiltratedUsersState,
  HeadingColorState,
  HeadingOverviewStatsState,
  ProfileCoffeesDataState,
  AppPageIdState
];

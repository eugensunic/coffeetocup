export const URL = {
  // user settings
  userData: '/api/user/data',
  settingsBasic: '/api/user/settings/basic',
  settingsProfileImage: '/api/user/settings/image',
  settingsDeleteProfileImage: '/api/user/settings/delete-image',
  settingsCheckCurrentPassword: '/api/user/settings/password/check',
  settingsChangePassword: '/api/user/settings/password/change',
  settingsDeleteAccount: '/api/user/settings/delete',
  apiUserSettings: '/api/user/settings',
  resetPassword: '/api/password/reset',

  // Pour over
  apiCoffeeOrigin: '/api/coffee/origin',
  apiCoffeeBrew: '/api/coffee/brew',
  apiCoffeeAttributes: '/api/coffee/attributes',

  apiCoffeeOriginResult: '/api/coffee/origin/result',
  apiCoffeeBrewResult: '/api/coffee/brew/result',
  apiCoffeeAttributesResult: '/api/coffee/attributes/result',

  // Profile
  apiCoffeeOriginUpdate: '/api/coffee/origin/update',
  apiBrewAttributesDelete: '/api/coffee/brewattributes/delete',
  apiCoffeeOriginDelete: '/api/coffee/origin/delete',
  apiCoffeeArchive: '/api/coffee/archive',
  apiUserProfileCoffee: '/api/coffee/profile/coffees',
  apiOtherUserProfileCoffee: '/api/coffee/profile/other/coffees',

  // Community
  apiCommunityUsers: '/api/users',

  apiCommunityGeneralCoffees: '/api/community/total/coffees/amount',
  apiCommunityGeneralBrews: '/api/community/total/brews/amount',
  apiCommunityGeneralAvgBrew: '/api/community/avg/coffeeperbrew',
  apiCommunityGeneralAvgWater: '/api/community/avg/waterperbrew',

  apiCommunityOriginCoffees: '/api/community/origin/totalcoffees/users',
  apiCommunityBrewCoffee: '/api/community/brew/totalbrews/users',

  apiCoffeesUsers: '/api/coffees/users',
  apiCoffeesUserData: '/api/coffees/alluserdata',

  // generate url
  apiGenerateUrl: 'api/generate/coffee/url',
  
};

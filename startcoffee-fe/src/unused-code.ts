// put take untilhere
// coffeeOriginDelete(coffeeOriginState) {
//   this.isDeleteMode = false;
//   this.coffeeSubmitService
//     .deleteCoffeeOriginData(URL.apiCoffeeOriginDelete, {
//       coffeeOriginId: coffeeOriginState._id
//     })
//     .subscribe(
//       x => {
//         
//         this.coffeeOriginJson = x;
//       },
//       err => 
//     );
// }

// coffeeOriginUse(coffeeOriginHtml) {
//   
//   this.coffeeSubmitService.notifyBrewResultComponent(true, coffeeOriginHtml);
//   this.router.navigate(['./brew'], { relativeTo: this.activatedRoute });
// }

// this.coffeeSubmitService.getEditModeStatus().subscribe((x: any) => {
//   this.isEditMode = true;
//   this.editModeValues = x;
//   
//   this.store.dispatch(new MatchElevation(Countries, x.state.country));
//   this.sendValuesToStore(x.country, x.elevation, x.roastingType, x.processType);
//   this.setFormValues(x.state.country, x.state.elevation, x.roastingType, x.processType);
//   // set values for .html radio buttons
//   this.roastingTypeRadio = x.roastingType;
//   this.processingTypeRadio = x.processType;
//   this.coffeeOriginTableId = x.id;
// });

// updateSelectedCoffee() {
//   this.submitted = true;
//   
//   if (this.isFormValid() && JSON.stringify(this.getFormValues()) !== JSON.stringify(this.editModeValues)) {
//     this.sendValuesToStore(
//       this.coffeeForm.controls.country.value,
//       this.coffeeForm.controls.elevation.value,
//       this.coffeeForm.controls.roasting.value,
//       this.coffeeForm.controls.process.value
//     );
//     this.coffeeSubmitService.sendUpdateConfirmation(true, this.coffeeOriginTableId);
//     this.resetForm();
//   } else {
//     
//   }
// }

// this.coffeeSubmitService
// .getUpdateConfirmation()
// .pipe(
//   mergeMap((x: any) => {
//     const coffeeOriginState = this.store.selectSnapshot(CoffeeOriginStates.inputForm);
//     return this.coffeeSubmitService.sendCoffeeOriginData(URL.apiCoffeeOriginUpdate, {
//       country: coffeeOriginState.country,
//       elevation: coffeeOriginState.elevation,
//       roastingType: coffeeOriginState.roastingType,
//       processingType: coffeeOriginState.processType,
//       productionDate: coffeeOriginState.productionDate,
//       formSubmitDate: new Date(Date.now()).toLocaleString(),
//       coffeeOriginId: x.coffeeOriginTableId
//     });
//   })
// )
// .subscribe(
//   x => {
//     this.coffeeOriginJson = x;
//   },
//   err => 
// );

// whichPageAreWeOn(pageId: string) {
//   
//   switch (pageId) {
//     case PageId.OriginPage:
//       this.originResult();
//       break;
//     case PageId.BrewPage:
//       this.brewResult();
//       break;
//     default:
//       this.attributesResult();
//       break;
//   }
// }


// CHARTS UNUSED

// getAvgTimePerGrind(coffeeJson) {
//   const grindType = [
//     'grinding-coarse',
//     'grinding-medium-coarse',
//     'grinding-medium',
//     'grinding-medium-fine',
//     'grinding-fine'
//   ];
//   const obj = coffeeJson
//     .map((x: any, index: number) => {
//       return x.coffeeBrew.reduce(
//         (acc, y) => {
//           if (y.grindType === 'grinding-coarse') {
//             acc.coarseCnt += timeToSeconds(y.brewTime);
//           }
//           if (y.grindType === 'grinding-medium-coarse') {
//             acc.mediumCoarseCnt += timeToSeconds(y.brewTime);
//           }
//           if (y.grindType === 'grinding-medium') {
//             acc.medium += timeToSeconds(y.brewTime);
//           }
//           if (y.grindType === 'grinding-medium-fine') {
//             acc.mediumFine += timeToSeconds(y.brewTime);
//           }
//           if (y.grindType === 'grinding-fine') {
//             acc.fine += timeToSeconds(y.brewTime);
//           }
//           return {
//             coarseCnt: acc.coarseCnt,
//             mediumCoarseCnt: acc.mediumCoarseCnt,
//             medium: acc.medium,
//             mediumFine: acc.mediumFine,
//             fine: acc.fine
//           };
//         },
//         { coarseCnt: 0, mediumCoarseCnt: 0, medium: 0, mediumFine: 0, fine: 0 }
//       );
//     })
//     .reduce(
//       (acc: any, x: any) => ({
//         coarseCnt: acc.coarseCnt + x.coarseCnt,
//         mediumCoarseCnt: acc.mediumCoarseCnt + x.mediumCoarseCnt,
//         medium: acc.medium + x.medium,
//         mediumFine: acc.mediumFine + x.mediumFine,
//         fine: acc.fine + x.fine
//       }),
//       {
//         coarseCnt: 0,
//         mediumCoarseCnt: 0,
//         medium: 0,
//         mediumFine: 0,
//         fine: 0
//       }
//     );

//   return Object.keys(obj).map(x => obj[x]);
// }

// getAvgRatioPerGrind(coffeeJson) {
//   const obj = coffeeJson
//     .map((x: any, index: number) => {
//       return x.coffeeBrew.reduce(
//         (acc, y) => {
//           if (y.grindType === 'grinding-coarse') {
//             acc.coarse.ratio += parseFloat(y.ratio.ratio);
//             acc.coarse.cnt += 1;
//           }
//           if (y.grindType === 'grinding-medium-coarse') {
//             acc.mediumCoarse.ratio += parseFloat(y.ratio.ratio);
//             acc.mediumCoarse.cnt += 1;
//           }
//           if (y.grindType === 'grinding-medium') {
//             acc.medium.ratio += parseFloat(y.ratio.ratio);
//             acc.medium.cnt += 1;
//           }
//           if (y.grindType === 'grinding-medium-fine') {
//             acc.mediumFine.ratio += parseFloat(y.ratio.ratio);
//             acc.mediumFine.cnt += 1;
//           }
//           if (y.grindType === 'grinding-fine') {
//             acc.fine.ratio += parseFloat(y.ratio.ratio);
//             acc.fine.cnt += 1;
//           }
//           return acc;
//         },
//         {
//           coarse: { ratio: 0, cnt: 0 },
//           mediumCoarse: { ratio: 0, cnt: 0 },
//           medium: { ratio: 0, cnt: 0 },
//           mediumFine: { ratio: 0, cnt: 0 },
//           fine: { ratio: 0, cnt: 0 }
//         }
//       );
//     })
//     .reduce(
//       (acc, x) => {
//         return {
//           coarse: { ratio: acc.coarse.ratio + x.coarse.ratio, cnt: acc.coarse.cnt + x.coarse.cnt },
//           mediumCoarse: {
//             ratio: acc.mediumCoarse.ratio + x.mediumCoarse.ratio,
//             cnt: acc.mediumCoarse.cnt + x.mediumCoarse.cnt
//           },
//           medium: {
//             ratio: acc.medium.ratio + x.medium.ratio,
//             cnt: acc.medium.cnt + x.medium.cnt
//           },
//           mediumFine: {
//             ratio: acc.mediumFine.ratio + x.mediumFine.ratio,
//             cnt: acc.mediumFine.cnt + x.mediumFine.cnt
//           },
//           fine: {
//             ratio: acc.fine.ratio + x.fine.ratio,
//             cnt: acc.fine.cnt + x.fine.cnt
//           }
//         };
//       },
//       {
//         coarse: { ratio: 0, cnt: 0 },
//         mediumCoarse: { ratio: 0, cnt: 0 },
//         medium: { ratio: 0, cnt: 0 },
//         mediumFine: { ratio: 0, cnt: 0 },
//         fine: { ratio: 0, cnt: 0 }
//       }
//     );
//   return [
//     obj.coarse.ratio / obj.coarse.cnt,
//     obj.mediumCoarse.ratio / obj.mediumCoarse.cnt,
//     obj.medium.ratio / obj.medium.cnt,
//     obj.mediumFine.ratio / obj.mediumFine.cnt,
//     obj.fine.ratio / obj.fine.cnt
//   ].map(x => (x ? x : 0));
// }

// getBrewMethodPerGrind(coffeeJson) {
//   const brewMethods = ['hario-ugo', 'chemex', 'khalita', 'bee-house'];
//   const obj = coffeeJson.map((x: any, index: number) => {
//     return x.coffeeBrew.reduce(
//       (acc, y) => {
//         if (y.brewMethod === 'hario-ugo') {
//           acc.hario += 1;
//         }
//         if (y.brewMethod === 'chemex') {
//           acc.chemex += 1;
//         }
//         if (y.brewMethod === 'khalita') {
//           acc.khalita += 1;
//         }
//         if (y.brewMethod === 'bee-house') {
//           acc.beeHouse += 1;
//         }
//         acc.grindType = y.grindType;
//         return acc;
//       },
//       {
//         grindType: '',
//         hario: 0,
//         chemex: 0,
//         khalita: 0,
//         beeHouse: 0
//       }
//     );
//   });

//   const grindType = [
//     { name: 'grinding-coarse', hario: 0, chemex: 0, khalita: 0, beeHouse: 0 },
//     { name: 'grinding-medium-coarse', hario: 0, chemex: 0, khalita: 0, beeHouse: 0 },
//     { name: 'grinding-medium', hario: 0, chemex: 0, khalita: 0, beeHouse: 0 },
//     { name: 'grinding-medium-fine', hario: 0, chemex: 0, khalita: 0, beeHouse: 0 },
//     { name: 'grinding-fine', hario: 0, chemex: 0, khalita: 0, beeHouse: 0 }
//   ];
//   for (let i = 0; i < obj.length; i++) {
//     for (let j = 0; j < grindType.length; j++) {
//       if (grindType[j].name === obj[i].grindType) {
//         grindType[j].hario += obj[i].hario;
//         grindType[j].chemex += obj[i].chemex;
//         grindType[j].khalita += obj[i].khalita;
//         grindType[j].beeHouse += obj[i].beeHouse;
//       }
//     }
//   }
//   return [
//     {
//       data: [grindType[0].hario, grindType[0].chemex, grindType[0].khalita, grindType[0].beeHouse]
//     },
//     {
//       data: [grindType[1].hario, grindType[1].chemex, grindType[1].khalita, grindType[1].beeHouse]
//     },
//     {
//       data: [grindType[2].hario, grindType[2].chemex, grindType[2].khalita, grindType[2].beeHouse]
//     },
//     {
//       data: [grindType[3].hario, grindType[3].chemex, grindType[3].khalita, grindType[3].beeHouse]
//     }
//   ];
// }

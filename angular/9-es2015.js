(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"8/VF":function(l,n,t){"use strict";t.r(n),t.d(n,"CommunityModuleNgFactory",(function(){return sl}));var e=t("8Y7J"),u=t("ds6q"),s=t("lJxs"),i=t("IheW");let o=(()=>{class l{constructor(l){this.http=l}getGeneralStats(l,n){return this.http.get(l,n)}getMostCoffeesStats(l,n){return this.http.get(l,n).pipe(Object(s.a)(l=>l.map(l=>Object.assign(Object.assign({},l),{location:this.parseLocation(l.location)}))))}getMostBrewsStats(l,n){return this.http.get(l,n).pipe(Object(s.a)(l=>l.map(l=>Object.assign(Object.assign({},l),{location:this.parseLocation(l.location)}))))}parseLocation(l){if(!l)return"";let[n,t]=l.split(",");return n=n.trim().indexOf("null")>-1?"":n,t=t.trim().indexOf("null")>-1?"":t,n.concat(t)}}return l.\u0275prov=e.cc({factory:function(){return new l(e.dc(i.c))},token:l,providedIn:"root"}),l})();var r=t("bb1m"),a=t("1G5W");class c{constructor(l){this.communityService=l,this.ngUnsubscribe=new u.Subject,this.showLoadingSpinner=!0}ngOnInit(){this.communityService.getMostCoffeesStats(r.a.apiCommunityOriginCoffees).pipe(Object(a.a)(this.ngUnsubscribe)).subscribe(l=>{this.showLoadingSpinner=!1,this.dataHtml=l})}ngOnDestroy(){this.ngUnsubscribe.next(),this.ngUnsubscribe.complete()}}var b=t("wbvY"),m=t("kBxj"),h=t("HC5s");class p{constructor(l,n){this.shared=l,this.router=n,this.htmlNavbarItems=[],this.htmlNavbarItemsSm=[]}ngOnInit(){this.shared.highlightNavHeading("community")}ngAfterViewInit(){this.htmlNavbarItems=[this.generalStatistics,this.mostCoffees,this.mostBrews],this.htmlNavbarItemsSm=[this.generalStatisticsSm,this.mostCoffeesSm,this.mostBrewsSm],this.applyBorderStyleToRoute(this.router.url),this.applyTextColorToRoute(this.router.url)}navigateToGeneralStatistics(){Object(h.h)(),this.shared.applyColorOnClick(this.htmlNavbarItems,m.h,null,null),this.shared.applyBorderBottomOnClick(this.htmlNavbarItemsSm,m.g,null,null),this.router.navigate(["/community"])}navigateToMostCoffeesAdded(){Object(h.h)(),this.shared.applyColorOnClick(this.htmlNavbarItems,null,m.h,null),this.shared.applyBorderBottomOnClick(this.htmlNavbarItemsSm,null,m.g,null),this.router.navigate(["/community/mostcoffees"])}navigateToMostBrewsAdded(){Object(h.h)(),this.shared.applyColorOnClick(this.htmlNavbarItems,null,null,m.h),this.shared.applyBorderBottomOnClick(this.htmlNavbarItemsSm,null,null,m.g),this.router.navigate(["/community/mostbrews"])}applyTextColorToRoute(l){const n=m.h;switch(l){case"/community/mostcoffees":this.mostCoffees.nativeElement.style.color=n,this.mostCoffees.nativeElement.style.fontWeight="bold";break;case"/community/mostbrews":this.mostBrews.nativeElement.style.color=n,this.mostBrews.nativeElement.style.fontWeight="bold";break;default:this.generalStatistics.nativeElement.style.color=n,this.generalStatistics.nativeElement.style.fontWeight="bold"}}applyBorderStyleToRoute(l){const n=m.g;switch(l){case"/community/mostcoffees":this.mostCoffeesSm.nativeElement.style.borderBottom=n;break;case"/community/mostbrews":this.mostBrewsSm.nativeElement.style.borderBottom=n;break;default:this.generalStatisticsSm.nativeElement.style.borderBottom=n}}}var d=t("XNiG");class f{constructor(l){this.communityService=l,this.ngUnsubscribe=new d.a,this.showLoadingSpinner=!0}ngOnInit(){this.communityService.getMostBrewsStats(r.a.apiCommunityBrewCoffee).pipe(Object(a.a)(this.ngUnsubscribe)).subscribe(l=>{this.showLoadingSpinner=!1,this.dataHtml=l})}ngOnDestroy(){this.ngUnsubscribe.next(),this.ngUnsubscribe.complete()}}var g=t("itXk");class v{constructor(l){this.communityService=l}ngOnInit(){Object(g.a)(this.communityService.getGeneralStats(r.a.apiCommunityGeneralCoffees),this.communityService.getGeneralStats(r.a.apiCommunityGeneralBrews),this.communityService.getGeneralStats(r.a.apiCommunityGeneralAvgBrew),this.communityService.getGeneralStats(r.a.apiCommunityGeneralAvgWater)).subscribe(([l,n,t,e])=>{this.totalCoffees=l,this.totalBrews=n,this.avgAmountCoffeesPerBrew=t[0].avg.toFixed(2),this.avgAmountCoffeesPerWater=e[0].avg.toFixed(2)})}}class y{}var w=t("pMnS"),S=t("9AJC"),C=t("DZkQ"),O=t("MJJn"),z=t("s7LF"),M=t("wTG2");class x{constructor(l,n,t){this.shared=l,this.http=n,this.router=t,this.users=[],this.usersHtml=[],this.styles={}}ngOnInit(){this.http.get(r.a.apiCommunityUsers).subscribe(l=>{this.users=l.users.map((l,n)=>({id:l._id,firstName:l.firstName,lastName:l.lastName,username:l.username?l.username:"Not defined"})),this.users=this.removeDuplicateObjects().filter(l=>"Not defined"!==l.username),this.usersHtml=this.users.map(l=>l.username?l.username:"")})}onUserChange(l){Object(h.h)(),this.shared.sendSearchUserSignal({search:!0}),this.router.navigate(["/profile/allcoffees"],{queryParams:{name:l,id:this.getUserId(l)}}).then(l=>this.shared.scrollToPageTopView())}getUserId(l){for(const n in this.users)if(this.users[n].username===l)return this.users[n].id;return null}addUsersPropertyIfNotExists(l){return l.hasOwnProperty("users")?l:{users:[...l]}}removeDuplicateObjects(){return this.users.filter((l,n)=>n===this.users.findIndex(n=>n.username===l.username))}}var T=t("iInd"),k=e.xb({encapsulation:2,styles:[],data:{}});function I(l){return e.bc(0,[(l()(),e.zb(0,0,null,null,15,"ng-select",[["bindLabel","name"],["class","user-search-box"],["placeholder","Search user"],["role","listbox"],["value",""]],[[2,"ng-select",null],[2,"ng-select-single",null],[2,"ng-select-typeahead",null],[2,"ng-select-multiple",null],[2,"ng-select-taggable",null],[2,"ng-select-searchable",null],[2,"ng-select-clearable",null],[2,"ng-select-opened",null],[2,"ng-select-disabled",null],[2,"ng-select-filtered",null]],[[null,"change"],[null,"keydown"]],(function(l,n,t){var u=!0,s=l.component;return"keydown"===n&&(u=!1!==e.Ob(l,3).handleKeyDown(t)&&u),"change"===n&&(u=!1!==s.onUserChange(t)&&u),u}),O.c,O.a)),e.Tb(5120,null,z.k,(function(l){return[l]}),[M.a]),e.Tb(4608,null,M.f,M.f,[]),e.yb(3,4964352,null,12,M.a,[[8,"user-search-box"],[8,null],M.b,M.d,e.m,e.i,M.j],{bindLabel:[0,"bindLabel"],placeholder:[1,"placeholder"],items:[2,"items"]},{changeEvent:"change"}),e.Ub(603979776,1,{optionTemplate:0}),e.Ub(603979776,2,{optgroupTemplate:0}),e.Ub(603979776,3,{labelTemplate:0}),e.Ub(603979776,4,{multiLabelTemplate:0}),e.Ub(603979776,5,{headerTemplate:0}),e.Ub(603979776,6,{footerTemplate:0}),e.Ub(603979776,7,{notFoundTemplate:0}),e.Ub(603979776,8,{typeToSearchTemplate:0}),e.Ub(603979776,9,{loadingTextTemplate:0}),e.Ub(603979776,10,{tagTemplate:0}),e.Ub(603979776,11,{loadingSpinnerTemplate:0}),e.Ub(603979776,12,{ngOptions:1})],(function(l,n){l(n,3,0,"name","Search user",n.component.usersHtml)}),(function(l,n){l(n,0,0,e.Ob(n,3).useDefaultClass,!e.Ob(n,3).multiple,e.Ob(n,3).typeahead,e.Ob(n,3).multiple,e.Ob(n,3).addTag,e.Ob(n,3).searchable,e.Ob(n,3).clearable,e.Ob(n,3).isOpen,e.Ob(n,3).disabled,e.Ob(n,3).filtered)}))}var U=e.xb({encapsulation:2,styles:[],data:{}});function Y(l){return e.bc(0,[e.Ub(671088640,1,{generalStatistics:0}),e.Ub(671088640,2,{mostCoffees:0}),e.Ub(671088640,3,{mostBrews:0}),e.Ub(671088640,4,{generalStatisticsSm:0}),e.Ub(671088640,5,{mostCoffeesSm:0}),e.Ub(671088640,6,{mostBrewsSm:0}),(l()(),e.zb(6,0,null,null,30,"div",[],null,null,null,null,null)),(l()(),e.zb(7,0,null,null,1,"h3",[["id","community-heading"]],null,null,null,null,null)),(l()(),e.Yb(-1,null,[" Community "])),(l()(),e.zb(9,0,null,null,3,"p",[["id","community-introduction-text"]],null,null,null,null,null)),(l()(),e.Yb(-1,null,[" Explore the CoffeeToCup community. Find your preferences and use them with your own recipe. Share your results with "])),(l()(),e.zb(11,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),e.Yb(-1,null,[" others and introduce yourself to the unique coffees and brewing recipes. "])),(l()(),e.zb(13,0,null,null,10,"div",[["class","community-links row d-none d-sm-flex"]],null,null,null,null,null)),(l()(),e.zb(14,0,null,null,6,"div",[["class","col-sm-6"]],null,null,null,null,null)),(l()(),e.zb(15,0,[[1,0],["generalStatistics",1]],null,1,"p",[["class","community-general-statistics"]],null,[[null,"click"]],(function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.navigateToGeneralStatistics()&&e),e}),null,null)),(l()(),e.Yb(-1,null,[" General statistics "])),(l()(),e.zb(17,0,[[2,0],["mostCoffees",1]],null,1,"p",[["class","community-most-coffees"]],null,[[null,"click"]],(function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.navigateToMostCoffeesAdded()&&e),e}),null,null)),(l()(),e.Yb(-1,null,[" Most coffees added "])),(l()(),e.zb(19,0,[[3,0],["mostBrews",1]],null,1,"p",[["class","community-most-brews"]],null,[[null,"click"]],(function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.navigateToMostBrewsAdded()&&e),e}),null,null)),(l()(),e.Yb(-1,null,[" Most brews added "])),(l()(),e.zb(21,0,null,null,2,"div",[["class","col-sm-6"]],null,null,null,null,null)),(l()(),e.zb(22,0,null,null,1,"app-user-search-box",[["class","community-user-search-box"]],null,null,null,I,k)),e.yb(23,114688,null,0,x,[b.a,i.c,T.k],null,null),(l()(),e.zb(24,0,null,null,10,"div",[["class","community-links row d-sm-none"]],null,null,null,null,null)),(l()(),e.zb(25,0,null,null,6,"div",[],null,null,null,null,null)),(l()(),e.zb(26,0,[[4,0],["generalStatisticsSm",1]],null,1,"p",[["class","community-general-statistics"]],null,[[null,"click"]],(function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.navigateToGeneralStatistics()&&e),e}),null,null)),(l()(),e.Yb(-1,null,[" General statistics "])),(l()(),e.zb(28,0,[[5,0],["mostCoffeesSm",1]],null,1,"p",[["class","community-most-coffees"]],null,[[null,"click"]],(function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.navigateToMostCoffeesAdded()&&e),e}),null,null)),(l()(),e.Yb(-1,null,[" Most coffees added "])),(l()(),e.zb(30,0,[[6,0],["mostBrewsSm",1]],null,1,"p",[["class","community-most-brews"]],null,[[null,"click"]],(function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.navigateToMostBrewsAdded()&&e),e}),null,null)),(l()(),e.Yb(-1,null,[" Most brews added "])),(l()(),e.zb(32,0,null,null,2,"div",[["class","m-3 w-100"]],null,null,null,null,null)),(l()(),e.zb(33,0,null,null,1,"app-user-search-box",[["class","community-user-search-box"]],null,null,null,I,k)),e.yb(34,114688,null,0,x,[b.a,i.c,T.k],null,null),(l()(),e.zb(35,16777216,null,null,1,"router-outlet",[],null,null,null,null,null)),e.yb(36,212992,null,0,T.n,[T.b,e.P,e.k,[8,null],e.i],null,null)],(function(l,n){l(n,23,0),l(n,34,0),l(n,36,0)}),null)}function j(l){return e.bc(0,[(l()(),e.zb(0,0,null,null,1,"app-community",[],null,null,null,Y,U)),e.yb(1,4308992,null,0,p,[b.a,T.k],null,null)],(function(l,n){l(n,1,0)}),null)}var B=e.vb("app-community",p,j,{},{},[]),N=e.xb({encapsulation:2,styles:[],data:{}});function E(l){return e.bc(0,[(l()(),e.zb(0,0,null,null,1,"h3",[["id","general-statistics-heading"]],null,null,null,null,null)),(l()(),e.Yb(-1,null,["General site statistics\n"])),(l()(),e.zb(2,0,null,null,0,"div",[["id","community-general-statistics-white-border"]],null,null,null,null,null)),(l()(),e.zb(3,0,null,null,1,"p",[["class","text-center"],["style","margin-bottom: 38px;margin-top: 54px;"]],null,null,null,null,null)),(l()(),e.Yb(-1,null,[" The values show information on coffees and brews added by all users.\n"])),(l()(),e.zb(5,0,null,null,16,"div",[["class","font-roboto"],["id","community-statistics-content"]],null,null,null,null,null)),(l()(),e.zb(6,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),e.Yb(-1,null,[" Total coffees: "])),(l()(),e.zb(8,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),e.Yb(9,null,["",""])),(l()(),e.zb(10,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),e.Yb(-1,null,[" Total brewings: "])),(l()(),e.zb(12,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),e.Yb(13,null,["",""])),(l()(),e.zb(14,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),e.Yb(-1,null,[" Average amount of coffees used per brew: "])),(l()(),e.zb(16,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),e.Yb(17,null,[" "," "])),(l()(),e.zb(18,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),e.Yb(-1,null,[" Average amount of water used per brew: "])),(l()(),e.zb(20,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),e.Yb(21,null,[" "," "]))],null,(function(l,n){var t=n.component;l(n,9,0,t.totalCoffees),l(n,13,0,t.totalBrews),l(n,17,0,t.avgAmountCoffeesPerBrew),l(n,21,0,t.avgAmountCoffeesPerWater)}))}function P(l){return e.bc(0,[(l()(),e.zb(0,0,null,null,1,"app-general-statistics",[],null,null,null,E,N)),e.yb(1,114688,null,0,v,[o],null,null)],(function(l,n){l(n,1,0)}),null)}var _=e.vb("app-general-statistics",v,P,{},{},[]);class L{transform(l,n){return l&&l.sort((l,t)=>l[n]<t[n]?1:l[n]>t[n]?-1:0),l}}var A=t("SVse");class G{constructor(l,n){this.router=l,this.shared=n}ngOnInit(){}navigateToUserProfile(l,n){l===Object(h.c)("auth").id?this.router.navigate(["/profile/allcoffees"]).then(l=>this.shared.scrollToPageTopView()):this.router.navigate(["/profile/allcoffees"],{queryParams:{name:n,id:l}}).then(l=>this.shared.scrollToPageTopView())}}var H=e.xb({encapsulation:2,styles:[],data:{}});function F(l){return e.bc(0,[(l()(),e.zb(0,0,null,null,9,null,null,null,null,null,null,null)),(l()(),e.zb(1,0,null,null,8,"tr",[],null,null,null,null,null)),(l()(),e.zb(2,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),e.Yb(3,null,["",""])),(l()(),e.zb(4,0,null,null,1,"td",[["class","username-value"]],null,[[null,"click"]],(function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.navigateToUserProfile(l.context.$implicit.id,l.context.$implicit.username)&&e),e}),null,null)),(l()(),e.Yb(5,null,[" "," "])),(l()(),e.zb(6,0,null,null,1,"td",[["class",""]],null,null,null,null,null)),(l()(),e.Yb(7,null,["",""])),(l()(),e.zb(8,0,null,null,1,"td",[["class",""]],null,null,null,null,null)),(l()(),e.Yb(9,null,["",""]))],null,(function(l,n){var t=n.component;l(n,3,0,n.context.index+1),l(n,5,0,n.context.$implicit.username?n.context.$implicit.username:"Not defined"),l(n,7,0,n.context.$implicit.location?n.context.$implicit.location:"Unknown"),l(n,9,0,n.context.$implicit[t.sortCriteria])}))}function $(l){return e.bc(0,[(l()(),e.zb(0,0,null,null,16,null,null,null,null,null,null,null)),(l()(),e.zb(1,0,null,null,15,"li",[["class","list-group-item disabled item-card"]],null,null,null,null,null)),(l()(),e.zb(2,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),e.Yb(3,null,["","."])),(l()(),e.zb(4,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),e.zb(5,0,null,null,1,"span",[["class","font-weight-bold"]],null,null,null,null,null)),(l()(),e.Yb(-1,null,["Username: "])),(l()(),e.zb(7,0,null,null,1,"span",[["class","username-value"]],null,[[null,"click"]],(function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.navigateToUserProfile(l.context.$implicit.id,l.context.$implicit.username)&&e),e}),null,null)),(l()(),e.Yb(8,null,[" "," "])),(l()(),e.zb(9,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),e.zb(10,0,null,null,1,"span",[["class","font-weight-bold"]],null,null,null,null,null)),(l()(),e.Yb(-1,null,["Location:"])),(l()(),e.Yb(12,null,[" "," "])),(l()(),e.zb(13,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),e.zb(14,0,null,null,1,"span",[["class","font-weight-bold"]],null,null,null,null,null)),(l()(),e.Yb(15,null,["",":"])),(l()(),e.Yb(16,null,[" "," "]))],null,(function(l,n){var t=n.component;l(n,3,0,n.context.index+1),l(n,8,0,n.context.$implicit.username?n.context.$implicit.username:"Not defined"),l(n,12,0,n.context.$implicit.location?n.context.$implicit.location:"Unknown"),l(n,15,0,t.mainColumnName),l(n,16,0,n.context.$implicit[t.sortCriteria])}))}function D(l){return e.bc(0,[(l()(),e.zb(0,0,null,null,0,"div",[["class","loader"]],[[8,"id",0]],null,null,null,null))],null,(function(l,n){l(n,0,0,n.component.spinnerId)}))}function W(l){return e.bc(0,[e.Qb(0,L,[]),(l()(),e.zb(1,0,null,null,17,"div",[["class","d-none d-md-flex row justify-content-center align-items-center"]],null,null,null,null,null)),(l()(),e.zb(2,0,null,null,1,"h4",[],[[8,"id",0]],null,null,null,null)),(l()(),e.Yb(3,null,["",""])),(l()(),e.zb(4,0,null,null,14,"table",[["class","table"]],[[8,"id",0]],null,null,null,null)),(l()(),e.zb(5,0,null,null,9,"thead",[],null,null,null,null,null)),(l()(),e.zb(6,0,null,null,8,"tr",[],null,null,null,null,null)),(l()(),e.zb(7,0,null,null,1,"th",[["style","width: 10px;"]],null,null,null,null,null)),(l()(),e.Yb(-1,null,["#"])),(l()(),e.zb(9,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e.Yb(-1,null,["Username"])),(l()(),e.zb(11,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e.Yb(-1,null,["Location"])),(l()(),e.zb(13,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),e.Yb(14,null,["",""])),(l()(),e.zb(15,0,null,null,3,"tbody",[],null,null,null,null,null)),(l()(),e.ib(16777216,null,null,2,null,F)),e.yb(17,278528,null,0,A.k,[e.P,e.M,e.t],{ngForOf:[0,"ngForOf"]},null),e.Sb(18,2),(l()(),e.zb(19,0,null,null,6,"div",[["class","d-md-none"]],null,null,null,null,null)),(l()(),e.zb(20,0,null,null,5,"ul",[["class","list-group font-roboto"]],null,null,null,null,null)),(l()(),e.zb(21,0,null,null,1,"h3",[["class","text-center"]],[[8,"id",0]],null,null,null,null)),(l()(),e.Yb(22,null,["",""])),(l()(),e.ib(16777216,null,null,2,null,$)),e.yb(24,278528,null,0,A.k,[e.P,e.M,e.t],{ngForOf:[0,"ngForOf"]},null),e.Sb(25,2),(l()(),e.ib(16777216,null,null,1,null,D)),e.yb(27,16384,null,0,A.l,[e.P,e.M],{ngIf:[0,"ngIf"]},null)],(function(l,n){var t=n.component,u=e.Zb(n,17,0,l(n,18,0,e.Ob(n,0),t.dataHtml,t.sortCriteria));l(n,17,0,u);var s=e.Zb(n,24,0,l(n,25,0,e.Ob(n,0),t.dataHtml,t.sortCriteria));l(n,24,0,s),l(n,27,0,t.showLoadingSpinner)}),(function(l,n){var t=n.component;l(n,2,0,t.titleId),l(n,3,0,t.title),l(n,4,0,t.tableId),l(n,14,0,t.mainColumnName),l(n,21,0,t.titleId),l(n,22,0,t.title)}))}var J=e.xb({encapsulation:2,styles:[],data:{}});function V(l){return e.bc(0,[(l()(),e.zb(0,0,null,null,1,"app-community-coffee-list",[["mainColumnName","Total Coffees"],["sortCriteria","coffeeorigins"],["spinnerId","spinner-community-most-coffees"],["tableId","community-coffees-table"],["title","Most Coffees added"],["titleId","most-coffees-heading"]],null,null,null,W,H)),e.yb(1,114688,null,0,G,[T.k,b.a],{titleId:[0,"titleId"],title:[1,"title"],tableId:[2,"tableId"],spinnerId:[3,"spinnerId"],mainColumnName:[4,"mainColumnName"],sortCriteria:[5,"sortCriteria"],dataHtml:[6,"dataHtml"],showLoadingSpinner:[7,"showLoadingSpinner"]},null)],(function(l,n){var t=n.component;l(n,1,0,"most-coffees-heading","Most Coffees added","community-coffees-table","spinner-community-most-coffees","Total Coffees","coffeeorigins",t.dataHtml,t.showLoadingSpinner)}),null)}function q(l){return e.bc(0,[(l()(),e.zb(0,0,null,null,1,"app-most-coffees-added",[],null,null,null,V,J)),e.yb(1,245760,null,0,c,[o],null,null)],(function(l,n){l(n,1,0)}),null)}var Q=e.vb("app-most-coffees-added",c,q,{},{},[]),Z=e.xb({encapsulation:2,styles:[],data:{}});function K(l){return e.bc(0,[(l()(),e.zb(0,0,null,null,1,"app-community-coffee-list",[["mainColumnName","Total Brews"],["sortCriteria","coffeebrews"],["spinnerId","spinner-community-most-brews"],["tableId","community-brews-table"],["title","Most Brews added"],["titleId","most-brews-heading"]],null,null,null,W,H)),e.yb(1,114688,null,0,G,[T.k,b.a],{titleId:[0,"titleId"],title:[1,"title"],tableId:[2,"tableId"],spinnerId:[3,"spinnerId"],mainColumnName:[4,"mainColumnName"],sortCriteria:[5,"sortCriteria"],dataHtml:[6,"dataHtml"],showLoadingSpinner:[7,"showLoadingSpinner"]},null)],(function(l,n){var t=n.component;l(n,1,0,"most-brews-heading","Most Brews added","community-brews-table","spinner-community-most-brews","Total Brews","coffeebrews",t.dataHtml,t.showLoadingSpinner)}),null)}function R(l){return e.bc(0,[(l()(),e.zb(0,0,null,null,1,"app-most-brews-added",[],null,null,null,K,Z)),e.yb(1,245760,null,0,f,[o],null,null)],(function(l,n){l(n,1,0)}),null)}var X=e.vb("app-most-brews-added",f,R,{},{},[]),ll=t("G0yt"),nl=t("nGDP"),tl=t("85+Z"),el=t("K58w"),ul=t("PCNd"),sl=e.wb(y,[],(function(l){return e.Lb([e.Mb(512,e.k,e.Z,[[8,[w.a,S.a,S.b,S.h,S.i,S.e,S.f,S.g,C.a,B,_,Q,X]],[3,e.k],e.y]),e.Mb(4608,A.n,A.m,[e.v]),e.Mb(4608,z.w,z.w,[]),e.Mb(4608,z.e,z.e,[]),e.Mb(4608,ll.z,ll.z,[e.k,e.s,ll.pb,ll.A]),e.Mb(4608,ll.o,nl.a,[]),e.Mb(4608,tl.a,tl.a,[]),e.Mb(4608,el.a,el.a,[i.c]),e.Mb(1073742336,A.c,A.c,[]),e.Mb(1073742336,T.m,T.m,[[2,T.r],[2,T.k]]),e.Mb(1073742336,z.v,z.v,[]),e.Mb(1073742336,z.h,z.h,[]),e.Mb(1073742336,z.t,z.t,[]),e.Mb(1073742336,ll.c,ll.c,[]),e.Mb(1073742336,ll.g,ll.g,[]),e.Mb(1073742336,ll.h,ll.h,[]),e.Mb(1073742336,ll.l,ll.l,[]),e.Mb(1073742336,ll.m,ll.m,[]),e.Mb(1073742336,ll.t,ll.t,[]),e.Mb(1073742336,ll.v,ll.v,[]),e.Mb(1073742336,ll.B,ll.B,[]),e.Mb(1073742336,ll.D,ll.D,[]),e.Mb(1073742336,ll.H,ll.H,[]),e.Mb(1073742336,ll.K,ll.K,[]),e.Mb(1073742336,ll.N,ll.N,[]),e.Mb(1073742336,ll.Q,ll.Q,[]),e.Mb(1073742336,ll.Y,ll.Y,[]),e.Mb(1073742336,ll.bb,ll.bb,[]),e.Mb(1073742336,ll.eb,ll.eb,[]),e.Mb(1073742336,ll.fb,ll.fb,[]),e.Mb(1073742336,ll.T,ll.T,[]),e.Mb(1073742336,ll.C,ll.C,[]),e.Mb(1073742336,M.c,M.c,[]),e.Mb(1073742336,ul.a,ul.a,[]),e.Mb(1073742336,y,y,[]),e.Mb(256,M.d,M.e,[]),e.Mb(1024,T.i,(function(){return[[{path:"",component:p,children:[{path:"",component:v},{path:"mostcoffees",component:c},{path:"mostbrews",component:f}]}]]}),[])])}))},FiyT:function(l,n,t){"use strict";var e=this&&this.__extends||function(){var l=function(n,t){return(l=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(l,n){l.__proto__=n}||function(l,n){for(var t in n)n.hasOwnProperty(t)&&(l[t]=n[t])})(n,t)};return function(n,t){function e(){this.constructor=n}l(n,t),n.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e)}}();n.SubjectSubscription=function(l){function n(n,t){var e=l.call(this)||this;return e.subject=n,e.subscriber=t,e.closed=!1,e}return e(n,l),n.prototype.unsubscribe=function(){if(!this.closed){this.closed=!0;var l=this.subject,n=l.observers;if(this.subject=null,n&&0!==n.length&&!l.isStopped&&!l.closed){var t=n.indexOf(this.subscriber);-1!==t&&n.splice(t,1)}}},n}(t("zB/H").Subscription)},Mxlh:function(l,n,t){"use strict";n.ObjectUnsubscribedError=function(){function l(){return Error.call(this),this.message="object unsubscribed",this.name="ObjectUnsubscribedError",this}return l.prototype=Object.create(Error.prototype),l}()},ds6q:function(l,n,t){"use strict";var e=this&&this.__extends||function(){var l=function(n,t){return(l=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(l,n){l.__proto__=n}||function(l,n){for(var t in n)n.hasOwnProperty(t)&&(l[t]=n[t])})(n,t)};return function(n,t){function e(){this.constructor=n}l(n,t),n.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e)}}(),u=t("Q1FS"),s=t("FWf1"),i=t("zB/H"),o=t("Mxlh"),r=t("FiyT"),a=t("p//D"),c=function(l){function n(n){var t=l.call(this,n)||this;return t.destination=n,t}return e(n,l),n}(s.Subscriber);n.SubjectSubscriber=c;var b=function(l){function n(){var n=l.call(this)||this;return n.observers=[],n.closed=!1,n.isStopped=!1,n.hasError=!1,n.thrownError=null,n}return e(n,l),n.prototype[a.rxSubscriber]=function(){return new c(this)},n.prototype.lift=function(l){var n=new m(this,this);return n.operator=l,n},n.prototype.next=function(l){if(this.closed)throw new o.ObjectUnsubscribedError;if(!this.isStopped)for(var n=this.observers,t=n.length,e=n.slice(),u=0;u<t;u++)e[u].next(l)},n.prototype.error=function(l){if(this.closed)throw new o.ObjectUnsubscribedError;this.hasError=!0,this.thrownError=l,this.isStopped=!0;for(var n=this.observers,t=n.length,e=n.slice(),u=0;u<t;u++)e[u].error(l);this.observers.length=0},n.prototype.complete=function(){if(this.closed)throw new o.ObjectUnsubscribedError;this.isStopped=!0;for(var l=this.observers,n=l.length,t=l.slice(),e=0;e<n;e++)t[e].complete();this.observers.length=0},n.prototype.unsubscribe=function(){this.isStopped=!0,this.closed=!0,this.observers=null},n.prototype._trySubscribe=function(n){if(this.closed)throw new o.ObjectUnsubscribedError;return l.prototype._trySubscribe.call(this,n)},n.prototype._subscribe=function(l){if(this.closed)throw new o.ObjectUnsubscribedError;return this.hasError?(l.error(this.thrownError),i.Subscription.EMPTY):this.isStopped?(l.complete(),i.Subscription.EMPTY):(this.observers.push(l),new r.SubjectSubscription(this,l))},n.prototype.asObservable=function(){var l=new u.Observable;return l.source=this,l},n.create=function(l,n){return new m(l,n)},n}(u.Observable);n.Subject=b;var m=function(l){function n(n,t){var e=l.call(this)||this;return e.destination=n,e.source=t,e}return e(n,l),n.prototype.next=function(l){var n=this.destination;n&&n.next&&n.next(l)},n.prototype.error=function(l){var n=this.destination;n&&n.error&&this.destination.error(l)},n.prototype.complete=function(){var l=this.destination;l&&l.complete&&this.destination.complete()},n.prototype._subscribe=function(l){return this.source?this.source.subscribe(l):i.Subscription.EMPTY},n}(b);n.AnonymousSubject=m}}]);
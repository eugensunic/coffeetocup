function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,n){for(var l=0;l<n.length;l++){var t=n[l];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function _createClass(e,n,l){return n&&_defineProperties(e.prototype,n),l&&_defineProperties(e,l),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"4Dbb":function(e,n,l){"use strict";l.r(n),l.d(n,"CoffeeArchiveModuleNgFactory",(function(){return G}));var t=l("8Y7J"),o=l("5GA+"),i=l("XNiG"),u=l("1G5W"),s=l("bb1m"),a=l("fDud"),r=l("BvLE"),c=function(){function e(n,l,t){_classCallCheck(this,e),this.userProfileService=n,this.statistics=l,this.modalService=t,this.ngUnsubscribe=new i.a,this.showAttributesNums=[],this.showBrewsNums=[],this.showBasicTable=!0,this.showActionPartSmDefault=[],this.avgPerOrigin=[],this.submitDates=[],this.showLoadingSpinner=!0}return _createClass(e,[{key:"ngOnInit",value:function(){var e=this;this.userProfileService.getUserProfileData(s.a.apiCoffeeArchive).pipe(Object(u.a)(this.ngUnsubscribe)).subscribe((function(n){e.showLoadingSpinner=!1,e.avgPerOrigin=e.statistics.getAvgOverallPerOrigin(n),e.submitDates=e.statistics.getSubmitDate(n),e.showActionPartSmDefault=Array.from(Array(n.length),(function(e,n){return-1})),e.showBrewsNums=Array.from(Array(n.length),(function(e,n){return-1})),e.showAttributesNums=n.map((function(e){return e.coffeeAttributes.map((function(e){return-1}))})),e.coffeeJson=n.map((function(n,l){return Object.assign(Object.assign({},n),{roastingType:{type:n.roastingType,index:e.getRoastingIndex(n.roastingType)},avgRating:e.avgPerOrigin[l],formSubmitDate:e.submitDates[l],coffeeAttributes:n.coffeeAttributes.map((function(e){return Object.assign({},e)}))})}))}),(function(e){}))}},{key:"deleteCoffeeOrigin",value:function(e){var n=this,l=this.modalService.open(r.a);l.componentInstance.name="Delete Coffee permanently",l.componentInstance.content="\n    Your coffee will be deleted permanently from this app.\n    Are you sure you want to delete your coffee?\n    ",l.componentInstance.rightButtonName="Delete",l.componentInstance.onConfirm=function(){n.userProfileService.deleteCoffeeEntireOriginData(s.a.apiCoffeeOriginDelete,{originId:e._id}).pipe(Object(u.a)(n.ngUnsubscribe)).subscribe((function(l){return n.coffeeJson=n.coffeeJson.filter((function(n){return n._id!==e._id}))}))}}},{key:"openModalCommentSection",value:function(e,n,l){var t=this.modalService.open(r.a);t.componentInstance.showEditOrigin=!1,t.componentInstance.name="Comments",t.componentInstance.content=e+", "+n+", <p></p><strong>Comment:</strong><p></p> "+l.commentText,t.componentInstance.rightButtonName="Close",t.componentInstance.onConfirm=function(){}}},{key:"getRoastingIndex",value:function(e){var n=0;switch(e){case"light":n=1;break;case"medium":n=2;break;case"dark":n=3;break;default:n=-1}return n}},{key:"ngOnDestroy",value:function(){this.ngUnsubscribe.next(),this.ngUnsubscribe.complete()}}]),e}(),f=function e(){_classCallCheck(this,e)},b=l("9AJC"),h=l("DZkQ"),m=l("pMnS"),p=l("Sxp8"),g=l("lkLn"),w=l("wbvY"),d=l("G0yt"),v=l("iInd"),M=l("e1JD"),y=l("TGvP"),C=l("SNN1"),A=l("SVse"),S=t.xb({encapsulation:2,styles:[],data:{}});function D(e){return t.bc(0,[(e()(),t.zb(0,0,null,null,6,null,null,null,null,null,null,null)),(e()(),t.zb(1,0,null,null,2,"div",[["class","d-none d-md-flex"]],null,null,null,null,null)),(e()(),t.zb(2,0,null,null,1,"app-data-table",[],null,null,null,p.b,p.a)),t.yb(3,114688,null,0,g.a,[w.a,o.a,d.z,t.g,a.a,v.k,M.i,t.i],{isArchivePage:[0,"isArchivePage"],hideSharedIcon:[1,"hideSharedIcon"],deleteCoffeeOrigin:[2,"deleteCoffeeOrigin"],showComments:[3,"showComments"],showTable:[4,"showTable"],showActionSection:[5,"showActionSection"],showDeleteCoffeeOrigin:[6,"showDeleteCoffeeOrigin"],showBrewsNums:[7,"showBrewsNums"],showAttributesNums:[8,"showAttributesNums"],coffeeJson:[9,"coffeeJson"]},null),(e()(),t.zb(4,0,null,null,2,"div",[["class","d-md-none"]],null,null,null,null,null)),(e()(),t.zb(5,0,null,null,1,"app-data-list",[],null,null,null,y.b,y.a)),t.yb(6,4308992,null,0,C.a,[w.a,o.a,d.z,t.g,a.a,M.i],{hideSharedIcon:[0,"hideSharedIcon"],deleteCoffeeOrigin:[1,"deleteCoffeeOrigin"],showComments:[2,"showComments"],showButtonSection:[3,"showButtonSection"],showActionPartSmDefault:[4,"showActionPartSmDefault"],showTable:[5,"showTable"],showActionSection:[6,"showActionSection"],showDeleteCoffeeOrigin:[7,"showDeleteCoffeeOrigin"],showBrewsNums:[8,"showBrewsNums"],showAttributesNums:[9,"showAttributesNums"],coffeeJson:[10,"coffeeJson"]},null)],(function(e,n){var l=n.component;e(n,3,0,!0,!0,l.deleteCoffeeOrigin.bind(l),l.openModalCommentSection.bind(l),l.showBasicTable,!1,!0,l.showBrewsNums,l.showAttributesNums,l.coffeeJson),e(n,6,1,[!0,l.deleteCoffeeOrigin.bind(l),l.openModalCommentSection.bind(l),!0,l.showActionPartSmDefault,l.showBasicTable,!1,!0,l.showBrewsNums,l.showAttributesNums,l.coffeeJson])}),null)}function O(e){return t.bc(0,[(e()(),t.zb(0,0,null,null,4,null,null,null,null,null,null,null)),(e()(),t.zb(1,0,null,null,1,"p",[["class","font-roboto text-center"]],null,null,null,null,null)),(e()(),t.Yb(-1,null,["No matching items! "])),(e()(),t.zb(3,0,null,null,1,"p",[["class","text-center font-roboto "]],null,null,null,null,null)),(e()(),t.Yb(-1,null,[' The list of archived coffees will appear here. From here you can completely delete your coffee from the app using "Delete" button which will be located at this page once an entry appears. If you delete it, coffee will be removed permanently and will not be visible in the community section nor coffees. ']))],null,null)}function I(e){return t.bc(0,[(e()(),t.zb(0,0,null,null,0,"div",[["class","loader"],["id","spinner-coffee-archive"]],null,null,null,null,null))],null,null)}function N(e){return t.bc(0,[(e()(),t.zb(0,0,null,null,1,"h3",[["class","font-lato text-center main-heading"],["style","margin-bottom:50px;margin-top: 23px;"]],null,null,null,null,null)),(e()(),t.Yb(-1,null,["Archive page"])),(e()(),t.ib(16777216,null,null,1,null,D)),t.yb(3,16384,null,0,A.l,[t.P,t.M],{ngIf:[0,"ngIf"]},null),(e()(),t.ib(16777216,null,null,1,null,O)),t.yb(5,16384,null,0,A.l,[t.P,t.M],{ngIf:[0,"ngIf"]},null),(e()(),t.ib(16777216,null,null,1,null,I)),t.yb(7,16384,null,0,A.l,[t.P,t.M],{ngIf:[0,"ngIf"]},null)],(function(e,n){var l=n.component;e(n,3,0,l.coffeeJson&&0!==l.coffeeJson.length),e(n,5,0,l.coffeeJson&&0===l.coffeeJson.length),e(n,7,0,l.showLoadingSpinner)}),null)}var P=t.vb("app-coffee-archive",c,(function(e){return t.bc(0,[(e()(),t.zb(0,0,null,null,1,"app-coffee-archive",[],null,null,null,N,S)),t.yb(1,245760,null,0,c,[o.a,a.a,d.z],null,null)],(function(e,n){e(n,1,0)}),null)}),{},{},[]),k=l("s7LF"),B=l("o9ZX"),J=l("nGDP"),T=l("85+Z"),z=l("IheW"),x=l("t/uR"),_=l("wTG2"),Y=l("PCNd"),G=t.wb(f,[],(function(e){return t.Lb([t.Mb(512,t.k,t.Z,[[8,[b.a,b.b,b.h,b.i,b.e,b.f,b.g,h.a,m.a,P]],[3,t.k],t.y]),t.Mb(4608,A.n,A.m,[t.v]),t.Mb(4608,k.w,k.w,[]),t.Mb(4608,k.e,k.e,[]),t.Mb(4608,B.a,B.a,[]),t.Mb(4608,d.z,d.z,[t.k,t.s,d.pb,d.A]),t.Mb(4608,d.o,J.a,[]),t.Mb(4608,T.a,T.a,[]),t.Mb(4608,o.a,o.a,[z.c]),t.Mb(1073742336,A.c,A.c,[]),t.Mb(1073742336,k.v,k.v,[]),t.Mb(1073742336,k.h,k.h,[]),t.Mb(1073742336,k.t,k.t,[]),t.Mb(1073742336,x.a,x.a,[]),t.Mb(1073742336,_.c,_.c,[]),t.Mb(1073742336,d.c,d.c,[]),t.Mb(1073742336,d.g,d.g,[]),t.Mb(1073742336,d.h,d.h,[]),t.Mb(1073742336,d.l,d.l,[]),t.Mb(1073742336,d.m,d.m,[]),t.Mb(1073742336,d.t,d.t,[]),t.Mb(1073742336,d.v,d.v,[]),t.Mb(1073742336,d.B,d.B,[]),t.Mb(1073742336,d.D,d.D,[]),t.Mb(1073742336,d.H,d.H,[]),t.Mb(1073742336,d.K,d.K,[]),t.Mb(1073742336,d.N,d.N,[]),t.Mb(1073742336,d.Q,d.Q,[]),t.Mb(1073742336,d.Y,d.Y,[]),t.Mb(1073742336,d.bb,d.bb,[]),t.Mb(1073742336,d.eb,d.eb,[]),t.Mb(1073742336,d.fb,d.fb,[]),t.Mb(1073742336,d.T,d.T,[]),t.Mb(1073742336,d.C,d.C,[]),t.Mb(1073742336,Y.a,Y.a,[]),t.Mb(1073742336,v.m,v.m,[[2,v.r],[2,v.k]]),t.Mb(1073742336,f,f,[]),t.Mb(256,_.d,_.e,[]),t.Mb(1024,v.i,(function(){return[[{path:"",component:c}]]}),[])])}))}}]);
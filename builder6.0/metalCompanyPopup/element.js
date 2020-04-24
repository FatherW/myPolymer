var app = angular.module('demoApp');
var states={
  value: [],
  display:[]
};
app.controller('DemoCtrl', DemoCtrl);
app.directive('metalCompanyPopup', function ($compile, $templateRequest, $mdDialog, $dazzlePopup,$q,$log,$timeout,$http,$dazzleUser) {
    var name = 'metalCompanyPopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/metalCompanyPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "metalCompanyPopup";
            scope.type = "metalCompanyPopup";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
                // $http({
                //     "method": "post",
                //     "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                //     "data":{
                //         "action": "searchData",
                //         "index": "5metal.dazzle.website",
                //         "type": "company",
                //         "body": {
                //             "_source" : ["title"],
                //             "query":{
                //                 "match_all":{
                //                 }
                //             }
                //         }
                //     }
                // }).then(function (result) {
                //     console.log(result);
                //     if (result.data.code < 0) {
                //         resolve([{ value: [], display: []}]);
                //     } else {
                //         console.log('Result',result.data.resolve);
                //         var companys =[];
                //         angular.forEach(result.data.resolve,function(item,index){
                //             companys.push(item['title']);                            
                        
                //         });
                        
                //         states ={
                //             value: companys,
                //             display: companys
                //         };
                //     }
                // });
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
                // console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');

             
//                $scope.images = JSON.parse(angular.toJson(images)) || [];

                $scope.pageJson=$dazzleUser.getDazzleInfo('pageJson');
                $scope.thisPageJson=$dazzleUser.getDazzleInfo('thisPageJson');
                $scope.userBucket=$dazzleUser.getDazzleInfo('userBucket');
                $scope.exportBucket=$dazzleUser.getDazzleInfo('exportBucket');
            
                $scope.select = function() {
                    
                    var selectedItem= $dazzleUser.dazzleInfo['selectedItem'];
                    console.log('Selected Item',selectedItem);
                    $mdDialog.hide(selectedItem);
                }
                        // Hello
//                 $scope.simulateQuery = false;
//                 $scope.isDisabled    = false;
            
//                 // list of `state` value/display objects
//                 $scope.states        = loadAll();
//                 console.log('States',$scope.states);
// //                $scope.querySearch   = querySearch;
// //                self.selectedItemChange = selectedItemChange;
// //                self.searchTextChange   = searchTextChange;
            
// //                self.newState = newState;
            
//                 $scope.newState =function(state) {
//                   alert("Sorry! You'll need to create a Constitution for " + state + " first!");
//                 }
            
//                 // ******************************
//                 // Internal methods
//                 // ******************************
            
//                 /**
//                  * Search for states... use $timeout to simulate
//                  * remote dataservice call.
//                  */
//                 $scope.querySearch =function(query) {
//                   var results = query ? $scope.states.filter( createFilterFor(query) ) : $scope.states,
//                       deferred;
//                   if ($scope.simulateQuery) {
//                     deferred = $q.defer();
//                     $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
//                     return deferred.promise;
//                   } else {
//                     return results;
//                   }
//                 }
            
//                 $scope.searchTextChange =function(text) {
//                   $log.info('Text changed to ' + text);
//                 }
            
//                 $scope.selectedItemChange = function(item) {
//                   $log.info('Item changed to ' + JSON.stringify(item));
//                 }
            
//                 /**
//                  * Build `states` list of key/value pairs
//                  */
//                 function loadAll() {
                  
//                     var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware';
//                   //var allStates = '建安五金, 冠凱企業有限公司, 永盛五金電器貨倉批發, 新環球鋁業有限公司, 耀貿(國際)物料供應有限公司, 超力五金, 三鑫國際(香港)有限公司, 英輝鋼材有限公司, 繽得利公司, 耀寶鋼材有限公司, 興業五金有限公司, 森記五金有限公司, 昌慎實業公司, 葉永聯五金有限公司, 聯友行, 永昌隆五金有限公司, 龍華五金公司, 鴻圖不銹鋼通風工程公司, 金源行鐵倉有限公司, 大韓金屬構造工程有限公司, 莫兆記集團有限公司';
            
            
//                         // $http({
//                         //     "method": "post",
//                         //     "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
//                         //     "data":{
//                         //         "action": "searchData",
//                         //         "index": "5metal.dazzle.website",
//                         //         "type": "company",
//                         //         "body": {
//                         //             "query":{
//                         //                 "match_all":{
//                         //                 }
//                         //             }
//                         //         }
            
//                         //     }
//                         // }).then(function (result) {
//                         //     console.log(result);
//                         //     if (result.data.code < 0) {
//                         //         resolve([]);
//                         //     } else {
//                         //         resolve(result.data.resolve);
//                         //     }
//                         // });
//                   return allStates.split(/, +/g).map( function (state) {
//                     return {
//                       value: state.toLowerCase(),
//                       display: state
//                     };
//                   });
//                 }
            
//                 /**
//                  * Create filter function for a query string
//                  */
//                 function createFilterFor(query) {
//                   var lowercaseQuery = query.toLowerCase();
            
//                   return function filterFn(state) {
//                     return (state.value.indexOf(lowercaseQuery) === 0);
//                   };
            
//                 }
                
             
        }
    };
    return link;
});

 function DemoCtrl ($timeout, $q, $log,$scope,$http,$dazzleUser) {
    var self = this;

    self.simulateQuery = false;
    self.isDisabled    = false;

    // list of `state` value/display objects
  
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;

//    self.newState = loadAll();
    self.states = loadAll();
    
    console.log('Load States',self.states);
    $scope.init = function() {
          $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data":{
                        "action": "searchData",
                        "index": "5metal.dazzle.website",
                        "type": "company",
                        "body": {
                            "_source" : ["nid","title"],
                            "query":{
                                "match_all":{
                                }
                            },
                            "sort":[ { "nid" : {"order" : "desc"}}],
                        }
                    }
                }).then(function (result) {
                    // console.log(result);
                    if (result.data.code < 0) {
                        resolve([{ value: [], display: []}]);
                    } else {
                        console.log('Company List Result',result.data.resolve);
                        var companys =[];
                        self.states = [];
                        angular.forEach(result.data.resolve,function(item,index){
                            //companys.push(item['title']);                            
                            self.states.push({
                               value: item['nid'],
                               display: item['title']
                            });
                        });
                        
                        console.log('Load Company List',self.states);
                    }
                });
    }


    function newState(state) {
      alert("Sorry! You'll need to create a Constitution for " + state + " first!");
    }

    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }

    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
      $dazzleUser.dazzleInfo['selectedItem'] = item;
      
    }

    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
    //   var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
    //           Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
    //           Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
    //           Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
    //           North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
    //           South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
    //           Wisconsin, Wyoming';
              
    var allStates = '建安五金, 冠凱企業有限公司, 永盛五金電器貨倉批發, 新環球鋁業有限公司, 耀貿(國際)物料供應有限公司, 超力五金, 三鑫國際(香港)有限公司, 英輝鋼材有限公司, 繽得利公司, 耀寶鋼材有限公司, 興業五金有限公司, 森記五金有限公司, 昌慎實業公司, 葉永聯五金有限公司, 聯友行, 永昌隆五金有限公司, 龍華五金公司, 鴻圖不銹鋼通風工程公司, 金源行鐵倉有限公司, 大韓金屬構造工程有限公司, 莫兆記集團有限公司';
    
      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
//      var lowercaseQuery = query.toLowerCase();

      return function filterFn(state) {
        return (state.display.indexOf(query) === 0);
      };

    }
  }
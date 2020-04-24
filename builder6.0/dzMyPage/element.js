var app = angular.module('demoApp');
//var _name ="dzDate";

app.directive('dzMyPage', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzleS3,$dazzleInit,$dazzlePopup,$dazzleData,$dazzleFn,
    atomInfo,userInfo) {
    var dzLink = {
      restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "//d27btag9kamoke.cloudfront.net/builder6.0/dzMyPage/element.html?id=" + new Date().getTime(),
        css: {
          href: "//d27btag9kamoke.cloudfront.net/builder6.0/dzMyPage/element.css?id=" + new Date().getTime(),
          /* Preload: this will trigger an HTTP request on app load.
           * Once the stylesheet is added, it will be loaded from the browser cache */
          preload: true
        },
                
        link: function ($scope, $element, attrs) {
              
        },
        controller: function ($scope, $element, $attrs,$timeout,$q,$log,pageInfo) {
                    var self = $scope;
                
                    self.simulateQuery = false;
                    self.isDisabled    = false;
                
                    // list of `state` value/display objects
                    self.states        = loadAll();
                    console.log('All HTML',self.states);
                    self.querySearch   = querySearch;
                    self.selectedItemChange = selectedItemChange;
                    self.searchTextChange   = searchTextChange;
                
                    self.newState = newState;
                
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
                      var results = query ? self.states.filter(createFilterFor(query)) : self.states,
                          deferred;
                      if (self.simulateQuery) {
                        deferred = $q.defer();
                        $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
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
                    }
                
                    /**
                     * Build `states` list of key/value pairs
                     */
                    function loadAll() {
//                        var allPages = [];
                        var allStates = pageInfo.allHtml.join();
                        console.log(allStates);

                    //   var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
                    //           Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
                    //           Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
                    //           Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
                    //           North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
                    //           South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
                    //           Wisconsin, Wyoming';
                
                      return allStates.split(/,+/g).map(function (state) {
                         
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
                      var lowercaseQuery = query.toLowerCase();
                
                      return function filterFn(state) {
                        return (state.value.indexOf(lowercaseQuery) === 0);
                      };
                
                    }   
        }
    };
    return dzLink;
});
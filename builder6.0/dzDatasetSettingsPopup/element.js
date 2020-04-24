var app = angular.module('demoApp');



app.directive('dzDatasetSettingsPopup', function ($compile, $templateRequest, $mdDialog, $dazzlePopup,$dazzleUser,
atomInfo,dzFn,dzS3,dbFactory,userInfo) {
    var name = 'dzDatasetSettingsPopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/"+name+"/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "//d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
                
                var params = $dazzleUser.getDazzleInfo('params');
                
                $scope.db = params.settings || {};
                
                dzS3.checkFile(userInfo.exportBucket,'content/table.json').then(function(bool){
                    if(!bool)
                        dzS3.saveJson(userInfo.exportBucket,'content/table.json',[]);
                });
                dzS3.checkFile(userInfo.exportBucket,'admin/'+userInfo.uid+'/content/table.json').then(function(bool){
                    if(!bool)
                        dzS3.saveJson(userInfo.exportBucket,'admin/'+userInfo.uid+'/content/table.json',[]);
                });
                //  dzS3.getJson(userInfo.exportBucket,'content/table.json').then(function(json){
                //     $scope.tableList = json; 
                //     console.log('JSON',json);
                // });     
                
                 $scope.simulateQuery = false;
                $scope.isDisabled    = false;
            
                // list of `state` value/display objects
                $scope.states        = loadAll();
                $scope.querySearch   = querySearch;
                $scope.selectedItemChange = selectedItemChange;
                $scope.searchTextChange   = searchTextChange;
            
                $scope.newState = newState;
            
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
                  var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
                          Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
                          Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
                          Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
                          North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
                          South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
                          Wisconsin, Wyoming';
            
                  return allStates.split(/, +/g).map(function (state) {
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
                
                var table_template = {
                    "data": {
                        "type": "dynamodb",
                        "table":"",
                        "index":"",
                        "key":""
                    },
                    "buttons": [],
                    "templatePage": "",
                    "pageKey":""
                }
                
                 $scope.loadPages = function(){
                    return new Promise(function (resolve, reject) {
                        dzS3.getAllHtml().then(function(json){
                            $scope.pageList = json;
                            resolve($scope.pageList);
                           console.log('Page',json); 
                        });
                        // dzS3.getJson(userInfo.exportBucket,'content/table.json').then(function(json){
                        //     $scope.tableList = json; 
                        //     console.log('JSON',json);
                        //     resolve($scope.tableList);
                        // });                    
                    });
                }

                
                $scope.loadTables = function(){
                    return new Promise(function (resolve, reject) {
                        dzS3.getJson(userInfo.exportBucket,'content/table.json').then(function(json){
                            $scope.tableList = json; 
                            console.log('JSON',json);
                            resolve($scope.tableList);
                        },function(err){
							$scope.tableList = [];
						});                    
                    });
                }

                            
                $scope.cancel = function (){
                    $mdDialog.cancel();
                }            
                            
                $scope.save = function () {
                    $mdDialog.hide($scope.db);
            
                }
                $scope.addTable = function(){
                    var tableJson=table_template;
                    var tableName = prompt("請輸入資料表名稱.留意名稱必須沒有重覆");
                    dbFactory.addIndex(tableName).then(function(){
                        $scope.tableList.push({
                           "id":tableName,
                           "label":tableName
                        });
                        dzS3.saveJson(userInfo.exportBucket,"admin/"+userInfo.exportBucket+"/content/table.json",$scope.tableList);
                        dzS3.saveJson(userInfo.exportBucket,"admin/"+userInfo.exportBucket+"/content/"+tableName+"-schema.json",[]);
                        dzS3.saveJson(userInfo.exportBucket,"admin/"+userInfo.exportBucket+"/content/"+tableName+"-data.json",[]);
                        dzS3.saveJson(userInfo.exportBucket,"content/table.json",$scope.tableList);
                        dzS3.saveJson(userInfo.exportBucket,"content/"+tableName+"-schema.json",[]);
                        dzS3.saveJson(userInfo.exportBucket,"content/"+tableName+"-data.json",[]);

                        tableJson['data']['table'] = tableName;
                        tableJson['data']['index'] = userInfo.exportBucket;
                        tableJson['data']['key'] = "ID";
                        tableJson['pageKey'] = 'title';
                        dzS3.saveJson(userInfo.exportBucket,"admin/"+userInfo.exportBucket+"/content/"+tableName+"-table.json",tableJson);
                        dzS3.saveJson(userInfo.exportBucket,"content/"+tableName+"-table.json",tableJson);
                        
                       alert("成功加入"); 
                    });
                }
                $scope.editData = function(){
                    var params = {
                        "name":"dzDataPopup2",
                        "directive":"<dz-data-popup2></dz-data-popup2>",
                        "width": '90%',
                        "table": $scope.selectedTable
                    }
                    $dazzlePopup.callPopup(params).then(function(){
                        
                    });
                }
                $scope.editColumn = function(){
                    dbFactory.editSchema($scope.selectedTable).then(function(json){
                       console.log(json); 
                    //   dzS3.saveJson(userInfo.exportBucket,'content/'+table+'-schema.json',json);
                    });
                }


        }
    };
    return link;
});
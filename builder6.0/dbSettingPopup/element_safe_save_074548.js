var app = angular.module('demoApp');
app.directive('dbSettingPopup', function ($compile, $templateRequest, $mdDialog, $dazzlePopup) {
    var name = 'dbSettingPopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/"+name+"/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "//d27btag9kamoke.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser,$dazzleFn) {
                console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');

                $scope.pageJson=$dazzleUser.getDazzleInfo('pageJson');
                $scope.thisPageJson=$dazzleUser.getDazzleInfo('thisPageJson');
                $scope.userBucket=$dazzleUser.getDazzleInfo('userBucket');
                $scope.exportBucket=$dazzleUser.getDazzleInfo('exportBucket');
                $scope.website = $dazzleUser.getDazzleInfo('website');
                $scope.user = $dazzleUser.getUser();
                $scope.tables=[];
                $scope.fields=[];
                $scope.keys=[];
                $scope.currentTable = params.db.table || '';
                $scope.currentField = params.db.field || {};
                $scope.isFilter = false;

                $scope.init = function() {
                    if (!angular.isUndefined(params.db))
                        $scope.currentDataSet = params.db;
                    else {
                        $scope.currentDataSet={
                            'type':'elastic',
                            'table':$scope.currentTable,
                            'key':'id',
                            'index':$scope.user.uid,
                            'field':$scope.currentField,
                            'id':$scope.currentKey,
                            'edit':true,
                            'refer':false,
                            'directive':'text'
                        };
                    }
                }

                
                if ($scope.currentDataSet.refer)
                    $scope.showTab = true;
                else
                    $scope.showTab=false;

            $scope.states = loadAll();
            


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
                var lowercaseQuery = angular.lowercase(query);

                return function filterFn(state) {
                    return (state.value.indexOf(lowercaseQuery) === 0);
                };

            }


                // if ($scope.thisPageJson && $scope.thisPageJson.exportTable){
                //         $dazzleFn.getTableSchema($scope.user.uid,$scope.website.website,$scope.thisPageJson.exportTable).then(function(fields){
                //             console.log('Course',fields);
                //             $scope.currentFields = fields;
                //             angular.forEach(fields,function(item,index){
                //               if (item.directive=="refer") {
                //                   $scope.keys.push(item.field);
                //               }
                //             });
                //         });                    
                // }
                  // Get Fields
                $scope.getUserFields = function(){
                    return new Promise(function (resolve, reject) {
                        $dazzleFn.getTableSchema($scope.user.uid,$scope.website.website,$scope.currentTable).then(function(fields){
                            console.log('Current Schema',fields);
                            $scope.currentSchema = fields;
                            var referField;
                            $scope.currentFields = fields;                        
                            $scope.$apply(function () {     
                                $scope.fields=[];
                                angular.forEach(fields,function(value,key){
                                    $scope.fields.push(value.field);
                                });
                            });
                            resolve([]);
                        });
                    });
                }
                
                $scope.setTable = function(table) {
                    return new Promise(function (resolve, reject) {
                        $dazzleFn.getTableTable($scope.user.uid,$scope.website.website,table).then(function(json){
                            $scope.currentTable = table;
                            if ($scope.thisPageJson && $scope.thisPageJson.exportTable && $scope.currentTable==$scope.thisPageJson.exportTable){
                                $scope.currentKey = $scope.thisPageJson.exportDatas[json.data.key];                                
                            }
                            
                            console.log(table);
                            console.log(json);

                            $scope.currentDataSet['table']= $scope.currentTable;
                            $scope.currentDataSet['field']= $scope.currentField;
                            $scope.currentDataSet['key']= json.data.key;
                            $scope.currentDataSet['type'] = json.data.type;
                            $scope.currentDataSet['index'] = json.data.index;
                            $scope.currentDataSet['id'] = $scope.currentKey;

                            console.log($scope.currentDataSet);
                            $scope.getUserFields().then(function(){
                                $scope.selectedIndex = 1;
                                resolve();
                            }); 
                        });

                    });
                }
                $scope.setReferField = function(field){
                    $scope.currentReferField=field;
                    $scope.currentDataSet.referField = field;
                    // $scope.selectedIndex = 0;
                }
                 $scope.setField = function(field,index) {
                    return new Promise(function (resolve, reject) {
                      
                        var refer =false;
                        var table;
                        $scope.currentField = field;
                        console.log($scope.currentFields);
                        console.log($scope.currentFields.length);
                        angular.forEach($scope.currentFields,function(item,index){
                            console.log(item);
                            console.log('My Field',field);
                            if (item.field == field) {
                                if (item.directive=="refer")  {
                                    refer = true;                     
                                    table = item.cellEditorParams.table;
                                }                                                              
                            }  
                        });

                        if (refer) {
                            console.log('Refer');
                            $scope.currentDataSet.field = $scope.currentField;
                            $scope.currentDataSet.refer =true;
                            $scope.currentDataSet.referTable = table;
                            $dazzleFn.getTableSchema($scope.user.uid,$scope.website.website,table).then(function(fields){
                                console.log('Course',fields);
                                $scope.referfields = [];
                                $scope.$apply(function () { 
//                                    $scope.referfields = fields;
                                    angular.forEach(fields,function(item,index){
                                            $scope.referfields.push(item.field);    
                                    });
                                    $scope.showTab = true;
                                });
                                $scope.selectedIndex = 2;

                                resolve();
                            });                            
                        } else {
                            console.log('Non refer');
                            var schema ={};
                            schema= getFieldJson($scope.currentSchema,$scope.currentField);
                            console.log(schema);
                            $scope.currentDataSet.refer =false;
                            $scope.showTab = false;
                            $scope.selectedIndex = 0;
                            $scope.currentDataSet.field = $scope.currentField;
                            $scope.currentDataSet.fieldSchema = schema ;
                            $scope.currentDataSet.directive = schema.directive;
                            $scope.currentDataSet.refer =false;
                            console.log(schema);
                            console.log('My Select',$scope.currentDataSet);
                            resolve();
                        }
 

                    });
                }
                
                $scope.addFilter = function() {
                    $scope.isFilter = true;
                    console.log('Add Filter');
                    if ($scope.currentDataSet.filter.hasOwnProperty('match')){
                        $scope.filterField = Object.keys($scope.currentDataSet.filter.match);
                        $scope.searchValue = $scope.currentDataSet.filter.match[$scope.filterField];                
                    }                    
                }

                $scope.cancelDbSetting = function() {
                           $mdDialog.hide(null);
                }
                $scope.cancel = function() {
                    $mdDialog.cancel();
                }
                $scope.save = function() {

                    // if ($scope.isFilter){
                    //     $scope.currentDataSet.order = "desc";
                    //     if ($scope.filterField) {
                    //         $scope.currentDataSet.filter =  {
                    //             "match": {}
                    //         };
                            
                    //         $scope.currentDataSet.filter.match[$scope.filterField] = $scope.searchValue;                            
                    //     } else {
                    //         $scope.currentDataSet.filter =  {
                    //             "match_all": {}
                    //         };
                                
                    //     }

                    // }  
                    
                    var id = $('#dazzle-key').text();
                    
                     $scope.currentDataSet={
                            'type':'elastic',
                            'table':$scope.currentTable,
//                            'key':'id',
                            'index':$scope.user.uid,
                            'field':$scope.currentField,
                            'id':$('#dazzle-key').text(),
//                            'edit':true,
//                            'refer':false,
//                            'directive':'text'
                    };  
                    console.log('Current Data Set',$scope.currentDataSet);
                    $mdDialog.hide($scope.currentDataSet);
                }
                
                console.log('User',$scope.user);
                console.log('Website',$scope.website);
                $scope.selectedIndex = 0;
                
              // Get Tables
            $dazzleFn.getUserTables($scope.user.uid, $scope.website.website).then(function (tables) {
                $scope.$apply(function () {
                    $scope.tables = tables;
                    console.log(tables);
                });
            });
            
 
            
            if ($scope.currentTable) {
                $scope.setTable($scope.currentTable).then(function(result){
                    console.log($scope.currentField);
                });
            } else 
                $scope.currentField= '';


        }
    };
    return link;
});

function getFieldJson(schemaJson, field){
    console.log('Field',field);
    angular.forEach(schemaJson,function(item,index){
 //       console.log('Field Item',item);
       if (item['field']==field){
           console.log(item);
              return item;
       }
    });
}
var app = angular.module('demoApp');



app.directive('dbSettingPopup', function ($compile, $templateRequest, $mdDialog, $dazzlePopup,$dazzleData,$dazzleElastic) {
    var name = 'dbSettingPopup';
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
                // $scope.currentTable = params.db.table || '';
                // $scope.currentField = params.db.field || {};
                $scope.isFilter = false;
                $scope.myFields = [];
                $scope.myTables = [];
                $scope.init = function() {
                    $dazzleElastic.getUserElasticTables().then(function(result){
                    //   console.log('Result',result); 
                        $scope.myTables = result;
                        
                    });
                }

                $scope.selectTable = function(table) {
                    console.log('Table',table);
                    $scope.myTable = table.id;
                    console.log($scope.myTable);
                    
                }
                $scope.importData = function() {
                    var params = {
                            name:'dzDataPopup',
                            directive: '<dz-data-popup></dz-data-popup>',
                            table: $scope.myTable.id
                        };
                        $dazzlePopup.callPopup(params).then(function(result){
                           $mdDialog.hide(result);
                            console.log('Selected Result',result);
                            //  var html = angular.element($dazzleUser.dazzleInfo['bodyCode']);
                            //  var ele;
                            //  $scope.result = result;
                            //  ele=$compile(html)($scope);
                            //  $('panel').find('dz-text').html(ele);
                            
                        });
                }

                $scope.loadMyField = function() {
                    $dazzleData.loadMyField($scope.currentDataSet.index,$scope.currentDataSet.table).then(function(result){
                        $scope.myFields = [];
                        angular.forEach(result,function(item,index){
                            $scope.myFields.push({
                               "id":item.id,
                               "label":item.fieldName,
                               "type":item.directive
                            });
                        });
                    });
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
                            'dbtype':'elastic',
                            'table':$scope.currentDataSet.table,
//                            'key':'id',
                            'index':$scope.user.uid,
                            'field':$scope.currentDataSet.field,
                            'id':$('#dazzle-key').text(),
                            'type':$scope.selectedField.type
//                            'edit':true,
//                            'refer':false,
//                            'directive':'text'
                    };

                
                    $scope.currentDataSet['id'] =id;
                    $scope.currentDataSet['type']= $scope.selectedField.type;

                    console.log('Current Data Set',$scope.currentDataSet);
                    $mdDialog.hide($scope.currentDataSet);
                }
                
                console.log('User',$scope.user);
                console.log('Website',$scope.website);
                $scope.selectedIndex = 0;


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
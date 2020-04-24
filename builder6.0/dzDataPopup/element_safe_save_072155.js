var app = angular.module('demoApp');
var name = 'dzDataPopup';

app.directive(name, function ($compile, $templateRequest, $mdDialog, $uibModal,$dazzleUser,$dazzleS3,dbElastic,$dazzlePopup,$dazzleFn,$dazzleInit,$dazzleData,dzS3,userInfo,pageInfo,dbElastic) {
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "//d27btag9kamoke.cloudfront.net/builder6.0/dzDataPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "//d27btag9kamoke.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($mdToast,$window,$scope, $element, $attrs,$dazzleS3, $http,$mdSidenav, $mdBottomSheet,$log,$ocLazyLoad,$mdDateLocale,dbFactory,dzFn,moment) {
    
           
            
            // $scope.params = $dazzleUser.dazzleInfo['params'];
            // $scope.data = $scope.params['data'];
            // $scope.table = $scope.params['table'];
            // $scope.inited = false;
            // $scope.init = function() {
            //     dbFactory.rowData = $scope.data;                
            //     $scope.getSchema($scope.table).then(function(){
            //       $scope.gridOptions = dbFactory.gridOptions;
            //         $scope.inited = true;
            //     });
                
            // }

            $scope.getData = function(table){
                return new Promise(function (resolve, reject) {
                    dzS3.getData(table+'-data.json').then(function(json){
                      dbFactory.rowData=json; 
                      resolve(json);
                    },function(err){
                        resolve();
                    });
                });    
            }
            $scope.getSchema = function(table){
                return new Promise(function (resolve, reject) {
                    dzS3.getData(table+'-schema.json').then(function(json){
                        dbFactory.loadCell(json).then(function(){
                          dbFactory.columnDefs=json; 
                          resolve(json);                            
                        });
                    },function(err){
                        resolve();
                    });
                });
            }
            
            
            
             $scope.params = $dazzleUser.dazzleInfo['params'];
                $scope.created = [];
    
    //      $scope.$element = $element;
            $scope.userInfo = userInfo;
            $scope.dzS3 = dzS3;
            $scope.dzFn = dzFn;
            $scope.pageInfo = pageInfo;
            $scope.$http = $http;
            $scope.$window = $window;
            $scope.$compile = $compile;
            $scope.$uibModal = $uibModal;
            $scope.$mdDialog = $mdDialog;
            $scope.$mdToast = $mdToast;
            $scope.$mdBottomSheet = $mdBottomSheet;
            $scope.moment = moment;
            $scope.$ocLazyLoad = $ocLazyLoad;
            $scope.$mdDateLocale = $mdDateLocale;
            $scope.$dazzleS3 = $dazzleS3;
            $scope.$dazzlePopup = $dazzlePopup;
            $scope.$dazzleUser = $dazzleUser;
            $scope.$dazzleData = $dazzleData;
            $scope.$dazzleInit = $dazzleInit;
            $scope.$dazzleFn = $dazzleFn;
            $scope.dbElastic = dbElastic;
            $scope.dbElastic = dbElastic;
            $scope.website = $dazzleUser.dazzleInfo['website'];
            $scope.table = $scope.params['table'] || '';
            $dazzleUser.dazzleInfo['thisTable'] = $scope.table;
            //$scope.table = table;
            $scope.isForm = false;
            $scope.editable = true;
            $scope.modelType = false;
            $scope.alasql = alasql;
            $scope.websiteTable=[];
            $scope.tableList = $dazzleUser.dazzleInfo['tableList'];
            $scope.tableLabel = $scope.params['tableLabel'];
//            $scope.moment = moment;
    
            if (!$scope.user) {
                $scope.user = $dazzleUser.getUser();
            }

            $scope.select = function() {
              var selectedRows = $dazzleUser.dazzleInfo['selectedRows'];
              $mdDialog.hide(selectedRows);
               
            }
    
            $scope.init = function () {
                
                console.log('dbElastic',dbElastic);
                
                dzS3.getData('table.json').then(function(json){
                   $scope.tableList = json;
                   if (!$scope.table) {
                       $scope.table = $scope.tableList[0]['id'];
                        $scope.tableLabel = $scope.tableList[0]['label'];
                   } else {
                       angular.forEach(json,function(item,index){
                          if (item.id == $scope.table)
                            $scope.tableLabel = item['label'];
                       });
                   }
                //   dbElastic.dzInitGrid($scope.table).then(function(){
                       dbElastic.dzInitGrid($scope.table);
                        $scope.gridOptions = dbElastic.gridOptions;
                        console.log('Grid Options',$scope.gridOptions);
                        $scope.inited = true;
                        $compile($('#myGrid'))($scope);                       
                //   });

                });
                  


            }
    
            $scope.dbManage = function (index) {
//                dbElastic.dbManage(table);

                    // $mdDialog.cancel();
                    //     var params = {
                    //         name:'dzDataPopup',
                    //         directive: '<dz-data-popup></dz-data-popup>',
                    //         table: $scope.tableList[index].id
                    //     };
                    //     $dazzlePopup.callPopup(params).then(function(result){
                            
                    //     });
                    
                $scope.table = $scope.tableList[index].id;
                $scope.tableLabel = $scope.tableList[index].label;
                // dbElastic.dzInitGrid($scope.table);
                // $scope.gridOptions = dbElastic.gridOptions;
                // console.log('Re Grid Options',$scope.gridOptions);
                // $scope.inited = true;
                // $compile($('#myGrid'))($scope);
                $scope.reNewGrid($scope.table);

            }
            
            $scope.reNewGrid = function(tableId){
                var websiteId = location.hostname;
                            dbElastic.dzLoadTable(websiteId, tableId).then(function (table) {
                                  console.log('Load Table', table);
                                  dbElastic.tableName = tableId;
                                  dbElastic.tableJson = table;
                                  $dazzleUser.dazzleInfo['tableJson'] = table;
                                  if (angular.isArray(dbElastic.tableJson.buttons)) {
                                      for (var i = 0; i < dbElastic.tableJson.buttons.length; i++) {
                                          dbElastic.loadButton(dbElastic.tableJson.buttons[i]);
                                      }
                                  }
                                  dbElastic.dzLoadSchema(websiteId, tableId).then(function (json) {
                                      dbElastic.schemaJson = json;
                                      console.log('Schema Json', dbElastic.schemaJson);
                                      // that.loadNewCell(json).then(function(){

                                      // })
                                      dbElastic.loadCell(json).then(function () {
                                          $scope.gridOptions.api.setColumnDefs(json);
                                          $scope.gridOptions.api.refreshView();
                                          dbElastic.dzLoadData().then(function (json) {
                                              $scope.gridOptions.api.setRowData(json);
                                              $scope.gridOptions.api.refreshView();
                                              console.log('Table:', dbElastic.tableJson);
                                              console.log('Schema:', dbElastic.schemaJson);
                                              console.log('Data:', json);
                                              dbElastic.refresh();
                                              $dazzleUser.dazzleInfo['myGrid'] = $scope.gridOptions;
                                              $scope.gridOptions = dbElastic.gridOptions;
                                            console.log('Re Grid Options',$scope.gridOptions);
                                            $scope.inited = true;
                                            $compile($('#myGrid'))($scope);
                                              
                                              
                                              resolve();
                                          });
                                      });
                                  });
                              });
                
            }
    
            $scope.listElastic = function (table) {
                dbElastic.listElastic(table);
            }
    
            $scope.home = function (table) {
                dbElastic.home(table);
    
            }
    
            $scope.loadButton = function (b) {
                dbElastic.loadButton(b);
            }
    
            $scope.editSchema = function () {
                dbElastic.editSchema();
            }
    
            $scope.addTable = function() {
                dbElastic.addTable();
            }
    
            $scope.removeTable = function () {
                dbElastic.removeTable();
            }
    
            $scope.loadTable = function (tableName) {
                dbElastic.loadTable(tableName);
            }
    
            $scope.initTable = function () {
                dbElastic.initTable();
            }
    
    
            $scope.loadData = function () {
                dbElastic.loadData();
            };
    
            $scope.loadCell = function (schema) {
                dbElastic.loadCell(schema);
            }
    
            $scope.setCellJs = function (schema) {
                dbElastic.setCellJs(schema);
            }
    
            $scope.setCellFilterer = function (schema) {
                dbElastic.setCellFilterer(schema);
            }
    
            $scope.setCellFilter = function (schema) {
                dbElastic.setCellFilter(schema);
            }
    
            $scope.setCellEditor = function (schema) {
                dbElastic.setCellEditor(schema);
            }
    
            $scope.setCellRenderer = function (schema) {
                dbElastic.setCellRenderer(schema);
            }
    
    
            $scope.referAdd = function (object) {
                dbElastic.referAdd(object);
            }
    
            $scope.addFilter = function (filter) {
                dbElastic.addFilter(filter);
            }
    
                $scope.add = function (object) {
                   
                        var date = new Date().getTime().toString();
                        var newObject = {};
                        // if (object) {
                        //     newObject = object;
                        // }
                        console.log('Table JSON',dbElastic.tableJson);
                        if (dbElastic.tableJson.data.type === 'dynamodb') {
                            newObject[dbElastic.tableJson.data.key] = date;
                        }
                        
                        console.log(newObject);
                        // for (var i = 0; i < dbElastic.schemaJson.length; i++) {
                        //     if (dbElastic.schemaJson[i].defaultByTimestamp) {
                        //         newObject[dbElastic.schemaJson[i].field] = dbElastic.schemaJson[i].default + date;
                        //     } else if (dbElastic.schemaJson[i].default) {
                        //         newObject[dbElastic.schemaJson[i].field] = dbElastic.schemaJson[i].default;
                        //     }
                        // }
                        $scope.gridOptions.api.updateRowData({add: [newObject], addIndex: 0});
                        $scope.dataLength++;
                        $scope.gridOptions.api.refreshInMemoryRowModel();
                        $scope.gridOptions.api.getModel().rowsToDisplay[0].edited = true;
                    
                }
            // $scope.add = function(object) {
            //     dbElastic.add(object);
                
               
            // }
    
    
            $scope.addRecord = function(object) {
                dbElastic.addRecord(object);
            }
    
            $scope.remove = function() {
                dbElastic.remove();
            }
    
            $scope.refresh = function () {
                dbElastic.refresh();
            }
    
            $scope.isFirstColumn = function (params) {
                dbElastic.isFirstColumn(params);
    
            }
            $scope.cancel = function () {
                $mdDialog.hide($scope.lastUpdated);
            }
            $scope.save = function () {
                dbElastic.save();
            }
    
            $scope.saveSchema = function () {
                dbElastic.saveSchema();
    
            }
            $scope.saveData = function(data) {
                dbElastic.saveData(data);
            }
            $scope.checkExist = function (tableJson,data) {
                dbElastic.checkExist(tableJson,data);
    
            }
    
            $scope.bulkUpdateData = function (params) {
                dbElastic.bulkUpdateData(params);
            }
    
            // $scope.getData = function() {
            //     dbElastic.getData();
            // }
    
            $scope.import = function() {
                dbElastic.import();
            }
    
            $scope.export = function() {
                dbElastic.export();
            }
    
            $scope.import = function () {
                if (!$scope.fileChooser) {
                    $scope.fileChooser = document.createElement('input');
                    $scope.fileChooser.setAttribute("type", "file");
                    $scope.fileChooser.style.display = "none";
                    $scope.fileChooser.addEventListener('change', function (event) {
                        console.log('Change');
                        var file = this.files[0];
                        var tagField = [];
                        for (var i = 0; i < dbElastic.schemaJson.length; i++) {
                            if (dbElastic.schemaJson[i].directive == 'tag') {
                                tagField.push(dbElastic.schemaJson[i].field);
                            }
                        }
                        alasql('SELECT * FROM FILE(?,{headers:true})', [event], function (data) {
                            console.log('Import',data);
    
    
                            for (var i=0;i<data.length; i++) {
                                $scope.addRecord(data[i]);
                            }
    
                        });
                    });
                }
                $scope.fileChooser.click();
            }  
        
        }

    }
    return link;
});


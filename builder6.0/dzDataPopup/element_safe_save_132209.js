var app = angular.module('demoApp');
var name = 'dzDataPopup';

app.directive(name, function ($compile, $templateRequest, $mdDialog, $uibModal,$dazzleUser,$dazzleS3,$dazzleElastic,$dazzlePopup,$dazzleFn,$dazzleInit,$dazzleData,dzS3,userInfo) {
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
        controller: function ($mdToast,$window,$scope, $element, $attrs,$dazzleS3, $http,$mdSidenav, $mdBottomSheet,$log,$ocLazyLoad,$mdDateLocale,dbFactory,dzFn) {
    
           
            
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
            $scope.$http = $http;
            $scope.$window = $window;
            $scope.$compile = $compile;
            $scope.$uibModal = $uibModal;
            $scope.$mdDialog = $mdDialog;
            $scope.$mdToast = $mdToast;
            $scope.$mdBottomSheet = $mdBottomSheet;
            $scope.$ocLazyLoad = $ocLazyLoad;
            $scope.$mdDateLocale = $mdDateLocale;
            $scope.$dazzleS3 = $dazzleS3;
            $scope.$dazzlePopup = $dazzlePopup;
            $scope.$dazzleUser = $dazzleUser;
            $scope.$dazzleData = $dazzleData;
            $scope.$dazzleInit = $dazzleInit;
            $scope.$dazzleFn = $dazzleFn;
            $scope.$dazzleElastic = $dazzleElastic;
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
                
                    $scope.inited = true;
                    // var columnDefs = [
                    //     {headerName: "Make", field: "make"},
                    //     {headerName: "Model", field: "model"},
                    //     {headerName: "Price", field: "price"}
                    // ];
                
                    // var rowData = [
                    //     {make: "Toyota", model: "Celica", price: 35000},
                    //     {make: "Ford", model: "Mondeo", price: 32000},
                    //     {make: "Porsche", model: "Boxter", price: 72000}
                    // ];
                
                    // $scope.gridOptions = {
                    //     columnDefs: columnDefs,
                    //     rowData: rowData
                    // };
                
                console.log(window);
                if (!$scope.table) {
                    dzS3.getData('table.json').then(function(json) {
                        $scope.tableList = json;
                        $scope.table = $scope.tableList[0]['id'];
                        $scope.tableLabel = $scope.tableList[0]['label'];
                        dzFn.loadBackend().then(function () {
                            Promise.all([dbFactory.getDataByJson($scope.table), dbFactory.getSchema($scope.table)]).then(function (result) {
                                console.log('Result', result);
                                dbFactory.gridOptions.columnDefs = result[1];
                                dbFactory.gridOptions.rowData = result[0];
                                $scope.gridOptions = dbFactory.gridOptions;
                                console.log('Grid Options',$scope.gridOptions);
                                $scope.inited = true;
                                $compile($('#myGrid'))($scope);
                            });
                        });
                    });
                }



                //     console.log('My Table',$scope.table);

                //     switch($scope.table){
                //         case '_table':
                //         case '_schema':
                //         case '_page':
                //         case '_atom':
                //             $dazzleElastic.initGrid('_master',$scope.table);
                //             break;
                //         default:
                //           $dazzleElastic.initGrid(userInfo.uid,$scope.table);
                //             break;
                //     }

                // $scope.gridOptions = $dazzleElastic.gridOptions;
                // console.log('Grid Options',$scope.gridOptions);
    
                // $scope.inited = true;

                // console.log($dazzleUser.getDazzleInfo('thisTable'));
                // $scope.lastUpdated = null;    


            }
    
            $scope.dbManage = function (index) {
//                $dazzleElastic.dbManage(table);
                $scope.table = $scope.tableList[index].id;
                $scope.tableLabel = $scope.tableList[index].label;
                $dazzleElastic.initGrid($dazzleUser.getUser().uid,$scope.table);
                $scope.gridOptions = $dazzleElastic.gridOptions;
                

            }
    
            $scope.listElastic = function (table) {
                $dazzleElastic.listElastic(table);
            }
    
            $scope.home = function (table) {
                $dazzleElastic.home(table);
    
            }
    
            $scope.loadButton = function (b) {
                $dazzleElastic.loadButton(b);
            }
    
            $scope.editSchema = function () {
                $dazzleElastic.editSchema();
            }
    
            $scope.addTable = function() {
                $dazzleElastic.addTable();
            }
    
            $scope.removeTable = function () {
                $dazzleElastic.removeTable();
            }
    
            $scope.loadTable = function (tableName) {
                $dazzleElastic.loadTable(tableName);
            }
    
            $scope.initTable = function () {
                $dazzleElastic.initTable();
            }
    
    
            $scope.loadData = function () {
                $dazzleElastic.loadData();
            };
    
            $scope.loadCell = function (schema) {
                $dazzleElastic.loadCell(schema);
            }
    
            $scope.setCellJs = function (schema) {
                $dazzleElastic.setCellJs(schema);
            }
    
            $scope.setCellFilterer = function (schema) {
                $dazzleElastic.setCellFilterer(schema);
            }
    
            $scope.setCellFilter = function (schema) {
                $dazzleElastic.setCellFilter(schema);
            }
    
            $scope.setCellEditor = function (schema) {
                $dazzleElastic.setCellEditor(schema);
            }
    
            $scope.setCellRenderer = function (schema) {
                $dazzleElastic.setCellRenderer(schema);
            }
    
    
            $scope.referAdd = function (object) {
                $dazzleElastic.referAdd(object);
            }
    
            $scope.addFilter = function (filter) {
                $dazzleElastic.addFilter(filter);
            }
    
    
            $scope.add = function(object) {
                $dazzleElastic.add(object);
            }
    
    
            $scope.addRecord = function(object) {
                $dazzleElastic.addRecord(object);
            }
    
            $scope.remove = function() {
                $dazzleElastic.remove();
            }
    
            $scope.refresh = function () {
                $dazzleElastic.refresh();
            }
    
            $scope.isFirstColumn = function (params) {
                $dazzleElastic.isFirstColumn(params);
    
            }
            $scope.cancel = function () {
                $mdDialog.hide($scope.lastUpdated);
            }
            $scope.save = function () {
                $dazzleElastic.save();
            }
    
            $scope.saveSchema = function () {
                $dazzleElastic.saveSchema();
    
            }
            $scope.saveData = function(data) {
                $dazzleElastic.saveData(data);
            }
            $scope.checkExist = function (tableJson,data) {
                $dazzleElastic.checkExist(tableJson,data);
    
            }
    
            $scope.bulkUpdateData = function (params) {
                $dazzleElastic.bulkUpdateData(params);
            }
    
            // $scope.getData = function() {
            //     $dazzleElastic.getData();
            // }
    
            $scope.import = function() {
                $dazzleElastic.import();
            }
    
            $scope.export = function() {
                $dazzleElastic.export();
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
                        for (var i = 0; i < $dazzleElastic.schemaJson.length; i++) {
                            if ($dazzleElastic.schemaJson[i].directive == 'tag') {
                                tagField.push($dazzleElastic.schemaJson[i].field);
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


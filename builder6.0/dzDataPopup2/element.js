//var app = angular.module('demoApp');
// var agGrid = window['agGrid'];
// agGrid.initialiseAgGridWithAngular1(angular);

  var app = angular.module("demoApp", ['ngRoute','ngMaterial', 'ngMessages',
		'ngTouch',  'angularGrid', 'oc.lazyLoad','ui.bootstrap','ui.tree','ui.sortable','ui.bootstrap.contextMenu',
		'ngMaterialSidemenu','angularMoment','lfNgMdFileInput',"agGrid",'cfp.hotkeys']);

var agGrid = window['agGrid'];
        agGrid.LicenseManager.setLicenseKey("ag-Grid_Evaluation_License_Key_Not_for_Production_100Devs26_March_2018__MTUyMjAxODgwMDAwMA==e8f8bbc1ff5aff3ac920e42d0542b6c9");
        agGrid.initialiseAgGridWithAngular1(angular);

console.log(window);
app.directive("dzDataPopup2", function ($compile, $templateRequest, $mdDialog,$dazzleUser,$dazzleS3,dbElastic,$dazzlePopup,
dzS3,userInfo,pageInfo,dbElastic) {
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "//d27btag9kamoke.cloudfront.net/builder6.0/dzDataPopup2/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "//d27btag9kamoke.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($mdToast,$window,$scope, $element, $attrs,$dazzleS3, $http,$mdSidenav, $mdBottomSheet,$log,$ocLazyLoad,$mdDateLocale,dbFactory,dzFn,moment) {
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
        
            //  $scope.params = {
            //      table: 'notic'
            //  }
             
//             $scope.params['table'] = 'notic';
                $scope.created = [];
    
    //      $scope.$element = $element;
            $scope.userInfo = userInfo;
            $scope.dzS3 = dzS3;
            $scope.dzFn = dzFn;
            $scope.pageInfo = pageInfo;
            $scope.$http = $http;
            $scope.$window = $window;
            $scope.$compile = $compile;
            $scope.$mdDialog = $mdDialog;
            $scope.$mdToast = $mdToast;
            $scope.$mdBottomSheet = $mdBottomSheet;
            $scope.moment = moment;
            $scope.$ocLazyLoad = $ocLazyLoad;
            $scope.$mdDateLocale = $mdDateLocale;
            $scope.$dazzleS3 = $dazzleS3;
            $scope.$dazzlePopup = $dazzlePopup;
            $scope.$dazzleUser = $dazzleUser;
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
             $scope.loadJsonData = function(){
                dzS3.getData($scope.table+'-data.json').then(function(data){
                   console.log(data); 
                   angular.forEach(data,function(item,index){
                       $scope.addRecord(item);
                   });
                });
                
            }
            $scope.init = function(){
                
                var columnDefs = [
                    {headerName: "Make", field: "make"},
                    {headerName: "Model", field: "model"},
                    {headerName: "Price", field: "price"}
                ];
            
                var rowData = [
                    {make: "Toyota", model: "Celica", price: 35000},
                    {make: "Ford", model: "Mondeo", price: 32000},
                    {make: "Porsche", model: "Boxter", price: 72000}
                ];
            
                $scope.gridOptions = {
                    columnDefs: columnDefs,
                    rowData: rowData
                };
                
                     console.log('Table',$scope.table);
                dbElastic.dzInitGrid($scope.table);
                $scope.gridOptions = dbElastic.gridOptions;
                $compile($('#myGrid'))($scope);
                $scope.inited = true;
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
                
                
                // XMLHttpRequest in promise format
    function makeRequest(method, url, success, error) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.open("GET", url, true);
        httpRequest.responseType = "arraybuffer";
    
        httpRequest.open(method, url);
        httpRequest.onload = function () {
            success(httpRequest.response);
        };
        httpRequest.onerror = function () {
            error(httpRequest.response);
        };
        httpRequest.send();
    }
    
    // read the raw data and convert it to a XLSX workbook
    function convertDataToWorkbook(data) {
        /* convert data to binary string */
        var data = new Uint8Array(data);
        var arr = new Array();
    
        for (var i = 0; i !== data.length; ++i) {
            arr[i] = String.fromCharCode(data[i]);
        }
    
        var bstr = arr.join("");
    
        return XLSX.read(bstr, {type: "binary"});
    }

    // pull out the values we're after, converting it into an array of rowData
    
    function populateGrid(workbook) {
        // our data is in the first sheet
        var firstSheetName = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[firstSheetName];
    
        // we expect the following columns to be present
        var columns = {
            'A': 'athlete',
            'B': 'age',
            'C': 'country',
            'D': 'year',
            'E': 'date',
            'F': 'sport',
            'G': 'gold',
            'H': 'silver',
            'I': 'bronze',
            'J': 'total'
        };
    
        var rowData = [];
    
        // start at the 2nd row - the first row are the headers
        var rowIndex = 2;
    
        // iterate over the worksheet pulling out the columns we're expecting
        while (worksheet['A' + rowIndex]) {
            var row = {};
            Object.keys(columns).forEach(function(column) {
                row[columns[column]] = worksheet[column + rowIndex].w;
            });
    
            rowData.push(row);
    
            rowIndex++;
        }
    
        // finally, set the imported rowData into the grid
        gridOptions.api.setRowData(rowData);
    }
    
    function importExcel() {
        makeRequest('GET',
            'https://www.ag-grid.com/example-excel-import/OlymicData.xlsx',
            // success
            function (data) {
                var workbook = convertDataToWorkbook(data);
    
                populateGrid(workbook);
            },
            // error
            function (error) {
                throw error;
            }
        );
    }
        
        }

    }
    return link;
});


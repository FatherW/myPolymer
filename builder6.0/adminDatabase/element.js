//var agGrid = window['agGrid'];
//agGrid.initialiseAgGridWithAngular1(angular);
var app = angular.module('demoApp',"agGrid");
    app.directive('adminDatabase', function($compile, $timeout,$mdDialog, $mdToast, $dazzleS3,  $dazzleUser, $dazzlePopup,
    dzFn,dzS3,dbFactory) {
      // Function save$scope.thisPageJson, save$scope.masterJson, saveRootHtml, saveMasterAtom, save$scope.thisPage
      // $scope.thisPage => $scope.pagename
      // $scope.websiteKey => 'website/'+$scope.hostname;

      var adminDashboard = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/adminDatabase/element.html?id=" + new Date().getTime(),
         link: function ($scope, $element, attrs) {
                  $.getJSON( '/json/table.json', function( data ) {
                       $scope.websiteTable = data;
                       $scope.selectedLabel = data[0].label;
                       console.log(data);
                    },function(){
                       $scope.websiteTable = [];
                    });
                    
        },     
        controller: function($scope, $http, $element, $timeout, $ocLazyLoad,$mdSidenav) {
                 $('#dz-pregress').hide();
                $scope.user = store.get('user');
                console.log('User',$scope.user);
                
                function passwordRenderer(params){
                     var value = params.value;
                    return "<dz-fd-password>"+params.value+"</<dz-fd-password>";
                }
                    
                      var columnDefs = [
                            {
                                "editable": true,
                                "cellEditor": "text",
                                "filter": "text",
                                "directive": "text",
                                "directiveName": "文字",
                                "headerName": "uid",
                                "field": "uid",
                                "key": true,
                                "required": true,
                                "default": "",
                                "defaultByTimestamp": false,
                                "width": 200,
                                "setting": "https://d27btag9kamoke.cloudfront.net/backend6.0/text/setting.html"
                            },
                            {
                                "editable": true,
                                "cellEditor": "text",
                                "filter": "text",
                                "directive": "password",
                                "directiveName": "密碼",
                                "headerName": "password",
                                "field": "password",
                                "key": false,
                                "required": false,
                                "cellRenderer": passwordRenderer,
                                "default": "",
                                "defaultByTimestamp": false,
                                "width": 200,
                                "setting": "https://d27btag9kamoke.cloudfront.net/backend6.0/password/setting.html"
                            },
                            {
                                "editable": true,
                                "cellEditor": "select",
                                "filter": "set",
                                "directive": "select",
                                "directiveName": "選項",
                                "cellEditorParams": {
                                    "values": [
                                        "user",
                                        "designer",
                                        "developer",
                                        "admin"
                                    ]
                                },
                                "field": "type",
                                "width": 200,
                                "headerName": "type",
                                "setting": "https://d27btag9kamoke.cloudfront.net/backend6.0/select/setting.html",
                                "key": false,
                                "required": false,
                                "default": "user",
                                "defaultByTimestamp": false
                            },
                            {
                                "editable": true,
                                "cellEditor": "text",
                                "filter": "number",
                                "directive": "number",
                                "directiveName": "數字",
                                "cellRenderer": "text",
                                "mapping": {
                                    "type": "float"
                                },
                                "field": "credit",
                                "width": 200,
                                "headerName": "credit",
                                "setting": "https://d27btag9kamoke.cloudfront.net/backend6.0/number/setting.html",
                                "required": true,
                                "default": "0",
                                "key": false,
                                "defaultByTimestamp": false
                            },

                            {
                                "editable": true,
                                "cellEditor": "timestampEditor",
                                "filter": "number",
                                "directive": "timestamp",
                                "directiveName": "日期時間(timestamp)",
                                "cellRenderer": "timestampRenderer",
                                "mapping": {
                                    "type": "long"
                                },
                                "field": "註冊日期",
                                "headerName": "註冊日期",
                                "setting": "https://d27btag9kamoke.cloudfront.net/backend6.0/timestamp/setting.html",
                                "required": true,
                                "key": false,
                                "default": "",
                                "defaultByTimestamp": false,
                                "width": 200
                            },
                            {
                                "editable": true,
                                "cellEditor": "timestampEditor",
                                "filter": "number",
                                "directive": "timestamp",
                                "directiveName": "日期時間(timestamp)",
                                "cellRenderer": "timestampRenderer",
                                "mapping": {
                                    "type": "long"
                                },
                                "field": "使用限期",
                                "headerName": "使用限期",
                                "setting": "https://d27btag9kamoke.cloudfront.net/backend6.0/timestamp/setting.html",
                                "required": true,
                                "key": false,
                                "default": "",
                                "defaultByTimestamp": false,
                                "width": 200
                            },
                            {
                                "editable": true,
                                "cellEditor": "text",
                                "filter": "text",
                                "directive": "text",
                                "directiveName": "文字",
                                "mapping": {
                                    "type": "keyword"
                                },
                                "headerName": "exportBucket",
                                "field": "exportBucket",
                                "key": false,
                                "required": false,
                                "default": "",
                                "defaultByTimestamp": false,
                                "setting": "https://d27btag9kamoke.cloudfront.net/backend6.0/text/setting.html",
                                "width": 242
                            },
                            {
                                "editable": false,
                                "cellEditor": "tagEditor",
                                "directive": "tag",
                                "directiveName": "標籤",
                                "cellFilterer": "tagFilterer",
                                "cellRenderer": "tagRenderer",
                                "mapping": {
                                    "type": "keyword"
                                },
                                "field": "role",
                                "headerName": "role",
                                "setting": "https://d27btag9kamoke.cloudfront.net/backend6.0/tag/setting.html",
                                "required": true,
                                "default": "unpaid",
                                "key": false,
                                "defaultByTimestamp": false,
                                "width": 200
                            },
                            {
                                "editable": true,
                                "cellEditor": "select",
                                "filter": "set",
                                "directive": "select",
                                "directiveName": "選項",
                                "cellEditorParams": {
                                    "values": [
                                        "free",
                                        "testing",
                                        "unpaid",
                                        "paid",
                                        "expiry",
                                        "suspend",
                                        "remove"
                                    ]
                                },
                                "mapping": {
                                    "type": "keyword"
                                },
                                "field": "status",
                                "headerName": "status",
                                "setting": "https://d27btag9kamoke.cloudfront.net/backend6.0/select/setting.html",
                                "key": false,
                                "required": true,
                                "default": "unpaid",
                                "defaultByTimestamp": false,
                                "width": 200
                            },
                            {
                                "editable": true,
                                "cellEditor": "text",
                                "filter": "number",
                                "directive": "number",
                                "directiveName": "數字",
                                "cellRenderer": "text",
                                "mapping": {
                                    "type": "float"
                                },
                                "field": "yearFee",
                                "headerName": "yearFee",
                                "setting": "https://d27btag9kamoke.cloudfront.net/backend6.0/number/setting.html",
                                "required": true,
                                "default": "1440",
                                "key": false,
                                "defaultByTimestamp": false,
                                "width": 200
                            },
                            {
                                "editable": true,
                                "cellEditor": "text",
                                "filter": "text",
                                "directive": "text",
                                "directiveName": "文字",
                                "mapping": {
                                    "type": "keyword"
                                },
                                "headerName": "subDoaminID",
                                "field": "subDoaminID",
                                "key": true,
                                "required": true,
                                "default": "",
                                "defaultByTimestamp": false,
                                "setting": "https://d27btag9kamoke.cloudfront.net/backend6.0/text/setting.html",
                                "width": 200
                            },
                            {
                                "editable": true,
                                "cellEditor": "text",
                                "filter": "text",
                                "directive": "text",
                                "directiveName": "文字",
                                "mapping": {
                                    "type": "keyword"
                                },
                                "headerName": "websiteUrl",
                                "field": "websiteUrl",
                                "key": false,
                                "required": false,
                                "default": "",
                                "defaultByTimestamp": false,
                                "setting": "https://d27btag9kamoke.cloudfront.net/backend6.0/text/setting.html",
                                "width": 200
                            },
                            {
                                "editable": true,
                                "cellEditor": "text",
                                "filter": "text",
                                "directive": "text",
                                "directiveName": "文字",
                                "mapping": {
                                    "type": "keyword"
                                },
                                "headerName": "address",
                                "field": "address",
                                "key": false,
                                "required": false,
                                "default": "未有地址",
                                "defaultByTimestamp": false,
                                "setting": "https://d27btag9kamoke.cloudfront.net/backend6.0/text/setting.html",
                                "width": 200
                            }
                        ];
                    var rowData = [];
                    var json = {
                        "table":"user",
                        "count":100
                    }
//                     dbFactory.getDatas(json).then(function(data){
//                         rowData = data;
//                         $scope.gridOptions = {
//                             columnDefs: columnDefs,
//                             rowData: rowData,
//                             //angularCompileRows: true,
//                             rowBuffer: 0,
//                             rowSelection: 'multiple',
//                             rowDeselection: true,
//                              rowModelType: 'infinite',
//                             paginationPageSize: 100,
//                              cacheOverflowSize: 2,
//                               maxConcurrentDatasourceRequests: 1,
//                               infiniteInitialRowCount: 1000,
                              
                             
//                         };
                        
//                         var gridDiv = $('#myGrid');
//                         new agGrid.Grid(gridDiv, $scope.gridOptions);
                        
// //                        $compile($('#dzDataPanel'))($scope);

                        
//                     });

//                     var columnDefs = [
//     // this row shows the row index, doesn't use any data from the row
//     {headerName: "ID", width: 50,
//         // it is important to have node.id here, so that when the id changes (which happens
//         // when the row is loaded) then the cell is refreshed.
//         valueGetter: 'node.id',
//         cellRenderer: 'loadingRenderer'
//     },
//     {headerName: "Athlete", field: "athlete", width: 150},
//     {headerName: "Age", field: "age", width: 90},
//     {headerName: "Country", field: "country", width: 120},
//     {headerName: "Year", field: "year", width: 90},
//     {headerName: "Date", field: "date", width: 110},
//     {headerName: "Sport", field: "sport", width: 110},
//     {headerName: "Gold", field: "gold", width: 100},
//     {headerName: "Silver", field: "silver", width: 100},
//     {headerName: "Bronze", field: "bronze", width: 100},
//     {headerName: "Total", field: "total", width: 100}
// ];

$scope.gridOptions = {
    defaultColDef: {
        resizable: true
    },
    components:{
        loadingRenderer: function(params) {
            if (params.value !== undefined) {
                return params.value;
            } else {
                return '<md-progress-circular md-mode="indeterminate"></md-progress-circular>'
            }
        }
    },
    rowBuffer: 0,
    rowSelection: 'multiple',
    rowDeselection: true,
    columnDefs: columnDefs,
    rowModelType: 'infinite',
    paginationPageSize: 100,
    cacheOverflowSize: 2,
    maxConcurrentDatasourceRequests: 1,
    infiniteInitialRowCount: 1000,
    maxBlocksInCache: 10,
    angularCompileRows: true
};
// setup the grid after the page has finished loading
    // var gridDiv = document.querySelector('#myGrid');
    // new agGrid.Grid(gridDiv, gridOptions);
    
    
    $compile($('#dzDataPanel'))($scope);
     var rowData = [];
    var json = {
        "table":"user",
        "count":1000
    }
     dbFactory.getDatas(json).then(function(data){
          var dataSource = {
            rowCount: null, // behave as infinite scroll
            getRows: function (params) {
                console.log('asking for ' + params.startRow + ' to ' + params.endRow);
                // At this point in your code, you would call the server, using $http if in AngularJS 1.x.
                // To make the demo look real, wait for 500ms before returning
                setTimeout( function() {
                    // take a slice of the total rows
                    var rowsThisPage = data.slice(params.startRow, params.endRow);
                    // if on or after the last page, work out the last row.
                    var lastRow = -1;
                    if (data.length <= params.endRow) {
                        lastRow = data.length;
                    }
                    // call the success callback
                    params.successCallback(rowsThisPage, lastRow);
                }, 500);
            }
        };

        $scope.gridOptions.api.setDatasource(dataSource);       
     });


    // agGrid.simpleHttpRequest({url: 'https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json'}).then(function(data) {
    //     var dataSource = {
    //         rowCount: null, // behave as infinite scroll
    //         getRows: function (params) {
    //             console.log('asking for ' + params.startRow + ' to ' + params.endRow);
    //             // At this point in your code, you would call the server, using $http if in AngularJS 1.x.
    //             // To make the demo look real, wait for 500ms before returning
    //             setTimeout( function() {
    //                 // take a slice of the total rows
    //                 var rowsThisPage = data.slice(params.startRow, params.endRow);
    //                 // if on or after the last page, work out the last row.
    //                 var lastRow = -1;
    //                 if (data.length <= params.endRow) {
    //                     lastRow = data.length;
    //                 }
    //                 // call the success callback
    //                 params.successCallback(rowsThisPage, lastRow);
    //             }, 500);
    //         }
    //     };

    //     gridOptions.api.setDatasource(dataSource);
    // });
    
                //   dzS3.getData('table.json').then(function(tableList){
                //       $scope.websiteTable = tableList;
                //   });

                $scope.updateData = function(table){

                        $scope.selectedLabel = table.label;                        

                }
                  $scope.add = function() {
                    dbFactory.getTableList().then(function(tables){
                       angular.forEach(tables,function(item,key){
                           if (item.id==$scope.table.id){
                                alert('資料表ID 已有，請重新輸入');
                                return;                               
                           }
                       }); 
                       $scope.table.data.table = $scope.table.id;
                       tables.push($scope.table);
                       dbFactory.addIndex($scope.table);
                       dbFactory.saveTableList(tables);
                    });
                }

        }
      };
      return adminDashboard;
    });







//});
var app = angular.module('demoApp');

        app.directive('dzLoadDazzleService', function ($compile, $timeout, $uibModal, $mdDialog, $mdToast, $dazzleS3,$dazzleData,$dazzleFn, $dazzleUser, $dazzlePopup,$dazzleInit,$dazzleElastic) {
                 
        
        
            var dzLoadDazzleService = {
                restrict: 'E',
                priority: 1000,
                scope: true,
                templateUrl: "http://d25k6mzsu7mq5l.cloudfront.net/builder6.0/dzLoadDazzleService/element.html?id=" + new Date().getTime(),
                controller: function ($scope, $http, $element) {
                    
                    
                        var that = this;
                        $dazzleElastic.$http = $http;
                        $dazzleElastic.$window = $window;
                        $dazzleElastic.$compile = $compile;
                        $dazzleElastic.$uibModal = $uibModal;
                        $dazzleElastic.$mdDialog = $mdDialog;
                        $dazzleElastic.$mdToast = $mdToast;
                        $dazzleElastic.$mdBottomSheet = $mdBottomSheet;
                        $dazzleElastic.$ocLazyLoad = $ocLazyLoad;
                        $dazzleElastic.$mdDateLocale = $mdDateLocale;
                        $dazzleElastic.$dazzleS3 = $dazzleS3;
                        $dazzleElastic.$dazzlePopup = $dazzlePopup;
                        $dazzleElastic.$dazzleUser = $dazzleUser;
                        $dazzleElastic.$dazzleInit = $dazzleInit;
                        $dazzleElastic.moment = moment;
                        $dazzleElastic.alasql = alasql;
                        $dazzleElastic.table = $dazzleUser.dazzleInfo['thisTable'];
                        $dazzleElastic.tableJson={};
                        var website = $dazzleUser.getDazzleInfo('website');
                        var dataKey='';
            
                        $dazzleElastic.user = $dazzleUser.getUser();
            
                        console.log($dazzleElastic.user);
            
                        var columnDefs = [];
            
                        var rowData = [];
            
            
            
           $dazzleElastic.checkUserIndexExists = function(index,type) {

                return new Promise(function (resolve, reject) {
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "checkIndex",
                            "index": index+"."+ type
                        }
                    }).then(function (result) {
    
                        console.log('dzUser',result);
                        if (result.data.resolve < 0) {
                            resolve(false);
                        } else {
                            resolve(true);
                        }
                    });

                });
            }
            
            $dazzleElastic.createUserIndex = function(index,type) {
                return new Promise(function (resolve, reject) {
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "createIndex",
                            "index":index+"."+user
                        }
                    }).then(function (result) {
                        console.log('dzUser',result);
                        if (result.data.resolve < 0) {
                            reject();
                        } else {
                            resolve();
                        }
                    });

                });                
                
            }
            
            
                         $dazzleElastic.getUserElasticTables = function() {

                                return new Promise(function (resolve, reject) {
                                    console.log('Load DynamoDB Data');
                                    $http({
                                        "method": "post",
                                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                                        "data": {
                                            "action": "searchData",
                                            "index": $dazzleUser.getUser().uid,
                                            "type": "_table",
                                            "body": {"query": {"match_all": {}}}
                                        }
                                    }).then(function (result) {
                                        console.log(result);
                                        if (result.data.code < 0) {
                                            $dazzlePopup.toast(result.data.text + ":" + result.data.reject.msg);
                                            resolve([]);
                                        } else {
                                            if (!Array.isArray(result.data.resolve))
                                                resolve([result.data.resolve]);
                                            else
                                                resolve(result.data.resolve);
                                        }
                                    });
                
                                });
                            }
                        $dazzleElastic.initSettings = function(websiteId,tableName){
                            return new Promise(function (resolve, reject) {
                                that.loadTable(websiteId,tableName).then(function (table) {
                                    console.log('Load Table',table);
                                    that.tableName = tableName;
                                    that.tableJson = table;
                                    $dazzleUser.dazzleInfo['tableJson']=table;
                                    if (angular.isArray(that.tableJson.buttons)) {
                                        for (var i = 0; i < that.tableJson.buttons.length; i++) {
                                            that.loadButton(that.tableJson.buttons[i]);
                                        }
                                    }
            
                                    that.loadSchema(websiteId,tableName).then(function (json) {
                                        that.schemaJson = json;
                                        $dazzleUser.dazzleInfo['schemaJson']=json;
                                        console.log('Schema Json', that.schemaJson);
                                        resolve();
                                    });
                                });
                            });
                        }
            
                        $dazzleElastic.initGrid = function(websiteId,tableName) {
                                that.gridOptions = {
                                    owSelection: 'multiple',
                                    rowHeight: 45,
                                    animateRows: true,
                                    floatingFilter: true,
                                    angularCompileRows: true,
                                    angularCompileFilters: true,
                                    angularCompileHeaders: true,
                                    enableColResize: true,
                                    enableFilter: true,
                                    enableSorting: true,
                                    rowSelection: 'multiple',
                                    rowMultiSelectWithClick: true,
                                    isExternalFilterPresent: function () {
                                        return true;
                                    },
                                    doesExternalFilterPass: function (node) {
                                        if (node.deleted) {
                                            return false;
                                        } else {
                                            return true;
                                        }
                                    },
                                    defaultColDef: {
                                        headerCheckboxSelection: that.isFirstColumn,
                                        checkboxSelection: that.isFirstColumn,
                                        editable: true,
                                        cellEditor: "text",
                                        filter: 'text'
                                    },
                                    onSelectionChanged: function() {
            
                                        var selectedRows = that.gridOptions.api.getSelectedRows();
                                        $dazzleUser.dazzleInfo['selectedRows'] = selectedRows;
                                        console.log(selectedRows);
            
                                    },
                                    columnDefs: columnDefs,
                                    rowData: rowData,
                                    onGridReady: function () {
                                        that.loadTable(websiteId,tableName).then(function (table) {
                                            console.log('Load Table',table);
                                            that.tableName = tableName;
                                            that.tableJson = table;
                                            $dazzleUser.dazzleInfo['tableJson']= table;
                                            if (angular.isArray(that.tableJson.buttons)) {
                                                for (var i = 0; i < that.tableJson.buttons.length; i++) {
                                                    that.loadButton(that.tableJson.buttons[i]);
                                                }
                                            }
                                            that.loadSchema(websiteId,tableName).then(function (json) {
                                                that.schemaJson = json;
                                                console.log('Schema Json',that.schemaJson );
                                                // that.loadNewCell(json).then(function(){
            
                                                // })
                                                that.loadCell(json).then(function () {
                                                    that.gridOptions.api.setColumnDefs(json);
                                                    that.gridOptions.api.refreshView();
                                                    that.loadData().then(function (json) {
                                                        that.gridOptions.api.setRowData(json);
                                                        that.gridOptions.api.refreshView();
                                                        console.log('Table:', that.tableJson);
                                                        console.log('Schema:', that.schemaJson);
                                                        console.log('Data:', json);
                                                        that.refresh();
                                                        $dazzleUser.dazzleInfo['myGrid']  = that.gridOptions;
                                                    });
                                                });
                                            });
                                        });
            //							setTimeout(function () {
            //								that.gridOptions.api.resetRowHeights();
            //							}, 500);
                                    },
                                    onCellEditingStarted: function (event) {
                                        event.$$dazzleElastic.oldValue = event.value;
                                    },
                                    onCellEditingStopped: function (event) {
                                        if (!angular.isUndefined(event.colDef.key) && event.colDef.key) {
                                            that.gridOptions.api.forEachNode(function (rowNode, index) {
                                                if (rowNode.data[event.colDef.field] == event.value && rowNode.rowIndex !== event.rowIndex) {
                                                    event.$$dazzleElastic.rowNode.setDataValue(event.colDef.field, event.$$dazzleElastic.oldValue);
                                                    $dazzlePopup.toast('ERROR: Key already exists');
                                                    return;
                                                }
                                            });
                                        }
                                        if (!angular.isUndefined(event.colDef.required) && event.colDef.required) {
                                            if (!event.value) {
                                                event.$$dazzleElastic.rowNode.setDataValue(event.colDef.field, event.$$dazzleElastic.oldValue);
                                                $dazzlePopup.toast('ERROR: This is required');
                                            }
                                        }
                                    },
                                    onCellFocused: function (event) {
                                        if (event.rowIndex !== null) {
                                            that.gridOptions.api.getModel().rowsToDisplay[event.rowIndex].edited = true;
                                        }
                                    }
                                };
                        }
            
            
            
            
                        $dazzleElastic.getWebsiteJson = function () {
                            $dazzleS3.getJson("dazzle-user-" + $dazzleUser.getUser().uid, "website/" + $dazzleUser.dazzleInfo['websiteId'] + '/json/website.json').then(function (json) {
                                $dazzleElastic.websiteJson = json;
                            });
                        }
                        
                        $dazzleElastic.dbManage = function (table) {
                            //    $dazzlePopup.dataManagement(website.websiteId, table);
                            document.location.href = "index.html#!/myDbManage/"+$dazzleUser.dazzleInfo['websiteId']+"/"+table;
                        }
            
                        $dazzleElastic.listElastic = function (table) {
                            //    $dazzlePopup.dataManagement(website.websiteId, table);
                            document.location.href = "index.html#!/listElastic/"+table;
                        }
            
                        $dazzleElastic.home = function (table) {
                            //    $dazzlePopup.dataManagement(website.websiteId, table);
                            document.location.href = "index.html#!/myWebsite";
                        }
            
            
            
                        $dazzleElastic.loadButton = function (b) {
                            var my$dazzleElastic;
                           my$dazzleElastic = $dazzleUser.dazzleInfo['my$dazzleElastic'];
            //                my$dazzleElastic = $dazzleUser.getRoot$dazzleElastic();
                            console.log('BUtton',b);
                            $ocLazyLoad.load({files: b.js, cache: false}).then(function () {
                                console.log('Button HTML',b.html);
                                var button = angular.element(b.html);
                                angular.element('#customButtons').append(button);
                                $compile(button)(my$dazzleElastic);
                            });
                        }
            
                        $dazzleElastic.editSchema = function () {
            
                            var params = {
                                name: 'dzEditSchemaPopup',
                                directive:'<dz-edit-Schema-popup></dz-edit-Schema-popup>',
                                websiteId: $dazzleUser.dazzleInfo['websiteId'],
                                table: $dazzleUser.dazzleInfo['table'],
                                schema:[],
                                big:true
                            };
            
                            $dazzlePopup.callPopup(params).then(function(newSchema){
                               console.log(newSchema);
                            });
                            // $dazzlePopup.schema($dazzleUser.dazzleInfo['websiteId'], $dazzleElastic.table, false).then(function (newSchema) {
                            //     $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, 'website/' + $dazzleUser.dazzleInfo['websiteId'] + '/' + "content/" + $$dazzleElastic.table + "-schema.json", JSON.parse(angular.toJson(newSchema)));
                            //     $dazzleElastic.schemaJson = newSchema;
                            //     $dazzleElastic.loadCell(newSchema).then(function () {
                            //         $dazzleElastic.gridOptions.api.setColumnDefs(newSchema);
                            //         $dazzleElastic.gridOptions.api.refreshView();
                            //     });
                            // });
                        }
            
                        $dazzleElastic.addTable = function() {
                            var params = {
                                name: "createTablePopup",
                                directive:"<create-table-popup></create-table-popup>",
                                big:true
                            };
            
                            $dazzlePopup.callPopup(params).then(function(output) {
            
                            });
            
            
                        }
            
                        $dazzleElastic.removeTable = function () {
                            var confirm = $mdDialog.confirm().title('刪除資料表').textContent('你真的要刪除此資料表嗎? (注意: 所有資料將會被刪除)').ariaLabel('Lucky day').ok('刪除').cancel('取消');
                            $mdDialog.show(confirm).then(function () {
                                $dazzleS3.removeFile($dazzleUser.dazzleInfo['userBucket'],$dazzleUser.dazzleInfo['websiteKey']+'content/'+$dazzleUser.dazzleInfo['thisTable']+'-table.json').then(function(){
                                    $dazzleS3.removeFile($dazzleUser.dazzleInfo['userBucket'],$dazzleUser.dazzleInfo['websiteKey']+'content/'+$dazzleUser.dazzleInfo['thisTable']+'-schema.json').then(function(){
                                        $dazzleS3.removeFile($dazzleUser.dazzleInfo['userBucket'],$dazzleUser.dazzleInfo['websiteKey']+'content/'+$dazzleUser.dazzleInfo['thisTable']+'-data.json').then(function(){
                                            alert('已刪除資料表');
                                            document.location.href = "index.html#!/myWebsite";
                                        });
                                    });
                                });
                            });
                        }
                        
            
                        $dazzleElastic.loadTable = function (websiteId,tableName) {
                            var table,tableJson,char;
                            return new Promise(function (resolve, reject) {
            
                                if (websiteId =="_master") {
            
                                    var defaulttable = {
                                        "data": {
                                            "type": "dynamodb",
                                            "table":tableName,
                                            "index":$dazzleUser.getUser().uid,
                                            "key":"id"
                                        },
                                        "buttons": []
                                    }
                                    resolve(defaulttable);
                                } else {
            
                                    $http({
                                        "method": "post",
                                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                                        "data": {
                                            "action": "getData",
                                            "index": $dazzleUser.getUser().uid,
                                            "type": "_table",
                                            "id":tableName
                                        }
                                    }).then(function (result) {
                                        console.log(result);
                                        if (result.data.code < 0) {
                                            $dazzlePopup.toast(result.data.text + ":" + result.data.reject.msg);
                                            resolve([]);
                                        } else {
                                            tableJson = {
                                                "data": {
                                                    "type": "dynamodb",
                                                    "index":$dazzleUser.getUser().uid,
                                                    "table":tableName,
                                                    "key":result.data.resolve['key']
                                                },
                                                "buttons": []
                                            }
            
            
                                            console.log('Load Button',result);
                                            angular.forEach(result.data.resolve['button'],function(item,index){
                                                $dazzleElastic.newLoadButton(item);
            
            //                                     var str='';
            //                                     for(i=0;i<item.length;i++) {
            //                                         char = item[i];
            //                                         if (char==char.toUpperCase()) {
            //                                             str = str+"-"+char.toLowerCase();
            //                                             console.log(i);
            //
            // //                                            item.splice(i, 0, "-");
            //                                         } else
            //                                             str = str+char;
            //                                     }
            //                                     console.log('Button',str);
            //                                     tableJson['buttons'].push({
            //                                         "id": item,
            //                                         "html": "<"+str+"></"+str+">",
            //                                         "js": [
            //                                             "https://d25k6mzsu7mq5l.cloudfront.net/backend6.0/"+item+"/directive.js"
            //                                         ]
            //                                     });
            
                                            });
            
                                            resolve(tableJson);
                                        }
                                    });
                                }
                            });
                        }
            
                        $dazzleElastic.newLoadButton = function(item) {
            
                                var str='';
                                var js;
                                // var my$dazzleElastic = $dazzleUser.dazzleInfo['my$dazzleElastic'];
                                var my$dazzleElastic = $root$dazzleElastic.$new();
                                for(i=0;i<item.length;i++) {
                                    char = item[i];
                                    if (char==char.toUpperCase()) {
                                        str = str+"-"+char.toLowerCase();
                                        console.log(i);
                                    } else
                                        str = str+char;
                                }
                                console.log('Button',str);
            
                                js = "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/"+item+"/element.js";
            
                                $ocLazyLoad.load([js], {cache: false}).then(function () {
                                    console.log('Button JS',js);
                                    var button = angular.element("<"+str+"></"+str+">");
                                    angular.element('#customButtons').append(button);
                                    $compile(button)(my$dazzleElastic);
                                });
                        }
            
                        $dazzleElastic.initTable = function () {
                            return new Promise(function (resolve, reject) {
                                $dazzlePopup.toast('正在初始化s3 Table:' + tableName);
                                var table = {
                                    "data": {
                                        "type": "s3"
                                    },
                                    "buttons": []
                                }
                                $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" +$dazzleUser.dazzleInfo['websiteId'] + "/content/" + tableName + "-table.json", table);
                                resolve(table);
                            });
                        }
            
                        $dazzleElastic.checkDynamoTable = function (table) {
                            return new Promise(function (resolve, reject) {
                                $http({
                                    "method": "post",
                                    "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/check",
                                    "data": {
                                        "action": "checkDynamoTable",
                                        "table": table
                                    }
                                }).then(function (result) {
                                    if (result.data.code == 14) {
                                        resolve(result.data.data);
                                    } else {
                                        reject(result.data.text);
                                    }
                                })
                            });
                        }
            
            
                        $dazzleElastic.loadSchema = function (websiteId,tableName) {
                            var item;
                            var json,schema=[],schemaTemplate=[];
            
                            return new Promise(function (resolve, reject) {
            
                                if (websiteId=="_master") {
                                        var filename;
                                        switch (tableName) {
                                            case '_table': filename = '_table-schema.tpl.json'; break;
                                            case '_schema': filename = '_schema-schema.tpl.json'; break;
                                            case '_page': filename = '_page-schema.tpl.json'; break;
                                            case '_atom': filename = '_atom-schema.tpl.json'; break;
                                        }
            
                                        $dazzleS3.getJson('dazzle-template','file6.0/'+filename).then(function (json) {
                                            console.log('My Schema',json);
                                            resolve(json);
                                        }, function () {
                                            resolve([]);
                                        });
                                }else {
            
                                    $http({
                                        "method": "post",
                                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                                        "data": {
                                            "action": "searchData",
                                            "index": $dazzleUser.getUser().uid,
                                            "type": "_schema",
                                            "body":{
                                                "query":{
                                                    "bool":{
                                                        must:[
                                                            {"match":{"websiteId":websiteId}},
                                                            {"match":{"tableId":tableName}}
                                                        ]
                                                    }
                                                },
                                                "sort":[
                                                    {
                                                        "order": {"order" : "asc"}
                                                    }
                                                ]
                                            }
                                        }
                                    }).then(function (result) {
                                        console.log('Schema',result);
                                        if (result.data.code < 0) {
                                            $dazzlePopup.toast(result.data.text + ":" + result.data.reject.msg);
                                            resolve([]);
                                        } else {
                                            json = result.data.resolve;
                                            schema=[];
                                            angular.forEach(json,function(item,index){
                                                var key,cell;
                                                if (item['order']=="0")
                                                    key = true;
                                                else
                                                    key = false;
            
                                                     cell = {
                                                        "editable": true,
                                                        "cellEditor": item['directive']+"Editor",
                                                        "cellRenderer": item['directive']+"Renderer",
                                                        "filter": item['directive']+"Filter",
                                                        "directive": item['directive'],
                                                        "directiveName": item['directive'],
                                                        "headerName": item['fieldName'],
                                                        "field": item['fieldName'],
                                                        "key": key,
                                                        "default": "",
                                                        "defaultByTimestamp": false,
                                                        "width": 200
                                                    };
                                                     schema.push(cell);
            
                                            });
                                             resolve(schema);
                                        }
                                    });
                                }
                            });
                        };
            
                        // $dazzleElastic.loadSchema = function (tableName) {
                        //     switch (tableName) {
                        //         case '_table': that.filename = '_table-schema.tpl.json'; break;
                        //         case '_schema': that.filename = '_schema-schema.tpl.json'; break;
                        //         case '_page': that.filename = '_page-schema.tpl.json'; break;
                        //         case '_atom': that.filename = '_atom-schema.tpl.json'; break;
                        //     }
                        //
                        //     return new Promise(function (resolve, reject) {
                        //         console.log('Schema File','dazzle-template','file6.0/'+that.filename);
                        //         $dazzleS3.getJson('dazzle-template','file6.0/'+that.filename).then(function (json) {
                        //         //$dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $dazzleUser.dazzleInfo['websiteId'] + "/content/" + $$dazzleElastic.table + "-schema.json").then(function (json) {
                        //             console.log('My Schema',json);
                        //             resolve(json);
                        //         }, function () {
                        //             //$dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $dazzleUser.dazzleInfo['websiteId'] + "/content/" + $$dazzleElastic.table + "-schema.json", []);
                        //             resolve([]);
                        //         });
                        //     });
                        // };
            
                        $dazzleElastic.loadData = function () {
                            return new Promise(function (resolve, reject) {
                                    console.log('Load DynamoDB Data');
                                    console.log('Load Data',$dazzleUser.getUser().uid,that.tableName,that.tableJson);
                                    $http({
                                        "method": "post",
                                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                                        "data": {
                                            "action": "searchData",
                                            "index": $dazzleUser.getUser().uid,
                                            "type": that.tableName,
                                            "body": {"query": {"match_all": {}}}
                                        }
                                    }).then(function (result) {
                                        console.log(result);
                                        if (result.data.code < 0) {
                                            $dazzlePopup.toast(result.data.text + ":" + result.data.reject.msg);
                                            resolve([]);
                                        } else {
                                            that.dataLength = result.data.resolve.length;
                                            resolve(result.data.resolve);
                                        }
                                    });
            
                            });
                        };
            
                        $dazzleElastic.loadNewCell = function(schema){
                            return new Promise(function(resolve,reject){
            
                            });
                        }
                        $dazzleElastic.loadCell = function (schema) {
                            return new Promise(function (resolve, reject) {
                                for (var i = 0; i < schema.length; i++) {
                                    if (schema[i].key)
                                        dataKey = schema[i].field;
            
                                    if (!angular.isUndefined(schema[i].jsId)) {
                                        $dazzleElastic.setCellJs(schema[i]);
                                    }
                                    if (!angular.isUndefined(schema[i].cellEditor)) {
                                        $dazzleElastic.setCellEditor(schema[i]);
                                    }
                                    if (!angular.isUndefined(schema[i].cellRenderer)) {
                                        $dazzleElastic.setCellRenderer(schema[i]);
                                    }
                                    if (!angular.isUndefined(schema[i].cellFilter)) {
                                        $dazzleElastic.setCellFilter(schema[i]);
                                    }
                                    if (!angular.isUndefined(schema[i].cellFilterer)) {
                                        $dazzleElastic.setCellFilterer(schema[i]);
                                    }
                                }
                                setTimeout(function () {
                                    resolve();
                                }, 1000);
                            });
                        }
            
                        $dazzleElastic.setCellJs = function (schema) {
                            $ocLazyLoad.load("https://d25k6mzsu7mq5l.cloudfront.net/backend6.0/" + schema.directive + "/js/" + schema.jsId + '.js', {cache: false});
                        }
            
                        $dazzleElastic.setCellFilterer = function (schema) {
                            $ocLazyLoad.load("https://d25k6mzsu7mq5l.cloudfront.net/backend6.0/" + schema.directive + "/" + schema.cellFilterer + ".js", {cache: false}).then(function () {
                                schema.filter = window[schema.cellFilterer];
                            });
                        }
            
                        $dazzleElastic.setCellFilter = function (schema) {
                            $ocLazyLoad.load("https://d25k6mzsu7mq5l.cloudfront.net/backend6.0/" + schema.directive + "/" + schema.cellFilter + ".js", {cache: false}).then(function () {
                                schema.filterParams = window[schema.cellFilter];
                            });
                        }
            
                        $dazzleElastic.setCellEditor = function (schema) {
                            $ocLazyLoad.load("https://d25k6mzsu7mq5l.cloudfront.net/backend6.0/" + schema.directive + "/" + schema.cellEditor + ".js", {cache: false}).then(function () {
                                that.gridOptions.api.cellEditorFactory.addCellEditor(schema.cellEditor, window[schema.cellEditor]);
                            });
                        }
            
                        $dazzleElastic.setCellRenderer = function (schema) {
                            $ocLazyLoad.load("https://d25k6mzsu7mq5l.cloudfront.net/backend6.0/" + schema.directive + "/" + schema.cellRenderer + ".js", {cache: false}).then(function () {
                                that.gridOptions.api.cellRendererFactory.addCellRenderer(schema.cellRenderer, window[schema.cellRenderer]);
                            });
                        }
            
            
                        $dazzleElastic.referAdd = function (object) {
                            console.log('Open Data Select');
                            $dazzlePopup.dataSelect($dazzleElastic.website, $dazzleElastic.table).then(function (data) {
            
                            });
            
                        }
            
                        $dazzleElastic.addFilter = function (filter) {
                            this.filter = filter;
                            this.gridOptions.api.onFilterChanged();
                        }
            
                        $dazzleElastic.add = function (object) {
                            if ($dazzleElastic.modelType == "refer") {
                                $dazzlePopup.dataSelect($dazzleElastic.website, $dazzleElastic.table);
                            } else {
                                var date = new Date().getTime().toString();
                                var newObject = {};
                                if (object) {
                                    newObject = object;
                                }
                                if ($dazzleElastic.tableJson.data.type === 'dynamodb') {
                                    newObject[$dazzleElastic.tableJson.data.key] = date;
                                }
                                for (var i = 0; i < $dazzleElastic.schemaJson.length; i++) {
                                    if ($dazzleElastic.schemaJson[i].defaultByTimestamp) {
                                        newObject[$dazzleElastic.schemaJson[i].field] = $dazzleElastic.schemaJson[i].default + date;
                                    } else if ($dazzleElastic.schemaJson[i].default) {
                                        newObject[$dazzleElastic.schemaJson[i].field] = $dazzleElastic.schemaJson[i].default;
                                    }
                                }
                                $dazzleElastic.gridOptions.api.updateRowData({add: [newObject], addIndex: 0});
                                $dazzleElastic.dataLength++;
                                $dazzleElastic.gridOptions.api.refreshInMemoryRowModel();
                                $dazzleElastic.gridOptions.api.getModel().rowsToDisplay[0].edited = true;
                            }
                        }
            
                        $dazzleElastic.addRecord = function (object) {
                            var date = new Date().getTime().toString();
            
                            var newObject = {};
                            if (object) {
                                newObject = object;
                            }
            
                            for (var i = 0; i < that.schemaJson.length; i++) {
                                if (that.schemaJson[i].defaultByTimestamp) {
                                    newObject[that.schemaJson[i].field] = date;
                                }
                                // else if ($$dazzleElastic.schemaJson[i].default) {
                                //     newObject[$$dazzleElastic.schemaJson[i].field] = $$dazzleElastic.schemaJson[i].default;
                                // }
            
                            }
                            that.gridOptions.api.updateRowData({add: [newObject], addIndex: 0});
                            that.dataLength++;
                            that.gridOptions.api.refreshInMemoryRowModel();
                            that.gridOptions.api.getModel().rowsToDisplay[0].edited = true;
                        }
            
                        $dazzleElastic.remove = function () {
                            var nodes = $dazzleElastic.gridOptions.api.getSelectedNodes();
                            for (var i = 0; i < nodes.length; i++) {
                                nodes[i].deleted = true;
                            }
                            $dazzleElastic.gridOptions.api.onFilterChanged();
                        }
            
                        $dazzleElastic.refresh = function () {
                //                $$dazzleElastic.loadSchema().then(function (json) {
                            //                   $$dazzleElastic.schemaJson = json;
                            console.log('Start refresh',$dazzleElastic.schemaJson);
                            $dazzleElastic.loadCell($dazzleElastic.schemaJson).then(function () {
                                console.log('Load Cell',$dazzleElastic.schemaJson);
                                $dazzleElastic.gridOptions.api.setColumnDefs($dazzleElastic.schemaJson);
                                $dazzleElastic.loadData().then(function (json) {
                                    $dazzleElastic.gridOptions.api.setRowData(json);
                                    $dazzleElastic.gridOptions.api.refreshView();
                                    console.log('Finish Refresh');
                                });
                            });
            
                            //               });
                        }
            
                        $dazzleElastic.isFirstColumn = function (params) {
                            var displayedColumns = params.columnApi.getAllDisplayedColumns();
                            var $dazzleElasticIsFirstColumn = displayedColumns[0] === params.column;
                            return $dazzleElasticIsFirstColumn;
                        }
            
                        $dazzleElastic.cancel = function () {
                            $mdDialog.hide($dazzleElastic.lastUpdated);
                        }
            
                        $dazzleElastic.save = function () {
                            return new Promise(function (resolve, reject) {
                                $dazzleElastic.saveSchema();
                                $dazzleElastic.getData().then(function (result) {
                                    $dazzleElastic.saveData(result).then(function () {
                                        $dazzlePopup.toast('儲存成功');
                                        resolve(result);
                                    });
                                });
                            });
                        }
            			
                        $dazzleElastic.saveSchema = function () {
                            var newShcema = [];
                            var oldSchema = $dazzleElastic.gridOptions.columnApi.getAllGridColumns();
                            for (var i = 0; i < oldSchema.length; i++) {
                                oldSchema[i].colDef.width = oldSchema[i].actualWidth;
                                for (var obj in oldSchema[i].colDef) {
                                    if (obj !== 'headerCheckboxSelection' && obj !== 'checkboxSelection' && Object.prototype.toString.call(oldSchema[i].colDef[obj]) == '[object Function]') {
                                        delete oldSchema[i].colDef[obj];
                                    }
                                }
                                newShcema.push(oldSchema[i].colDef);
                            }
                            $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + website + "/content/" + $dazzleElastic.table + "-schema.json", JSON.parse(angular.toJson(newShcema)));
                            $dazzleElastic.schemaJson = newShcema;
                        }
            
                        $dazzleElastic.saveData = function (data) {
                            return new Promise(function (resolve, reject) {
                                console.log("Data:",data);
                                console.log("TableJson:",$dazzleElastic.tableJson);
                                if ($dazzleElastic.tableJson.data.type === 's3') {
                                    //console.log('save to s3');
                                    $dazzleElastic.gridOptions.api.removeItems(data.deleted);
                                    $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $dazzleUser.dazzleInfo['websiteId'] + "/content/" + $$dazzleElastic.table + "-data.json", JSON.parse(angular.toJson(data.rows))).then(function () {
                                        resolve();
                                    });
                                } else if ($dazzleElastic.tableJson.data.type === 'dynamodb') {
                                    var params = [];
                                    for (var i = 0; i < data.deleted.length; i++) {
                                        var dataObject = JSON.parse(angular.toJson(data.deleted[i].data));
                                        params.push({
                                            "delete": {
                                                _index: $dazzleElastic.tableJson.data.index+'.'+$dazzleElastic.tableJson.data.table.toLowerCase() || 'dazzle',
                                                _type: '_doc',
                                                _id: dataObject[$dazzleElastic.tableJson.data.key]
                                            }
                                        });
                                    }
                                    console.log("Params:",params);
                                    if (!data.edited.length){
                                        $dazzleElastic.bulkUpdateData(params).then(function(){
                                            resolve();
                                        },function(err){
                                            reject();
                                        });
                                    }
                                    var count = 0;
                                    for (var i = 0; i < data.edited.length; i++) {
            
                                        console.log($dazzleElastic.tableJson);
                                        
            
                                        var dataObject = JSON.parse(angular.toJson(data.edited[i].data));
                                        $dazzleElastic.clean(dataObject);
            
                                        $dazzleElastic.checkExist($dazzleElastic.tableJson.data,dataObject).then(function(result){
                                                params.push({
                                                    "update": {
                                                        _index: $dazzleElastic.tableJson.data.index+'.'+$dazzleElastic.tableJson.data.table.toLowerCase() || 'dazzle',
                                                        _type: '_doc',
                                                        _id: result[$dazzleElastic.tableJson.data.key]
                                                    }
                                                });
                                                params.push({
                                                    "doc": result
                                                });
                                                count++;
                                                if(count == data.edited.length){
                                                    $dazzleElastic.bulkUpdateData(params).then(function(){
                                                        resolve();
                                                    },function(err){
                                                        reject();
                                                    });                                
                                                }
                                        },function(err){
                                                params.push({
                                                    "create": {
                                                        _index: $dazzleElastic.tableJson.data.index+'.'+$dazzleElastic.tableJson.data.table.toLowerCase() || 'dazzle',
                                                        _type: '_doc',
                                                        _id: err[$dazzleElastic.tableJson.data.key]
                                                    }
                                                });
                                                params.push(err);
                                                count++;
                                                if(count == data.edited.length){
                                                    $dazzleElastic.bulkUpdateData(params).then(function(){
                                                        resolve();
                                                    },function(err){
                                                        reject();
                                                    });                                
                                                }
                                        });
                                    }
                                    
                                }
                            })
                        }
            
                        $dazzleElastic.checkExist = function (tableJson,data) {
                            return new Promise(function (resolve, reject) {
                                $dazzleData.loadElasticRecordById(tableJson.index,tableJson.table,data[tableJson.key]).then(function(record){
                                    resolve(data);
                                },function(err){
                                    reject(data);
                                });
                            });
                        }
            
                        $dazzleElastic.bulkUpdateData = function (params) {
                            console.log('Params',params);
                            return new Promise(function (resolve, reject) {
                                $http({
                                    "method": "post",
                                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                                    "data": {
                                        "action": "bulkData",
                                        "body": params
                                    }
                                }).then(function (result) {
                                    console.log(result);
                                    $dazzleElastic.created = [];
                                    if (result.data.code > 0) {
                                        resolve();
                                    } else {
                                        console.log('Error',result.data.text + ":" + result.data.err.code);
                                        $dazzlePopup.toast(result.data.text + ":" + result.data.err.code);
                                        reject();
                                    }
                                });
                            });
                        }
            
                        $dazzleElastic.getData = function () {
                            return new Promise(function (resolve, reject) {
                                var nodes = [];
                                var rows = [];
                                var edited = [];
                                var deleted = [];
                                $dazzleElastic.gridOptions.api.forEachNode(function (node) {
                                    nodes.push(node);
                                    if (node.deleted == true) {
                                        deleted.push(node);
                                    } else {
                                        if (node.edited == true) {
                                            edited.push(node);
                                        }
                                        rows.push(node.data);
                                    }
                                });
            
                                resolve({
                                    "nodes": nodes,
                                    "rows": rows,
                                    "edited": edited,
                                    "deleted": deleted
                                });
                            })
                        }
            
            
                        
            
                        $dazzleElastic.import = function () {
                            if (!$dazzleElastic.fileChooser) {
                                $dazzleElastic.fileChooser = document.createElement('input');
                                $dazzleElastic.fileChooser.setAttribute("type", "file");
                                $dazzleElastic.fileChooser.style.display = "none";
                                $dazzleElastic.fileChooser.addEventListener('change', function (event) {
                                    var file = $dazzleElastic.files[0];
                                    alasql('SELECT * FROM FILE(?,{headers:true})', [event], function (data) {
                                        $dazzleElastic.gridOptions.api.setRowData(data);
                                        $dazzleElastic.gridOptions.api.refreshView();
                                        $dazzleElastic.gridOptions.api.forEachNode(function (node) {
                                            node.edited = true;
                                        });
                                    });
                                });
                            }
                            $dazzleElastic.fileChooser.click();
                        }
            
                        
                        $dazzleElastic.export = function () {
                            // var rowData = [];
                            // that.gridOptions.api.forEachNode(function (node) {
                            //     rowData.push(node.data);
                            // });
                            // that.alasql('SELECT * INTO XLSX("' + $dazzleElastic.table + '.xlsx",{headers:true}) FROM ?', [rowData]);
            
            
            
                            var params = {
                                skipHeader: false,
                                columnGroups: false,
                                skipFooters: true,
                                skipGroups: true,
                                skipPinnedTop: true,
                                skipPinnedBottom:true,
                                allColumns: true,
                                onlySelected: false,
                                fileName: 'export.xls',
                                sheetName: 'export'
                            };
            
            
                            that.gridOptions.api.exportDataAsExcel(params);
            
                        }
            
                        $dazzleElastic.isObject = function (item) {
                            return (typeof item === "object" && !Array.isArray(item) && item !== null);
                        }
            
                        $dazzleElastic.clean = function (obj) {
                            for (var propName in obj) {
                                if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
                                    delete obj[propName];
                                }
                            }
                        }
                    

                }
            };
            return dzLoadDazzleService;
        }); 

 


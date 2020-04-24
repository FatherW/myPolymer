var dazzle = angular.module("dazzle");


dazzle.service("$dazzleElastic", function ($window, $http, $compile, $uibModal, $mdDialog, $mdToast, $mdBottomSheet, $ocLazyLoad, $mdDateLocale, $dazzleS3, $dazzlePopup, $dazzleUser,$dazzleData) {
    
    var scope = this;
    var that = this;
    scope.$http = $http;
    scope.$window = $window;
    scope.$compile = $compile;
    scope.$mdDialog = $mdDialog;
    scope.$mdToast = $mdToast;
    scope.$mdBottomSheet = $mdBottomSheet;
    scope.$ocLazyLoad = $ocLazyLoad;
    scope.$mdDateLocale = $mdDateLocale;
    scope.$dazzleS3 = $dazzleS3;
    scope.$dazzlePopup = $dazzlePopup;
    scope.$dazzleUser = $dazzleUser;
    scope.$dazzleInit = $dazzleInit;
    scope.moment = moment;
    scope.alasql = alasql;
    scope.table = $dazzleUser.dazzleInfo['thisTable'];
    scope.tableJson={};
    var website = $dazzleUser.getDazzleInfo('website');
    var dataKey='';

    scope.user = $dazzleUser.getUser();

    console.log(scope.user);

    var columnDefs = [];

    var rowData = [];
    var user = store.get('user');


                scope.checkUserIndexExists= function(index,type) {

                    return new Promise(function (resolve, reject) {
                        $http({
                            "method": "post",
                            "url": "https://d8u48dml7g5f6.cloudfront.net",
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

                scope.createUserIndex =function(index,type) {
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
    scope.initSettings = function(websiteId,tableName){
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

    scope.dzGetTable = function(){
        return new Promise(function (resolve, reject) {
            $dazzleS3.getJson(user['exportBucket'],'admin/'+user['uid']+'/content/table.json').then(function(json){
                resolve(json);
            });
        });
    }

                scope.dzInitGrid = function(tableName) {
                    var websiteId = user['exportBucket'];
                    that.gridOptions = {
                        rowSelection: 'multiple',
                        rowHeight: 45,
                        animateRows: true,
                        floatingFilter: true,
                        angularCompileRows: true,
                        angularCompileFilters: true,
                        angularCompileHeaders: true,
                        enableColResize: true,
                        enableFilter: true,
                        enableSorting: true,
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
                            that.dzLoadTable(websiteId,tableName).then(function (table) {
                                console.log('Load Table',table);
                                that.tableName = tableName;
                                that.tableJson = table;
                                $dazzleUser.dazzleInfo['tableJson']= table;
                                if (angular.isArray(that.tableJson.buttons)) {
                                    for (var i = 0; i < that.tableJson.buttons.length; i++) {
                                        that.loadButton(that.tableJson.buttons[i]);
                                    }
                                }
                                that.dzLoadSchema(websiteId,tableName).then(function (json) {
                                    that.schemaJson = json;
                                    console.log('Schema Json',that.schemaJson );
                                    // that.loadNewCell(json).then(function(){

                                    // })
                                    that.loadCell(json).then(function () {
                                        that.gridOptions.api.setColumnDefs(json);
                                        that.gridOptions.api.refreshView();
                                        that.dzLoadData().then(function (json) {
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
                            event.$scope.oldValue = event.value;
                        },
                        onCellEditingStopped: function (event) {
                            if (!angular.isUndefined(event.colDef.key) && event.colDef.key) {
                                that.gridOptions.api.forEachNode(function (rowNode, index) {
                                    if (rowNode.data[event.colDef.field] == event.value && rowNode.rowIndex !== event.rowIndex) {
                                        event.$scope.rowNode.setDataValue(event.colDef.field, event.$scope.oldValue);
                                        $dazzlePopup.toast('ERROR: Key already exists');
                                        return;
                                    }
                                });
                            }
                            if (!angular.isUndefined(event.colDef.required) && event.colDef.required) {
                                if (!event.value) {
                                    event.$scope.rowNode.setDataValue(event.colDef.field, event.$scope.oldValue);
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

    scope.initGrid = function(websiteId,tableName) {
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
                event.$scope.oldValue = event.value;
            },
            onCellEditingStopped: function (event) {
                if (!angular.isUndefined(event.colDef.key) && event.colDef.key) {
                    that.gridOptions.api.forEachNode(function (rowNode, index) {
                        if (rowNode.data[event.colDef.field] == event.value && rowNode.rowIndex !== event.rowIndex) {
                            event.$scope.rowNode.setDataValue(event.colDef.field, event.$scope.oldValue);
                            $dazzlePopup.toast('ERROR: Key already exists');
                            return;
                        }
                    });
                }
                if (!angular.isUndefined(event.colDef.required) && event.colDef.required) {
                    if (!event.value) {
                        event.$scope.rowNode.setDataValue(event.colDef.field, event.$scope.oldValue);
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




    scope.getWebsiteJson = function () {
        $dazzleS3.getJson("dazzle-user-" + $dazzleUser.getUser().uid, "website/" + $dazzleUser.dazzleInfo['websiteId'] + '/json/website.json').then(function (json) {
            scope.websiteJson = json;
        });
    }

    scope.dbManage = function (table) {
        //    $dazzlePopup.dataManagement(website.websiteId, table);
        document.location.href = "index.html#!/myDbManage/"+$dazzleUser.dazzleInfo['websiteId']+"/"+table;
    }

    scope.listElastic = function (table) {
        //    $dazzlePopup.dataManagement(website.websiteId, table);
        document.location.href = "index.html#!/listElastic/"+table;
    }

    scope.home = function (table) {
        //    $dazzlePopup.dataManagement(website.websiteId, table);
        document.location.href = "index.html#!/myWebsite";
    }



    scope.loadButton = function (b) {
        var myScope;
        myScope = $dazzleUser.dazzleInfo['myScope'];
//                myScope = $dazzleUser.getRootScope();
        console.log('BUtton',b);
        $ocLazyLoad.load({files: b.js, cache: false}).then(function () {
            console.log('Button HTML',b.html);
            var button = angular.element(b.html);
            angular.element('#customButtons').append(button);
            $compile(button)(myScope);
        });
    }

    scope.editSchema = function () {

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

    }

    scope.addTable = function() {
        var params = {
            name: "createTablePopup",
            directive:"<create-table-popup></create-table-popup>",
            big:true
        };

        $dazzlePopup.callPopup(params).then(function(output) {

        });


    }

    scope.removeTable = function () {
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

    scope.dzLoadTable = function (websiteId,tableName) {

        var item;
        var json,schema=[],schemaTemplate=[];
        var user = $dazzleUser.getUser();
        console.log(user['exportBucket'],'admin/'+user['uid']+'/content/'+tableName+'-table.json');
        return new Promise(function (resolve, reject) {
            $dazzleS3.getJson(user['exportBucket'],'admin/'+user['uid']+'/content/'+tableName+'-table.json').then(function(json){
                angular.forEach(json['button'],function(item,index){
                    scope.newLoadButton(item);
                });
                resolve(json);
            },function(err){
                resolve([]);
            });
        });

    }

    scope.loadTable = function (websiteId,tableName) {
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
                            scope.newLoadButton(item);



                        });

                        resolve(tableJson);
                    }
                });
            }
        });
    }

    scope.newLoadButton = function(item) {

        var str='';
        var js;
        // var myScope = $dazzleUser.dazzleInfo['myScope'];
        var myScope = $rootScope.$new();
        for(i=0;i<item.length;i++) {
            char = item[i];
            if (char==char.toUpperCase()) {
                str = str+"-"+char.toLowerCase();
                console.log(i);
            } else
                str = str+char;
        }
        console.log('Button',str);

        js = "https://d27btag9kamoke.cloudfront.net/builder6.0/"+item+"/element.js";

        $ocLazyLoad.load([js], {cache: false}).then(function () {
            console.log('Button JS',js);
            var button = angular.element("<"+str+"></"+str+">");
            angular.element('#customButtons').append(button);
            $compile(button)(myScope);
        });
    }

    scope.initTable = function () {
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

    scope.checkDynamoTable = function (table) {
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
    scope.dzLoadSchema = function (websiteId,tableName) {
        var item;
        var json,schema=[],schemaTemplate=[];
        var user = $dazzleUser.getUser();
        console.log(user['exportBucket'],'admin/'+user['uid']+'/content/'+tableName+'-schema.json');

        return new Promise(function (resolve, reject) {
                $dazzleS3.getJson(user['exportBucket'],'admin/'+user['uid']+'/content/'+tableName+'-schema.json').then(function(json){
                    resolve(json);
                },function(err){
                    resolve([]);
                });
        });
    };

    scope.loadSchema = function (websiteId,tableName) {
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

    scope.dzLoadData = function () {

        console.log(user['exportBucket'],'admin/'+user['uid']+'/content/'+that.tableName+'-data.json');
        return new Promise(function (resolve, reject) {
            $dazzleS3.getJson(user['exportBucket'],'admin/'+user['uid']+'/content/'+that.tableName+'-data.json').then(function(json){
                console.log(json);
                resolve(json);
            },function(err){
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


        });
    };
    scope.loadData = function () {
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

    scope.loadNewCell = function(schema){
        return new Promise(function(resolve,reject){

        });
    }
    scope.loadCell = function (schema) {
        return new Promise(function (resolve, reject) {
            for (var i = 0; i < schema.length; i++) {
                if (schema[i].key)
                    dataKey = schema[i].field;

                if (!angular.isUndefined(schema[i].jsId)) {
                    scope.setCellJs(schema[i]);
                }
                if (!angular.isUndefined(schema[i].cellEditor)) {
                    scope.setCellEditor(schema[i]);
                }
                if (!angular.isUndefined(schema[i].cellRenderer)) {
                    scope.setCellRenderer(schema[i]);
                }
                if (!angular.isUndefined(schema[i].cellFilter)) {
                    scope.setCellFilter(schema[i]);
                }
                if (!angular.isUndefined(schema[i].cellFilterer)) {
                    scope.setCellFilterer(schema[i]);
                }
            }
            setTimeout(function () {
                resolve();
            }, 1000);
        });
    }

    scope.setCellJs = function (schema) {
        $ocLazyLoad.load("https://d25k6mzsu7mq5l.cloudfront.net/backend6.0/" + schema.directive + "/js/" + schema.jsId + '.js', {cache: false});
    }

    scope.setCellFilterer = function (schema) {
        $ocLazyLoad.load("https://d25k6mzsu7mq5l.cloudfront.net/backend6.0/" + schema.directive + "/" + schema.cellFilterer + ".js", {cache: false}).then(function () {
            schema.filter = window[schema.cellFilterer];
        });
    }

    scope.setCellFilter = function (schema) {
        $ocLazyLoad.load("https://d25k6mzsu7mq5l.cloudfront.net/backend6.0/" + schema.directive + "/" + schema.cellFilter + ".js", {cache: false}).then(function () {
            schema.filterParams = window[schema.cellFilter];
        });
    }

    scope.setCellEditor = function (schema) {
        $ocLazyLoad.load("https://d25k6mzsu7mq5l.cloudfront.net/backend6.0/" + schema.directive + "/" + schema.cellEditor + ".js", {cache: false}).then(function () {
            that.gridOptions.api.cellEditorFactory.addCellEditor(schema.cellEditor, window[schema.cellEditor]);
        });
    }

    scope.setCellRenderer = function (schema) {
        $ocLazyLoad.load("https://d25k6mzsu7mq5l.cloudfront.net/backend6.0/" + schema.directive + "/" + schema.cellRenderer + ".js", {cache: false}).then(function () {
            that.gridOptions.api.cellRendererFactory.addCellRenderer(schema.cellRenderer, window[schema.cellRenderer]);
        });
    }


    scope.referAdd = function (object) {
        console.log('Open Data Select');
        $dazzlePopup.dataSelect(scope.website, scope.table).then(function (data) {

        });

    }

    scope.addFilter = function (filter) {
        this.filter = filter;
        this.gridOptions.api.onFilterChanged();
    }

    scope.add = function (object) {
        if (scope.modelType == "refer") {
            $dazzlePopup.dataSelect(scope.website, scope.table);
        } else {
            var date = new Date().getTime().toString();
            var newObject = {};
            if (object) {
                newObject = object;
            }
            if (scope.tableJson.data.type === 'dynamodb') {
                newObject[scope.tableJson.data.key] = date;
            }
            for (var i = 0; i < scope.schemaJson.length; i++) {
                if (scope.schemaJson[i].defaultByTimestamp) {
                    newObject[scope.schemaJson[i].field] = scope.schemaJson[i].default + date;
                } else if (scope.schemaJson[i].default) {
                    newObject[scope.schemaJson[i].field] = scope.schemaJson[i].default;
                }
            }
            scope.gridOptions.api.updateRowData({add: [newObject], addIndex: 0});
            scope.dataLength++;
            scope.gridOptions.api.refreshInMemoryRowModel();
            scope.gridOptions.api.getModel().rowsToDisplay[0].edited = true;
        }
    }

    scope.addRecord = function (object) {
        var date = new Date().getTime().toString();

        var newObject = {};
        if (object) {
            newObject = object;
        }

        for (var i = 0; i < that.schemaJson.length; i++) {
            if (that.schemaJson[i].defaultByTimestamp) {
                newObject[that.schemaJson[i].field] = date;
            }
            // else if ($scope.schemaJson[i].default) {
            //     newObject[$scope.schemaJson[i].field] = $scope.schemaJson[i].default;
            // }

        }
        that.gridOptions.api.updateRowData({add: [newObject], addIndex: 0});
        that.dataLength++;
        that.gridOptions.api.refreshInMemoryRowModel();
        that.gridOptions.api.getModel().rowsToDisplay[0].edited = true;
    }

    scope.remove = function () {
        var nodes = scope.gridOptions.api.getSelectedNodes();
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].deleted = true;
        }
        scope.gridOptions.api.onFilterChanged();
    }

    scope.refresh = function () {
        //                $scope.loadSchema().then(function (json) {
        //                   $scope.schemaJson = json;
        console.log('Start refresh',scope.schemaJson);
        scope.loadCell(scope.schemaJson).then(function () {
            console.log('Load Cell',scope.schemaJson);
            scope.gridOptions.api.setColumnDefs(scope.schemaJson);
            scope.loadData().then(function (json) {
                scope.gridOptions.api.setRowData(json);
                scope.gridOptions.api.refreshView();
                console.log('Finish Refresh');
            });
        });

        //               });
    }

    scope.isFirstColumn = function (params) {
        var displayedColumns = params.columnApi.getAllDisplayedColumns();
        var scopeIsFirstColumn = displayedColumns[0] === params.column;
        return scopeIsFirstColumn;
    }

    scope.cancel = function () {
        $mdDialog.hide(scope.lastUpdated);
    }

    scope.save = function () {
        return new Promise(function (resolve, reject) {
            scope.saveSchema();
            scope.getData().then(function (result) {
                scope.saveData(result).then(function () {
                    $dazzlePopup.toast('儲存成功');
                    resolve(result);
                });
            });
        });
    }

    scope.saveSchema = function () {
        var newShcema = [];
        var oldSchema = scope.gridOptions.columnApi.getAllGridColumns();
        for (var i = 0; i < oldSchema.length; i++) {
            oldSchema[i].colDef.width = oldSchema[i].actualWidth;
            for (var obj in oldSchema[i].colDef) {
                if (obj !== 'headerCheckboxSelection' && obj !== 'checkboxSelection' && Object.prototype.toString.call(oldSchema[i].colDef[obj]) == '[object Function]') {
                    delete oldSchema[i].colDef[obj];
                }
            }
            newShcema.push(oldSchema[i].colDef);
        }
        $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + website + "/content/" + scope.table + "-schema.json", JSON.parse(angular.toJson(newShcema)));
        scope.schemaJson = newShcema;
    }

    scope.saveData = function (data) {
        return new Promise(function (resolve, reject) {
            console.log("Data:",data);
            console.log("TableJson:",scope.tableJson);
            if (scope.tableJson.data.type === 's3') {
                //console.log('save to s3');
                scope.gridOptions.api.removeItems(data.deleted);
                $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $dazzleUser.dazzleInfo['websiteId'] + "/content/" + $scope.table + "-data.json", JSON.parse(angular.toJson(data.rows))).then(function () {
                    resolve();
                });
            } else if (scope.tableJson.data.type === 'dynamodb') {
                var params = [];
                for (var i = 0; i < data.deleted.length; i++) {
                    var dataObject = JSON.parse(angular.toJson(data.deleted[i].data));
                    params.push({
                        "delete": {
                            _index: scope.tableJson.data.index+'.'+scope.tableJson.data.table.toLowerCase() || 'dazzle',
                            _type: '_doc',
                            _id: dataObject[scope.tableJson.data.key]
                        }
                    });
                }
                console.log("Params:",params);
                if (!data.edited.length){
                    scope.bulkUpdateData(params).then(function(){
                        resolve();
                    },function(err){
                        reject();
                    });
                }
                var count = 0;
                for (var i = 0; i < data.edited.length; i++) {

                    console.log(scope.tableJson);


                    var dataObject = JSON.parse(angular.toJson(data.edited[i].data));
                    scope.clean(dataObject);

                    scope.checkExist(scope.tableJson.data,dataObject).then(function(result){
                        params.push({
                            "update": {
                                _index: scope.tableJson.data.index+'.'+scope.tableJson.data.table.toLowerCase() || 'dazzle',
                                _type: '_doc',
                                _id: result[scope.tableJson.data.key]
                            }
                        });
                        params.push({
                            "doc": result
                        });
                        count++;
                        if(count == data.edited.length){
                            scope.bulkUpdateData(params).then(function(){
                                resolve();
                            },function(err){
                                reject();
                            });
                        }
                    },function(err){
                        params.push({
                            "create": {
                                _index: scope.tableJson.data.index+'.'+scope.tableJson.data.table.toLowerCase() || 'dazzle',
                                _type: '_doc',
                                _id: err[scope.tableJson.data.key]
                            }
                        });
                        params.push(err);
                        count++;
                        if(count == data.edited.length){
                            scope.bulkUpdateData(params).then(function(){
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

    scope.loadElasticRecordById = function(index,table,id) {
        return new Promise(function (resolve, reject) {
            console.log('Load Elastic Data',id,table,index);
            $http({
                "method": "post",
                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                "data": {
                    "action": "getData",
                    "index": index,
                    "type": table,
                    "id":id
                }
            }).then(function (result) {
                console.log('Load Elastic Record',result);
                if (result.data.code < 0) {
                    //$dazzlePopup.toast(result.data.text + ":" + result.data.reject.msg);
                    reject();
                } else {
                    resolve(result.data.resolve);
                }
            });
        });
    }

    scope.checkExist = function (tableJson,data) {
        return new Promise(function (resolve, reject) {
            that.loadElasticRecordById(tableJson.index,tableJson.table,data[tableJson.key]).then(function(record){
                resolve(data);
            },function(err){
                reject(data);
            });
        });
    }

    scope.bulkUpdateData = function (params) {
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
                scope.created = [];
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

    scope.getData = function () {
        return new Promise(function (resolve, reject) {
            var nodes = [];
            var rows = [];
            var edited = [];
            var deleted = [];
            scope.gridOptions.api.forEachNode(function (node) {
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




    scope.import = function () {
        if (!scope.fileChooser) {
            scope.fileChooser = document.createElement('input');
            scope.fileChooser.setAttribute("type", "file");
            scope.fileChooser.style.display = "none";
            scope.fileChooser.addEventListener('change', function (event) {
                var file = scope.files[0];
                alasql('SELECT * FROM FILE(?,{headers:true})', [event], function (data) {
                    scope.gridOptions.api.setRowData(data);
                    scope.gridOptions.api.refreshView();
                    scope.gridOptions.api.forEachNode(function (node) {
                        node.edited = true;
                    });
                });
            });
        }
        scope.fileChooser.click();
    }


    scope.export = function () {
        // var rowData = [];
        // that.gridOptions.api.forEachNode(function (node) {
        //     rowData.push(node.data);
        // });
        // that.alasql('SELECT * INTO XLSX("' + scope.table + '.xlsx",{headers:true}) FROM ?', [rowData]);



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

    scope.isObject = function (item) {
        return (typeof item === "object" && !Array.isArray(item) && item !== null);
    }

    scope.clean = function (obj) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
                delete obj[propName];
            }
        }
    }


            
        });
 
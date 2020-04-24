var app = angular.module('demoApp');
app.directive('hotyeahCourse', function ($compile, $templateRequest, $mdDialog, $uibModal,$dazzleInit,$dazzlePopup,$dazzleData,$dazzleUser,$dazzleFn) {
    var name = 'hotyeahCourse';
    var link = {
        restrict: 'EA',
        scope: true,
        templateUrl: "http://d27btag9kamoke.cloudfront.net/builder6.0/hotyeahCourse/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            
            scope.editorCustomInit(scope, element, attrs).then(function () {
          
    
              if (!angular.isUndefined(scope.model.db)){
                    //var db
                    $dazzleData.getAtomData(scope.model.db).then(function(ids){
                        console.log('Refer IDS',ids);
                        scope.model.keys = ids;
                        
                    });
                }
                
                

              //  element.attr('contenteditable','true');
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                scope.$apply(function () {
                    $compile(template)(scope);
                });

            });
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
                                    
            $scope.edit = function(id) {

            }
                var count=0;
                var datas=[];
                angular.forEach($scope.model.keys,function(id,index){
                    $scope.loadCourse(id).then(function(data){
                        datas.push(data);
                        count++;
                        if (count==$scope.model.keys.length) {
                            $scope.model.data = datas;
                            $scope.useTemplate();
                        }
                    });
                });
            $scope.loadCourse = function(id){
                return new Promise(function (resolve, reject) {
                        $http({
                            "method": "post",
                            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/dazzle-website-directive",
                            "data": {
                              "action": "loadCourse",
                              "id":id
                            }
                        }).then(function (result) {
                            console.log('Load Course Popup',result);
                            if (result.data.code > 0) {
                                resolve(result.data.resolve); 
                            } 
                        });
                });
            }
            
            $scope.manageCourse = function(){
                    var params = {
                        index:"hotyeah",
                        table: "course",
                        ids:$scope.model.keys,
                        directive:"<hotyeah-course-popup></hotyeah-course-popup>"
                    };
                    $dazzlePopup.callPopup(params).then(function(output) {
                        console.log(output);
                        $scope.model.keys = output;
                        $dazzleData.saveRecord($scope.model.db,$scope.model.keys).then(function(result){
                           console.log('Saved'); 
                        });
                        var count=0;
                        var datas=[];
                        angular.forEach($scope.model.keys,function(id,index){
                            $scope.loadCourse(id).then(function(data){
                                datas.push(data);
                                count++;
                                if (count==$scope.model.keys.length) {
                                    $scope.model.data = datas;
                                    $scope.useTemplate();
                                }
                            });
                        });
                        // $dazzleData.loadElasticRecordByIds("hotyeah","course",$scope.model.keys).then(function(data){
                        //        $scope.model.data = data;   
                        //        console.log('Up Template'); 
                        //        $scope.useTemplate();
                            
                        // },function(err){
                        //        $scope.useTemplate();
                            
                        // });
                    });     
                                    
            }
            $scope.remove = function(id){
                var index = $scope.model.keys.indexOf(id);
                if (index > -1) {
                    $scope.model.keys.splice(index, 1);
                }
                $dazzleData.loadElasticRecordByIds($scope.model.db.index,$scope.model.db.table,$scope.model.keys).then(function(data){
                       $scope.model.data = data;    
                       $scope.useTemplate();
                });
            }


                 var thisPageJson = $dazzleUser.getDazzleInfo('thisPageJson');

            $scope.menuOptions = [];
            
            $scope.menuOptions.push(["編輯資料", function ($itemScope) {
                    if (!$scope.model.db)
                         $mdDialog.show(
                              $mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title('沒有資料設定，請點選「資料管理」設定')
                                .ok('Got it!')
                            );
                   else if (!$scope.model.db.edit) {
                         $mdDialog.show(
                              $mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title('沒有權限編輯')
                                .ok('Got it!')
                            );

                   } else {
                        $scope.manageCourse();
                   } 
                }]);
                
            
            if (angular.isUndefined(thisPageJson.myID)) {
                $scope.menuOptions.push(["資料管理", function ($itemScope) {
                    var params = {
                        db:$scope.model.db|| {},
                        'directive':'<db-setting-popup></db-setting-popup>'
                        
                    };
                    $dazzlePopup.callPopup(params).then(function(result){
                        console.log(result);
                       $scope.model.db = result; 
                    });
                    
                }]);
                 $scope.menuOptions.push(["更換模版", function () {
                    $mdDialog.show({
                        controller: 'templatePopupController',
                        templateUrl: 'https://d27btag9kamoke.cloudfront.net/cdn6.0/models/templatePopup/popup.html' + "?id=" + new Date().getTime(),
                        locals: {
                            rootScope: $scope
                        }
                    }).then(function (template) {
                        $scope.useTemplate();
                    });
                }]);
            }
            $scope.beforeAtomSaved = function () {

            }

            
        }
    };
    return link;
});

app.directive('hotyeahCoursePopup', function ($compile, $templateRequest, $mdDialog, $dazzlePopup) {
    var name = 'hotyeahCoursePopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/hotyeahCoursePopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $uibModal,$mdDateLocale,$compile,$window,$mdToast,$ocLazyLoad,$dazzleS3,$dazzleFn,$mdBottomSheet,$dazzleUser,$dazzleData,moment) {
                console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');

                $scope.pageJson=$dazzleUser.getDazzleInfo('pageJson');
                $scope.thisPageJson=$dazzleUser.getDazzleInfo('thisPageJson');
                $scope.userBucket=$dazzleUser.getDazzleInfo('userBucket');
                $scope.exportBucket=$dazzleUser.getDazzleInfo('exportBucket');
                $scope.rootScope = $dazzleUser.getRootScope();
                $scope.websiteId = $dazzleUser.getDazzleInfo('websiteId');

                console.log('hotyeahCoursePopupController');
                $scope.created = [];
                $scope.$element = $element;
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
                $scope.$dazzleFn = $dazzleFn;
                
                $scope.website = params['website'];
                $scope.table = params['table'];
                
                $scope.ids = params.ids;
                if ($scope.ids ==null)
                    $scope.ids =[];

                $scope.isForm = false;
                $scope.editable = true;
                $scope.data=[];
                $scope.moment = moment;
                
                if (!$scope.user) {
                    $scope.user = $dazzleUser.getUser();
                }
            
                $scope.init = function () {
                    $scope.inited = false;
                    //$scope.getWebsiteJson();
                    $scope.lastUpdated = null;
                    $scope.gridOptions = {
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
                            headerCheckboxSelection: $scope.isFirstColumn,
                            checkboxSelection: $scope.isFirstColumn,
                            editable: $scope.editable,
                            cellEditor: "text",
                            filter: 'text'
                        },
                        onGridReady: function () {
                            $scope.loadTable().then(function (table) {
                                $scope.tableJson = table;
                                if (angular.isArray($scope.tableJson.buttons)) {
                                    for (var i = 0; i < $scope.tableJson.buttons.length; i++) {
                                        $scope.loadButton($scope.tableJson.buttons[i]);
                                    }
                                }
                                console.log('My Table',table);
                                $scope.loadHotyeahSchema().then(function (json) {
                                    $scope.schemaJson = json;
                                    $scope.loadCell(json).then(function () {
                                        console.log('Column JSON', json);
                                        if (!$scope.editable)
                                            angular.forEach(json, function (item, index) {
                                                json[index].editable = false;
                                            });
                                        $scope.gridOptions.api.setColumnDefs(json);
                                        $scope.gridOptions.api.refreshView();
                                        $scope.loadDataSet(table, $scope.ids).then(function (json) {
                                            //                                    scope.loadData().then(function (json) {
                                            console.log('Load Json', json);
                                            $scope.data = json;
                                            $scope.gridOptions.api.setRowData(json);
                                            $scope.gridOptions.api.refreshView();
                                            $scope.inited = true;
                                            console.log('Table:', $scope.tableJson);
                                            console.log('Schema:', $scope.schemaJson);
                                            console.log('Data:', json);
                                            $scope.refresh();
//                                            resolve($scope.gridOptions);
                                        });
            
                                    });
                                });
                            });
                        },
                        onCellEditingStarted: function (event) {
                            event.$scope.oldValue = event.value;
                        },
                        onCellEditingStopped: function (event) {
                            if (!angular.isUndefined(event.colDef.key) && event.colDef.key) {
                                $scope.gridOptions.api.forEachNode(function (rowNode, index) {
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
                                $scope.gridOptions.api.getModel().rowsToDisplay[event.rowIndex].edited = true;
                            }
                        }
                    }
                }
            $scope.loadDataSet = function(table,ids){
                return new Promise(function (resolve, reject) {
                    var data = [];
                    var count = 0;
                    console.log('Data Set IDS',ids);
                    if (table.data.type === 's3') {
                        console.log('Load S3 Data');
                        $dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + website + "/content/" + table.data.table + "-data.json").then(function (json) {
                            if (ids != null){
                                angular.forEach(json,function(item,index){
                                    if (ids.indexOf(item[table.data.key]) > -1 )
                                        data.push(item);
                                });
                                resolve(data);
                            }
                            else
                                resolve(json);
                        });
                    } else if (table.data.type === 'dynamodb') {
                        console.log(ids);
                        if (ids != null){
                            console.log('Load BY ID');
                            if (!ids.length)
                                resolve([]);
                            for(i=0;i<ids.length;i++){
                                $dazzleData.loadElasticRecordById(table.data.index,table.data.table,ids[i]).then(function(record){
        
                                    data.push(record);
                                    count++;
                                    console.log('Output',record);
                                    if (count == ids.length)
                                        resolve(data);
                                });
                            }
                        } else {
                            console.log('Load Mass');
                            $dazzleData.loadElasticRecord(table.data.index,table.data.table).then(function(record){
                                resolve(record);
                            });
                        }
                    } else {
                        $dazzlePopup.toast("未知數據來源");
                        resolve([]);
                    }
                });
            }
            
                $scope.getWebsiteJson = function () {
                    $dazzleS3.getJson("dazzle-user-" + $scope.user.uid, "website/" + $scope.websiteId + '/json/website.json').then(function (json) {
                        $scope.websiteJson = json;
                    });
                }
            
                $scope.loadButton = function (b) {
                    $ocLazyLoad.load({files: b.js, cache: false}).then(function () {
                        var button = angular.element(b.html);
                        angular.element('#customButtons').append(button);
                        $compile(button)($scope.rootScope);
                    });
                }
            
            
                $scope.editSchema = function () {
                    $dazzlePopup.schema($scope.website, $scope.table, $scope.isForm).then(function (newSchema) {
                        $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, 'website/' + $scope.websiteId + '/' + "content/" + $scope.table + "-schema.json", JSON.parse(angular.toJson(newSchema)));
                        $scope.schemaJson = newSchema;
                        $scope.loadCell(newSchema).then(function () {
                            $scope.gridOptions.api.setColumnDefs(newSchema);
                            $scope.gridOptions.api.refreshView();
                        });
                    });
                }
            
                $scope.loadTable = function () {
                    return new Promise(function (resolve, reject) {
                        $dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid, 'website/' + $scope.websiteId + '/' + "content/" + $scope.table + "-table.json").then(function (json) {
                            if (json.data && json.data.type && json.data.type === 'dynamodb') {
                                if (json.data.table && json.data.key) {
                                    resolve(json);
                                } else if (!json.data.table) {
                                    $dazzlePopup.toast('ERROR: 沒有設定Table');
                                    reject();
                                } else if (!json.data.key) {
                                    $dazzlePopup.toast('ERROR: 沒有設定Key');
                                    reject();
                                }
                            } else if (json.data && json.data.type && json.data.type === 's3') {
                                resolve(json);
                            } else {
                                $scope.initTable().then(function (t) {
                                    resolve(t);
                                })
                            }
                        }, function () {
                            $scope.initTable().then(function (t) {
                                resolve(t);
                            });
                        });
                    });
                }
            
                $scope.initTable = function () {
                    return new Promise(function (resolve, reject) {
                        $dazzlePopup.toast('正在初始化s3 Table:' + $scope.table);
                        var table = {
                            "data": {
                                "type": "s3"
                            },
                            "buttons": []
                        }
                        $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $scope.websiteId + "/content/" + $scope.table + "-table.json", table);
                        resolve(table);
                    });
                }
            
                $scope.checkDynamoTable = function (table) {
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
            
                $scope.loadHotyeahSchema = function () {
                    return new Promise(function (resolve, reject) {
                        $dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $scope.websiteId + "/content/" + $scope.table + "-schema.json").then(function (json) {
                            
                            angular.forEach(json,function(item,index){
                               switch(item.field){
                                   case '學校':
                                        json[index].hidden = true;       
                                   break;
                                       
                                    case 'ID':
                                    case 'Rating':
                                    case 'currentBookmark':
                                    case 'viewNumber':
                                        json[index].editable = false;
                                    break;
                                   
                               } 
                            });
                            
                            resolve(json);
                        }, function () {
                            $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $scope.websiteId + "/content/" + $scope.table + "-schema.json", []);
                            resolve([]);
                        });
                    });
                };
            
                $scope.loadData = function () {
                    return new Promise(function (resolve, reject) {
                        if ($scope.tableJson.data.type === 's3') {
                            console.log('Load S3 Data');
                            $dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $scope.websiteId + "/content/" + $scope.table + "-data.json").then(function (json) {
                                $scope.dataLength = json.length;
                                resolve(json);
                            }, function () {
                                $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $scope.websiteId + "/content/" + $scope.table + "-data.json", []);
                                resolve([]);
                            });
                        } else if ($scope.tableJson.data.type === 'dynamodb') {
                            console.log('Load DynamoDB Data');
                            $http({
                                "method": "post",
                                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                                "data": {
                                    "action": "searchData",
                                    "index": $scope.tableJson.data.index || "dazzle",
                                    "type": $scope.tableJson.data.table,
                                    "body": {"query": {"match_all": {}}}
                                }
                            }).then(function (result) {
                                if (result.data.code < 0) {
                                    $dazzlePopup.toast(result.data.text + ":" + result.data.err.code);
                                    reject();
                                } else {
                                    $scope.dataLength = result.data.resolve.length;
                                    resolve(result.data.resolve);
                                }
                            });
                        } else {
                            $dazzlePopup.toast("未知數據來源");
                            resolve([]);
                        }
                    });
                };
            
                $scope.loadCell = function (schema) {
                    return new Promise(function (resolve, reject) {
                        for (var i = 0; i < schema.length; i++) {
                            if (!angular.isUndefined(schema[i].jsId)) {
                                $scope.setCellJs(schema[i]);
                            }
                            if (!angular.isUndefined(schema[i].cellEditor)) {
                                $scope.setCellEditor(schema[i]);
                            }
                            if (!angular.isUndefined(schema[i].cellRenderer)) {
                                $scope.setCellRenderer(schema[i]);
                            }
                            if (!angular.isUndefined(schema[i].cellFilter)) {
                                $scope.setCellFilter(schema[i]);
                            }
                        }
                        setTimeout(function () {
                            resolve();
                        }, 1000);
                    });
                }
            
                $scope.setCellJs = function (schema) {
                    $ocLazyLoad.load("https://d27btag9kamoke.cloudfront.net/backend6.0/" + schema.directive + "/js/" + schema.jsId + '.js', {cache: false});
                }
            
                $scope.setCellFilter = function (schema) {
                    $ocLazyLoad.load("https://d27btag9kamoke.cloudfront.net/backend6.0/" + schema.directive + "/" + schema.cellFilter + ".js", {cache: false}).then(function () {
                        schema.filterParams = window[schema.cellFilter];
                    });
                }
            
                $scope.setCellEditor = function (schema) {
                    $ocLazyLoad.load("https://d27btag9kamoke.cloudfront.net/backend6.0/" + schema.directive + "/" + schema.cellEditor + ".js", {cache: false}).then(function () {
                        $scope.gridOptions.api.cellEditorFactory.addCellEditor(schema.cellEditor, window[schema.cellEditor]);
                    });
                }
            
                $scope.setCellRenderer = function (schema) {
                    $ocLazyLoad.load("https://d27btag9kamoke.cloudfront.net/backend6.0/" + schema.directive + "/" + schema.cellRenderer + ".js", {cache: false}).then(function () {
                        $scope.gridOptions.api.cellRendererFactory.addCellRenderer(schema.cellRenderer, window[schema.cellRenderer]);
                    });
                }
            
                $scope.add = function (object) {
                        var date = new Date().getTime().toString();
                        var newObject = {};
                        if (object) {
                            newObject = object;
                        }
                        if ($scope.tableJson.data.type === 'dynamodb') {
                            newObject[$scope.tableJson.data.key] = date;
                            newObject['學校']= [$scope.thisPageJson.myID];
                        }
                        for (var i = 0; i < $scope.schemaJson.length; i++) {
                            if ($scope.schemaJson[i].defaultByTimestamp) {
                                newObject[$scope.schemaJson[i].field] = date;
                            } else if ($scope.schemaJson[i].default) {
                                newObject[$scope.schemaJson[i].field] = $scope.schemaJson[i].default;
                            }
                        }
                        $scope.gridOptions.api.updateRowData({add: [newObject], addIndex: 0});
            //            var node = $scope.gridOptions.api.getRowNode($scope.dataLength);  
                        //$scope.created.push($scope.dataLength);
                        $scope.dataLength++;
                        // console.log('New Record',node);
                        $scope.gridOptions.api.refreshInMemoryRowModel();
                        $scope.gridOptions.api.getModel().rowsToDisplay[0].edited = true;
                }
            
                $scope.remove = function () {
                    var nodes = $scope.gridOptions.api.getSelectedNodes();
                    for (var i = 0; i < nodes.length; i++) {
                        nodes[i].deleted = true;
                    }
                    $scope.gridOptions.api.onFilterChanged();
                }
            
                $scope.refresh = function () {
                    $scope.loadCell($scope.schemaJson).then(function () {
                        $scope.gridOptions.api.setColumnDefs($scope.schemaJson);
                    });
                    $scope.loadDataSet($scope.table,$scope.ids).then(function (json) {
                        $scope.gridOptions.api.setRowData(json);
                        $scope.gridOptions.api.refreshView();
                    });
                }
            
                $scope.isFirstColumn = function (params) {
                    var displayedColumns = params.columnApi.getAllDisplayedColumns();
                    var thisIsFirstColumn = displayedColumns[0] === params.column;
                    return thisIsFirstColumn;
                }
            
                $scope.cancel = function () {
                    var ids = [];
                    $scope.gridOptions.api.forEachNode(function (node) {
                        console.log('Node', node);
                        ids.push(node.data['ID']);
                    });
                    
                    $mdDialog.hide(ids);
                }
            
                $scope.save = function () {
                    return new Promise(function (resolve, reject) {
                        $scope.getData().then(function (result) {
                            
                            $scope.saveData(result).then(function () {
                                $dazzlePopup.toast('儲存成功');
                                resolve(result);
                            });
                        });
                    });
                }
            
                $scope.saveSchema = function () {
                    var newShcema = [];
                    var oldSchema = $scope.gridOptions.columnApi.getAllGridColumns();
                    for (var i = 0; i < oldSchema.length; i++) {
                        oldSchema[i].colDef.width = oldSchema[i].actualWidth;
                        for (var obj in oldSchema[i].colDef) {
                            if (obj !== 'headerCheckboxSelection' && obj !== 'checkboxSelection' && Object.prototype.toString.call(oldSchema[i].colDef[obj]) == '[object Function]') {
                                delete oldSchema[i].colDef[obj];
                            }
                        }
                        newShcema.push(oldSchema[i].colDef);
                    }
                    $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $scope.websiteId + "/content/" + $scope.table + "-schema.json", JSON.parse(angular.toJson(newShcema)));
                    $scope.schemaJson = newShcema;
                }
            
               $scope.saveData = function (data) {
                    return new Promise(function (resolve, reject) {
                        console.log(data);
                        console.log($scope.tableJson);
                        if ($scope.tableJson.data.type === 's3') {
                            //console.log('save to s3');
                            $scope.gridOptions.api.removeItems(data.deleted);
                            $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + website + "/content/" + $scope.table + "-data.json", JSON.parse(angular.toJson(data.rows))).then(function () {
                                resolve();
                            });
                        } else if ($scope.tableJson.data.type === 'dynamodb') {
                            var params = [];
                            for (var i = 0; i < data.deleted.length; i++) {
                                var dataObject = JSON.parse(angular.toJson(data.deleted[i].data));
                                params.push({
                                    "delete": {
                                        _index: $scope.tableJson.data.index || 'dazzle',
                                        _type: $scope.tableJson.data.table,
                                        _id: dataObject[$scope.tableJson.data.key]
                                    }
                                });
                            }
                            console.log(params);
                            if (!data.edited.length){
                                $scope.bulkUpdateData(params).then(function(){
                                    resolve();
                                },function(err){
                                    reject();
                                });
                            }
                            var count = 0;
                            for (var i = 0; i < data.edited.length; i++) {
            
                                console.log($scope.tableJson);
                                
            
                                var dataObject = JSON.parse(angular.toJson(data.edited[i].data));
                                $scope.clean(dataObject);
            
                                $scope.checkExist($scope.tableJson.data,dataObject).then(function(result){
                                        params.push({
                                            "update": {
                                                _index: $scope.tableJson.data.index || 'dazzle',
                                                _type: $scope.tableJson.data.table,
                                                _id: result[$scope.tableJson.data.key]
                                            }
                                        });
                                        params.push({
                                            "doc": result
                                        });
                                        count++;
                                        if(count == data.edited.length){
                                            $scope.bulkUpdateData(params).then(function(){
                                                resolve();
                                            },function(err){
                                                reject();
                                            });                                
                                        }
                                },function(err){
                                        params.push({
                                            "create": {
                                                _index: $scope.tableJson.data.index || 'dazzle',
                                                _type: $scope.tableJson.data.table,
                                                _id: err[$scope.tableJson.data.key]
                                            }
                                        });
                                        params.push(err);
                                        count++;
                                        if(count == data.edited.length){
                                            $scope.bulkUpdateData(params).then(function(){
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
                $scope.checkExist = function(tableJson,data) {
            
                    return new Promise(function (resolve, reject) {
                         $dazzleData.loadElasticRecordById(tableJson.index,tableJson.table,data[tableJson.key]).then(function(record){
                            resolve(data);
                         },function(err){
                            reject(data);
                         });
                    });
                }
                $scope.bulkUpdateData=function(params){
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
                            $scope.created = [];
                            if (result.data.code > 0) {
                                resolve();
                            } else {
                                $dazzlePopup.toast(result.data.text + ":" + result.data.err.code);
                                reject();
                            }
                        });
                    });
                }
                        
                $scope.getData = function () {
                    return new Promise(function (resolve, reject) {
                        var nodes = [];
                        var rows = [];
                        var edited = [];
                        var deleted = [];
                        $scope.gridOptions.api.forEachNode(function (node) {
                            //console.log('Node', node);
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
            
                $scope.import = function () {
                    if (!$scope.fileChooser) {
                        $scope.fileChooser = document.createElement('input');
                        $scope.fileChooser.setAttribute("type", "file");
                        $scope.fileChooser.style.display = "none";
                        $scope.fileChooser.addEventListener('change', function (event) {
                            var file = this.files[0];
                            alasql('SELECT * FROM FILE(?,{headers:true})', [event], function (data) {
                                $scope.gridOptions.api.setRowData(data);
                                $scope.gridOptions.api.refreshView();
                                $scope.gridOptions.api.forEachNode(function (node) {
                                    node.edited = true;
                                });
                            });
                        });
                    }
                    $scope.fileChooser.click();
                }
            
                $scope.export = function () {
                    var rowData = [];
                    $scope.gridOptions.api.forEachNode(function (node) {
                        rowData.push(node.data);
                    });
                    alasql('SELECT * INTO XLSX("' + $scope.table + '.xlsx",{headers:true}) FROM ?', [rowData]);
                }
            
                $scope.isObject = function (item) {
                    return (typeof item === "object" && !Array.isArray(item) && item !== null);
                }
            
                $scope.clean = function (obj) {
                    for (var propName in obj) {
                        if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
                            delete obj[propName];
                        }
                    }
                }
        }
    };
    return link;
});
var app = angular.module('demoApp');
app.directive('editorData2', function ($compile, $templateRequest, $mdDialog, $dazzlePopup) {
    var name = 'editorData2';
    var editorData2 = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/editorData2/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;           
        },        
        controller: function($scope,$element,$attrs,$http,$mdDialog,$mdSidenav,$mdBottomSheet,$mdDateLocale,$mdToast,$ocLazyLoad,$dazzleS3,$dazzlePopup,$dazzleUser,$dazzleFn,$compile,$window,moment) {
                console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');

                $scope.pageJson=$dazzleUser.getDazzleInfo('pageJson');
                $scope.thisPageJson=$dazzleUser.getDazzleInfo('thisPageJson');
                $scope.userBucket=$dazzleUser.getDazzleInfo('userBucket');
                $scope.exportBucket=$dazzleUser.getDazzleInfo('exportBucket');
                $scope.rootScope = $dazzleUser.getRootScope();
                $scope.website = $dazzleUser.getDazzleInfo('website');
                $scope.websiteId = $dazzleUser.getDazzleInfo('websiteId');
                
                console.log('editorData2Controller',$scope.websiteId);

                $scope.created = [];
                $scope.table = params.table;
                $scope.isForm = false;
                $scope.editable = true;

               // $scope.alasql = alasql;

                $scope.moment = moment;


                $scope.init = function () {
                    $scope.inited = false;
                    $scope.getWebsiteJson();
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
                        enableSorting: true,
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
                                $scope.loadSchema().then(function (json) {
                                    $scope.schemaJson = json;
                                    $scope.loadCell(json).then(function () {
                                        if (!$scope.editable) {
                                            angular.forEach(json, function (item, index) {
                                                json[index].editable = false;
                                            });
                                        }
                                        $scope.gridOptions.api.setColumnDefs(json);
                                        $scope.gridOptions.api.refreshView();
                                        $scope.loadData().then(function (json) {
                                            $scope.gridOptions.api.setRowData(json);
                                            $scope.gridOptions.api.refreshView();
                                            $scope.inited = true;
                                            console.log('Table:', $scope.tableJson);
                                            console.log('Schema:', $scope.schemaJson);
                                            console.log('Data:', json);
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
                            if (filter) {
                                $scope.gridOptions.api.onFilterChanged();
                            }
                        },
                        onCellFocused: function (event) {
                            if (event.rowIndex !== null) {
                                $scope.gridOptions.api.getModel().rowsToDisplay[event.rowIndex].edited = true;
                            }
                        }
                    }
                }

                $scope.getWebsiteJson = function () {
                    $dazzleS3.getJson("dazzle-user-" + $dazzleUser.getUser().uid, "website/" + $scope.websiteId + '/json/website.json').then(function (json) {
                        $scope.websiteJson = json;
                    });
                }

                $scope.loadButton = function (b) {
                    console.log('BUtton',b);
                    $ocLazyLoad.load({files: b.js, cache: false}).then(function () {
                        console.log('Button HTML',b.html);
                        var button = angular.element(b.html);
                        angular.element('#customButtons').append(button);
                        $compile(button)($scope);
                    });
                }


                $scope.editSchema = function () {
                    $dazzlePopup.schema($scope.website, $scope.table, false).then(function (newSchema) {
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
                            console.log('Table 34',json);
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

                $scope.loadSchema = function () {
                    return new Promise(function (resolve, reject) {
                        $dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $scope.websiteId + "/content/" + $scope.table + "-schema.json").then(function (json) {
                            resolve(json);
                        }, function () {
                            $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $scope.websiteId + "/content/" + $scope.table + "-schema.json", []);
                            resolve([]);
                        });
                    });
                };

                $scope.loadData = function () {
                    return new Promise(function (resolve, reject) {
                        console.log('Table Json',$scope.tableJson);
                        console.log('Table',$scope.table);
                        if ($scope.tableJson.data.type === 's3') {
                            console.log('Load S3 Data');
                            $dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $scope.websiteId + "/content/" + $scope.table + "-data.json").then(function (json) {
                                $scope.dataLength = json.length;
                                console.log('JSON',json);
                                resolve(json);
                            }, function () {
                                reject();
                                // $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $scope.websiteId + "/content/" + $scope.table + "-data.json", []);
                                // resolve([]);
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
                                //console.log(result);
                                if (result.data.code < 0) {
                                    $dazzlePopup.toast(result.data.text + ":" + result.data.reject.msg);
                                    resolve([]);
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
                            if (!angular.isUndefined(schema[i].cellFilterer)) {
                                $scope.setCellFilterer(schema[i]);
                            }
                        }
                        setTimeout(function () {
                            resolve();
                        }, 1000);
                    });
                }

                $scope.setCellJs = function (schema) {
                    $ocLazyLoad.load("https://d25k6mzsu7mq5l.cloudfront.net/backend6.0/" + schema.directive + "/js/" + schema.jsId + '.js', {cache: false});
                }

                $scope.setCellFilterer = function (schema) {
                    $ocLazyLoad.load("https://d25k6mzsu7mq5l.cloudfront.net/backend6.0/" + schema.directive + "/" + schema.cellFilterer + ".js", {cache: false}).then(function () {
                        schema.filter = window[schema.cellFilterer];
                    });
                }

                $scope.setCellFilter = function (schema) {
                    $ocLazyLoad.load("https://d25k6mzsu7mq5l.cloudfront.net/backend6.0/" + schema.directive + "/" + schema.cellFilter + ".js", {cache: false}).then(function () {
                        schema.filterParams = window[schema.cellFilter];
                    });
                }

                $scope.setCellEditor = function (schema) {
                    $ocLazyLoad.load("https://d25k6mzsu7mq5l.cloudfront.net/backend6.0/" + schema.directive + "/" + schema.cellEditor + ".js", {cache: false}).then(function () {
                        $scope.gridOptions.api.cellEditorFactory.addCellEditor(schema.cellEditor, window[schema.cellEditor]);
                    });
                }

                $scope.setCellRenderer = function (schema) {
                    $ocLazyLoad.load("https://d25k6mzsu7mq5l.cloudfront.net/backend6.0/" + schema.directive + "/" + schema.cellRenderer + ".js", {cache: false}).then(function () {
                        $scope.gridOptions.api.cellRendererFactory.addCellRenderer(schema.cellRenderer, window[schema.cellRenderer]);
                    });
                }

                $scope.add = function (object) {
                    if ($scope.modelType == "refer") {
                        $dazzlePopup.dataSelect($scope.website, $scope.table);
                    } else {
                        var date = new Date().getTime().toString();
                        var newObject = {};
                        if (object) {
                            newObject = object;
                        }
                        if ($scope.tableJson.data.type === 'dynamodb') {
                            newObject[$scope.tableJson.data.key] = date;
                        }
                        for (var i = 0; i < $scope.schemaJson.length; i++) {
                            if ($scope.schemaJson[i].defaultByTimestamp) {
                                newObject[$scope.schemaJson[i].field] = date;
                            } else if ($scope.schemaJson[i].default) {
                                newObject[$scope.schemaJson[i].field] = $scope.schemaJson[i].default;
                            }
                        }
                        if (filter) {
                            filter.data.push(date);
                            newObject[filter.key] = date;
                        }
                        $scope.gridOptions.api.updateRowData({add: [newObject], addIndex: 0});
            //            var node = $scope.gridOptions.api.getRowNode($scope.dataLength);  
                        //$scope.created.push($scope.dataLength);
                        $scope.dataLength++;
                        // console.log('New Record',node);
                        $scope.gridOptions.api.refreshInMemoryRowModel();
                        $scope.gridOptions.api.getModel().rowsToDisplay[0].edited = true;
                    }

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
                    $scope.loadData().then(function (json) {
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
                    $mdDialog.hide($scope.lastUpdated);
                }

                $scope.save = function () {
                    return new Promise(function (resolve, reject) {
                        $scope.saveSchema();
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
                    $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + website + "/content/" + $scope.table + "-schema.json", JSON.parse(angular.toJson(newShcema)));
                    $scope.schemaJson = newShcema;
                }

                $scope.saveData = function (data) {
                    return new Promise(function (resolve, reject) {
                        console.log(data);
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
                            for (var i = 0; i < data.edited.length; i++) {
                                var dataObject = JSON.parse(angular.toJson(data.edited[i].data));
                                $scope.clean(dataObject);
                                params.push({
                                    "delete": {
                                        _index: $scope.tableJson.data.index || 'dazzle',
                                        _type: $scope.tableJson.data.table,
                                        _id: dataObject[$scope.tableJson.data.key]
                                    }
                                });
                                params.push({
                                    "create": {
                                        "_index": $scope.tableJson.data.index || "dazzle",
                                        "_type": $scope.tableJson.data.table,
                                        "_id": dataObject[$scope.tableJson.data.key]
                                    }
                                });


                                params.push(dataObject);
                                /*var dataObject = JSON.parse(angular.toJson(data.edited[i].data));
                                $scope.clean(dataObject);
            //                    edited.push(dataObject);
            //                    console.log(dataObject);
                                console.log($scope.created);
                                console.log(data.edited[i].id);
            //                    console.log(created.indexOf(parseInt(data.edited[i].id) ) );
                                if ($scope.created.indexOf(parseInt(data.edited[i].id)) < 0) {
                                    var object = {
                                        update: {
                                            _index: $scope.tableJson.data.index || 'dazzle',
                                            _type: $scope.tableJson.data.table,
                                            _id: data.edited[i].data[$scope.tableJson.data.key]
                                        }
                                    };
                                    params.push(object);
                                    params.push({"doc": dataObject});

                                }
                                else {
                                    var object = {
                                        "create": {
                                            "_index": $scope.tableJson.data.index || "dazzle",
                                            "_type": $scope.tableJson.data.table,
                                            "_id": data.edited[i].data[$scope.tableJson.data.key]
                                        }
                                    };
                                    params.push(object);
                                    params.push(dataObject);
                                }*/

                            }
                            // $scope.lastUpdated = {
                            //     deleted: deleted,
                            //     edited: edited
                            // };
                            //console.log(params);
                            ///////////////////////

                            console.log('Params',params);
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
                        }
                    })
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
                            var tagField = [];
                            for (var i = 0; i < $scope.schemaJson.length; i++) {
                                if ($scope.schemaJson[i].directive == 'tag') {
                                    tagField.push($scope.schemaJson[i].field);
                                }
                            }
                            // alasql('SELECT * FROM FILE(?,{headers:true})', [event], function (data) {
                            //     $scope.gridOptions.api.setRowData(data);
                            //     $scope.gridOptions.api.refreshView();
                            //     $scope.gridOptions.api.forEachNode(function (node) {
                            //         for (var i = 0; i < tagField.length; i++) {
                            //             if (node.data[tagField[i]] && !angular.isArray(node.data[tagField[i]])) {
                            //                 node.data[tagField[i]] = node.data[tagField[i]].split(',');
                            //             }
                            //         }
                            //         node.edited = true;
                            //     });
                            // });
                        });
                    }
                    $scope.fileChooser.click();
                }

                $scope.export = function () {
                    var rowData = [];
                    $scope.gridOptions.api.forEachNode(function (node) {
                        rowData.push(node.data);
                    });
                   // alasql('SELECT * INTO XLSX("' + $scope.table + '.xlsx",{headers:true}) FROM ?', [rowData]);
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
    return editorData2;
});
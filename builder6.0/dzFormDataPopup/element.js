var app = angular.module('demoApp');
var name = 'dzFormDataPopup';

app.directive(name, function ($compile, $templateRequest, $mdDialog, $uibModal,$dazzleUser,$dazzleS3,$dazzlePopup,$dazzleFn,$dazzleInit,$dazzleData) {
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/dzFormDataPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($mdToast,$window,$scope, $element, $attrs,$dazzleS3, $http,$mdSidenav, $mdBottomSheet,$log,$ocLazyLoad,$mdDateLocale) {
  
            var params = $dazzleUser.getDazzleInfo('params');
            console.log('My Params',params);
            
			$scope.created = [];
			
//			$scope.$element = $element;

            $scope.index = params.index;
            $scope.table = params.table;
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
			$scope.website = $dazzleUser.dazzleInfo['website'];
//			$scope.table = $dazzleUser.dazzleInfo['thisTable'];
            $dazzleUser.dazzleInfo['thisTable'] = params.table;
            $scope.tableName = params.table;

		//	$scope.table =$element.attr('table');
			$scope.isForm = false;
			$scope.editable = true;
			$scope.modelType = false;

			$scope.websiteId = $dazzleUser.dazzleInfo['websiteId'];
			//$scope.alasql = alasql;
            $scope.websiteTable=[];
			$scope.moment = moment;
			if (!$scope.user) {
				$scope.user = $dazzleUser.getUser();
			}
			
 		  var columnDefs = [];

            var rowData = [];

			
			$scope.init = function () {

						console.log($dazzleUser.getDazzleInfo('thisTable'));
						
						$scope.inited = false;
						//$scope.getWebsiteJson();
						$scope.lastUpdated = null;
                        $scope.initGrid($scope.websiteId,params.table);




			}
		
            $scope.initGrid = function(websiteId,tableName) {
                    $scope.gridOptions = {
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
                            editable: true,
                            cellEditor: "text",
                            filter: 'text'
                        },
                        onSelectionChanged: function() {

                            var selectedRows = $scope.gridOptions.api.getSelectedRows();

                        },
                        columnDefs: columnDefs,
                        rowData: rowData,
                        onGridReady: function () {

                            $scope.loadTable(websiteId,tableName).then(function (table) {
                                console.log('Load Table',table);
                                $scope.tableName = tableName;
                                $scope.tableJson = table;
                                if (angular.isArray($scope.tableJson.buttons)) {
                                    for (var i = 0; i < $scope.tableJson.buttons.length; i++) {
                                        $scope.loadButton($scope.tableJson.buttons[i]);
                                    }
                                }
                                $scope.loadSchema(websiteId,tableName).then(function (json) {
                                    $scope.schemaJson = json;
                                    console.log('Schema Json',$scope.schemaJson );
                                    $scope.loadCell(json).then(function () {
                                        // if (!$scope.editable) {
                                        //     angular.forEach(json, function (item, index) {
                                        //         json[index].editable = false;
                                        //     });
                                        // }
                                        $scope.gridOptions.api.setColumnDefs(json);
                                        $scope.gridOptions.api.refreshView();
                                        $scope.loadData().then(function (json) {
                                            $scope.gridOptions.api.setRowData(json);
                                            $scope.gridOptions.api.refreshView();
                                            console.log('Table:', $scope.tableJson);
                                            console.log('Schema:', $scope.schemaJson);
                                            console.log('Data:', json);
                                            $scope.refresh();
                                            $scope.inited = true;
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
                    };
            }

				 
				

			$scope.getWebsiteJson = function () {
				$dazzleS3.getJson("dazzle-user-" + $dazzleUser.getUser().uid, "website/" + $dazzleUser.dazzleInfo['websiteId'] + '/json/website.json').then(function (json) {
					$scope.websiteJson = json;
				});
			}

            $scope.dbManage = function (table) {
                //    $dazzlePopup.dataManagement(website.websiteId, table);
                document.location.href = "index.html#!/myDbManage/"+$dazzleUser.dazzleInfo['websiteId']+"/"+table;
            }

            $scope.home = function (table) {
                //    $dazzlePopup.dataManagement(website.websiteId, table);
                document.location.href = "index.html#!/myWebsite";
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
            $scope.editNewSchema = function () {
                var params = {
                    schema: $scope.schemaJson,
                    table: $scope.table,
                    name: "dzEditSchemaPopup",
                    directive:"<dz-edit-schema-popup></dz-edit-schema-popup>"
                };

                $dazzlePopup.callPopup(params).then(function(newSchema) {
					//$dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, 'website/' + $dazzleUser.dazzleInfo['websiteId'] + '/' + "content/" + $scope.table + "-schema.json", JSON.parse(angular.toJson(newSchema)));
					$scope.schemaJson = newSchema;
					$scope.loadCell(newSchema).then(function () {
						$scope.gridOptions.api.setColumnDefs(newSchema);
						$scope.gridOptions.api.refreshView();
					});
                });
                

			}


			$scope.editSchema = function () {
				$dazzlePopup.schema($dazzleUser.dazzleInfo['websiteId'], $scope.table, false).then(function (newSchema) {
					$dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, 'website/' + $dazzleUser.dazzleInfo['websiteId'] + '/' + "content/" + $scope.table + "-schema.json", JSON.parse(angular.toJson(newSchema)));
					$scope.schemaJson = newSchema;
					$scope.loadCell(newSchema).then(function () {
						$scope.gridOptions.api.setColumnDefs(newSchema);
						$scope.gridOptions.api.refreshView();
					});
				});
			}

			$scope.addTable = function() {
                var params = {
                    name: "createTablePopup",
                    directive:"<create-table-popup></create-table-popup>"
                };

                $dazzlePopup.callPopup(params).then(function(output) {

                });


            }

            $scope.removeTable = function() {
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

            $scope.loadTable = function (websiteId,tableName) {
                return new Promise(function (resolve, reject) {

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
					$dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" +$dazzleUser.dazzleInfo['websiteId'] + "/content/" + $scope.table + "-table.json", table);
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
			
			$scope.newLoadSchema = function(){
                 var json,schema=[];
                
				return new Promise(function (resolve, reject) {
			        $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
//                        "url": "https://d8fz9pfue5.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-newElasticSearchController",
                        "data": {
                          "action": "searchData",
                          "table": params.index+'._schema',
                           "body": {
                                "query": {
                                  "match": {
                                      "table":params.table
                                  }
                                }
                           }
                       }
                    }).then(function (result) {
                        console.log(result);
                        if (result.data.code > 0){
                            json = result.data.resolve;
                            angular.forEach(json,function(item,index){
                                schema.push({
                                    "editable": item['editable'],
                                    "cellEditor": item['directive']+"Editor",
                                    "filter": item['directive']+"Filter",
                                    "directive": item['directive'],
                                    "directiveName": item['directiveName'],
                                    "mapping": {
                                        "type": item['mapping_type'],
                                    },
                                    "headerName": item['label'],
                                    "field": item['field'],
                                    "key": item['key'],
                                    "required": item['required'],
                                    "default": item['default'],
                                    "defaultByTimestamp": item['defaultByTimeStamp'],
                                    "setting": "https://d25k6mzsu7mq5l.cloudfront.net/backend6.0/"+item['directive']+"/setting.html",
                                    "width": item['width'],
                                    "order":item['order'],
                                    "hide": !item['display']
                                }); 
                            });
							console.log('My Schema',json);
		        		    resolve(json);
                        }
                        else{
                             $dazzlePopup.toast("ERROR: 不能讀取Schema");
                             resolve([]);
                        }
                    });    
				});			    
			}

		    $scope.loadSchema = function (websiteId,tableName) {
		        console.log('load schema',websiteId,tableName);
                return new Promise(function (resolve, reject) {
                         $http({
                            "method": "post",
                            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                            "data": {
                                "action": "searchData",
                                "index": $dazzleUser.getUser().uid,
                                "type": "_schema",
                                "body": {
                                    "query": {
                                        "match": {"tableId": tableName}
                                   
                                    }
                                    
                                }
                            }
                        }).then(function (result) {
                            console.log('Load Schema',result);
                            if (result.data.code < 0) {
                                $dazzlePopup.toast(result.data.text + ":" + result.data.reject.msg);
                                resolve([]);
                            } else {
                                var json = [];
                                angular.forEach(result.data.resolve,function(item,index){
                                    var obj = {};
                                    obj['editable'] = true;
                                    obj['cellEditor']= item.directive+'Editor';
                                    obj['cellRenderer'] = item.directive+'Renderer';
                                    obj['directive'] = item.directive;
                                    obj['directiveName']=item.directive;
                                    obj['headerName'] = item.fieldName;
                                    obj['field'] =item.fieldName;
                                    obj['width']=200;
                                    obj['setting']= "https://d25k6mzsu7mq5l.cloudfront.net/backend6.0/"+item.directive+"/setting.html" ;
                                    json.push(obj);
                                });
//                                $scope.dataLength = result.data.resolve.length;
                                resolve(json);
                            }
                        });


        
                            // var filename;
                            // switch (tableName) {
                            //     case '_table': filename = '_table-schema.tpl.json'; break;
                            //     case '_schema': filename = '_schema-schema.tpl.json'; break;
                            //     case '_page': filename = '_page-schema.tpl.json'; break;
                            //     case '_atom': filename = '_atom-schema.tpl.json'; break;
                            // }

                            // $dazzleS3.getJson('dazzle-template','file6.0/'+filename).then(function (json) {
                            //     console.log('My Schema',json);
                            //     resolve(json);
                            // }, function () {
                            //     resolve([]);
                            // });
                });
            };


			$scope.newLoadData = function () {
			    var json;
				return new Promise(function (resolve, reject) {
						console.log('Load DynamoDB Data');
					//	if (angular.isUndefined(params.filter)) {
						    json = {
								"action": "searchData",
								"index": $scope.tableJson.data.index +"."+$scope.tableJson.data.table,
								"type":"_doc",
								"body": {"query": {"match_all": {}}}
							};
				// 		} else {
						    
				// 		    json = {
				// 				"action": "searchData",
				// 				"index": $scope.tableJson.data.index || "dazzle"+"."+$scope.tableJson.data.table,
				// 				"type":"_doc",
				// 				"filtered": {
				// 				    "query":  params.filter
				// 				}
				// 			};
				// 		}
						
						console.log('My Query',JSON.stringify(json));
						
						$http({
							"method": "post",
							"url":"https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
//							"url": "https://d8fz9pfue5.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-newElasticSearchController",
							"data": json
						}).then(function (result) {
							console.log(result);
							if (result.data.code < 0) {
								$dazzlePopup.toast(result.data.text + ":" + result.data.reject.msg);
								resolve([]);
							} else {
								$scope.dataLength = result.data.resolve.length;
								resolve(result.data.resolve);
							}
						});
				});
			
			};



        $scope.loadData = function () {
                return new Promise(function (resolve, reject) {
                        console.log('Load DynamoDB Data');
                        console.log('Load Data',$dazzleUser.getUser().uid,$scope.tableName,$scope.tableJson);
                        $http({
                            "method": "post",
                            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                            "data": {
                                "action": "searchData",
                                "index": $dazzleUser.getUser().uid,
                                "type": $scope.tableName,
                                "body": {"query": {"match_all": {}}}
                            }
                        }).then(function (result) {
                            console.log('Load Data',result);
                            if (result.data.code < 0) {
                                $dazzlePopup.toast(result.data.text + ":" + result.data.reject.msg);
                                resolve([]);
                            } else {
                                $scope.dataLength = result.data.resolve.length;
                                resolve(result.data.resolve);
                            }
                        });

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
                            newObject[$scope.schemaJson[i].field] = $scope.schemaJson[i].default + date;
                        } else if ($scope.schemaJson[i].default) {
                            newObject[$scope.schemaJson[i].field] = $scope.schemaJson[i].default;
                        }
                    }
                    $scope.gridOptions.api.updateRowData({add: [newObject], addIndex: 0});
                    $scope.dataLength++;
                    $scope.gridOptions.api.refreshInMemoryRowModel();
                    $scope.gridOptions.api.getModel().rowsToDisplay[0].edited = true;
                }
            }
            
            
            $scope.addRecord = function (object) {
                   var date = new Date().getTime().toString();

                    var newObject = {};
                    if (object) {
                        newObject = object;
                    }

                    for (var i = 0; i < $scope.schemaJson.length; i++) {
                        if ($scope.schemaJson[i].defaultByTimestamp) {
                            newObject[$scope.schemaJson[i].field] = date;
                        }
                        // else if ($scope.schemaJson[i].default) {
                        //     newObject[$scope.schemaJson[i].field] = $scope.schemaJson[i].default;
                        // }

                    }
                    $scope.gridOptions.api.updateRowData({add: [newObject], addIndex: 0});
                    $scope.dataLength++;
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
//                $scope.loadSchema().then(function (json) {
 //                   $scope.schemaJson = json;
                console.log('Start refresh',$scope.schemaJson);
                    $scope.loadCell($scope.schemaJson).then(function () {
                        console.log('Load Cell',$scope.schemaJson);
                        $scope.gridOptions.api.setColumnDefs($scope.schemaJson);
                        $scope.loadData().then(function (json) {
                            $scope.gridOptions.api.setRowData(json);
                            $scope.gridOptions.api.refreshView();
                            console.log('Finish Refresh');
                        });
                    });

 //               });
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
						$scope.newSaveData(result).then(function () {
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
				$dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $dazzleUser.dazzleInfo['websiteId'] + "/content/" + $scope.table + "-schema.json", JSON.parse(angular.toJson(newShcema)));
				$scope.schemaJson = newShcema;
			}
			$scope.newSaveData = function (data) {
				return new Promise(function (resolve, reject) {
					console.log(data);
					console.log($scope.tableJson);
						var params = [];
						for (var i = 0; i < data.deleted.length; i++) {
							var dataObject = JSON.parse(angular.toJson(data.deleted[i].data));
							params.push({
								"delete": {
									_index: $scope.tableJson.data.index + '.'+$scope.tableJson.data.table,
									_type: "_doc" , 
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
        									_index: $scope.tableJson.data.index + '.'+$scope.tableJson.data.table,
        									_type: "_doc" , 
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
										"index": {
        									_index: $scope.tableJson.data.index + '.'+$scope.tableJson.data.table,
        									_type: "_doc" , 
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
				})
			}
			$scope.saveData = function (data) {
				return new Promise(function (resolve, reject) {
					console.log(data);
					console.log($scope.tableJson);
						var params = [];
						for (var i = 0; i < data.deleted.length; i++) {
							var dataObject = JSON.parse(angular.toJson(data.deleted[i].data));
							params.push({
								"delete": {
									_index: $scope.tableJson.data.index,
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
        									_index: $scope.tableJson.data.index,
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
										"index": {
        									_index: $scope.tableJson.data.index,
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
						"url":"https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
//						"url": "https://d8fz9pfue5.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-newElasticSearchController",
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
						    console.log('Error',result.data.text + ":" + result.data.err.code);
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
                        console.log('Change');
						var file = this.files[0];
						var tagField = [];
						for (var i = 0; i < $scope.schemaJson.length; i++) {
							if ($scope.schemaJson[i].directive == 'tag') {
								tagField.push($scope.schemaJson[i].field);
							}
						}
					//	alasql('SELECT * FROM FILE(?,{headers:true})', [event], function (data) {
    //                         console.log('Import',data);


    //                         for (var i=0;i<data.length; i++) {
    //                             $scope.addRecord(data[i]);
    //                         }

    
				// 		});
					});
				}
				$scope.fileChooser.click();
			}

			$scope.export = function () {
				var rowData = [];
				$scope.gridOptions.api.forEachNode(function (node) {
					rowData.push(node.data);
				});
			//	alasql('SELECT * INTO XLSX("' + $scope.table + '.xlsx",{headers:true}) FROM ?', [rowData]);
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



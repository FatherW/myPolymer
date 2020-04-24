var app = angular.module('demoApp');
app.directive('dataGridPopup', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var name = 'dataGridPopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/dataGridPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "dataGridPopup";
            scope.type = "dataGridPopup";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser,$dazzleFn,$dazzleData) {
                console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');
                $scope.pageJson=$dazzleUser.getDazzleInfo('pageJson');
                $scope.thisPageJson=$dazzleUser.getDazzleInfo('thisPageJson');
                $scope.userBucket=$dazzleUser.getDazzleInfo('userBucket');
                $scope.exportBucket=$dazzleUser.getDazzleInfo('exportBucket');
				$scope.websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
				$scope.uid = $dazzleUser.getUser().uid;
				$scope.websiteId = $dazzleUser.getDazzleInfo('websiteId');
          
          
			$scope.created = [];
			
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
			$scope.table = $dazzleUser.dazzleInfo['thisTable'];
			$scope.isForm = false;
			$scope.editable = true;
			$scope.modelType = false;
//			$dazzleUser.dazzleInfo['websiteId'] = $routeParams.website;
			$scope.websiteId = $dazzleUser.dazzleInfo['websiteId'];
			$scope.alasql = alasql;
            $scope.websiteTable=[];
			$scope.moment = moment;
			if (!$scope.user) {
				$scope.user = $dazzleUser.getUser();
			}

			$scope.init = function () {
				$dazzleInit.loadWebsiteInfo().then(function(){
                    $dazzleInit.loadDirectiveInfo();
                     $scope.userBucket = $dazzleUser.getDazzleInfo('userBucket');
					 $scope.websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
					 $scope.thisTable = $scope.table;
					 $dazzleUser.setDazzleInfo('thisTable',$scope.thisTable);
					 $dazzleUser.setDazzleInfo('websiteId',$dazzleUser.dazzleInfo['website'].website);
					 $scope.websiteId = $dazzleUser.dazzleInfo['websiteId'];
                     $dazzleFn.getUserTables($dazzleUser.getUser().uid, $scope.websiteId).then(function (tables) {
                        $scope.$apply(function () {
                            $scope.websiteTable = $scope.websiteTable.concat(tables);
                        });
                    });
					 console.log('Load Website Bucket',$scope.userBucket,$scope.websiteKey,$scope.thisTable,$scope.websiteId);
				 });

			}
		
				 
						console.log($dazzleUser.getDazzleInfo('thisTable'));
						
						$scope.inited = false;
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
								onSelectionChanged: function() {
									var selectedRows = $scope.gridOptions.api.getSelectedRows();
									$dazzleInit.loadAtomInfo().then(function() {
									});
								},
								onGridReady: function () {
									$scope.loadTable().then(function (table) {
										console.log('Load Table',table);
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
													$scope.refresh();
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
				


            $scope.dbManage = function (table) {
                document.location.href = "index.html#!/myDbManage/"+$scope.websiteId+"/"+table;
            }

            $scope.home = function (table) {
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

			$scope.loadTable = function () {
				return new Promise(function (resolve, reject) {
					console.log('Get','dazzle-user-' + $dazzleUser.getUser().uid+'/website/' +$dazzleUser.dazzleInfo['websiteId'] + '/' + "content/" + $scope.table + "-table.json");

					$dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid,'website/' +$dazzleUser.dazzleInfo['websiteId'] + '/' + "content/" + $scope.table + "-table.json").then(function (json) {
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
						$dazzlePopup.toast('不能讀取'+$scope.table);
						console.log('dazzle-user-' + $dazzleUser.getUser().uid+'/website/' +$dazzleUser.dazzleInfo['websiteId'] + '/' + "content/" + $scope.table + "-table.json");
						$scope.cancel();
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

			$scope.loadSchema = function () {
				return new Promise(function (resolve, reject) {
					$dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $dazzleUser.dazzleInfo['websiteId'] + "/content/" + $scope.table + "-schema.json").then(function (json) {
						console.log('My Schema',json);
					    resolve(json);
					}, function () {
						$dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $dazzleUser.dazzleInfo['websiteId'] + "/content/" + $scope.table + "-schema.json", []);
						resolve([]);
					});
				});
			};

			$scope.loadData = function () {
				return new Promise(function (resolve, reject) {
					if ($scope.tableJson.data.type === 's3') {
						console.log('Load S3 Data');
						$dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $dazzleUser.dazzleInfo['websiteId'] + "/content/" + $scope.table + "-data.json").then(function (json) {
							$scope.dataLength = json.length;
							resolve(json);
						}, function () {
							$dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $dazzleUser.dazzleInfo['websiteId'] + "/content/" + $scope.table + "-data.json", []);
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
					$scope.gridOptions.api.updateRowData({add: [newObject], addIndex: 0});
					$scope.dataLength++;
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
				$dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $dazzleUser.dazzleInfo['websiteId'] + "/content/" + $scope.table + "-schema.json", JSON.parse(angular.toJson(newShcema)));
				$scope.schemaJson = newShcema;
			}

			$scope.saveData = function (data) {
				return new Promise(function (resolve, reject) {
					console.log(data);
					console.log($scope.tableJson);
					if ($scope.tableJson.data.type === 's3') {
						//console.log('save to s3');
						$scope.gridOptions.api.removeItems(data.deleted);
						$dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $dazzleUser.dazzleInfo['websiteId'] + "/content/" + $scope.table + "-data.json", JSON.parse(angular.toJson(data.rows))).then(function () {
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
						var tagField = [];
						for (var i = 0; i < $scope.schemaJson.length; i++) {
							if ($scope.schemaJson[i].directive == 'tag') {
								tagField.push($scope.schemaJson[i].field);
							}
						}
						alasql('SELECT * FROM FILE(?,{headers:true})', [event], function (data) {
							$scope.gridOptions.api.setRowData(data);
							$scope.gridOptions.api.refreshView();
							$scope.gridOptions.api.forEachNode(function (node) {
								for (var i = 0; i < tagField.length; i++) {
									if (node.data[tagField[i]] && !angular.isArray(node.data[tagField[i]])) {
										node.data[tagField[i]] = node.data[tagField[i]].split(',');
									}
								}
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
          
                $scope.close = function() {
                    $mdDialog.hide();
                }

        }
    };
    return link;
});
var app = angular.module('demoApp');
app.directive('dzSchemaPopup', function ($compile, $timeout, $uibModal, $mdDialog, $mdToast, $dazzleS3,$dazzleData, $dazzleUser, $dazzlePopup,$dazzleInit
,pageInfo, userInfo, dbFactory) {
            // Function save$scope.thisPageJson, save$scope.masterJson, saveRootHtml, saveMasterAtom, save$scope.thisPage
                    // $scope.thisPage => $scope.pagename
                    // $scope.websiteKey => 'website/'+$scope.hostname;

    var directive = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/dzSchemaPopup/element.html?id=" + new Date().getTime(),
        controller: function ($scope, $http, $element) {
           console.log('editSchemaPopupController');
            $scope.website = website;
            $scope.table = table;
            $scope.isForm = isForm || false;
            var schema_obj = {};
            var schema_arr = [];
            var key_arr = [];
            $scope.init = function () {
                
                $dazzl
                $dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid, 'website/' + $scope.website + '/content/' + table + '-table.json').then(function (json) {
                    $scope.$apply(function () {
                        $scope.tableJson = json;
                        console.log("Table:",$scope.tableJson);
                        if ($scope.tableJson && $scope.tableJson.data.type == 'dynamodb' && $scope.tableJson.data.index) {
                            $scope.createIndex($scope.tableJson.data.index);
                        }
                    });
                    $scope.loadDirectives().then(function (directives) {
                        $scope.directives = directives;
                        console.log("Directives:",$scope.directives);
                    });
                });
        
                console.log('Edit Schema Website',$scope.website,$dazzleUser.dazzleInfo['websiteId']);
                $dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid, 'website/' + $scope.website + '/content/' + table + '-schema.json').then(function (json) {
                    $scope.$apply(function () {
                        $scope.schema = JSON.parse(angular.toJson(json));
                        console.log('Schema',$scope.schema);
                    });
                    $scope.loadDirectives().then(function (directives) {
                        $scope.directives = directives;
                        console.log($scope.directives);
                    });
                });
            }
            $scope.loadDirectives = function () {
                return new Promise(function (resolve, rejcet) {
                    var directive = [];
                    if ($scope.isForm) {
        
                        $dazzleS3.getFile('dazzle-template','file6.0/form-schema-tpl.json').then(function(json){
                            console.log('Schema Form',json);
                            resolve(JSON.parse(json));
                        },function(err){
                            console.log(err);
                        });
        
                     } else {
                        $dazzleS3.getFile('dazzle-template','file6.0/new-data-schema-tpl.json').then(function(json){
                            console.log('Schema Data',json);
                            resolve(JSON.parse(json));
                        },function(err){
                            console.log(err);
                        });
                    }
                });
            }
            $scope.isKeyChanged = function (s) {
                if (s.key) {
                    s.required = true
                    s.default = '';
                }
            }
            $scope.addSchema = function () {
                var newSchema = JSON.parse(angular.toJson($scope.directives[0]));
                newSchema.headerName = "新項目";
                $scope.schema.push(newSchema);
            }
            $scope.directiveChanged = function (schema) {
                console.log('Drective Changed');
                var oldSchema = JSON.parse(angular.toJson(schema));
                var directive = null;
                for (var i = 0; i < $scope.directives.length; i++) {
                    if (schema.directive == $scope.directives[i].directive) {
                        directive = JSON.parse(angular.toJson($scope.directives[i]));
                        break;
                    }
                }
                if (directive) {
                    for (var k in schema) {
                        delete schema[k];
                    }
                    angular.extend(schema, directive);
                    schema.field = oldSchema.field;
                    schema.width = oldSchema.width;
                    schema.headerName = oldSchema.headerName;
                    $scope.initSetting(schema);
                }
            }
            $scope.removeSchema = function (index) {
                $scope.schema.splice(index, 1);
            }
            $scope.saveSchema = function () {
                console.log("Save Schema",$scope.website,$scope.tableJson.data.table);
                if ($scope.tableJson && $scope.tableJson.data.type && $scope.tableJson.data.type == 'dynamodb' && $scope.website) {
                    for (var i = 0; i < $scope.schema.length; i++) {
                        if ($scope.schema[i].field && $scope.schema[i].mapping) {
                            var attr_arr = [];
                            key_arr.push($scope.schema[i].field);
                            for (var key in $scope.schema[i].mapping)
                            {
                                attr = $scope.schema[i].mapping[key];
                                attr_arr.push(attr);
                            }
                            if (attr_arr[0] == "string" && attr_arr[1] == "not_analyzed") {
                                $scope.schema[i].mapping = {type: "keyword"};
                            } else if (attr_arr[0] == "string") {
                                $scope.schema[i].mapping = {type: "text"};
                            } else if (attr_arr[0] == "date") {
                                $scope.schema[i].mapping = {type: "long"};
                            }
                            schema_obj[$scope.schema[i].field] = $scope.schema[i].mapping;
                            schema_arr.push(schema_obj);
                            //console.log($scope.schema[i].field);
                        }
                        
        				if ($scope.schema[i].hasOwnProperty('directive') && $scope.schema[i].directive=="page") {
        					var mySchema = $scope.schema[i];
        					$dazzleData.loadTableByName($dazzleUser.dazzleInfo['thisTable']).then(function(table) {
        						table['cellEditorParams'] = mySchema['cellEditorParams'];
        						console.log(table);
        						console.log($dazzleUser.dazzleInfo['thisTable']);
        						$scope.saveTableByName($dazzleUser.dazzleInfo['thisTable'],table).then(function(result) {
        							console.log('Saved Table');
        						});						
        					});
        				}
                    }
        
                    /*var cache = [];
                    JSON.stringify(schema_arr, function(key, value) {
                        console.log(key, value);
                        if (typeof value === 'object' && value !== null) {
                            if (cache.indexOf(value) !== -1) {
                                // Circular reference found, discard key
                                return;
                            }
                            // Store value in our collection
                            cache.push(value);
                        }
                        return value;
                    });
                    cache = null;
                    */
                    console.log("Schema object:",schema_obj);
        
                    $scope.createMapping($scope.website.toLowerCase(), $scope.tableJson.data.table.toLowerCase(), schema_obj);
                }
                $mdDialog.hide($scope.schema);
            }
            $scope.saveTableByName = function(tableName,json) {
                return new Promise(function (resolve, reject) {
                    $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, 'website/' + $dazzleUser.getDazzleInfo('websiteId') + '/' + "content/" + tableName + "-table.json",json).then(function () {
                        resolve();
                    });
                });
            }
            $scope.initSetting = function (s) {
                s.setting = null;
                $ocLazyLoad.load('https://d27btag9kamoke.cloudfront.net/backend6.0/' + s.directive + '/setting.js', {cache: false}).then(function () {
                    s.setting = 'https://d27btag9kamoke.cloudfront.net/backend6.0/' + s.directive + '/setting.html';
                    console.log('Loaded',s.directive);
                }, function () {
                    s.setting = 'https://d27btag9kamoke.cloudfront.net/backend6.0/' + s.directive + '/setting.html';
                });
            }
            $scope.createIndex = function (index) {
                return new Promise(function (resolve, reject) {
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "createIndex",
                            "index": index
                        }
                    }).then(function (result) {
                        resolve();
                    });
                });
            }
            $scope.createMapping = function (index, type, schema) {
                if (index == "dazzleadmin") {
                    index = "dazzle";
                }
                return new Promise(function (resolve, reject) {
                    //var field = schema.field;
                    var mapping="";
                    var body = {};
                    //body[type] = {}
                    body['properties'] = "";
                    body['properties'] = schema;
                    console.log(body['properties']);
        
                    // if (mapping.type="object") {
                    //         body[type]['dynamic_templates']=[{
                    //             "object_strings": {
                    //                 "path_match": field+".*",
                    //                 "match_mapping_type":"string",
                    //                 "mapping": {
                    //                     "type":"string",
                    //                     "index": "not_analyzed"
                    //                 }
                    //             }
                    //         }];
        
                    // }
        
                    console.log(JSON.stringify({
                        "action": "createMapping",
                        "index": index,
                        "type": type,
                        "body": body
                    }));
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "createMapping",
                            "index": $dazzleUser.getUser().uid,
                            "type": type,
                            "body": body
                        }
                    }).then(function (result) {
                        resolve();
                    });
                });
            }
            
        }
    };
    return directive;
}); 







//});
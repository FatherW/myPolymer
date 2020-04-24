var app = angular.module('demoApp');
app.directive('dzEditSchemaPopup', function ($compile, $templateRequest, $mdDialog, $dazzlePopup) {
    var name = 'dzEditSchemaPopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/"+name+"/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser,$ocLazyLoad) {
                console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');


                $scope.schema = params.schema;
                $scope.pageJson=$dazzleUser.getDazzleInfo('pageJson');
                $scope.thisPageJson=$dazzleUser.getDazzleInfo('thisPageJson');
                $scope.userBucket=$dazzleUser.getDazzleInfo('userBucket');
                $scope.exportBucket=$dazzleUser.getDazzleInfo('exportBucket');
                console.log(params);
                console.log('dzEditSchemaPopupController');
                

                $scope.website = params.websiteId;
                $scope.table = params.table;
                $scope.isForm = false;
//                console.log('dazzle-user-' +params.index, 'website/' + params.websiteId + '/content/' + $scope.table + '-table.json');
                $scope.init = function () {
                    $scope.loadDirectives().then(function (directives) {
                        $scope.directives = directives;
                        console.log($scope.directives);
                    });

        
                    // $dazzleS3.getJson('dazzle-user-hotyeah' , 'website/www.hot-yeah.com/content/course-table.json').then(function (json) {
                    //     $scope.$apply(function () {
                    //         $scope.tableJson = json;
                    //         console.log($scope.tableJson);
                    //         if ($scope.tableJson && $scope.tableJson.data.type == 'dynamodb' && $scope.tableJson.data.index) {
                    //             $scope.createIndex($scope.tableJson.data.index);
                    //         }
                    //     });
                    //     $scope.loadDirectives().then(function (directives) {
                    //         $scope.directives = directives;
                    //         console.log($scope.directives);
                    //     });
                    // });
                    
            
            //        console.log('Edit Schema Website',params.websiteId ,$dazzleUser.dazzleInfo['websiteId']);
                   // $dazzleS3.getJson('dazzle-user-' + params.index, 'website/' + params.websiteId  + '/content/' + $scope.table + '-schema.json').then(function (json) {
                        // $scope.$apply(function () {
                        //     $scope.schema = JSON.parse(angular.toJson(json));
                        //     console.log('Schema',$scope.schema);
                        // });
                        // $scope.loadDirectives().then(function (directives) {
                        //     $scope.directives = directives;
                        //     console.log($scope.directives);
                        // });
                //    });
                }
                $scope.loadDirectives = function () {
                    return new Promise(function (resolve, rejcet) {
                        var directive = [];
                        
                         
                        $dazzleS3.getFile('dazzle-template','file6.0/new-data-schema-tpl.json').then(function(json){
                            console.log('Loading new schema data');
                            console.log('Schema Data',json);
                            resolve(JSON.parse(json));
                        },function(err){
                            console.log(err);
                        });
                    
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
                        for (var i = 0; i < $scope.schema.length; i++) {
                            if ($scope.schema[i].field && $scope.schema[i].mapping) {
                                $scope.createMapping($scope.website, $scope.table, $scope.schema[i]);
                            }
            				
            				if ($scope.schema[i].hasOwnProperty('directive') && $scope.schema[i].directive=="page") {
            						console.log($scope.schema[i]);
            					var mySchema = $scope.schema[i];
            				}
                        }
                    $mdDialog.hide($scope.schema);
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
                    return new Promise(function (resolve, reject) {
                        var field = schema.field;
                        var mapping=schema.mapping;
                        var body = {};
                        body = {}
                        body['properties'] = {};
                        body['properties'][field] = mapping;
            
                
                        console.log('My Mapping',JSON.stringify({
                            "action": "createMapping",
                            "index": index+'.'+type,
                            "type": "_doc",
                            "body": body
                        }));
                        $http({
                            "method": "post",
                            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                            "data": {
                                "action": "createMapping",
                                "index": index+'.'+type,
                                "type": "_doc",
                                "body": body
                            }
                        }).then(function (result) {
                            resolve();
                        });
                    });
                }
        }
    };
    return link;
});
var app = angular.module('demoApp');
app.directive('dazzleNews', function ($compile, $templateRequest, $mdDialog, $uibModal,$dazzleData) {
    var dazzleNews = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "//d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "dazzleNews";
            scope.type = "dazzleNews";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                if (!angular.isUndefined(scope.model.db)){
                    //var db
                    $dazzleData.loadDataByModelDb(scope.model.db).then(function(record){
                        scope.model.data = record;
                        console.log('My Data',scope.model.data);
                    });
                    
                    //scope.useTemplate();
                }

			scope.useTemplate();
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                scope.$apply(function () {
                    $compile(template)(scope);
                });


            });
        },
        controller: function ($scope, $element, $attrs, $dazzlePopup,$dazzleUser) {
            $scope.loadNews = function () {
           /*
				return new Promise(function (resolve, reject) {
                    $scope.getJson($dazzleUser.dazzleInfo['userBucket'], $dazzleUser.dazzleInfp['websiteKey'] + "content/news-data.json").then(function (json) {
                        $scope.model.news = json;
                        console.log(json);
                        $scope.updateHtml();

                        resolve(json);
                    }, function () {
                        $scope.saveJson($scope.userBucket, $scope.websiteKey + "content/news-data.json", []);
                        resolve([]);
                    });
                });
			*/	
					return new Promise(function (resolve, reject) {
                        console.log(scope.data);
                        if (angular.isUndefined($scope.model.db)){
                            scope.getJson($dazzleUser.dazzleInfo['userBucket'], $dazzleUser.dazzleInfo['websiteKey'] + "content/news-data.json").then(function (json) {
                                $scope.model.data = json;
                                console.log(json);
                                //                        $scope.updateHtml();
                                $scope.useTemplate();
    
                                resolve(json);
                            }, function () {
                                $scope.saveJson($dazzleUser.dazzleInfo['userBucket'], $dazzleUser.dazzleInfo['websiteKey'] + "content/news-data.json", []);
                                resolve([]);
                            });                            
                        } else {
                            $dazzleData.loadDataByModelDb($scope.model.db).then(function(record){
                                $scope.model.data = record;
                                resolve(record);
                            });
                        }
                    });

            }

            $scope.menuOptions = [
                ["編輯新聞", function () {
                    $dazzlePopup.dataManagement($scope.websiteId, 'news').then(function () {
                        if ($scope.loadNews) {
                            $scope.loadNews();
                        }
                    });
                }],
				["資料欄位設定", function () {
                
                    var params = {
                        db:$scope.model.db|| {},
                      directive: '<db-setting-popup></db-setting-popup>'  
                    };
                    $dazzlePopup.callPopup(params).then(function(result){
                       $scope.model.db = result; 
                       console.log($scope.model);
                    });
                }],

                ["更換模版", function () {
                    var params = {
                        "name": 'templatePopup',
                        "directive": '<template-popup></template-popup>',
                        'model': $scope.model
                    };

                    $dazzlePopup.callPopup(params).then(function(template){
                        console.log(template);
                        $scope.loadNews();
                        if (!angular.isUndefined($scope.model.db))
                            $dazzleData.loadDataByModelDb($scope.model.db).then(function(record){
                                $scope.model.data = record;
                                $scope.useTemplate();
                            });
					});
                }]
            ];
            $scope.beforeAtomSaved = function () {

            }
            $scope.afterAtomSaved = function () {

            }
        }
    };
    return dazzleNews;
});
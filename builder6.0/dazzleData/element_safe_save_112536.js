var app = angular.module('demoApp');

app.directive('dazzleData', function ($compile, $templateRequest, $mdDialog, $uibModal, $dazzlePopup,$dazzleData,$dazzleUser,$dazzleS3) {
    var dazzleData = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "//d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "dazzleData";
            scope.type = "dazzleData";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.data = element.attr('data');
            scope.datafilter = element.attr('datafilter');
            scope.pageSize = element.attr('size') || 10;
            scope.userBucket = $dazzleUser.getDazzleInfo('userBucket');
            scope.websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
            scope.websiteId = $dazzleUser.getDazzleInfo('websiteId');
            scope.editorCustomInit(scope, element, attrs).then(function () {
                scope.loadData = function () {
                    return new Promise(function (resolve, reject) {
                        console.log(scope.data);
                        if (angular.isUndefined(scope.model.db)){
                            scope.getJson(scope.userBucket, scope.websiteKey + "content/" + scope.data + "-data.json").then(function (json) {
                                scope.model.data = json;
                                console.log(json);
                                //                        $scope.updateHtml();
                                scope.useTemplate();
    
                                resolve(json);
                            }, function () {
                                scope.saveJson(scope.userBucket, scope.websiteKey + "content/" + scope.data + "-data.json", []);
                                resolve([]);
                            });                            
                        } else {
                            $dazzleData.loadDataByModelDb(scope.model.db).then(function(record){
								scope.model.data = record;
								$dazzleS3.saveJson($dazzleUser.dazzleInfo['exportBucket'],'content/'+scope.data+'-data.json',scope.model.data).then(function(result){
									console.log('success');
								},function(err){
									console.log(err);
								});
								
								
                                resolve(record);
                            });
                        }
                    });
                }
                
                if (!angular.isUndefined(scope.model.db)){
                    //var db
                    $dazzleData.loadDataByModelDb(scope.model.db).then(function(record){
                        scope.model.data = record;
						console.log('My DB',$dazzleUser.dazzleInfo['exportBucket'],'content/'+scope.data+'-data.json',scope.model.data);
						$dazzleS3.saveJson($dazzleUser.dazzleInfo['exportBucket'],'content/'+scope.data+'-data.json',scope.model.data).then(function(result){
							console.log('success');
						},function(err){
							console.log(err);
						});
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
        controller: function ($scope, $element, $attrs) {
            $scope.currentPage = 0;

            $scope.numberOfPages = function () {
                return Math.ceil($scope.model.data.length / $scope.pageSize);
            }


            $scope.menuOptions = [

                ["編輯資料", function () {
/*                    var params = {
						'name':'dataManagementPopup',
						'directive':'<data-management-popup></data-management-popup>',
						'big':true
					}
					$dazzlePopup.callPopup(params).then(function() {
						
						
					});
	*/				
					
                    $dazzlePopup.dataManagement($dazzleUser.dazzleInfo['websiteId'], $scope.data).then(function () {
                        if (!angular.isUndefined($scope.model.db))
                            $dazzleData.loadDataByModelDb($scope.model.db).then(function(record){
                                $scope.model.data = record;
                                $scope.useTemplate();
                            });
                        if ($scope.loadData) {
                            $scope.loadData();
                        }
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
                        $scope.loadData();
                        if (!angular.isUndefined($scope.model.db))
                            $dazzleData.loadDataByModelDb($scope.model.db).then(function(record){
                                $scope.model.data = record;
                                $scope.useTemplate();
                            });
                    });
                    // $mdDialog.show({
                    //     controller: 'templatePopupController',
                    //     templateUrl: 'models/templatePopup/popup.html' + "?id=" + new Date().getTime(),
                    //     locals: {
                    //         rootScope: $scope
                    //     }
                    // }).then(function (template) {
                    // 	console.log(template);
                    //     $scope.loadData();
                    //     if (!angular.isUndefined($scope.model.db))
                    //     $dazzleData.loadDataByModelDb($scope.model.db).then(function(record){
                    //         $scope.model.data = record;
                    //         $scope.useTemplate();
                    //     });
                    // });
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
                }]

            ];
            $scope.beforeAtomSaved = function () {

            }
            $scope.afterAtomSaved = function () {

            }
            $scope.myDate = function(timestamp){
                return new Date(timestamp*1000).toLocaleDateString();
            }
        }
    };
    return dazzleData;
});


app.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
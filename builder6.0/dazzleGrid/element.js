var app = angular.module('demoApp');
app.directive('dazzleGrid', function ($compile, $templateRequest, $mdDialog, $http) {
    var dazzleGrid = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "dazzleGrid";
            scope.type = "dazzleGrid";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                if (angular.isUndefined(scope.model.gotObj)) {

                    console.log('Load Gallery');
                    var url = "https://9g1gx9kfdc.execute-api.ap-northeast-1.amazonaws.com/dazzlegallery/getallimage";
                    var data = JSON.stringify({
                        token: "9g1gx9kfdcRGsaBfDRTrBVX3ewdrWFtmCD",
                        limit: 100
                    });


                    console.log('my Query', data);
                    setTimeout(function () {
                        $http.post(url, data).then(function (postResponse) {
                            var gotObj = postResponse.data.Items;
                            console.log('Got It', gotObj);
                            if (!postResponse.data.LastEvaluatedKey) {
//                                $scope.end = true;
                            }
                            lastEvaluatedKey = postResponse.data.LastEvaluatedKey;
                            scope.model.gotObj = [];
                            setTimeout(function () {
                                scope.$apply(function () {
                                    scope.model.gotObj = scope.model.gotObj.concat(gotObj);
                                    scope.updateHtml();
                                    //console.log($scope.gotObj);
                                });
                                //                                $scope.loading = false;
                            }, 1000);
                        });
                    }, 1);

                }

                if (angular.isUndefined(scope.model.realHtml)) {
                    $templateRequest("http://d25k6mzsu7mq5l.cloudfront.net/builder6.0/" + scope.directiveId + "/realHtml.html" + "?id" + new Date().getTime()).then(function (html) {
                        scope.model.realHtml = html;
                    });
                }


                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                scope.$apply(function () {
                    $compile(template)(scope);
                });
            });
        },
        controller: function ($scope, $element, $attrs) {

            $scope.loadJssCsss('http://dazzle.website/infinteScroll/css/style.css');


            $scope.shots = [];
            $scope.loadingMore = false;
            $scope.lastEvaluatedKey = null;
            $scope.end = false;


            $scope.init = function () {
                $scope.loadMoreShots();
            }
            $scope.loadMoreShots = function () {

                if ($scope.end) {
                    console.log('stop');
                    return;
                }

                if ($scope.loadingMore)
                    return;

                $scope.loadingMore = true;

                // var deferred = $q.defer();
                var url = "https://9g1gx9kfdc.execute-api.ap-northeast-1.amazonaws.com/dazzlegallery/getallimage";

                if ($scope.lastEvaluatedKey)
                    var data = JSON.stringify({
                        token: "9g1gx9kfdcRGsaBfDRTrBVX3ewdrWFtmCD",
                        ExclusiveStartKey: $scope.lastEvaluatedKey,
                        limit: 100
                    });
                else
                    var data = JSON.stringify({
                        token: "9g1gx9kfdcRGsaBfDRTrBVX3ewdrWFtmCD",
                        limit: 100
                    });
                var promise = $http.post(url, data);

                promise.then(function (postResponse) {

                    $scope.lastEvaluatedKey = postResponse.data.LastEvaluatedKey;

                    var shotsTmp = angular.copy($scope.shots);
                    shotsTmp = shotsTmp.concat(postResponse.data.Items);
                    $scope.shots = shotsTmp;
                    console.log('Length', $scope.shots.length);

                    if ($scope.shots.length >= 500) {
                        console.log('More than 500');
                        $scope.end = true;
                    }

                    $scope.loadingMore = false;

                    console.log('One Lap');
                }, function () {
                    $scope.loadingMore = false;
                });
                return promise;
            };


            $scope.menuOptions = [
                ["dazzleGrid", function () {
                    console.log("Menu Clicked:dazzleGrid");
                    $scope.updateHtml();
                }],
                ["更換模版", function () {
                    $mdDialog.show({
                        controller: 'templatePopupController',
                        templateUrl: 'models/templatePopup/popup.html' + "?id=" + new Date().getTime(),
                        locals: {
                            rootScope: $scope
                        }
                    }).then(function (template) {
                        $scope.useTemplate();
                    });
                }]
            ];
            $scope.beforeAtomSaved = function () {

            }
            $scope.afterAtomSaved = function () {

            }
        }
    };

    return dazzleGrid;
});
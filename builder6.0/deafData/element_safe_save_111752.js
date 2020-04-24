var app = angular.module('demoApp');
app.directive('deafData', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var deafData = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "deafData";
            scope.type = "deafData";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                $compile(template)(scope);
            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.menuOptions = [];
            $attrs.$observe('data', function (value) {
                $scope.tableName = value;
            });
            $scope.init = function () {
                console.log($scope.model);
                $scope.loadData().then(function (data) {
                    $scope.model.data = data;
                    console.log($scope.model);
                });
            }
            $scope.loadData = function () {
                return new Promise(function (resolve, reject) {
                    $scope.getJson($scope.userBucket, $scope.websiteKey + "content/" + $scope.tableName + "-data.json").then(function (json) {
                        resolve(json);
                    }, function () {
                        $scope.saveJson($scope.userBucket, $scope.websiteKey + "content/" + $scope.tableName + "-data.json", []);
                        resolve([]);
                    });
                });
            }
        }
    };
    return deafData;
});
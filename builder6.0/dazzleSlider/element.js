var app = angular.module('demoApp', ['ui.bootstrap']);
app.directive('dazzleSlider', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var dazzleSlider = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "dazzleSlider";
            scope.type = "dazzleSlider";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                /*if (angular.isUndefined(scope.model.field)) {
                 scope.model.field = "xxx";
                 scope.updateHtml();
                 //scope.updateRealHtml();
                 }*/
                scope.useTemplate();
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                $compile(template)(scope);
            });
        },
        controller: function ($scope, $element, $attrs) {

            $scope.loadSlider2 = function () {
                $scope.myInterval = 3000;
                $scope.slides = [
                    {
                        image: 'http://lorempixel.com/400/200/'
                    },
                    {
                        image: 'http://lorempixel.com/400/200/food'
                    },
                    {
                        image: 'http://lorempixel.com/400/200/sports'
                    },
                    {
                        image: 'http://lorempixel.com/400/200/people'
                    }
                ];
            }
            $scope.loadSlider = function () {
                return new Promise(function (resolve, reject) {
                    $scope.getJson($scope.userBucket, $scope.websiteKey + "content/slider-data.json").then(function (json) {
                        $scope.model.slider = json;
                        console.log(json);
                        $scope.updateHtml();

                        resolve(json);
                    }, function () {
                        $scope.saveJson($scope.userBucket, $scope.websiteKey + "content/slider-data.json", []);
                        resolve([]);
                    });
                });
            }

            $scope.menuOptions = [

                ["編輯Slider", function () {
                    $mdDialog.show({
                        controller: "dataPopupController",
                        templateUrl: 'models/dataPopup/popup.html' + '?id=' + new Date().getTime(),
                        clickOutsideToClose: false,
                        locals: {
                            rootScope: $scope,
                            table: "slider"
                        }
                    }).then(function () {
                        $scope.loadSlider();
                    });
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
    return dazzleSlider;
});
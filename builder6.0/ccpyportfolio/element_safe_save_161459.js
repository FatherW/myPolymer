var app = angular.module('demoApp');
app.directive('ccpyportfolio', function ($compile, $templateRequest, $mdDialog) {
    var path = "https://d27btag9kamoke.cloudfront.net/";
    var key = "builder6.0/ccpyportfolio/html/id-1490759764911.html";
    var ccpyportfolio = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element) {
            //console.log('ccpyportfolio loading start');
            $templateRequest(path + key + "?id" + new Date().getTime()).then(function (html) {
                var template = angular.element(html);
                element.html(template);
                $compile(template)(scope);
                //console.log('ccpyportfolio loading end');
            });
        },
        controller: function ($scope, $element, $attrs) {
            //console.log('ccpyportfolio init start');
            $scope.id = $element.attr('id') || "ele" + new Date().getTime() + "-" + Object.keys($scope.atom).length;
            $element.attr('id', $scope.id);
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "type": "editor-ccpyportfolio-element"
                };
                if (!$.trim($element.html())) {
                    $scope.atom[$scope.id].html = '<div>ccpyportfolio</div>'
                } else {
                    $scope.atom[$scope.id].html = $element.html();
                }
            }
            $scope.model = $scope.atom[$scope.id];
            $scope.editorCustomInit($scope, $element);
            //console.log('ccpyportfolio init end');

            $scope.menuOptions = [
                ["編緝portfolio", function () {
                    $mdDialog.show({
                        controller: 'contentPopupController',
                        templateUrl: 'models/contentPopup/popup.html' + "?id=" + new Date().getTime(),
                        locals: {
                            rootScope: $scope,
                            table: "portfolio"
                        }
                    }).then(function () {
                        $scope.getRealHtml();
                    });
                }]
            ];

            $scope.getRealHtml = function () {
                $scope.getJson($scope.userBucket, $scope.websiteKey + 'content/portfolio-data.json').then(function (portfolio) {
                    $scope.portfolio = portfolio;
                    $scope.initCategory(portfolio);
                    $templateRequest("https://s3-ap-southeast-1.amazonaws.com/dazzle-template/builder6.0/ccpyportfolio/html/1490759774849.html" + "?id" + new Date().getTime()).then(function (html) {
                        var template = angular.element(html);
                        $compile(template)($scope);
                        setTimeout(function () {
                            $scope.$apply(function () {
                                $scope.model.html = template.html()
                                    .replace(/(ng-\w+-\w+="(.|\n)*?"|ng-\w+="(.|\n)*?"|ng-(\w+-\w+)|ng-(\w+))/g, "")
                                    .replace(/myclick/g, "onclick")
                                    .replace(/<!--(.*?)-->/gm, "");
                            });
                        }, 500);
                    });
                });
            }

            $scope.initCategory = function (portfolio) {
                $scope.category = [];
                for (var i = 0; i < portfolio.length; i++) {
                    if ($scope.category.indexOf(portfolio[i].category) < 0) {
                        $scope.category.push(portfolio[i].category);
                    }
                }
            }

            $scope.init = function () {
                $scope.getRealHtml();
            }();
        }
    };
    return ccpyportfolio;
});
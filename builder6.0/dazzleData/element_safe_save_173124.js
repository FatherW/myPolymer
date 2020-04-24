var app = angular.module('demoApp');

app.directive('dazzleData', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var dazzleData = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "dazzleData";
            scope.type = "dazzleData";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.data = element.attr('data');
            scope.pageSize = element.attr('size') || 10;
            scope.editorCustomInit(scope, element, attrs).then(function () {


                scope.loadData = function() {
                    return new Promise(function (resolve, reject) {
                        console.log(scope.data);
                        scope.getJson(scope.userBucket, scope.websiteKey + "content/"+scope.data+"-data.json").then(function (json) {
                            scope.model.data = json;
                            console.log(json);
    //                        $scope.updateHtml();
                            scope.useTemplate();

                            resolve(json);
                        }, function () {
                            scope.saveJson(scope.userBucket, scope.websiteKey + "content/"+scope.data+"-data.json", []);
                            resolve([]);
                        });
                    });                
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

            $scope.numberOfPages=function(){
                return Math.ceil($scope.model.data.length/$scope.pageSize);                
            }
           


            $scope.menuOptions = [
            
                ["編輯資料", function () {
                    $dazzlePopup.dataManagement($scope.websiteId, $scope.data).then(function () {
                        if ($scope.loadData) {
                            $scope.loadData();
                        }
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
                     $scope.loadData();
                 });
                 }]
            ];
            $scope.beforeAtomSaved = function () {

            }
            $scope.afterAtomSaved = function () {

            }
        }
    };
    return dazzleData;
});


app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

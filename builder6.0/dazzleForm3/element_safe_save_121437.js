var app = angular.module('demoApp');
app.directive('dazzleForm3', function ($compile, $templateRequest, $uibModal, $mdDialog) {
    var dazzleForm3 = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "dazzleForm3";
            scope.type = "dazzleForm3";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {

                if (angular.isUndefined(scope.model.form)) {

console.log("undefine");

                    /*
                    scope.model.form = [{
                        id: 'item-' + new Date().getTime(),
                        title: "電郵",
                        type: "input"
                    }];
                    */

                    scope.model.form = [{
                            "directive": "email",
                            "directiveName": "電郵",
                            "headerName": "電郵",
                            "field": "電郵",
                            "key": false,
                            "required": false,
                            "default": "",
                            "defaultByTimestamp": false,
                            "cellRenderer": "emailRenderer",
                            "cellEditor": "emailEditor"
                    }];

                    scope.updateHtml();
                }
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                scope.$apply(function () {
                    $compile(template)(scope);
                });
            });
        },
        controller: function ($scope, $element, $attrs) {

            $scope.loadData = function() {
                return new Promise(function (resolve, reject) {
                    $scope.getJson($scope.userBucket, $scope.websiteKey + "content/"+$scope.data+"-data.json").then(function (json) {
                        $scope.model.data = json;
                        console.log(json);
                        $scope.updateHtml();

                        resolve(json);
                    }, function () {
                        $scope.saveJson($scope.userBucket, $scope.websiteKey + "content/"+$scope.data+"-data.json", []);
                        resolve([]);
                    });
                });                
            }

            $scope.menuOptions = [
                ["編緝表格", function ($itemScope) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'models/formPopup/popup.html' + '?id=' + new Date().getTime(),
                        controller: 'formPopupCtrl',
                        size: 'lg',
                        resolve: {
                            rootScope: function () {
                                console.log('resolve scope', $scope);
                                return $scope
                            },
                            menu: function () {
                                console.log('Resolveform', $scope.model.form);

                                return $scope.model.form
                            }
                        }
                    });
                    modalInstance.result.then(function (menu) {
console.log('modalResult',menu);

                        $scope.model.form = menu;
                        $scope.useTemplate();
                    }, function() {
                        console.log('cancel');
                    });
                }],
                ["編輯資料", function () {
                      $mdDialog.show({
                                controller: "dataPopupController",
                                templateUrl: 'models/dataPopup/popup.html' + '?id=' + new Date().getTime(),
                                clickOutsideToClose: false,
                                locals: {
                                    rootScope: $scope,
                                    table: $scope.data
                                }
                            }).then(function(){
                                $scope.loadData();
                            });
                }]/*,
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
                }]*/
            ];

            $scope.beforeAtomSaved = function () {

            }
            $scope.afterAtomSaved = function () {

            }
        }
    };
    return dazzleForm3;
});
var app = angular.module('demoApp');
app.directive('editorTabElement', function ($compile, $templateRequest, $mdDialog, $dazzlePopup) {
    var editorTabElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
//        templateUrl: "//d25k6mzsu7mq5l.cloudfront.net/file6.0/directive-template.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "http://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "editorTabElement";
            scope.type = "editorTabElement";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                if (angular.isUndefined(scope.model.menu)) {
                    scope.model.menu = [{
                        "title": "Item 01",
                        "id": "menu-" + new Date().getTime(),
                        "link": "#",
                        "type": 'Menu',
                        "list": []
                    }];
                    scope.model.type = "editorTabElement";
                }
                if (element.attr('list')){
                    list = element.attr('list');
                    var id = element.attr('id');
                    console.log(list);
                    console.log('id',element.attr('id'));
                    scope.atom[id].menu = scope.atom[list].menu;
                    scope.model.menu = scope.atom[list].menu;
                    scope.useTemplate();
                }   

                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                $compile(template)(scope);
            });
        },
        controller: function ($scope, $element, $attrs) {
            var list = $element.attr('list') || '';
            var id = $element.attr('id');

            $scope.menuOptions = [
                ["編輯Menu", function () {
                   if (list){
                        $scope.model.menu = $scope.atom[list].menu;
                        console.log('List Menu',list,$scope.atom[list].menu);
                    }


                    var params = {
                        menu: $scope.model.menu,
                        directive:'<menu-popup></menu-popup>'
                    };
                    $dazzlePopup.callPopup(params).then(function(menu) {
                        if (list)
                            $scope.atom[list].menu = menu;
                        else 
                            $scope.model.menu = menu;
                        


                        $scope.model.menu = menu;
                        $scope.useTemplate();

                    
                    });
                    
                    /*
                    $mdDialog.show({
                        controller: 'menuPopupCtrl',
                        templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/menuPopup/popup.html' + '?id=' + new Date().getTime(),
                          clickOutsideToClose: true,
                        escapeToClose: true,
                        multiple: true,
                        locals: {
                            rootScope: $scope,
                            menu: $scope.model.menu
                        }
                    }).then(function (menu) {
                        if (list)
                            $scope.atom[list].menu = menu;
                        else {
                            $scope.model.menu = menu;
                        }


                        $scope.model.menu = menu;
                        $scope.useTemplate();

                    });
*/

                }], ["更換模版", function () {
                    $mdDialog.show({
                        controller: 'templatePopupController',
                        templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/templatePopup/popup.html' + "?id=" + new Date().getTime(),
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
    return editorTabElement;
});
var app = angular.module('demoApp');
var list="";
app.directive('dazzleTab', function ($compile, $templateRequest, $uibModal, $mdDialog,$dazzleUser,$dazzleData,$dazzleInit,$dazzleFn,$dazzlePopup) {
    var dazzleTab = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        transclude: true,

        link: function (scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "dazzleTab";
            scope.type = "dazzleTab";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () { 
                if (!element.attr('list')){
                    list = element.attr('id');
                    if (angular.isUndefined(scope.model.menu)) {
                        scope.model.menu = [
                            {
                                "title": "Item 1",
                                "link": "#",
                                "html": "<div text>Please Type Something</div>",
                                "id": "item-" + new Date().getTime() + "1",
                                "list": []
                            },
                            {
                                "title": "Item 2",
                                "link": "#",
                                "html": "<div text>Please Type Something</div>",
                                "id": "item-" + new Date().getTime() + "2",
                                "list": []
                            },
                            {
                                "title": "Item 3",
                                "link": "#",
                                "html": "<div text>Please Type Something</div>",
                                "id": "item-" + new Date().getTime() + "3",
                                "list": []
                            }];
                        scope.updateHtml();
                    } 
                }

                if (element.attr('list')){
                    list = element.attr('list');
                    var id = element.attr('id');
                    console.log(list);
                    console.log('id',element.attr('id'));
                    $dazzleUser.dazzleInfo['atom'][id].menu = $dazzleUser.dazzleInfo['atom'][list].menu;
                    scope.model.menu = scope.atom[list].menu;
                    scope.useTemplate();
                }   
                var rawhtml = scope.model.html;
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                scope.$apply(function () {
                    $compile(template)(scope);
                });
            });
        },
        controller: function ($scope, $element, $attrs) {
            var list = $element.attr('list') || '';
            var id = $element.attr('id');


            $scope.menuOptions = [
                ["編輯Menu", function () {

//                    console.log('List',list);
                    if (list){
                        $scope.model.menu = $scope.atom[list].menu;
                        console.log('List Menu',list,$scope.atom[list].menu);
                    }

                    console.log('Menu',$scope.model.menu);

                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'models/tabPopup/popup.html' + '?id=' + new Date().getTime(),
                        controller: 'tabPopupCtrl',
                        size: 'lg',
                        resolve: {
                            rootScope: function () {
                                return $scope
                            },
                            menu: function () {
                                return $scope.model.menu
                            }
                        }
                    });
                    modalInstance.result.then(function (menu) {

                        if (list)
                            $scope.atom[list].menu = menu;
                        else {
                            $scope.atom[id].menu = menu;
                        }
                        console.log('Atom ',id,$scope.atom[id].menu);                                           
                        $scope.model.menu = menu;
                        $scope.useTemplate();                                  

                        //$scope.getTemplateHtml();
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

                console.log('beforeSaved');
                angular.forEach($scope.model.menu,function(item,index){
                    $scope.model.menu[index].html=$('#con-'+item.id).html();
                });

                // var panels=$('#'+$scope.model.id).find('.panel').each(function(index){
                //     $scope.model.menu[index].html = $(this).html();
                //     console.log(index);
                // });
                // console.log($scope.model.menu);
                // $scope.updateHtml();
            }
            /*
            $scope.afterAtomSaved = function () {
                console.log('After Save');

            }
            */
        }
    };
    return dazzleTab;
});
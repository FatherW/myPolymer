var app = angular.module('demoApp');
app.directive('editorMenuElement', function ($compile, $templateRequest, $uibModal, $mdDialog,$dazzlePopup) {
    var editorMenuElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
//        templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/file6.0/directive-template.html",
        link: function (scope, element, attrs) {
            scope.http = "//d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "editorMenuElement";
            scope.type = "editorMenuElement";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                if (angular.isUndefined(scope.model.menu)) {
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
                        scope.atom[id].menu = scope.atom[list].menu;
                        scope.model.menu = scope.atom[list].menu;
                        scope.useTemplate();
                    }   
                }
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                scope.$apply(function () {
                    $compile(template)(scope);
                });
            });
        },
        controller: function ($scope, $element, $attrs) {
            $scope.menuOptions = [
                ["編緝Menu", function ($itemScope) {
                
                    var params = {
                        menu: $scope.model.menu,
                        directive: "<menu-popup></menu-popup>"
                    };
                    
                    $dazzlePopup.callPopup(params).then(function(menu){
                        $scope.model.menu = menu;
                        console.log('Menu',menu);
                        $scope.useTemplate();
                    });
                    
                }],
                 ["頁面編輯", function ($itemScope) {
                
                    var params = {
                        table: "page",
                        big: true,
                        directive: "<editor-data2></editor-data2>"
                    };
                    
                    $dazzlePopup.callPopup(params).then(function(record){
                        console.log('Done');
                        //$scope.useTemplate();
                    });
                    
                }],
                ["更換模版", function () {
                    var params = {
                        name:'templatePopup',
                        directive: '<template-popup></template-popup>',
                        model: $scope.model
                    }
                    $dazzlePopup.callPopup(params).then(function(template){
                        $scope.useTemplate();
                    });
                    
                    // $mdDialog.show({
                    //     controller: 'templatePopupController',
                    //     templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/templatePopup/popup.html' + "?id=" + new Date().getTime(),
                    //     locals: {
                    //         rootScope: $scope
                    //     }
                    // }).then(function (template) {
                    //     $scope.useTemplate();
                    // });
                }]
            ];
        }
    };
    return editorMenuElement;
});
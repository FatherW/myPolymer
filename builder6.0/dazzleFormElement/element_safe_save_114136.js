var app = angular.module('demoApp');
app.directive('dazzleFormElement', function($compile, $templateRequest, $mdDialog, $uibModal) {
    var dazzleFormElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function(scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "dazzleFormElement";
            scope.type = "dazzleFormElement";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function() {
                scope.formId = new Date().getTime();
                if (angular.isUndefined(scope.model.schema)) {
                    scope.model.schema = [{
                        "directive": "text",
                        "directiveName": "文字",
                        "headerName": "文字",
                        "field": "文字"
                    }/*, {
                        "directive": "image",
                        "directiveName": "圖片",
                        "headerName": "圖片",
                        "field": "圖片",
                        "cellEditor": "image",
                        "cellRenderer": "imageRenderer"
                    }, {
                        "directive": "select",
                        "directiveName": "選項",
                        "headerName": "選項",
                        "field": "選項",
                        "cellEditor": "select",
                        "cellEditorParams": {
                            "values": [
                                "選項1",
                                "選項2",
                                "選項3"
                            ]
                        }
                    }, {
                        "directive": "date",
                        "directiveName": "日期",
                        "headerName": "日期",
                        "field": "日期",
                        "cellEditor": "dateEditor"
                    }*/
                    ];

                    scope.updateHtml();
                }
                /*if (angular.isUndefined(scope.model.field)) {
                 scope.model.field = "xxx";
                 scope.updateHtml();
                 //scope.updateRealHtml();
                 }*/
                /*
                scope.updateHtml().then(function (){
                   scope.model.html=scope.model.html.replace(/yourangular/g,"ng");
                   console.log(scope.model.html);
                   var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                   element.html(template);
                   scope.$apply(function () {
                       $compile(template)(scope);
                   });
                });*/
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                element.html(template);
                scope.$apply(function() {
                    $compile(template)(scope);
                });
                //console.log(scope.model.html);

            });
            /*element.find('.removeThis').bind('click', function($event) {
                console.log($event);
            });*/
        },
        controller: function($scope, $element, $attrs) {
            $scope.menuOptions = [
                ["dazzleFormElement", function() {
                    console.log("Menu Clicked:dazzleFormElement");
                }],
                ["新增欄位", function() {
                    console.log("Add new column");
                }],
                ["移除欄位", function() {
                    console.log("remove new column");
                }],
                ['表格設置', function($itemScope, node) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        keyboard: false,
                        templateUrl: 'models/formTablePopup/formTablePopup.html' + "?id=" + new Date().getTime(),
                        controller: 'formTablePopupController',
                        size: 'lg',
                        resolve: {
                            "table": function() {
                                return $scope.model
                            }
                        }
                    });
                    modalInstance.result.then(function(table) {
                        $scope.model = table;
                        $scope.updateHtml();
                    });
                }]
                /*,
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
            $scope.removeThis = function(thisIndex) {
                console.log(thisIndex);
            }

            /*$scope.elementMenuOptions = [
                ["dazzleFormTextElement", function ($itemScope, $event, modelValue, text, $li) {
                    console.log($itemScope.formElement);
                }],
                ['欄位設置', function ($itemScope) {
                        console.log($itemScope);
                        $mdDialog.show({
                        controller: 'contentPopupController',
                        templateUrl: 'models/contentPopup/popup.html' + "?id=" + new Date().getTime(),
                        locals: {
                            rootScope: $scope,
                            table: tab
                        }
                    }).then(function () {
                        if (!angular.isUndefined($scope.dataUpdate)) {
                            $scope.dataUpdate();
                        }
                    });
                        
                    }]
                    
            ];*/
            $scope.elementMenuOptions = function(item) {
                console.log(item);
                return [
                    ['data', function($itemScope, $event, item) {
                        console.log(item);
                    }]
                ];
            };
            $scope.beforeAtomSaved = function() {

            }
            $scope.afterAtomSaved = function() {

            }
        }
    };
    return dazzleFormElement;
});
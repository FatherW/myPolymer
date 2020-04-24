var app = angular.module('demoApp');
app.requires.push('angular-marquee'); 
app.directive('kpleeRunningElement', function ($compile, $templateRequest,$uibModal,$mdDialog) {
    var kpleeRunningElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "kpleeRunningElement";
            var path = "https://d27btag9kamoke.cloudfront.net/";
    		var key = "builder6.0/id-1490239396685/html/id-1490239396685.html";
            scope.type = "kpleeRunningElement";
            scope.templatePath = key + "?id" + new Date().getTime();
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                if (angular.isUndefined(scope.model.list)) {
                    scope.model.list=[
                        {
                            "title":"圖片1",
                            "link":"http://sunta520.dazzle.website/image/Icon with Banner_01-02.jpg"
                        },
                        {
                            "title":"圖片2",
                            "link":"http://sunta520.dazzle.website/image/Icon with Banner_01-04.jpg"
                        },
                        {
                            "title":"圖片3",
                            "link":"http://sunta520.dazzle.website/image/Icon with Banner_01-06.jpg"
                        },
                        {
                            "title":"圖片4",
                            "link":"http://sunta520.dazzle.website/image/Icon with Banner_01-06.jpg"
                        },
                        {
                            "title":"圖片5",
                            "link":"http://sunta520.dazzle.website/image/Icon with Banner_01-06.jpg"
                        },
                        {
                            "title":"圖片6",
                            "link":"http://sunta520.dazzle.website/image/Icon with Banner_01-06.jpg"
                        }
                        
                    ];

                    scope.updateHtml();
                }
                var template = angular.element('<div bind-html-compile="model.html" context-menu="marqueeMenuOptions"></div>');
                element.html(template);
                scope.$apply(function () {
                    $compile(template)(scope);
                });
            });
        },
        controller: function ($scope, $element, $attrs) {
        	$scope.marqueeMenuOptions = [
                ["更換圖片", function ($itemScope) {
                	console.log($itemScope);
                    $uibModal.open({
                        animation: true,
                        templateUrl: 'models/imagePopup/popup.html' + "?id=" + new Date().getTime(),
                        controller: 'userImagePopupController',
                        size: 'lg',
                        resolve: {
                            rootScope: function () {
                                return $scope
                            }
                        }
                    }).result.then(function (modelData) {
                    	$scope.model.list=angular.copy(modelData.list);
                    	$scope.updateHtml();
                        
                    });
                }]
            ];
        	/*
            $scope.menuOptions = [
                ["編輯Menu", function () {
                   var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'models/menuPopup/popup.html' + '?id=' + new Date().getTime(),
                        controller: 'menuPopupCtrl',
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
                        $scope.model.menu = menu;
                        $scope.updateHtml();
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
            */
        }
    };
    return kpleeRunningElement;
});
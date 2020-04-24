var app = angular.module('demoApp');
app.directive('dazzleBackground', function ($compile, $templateRequest, $uibModal, $mdDialog,$dazzlePopup) {
    var dazzleBackground = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        transclude: true,
        template: '<div context-menu="menuOptions" ng-transclude></div>',
        link: function (scope, element, attrs) {
            scope.http = "http://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "dazzleBackground";
            scope.type = "dazzleBackground";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorContainerInit(scope, element, attrs).then(function () {
                            
            });

            if ('custom' in attrs) {
                var id = attrs.id || "ele" + new Date().getTime() + "-" + Object.keys(scope.atom).length;
                if (angular.isUndefined(scope.atom[id])) {
                    scope.atom[id] = {
                        "id": id,
                        "type": "editor-container-model"
                    };
                    if (!$.trim(element.html())) {
                        scope.atom[id].html = '<div>editor-container-model</div>'
                    } else {
                        var oldElement = angular.element("<div></div>").html(element.html());
                        scope.unwrap(oldElement);
                        scope.atom[id].html = oldElement.html();
                    }
                }
                var tmpElement = angular.element("<div></div>").append(scope.atom[id].html);
                scope.unwrap(tmpElement);
                element.children('[context-menu]').eq(0).html(tmpElement.html());
                $compile(element.children('[context-menu]').eq(0).contents())(scope);
            }
        },
        controller: function ($scope, $element, $attrs,$dazzlePopup) {
            $scope.menuOptions = [
                ["更換背景", function () {
                    $mdDialog.show({
                        controller: "userGalleryPopupController",
                        templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/userGalleryPopup/popup.html' + '?id=' + new Date().getTime(),
                        locals: {
                            rootScope: $scope
                        }
                    }).then(function (image) {
                        $scope.copyFile($scope.userBucket + '/' + encodeURI(image.key), $scope.exportBucket, image.key).then(function () {
                            $scope.$apply(function () {
                                var background= 'http://' + $scope.exportBucket + '/' + image.key;
                                $element.find('.dazzle-background').css('background-image','url('+background+')');
                                $element.find('.dazzle-background').css('background-repeat','no-repeat');
                            });
                        });
                    });
                }],
                ["取消背景",function(){
                                $scope.model.background = '';
                                $element.children('.dazzle-background').css('background','none');
                }],
                ["管理背景",function(){

                }]
            ];
        }
    }
    return dazzleBackground;
});
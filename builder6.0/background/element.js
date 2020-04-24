var app = angular.module('demoApp');
app.directive('background', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var link = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "//d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "background";
            scope.type = "background";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions" class="dazzle-context"></div>');
                element.html(template);
                $compile(template)(scope);
            });
        },
        controller: function ($scope, $element, $attrs) {
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
                                $scope.model.background = 'http://' + $scope.exportBucket + '/' + image.key;
                                $element.css('background-image','url('+$scope.model.background+')');
                                $element.css('background-repeat','no-repeat');
                            });
                        });
                    });
                }],
                ["取消背景",function(){
                                $scope.model.background = '';
                                $element.css('background','none');
                }],
                ["管理背景",function(){

                }]
            ];
            $scope.beforeAtomSaved = function () {
//                $scope.model.attributes = $element.attr();
            }
            $scope.afterAtomSaved = function () {

            }
        }
    };
    return link;
});

// (function(old) {
//   $.fn.attr = function() {
//     if(arguments.length === 0) {
//       if(this.length === 0) {
//         return null;
//       }

//       var obj = {};
//       $.each(this[0].attributes, function() {
//         if(this.specified) {
//           obj[this.name] = this.value;
//         }
//       });
//       return obj;
//     }

//     return old.apply(this, arguments);
//   };
// })($.fn.attr);
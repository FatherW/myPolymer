var app = angular.module('demoApp');
app.directive('dazzleDataGallery', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var dazzleDataGallery = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "dazzleDataGallery";
            scope.type = "dazzleDataGallery";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {

                var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                
                if (element.attr('field') &&
                    scope.thisPageJson &&
                    scope.thisPageJson.exportDatas &&
                    scope.thisPageJson.exportDatas[element.attr('field')]) {
                    scope.model.gallery = scope.thisPageJson.exportDatas[element.attr('field')];
                    scope.useTemplate();
                } else {
                    scope.model.gallery = [];
                    scope.model.html = "右click 新增／更新照片";
                }

                element.html(template);
                $compile(template)(scope);
            });
        },
        controller: function ($scope, $element, $attrs,$ocLazyLoad,$mdDialog) {

            console.log('Model',$scope.model);
            $scope.menuOptions = [

                 ["更新相冊", function () {

                        console.log('Load Gallery')
                        var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/editGalleryPopup/popup.html" + "?id=" + new Date().getTime();
                        var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/editGalleryPopup/popup.js" + "?id=" + new Date().getTime();
                        $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                            $mdDialog.show({
                                templateUrl: templateUrl,
                                controller: editGalleryPopupController,
                                clickOutsideToClose: false,
                                escapeToClose: false,
                                multiple: true,
                                locals: {
                                    images: $scope.model.gallery
                                }
                            }).then(function (newImages) {
                                $scope.model.gallery = newImages;
                                console.log('Gallery',$scope.model.gallery);
                                $scope.useTemplate();
                            }, function () {

                            });
                        });

                    // $scope.$dazzlePopup.gallery($scope.model.gallery).then(function (images) {
                    //     $scope.model.gallery = images;
                    //     $scope.useTemplate();
                    // });
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

                if ($element.attr('field') &&
                    $scope.thisPageJson &&
                    $scope.thisPageJson.exportDatas &&
                    $scope.thisPageJson.exportDatas[$element.attr('field')]) {
                    var field = $element.attr('field');
                    $scope.thisPageJson.exportDatas[field] = $scope.model.gallery;
                }


            }
            $scope.afterAtomSaved = function () {

            }
        }
    };
    return dazzleDataGallery;
});
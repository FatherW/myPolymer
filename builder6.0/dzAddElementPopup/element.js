var app = angular.module('demoApp');
var name = 'dzAddElementPopup';

app.directive(name, function ($compile, $templateRequest, $mdDialog, $uibModal,$dazzleUser,$dazzleS3,$dazzlePopup,$dazzleFn) {
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/dzAddElementPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http,$mdDialog, $mdSidenav, $mdBottomSheet,$log,$dazzleInit,$dazzleUser) {
          //    $scope.rootScope = $dazzleInit.getRootScope();
            $scope.elements = [];
            $scope.structures = [];
             $dazzleInit.loadJssCsss("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js");
             $dazzleInit.loadJssCsss("https://cdnjs.cloudflare.com/ajax/libs/uikit/2.27.2/js/uikit.min.js");
             $dazzleInit.loadJssCsss("https://cdnjs.cloudflare.com/ajax/libs/uikit/2.27.2/js/components/grid.min.js");
             $dazzleInit.loadJssCsss("https://cdnjs.cloudflare.com/ajax/libs/uikit/2.27.2/css/uikit.min.css");
             $scope.userGallery = [];
        
             $scope.userGalleryAngularGridOptions = {
                gridWidth: 200,
                gutterSize: 5,
                infiniteScrollDelay: 1000,
                infiniteScrollDistance: 95,
                scrollContainer: '#dialogContent_gallery'
            };
            $scope.loadMore = function() {
        
            };
            $scope.loadStructure = function() {
                return new Promise(function (resolve, reject) {
                    console.log('Init Structure');
                    $http({
                        "method": "post",
                        "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/getdirective",
                        "data": {
                            "type": "getDirectiveByStructure"
                        }
                    }).then(function (result) {
                        console.log('Add Structure', result);
                        var directive = result.data.data;
                        for (i = 0; i < directive.length; i++)
                            $scope.structures.push({
                                "name": directive[i].id,
                                "description": directive[i].description,
                                "thumbnail": directive[i].thumbnail,
                                "code": directive[i].initHTML,
                                "label": directive[i].label
                            });
                        resolve(directive);
                    });
                });
            }
            $scope.loadElement = function() {
                return new Promise(function (resolve, reject) {
                    console.log('My Core Directive', $dazzleUser.getDazzleInfo('coreDirectivesJson'));
                    var directive = $dazzleUser.getDazzleInfo('coreDirectivesJson');
        
                    var length = directive.length;
                    var count=0;
        
                        $http({
                            "method": "post",
                            "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/getdirective",
                            "data": {
                                "type": "getNewDirectiveBySell"
                            }
                        }).then(function (result) {
                            console.log(result);
                            if (result.data.code) {
                                for (i=0;i<result.data.data.length;i++){
                                    var directive = result.data.data[i];
                                    $scope.elements.push({
                                        "name": directive.id,
                                        "description": directive.description,
                                        "thumbnail": directive.thumbnail,
                                        "code": directive.initHTML,
                                        "label": directive.label
                                    });
                                }
                                console.log($scope.elements);
                            }
                            resolve();
                        });
                });
            }
            $scope.init = function () {
                $scope.loadStructure();
                $scope.loadElement();
            }
        
            $scope.closePopup = function (element) {
                if (element) {
                    console.log('Model Popup 2',element);
                    $mdDialog.hide(element);
                } else {
                    $mdDialog.cancel();
                }
            }
        }
    };
    return link;
});


var app = angular.module('demoApp', ['angular-linq', 'angularLazyImg', 'fancyboxplus']);
app.filter("trust", ['$sce', function($sce) {
        return function(htmlCode) {
            if (!angular.isUndefined(htmlCode)) {
                return $sce.trustAsHtml(htmlCode);
            }
            return htmlCode;
        }
    }])
    .filter('strLimit', function($filter) {
        return function(input, limit) {
            if (!input) return;
            if (input.length <= limit) {
                return input;
            }
            return $filter('limitTo')(input, limit) + '...';
        };
    })
    .filter('imageEmpty', function() {
        return function(link) {
            if (angular.isUndefined(link)) {
                return '8442069931475048148_2.jpg';
            }
            return link;
        };
    })
    .filter('htmlToPlaintext', function() {
        return function(text) {
            return angular.element('<div>' + text + '</div>').text();
        };
    }).config(['lazyImgConfigProvider', function(lazyImgConfigProvider) {
        var scrollable = document.querySelector('body');
        lazyImgConfigProvider.setOptions({
            offset: 100, // how early you want to load image (default = 100)
            errorClass: 'error', // in case of loading image failure what class should be added (default = null)
            successClass: 'success', // in case of loading image success what class should be added (default = null)
            onError: function(image) {}, // function fired on loading error
            onSuccess: function(image) {} // function fired on loading success
                //container: angular.element(scrollable) // if scrollable container is not $window then provide it here
        });
    }]);
app.directive('kpleeSuntaGallery', function($compile, $templateRequest, $mdDialog) {
    var kpleeSuntaGallery = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function(scope, element, attrs) {
            scope.http = "http://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "kpleeSuntaGallery";
            scope.type = "kpleeSuntaGallery";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function() {
                console.log(scope.model);
                if (angular.isUndefined(scope.model.galleryType)) {
                    scope.showMdDialog();
                    var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions">Right Click</div>');
                	element.html(template);
                	scope.$apply(function() {
                    	$compile(template)(scope);
                	});
                } else {
                    scope.loadGallery(scope.model.galleryType);
                }
                console.log(scope.model);
            });
        },
        controller: function($scope, $element, $attrs, $http, $sce, $timeout, $linq, $mdDialog) {
            console.log($scope.model);
            $scope.menuOptions = [
                ["數據管理", function() {
                    $scope.showMdDialog();
                }]
            ];
            $scope.showMdDialog=function(){
            	$mdDialog.show({
                        controller: 'suntaGalleryPopupController',
                        templateUrl: 'models/suntaGalleryInputPopup/popup.html' + "?id=" + new Date().getTime(),
                        locals: {
                            rootScope: $scope
                        }
                    }).then(function(galleryType) {
                        $scope.model.galleryType = galleryType;
                        $scope.loadGallery(galleryType);
                    });
            }
            $scope.loadGallery = function(galleryType) {
                $http.get("http://sunta520.dazzle.website/content/album-data.json").then(function(response) {
                    var data = $linq.Enumerable().From(response.data)
                        .Where(function(x) {
                            return x.album_tag == galleryType
                        })
                        .OrderBy(function(x) {
                            return x.album_date
                        })
                        .ToArray();
                    $scope.items = data;
                    if($scope.items.length<=0){
                    	alert('沒有數據');
                    }
                    else
                    	$scope.updateHtml();
                });
            }


        }
    };
    return kpleeSuntaGallery;
});
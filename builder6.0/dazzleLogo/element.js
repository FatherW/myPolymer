var app = angular.module('demoApp');

app.controller('logoPopupController', function ($scope, $http,  $mdDialog, $uibModal,rootScope) {
    $scope.rootScope = rootScope;

    $scope.init = function () {
 
    };

 
    $scope.closePopup = function (template) {
        if (template) {
            $scope.rootScope.model.template = template;
            $mdDialog.hide(template);
        } else {
            $mdDialog.cancel();
        }
    };


    $scope.sortableOptions = {
        handle: '> .edit > .myHandle'
    }

    $scope.removeItem = function (index) {
        if ($scope.rootScope.model.length > 1) {
            $scope.rootScope.model.splice(index, 1);
        } else {
            alert('不能再刪！')
        }
    }

    $scope.addSlider = function () {
        $scope.rootScope.model.logos.push({
            "img": "http://mdbootstrap.com/images/slides/slide%20(9).jpg",
            "title": "title",
            "text": "text"
        });
    }
    $scope.searchAlbum = function () {
        if ($scope.albumName == "") {
            return false;
        }

        $scope.isSearching = true;
        $scope.tagg = [];
        $scope.tagg.push({'text': $scope.albumName});
        //console.log($scope.tagg);
        var searchUrl = "https://jkor0mdil7.execute-api.ap-northeast-1.amazonaws.com/tagSearch";
        var searchParams = {
            "single": true,
            "tags": $scope.tagg,
            "baseTag": $scope.tagg
        }
        //console.log(searchParams);
        $scope.gotObj = [];
        $scope.loading = true;
        $scope.end = false;
        $scope.firstTime = true;
        $http.post(searchUrl, searchParams).then(function (searchResponse) {
            $scope.loading = false;
            $scope.gotObj = angular.copy(searchResponse.data);
            if ($scope.gotObj.length <= 0) {
                $scope.noResule = true;
            } else {
                console.log('Album',$scope.gotObj);

                $scope.rootScope.model.logos=[];
                angular.forEach($scope.gotObj,function(item,index){
                        
                        $scope.rootScope.model.logos.push({
                            "img": item.mid_url,
                            "title": "",
                            "text": ""
                        });

                });
            }

        });
        // $scope.sliders.push({
        //     "img": "http://mdbootstrap.com/images/slides/slide%20(9).jpg",
        //     "title": "title",
        //     "text": "text"
        // });
    }
    $scope.selectImage = function (index) {

        $uibModal.open({
            animation: true,
            templateUrl: 'models/galleryPopup/popup.html' + "?id=" + new Date().getTime(),
            controller: 'userGalleryPopupController',
            size: 'lg',
            resolve: {
                rootScope: function () {
                    return $scope
                }
            }
        }).result.then(function (image) {
             $scope.copyFile($scope.userBucket + '/' + encodeURI(image.key), $scope.exportBucket, image.key).then(function () {
                    $scope.$apply(function () {                        
                        $scope.rootScope.model.logos[index] = 'http://' + $scope.exportBucket + '/' + image.key;
                        $scope.updateHtml();
                    });
            });
        });
    };


});



app.directive('dazzleLogo', function ($compile, $templateRequest,$mdDialog) {
    var dazzleLogo = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.http = "http://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "dazzleLogo";
            scope.type = "dazzleLogo";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()

            scope.popupPath = "builder6.0/" + scope.directiveId + "/editLogos.html?id=" + new Date().getTime()

            scope.templateUrl = scope.http + scope.templatePath;
            scope.editorCustomInit(scope, element, attrs).then(function () {
                if (angular.isUndefined(scope.model.logos)) {
                scope.logos = [{
                    "img": "http://mdbootstrap.com/images/slides/slide%20(9).jpg",
                    "title": "title1",
                    "text": "text1"
                }, {
                    "img": "http://mdbootstrap.com/images/slides/slide%20(8).jpg",
                    "title": "title2",
                    "text": "text2"
                }, {
                    "img": "http://mdbootstrap.com/images/slides/slide%20(7).jpg",
                    "title": "title4",
                    "text": "text3"
                }];
                    scope.updateHtml();
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
                ["編輯logo", function () {

                    $mdDialog.show({
                        controller: 'logoPopupController',
                        templateUrl: "http://d25k6mzsu7mq5l.cloudfront.net/"+$scope.popupPath,
                        locals: {
                            rootScope: $scope
                        }
                    }).then(function (template) {
                        $scope.useTemplate();
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

            }
            $scope.afterAtomSaved = function () {

            }
        }
    };
    return dazzleLogo;
});
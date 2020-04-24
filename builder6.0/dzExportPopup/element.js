var app = angular.module('demoApp');
app.directive('dzExportPopup', function ($compile, $templateRequest, $mdDialog, pageInfo,userInfo,dzFn,dzS3) {
    var name = 'dzExportPopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "//d27btag9kamoke.cloudfront.net/builder6.0/dzExportPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "//d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "dzExportPopup";
            scope.type = "dzExportPopup";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime(),
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser,$dazzleS3,$dazzleData,$dazzleInit,$dazzleFn) {
                console.log('My Scope',$scope);

                var params = $dazzleUser.getDazzleInfo('params');
                $scope.thisPage = pageInfo.thisPage;
                $scope.exportBucket = userInfo.exportBucket;
                $scope.finish = false;
                $scope.init = function () {



                }
                $scope.close = function() {
                    $mdDialog.hide();
                }

                $scope.exportSite = function() {
                    pageInfo.siteExport().then(function(){
                       $scope.finish=true; 
                       $scope.thisPage='';
                       $('.finish').show();                        
                    });
                }

                $scope.test = function () {
                        pageInfo.pageExport('social-list.html');
//                    $scope.$apply(function(){
                       $scope.finish=true; 
                       $scope.thisPage = pageInfo.thisPage;
                       $('.finish').show();

  //                  });
                }
                $scope.exportPage = function () {
                        pageInfo.export();
//                    $scope.$apply(function(){
                       $scope.finish=true; 
                       $scope.thisPage = pageInfo.thisPage;
                       $('.finish').show();

  //                  });
                }

        }
    };
    return link;
});
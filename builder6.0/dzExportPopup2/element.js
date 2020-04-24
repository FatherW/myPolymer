var app = angular.module('demoApp');
app.directive('dzExportPopup2', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var name = 'dzExportPopup2';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/dzExportPopup2/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "dzExportPopup2";
            scope.type = "dzExportPopup2";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime(),
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser,$dazzleS3,$dazzleData,$dazzleInit,$dazzleFn) {
                console.log('My Scope',$scope);

                var params = $dazzleUser.getDazzleInfo('params');

                $scope.count = 0;
                $scope.finishList = [];
                $scope.exportBucket = $dazzleUser.getDazzleInfo('exportBucket');
                $scope.exportBucket = "yot.dazzle.website";
                $scope.thisPage = $dazzleUser.getDazzleInfo('thisPage');
                $scope.exporting = true;
            

                $scope.finish = function () {
            
            
                }

                $scope.init = function () {
                    return new Promise(function (resolve, reject) {
                        // var json = {
                        //     "user": $dazzleUser.getUser(),
                        //     "website": $dazzleUser.dazzleInfo['websiteId'],
                        //     "exportPage": [page]
                        // };
                                            
                        var event = {
                                "uid":$dazzleUser.getUser().uid,
                            "userBucket":$dazzleUser.dazzleInfo['userBucket'] ,
                            "exportBucket": $scope.exportBucket,
                            "thisPage": $dazzleUser.dazzleInfo['thisPage'],
                            "websiteKey": $dazzleUser.dazzleInfo['websiteKey']
                        }
                        console.log('Export JSON',event);

                         $http({
                            "method": "post",
                            "url": 'https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/dazzle-export-64',
                            "data": event
    
                        }).then(function (result) {
                            
                                $scope.finish();
                                resolve(result);
                            
                        });
                        
                        
     
                    });
                }

        }
    };
    return link;
});
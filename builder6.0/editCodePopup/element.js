var app = angular.module('demoApp');
app.directive('editCodePopup', function ($compile, $templateRequest, $mdDialog, $dazzlePopup) {
    var name = 'editCodePopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/"+name+"/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
                console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');


                $scope.pageJson=$dazzleUser.getDazzleInfo('pageJson');
                $scope.thisPageJson=$dazzleUser.getDazzleInfo('thisPageJson');
                $scope.userBucket=$dazzleUser.getDazzleInfo('userBucket');
                $scope.exportBucket=$dazzleUser.getDazzleInfo('exportBucket');
                console.log(params);
                console.log('editCodePopupController');
                
                $scope.code = params.code;
                $scope.bucket = params.bucket || "";
                $scope.key = params.key || '';
            
                var hotkeys = $dazzleUser.getHotKeys();
            
                hotkeys.bindTo($scope).add({
                    combo: ['ctrl','s'],
                    callback: function() {
                        $scope.save();
                    }
                });
            
                $scope.aceOption = {
                    mode: params.type,
                    onLoad: function (_ace) {
                        $scope.modeChanged = function () {
                            _ace.getSession().setMode("ace/mode/" + $scope.aceOption.mode.toLowerCase());
                        };
                    }
                };
                $scope.save = function () {
                    if ($scope.bucket && $scope.key)
                        $dazzleS3.saveFile($scope.bucket, $scope.key, $scope.code).then(function () {
                            console.log('Saved');
                        });
                    else
                        $mdDialog.hide($scope.code);
            
                }
                $scope.cancel = function () {
                    $mdDialog.cancel();
                }
                
        }
    };
    return link;
});
var app = angular.module('demoApp');
app.directive('metalCodePopup', function ($http, $compile, $templateRequest, $interval, $mdDialog, $mdToast,$dazzleUser, $dazzleInit, $dazzleS3, $dazzlePopup, $ocLazyLoad,$dazzleFn) {
    var name = 'metalCodePopup';
    var link = {
        restrict: 'E',
        scope:  {
           'popup': '@popup',
           'item': '=',
           'field':'@field'
        },
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/metalCodePopup/element.html?id=" + new Date().getTime(),
         link: function (scope, element, attrs) {

        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {

               var params = $dazzleUser.getDazzleInfo('params');

                $scope.pageJson=$dazzleUser.getDazzleInfo('pageJson');
                $scope.thisPageJson=$dazzleUser.getDazzleInfo('thisPageJson');
                $scope.userBucket=$dazzleUser.getDazzleInfo('userBucket');
                $scope.exportBucket=$dazzleUser.getDazzleInfo('exportBucket');
                $scope.model = {};   
                
                $scope.body = params.body;
                
                $scope.init = function(){
                 //   $element.find('.editor').text($scope.body);
                 //  $('#editor').text($scope.body); 
                 
                     editor.setValue($scope.body);

                }
                
                $scope.save = function(){
                    var value;
                    value = editor.getValue();
                    $mdDialog.hide(value)
                }
        }
    };
    return link;
});
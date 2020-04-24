var app = angular.module('demoApp');
console.log('culhkMember');
app.directive('culhkMember', function ($compile, $templateRequest,$mdDialog,dbFactory) {
    var culhkMember = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/culhkMember/element.html?id=" + new Date().getTime(),

        link: function ($scope, $element, attrs) {
            
           
        },
        controller: function ($scope, $element, $attrs) {
                  var user = store.get('rainbow-user');
                 $scope.user = user;
                 console.log('Henry User',$scope.user);
                 
            $scope.save = function() {
                dbFactory.saveData("www.rainbowcu.org.hk","user",$scope.user['會員編號'],$scope.user).then(function(){
                    alert('成功更新');
                    location.href="index.html";
                },function(){
                   alert('更新失敗'); 
                });
                
            }
            
            
            //  $scope.menuOptions = [
            //      ["會員管理", function () {
            //           $mdDialog.show({
            //                     controller: "dataPopupController",
            //                     templateUrl: 'models/dataPopup/popup.html' + '?id=' + new Date().getTime(),
            //                     clickOutsideToClose: false,
            //                     locals: {
            //                         rootScope: $scope,
            //                         table:"user"
            //                     }
            //                 }).then(function(){
            //                 //    $scope.loadNews();
            //                 });
            //     }], 
            //     ["入會申請管理", function () {
            //           $mdDialog.show({
            //                     controller: "dataPopupController",
            //                     templateUrl: 'models/dataPopup/popup.html' + '?id=' + new Date().getTime(),
            //                     clickOutsideToClose: false,
            //                     locals: {
            //                         rootScope: $scope,
            //                         table:"memberrequest2"
            //                     }
            //                 }).then(function(){
            //                 //    $scope.loadNews();
            //                 });
            //     }]
            //     ];
            // $scope.dataMng = function(tab) {
            //         $mdDialog.show({
            //             controller: 'contentPopupController',
            //             templateUrl: 'models/contentPopup/popup.html' + "?id=" + new Date().getTime(),
            //             locals: {
            //                 rootScope: $scope,
            //                 table: tab
            //             }
            //         }).then(function () {
            //             if (!angular.isUndefined($scope.dataUpdate)) {
            //                 $scope.dataUpdate();
            //             }
            //         });
            // };

        }
    };
    return culhkMember;
});
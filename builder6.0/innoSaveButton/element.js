var app = angular.module('demoApp');
app.directive('innoSaveButton', function ($http, $compile, $templateRequest, $interval, $mdDialog, $mdToast,$dazzleUser, $dazzleInit, $dazzleS3, $dazzlePopup, $ocLazyLoad,$dazzleFn,
dzFn,dbFactory) {
    var name = 'innoSaveButton';
    var link = {
        restrict: 'E',
        scope:  {
           'table': '@table',
           'id': '=',
           'item':'='
        },
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/innoSaveButton/element.html?id=" + new Date().getTime(),
         link: function ($scope, $element, attrs) {
             
                $scope.user = store.get('subUser') || null;
                $scope.superUser = store.get('user') || null;
                 console.log('is User',$scope.user);
                
                var editMode = store.get('editMode');
                
                
                $scope.isUser = function(){
                    console.log('Super User',$scope.superUser);
                    if (editMode =="admin")
                        return true;
                    if ($scope.user !=null)
                        return true;
                    else
                        return false;
                }
                $scope.isSuperUser = function(){
                    if ($scope.superUser !=null)
                        return true;
                    else
                        return false;
                }
             
             
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
            var id;
            var type = $dazzleUser.dazzleInfo['editType'];
            console.log(type);
            console.log($dazzleUser.dazzleInfo);
            
            $scope.save = function(){
                dbFactory.saveDataByID($scope.table,$scope.id,$scope.item).then(function(){
                    alert('更新成功');
                },function(){
                   alert('更新失敗'); 
                });
            }

        }
    };
    return link;
});
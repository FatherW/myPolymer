var app = angular.module('demoApp');
app.directive('innoEditButton', function ($http, $compile, $templateRequest, $interval, $mdDialog, $mdToast,$dazzleUser, $dazzlePopup, $ocLazyLoad,
dzFn) {
    var name = 'innoEditButton';
    var link = {
        restrict: 'E',
        scope:  {
           'popup': '@popup',
           'item': '=',
           'field':'@field'
        },
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/innoEditButton/element.html?id=" + new Date().getTime(),
         link: function ($scope, $element, attrs) {
             
                $scope.user = store.get('subUser') || null;
                $scope.superUser = store.get('user') || null;
                
                var editMode = store.get('editMode');
                
                
                $scope.isUser = function(){
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
            console.log($scope.item);
            console.log($dazzleUser.dazzleInfo);
            
            // var input = {};
            // input[$scope.popup] = $scope.item[$scope.field];
            
            $scope.edit = function(){
                console.log('Item',$scope.item);
                dzFn.loadPopupByType($scope.popup,$scope.item).then(function(result){
                    console.log('Result',result);
//                    $scope.item[$scope.field] = result;
                    $scope.$apply(function(){
                        $scope.item = result;                  
                    }); 
                    $scope.save();
                    
                });
            }
            
            $scope.save = function(){
                
            }

        }
    };
    return link;
});
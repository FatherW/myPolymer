var app = angular.module('demoApp');
app.directive('metalNewsletter', function ($http, $compile, $templateRequest, $interval, $mdDialog, $mdToast,$dazzleUser, $dazzleS3, $dazzlePopup, $ocLazyLoad) {
    var name = 'metalNewsletter';
    var link = {
        restrict: 'E',
        scope:  true,
        templateUrl: "https://dazzle-template.s3.amazonaws.com/builder6.0/metalNewsletter/element.html?id=" + new Date().getTime(),
         link: function ($scope, $element, attrs) {
              var user = store.get('subUser') || null;
               $scope.user = user;
               
               if (user && user['uid']==162)
                    $scope.isSuper = true;
                else 
                    $scope.isSuper = false;
                
                
                
                console.log('Metal Newsletter',$scope.user,$scope.isSuper);

               
            
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
        
            $scope.menuOptions = [
                // ["儲存公司", function () {
                //     $scope.save();
                    
                // }],
                 ["新增", function () {
                    
                         console.log('New');           

                }],     
                ["資料管理", function () {
                        console.log('Data Management');
                }],                
                [ "更新現有資料", function () {
                    //$scope.save();
                    console.log('Update Data');    
                }]
            ];

				     $scope.loadImage = function(images) {
                            var url;
                            if (Array.isArray(images))
                                url =  images[0];
                            else
                                url = images;
                               url = url.replace("Product#",""); 
            			    return url;
            			}
        }
    };
    return link;
});





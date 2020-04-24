var app = angular.module('demoApp');
app.directive('adminLogin', function ($http, $compile, $templateRequest, $interval, $mdDialog, $mdToast,  $dazzlePopup, $ocLazyLoad) {
    var name = 'adminLogin';
    var link = {
        restrict: 'E',
        scope:  true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/adminLogin/element.html?id=" + new Date().getTime(),
         link: function ($scope, element, attrs) {
             $scope.user = store.get('subUser') || null;
             console.log('is User',$scope.user);
            $scope.isUser = function(){
                if ($scope.user !=null)
                    return true;
                else
                    return false;
            }
             
             
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
             
            $scope.loginPopup = function () {
                $dazzlePopup.login().then(function (user) {
                    $dazzleUser.setUser(user);
                    $scope.$apply(function () {
                        $scope.user = $dazzleUser.getUser();
                    });
                    $scope.goToDashboard();
                });
            };
            $scope.goToDashboard = function () {
                if ($scope.user) {
                    window.location.href = "https://dashboard.dazzle.website/index.html?token:===:" + $scope.user.token;
                }
            }
            $scope.logout = function () {
                store.clearAll();
                location.reload();
            }
        
            $scope.getMyWebsite = function () {
                $scope.myWebsites = {};
                if (angular.isArray($scope.user.webdomain)) {
                    for (var i = 0; i < $scope.user.webdomain.length; i++) {
                        getWebsiteJson($scope.user.webdomain[i]);
                    }
                } else {
                    getWebsiteJson($scope.user.webdomain);
                }
        
                function getWebsiteJson(websiteId) {
                    $dazzleS3.getJson("dazzle-user-" + $scope.user.uid, "website/" + websiteId + '/json/website.json').then(function (json) {
                        $scope.$apply(function () {
                            $scope.myWebsites[websiteId] = json;
                        });
                    });
                }
            }
        
            $scope.editWebsite = function (website) {
                window.open(
                    "http://builder.dazzle.website/index.html?token:===:" + $scope.user.token + "&&&websiteId:===:" + website.website + "&&&editPage:===:" + "index",
                    '_blank'
                );
            }

        }
    };
    return link;
});





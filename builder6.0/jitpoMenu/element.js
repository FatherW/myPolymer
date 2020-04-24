var app = angular.module('demoApp');
app.directive('jitpoMenu', function ($http, $compile, $templateRequest, $interval, $mdDialog, $mdToast,$dazzleUser, $dazzlePopup, $ocLazyLoad,hotkeys,
dzFn,pageInfo) {
    var name = 'jitpoMenu';
    var link = {
        restrict: 'E',
        scope:  true,
        templateUrl: _cdn+"builder6.0/"+name+"/element.html?id=" + new Date().getTime(),
        css: {
          href: "//d27btag9kamoke.cloudfront.net/builder6.0/"+name+"/element.css?id=" + new Date().getTime(),
          preload: true
        },

         link: function ($scope, $element, attrs,ctrls) {
            $scope.subUser = store.get('subUser') || null;
            
            
            $scope.isUser = function(){
                if ($scope.subUser ==null)
                    return false;
                else
                    return true;
            }
            
            if (!$scope.isUser()){
                switch(pageInfo.thisPage){
                    case '我的目標.html':
                    case '我的優勢.html':
                    case '我的個人良藥.html':
                    case '我的可用資源.html':
                    case 'user-area.html':
                        location.href = "login.html";
                    break;
                    
                }
            } else {
                if (pageInfo.thisPage =="login.html")
                    location.href = "user-area.html";                
            }
        },        
        controller: function ($scope, $element, $attrs, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
            $scope.logout = function(){
                store.set('subUser',null);
                location.href = "index.html";
            }

        }
    };
    return link;
});
  


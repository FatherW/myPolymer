var app = angular.module('demoApp');
app.directive('cyscMenu', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzlePopup,
    dzFn,atomInfo,userInfo,dbFactory,pageInfo) {
        var name = 'cyscMenu';
    var dzLink = {
      restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "//d27btag9kamoke.cloudfront.net/builder6.0/"+name+"/element.html?id=" + new Date().getTime(),
        css: {
          href: "//d27btag9kamoke.cloudfront.net/builder6.0/"+name+"/element.css?id=" + new Date().getTime(),
          /* Preload: this will trigger an HTTP request on app load.
           * Once the stylesheet is added, it will be loaded from the browser cache */
          preload: true
        },
                
        link: function ($scope, $element, attrs) {
            $scope.menu = 
                    [
                        {"label":"本會簡介","submenu":['本會簡介','球會宗旨','球會架構','過往獎項']},   
                        {"label":"最新消息","submenu":['助教手記','最新消息','月刊','練習時間表','活動速遞']},   
                        {"label":"協辦聯賽","submenu":['Swingman 葵青荃','學生聯賽','新浪3on3香港區']},   
                        {"label":"訓練課程","submenu":['球證班','基礎訓練班']},   
                        {"label":"合作機構","submenu":[]},   
                        {"label":"聯絡我們","submenu":['入會申請']}                        
                    ];
                    
                
                
            

        },
        controller: function ($scope, $element, $attrs) {
            
         
            

        }
    };
    return dzLink;
});
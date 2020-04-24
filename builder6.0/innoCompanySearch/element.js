var app = angular.module('demoApp');


app.config(function($mdThemingProvider){
    // Update the theme colors to use themes on font-icons
    $mdThemingProvider.theme('default')
          .primaryPalette("red")
          .accentPalette('green')
          .warnPalette('blue');
  });
app.directive('innoCompanySearch', function ($http, $compile, $templateRequest, $interval, $mdDialog, $mdToast,$dazzleUser, $dazzleS3, $dazzlePopup, $ocLazyLoad,dbFactory,dzFn) {
    var name = 'innoCompanySearch';
    var link = {
        restrict: 'E',
        scope:  true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/innoCompanySearch/element.html?id=" + new Date().getTime(),
         link: function ($scope, element, attrs) {
             
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
            $scope.imagePath = "http://www.innoaibator.com/images/grey.png";
            $scope.company = {
               'tags':["hello","hello2"]  
            };
            
             var iconData = [
                    {name: 'icon-home'        , color: "#777" },
                    {name: 'icon-user-plus'   , color: "rgb(89, 226, 168)" },
                    {name: 'icon-google-plus2', color: "#A00" },
                    {name: 'icon-youtube4'    , color:"#00A" },
                     // Use theming to color the font-icon
                    {name: 'icon-settings'    , color:"#A00", theme:"md-warn md-hue-5"}
                  ];
        
              // Create a set of sizes...
              $scope.sizes = [
                {size:48,padding:10},
                {size:36,padding:6},
                {size:24,padding:2},
                {size:12,padding:0}
              ];
        
                $scope.addAllPage = function(){
                    
                     var default_schema = {
                        table: 'company'
                    };

                 dbFactory.getDatas(default_schema).then(function(result){
                    console.log(result['company']);
                    angular.forEach(result,function(item,index){
                       console.log('Name',item['name']); 
                        dzFn.addNewPage(item['name']+'.html',item['name'],"company-template.html",item);
                    });
                    
                });
                
                
                   
                }
              $scope.fonts = [].concat(iconData);
            
        }
    };
    return link;
});





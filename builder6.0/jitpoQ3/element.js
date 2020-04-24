var app = angular.module('demoApp');
var _cdn = "//d27btag9kamoke.cloudfront.net/";
app.directive('jitpoQ3', function ($window,$compile, $templateRequest, $mdDialog, $dazzlePopup,dzFn,atomInfo,dbFactory) {
    var dzSlider = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: _cdn+"builder6.0/jitpoQ3/element.html?id=" + new Date().getTime(),
        css: {
          href: "//d27btag9kamoke.cloudfront.net/builder6.0/jitpoQ3/element.css?id=" + new Date().getTime(),
      
          preload: true
        },
        link: function ($scope, element, attrs) {
            
        


        },
        controller: function ($scope, $element, $attrs) {
            $scope.noTab = 0;
            $scope.tab = [];
            
            $scope.data = {
                "一些我做了會令我感覺良好的事": {
                    "方法":[],
                    "效用":[],
                    "我會對醫生說的事情":[]
                },
                "一些我做了會令我的人生更有意義的事" :{
                    "方法":[],
                    "效用":[],
                    "我會對醫生說的事情":[]
                },
                "一些我做了會令我引以自豪的事":{
                    "方法":[],
                    "效用":[],
                    "我會對醫生說的事情":[]                    
                },
                "一些我平日享受做的事":{
                    "方法":[],
                    "效用":[],
                    "我會對醫生說的事情":[]                    
                },
                "一些我平日享受做的事":{
                    "方法":[],
                    "效用":[],
                    "我會對醫生說的事情":[]                    
                },
                "當我感覺不快時能夠令我重新感覺良好的事":{
                    "方法":[],
                    "效用":[],
                    "我會對醫生說的事情":[]                    
                },
                "在我生命中最重要的事":{
                    "方法":[],
                    "效用":[],
                    "我會對醫生說的事情":[]                    
                }
                
                
                
            };

             $scope.save = function(key){
                console.log('Sub User',$scope.subUser);
                var data ={
                    'ID':key +"-"+$scope.subUser['ID'],
                    '方法種類':key,
                    '方法':$scope.data[key]['方法'],
                    '效用': $scope.data[key]['效用'],
                    '我會對醫生說的事情': $scope.data[key]['我會對醫生說的事情'],
                    'userID' : $scope.subUser['ID'],
                    "updated":new Date().getTime()
                };
                 dbFactory.saveData(location.hostname,"myMedicine",key+"-"+$scope.subUser['ID'],data).then(function(){
                    $dazzlePopup.toast('成功儲存資料');

                },function(){
                    $dazzlePopup.toast('不成功儲存資料');
                });

                //dbFactory.                
            }
              $scope.subUser = store.get('subUser') || null;
               
                console.log('Sub User',$scope.subUser);
           
                    var json = {
                        'table':'myStrength',
                        'sort':'updated',
                        'filter':{
                            "userID":$scope.subUser['ID']
                        }
                    };
                        dbFactory.loadData("myMedicine",null,null,null,{"match":{"userID":$scope.subUser['ID']}}).then(function(result){
//                     dbFactory.getDatas(json).then(function(result){
                          console.log('Result Q1',result);

                         angular.forEach(result,function(item,index){
                            $scope.data[item['方法種類']] ={
                                "方法":item['方法'],
                                "效用":item['效用'],
                                "我會對醫生說的事情":item['我會對醫生說的事情']
                            } 
                         });
                         //resolve();
                     },function(err){
                        // console.log('Result Q1 Err',result);
                            console.log(err);
                         //resolve();
                     });
            
            

        }
    };
    return dzSlider;
});


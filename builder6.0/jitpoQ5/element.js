var app = angular.module('demoApp');
var _cdn = "//d27btag9kamoke.cloudfront.net/";
app.directive('jitpoQ5', function ($window,$compile, $templateRequest, $mdDialog, $dazzlePopup,dzFn,atomInfo,dbFactory) {
    var dzSlider = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: _cdn+"builder6.0/jitpoQ5/element.html?id=" + new Date().getTime(),
        css: {
          href: "//d27btag9kamoke.cloudfront.net/builder6.0/jitpoQ5/element.css?id=" + new Date().getTime(),
      
          preload: true
        },
        link: function ($scope, element, attrs) {


        },
        controller: function ($scope, $element, $attrs) {
            $scope.subUser = store.get('subUser') || null;    
        
            console.log('User',$scope.subUser);

            $scope.noTab = 0;
            $scope.tab = [];
            
            $scope.ans ={
                "個人性格特質":[],
                "身心健康方面":[],
                "休閒、娛樂方面":[],
                "信仰、文化、人生智慧、價值觀方面":[],
                "人際關係、溝通、相處技巧方面":[],
                "教育、職業、技能方面":[],
                "經濟、資產方面":[],
                "家居、生活環境方面":[]
            }

             dbFactory.loadData("myResource",null,null,null,{"match":{"userID":$scope.subUser['ID']}}).then(function(result){
                         angular.forEach(result,function(item,index){
                             $scope.ans[item['類別']] = item['可用資源'];
                         });
             },function(err){
                console.log(err);
             });
                     
             $scope.save = function(){ 
                 var length = 8;
                 var count =0;

                for (k in $scope.ans){
                    
                    var data = {
                        "ID":"resource-"+$scope.subUser['ID']+"-"+k,
                        "類別": k,
                        "可用資源": $scope.ans[k],
                        "userID": $scope.subUser['ID'],
                        "updated": new Date().getTime()
                    }
                    console.log('Data',data);
                     dbFactory.saveData(location.hostname,"myResource","resource-"+$scope.subUser['ID']+"-"+k,data).then(function(){
                        count++;
                        if (count>=length)
                            $dazzlePopup.toast('成功儲存資料');
                    },function(){
                        $dazzlePopup.toast('不成功儲存資料');
                    });                    
                }   
            }
          }
        }
    
    return dzSlider;
});


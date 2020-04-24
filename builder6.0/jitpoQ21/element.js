var app = angular.module('demoApp');
var _cdn = "//d27btag9kamoke.cloudfront.net/";
app.directive('jitpoQ21', function ($window,$compile, $templateRequest, $mdDialog, $dazzlePopup,dzFn,atomInfo,dbFactory) {
    var dzSlider = {
        restrict: 'E',
        priority: 1000,
        scope: {
            "target": '='
        },
        templateUrl: _cdn+"builder6.0/jitpoQ21/element.html?id=" + new Date().getTime(),
        css: {
          href: _cdn+"builder6.0/jitpoQ21/element.css?id=" + new Date().getTime(),
      
          preload: true
        },
        link: function ($scope, $element, attrs) {
            
                $scope.subUser = store.get('subUser') || null;
                console.log('Sub ',$scope.subUser);   

        },
        controller: function ($scope, $element, $attrs) {
            //   dbFactory.loadData()
       
            $scope.result = [];
            console.log("Data ID",$scope.target);
            
            dbFactory.loadData("myTargetMethod",null, "預計完成日期", "asc", {"match":{"目標ID":$scope.target}}).then(function(result){
                console.log('Result',result);
                $scope.result = result;
            });
            
            
            $scope.save = function(key){
                var length = $scope.result.length;
                var success = 0;
                angular.forEach($scope.result,function(item,index){
                    
                    item["updated"]=new Date().getTime();
                    item['預計完成日期'] = Date.parse(item['預計完成日期']);
                    item['完成日期'] = Date.parse(item['完成日期']);
                    console.log('Item',item);
                    dbFactory.saveData(location.hostname,"myTargetMethod",item['ID'],item).then(function(){
                        success++;
                        if (success>=length)
                            $dazzlePopup.toast('成功儲存資料');
    
                    },function(){
                        $dazzlePopup.toast('不成功儲存資料');
    
                    });                    
                });
                

    
                //dbFactory.                
            }
            
            
            $scope.delTimeline = function(index){
                $scope.result.splice(index,1);
            }
            $scope.addTimeline = function(){
                var template = {
                            "ID":'Work-'+$scope.target+'-'+new Date().getTime(),
                            "工作":[],
                            "目標ID":$scope.target,
                            "預計完成日期":new Date().getTime(),
                            "完成日期": new Date().getTime(),
                            "備註/感受/回應":[],
                            "userID":$scope.subUser['ID'],
                            "updated": new Date().getTime()
                        };
                $scope.result.push(template);
            }
        }
    };
    return dzSlider;
});


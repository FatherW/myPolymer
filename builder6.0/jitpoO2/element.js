var app = angular.module('demoApp');
var _cdn = "//d27btag9kamoke.cloudfront.net/";
app.directive('jitpoO2', function ($window,$compile, $templateRequest, $mdDialog, $dazzlePopup,dzFn,atomInfo,dbFactory) {
    var dzSlider = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        // templateUrl: _cdn+"builder6.0/jitpoQ2/element.html?id=" + new Date().getTime(),
        // css: {
        //   href: "//d27btag9kamoke.cloudfront.net/builder6.0/jitpoQ1/element.css?id=" + new Date().getTime(),
      
        //   preload: true
        // },
        link: function ($scope, element, attrs) {
            
                 $scope.subUser = store.get('subUser') || null;
                console.log('Sub ',$scope.subUser);   


        },
        controller: function ($scope, $element, $attrs) {

            $scope.noTab = 0;
            $scope.tab = [];
              $scope.subUser = store.get('subUser') || null;
                console.log('Sub ',$scope.subUser);   

            $scope.ans = {};
            
                dbFactory.loadData("myTarget",null,"updated",null,{"match":{"userID":$scope.subUser['ID']}}).then(function(result){
              
                 angular.forEach(result,function(item,index){
                    $scope.noTab++;
                    $scope.ans[item['ID']] ={
                        "ID":item['ID'],
                        "title": "目標"+$scope.noTab,
                        "目標":item['目標'] || [],
                        "意義":item['意義'] || [],
                        "怎樣慶祝": item['怎樣慶祝'] || []

                    }
                 });
                 console.log('My Data',$scope.ans);
                 //resolve();
             },function(err){
                // console.log('Result Q1 Err',result);
console.log(err);
                 //resolve();
             });

            $scope.save = function(key){
                console.log($scope.ans[key]);
                console.log('Sub User',$scope.subUser);
                var data ={
                    'ID':key,
                    '目標':$scope.ans[key]['目標'],
                    '意義':$scope.ans[key]['意義'],
                    '怎樣慶祝': $scope.ans[key]['怎樣慶祝'],
                    'userID' : $scope.subUser['ID'],
                    'updated': new Date().getTime()
                };
                
                 dbFactory.saveData(location.hostname,"myTarget",key+"-"+$scope.subUser['ID'],data).then(function(){
                    $dazzlePopup.toast('成功儲存資料');

                },function(){
                    $dazzlePopup.toast('不成功儲存資料');

                });
    
                //dbFactory.                
            }
            $scope.delete = function(key){
            
                dbFactory.removeData("myTarget",key).then(function(){
                    $dazzlePopup.toast('成功刪除資料');
                    $compile($element)($scope);
     
                },function(){
                    $dazzlePopup.toast('刪除資料失敗');
                    $compile($element)($scope);
                });
                
    
                //dbFactory.                
            }


            $scope.addTab = function(){
                var ID = new Date().getTime();
                $scope.noTab++;
                
                $scope.ans["目標"+ID+"-"+$scope.subUser['ID']] = {
                    "ID":"目標"+ID+"-"+$scope.subUser['ID'],
                    "title":"目標"+$scope.noTab,
                      "目標":[],
                     "意義":[],
                     "怎樣慶祝":[],
                     "實現方法":[
                           {
                            "ID":"目標"+ID+"-"+$scope.subUser['ID']+'-Work-0',
                            "工作":[],
                            "預計完成日期":new Date().getTime(),
                            "完成日期": new Date().getTime(),
                            "備註/感受/回應":[]
                        }
                        ]
                };
                
                
            }
            
            

       //     $scope.addTab();
//            $scope.ans.push(template);
            
            $scope.addTimeline = function(key){
            var length = $scope.ans[key]['實現方法'].length;
                $scope.ans[key]['實現方法'].push({
                            "ID":key+'-Work-'+length,
                            "工作":[],
                            "預計完成日期":new Date().getTime(),
                            "完成日期": new Date().getTime(),
                            "備註/感受/回應":[]
                        });
            }
            $scope.addWork = function(timeline){
                console.log($scope.ans);

                //timeline.push(timeline_template);
            }
            $scope.delWork = function(timeline,index){
                //timeline.splice(index,1);
            }
            

        }
    };
    return dzSlider;
});


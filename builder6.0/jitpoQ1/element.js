var app = angular.module('demoApp');
var _cdn = "//d27btag9kamoke.cloudfront.net/";
app.directive('jitpoQ1', function ($window,$compile, $templateRequest, $mdDialog, $dazzlePopup,dzFn,atomInfo,dbFactory) {
    var dzSlider = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: _cdn+"builder6.0/jitpoQ1/element.html?id=" + new Date().getTime(),
        css: {
          href: "//d27btag9kamoke.cloudfront.net/builder6.0/jitpoQ1/element.css?id=" + new Date().getTime(),
      
          preload: true
        },
        link: function ($scope, element, attrs) {
            $scope.subUser = store.get('subUser') || null;
            if (!$scope.subUser)
                location.href = 'login.html';
                    
            var titles = 
                ["家居、日常生活狀況方面",
                    "資產、經濟狀況方面",
                    "職業、教育、特技能方面",
                    "具支持性的人際關係方面",
                    "職業、教育、特技能方面",
                    "身心健康方面",
                    "休閒、娛樂方面"
                    ];
                    
            $scope.ans = {
                "家居、日常生活狀況方面": {
                    "ans1":[],
                    "ans2":[],
                    "ans3":[]
                },
                "資產、經濟狀況方面": {
                    "ans1":[],
                    "ans2":[],
                    "ans3":[]
                },
                "職業、教育、特技能方面": {
                    "ans1":[],
                    "ans2":[],
                    "ans3":[]
                },
                "具支持性的人際關係方面": {
                    "ans1":[],
                    "ans2":[],
                    "ans3":[]
                },
                "職業、教育、特技能方面": {
                    "ans1":[],
                    "ans2":[],
                    "ans3":[]
                },
                "身心健康方面": {
                    "ans1":[],
                    "ans2":[],
                    "ans3":[]
                },
                "休閒、娛樂方面": {
                    "ans1":[],
                    "ans2":[],
                    "ans3":[]
                }
                
            }
                 
            $scope.save = function(key){
                console.log($scope.ans[key]);
                console.log('Sub User',$scope.subUser);
                var data ={
                    'ID':key +"-"+$scope.subUser['ID'],
                    'question':key,
                    'answer1':$scope.ans[key]['ans1'],
                    'answer2': $scope.ans[key]['ans2'],
                    'answer3': $scope.ans[key]['ans3'],
                    'userID' : $scope.subUser['ID']
                };
                 dbFactory.saveData(location.hostname,"myStrength",key+"-"+$scope.subUser['ID'],data).then(function(){
                    $dazzlePopup.toast('成功儲存資料');

                },function(){
                    $dazzlePopup.toast('不成功儲存資料');
                });

                //dbFactory.                
            }



        },
        controller: function ($scope, $element, $attrs) {
               $scope.subUser = store.get('subUser') || null;
               
                console.log('Sub User',$scope.subUser);
            // $scope.init = function(){
            //     console.log('Init');
            //      return new Promise(function (resolve, reject) {
                    var json = {
                        'table':'myStrength',
                        'sort':'updated',
                        'filter':{
                            "userID":$scope.subUser['ID']
                        }
                    };
                        dbFactory.loadData("myStrength",null,null,null,{"match":{"userID":$scope.subUser['ID']}}).then(function(result){
//                     dbFactory.getDatas(json).then(function(result){
                          console.log('Result Q1',result);

                         angular.forEach(result,function(item,index){
                            $scope.ans[item['question']] ={
                                "ans1":item['answer1'],
                                "ans2":item['answer2'],
                                "ans3":item['answer3']
                            } 
                         });
                         //resolve();
                     },function(err){
                        // console.log('Result Q1 Err',result);
console.log(err);
                         //resolve();
                     });
            //      });
            // }
        }
    };
    return dzSlider;
});


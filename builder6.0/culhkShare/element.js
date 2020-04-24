var app = angular.module('demoApp');
console.log('culhkShare');
app.directive('culhkShare', function ($compile, $templateRequest,$mdDialog,dbFactory) {
    var culhkShare = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/culhkShare/element.html?id=" + new Date().getTime(),

      
        link: function (scope, element, attrs) {


        },
        controller: function ($scope, $element, $attrs) {
            
              var user = store.get('rainbow-user') || null;
             $scope.user = user;

            if (!user) {
                alert('會員專區需要登入才能顥示.');
                location.href = "index.html";
            }
            
             console.log('Henry User',$scope.user);

             $scope.findShare = function(item){
                 console.log('FInd Share',item);
                var filter = '社員編號:'+user['會員編號'];
                if (item)
                    filter = filter + ';'+"類別:"+item;
                 $element.find('dz-dataset').attr('data-filter',filter);
                 $compile($element.find('dz-dataset'))($scope);
             }
             $scope.type = 
                        [
                        "零存整付",
                        "定期存款-半年期",
                        "定期存款-1年期",
                        "定期存款-2年期",
                        "定期存款-3年期",
                        "生命契約-12期月供",
                        "生命契約",
                        "零存五年-送蓮位",
                        "定期五年-送蓮位"
                        ];
                        
             $scope.getMyShare = function(){
                 $element.find('dz-dataset').attr('data-filter','社員編號:'+user['會員編號']);
                 $compile($element.find('dz-dataset'))($scope);
             }
            $scope.getMySave = function() {
                // $.getJSON( "json/share2.json", function( json ) {
                //     console.log('My Share',json);
                //     // angular.forEach(json,function(item,index){
                //     //   dbFactory.saveData("www.rainbowcu.org.hk","share2",item['編號'],item);
                //     // });


                // },function(){
                // });
                
                
                var filter = {
                  "社員編號": user['會員編號']  
                };
                dbFactory.getMyData("www.rainbowcu.org.hk","share2",null, null,null,null, filter).then(function(result){
                    console.log('Save',result);
                    $scope.currentSaves = result;
                    console.log($scope.currentSaves);
                    $compile($('#mySaveController').contents())($scope);
                },function(){
                        console.log('Not Found');
                });
                
            }
            //  $scope.menuOptions = [
            //       ["股金管理", function () {
            //           $mdDialog.show({
            //                     controller: "dataPopupController",
            //                     templateUrl: 'models/dataPopup/popup.html' + '?id=' + new Date().getTime(),
            //                     clickOutsideToClose: false,
            //                     locals: {
            //                         rootScope: $scope,
            //                         table:"share2"
            //                     }
            //                 }).then(function(){
            //                 //    $scope.loadNews();
            //                 });
            //     }],
            //      ["退股申請", function () {
            //           $mdDialog.show({
            //                     controller: "dataPopupController",
            //                     templateUrl: 'models/dataPopup/popup.html' + '?id=' + new Date().getTime(),
            //                     clickOutsideToClose: false,
            //                     locals: {
            //                         rootScope: $scope,
            //                         table:"returnrequest2"
            //                     }
            //                 }).then(function(){
            //                 //    $scope.loadNews();
            //                 });
            //     }]
            // ];
            // $scope.dataMng = function(tab) {
            //         $mdDialog.show({
            //             controller: 'contentPopupController',
            //             templateUrl: 'models/contentPopup/popup.html' + "?id=" + new Date().getTime(),
            //             locals: {
            //                 rootScope: $scope,
            //                 table: tab
            //             }
            //         }).then(function () {
            //             if (!angular.isUndefined($scope.dataUpdate)) {
            //                 $scope.dataUpdate();
            //             }
            //         });
            // };

        }
    };
    return culhkShare;
});
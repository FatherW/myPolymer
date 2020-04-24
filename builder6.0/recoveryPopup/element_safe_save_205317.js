var app = angular.module('demoApp');
var name = 'recoveryPopup';

app.directive(name, function ($compile, $templateRequest, $mdDialog, $uibModal,$dazzleUser,$dazzleS3,$dazzlePopup,$dazzleFn,$dazzleInit,pageInfo,userInfo,dzFn) {
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "//d27btag9kamoke.cloudfront.net/builder6.0/recoveryPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "//d27btag9kamoke.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http,$mdSidenav, $mdBottomSheet,$log) {

                function sendRecoveryRequest(key,date){
                    var json = {
                        action :'dz64RecoverySite',
                        page: key,
                        bucket: userInfo.exportBucket,
                        recoveryTime: date.getTime()
                    };

                    console.log(key);
                    dzFn.sendSystemMessage('dazzleRecovery',json);
                }
                $scope.today = new Date();
                $scope.restoreSite = userInfo.exportBucket;
                $scope.recoveryDate = new Date(
                    $scope.today.getFullYear(),
                    $scope.today.getMonth(),
                    $scope.today.getDate()
                );
                $scope.recoveryHours = $scope.today.getHours();
                $scope.recoveryMinutes = $scope.today.getMinutes();
                $scope.recoverySeconds = $scope.today.getSeconds();
            
            
                $scope.minDate = new Date(
                    $scope.today.getFullYear(),
                    $scope.today.getMonth() - 6,
                    $scope.today.getDate()
                );
            
                $scope.maxDate = new Date(
                    $scope.today.getFullYear(),
                    $scope.today.getMonth(),
                    $scope.today.getDate()
                );
            
                $scope.recovery = function () {
                    var date = new Date(
                        $scope.recoveryDate.getFullYear(),
                        $scope.recoveryDate.getMonth(),
                        $scope.recoveryDate.getDate(),
                        $scope.recoveryHours,
                        $scope.recoveryMinutes,
                        $scope.recoverySeconds
                    );



                    if (date.getTime() > $scope.today.getTime()) {
                        alert('日期不正確');
                    } else {


                        $dazzleS3.listObject(userInfo.exportBucket,'').then(function(result){
                                for(i=0;i<result.length;i++){
                                    var file = result[i].Key;
                                    var ext = file.substr(file.lastIndexOf('.') + 1);
                                    
                                    console.log(result[i].Key,date);
                                    sendRecoveryRequest(result[i].Key,date);
                                }
                                alert('已發送回復請求. 請於5-15分鐘後查看');
                        });




                    }
                }
            
                $scope.recoveryPage = function () {
                    var date = new Date(
                        $scope.recoveryDate.getFullYear(),
                        $scope.recoveryDate.getMonth(),
                        $scope.recoveryDate.getDate(),
                        $scope.recoveryHours,
                        $scope.recoveryMinutes,
                        $scope.recoverySeconds
                    );



                    if (date.getTime() > $scope.today.getTime()) {
                        alert('日期不正確');
                    } else {
                        var json = {
                            action :'dz64RecoveryPage',
                            page: pageInfo.thisPage,
                            bucket: userInfo.exportBucket,
                            recoveryTime: date.getTime()
                        };

                        console.log(json);
                        dzFn.sendSystemMessage('dazzleRecovery',json).then(function(result){
                            $dazzlePopup.toast('成功回復');
                            alert('已回復. 系統會重新載入頁面');
                            store.clearAll();
                            location.href = "http://"+$scope.restoreSite+"/"+pageInfo.thisPage;
                        });

                        // $http({
                        //     "method": "post",
                        //     "url": "https://h04gpr7yqi.execute-api.ap-northeast-1.amazonaws.com/prod",
                        //     "data": json
                        // }).then(function (result) {
                        //     console.log('Result',result);
                        //     if (result.data.code>0) {
                        //         alert('已回復. 系統會重新載入頁面');
                        //         store.clearAll();
                        //         location.href = $scope.restoreSite;
                        //     } else {
                        //         alert('回復失敗。請聯絡管理員');
                        //         $mdDialog.cancel();
                        //     }
                        //
                        //     //                            store.set('thispage', 'index');
                        // }, function () {
                        //     alert('回復需時。請於五分鐘後，用無痕模式觀察回復狀況');
                        //     $mdDialog.hide(date);
                        // });
                    }

                }
        }
    };
    return link;
});



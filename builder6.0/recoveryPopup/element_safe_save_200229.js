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
            
                    if (Object.prototype.toString.call(date) === "[object Date]") {
                        if (isNaN(date.getTime())) {
                            alert('date is not valid');
                        }
                        else {
                            if (date.getTime() > $scope.today.getTime() || date.getTime() < $scope.minDate.getTime()) {
                                alert('date is not valid');
                            } else {
                                var confirm = $mdDialog.confirm()
                                    .title('是否把網站還原到')
                                    .textContent(date + "")
                                    .ariaLabel('recovery day')
                                    .ok('是')
                                    .cancel('否');
                                $mdDialog.show(confirm).then(function () {
                                    $mdDialog.show({
                                        templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/loadingPopup/popup.html" + "?id=" + new Date().getTime(),
                                        clickOutsideToClose: false
                                    });
                                    $http({
                                        "method": "post",
                                        "url": "https://h04gpr7yqi.execute-api.ap-northeast-1.amazonaws.com/prod",
                                        "data": {
                                            action :'recoverySite',
                                            folder: $dazzleUser.getDazzleInfo('websiteKey'),
                                            bucket: $dazzleUser.getDazzleInfo('userBucket'),
                                            exportBucket: $dazzleUser.getDazzleInfo('exportBucket'),
                                            recoveryTime: date
                                        }
                                    }).then(function (result) {
                                        $dazzleInit.saveStore('thispage', 'index');
            //                            store.set('thispage', 'index');
                                        location.reload();
                                    }, function () {
                                        $dazzleInit.loadingWithTimer("正在還原", "正在還原網站，需時約60秒。", 60).then(function () {
                                            $scope.saveStore('thispage', 'index');
            //                                store.set('thispage', 'index');
                                            location.href = "http://"+$scope.restoreSite;
                                            $mdDialog.hide(date);
                                        });
                                    });
                                }, function () {
                                        //                        $dazzleInit.recovery();
                                });
            
                            }
                        }
                    }
                    else {
                        alert('date is not valid');
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
                            location.href = $scope.restoreSite;
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



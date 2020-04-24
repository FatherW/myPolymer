var app = angular.module('demoApp');
app.directive('dzRecoveryPopup', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var name = 'dzRecoveryPopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "//d27btag9kamoke.cloudfront.net/builder6.0/dzRecoveryPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "//d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "dzRecoveryPopup";
            scope.type = "dzRecoveryPopup";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime(),
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser,$dazzleS3,$dazzleData,$dazzleInit,$dazzleFn) {
            AWS.config = new AWS.Config();
            AWS.config.accessKeyId = "AKIAIOCIHTJ47YSHEE7Q";
            AWS.config.secretAccessKey = "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";
            AWS.config.region = "ap-northeast-1";
            var lambda = new AWS.Lambda();
            
            //var ec = require('elasticsearch');
            /*var client = new ec.Client({
                //host: '13.228.89.121:9200'
                host: 'https://search-dazzle-n4kjr6eecpjbne65ypunb42isu.ap-southeast-1.es.amazonaws.com'
            });*/
                //$scope.rootScope = rootScope;
            $scope.today = new Date();
        
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
            
            $scope.recoveryWebsiteData = function () {
                var date = new Date(
                    $scope.recoveryDate.getFullYear(),
                    $scope.recoveryDate.getMonth(),
                    $scope.recoveryDate.getDate(),
                    $scope.recoveryHours,
                    $scope.recoveryMinutes,
                    $scope.recoverySeconds
                );
                var index = $dazzleUser.getUser().uid;
                var exportBucket, folder;
                var bucket = 'dazzle-backup';
                var type = [];
                var timeInMillis = Date.parse(date)/1000;
                timeInMillis = timeInMillis + 28800;
                if (Object.prototype.toString.call(date) === "[object Date]") {
                    if (isNaN(date.getTime())) {
                        alert('date is not valid');
                    }
                    else {
                        if (date.getTime() > $scope.today.getTime() || date.getTime() < $scope.minDate.getTime()) {
                            alert('date is not valid');
                        } else {
                            var confirm = $mdDialog.confirm()
                                .title('是否把數據還原到')
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
                                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                                    "data": {
                                        "action": "searchData",
                                        "index": index,
                                        "type": "_table",
                                        "body": {"query": {"match_all": {}}}
                                    }
                                }).then(function (result) {
                                    var data = result['data']['resolve'];
                                    for (var a=0; a<data.length; a++) {
                                        type.push(data[a]['id']);
                                    }
                                    console.log("Type:",type);
                                    for (var a=0; a<type.length; a++) {
                                        folder = 'elasticSearch/'+index+'.'+type[a]+'/data.json';
                                        exportBucket = index+'.'+type[a];
                                        $scope.dataRecovery(folder, bucket, exportBucket, timeInMillis);
                                    }
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
            
            $scope.dataRecovery = function (folder, bucket, exportBucket, timeInMillis) {
                var params = {
                    action :'recoveryData',
                    folder: folder,
                    bucket: bucket,
                    exportBucket: exportBucket,
                    recoveryTime: timeInMillis
                }
                console.log(params);
                $http({
                    "method": "post",
                    "url": "https://h04gpr7yqi.execute-api.ap-northeast-1.amazonaws.com/prod",
                    "data": params
                }).then(function (result) {
                    console.log(result);
                    /*$dazzleInit.saveStore('thispage', 'index');
//                            store.set('thispage', 'index');
                    location.reload();*/
                }, function () {
                    /*$dazzleInit.loadingWithTimer("正在還原", "正在還原數據，需時約60秒。", 60).then(function () {
                        $scope.saveStore('thispage', 'index');
//                                store.set('thispage', 'index');
                        location.reload();
                        $mdDialog.hide(date);
                    });*/
                });
            }
        
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
                                        location.reload();
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
                                        action :'recoveryPage',
                                        page: $dazzleUser.getDazzleInfo('thisPage')+'.html',
                                        folder: $dazzleUser.getDazzleInfo('websiteKey')+'page/'+$dazzleUser.getDazzleInfo('thisPage')+'/',
                                        bucket: $dazzleUser.getDazzleInfo('userBucket'),
                                        exportBucket: $dazzleUser.getDazzleInfo('exportBucket'),
                                        recoveryTime: date
                                    }
                                }).then(function (result) {
                                    alert('已回復. 系統會重新載入頁面');
                                    location.reload();
                                    //                            store.set('thispage', 'index');
                                }, function () {
                                    $dazzleInit.loadingWithTimer("正在還原", "正在還原網站，需時約60秒。", 60).then(function () {
                                        $scope.saveStore('thispage', 'index');
        //                                store.set('thispage', 'index');
                                        location.reload();
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
        }
    };
    return link;
});
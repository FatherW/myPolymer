var app = angular.module('demoApp');
app.directive('hotyeahCreateSchoolPopup', function ($compile, $templateRequest, $mdDialog, $dazzlePopup) {
    var name = 'hotyeahCreateSchoolPopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/"+name+"/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "//d27btag9kamoke.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleData,$dazzleUser,$dazzleFn,moment) {
                console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');
                var schoolName = params['schoolName'];
                var schoolID = params['schoolID'];
                $scope.pageJson=$dazzleUser.getDazzleInfo('pageJson');
                $scope.thisPageJson=$dazzleUser.getDazzleInfo('thisPageJson');
                $scope.userBucket=$dazzleUser.getDazzleInfo('userBucket');
                $scope.exportBucket=$dazzleUser.getDazzleInfo('exportBucket');
                $scope.website = $dazzleUser.getDazzleInfo('website');
//                $scope.user = $dazzleUser.getUser();
                $scope.users = params.users;
                
                if (!$scope.users.length) {
                    console.log('No User');
                $dazzleData.loadTableByName('school').then(function(json){
                    console.log('Number of User',json.numberOfUser);     
                    var numOfUser = parseInt(json.numberOfUser);
                    $scope.$apply(function () {
                        $scope.users.push({
                           "username": 'hotyeah'+numOfUser.toString(), 
                           "password": 'phy3math4',
                           "valid":true
                        });
                    });
                    json.numberOfUser = numOfUser +1;
                    $dazzleData.saveTableByName('school',json);

                });
                }
                $scope.save = function() {

                    $mdDialog.hide($scope.currentDataSet);
                }
                
                $scope.createUser = function(user) {
                    
                    console.log('Create Data',JSON.stringify({
                            "skipCheckRecord": true,
                            "skipCheckExportBucket": true,
                            "subdomain": 'www',
                            "domain": 'hot-yeah.com',
                            "sitename": 'www.hot-yeah.com',
                            "action":"subRegister",
                            "user": {
                                "uid": user.username,
                                "password": user.password,
                                "registerDate": '2017/1/1',
                                "expiryDate": '2047/3/31',
                                "websiteUrl": ['www.hot-yeah.com'],
                                "webdomain": [],
                                "domains": [],
                                "db": [],
                                "balance": 0,
                                "type": 'user',
                                "parent":"hotyeah",
                                "bucket":"www.hot-yeah.com",
                                "page": "/"+schoolID+".html"
                            }
                        }));
                    $http({
                        "method": "post",
                        "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/register6",
                        "data": {
                            "skipCheckRecord": true,
                            "skipCheckExportBucket": true,
                            "subdomain": 'www',
                            "domain": 'hot-yeah.com',
                            "sitename": 'www.hot-yeah.com',
                            "action":"subRegister",
                            "user": {
                                "uid": user.username,
                                "password": user.password,
                                "registerDate": moment().valueOf(),
                                "expiryDate": moment().add(365, 'days').valueOf(),
                                "websiteUrl": ['www.hot-yeah.com'],
                                "webdomain": [],
                                "domains": [],
                                "db": [],
                                "balance": 0,
                                "type": 'user',
                                "parent":"hotyeah",
                                "bucket":"www.hot-yeah.com",
                                "page": "/"+schoolID+".html"
                            }
                        }
                    }).then(function (result) {
                        $dazzlePopup.toast('用戶註冊成功');
                    }, function () {
                        $dazzlePopup.toast('用戶註冊失敗');
                    });
                }
        }
    };
    return link;
});

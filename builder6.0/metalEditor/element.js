var app = angular.module('demoApp');
app.directive('metalEditor', function ($http, $compile, $templateRequest, $interval, $mdDialog,  $dazzleUser, $dazzleInit, $dazzleS3, $dazzlePopup, $ocLazyLoad) {
    var name = 'metalEditor';
    var link = {
        restrict: 'E',
        scope: true,
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {

                $scope.init = function () {


                    var user,isToken,editorButton;
                    console.log('init');
                    console.log('editorController');

                    editorButton = angular.element('<hotyeah-editor-header id="editor-header"></hotyeah-editor-header>');
                     $element.append(editorButton);

                    $scope.inited = false;
                    console.log('Hello');
                    $ocLazyLoad.load(['https://d27btag9kamoke.cloudfront.net/builder6.0/dzServiceDazzlePopup/element.js',
                        'https://d27btag9kamoke.cloudfront.net/builder6.0/dzServiceDazzleData/element.js',
                        'https://d27btag9kamoke.cloudfront.net/builder6.0/dzServiceDazzleFn/element.js'], {cache: false}).then(function () {

                        user = store.get('user');
                        console.log('User',user);
                        if (!user) {
                            $http({
                                "method": "post",
                                "url": "https://37nolo3390.execute-api.ap-northeast-1.amazonaws.com/prod",
                                "data": {
                                    "uid": "5metal.dazzle.website",
                                    "password": "phy3math4",
                                    "type": "loginByUidPassword"
                                }
                            }).then(function (result) {
                                if (result.data.code > 0) {
                                    store.set('user',result.data.resolve);
                                    $dazzleUser.setUser(user);
                                    $scope.loadAllInfo();
                                } else
                                    console.log('Fail Load Dazzle Master');
                            }, function () {
                                console.log('Fail Load Dazzle Master');
                            });


                            // $dazzleUser.loginPopup().then(function(user){
                            //     console.log(user);
                            //     $dazzleUser.setUser(user);
                            //     $scope.loadAllInfo();
                            // });
                        } else {
                            if (!angular.isUndefined(user) && user) {
                                if (!angular.isUndefined(user.token) && user.token)
                                    isToken = true;
                                else
                                    isToken = false;
                            }
                            else
                                isToken = false;

                            if (isToken) {
                                $dazzleUser.setUser(user);
                                $scope.loadAllInfo();
                            } else {
                                $dazzleUser.loginPopup().then(function(user){
                                    console.log(user);
                                    $dazzleUser.setUser(user);
                                    $scope.loadAllInfo();
                                });
                            }
                        }

                        //resolve();
                    }, function () {
                        console.log('Fail Load Dazzle Master');
                    });

                }
                $scope.setUserType = function () {
                    if ($scope.user) {
                        $scope.isUser = true;
                        if ($scope.user.type) {
                            if ($scope.user.type === 'admin') {
                                $scope.isAdmin = true;
                                $scope.isDesigner = true;
                            } else if ($scope.user.type === 'designer') {
                                $scope.isDesigner = true;
                            }
                        } else {
                            $scope.user.type = 'user';
                        }
                    }
                }

                $scope.loadAllInfo = function() {
                    var token = $dazzleUser.getUser().token;
                    if (angular.isUndefined(token) || !token)
                        token = store.get('token');
                    console.log('%c------------------------------------------', "color: blue; font-size:30px;");
                    console.log($dazzleUser.getUser());
                    console.log('Token',$dazzleUser.getUser().token);

                    if (token) {
                        $dazzleUser.userLogin(token).then(function () {

                            $scope.user = $dazzleUser.getUser();
                            console.log("User", ":", $scope.user);
                            $scope.setUserType();
                            $dazzleInit.loadUserInfo().then(function(){
                                $dazzleInit.loadWebsiteInfo().then(function(){
                                    $dazzleInit.loadDirectiveInfo().then(function(){
                                        $dazzleInit.loadPageInfo().then(function(){
                                            $dazzleInit.loadAtomInfo().then(function(){
                                                console.log('End');
                                                $scope.loadPage();
                                            });
                                        });
                                    });
                                });
                            });
                        }, function () {
                            console.log('Token');
                            $dazzleUser.loginPopup().then(function(user){
                                console.log(user);
                                $dazzleUser.setUser(user);
                                $scope.loadAllInfo();
                            });
                            // $scope.logout();
                        });
                    } else {
                        console.log('Token');
                        $dazzleUser.loginPopup().then(function(user){
                            console.log(user);
                            $dazzleUser.setUser(user);
                            $scope.loadAllInfo();
                        });
                        // $scope.logout();
                    }
                }


                $scope.loadPage = function () {
                    console.log('%c------------------------------------------ Load Page---------------', "color: blue; font-size:30px;");
                    var userBucket = $dazzleUser.getDazzleInfo('userBucket');
                    var websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
                    var thisPage = $dazzleUser.getDazzleInfo('thisPage');
                    var atom = $dazzleUser.getDazzleInfo('atom');
                    var thisLang = $dazzleUser.getDazzleInfo('thisLang');
                    console.log('Compiling');




                    setTimeout(function () {
                        $scope.$apply(function () {
                            $compile($element.contents())($scope);
                            $scope.inited = true;
                            $dazzleUser.setRootScope($scope);
                        },function(err){
                            console.log(err);
                        });
                        $('#dz-init-overlay').hide();
                    }, 4000);
                }
                
        }
    };
    return link;
});
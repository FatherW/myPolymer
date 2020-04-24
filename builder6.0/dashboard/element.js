    //  app.config(function ($routeProvider) {
    //     $routeProvider
    //         .when('/main', {
    //             templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/file6.0/dashboard/main.html' + "?id=" + new Date().getTime(),
    //             controller: 'mainController'
    //         })
    //         .when('/detail', {
    //             templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/file6.0/dashboard/detail.html' + "?id=" + new Date().getTime(),
    //             controller: 'detailController'
    //         })
    //         .when('/changePassword', {
    //             templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/file6.0/dashboard/changePassword.html' + "?id=" + new Date().getTime(),
    //             controller: 'changePasswordController'
    //         })
    //         .when('/rechargeRecord', {
    //             templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/file6.0/dashboard/rechargeRecord.html' + "?id=" + new Date().getTime(),
    //             controller: 'rechargeRecordController'
    //         })
    //         .when('/buyRecord', {
    //             templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/file6.0/dashboard/buyRecord.html' + "?id=" + new Date().getTime(),
    //             controller: 'buyRecordController'
    //         })
    //         .when('/sellRecord', {
    //             templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/file6.0/dashboard/sellRecord.html' + "?id=" + new Date().getTime(),
    //             controller: 'sellRecordController'
    //         })
    //         .when('/listWebsite', {
    //             templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/file6.0/dashboard/listWebsite.html' + "?id=" + new Date().getTime(),
    //             controller: 'listWebsiteController'
    //         })
    //         .when('/controlDb/:table', {
    //             templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/file6.0/dashboard/myElastic.html' + "?id=" + new Date().getTime(),
    //             controller: 'controlDbController'
    //         })
    //         .when('/listElastic/:website/:id', {
    //             templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/file6.0/dashboard/myElastic.html' + "?id=" + new Date().getTime(),
    //             controller: 'myElasticController'
    //         })
    //         .when('/myPhotos', {
    //             templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/file6.0/dashboard/myPhotos.html' + "?id=" + new Date().getTime(),
    //             controller: 'myPhotosController'
    //         })
    //         .when('/myWebsite', {
    //             templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/file6.0/dashboard/myWebsite.html' + "?id=" + new Date().getTime(),
    //             controller: 'myWebsiteController'
    //         })
    //         .when('/paypalCallback', {
    //             templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/file6.0/dashboard/paypalCallback.html' + "?id=" + new Date().getTime(),
    //             controller: 'paypalCallbackController'
    //         })
    //         .when('/myDoc', {
    //             templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/file6.0/dashboard/myDoc.html' + "?id=" + new Date().getTime(),
    //             controller: 'myDocController'
    //         })
    //         .when('/boughtImage', {
    //             templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/file6.0/dashboard/boughtImage.html' + "?id=" + new Date().getTime(),
    //             controller: 'boughtImageController'
    //         })
    //         .when('/soldImage', {
    //             templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/file6.0/dashboard/soldImage.html' + "?id=" + new Date().getTime(),
    //             controller: 'soldImageController'
    //         })
    //         .when('/myVideos', {
    //             templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/file6.0/dashboard/myVideos.html' + "?id=" + new Date().getTime(),
    //             controller: 'myVideosController'
    //         })
    //         .when('/myDbManage/:website/:id', {
    //             templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/file6.0/dashboard/myDbManage.html' + "?id=" + new Date().getTime(),
    //             controller: 'myDbManageController'
    //         })
    //         .otherwise({
    //             redirectTo: '/myWebsite'
    //         });
    // });
    console.log('Dashboard');
 app.directive('dashboard', function ($compile, $templateRequest, $mdDialog) {
        var dashboard = {
            restrict: 'E',
            priority: 1000,
            scope: true,
            templateUrl: 'https://s3-ap-southeast-1.amazonaws.com/dazzle-template/file6.0/dashboard-view.html',
            // templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/dashboard/element.html?id=' + new Date().getTime(),
            link: function (scope, element, attrs) {
            },
            controller: function ($scope, $element, $attrs, $http, $timeout, $ocLazyLoad, $mdDialog, $dazzleS3, $dazzlePopup, $dazzleUser,$dazzleInit) {
                
                
                       console.log('dashboardController');
        $scope.dashboardInited = true;
        $scope.isAdmin = false;
        $scope.isDesigner = false;
        $scope.isUser = false;
        $scope.init = function () {
            // if (!angular.isUndefined(QueryString.token)) {
            //     console.log('dashboardController2');

            //     $dazzleUser.userLogin(QueryString.token).then(function () {
            //         document.location.href = "index.html";
            //     }, function () {
            //         $scope.logout();
            //     });
            // } else if ($dazzleUser.getUser()) {
            //     console.log('dashboardController3');

            //     $dazzleUser.userLogin($dazzleUser.getUser().token).then(function () {
            //         $scope.$apply(function () {
            //             $scope.user = $dazzleUser.getUser();
            //             $scope.setUserType();
            //             $scope.dashboardInited = true;
            //           //  $dazzleInit.loadCustomElasticDirectives();
            //         });
            //     }, function () {
            //         $scope.logout();
            //     });
            // } else {
            //     console.log('dashboardController4');
            //     $scope.logout();
            // }
        }
        $scope.logout = function () {
            store.clearAll();
            document.location.href = "http://dazzle.website/";
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
        $scope.toggleLeftMenu = buildDelayedToggler('left');
        $scope.recharge = function () {
            $dazzlePopup.recharge();
        }

        function debounce(func, wait, context) {
            var timer;
            return function debounced() {
                var context = $scope,
                    args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function () {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }

        function buildDelayedToggler(navID) {
            return debounce(function () {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        console.log('toggleLeftMenu')
                    });
            }, 200);
        }
        $scope.edit652 = function(){
            var params = {
                "name":"dzCodePopup",
                "directive":"<dz-code-popup></dz-code-popup>",
                "bucket":"dazzle-template",
                "key":"cdn6.4/js/dazzleFactory.6.5.2.js"
            }
            $dazzlePopup.callPopup(params).then(function(){
                
            });
            
        }

        $scope.listElastic = function(table) {
            document.location.href = "index.html#!/controlDb/"+table;
        }

        $scope.loadElastic = function(table) {
            document.location.href = "index.html#!/listElastic/"+table;
        }

        $scope.grabWebsite = function () {
            var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/grabWebsitePopup/popup.html" + "?id=" + new Date().getTime();
            var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/grabWebsitePopup/popup.js" + "?id=" + new Date().getTime();
            $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                $mdDialog.show({
                    templateUrl: templateUrl,
                    controller: grabWebsitePopupController
                });
            });
        }

        $scope.loadMyTables = function() {
            return new Promise(function (resolve, reject) {

                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": {
                        "action": "searchData",
                        "index": $dazzleUser.getUser().uid,
                        "type": "_table",
                        "body": {"query": {"match_all": {}}}
                    }
                }).then(function (result) {
                    console.log(result);
                    if (result.data.code < 0) {
                        $dazzlePopup.toast(result.data.text + ":" + result.data.reject.msg);
                        $scope.myTables = [];
                        resolve([]);

                    } else {
                        if (!Array.isArray(result.data.resolve)){
                            $scope.myTables = [result.data.resolve];
                            resolve([result.data.resolve]);
                        }
                        else{
                            $scope.myTables = result.data.resolve;
                            resolve(result.data.resolve);
                        }
                    }
                });

            });
        }
            }
        };
        return dashboard;
    });
    // // gets called once when grid ready to insert the element
    // dateRenderer.prototype.getGui = function () {
    //     return this.container;
    // };

    // // gets called whenever the user gets the cell to refresh
    // dateRenderer.prototype.refresh = function (params) {
    //     this.container.innerHTML = "";
    //     this.init(params);
    // };

    // // gets called when the cell is removed from the grid
    // dateRenderer.prototype.destroy = function () {

    // };

    function dateComparator(date1, date2) {
        var date1Number = new Date(date1).getTime();
        var date2Number = new Date(date2).getTime();

        if (date1Number === null && date2Number === null) {
            return 0;
        }
        if (date1Number === null) {
            return -1;
        }
        if (date2Number === null) {
            return 1;
        }

        return date1Number - date2Number;
    }

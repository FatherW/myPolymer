var app = angular.module('demoApp');
    app.directive('adminDashboard', function($compile, $timeout,$mdDialog, $mdToast, $dazzleS3,  $dazzleUser, $dazzlePopup) {
      // Function save$scope.thisPageJson, save$scope.masterJson, saveRootHtml, saveMasterAtom, save$scope.thisPage
      // $scope.thisPage => $scope.pagename
      // $scope.websiteKey => 'website/'+$scope.hostname;

      var adminDashboard = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "//d27btag9kamoke.cloudfront.net/builder6.0/adminDashboard/element.html?id=" + new Date().getTime(),
        controller: function($scope, $http, $element, $timeout, $ocLazyLoad,$mdSidenav) {
            console.log('dashboardController');
            $scope.dashboardInited = false;
            $scope.isAdmin = false;
            $scope.isDesigner = false;
            $scope.isUser = false;
            
         $scope.accordianData = [  
                        { "heading" : "帳戶資料",         "content" : "" },
                        { "heading" : "網站管理",     "content" : "" },
                        { "heading" : "資料管理",   "content" : "" },
                        { "heading" : "文件管理",  "content" : "" },
                        { "heading" : "媒體管理",  "content" : "" },
                        { "heading" : "交易記錄",  "content" : "" },

                     ];



          $scope.toggleView = function(ary, data, index){
            for(var i=0; i<ary.length; i++){
              if(i!=index) { ary[i].expanded=false; }
              else { data.expanded=!data.expanded; }
            }
            switch(index){
               case 0:
                    $scope.loadDetail();        
                    break;
                case 1:
                    $scope.loadDomain();
                    break;
            
                case 2:
                    $scope.loadDatabase();                  
                    break;
                    
                case 3:
                    $scope.myDoc();
                    break;
                    
                case 4:
                    $scope.myPhoto();
                    break;
                    
                case 5:
                    
                    
                    break;
                
                
            }
            
            
          }
 


//////////////////////////////////////////// 
            $scope.loadDirectiveInfo = function() {
        
        
                var url = "//d27btag9kamoke.cloudfront.net/builder6.0/";
                return new Promise(function (resolve, reject) {
        
        
                    $http({
                        "method": "post",
                        "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/getdirective",
                        "data": {
                            "type": "getDirectiveByOwners",
                            "owner":["dazzle6.4"]
                        }
                    }).then(function (result) {
                        if (result.data.code > 0) {
                            json = result.data.data;
                            console.log('My Directive',json);
                            var count = 0;
                            var length = json.length;
                            for (var i = 0; i < length; i++) {
                                js = url + json[i].name + "/element.js";
                                css = url + json[i].name + "/element.css";
                                console.log('Load Directive', css, js);
                                $ocLazyLoad.load([css, js], {cache: false}).then(function () {
                                    count++;
                                    if (count >= length)
                                        resolve();
                                }, function () {
                                    count++;
                                    if (count >= length)
                                        resolve();
                                });
                            }
        
        
                        } else
                            reject();
                    });
                });
            }
            $scope.myPhoto = function(){
                $('#admin_panel').html("<admin-images></admin-images>");
                $compile($('#admin_panel').contents())($scope);
            }
            $scope.myDoc = function(){
                $('#admin_panel').html("<admin-files></admin-files>");
                $compile($('#admin_panel').contents())($scope);
            }
           $scope.loadDatabase = function(){
               
               dzFn.loadAdminPanel("adminDatabase").then(function(){
                    $('#admin_panel').html("<admin-database></admin-database>");
                    $compile($('#admin_panel').contents())($scope);
               });
            }
    
           $scope.loadDomain = function(){
                $('#admin_panel').html("<admin-domain></admin-domain>");
                $compile($('#admin_panel').contents())($scope);
            }
           $scope.loadChangePassword = function(){
                $('#admin_panel').html("<admin-change-password></admin-change-password>");
                $compile($('#admin_panel').contents())($scope);
            }
            $scope.loadDetail = function(){
                $('#admin_panel').html("<admin-detail></admin-detail>");
                $compile($('#admin_panel').contents())($scope);
            }
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
                //             $scope.loadDirectiveInfo();
                //             $scope.setUserType();
                //             $scope.dashboardInited = true;
                //             //  $dazzleInit.loadCustomElasticDirectives();
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
        
            $scope.listElastic = function(table) {
                document.location.href = "index.html#!/controlDb/"+table;
            }
        
            $scope.loadElastic = function(table) {
                document.location.href = "index.html#!/listElastic/"+table;
            }
        
            $scope.grabWebsite = function () {
                var templateUrl = "https://d27btag9kamoke.cloudfront.net/cdn6.0/models/grabWebsitePopup/popup.html" + "?id=" + new Date().getTime();
                var controllerUrl = "https://d27btag9kamoke.cloudfront.net/cdn6.0/models/grabWebsitePopup/popup.js" + "?id=" + new Date().getTime();
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
      return adminDashboard;
    });







//});
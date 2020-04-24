var app = angular.module("demoApp");

    app.filter('to_trusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }]);
    app.filter('tag_filter',function(){
        return function(tags){
            var str="";
            angular.forEach(tags,function(item,index){
                if (index)
                    seperator = ", "
                else
                    seperator = ""
                str = item+ seperator+str;
            });
            return str;
        }
    });

   

    app.directive('stringToNumber', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function (value) {
                    return '' + value;
                });
                ngModel.$formatters.push(function (value) {
                    return parseFloat(value);
                });
            }
        };
    });

    app.directive('customOnChange', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var onChangeHandler = scope.$eval(attrs.customOnChange);
                element.bind('change', onChangeHandler);
            }
        };
    });
	

   app.controller('editorController', ['$scope','$http','$element','$compile','$templateRequest','$interval','$mdDialog','$dazzleUser','$dazzleInit','$dazzleS3','$dazzlePopup','$ocLazyLoad','$dazzleData','$dazzleElastic','$dazzleFn','hotkeys',
        function ($scope, $http, $element, $compile, $templateRequest, $interval, $mdDialog,  $dazzleUser, $dazzleInit, $dazzleS3, $dazzlePopup, $ocLazyLoad,$dazzleData,$dazzleElastic,$dazzleFn,hotkeys) {


        var url = _MYLOGIN || location.hostname;
        var password = _MYPASSWORD || "phy3math4";

		hotkeys.add({
			combo: 'ctrl+up',
			description: 'This one goes to 11',
			callback: function(event) {

                event.preventDefault();
				$scope.adminLogin();
			}
		  });

		 hotkeys.add({
			combo: 'ctrl+down',
			description: 'This one goes to 11',
			callback: function(event) {
                event.preventDefault();
				store.set('editMode','normal');
				location.reload();	
			}
		  });

            $scope.user =store.get('user') || null;

            $scope.loginPopup = function () {
                $dazzlePopup.login().then(function (user) {
                    $dazzleUser.setUser(user);
                    $scope.$apply(function () {
                        $scope.user = $dazzleUser.getUser();
                    });
                    $scope.goToDashboard();
                });
            };
            $scope.goToDashboard = function () {
                if ($scope.user) {
                    window.location.href = "https://dashboard.dazzle.website/index.html?token:===:" + $scope.user.token;
                }
            }
            $scope.logout = function () {
                store.clearAll();
                location.reload();
            }

            $scope.getMyWebsite = function () {
                $scope.myWebsites = {};
                if (angular.isArray($scope.user.webdomain)) {
                    for (var i = 0; i < $scope.user.webdomain.length; i++) {
                        getWebsiteJson($scope.user.webdomain[i]);
                    }
                } else {
                    getWebsiteJson($scope.user.webdomain);
                }

                function getWebsiteJson(websiteId) {
                    $dazzleS3.getJson("dazzle-user-" + $scope.user.uid, "website/" + websiteId + '/json/website.json').then(function (json) {
                        $scope.$apply(function () {
                            $scope.myWebsites[websiteId] = json;
                        });
                    });
                }
            }

            $scope.editWebsite = function (website) {
                window.open(
                    "http://builder.dazzle.website/index.html?token:===:" + $scope.user.token + "&&&websiteId:===:" + website.website + "&&&editPage:===:" + "index",
                    '_blank'
                );
            }


				$scope.adminLogin = function() {
						var url = location.hostname;
						var html = $('body').html();
						var user = store.get('user') || null;
						store.set('editMode','admin');
						$('body').wrapInner( "<dz-container></dz-container>");
//						$('body').html("<dz-container>"+html+"</dz-cotnainer>");
						$('body').append('<dz-editor-header id="editor-header"></dz-editor-header>');
						$('body').append('<div id="dz-init-overlay"><div class="lds-gear" style="100%;height:100%"></div></div>');

						
						if (!angular.isUndefined('user') || !user) {
							$dazzleUser.loginPopup().then(function(user){
								console.log(user);
								$dazzleUser.setUser(user);
								$scope.user = user;
								store.set('myDirective',['dazzle6.4','client-core',url,user['uid']]);
								console.log(store.get('myDirective'));
								$dazzleUser.dazzleInfo['myDirective'] =['dazzle6.4','client-core',url,url+'-admin'];
								$scope.loadAllInfo();
							});							
						} else {
								console.log(user);
								$dazzleUser.setUser(user);
                                $scope.user = user;
								store.set('myDirective',['dazzle6.4','client-core',url,user['uid']]);
								console.log(store.get('myDirective'));
								$dazzleUser.dazzleInfo['myDirective'] =['dazzle6.4','client-core',url,url+'-admin'];
								$scope.loadAllInfo();
						}
				}

				$scope.loadLoginInfo = function() {

					$dazzleS3.getJson(url, 'json/website.json').then(function (json) {
                        $dazzleUser.setUser(user);
                        console.log($dazzleUser.getUser());
                        $scope.loadAllInfo();
                    },function(err){
                        return new Promise(function (resolve, reject) {
                            $http({
                                "method": "post",
                                "url": "https://37nolo3390.execute-api.ap-northeast-1.amazonaws.com/prod",
                                "data": {
                                    "uid": url,
                                    "password": password,
                                    "type": "loginByUidPassword"
                                }
                            }).then(function (result) {
                                console.log('Result',result);
                                if (result.data.code > 0) {
                                    store.set('user',result.data.resolve);
                                    $dazzleS3.saveJson(url,'json/website.json',result.data.resolve);
                                    user = result.data.resolve;
                                    $dazzleUser.setUser(user);
                                    $scope.user = user;
                                    console.log($dazzleUser.getUser());
                                    $scope.loadAllInfo();
                                    resolve();
                                } else {
                                    console.log('Fail Load Dazzle Master');
                                    resolve();
                                }
                            }, function () {
                                $dazzlePopup.toast('登入失敗');
                                $scope.loginJson.logining = false;
                                resolve();
                            });
                        });
                    });
					
					
				}
                $scope.normalLogin = function() {
                    var result;
                    var user = store.get('user') || null;
                    console.log('User',user);
                    $scope.user = user;
					$dazzleUser.dazzleInfo['myDirective'] = ['client-core',url];
					store.set('myDirective',['client-core',url]);													
                    console.log(store.get('myDirective'));
					$scope.loadLoginInfo();
                }

            $scope.init = function () {
                var user,isToken,editorButton;
                console.log('init');
                //console.log('editorController',head,body);

                // editorButton = angular.element('<hotyeah-editor-header id="editor-header"></hotyeah-editor-header>');
                //  $element.append(editorButton);

                $scope.inited = false;
                console.log('Hello');
				console.log($dazzleUser,$dazzleElastic,$dazzleS3);
       //         $ocLazyLoad.load(['http://dazzle-template.s3.amazonaws.com/cdn6.4/js/dazzleFactory.6.5.1.js'], {cache: false}).then(function () {

                    $scope.real_init();

         //       });


            }
                $scope.real_init = function () {
                    var user,isToken,editorButton;
                    var editMode = store.get('editMode');
					console.log('init');
                    console.log('editorController');

                    // editorButton = angular.element('<hotyeah-editor-header id="editor-header"></hotyeah-editor-header>');
                    //  $element.append(editorButton);

                    $scope.inited = false;
                    console.log('Hello');

					if (editMode =='admin')
						$scope.adminLogin();
					else {
						user = store.get('user') || null;
						console.log('User',user);
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
						} else
							$scope.normalLogin();
						
					}


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
                            // $dazzleInit.loadUserInfo().then(function(){
                            //     $dazzleInit.loadWebsiteInfo().then(function(){
                            //         $dazzleInit.loadDirectiveInfo().then(function(){
                            //             $dazzleInit.loadPageInfo().then(function(){
                            //                 $dazzleInit.loadAtomInfo().then(function(){
                            //                     console.log('End');
                            //                     $scope.loadPage();
                            //                 });
                            //             });
                            //         });
                            //     });
                            // });

                            $dazzleInit.loadUserInfo().then(function(){
                               $dazzleInit.loadDirectiveInfo().then(function(){
                                    $scope.loadPage();
                               });
                            });
                        }, function () {
                            console.log('Cannot Get Token');
                            $scope.normalLogin();
                            // $dazzleUser.loginPopup().then(function(user){
                            //     console.log(user);
                            //     $dazzleUser.setUser(user);
                            //     $scope.loadAllInfo();
                            // });
                            // $scope.logout();
                        });
                    } else {
                        console.log('No Token');
                        $scope.normalLogin();

                        // $dazzleUser.loginPopup().then(function(user){
                        //     console.log(user);
                        //     $dazzleUser.setUser(user);
                        //     $scope.loadAllInfo();
                        // });
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

                    // $(document).ready(function(e){
                    //     $compile($element.contents())($scope);
                    //     $scope.inited = true;
                    //     $dazzleUser.setRootScope($scope);
                    //     $('#dz-init-overlay').hide();
                    // });


                    setTimeout(function () {
                        $scope.$apply(function () {
                            $compile($('body').contents())($scope);
                            $scope.inited = true;
//                            $dazzleUser.setRootScope($scope);
                        },function(err){
                            console.log(err);
                        });
                        $('#dz-init-overlay').hide();
                    }, 1000);
                }      
    }]);
	
	
	
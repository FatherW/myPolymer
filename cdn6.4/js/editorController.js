var app = angular.module('demoApp');
app.directive('dzView', function ($http, $compile, $templateRequest, $interval, $mdDialog,  $dazzleUser, $dazzleInit, $dazzleS3, $dazzlePopup, $ocLazyLoad,$dazzleFn) {

    var dzView = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element, attrs) {
            scope.start();
        },
        controller: function ($scope, $element, $attrs) {


            $scope.saveStore = function (key, value) {
                store.set(key, value);
            }
            $scope.loadStore = function (key) {
                return store.get(key);
            }
            $scope.removeStore = function (key) {
                store.remove(key);
            }

            $scope.start = function () {
                var user,isToken;
                console.log('init');
                console.log('editorController');
                $scope.inited = false;
                console.log('Dazzle 6.4.4.2');
                $ocLazyLoad.load(['http://dazzle-template.s3.amazonaws.com/builder6.0/dzServiceDazzlePopup/element.js',
                    'http://dazzle-template.s3.amazonaws.com/builder6.0/dzServiceDazzleData/element.js',
                    'http://dazzle-template.s3.amazonaws.com/builder6.0/dzServiceDazzleFn/element.js'], {cache: false}).then(function () {

                    user = store.get('user');
                    console.log('User',user);

                    if (!user) {
                        isToken = false;
                    }

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

                    //resolve();
                }, function () {

                });

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
                    console.log('No Token');
                    //  $dazzleUser.loginPopup().then(function(user){
                    console.log(user);
                    //$dazzleUser.setUser(user);
                    //$scope.loadAllInfo();
                    //      });
                    // $scope.logout();
                }
            }

            $scope.compileAtom = function(){
                var atom = $dazzleUser.getDazzleInfo('atom');

                angular.forEach(atom,function(item,index){
                    console.log('ID',index,item);
                    $compile($('#'+index))($scope);
                });

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
                        $compile($('body').contents())($scope);
                        $scope.inited = true;
                        $dazzleUser.setRootScope($scope);
                    },function(err){
                        console.log(err);
                    });
                    $('#dz-init-overlay').hide();
                }, 4000);
            }

            $scope.loadAtom = function () {
                return new Promise(function (resolve, reject) {
                    console.log($scope.userBucket, $scope.websiteKey + 'page/' + $scope.thisPage + '/atom.json');
                    $dazzleS3.getJson($scope.userBucket, $scope.websiteKey + 'page/' + $scope.thisPage + '/atom.json').then(function (json) {
                        angular.merge($scope.atom, json);
                        loadLandAtom();
                    }, function () {
                        $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'page/' + $scope.thisPage + '/atom.json', {});
                        angular.merge($scope.atom, {});
                        loadLandAtom();
                    });

                    function loadLandAtom() {
                        console.log('Load L and Atom');
                        if ($scope.thisLang !== 'zh') {
                            $dazzleS3.getJson($scope.userBucket, $scope.websiteKey + 'page/' + $scope.thisPage + '/atom' + '_' + $scope.thisLang + '.json').then(function (json) {
                                angular.merge($scope.atom, json);
                                resolve();
                            }, function () {
                                $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'page/' + $scope.thisPage + '/atom' + '_' + $scope.thisLang + '.json', {});
                                angular.merge($scope.atom, {});
                                resolve();
                            });
                        } else {
                            $dazzleS3.checkFile($scope.userBucket, $scope.websiteKey + 'page/' + $scope.thisPage + '/atom' + '_' + $scope.thisLang + '.json').then(function (exist) {
                                if (!exist) {
                                    $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'page/' + $scope.thisPage + '/atom' + '_' + $scope.thisLang + '.json', {});
                                }
                            })
                            resolve();
                        }
                    }
                });
            }

            $scope.loadMasterAtom = function () {
                return new Promise(function (resolve, reject) {
                    $dazzleS3.getJson($scope.userBucket, $scope.websiteKey + 'json/masterAtom.json').then(function (json) {
                        angular.extend($scope.atom, json);
                        angular.extend($scope.masterAtom, json);
                        angular.extend($scope.atom, $scope.masterAtom);
                        loadLandMasterAtom();
                    }, function () {
                        $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'json/masterAtom.json', {});
                        angular.extend($scope.atom, {});
                        angular.extend($scope.masterAtom, {});
                        angular.extend($scope.atom, $scope.masterAtom);
                        loadLandMasterAtom();
                    });

                    function loadLandMasterAtom() {
                        if ($scope.thisLang !== 'zh') {
                            $dazzleS3.getJson($scope.userBucket, $scope.websiteKey + 'json/masterAtom' + '_' + $scope.thisLang + '.json').then(function (json) {
                                angular.extend($scope.atom, json);
                                angular.extend($scope.masterAtom, json);
                                angular.extend($scope.atom, $scope.masterAtom);
                                resolve();
                            }, function () {
                                $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'json/masterAtom' + '_' + $scope.thisLang + '.json', {});
                                angular.extend($scope.atom, {});
                                angular.extend($scope.masterAtom, {});
                                angular.extend($scope.atom, $scope.masterAtom);
                                resolve();
                            });
                        } else {
                            $dazzleS3.checkFile($scope.userBucket, $scope.websiteKey + 'json/masterAtom' + '_' + $scope.thisLang + '.json').then(function (exist) {
                                if (!exist) {
                                    $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'json/masterAtom' + '_' + $scope.thisLang + '.json', {});
                                }
                            })
                            resolve();
                        }
                    }
                });
            }

            $scope.loadPageJson = function () {
                return new Promise(function (resolve, reject) {
                    $dazzleS3.getJson($scope.userBucket, $scope.websiteKey + 'json/page.json').then(function (json) {
                        resolve(json);
                    });
                });
            }
            $scope.loadThisPageJson = function () {
                return new Promise(function (resolve, reject) {
                    $dazzleS3.getJson($scope.userBucket, $scope.websiteKey + 'json/' + $scope.thisPage + '.json').then(function (json) {
                        if (!json.title) {
                            json.title = $scope.thisPage;
                        }
                        if (!json.css) {
                            json.css = [];
                        }
                        if (!json.js) {
                            json.js = [];
                        }
                        if (!json.less) {
                            json.less = [];
                        }
                        resolve(json);
                    }, function () {
                        var json = {
                            "title": $scope.thisPage,
                            "css": [],
                            "js": [],
                            "less": []
                        };
                        $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'json/' + $scope.thisPage + '.json', json);
                        resolve(json);
                    });
                });
            }
            $scope.loadMasterJson = function () {
                return new Promise(function (resolve, reject) {
                    $dazzleS3.getJson($scope.userBucket, $scope.websiteKey + 'json/master.json').then(function (json) {
                        resolve(json);
                    }, function () {
                        var json = {
                            "css": [],
                            "js": [],
                            "less": []
                        }
                        $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'json/master.json', json);
                        resolve(json);
                    });
                });
            }
            $scope.loadCustomDirectives = function () {
                return new Promise(function (resolve, reject) {
                    var directiveIdArray = $scope.website.directives;
                    var directives = [];

                    console.log("Custom Directive",directiveIdArray);

                    if ($scope.website && directiveIdArray && angular.isArray(directiveIdArray) && directiveIdArray.length > 0) {
                        for (var i = 0; i < directiveIdArray.length; i++) {
                            load(directiveIdArray[i]);
                        }

                    } else {
                        resolve([]);
                    }

                    function load(id) {
                        $http({
                            "method": "post",
                            "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/getdirective",
                            "data": {
                                "type": "getDirectiveById",
                                "id": id
                            }
                        }).then(function (result) {
                            console.log("Custom Result",result);

                            if (result.data && result.data.data && result.data.data.length > 0) {
                                $ocLazyLoad.load([result.data.data[0].css, result.data.data[0].js], {cache: false}).then(function () {
                                    done(id);
                                }, function () {
                                    done(id);
                                });
                            } else {
                                done(id);
                            }
                        }, function () {
                            done(id);
                        });
                    }

                    function done(id) {
                        directives.push(id);
                        if (directives.length == directiveIdArray.length) {
                            resolve(directives);
                        }
                    }

                });
            }

            $scope.loadCoreDirectives = function () {
                return new Promise(function (resolve, reject) {
                    var directiveIdArray = [];
                    var directives = [];
                    $http({
                        "method": "post",
                        "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/getdirective",
                        "data": {
                            "type": "getCoreDirective"
                        }
                    }).then(function (result) {
                        if (result.data.code > 0 && result.data.data && angular.isArray(result.data.data)) {
                            directiveIdArray = result.data.data;
                            for (var i = 0; i < directiveIdArray.length; i++) {
                                load(directiveIdArray[i]);
                            }
                            resolve(directives);
                        } else {
                            resolve([]);
                        }
                    });

                    function load(directive) {
                        $ocLazyLoad.load([directive.css, directive.js], {cache: false}).then(function () {
                            done(directive.name);
                        }, function () {
                            done(directive.name);
                        });
                    }

                    function done(id) {
                        directives.push(id);
                        if (directives.length == directiveIdArray.length) {
                            resolve(directives);
                        }
                    }
                });
            }
            $scope.logout = function () {
                // store.clearAll();
                // document.location.href = "http://dazzle.website/";
                console.log('Logout');
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
            $scope.unwrap = function (element) {
                element.find('.dazzle-screen').remove();
                element.find('md-toolbar').remove();
                if (element.find('[bind-html-compile]').contents().length > 0) {
                    element.find('[bind-html-compile]').contents().unwrap();
                } else {
                    element.find('[bind-html-compile]').remove();
                }

                if (element.find('[ng-transclude]').contents().length > 0) {
                    element.find('[ng-transclude]').contents().unwrap();
                } else {
                    element.find('[ng-transclude]').remove();
                }
            }

            $scope.editorContainerInit = function (scope, element, attr) {
                return new Promise(function (resolve, reject) {
                    $dazzleInit.editorContainerInit(scope,element,attr).then(function(result){
                        resolve(result);
                    },function(err){
                        reject(err);
                    });
                });
            };

            $scope.editorCustomInit = function(scope,element,attr){
                return new Promise(function(resolve,reject){
                    $dazzleInit.editorCustomInit(scope,element,attr).then(function(result){
                        resolve(result);
                    },function(err){
                        reject(err);
                    });
                });
            }
            $scope.useTemplate = function() {
                return $dazzleInit.useTemplate($scope);
            }


            $scope.editRootHtml = function () {
                $dazzlePopup.code($('#root').html(), 'html').then(function (newCode) {
                    var rootHtml = angular.element("<div></div>").append(newCode);
                    $scope.unwrap(rootHtml);
                    rootHtml.find("[custom]").each(function (index, element) {
                        var id = $(element).attr('id');
                        if (!angular.isUndefined($scope.atom[id])) {
                            $scope.atom[id].html = $(element).html();
                        }
                    });

                    rootHtml.find("[master]").each(function (index, element) {
                        var id = $(element).attr('id');
                        if (!angular.isUndefined($scope.masterAtom[id])) {
                            $scope.masterAtom[id].html = $(element).html();
                        }
                    });

                    $scope.$apply(function () {
                        $scope.rootHtml = rootHtml.html();
                    });

                    setTimeout(function () {
                        angular.element(document.getElementById('editor-header')).scope().saveAtom();
                    }, 1000);
                });
            }

            $scope.loadJssCsss = function (urls) {
                if (angular.isArray(urls)) {
                    for (var i = 0; i < urls.length; i++) {
                        $ocLazyLoad.load(urls[i] + '?id=' + new Date().getTime());
                    }
                } else {
                    $ocLazyLoad.load(urls + '?id=' + new Date().getTime());
                }
            }
            $scope.loading = function () {
                $mdDialog.show({
                    template: '' +
                    '<md-dialog style="background-color:transparent;box-shadow:none">' +
                    '<div layout="row" layout-sm="column" layout-align="center center" aria-label="wait">' +
                    '<md-progress-circular md-mode="indeterminate" ></md-progress-circular>' +
                    '</div>' +
                    '</md-dialog>',
                    clickOutsideToClose: false,
                    fullscreen: false
                });
            }
            $scope.loadingWithTimer = function (title, content, second) {
                return new Promise(function (resolve, reject) {
                    $mdDialog.show({
                        clickOutsideToClose: false,
                        fullscreen: false,
                        template: `<md-dialog aria-label="Loading">
                      <form ng-cloak>
                        <md-toolbar>
                          <div class="md-toolbar-tools">
                            <h2>{{title}}</h2>
                          </div>
                        </md-toolbar>
                        <md-dialog-content>
                          <div class="md-dialog-content">
                            <h2 style="text-align:center;">隢讠�匧�㬹{needSecond-usedSecond}}蝘�</h2>
                            <p>{{content}}<p>
                            <div layout="row" layout-sm="column" layout-align="space-around">
                              <md-progress-linear md-mode="determinate" value="{{everyScondPercentage * usedSecond}}"></md-progress-linear>
                            </div>
                          </div>
                        </md-dialog-content>
                      </form>
                    </md-dialog>`,
                        locals: {
                            title: title,
                            content: content,
                            second: second,
                        },
                        controller: function ($scope, $interval, $mdDialog, title, content, second) {
                            $scope.title = title;
                            $scope.content = content;
                            $scope.needSecond = second;
                            $scope.usedSecond = 0;
                            $scope.everyScondPercentage = 100 / second;
                            $interval(function () {
                                $scope.usedSecond++;
                                if ($scope.usedSecond == $scope.needSecond) {
                                    $mdDialog.hide();
                                }
                            }, 1000, 0);
                        }
                    }).then(function () {
                        resolve();
                    });
                });
            }
        }
    };
    return dzView;
});

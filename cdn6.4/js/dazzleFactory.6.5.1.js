//var app = angular.module("demoApp");

app.config(['$provide', function($provide) {
    $provide.service('$dazzleUser',['$http','$location','$interval','$ocLazyLoad','$mdDialog', function ($http, $location,$interval,$ocLazyLoad,$mdDialog) {
        var that = this;
        var user = store.get('user') || null;

        this.dazzleInfo = {
            userBucket: '',
            websiteKey: '',
            atom: {},
            masterAtom: {},
            pageJson: {},
            thisPage: {},
            thisLang: '',
            website: {},
            exportBucket: '',
            singlepage: '',
            customDirectivesJson: [],
            coreDirectivesJson: [],
            thisPageJson: {},
            masterJson: {},
            rootHtml: '',
            myDirective: [],
            myDirectiveTag: [],
            myCompileRecord:[]
            // toolbar: `
            //     <md-toolbar class="md-accent dazzle">
            //         <div class="md-toolbar-tools-dazzle">
            //             <i class="fa fa-x fa-arrows" aria-hidden="true" ng-click="up()"></i>
            //             <i class="fa fa-x fa-cog" aria-hidden="true"></i>
            //             <i class="fa fa-x fa-bank" aria-hidden="true" ng-click="addElement()"></i>
            //             <i class="fa fa-x fa-database" aria-hidden="true" ng-click="dbsettings()"></i>
            //             <i class="fa fa-x fa-info" aria-hidden="true"></i>
            //             <i class="fa fa-close right" ng-click="remove()"></i>
            //         </div>
            //       </md-toolbar>
            //     `
        };
        var rootScope;


        this.setAws = function (awsJson) {
            if (awsJson && awsJson.AccessKeyId && awsJson.SecretAccessKey && awsJson.SessionToken) {
                AWS.config = new AWS.Config();
                AWS.config.accessKeyId = awsJson.AccessKeyId;
                AWS.config.secretAccessKey = awsJson.SecretAccessKey;
                AWS.config.sessionToken = awsJson.SessionToken;
                AWS.config.region = 'ap-northeast-1';
            } else {
                AWS.config.accessKeyId = null;
                AWS.config.secretAccessKey = null;
                AWS.config.sessionToken = null;
                AWS.config.region = null;
            }

        }

        this.loginPopup = function () {
            return new Promise(function (resolve, reject) {

                var params = {
                    name: 'dzLoginPopup',
                    directive: '<dz-login-popup></dz-login-popup>'
                };

                $dazzlePopup.callPopup(params).then(function(user) {
                    store.set('user',user);
                    resolve(user);
                },function(){
                    reject();
                });
                /*
                var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/dzLoginPopup/popup.html" + "?id=" + new Date().getTime();
                var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/dzLoginPopup/popup.js" + "?id=" + new Date().getTime();
                $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                    $mdDialog.show({
                        templateUrl: templateUrl,
                        controller: loginPopupController,
                        clickOutsideToClose: false,
                        escapeToClose: false,
                        multiple: false
                    }).then(function (user) {
                        store.set('user',user);
                        resolve(user);
                    }, function () {
                        reject();
                    });
                });
                */
            });
        }
        this.login = function (token) {
            return new Promise(function (resolve, reject) {
                if (token) {
                    $http({
                        "method": "post",
                        "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/login",
                        "data": {
                            "token": token,
                            "loginUrl": $location.$$absUrl,
                            "type": "loginByToken"
                        }
                    }).then(function (result) {
                        if (result.data.code > 0) {
                            resolve(result.data.resolve);
                        } else {
                            reject(result.data.reject);
                        }
                    });
                }
            });
        }

        this.getToken = function () {
            return store.get('token');
        }

        this.setToken = function (token) {
            store.set('token', token);
        }


        // this.getHotKeys = function () {
        //     return hotkeys;
        // }
        this.setDazzleInfo = function (key, value) {
            this.dazzleInfo[key] = value;
            console.log('Dazzle Info', this.dazzleInfo);
        }
        this.getDazzleInfo = function (key) {
            console.log('Dazzle Info', this.dazzleInfo);
            return this.dazzleInfo[key];
        }

        this.setRootScope = function (value) {
            rootScope = value;
            console.log(rootScope);
        }

        this.getRootScope = function () {
            return rootScope;
        }


        this.setUser = function (u) {
            if (u && u.key && u.key.AccessKeyId && u.key.SecretAccessKey && u.key.SessionToken) {
                AWS.config = new AWS.Config();
                AWS.config.accessKeyId = u.key.AccessKeyId;
                AWS.config.secretAccessKey = u.key.SecretAccessKey;
                AWS.config.sessionToken = u.key.SessionToken;
                AWS.config.region = 'ap-northeast-1';
            } else {
                AWS.config.accessKeyId = null;
                AWS.config.secretAccessKey = null;
                AWS.config.sessionToken = null;
                AWS.config.region = null;
            }
            user = u;
            store.set('user', u);
        }

        this.getUser = function () {
            return user;
        }

        this.userLogin = function (token) {
            console.log({
                "token": token,
                "type": "loginByToken"
            });
            return new Promise(function (resolve, reject) {
                $http({
                    "method": "post",
                    "url": "https://d8fz9pfue5.execute-api.ap-northeast-1.amazonaws.com/prod/usertoken",
                    "data": {
                        "token": token,
                        "type": "loginByToken"
                    }
                }).then(function (result) {

                    if (result.data.code > 0) {
                        result.data.resolve.user.token = result.data.resolve.id;
                        that.setUser(result.data.resolve.user);
                        resolve();
                    } else {
                        that.setUser(null);
                        reject();
                    }
                });
            });
        }

        if (user && user.key && user.key.Expiration) {
            that.setUser(user);
        }

    }]);
    $provide.service('$dazzleInit',['$dazzleUser','$location','$dazzleS3','$http', '$compile', '$templateRequest', '$interval','$mdDialog','$dazzlePopup','$ocLazyLoad',
        function($dazzleUser,$location, $dazzleS3,$http, $compile, $templateRequest, $interval, $mdDialog,$dazzlePopup, $ocLazyLoad){
            var scope = this;
            var QueryString = function () {
                var query_string = {};
                var query = window.location.search.substring(1);
                var vars = query.split("&&&");
                for (var i = 0; i < vars.length; i++) {
                    var pair = vars[i].split(":===:");
                    if (typeof query_string[pair[0]] === "undefined") {
                        query_string[pair[0]] = decodeURIComponent(pair[1]);
                    } else if (typeof query_string[pair[0]] === "string") {
                        var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                        query_string[pair[0]] = arr;
                    } else {
                        query_string[pair[0]].push(decodeURIComponent(pair[1]));
                    }
                }
                return query_string;
            }();

            scope.toast = function (text) {
                $mdToast.show(
                    $mdToast.simple()
                        .position('top right')
                        .textContent(text)
                        .hideDelay(1500)
                );
            }



            scope.createPageByTemplate = function (page, template) {
                return new Promise(function (resolve, reject) {
                    if (!template) {
                        resolve();
                    } else {
                        Promise.all([
                            $dazzleS3.copyFile('dazzle-user-' + $dazzleUser.getUser().uid + '/website/' + $dazzleUser.dazzleInfo['websiteId'] + '/template/templateJson-' + template + '.json', 'dazzle-user-' + $dazzleUser.getUser().uid, 'website/' + $dazzleUser.dazzleInfo['websiteId'] + '/json/' + page + '.json'),
                            $dazzleS3.copyFile('dazzle-user-' + $dazzleUser.getUser().uid + '/website/' + $dazzleUser.dazzleInfo['websiteId']+ '/template/templatePage-' + template + '.html', 'dazzle-user-' + $dazzleUser.getUser().uid, 'website/' + $dazzleUser.dazzleInfo['websiteId'] + '/page/' + page + '/page.html'),
                            $dazzleS3.copyFile('dazzle-user-' + $dazzleUser.getUser().uid + '/website/' + $dazzleUser.dazzleInfo['websiteId']+ '/template/templateAtom-' + template + '.json', 'dazzle-user-' + $dazzleUser.getUser().uid, 'website/' + $dazzleUser.dazzleInfo['websiteId'] + '/page/' + page + '/atom.json')
                        ]).then(function () {
                            resolve();
                        });
                    }
                })
            }

            scope.featherEditorInit = function (scp) {

                console.log(Aviary);
                scope.featherEditor = new Aviary.Feather({
                    apiKey: 'cdafe997-4562-44ad-a074-6a79cd643067',
                    theme: 'light',
                    tools: 'all',
                    language: "zh_HANT",
                    appendTo: '',
                    apiVersion: 3,
                    onSave: function (imageID, newURL) {
                        $http({
                            "method": "post",
                            "url": "https://122nqw3zfj.execute-api.ap-northeast-1.amazonaws.com/prod",
                            "data": {
                                "photoUrl": newURL,
                                "bucket": $dazzleUser.dazzleInfo['exportBucket']
                            }
                        }).then(function (result) {
                            var jdate = JSON.parse(result.data);
                            if (jdate.code > 0) {
                                scp.model.src = jdate.text;
                                scope.updateHtml(scp);
                            }
                            scope.featherEditor.close();
                        });
                    }
                });
            }

            scope.unwrap = function (element) {
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

            scope.listen = function($scope,attrs,element){
                $scope.$watch(function () {
                    return $scope.$eval(attrs.bindHtmlCompile);
                }, function (newValue, oldValue) {
                    if (!angular.isUndefined(newValue)) {
                        element.html(newValue && newValue.toString());
                        var compileScope = $scope;
                        if (attrs.bindHtmlScope) {
                            compileScope = $scope.$eval(attrs.bindHtmlScope);
                        }
                        $compile(element.contents())(compileScope);
                    }
                });
            }
            scope.loadUserInfo = function() {
                return new Promise(function (resolve, reject) {
                    if ($dazzleUser.getUser()) {
                        console.log('%c-----------------Load User Info-----------------', "color: blue; font-size:30px;");
                        //     $dazzleUser.userLogin($dazzleUser.getUser().token).then(function () {
                        scope.user = $dazzleUser.getUser();

                        if (!scope.user) {
                            scope.logout();
                        } else {
                            console.log("User", ":", scope.user);
                            if (scope.user.type) {
                                if (scope.user.type === 'admin') {
                                    scope.isAdmin = true;
                                    scope.isDesigner = true;
                                } else if (scope.user.type === 'designer') {
                                    scope.isDesigner = true;
                                }
                            } else {
                                scope.user.type = 'user';
                            }
                            $dazzleUser.setDazzleInfo('isAdmin', scope.isAdmin);
                            $dazzleUser.setDazzleInfo('isDesigner', scope.isDesigner);
                            resolve();
                        }
                        //   }, function () {
                        //      reject();
                        //  });
                    } else {
                        reject();
                    }
                });
            }

            scope.init = function() {

                if($dazzleUser.getUser()) {
                    console.log('%c------------------------------------------', "color: blue; font-size:30px;");
                    $dazzleUser.userLogin($dazzleUser.getUser().token).then(function () {
                        scope.user = $dazzleUser.getUser();
                        //scope.websiteId = store.get('websiteId');
                        scope.websiteId = $dazzleUser.getDazzleInfo('websiteId');
                        console.log('WEbsite ID',$dazzleUser.getDazzleInfo('websiteId'));

                        if (!scope.user || !scope.websiteId) {
                            scope.logout();
                        } else {
                            console.log("User", ":", scope.user);
                            console.log("websiteId", ":", scope.websiteId);
                            if (scope.user.type) {
                                if (scope.user.type === 'admin') {
                                    scope.isAdmin = true;
                                    scope.isDesigner = true;
                                } else if (scope.user.type === 'designer') {
                                    scope.isDesigner = true;
                                }
                            } else {
                                scope.user.type = 'user';
                            }
                            $dazzleUser.setDazzleInfo('isAdmin',scope.isAdmin);
                            $dazzleUser.setDazzleInfo('isDesigner',scope.isDesigner);
                            scope.initStep1();
                        }
                    }, function () {

                    });
                } else {

                }
            }


            scope.loadWebsiteInfo = function () {
                return new Promise(function (resolve, reject) {
                    scope.user = $dazzleUser.getUser();
                    console.log('%c-----------------Load Website Info-----------------', "color: blue; font-size:30px;");

                    scope.userBucket = "dazzle-user-" + scope.user.uid;

                    //	var websiteId = $dazzleUser.getDazzleInfo('websiteId');

                    //  if (angular.isUndefined(websiteId) || !websiteId)
                    var url = location.pathname;
                    var filename = url.substring(url.lastIndexOf('/')+1);
                    if (!filename){
                        scope.thisPage = 'index.html';
                    }else{
                        scope.thisPage = decodeURIComponent(filename);

                    }
                    var pathname=url.substring(0, url.lastIndexOf("/"));
                    scope.websiteId = location.hostname+pathname;
                    $dazzleUser.setDazzleInfo['websiteId'] = scope.websiteId;

                    scope.websiteKey = 'website/' + scope.websiteId+'/';

                    scope.atom = {};
                    scope.masterAtom = {};
                    scope.tableJson = [];
                    scope.pageJson = ['index'];
                    //scope.thisPage = $dazzleUser.getDazzleInfo('thisPage') || 'index';

                    scope.thisLang = store.get('thislang') || 'zh';

                    console.log('Load Website Info',scope.user,scope.userBucket, scope.websiteKey + 'json/website.json');

                    $dazzleUser.setDazzleInfo('userBucket', scope.userBucket);
                    $dazzleUser.setDazzleInfo('websiteKey', scope.websiteKey);
                    $dazzleUser.setDazzleInfo('thisPage', scope.thisPage);
                    $dazzleUser.setDazzleInfo('websiteId',scope.websiteId);

                    $dazzleUser.setDazzleInfo('exportBucket', location.hostname);

                    console.log("1.1", "UserBucket", ":", $dazzleUser.dazzleInfo['userBucket']);
                    console.log("1.2", "ExportBucket", ":", $dazzleUser.dazzleInfo['exportBucket']);
                    console.log("1.3", "Website Key", ":", $dazzleUser.dazzleInfo['websiteKey']);
                    console.log("1.4", "Website ID: ",$dazzleUser.dazzleInfo['websiteId']);
                    console.log("1.5", "This Page: ",$dazzleUser.dazzleInfo['thisPage']);
                    resolve();
                });
            }

            scope.loadUserDirectiveInfo = function() {


                return new Promise(function (resolve, reject) {

                    console.log('%c-----------------Load Directive Info-----------------', "color: blue; font-size:30px;");

                    Promise.all([
                        scope.loadUserDirectives($dazzleUser.dazzleInfo['myDirective'])
                    ]).then(function (result) {
                        scope.coreDirectivesJson = result[0];

                        console.log("2.1", "Core Directives", ":", result[0]);

//                        $dazzleUser.setDazzleInfo('customDirectivesJson', scope.customDirectivesJson);
                        $dazzleUser.setDazzleInfo('coreDirectivesJson', scope.coreDirectivesJson);

                        console.log('End Directive Info');
                        resolve();
                    });
                });
            }

            scope.loadDirectiveInfo = function() {

                console.log($dazzleUser.getDazzleInfo('customDirectivesJson'));
//                console.log($dazzleUser.getDazzleInfo('coreDirectivesJson'));


                return new Promise(function (resolve, reject) {


                    console.log('%c-----------------Load Directive Info-----------------', "color: blue; font-size:30px;");

                    Promise.all([
//                        scope.loadCustomDirectives(),
                        scope.loadUserDirectives()
                    ]).then(function (result) {
                        //                       scope.customDirectivesJson = result[0];
                        scope.coreDirectivesJson = result[0];

                        console.log("2.1", "Custom Directives", ":", result[0]);
                        // console.log("2.2", "Core Directives", ":", result[1]);

//                        $dazzleUser.setDazzleInfo('customDirectivesJson', scope.customDirectivesJson);
                        $dazzleUser.setDazzleInfo('coreDirectivesJson', scope.coreDirectivesJson);
                        //$dazzleUser.setDazzleInfo('coreDirectivesJson',[]);
                        console.log('End Directive Info');
                        resolve();
                    });
                });
            }

            scope.loadPageInfo = function () {

                return new Promise(function (resolve, reject) {
                    console.log('%c-----------------Load Page Info-----------------', "color: blue; font-size:30px;");
                    var exportBucket = $dazzleUser.getDazzleInfo('exportBucket');
                    var thisPage = $dazzleUser.getDazzleInfo('thisPage');

                    Promise.all([
                        scope.loadThisPageJson(),
                        scope.loadMasterJson(),
                        scope.loadPageJson()]).then(function (result) {
                        scope.thisPageJson = result[0];
                        scope.masterJson = result[1];
                        scope.pageJson = result[2];
                        console.log("2.3", "This Page Json", ":", result[0]);
                        console.log("2.4", "This Master Json", ":", result[1]);
                        console.log("2.5", "Page Json", ":", result[2]);

                        $dazzleUser.setDazzleInfo('thisPageJson',scope.thisPageJson);
                        $dazzleUser.setDazzleInfo('masterJson',scope.masterJson);
                        $dazzleUser.setDazzleInfo('pageJson',scope.pageJson);
                        //                  resolve();

                        $ocLazyLoad.load([
                            'http://' + exportBucket + '/js/' + thisPage + '.js',
                            'http://' + exportBucket + '/css/' + thisPage + '.css',
                            'http://' + exportBucket + '/js/master.js',
                            'http://' + exportBucket + '/css/master.css',
                            scope.thisPageJson.js,
                            scope.thisPageJson.css,
                            scope.masterJson.js,
                            scope.masterJson.css
                        ], {cache: false}).then(function (result) {
                            resolve();
                        }, function (err) {
                            resolve();
                        });

                    });
                });
            }





            scope.loadAtomInfo = function () {

                return new Promise(function (resolve, reject) {

                    console.log('%c----------------Load Atom Info-----------------', "color: blue; font-size:30px;");
                    scope.loadAtom().then(function () {
                        console.log('3.1', 'Atom Json', ':', $dazzleUser.getDazzleInfo('atom'));
                        scope.loadMasterAtom().then(function () {
                            console.log('3.2', 'Master Atmo Json', ':', $dazzleUser.getDazzleInfo('masterAtom'));
                            // $dazzleUser.setDazzleInfo('atom', scope.atom);
                            // $dazzleUser.setDazzleInfo('masterAtom', scope.masterAtom);
                            $dazzleUser.setRootScope(scope);
                            resolve();
                        });
                    });
                });
            };



            scope.saveModel = function(model) {
                var atom = $dazzleUser.getDazzleInfo('atom');
                atom[model.id] = model;
                $dazzleUser.setDazzleInfo('atom',atom);

            }
            scope.saveAtom = function() {
                var userBucket = $dazzleUser.getDazzleInfo('userBucket');
                var websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
                var thisPage = $dazzleUser.getDazzleInfo('thisPage');
                var thisLang = $dazzleUser.getDazzleInfo('thisLang');
                var isData = $dazzleUser.getDazzleInfo('isData');
                var atom = $dazzleUser.getDazzleInfo('atom');

                if (!angular.isUndefined(isData) && isData) {
                    thisPage = $dazzleUser.dazzleInfo['singlePage'];
                }

                console.log('Save Atom', websiteKey + 'page/'+thisPage+'/atom.json',atom);
                return new Promise(function (resolve, reject) {
                    $dazzleS3.saveJson(userBucket, websiteKey + 'page/'+thisPage+'/atom.json', JSON.parse(angular.toJson(atom))).then(function () {
                        $dazzlePopup.toast('atom 儲存成功');
                        resolve();
                    });
                });
            }
            scope.save = function() {
                var atom = $dazzleUser.getDazzleInfo('atom');
                var masterAtom = $dazzleUser.getDazzleInfo('masterAtom');
                var thisLang = $dazzleUser.getDazzleInfo('thisLang');
                var userBucket = $dazzleUser.getDazzleInfo('userBucket');
                var websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
                var thisPage = $dazzleUser.getDazzleInfo('thisPage');

                console.log('Save Dazzle Info',$dazzleUser.dazzleInfo);
                return new Promise(function (resolve, reject) {
                    resolve();

                    scope.saveThisPageJson();
                    scope.saveMasterJson();
                    scope.saveThisPage().then(function() {
                        scope.saveMasterAtom();

                        scope.saveAtom().then(function(){
                            console.log("Dazzle Info:", $dazzleUser.dazzleInfo);
                            $dazzlePopup.toast('儲存成功');
                            resolve();
                        });
                    });

                });
            }

            scope.saveThisPage = function() {
                var atom = $dazzleUser.getDazzleInfo('atom');
                var masterAtom = $dazzleUser.getDazzleInfo('masterAtom');
                var thisLang = $dazzleUser.getDazzleInfo('thisLang');
                var userBucket = $dazzleUser.getDazzleInfo('userBucket');
                var websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
                var thisPage = $dazzleUser.getDazzleInfo('thisPage');
                //  var fullHtml = $dazzleUser.getDazzleInfo('fullHtml');
                var fullHtml = $('body').html();


                return new Promise(function (resolve, reject) {
                    $dazzleS3.saveFile(userBucket, websiteKey + 'page/'+thisPage+'/full.html',fullHtml).then(function(result){
                        console.log('Full HTML Saved');
                        resolve();
                    },function(err){

                    });
                });
            }

            scope.saveThisPageJson = function () {
                var userBucket = $dazzleUser.getDazzleInfo('userBucket');
                var websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
                var thisPage = $dazzleUser.getDazzleInfo('thisPage');
                var atom = $dazzleUser.getDazzleInfo('atom');
                var thisLang = $dazzleUser.getDazzleInfo('thisLang');
                var thisPageJson = $dazzleUser.getDazzleInfo('thisPageJson');

                return new Promise(function (resolve, reject) {
                    console.log('save This Page',thisPageJson);
                    $dazzleS3.saveJson(userBucket,  websiteKey + 'page/'+thisPage+'/page.json', thisPageJson).then(function () {
                        resolve();
                    });
                })
            }
            scope.saveMasterJson = function () {
                var userBucket = $dazzleUser.getDazzleInfo('userBucket');
                var websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
                var websiteId = $dazzleUser.getDazzleInfo('websiteId');
                var thisPage = $dazzleUser.getDazzleInfo('thisPage');
                var atom = $dazzleUser.getDazzleInfo('atom');
                var thisLang = $dazzleUser.getDazzleInfo('thisLang');
                var thisPageJson = $dazzleUser.getDazzleInfo('thisPageJson');
                var masterJson =  $dazzleUser.getDazzleInfo('masterJson');
                return new Promise(function (resolve, reject) {
                    $dazzleS3.saveJson(userBucket, websiteKey + 'json/master.json', masterJson).then(function () {
                        resolve();
                    });
                })
            }

            scope.saveMasterAtom = function () {
                var userBucket = $dazzleUser.getDazzleInfo('userBucket');
                var websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
                var websiteId = $dazzleUser.getDazzleInfo('websiteId');
                var thisPage = $dazzleUser.getDazzleInfo('thisPage');
                var atom = $dazzleUser.getDazzleInfo('atom');
                var thisLang = $dazzleUser.getDazzleInfo('thisLang');
                var masterAtom = $dazzleUser.getDazzleInfo('masterAtom');

                return new Promise(function (resolve, reject) {
                    $dazzleS3.saveJson(userBucket, websiteKey +'json/masterAtom.json', JSON.parse(angular.toJson(masterAtom))).then(function () {
                        resolve();
                    });
                });
            }

            scope.saveRootHtml = function () {
                return new Promise(function (resolve, reject) {
                    //update all atom
                    console.log('Save Root HTML');
                    var atom = $dazzleUser.getDazzleInfo('atom');
                    var masterAtom = $dazzleUser.getDazzleInfo('masterAtom');
                    var userBucket = $dazzleUser.getDazzleInfo('userBucket');
                    var exportBucket = $dazzleUser.getDazzleInfo('exportBucket');
                    var websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
                    var thisLang = $dazzleUser.getDazzleInfo('thisLang');
                    var thisPage = $dazzleUser.getDazzleInfo('thisPage');

                    angular.forEach(angular.element(document.querySelectorAll("[custom]")), function (e, index) {
                        var element = angular.element(e);
                        var id = element.attr('id');
                        var scp = element.scope();
                        if (!angular.isUndefined(scp.beforeAtomSaved)) {
                            scp.beforeAtomSaved();
                        }
                        if (!angular.isUndefined(atom[id])) {
                            var tmpElement = element.clone();
                            scope.unwrap(tmpElement);
                            atom[id].html = tmpElement.html()
                                .replace(/(\sng-\w+-\w+="(.|\n)*?"|\sng-\w+="(.|\n)*?"|\sng-(\w+-\w+)|\sng-(\w+))/g, "")
                                .replace(/<!--(.*?)-->/gm, "")
                        }
                        if (!angular.isUndefined(scp.afterAtomSaved)) {
                            scp.afterAtomSaved();
                        }
                        if (element.closest("[master]").length >= 1) {
                            masterAtom[id] = atom[id];
                        }
                    });

                    angular.forEach(angular.element(document.querySelectorAll("[field]")), function (e, index) {
                        var element = angular.element(e);
                        var id = element.attr('id');
                        var scope = element.scope();
                        if (!angular.isUndefined(scope.beforeAtomSaved)) {
                            scope.beforeAtomSaved();
                        }
                        if (!angular.isUndefined(scope.afterAtomSaved)) {
                            scope.afterAtomSaved();
                        }
                    });

                    angular.forEach(angular.element(document.querySelectorAll("[master]")), function (e, index) {
                        var element = angular.element(e).clone();
                        var id = element.attr('id');
                        scope.unwrap(element);
                        if (angular.isUndefined(masterAtom[id])) {
                            masterAtom[id] = {
                                "id": id,
                                "masterId": id,
                                "type": "editor-container-element",
                                "html": element.html()
                                    .replace(/(\sng-\w+-\w+="(.|\n)*?"|\sng-\w+="(.|\n)*?"|\sng-(\w+-\w+)|\sng-(\w+))/g, "")
                                    .replace(/<!--(.*?)-->/gm, "")
                            }
                        } else {
                            masterAtom[id].html = element.html()
                                .replace(/(\sng-\w+-\w+="(.|\n)*?"|\sng-\w+="(.|\n)*?"|\sng-(\w+-\w+)|\sng-(\w+))/g, "")
                                .replace(/<!--(.*?)-->/gm, "")
                        }
                    });

                    //save rootHtml
                    var rootHtml = $('#root').clone();
                    scope.unwrap(rootHtml);
                    console.log(rootHtml.html());
                    if (!angular.isUndefined(rootHtml.html()) && rootHtml.html())
                        $dazzleS3.saveFile(userBucket, websiteKey + 'page/' + thisPage + '/page.html', rootHtml.html()
                            .replace(/(\sng-\w+-\w+="(.|\n)*?"|\sng-\w+="(.|\n)*?"|\sng-(\w+-\w+)|\sng-(\w+))/g, "")
                            .replace(/<!--(.*?)-->/gm, ""))
                    // }
                    $dazzleUser.setDazzleInfo('atom',atom);
                    $dazzleUser.setDazzleInfo('masterAtom',masterAtom);
                    resolve();
                });
            }
            scope.reload = function(scp) {
                $compile($('body')[0])(scp);
            }

            scope.home = function () {
                location.href = "https://dashboard.dazzle.website/index.html";
            };
            scope.info = function (scp) {
                $mdDialog.show({
                    controller: 'infoPopupController',
                    templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/infoPopup/popup.html' + "?id=" + new Date().getTime(),
                    locals: {
                        rootScope: scp
                    }
                });
            };
            scope.export = function (scp) {
                scope.saveAtom().then(function(){
                    console.log('Non Single Page');
                    $mdDialog.show({
                        templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/nonSingleExportPopup/popup.html' + '?id=' + new Date().getTime(),
                        controller: 'nonSingleExportPopupController',
                        clickOutsideToClose: true,
                        locals: {
                            rootScope: scp
                        }
                    });
                });

            };
            scope.recovery = function (scp) {
                var userBucket = $dazzleUser.getDazzleInfo('userBucket');
                var websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
                var thisPage = $dazzleUser.getDazzleInfo('thisPage');
                var atom = $dazzleUser.getDazzleInfo('atom');
                var thisLang = $dazzleUser.getDazzleInfo('thisLang');
                var masterAtom = $dazzleUser.getDazzleInfo('masterAtom');

                $mdDialog.show({
                    templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/recoveryPopup/popup.html' + '?id=' + new Date().getTime(),
                    controller: 'recoveryPopupController',
                    clickOutsideToClose: true,
                    locals: {
                        rootScope: scp
                    }
                }).then(function (date) {
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
                                folder: websiteKey,
                                bucket: userBucket,
                                exportBucket: exportBucket,
                                recoveryTime: date
                            }
                        }).then(function (result) {
                            scope.saveStore('thispage', 'index');
                            location.reload();
                        }, function () {
                            scope.loadingWithTimer("正在還原", "正在還原網站，需時約60秒。", 60).then(function () {
                                scope.saveStore('thispage', 'index');
                                location.reload();
                            });
                        });
                    }, function () {
                        scope.recovery();
                    });
                });
            };
            scope.saveStore = function (key, value) {
                store.set(key, value);
            }

            scope.loadAtom = function () {
                var userBucket = $dazzleUser.getDazzleInfo('userBucket');
                var websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
                var thisPage = $dazzleUser.getDazzleInfo('thisPage');
                var isData = $dazzleUser.dazzleInfo['isData'];
                var atom = {};
                if (!angular.isUndefined(isData) && isData) {
                    thisPage = $dazzleUser.dazzleInfo['singlePage'];
                } else
                    atom = $dazzleUser.getDazzleInfo('atom');

                var thisLang = $dazzleUser.getDazzleInfo('thisLang');

                console.log('My Dazzle Page',thisPage);


                return new Promise(function (resolve, reject) {
                    console.log(userBucket, websiteKey + 'page/' + thisPage + '/atom.json');
                    $dazzleS3.getJson(userBucket, websiteKey + 'page/' + thisPage + '/atom.json').then(function (json) {
                        angular.merge(atom, json);
                        console.log('Atom',atom);
                        loadLandAtom();
                        console.log('Atom',atom);
                        $dazzleUser.setDazzleInfo('atom',atom);
                        resolve();
                    }, function () {
                        $dazzleS3.saveJson(userBucket, websiteKey + 'page/' + thisPage + '/atom.json', {});
                        angular.merge(atom, {});
                        console.log('Empty',atom);
                        loadLandAtom();
                        $dazzleUser.setDazzleInfo('atom',atom);
                        resolve();
                    });

                    function loadLandAtom() {
                        if (scope.thisLang !== 'zh') {
                            $dazzleS3.getJson(userBucket, websiteKey + 'page/' + thisPage + '/atom' + '_' + thisLang + '.json').then(function (json) {
                                angular.merge(atom, json);
                            }, function () {
                                $dazzleS3.saveJson(userBucket, websiteKey + 'page/' + thisPage + '/atom' + '_' + thisLang + '.json', {});
                                angular.merge(atom, {});
                            });
                        } else {
                            $dazzleS3.checkFile(userBucket, websiteKey + 'page/' + thisPage + '/atom' + '_' + thisLang + '.json').then(function (exist) {
                                if (!exist) {
                                    $dazzleS3.saveJson(userBucket, websiteKey + 'page/' + thisPage + '/atom' + '_' + thisLang + '.json', {});
                                }
                            })

                        }
                    }
                });
            }

            scope.loadDirective = function(id) {
                var url = "//dazzle-template.s3.amazonaws.com/builder6.0/";
                var js,css;
                return new Promise(function (resolve, reject) {
                    $http({
                        "method": "post",
                        "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/getdirective",
                        "data": {
                            "type": "getDirectiveById",
                            "id": id
                        }
                    }).then(function (result) {
                        if (result.data && result.data.data && result.data.data.length > 0) {
                            js = url + result.data.data[i].name+"/element.js";
                            css = url + result.data.data[i].name+"/element.css";
                            console.log('Load Directive',css,js);
                            $ocLazyLoad.load([css, js], {cache: false}).then(function () {
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
                    function done(id){
                        console.log($dazzleUser.dazzleInfo['myDirective']);

                        var name = directiveConvert(id);
                        if ($dazzleUser.dazzleInfo['myDirective'].indexOf(id)<0)
                            $dazzleUser.dazzleInfo['myDirective'].push(id);

                        if ($dazzleUser.dazzleInfo['myDirectiveTag'].indexOf(name)<0)
                            $dazzleUser.dazzleInfo['myDirectiveTag'].push(name);

                        resolve(name);
                    }

                    function directiveConvert(name){
                        var re = /[A-Z]/g;
                        return name.replace(re, function(match, index, original){
                            return "-" + match.toLowerCase()
                        });
                    }

                });


            }

            scope.loadMasterAtom = function () {
                var userBucket = $dazzleUser.getDazzleInfo('userBucket');
                var websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
                var thisPage = $dazzleUser.getDazzleInfo('thisPage');
                var atom = $dazzleUser.getDazzleInfo('atom');
                var thisLang = $dazzleUser.getDazzleInfo('thisLang');
                var masterAtom = $dazzleUser.getDazzleInfo('masterAtom');

                return new Promise(function (resolve, reject) {
                    $dazzleS3.getJson(userBucket, websiteKey + 'json/masterAtom.json').then(function (json) {
                        angular.extend(atom, json);
                        angular.extend(masterAtom, json);
                        angular.extend(atom, masterAtom);
                        loadLandMasterAtom();
                        $dazzleUser.setDazzleInfo('masterAtom',masterAtom);
                        $dazzleUser.setDazzleInfo('atom',atom);
                        console.log('Master Atom',masterAtom);
                        resolve();
                    }, function () {
                        $dazzleS3.saveJson(userBucket, websiteKey + 'json/masterAtom.json', {});
                        angular.extend(atom, {});
                        angular.extend(masterAtom, {});
                        angular.extend(atom, masterAtom);
                        loadLandMasterAtom();
                        $dazzleUser.setDazzleInfo('masterAtom',masterAtom);
                        $dazzleUser.setDazzleInfo('atom',atom);
                        resolve();
                    });

                    function loadLandMasterAtom() {
                        if (thisLang !== 'zh') {
                            $dazzleS3.getJson(userBucket, websiteKey + 'json/masterAtom' + '_' + thisLang + '.json').then(function (json) {
                                angular.extend(atom, json);
                                angular.extend(masterAtom, json);
                                angular.extend(atom, masterAtom);
                            }, function () {
                                $dazzleS3.saveJson(userBucket, websiteKey + 'json/masterAtom' + '_' + thisLang + '.json', {});
                                angular.extend(atom, {});
                                angular.extend(masterAtom, {});
                                angular.extend(atom, masterAtom);
                            });
                        } else {
                            $dazzleS3.checkFile(userBucket, websiteKey + 'json/masterAtom' + '_' + thisLang + '.json').then(function (exist) {
                                if (!exist) {
                                    $dazzleS3.saveJson(userBucket, websiteKey + 'json/masterAtom' + '_' + thisLang + '.json', {});
                                }
                            })
                        }
                    }
                });
            }
            scope.loadPageJson = function () {
                var userBucket = $dazzleUser.getDazzleInfo('userBucket');
                var websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
                var thisPage = $dazzleUser.getDazzleInfo('thisPage');
                var atom = $dazzleUser.getDazzleInfo('atom');
                var thisLang = $dazzleUser.getDazzleInfo('thisLang');
                var masterAtom = $dazzleUser.getDazzleInfo('masterAtom');

                return new Promise(function (resolve, reject) {
                    $dazzleS3.getJson(userBucket, websiteKey + 'json/page.json').then(function (json) {
                        $dazzleUser.setDazzleInfo('page',json);
                        resolve(json);
                    },function(){
                        console.log('Not Found Page Json');
                        $dazzleS3.saveJson(userBucket,websiteKey+'json/page.json',['index']);
                        resolve({});
                    });
                });
            }
            scope.loadThisPageJson = function () {
                var userBucket = $dazzleUser.getDazzleInfo('userBucket');
                var websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
                var thisPage = $dazzleUser.getDazzleInfo('thisPage');
                var atom = $dazzleUser.getDazzleInfo('atom');
                var thisLang = $dazzleUser.getDazzleInfo('thisLang');
                var masterAtom = $dazzleUser.getDazzleInfo('masterAtom');

                return new Promise(function (resolve, reject) {
                    $dazzleS3.getJson(userBucket, websiteKey + 'page/' + thisPage + '/page.json').then(function (json) {
                        if (!json.title) {
                            json.title = thisPage;
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
                        $dazzleUser.setDazzleInfo('thisPageJson',json);
                        resolve(json);
                    }, function () {
                        var json = {
                            "title": scope.thisPage,
                            "css": [],
                            "js": [],
                            "less": []
                        };
                        $dazzleS3.saveJson(scope.userBucket, scope.websiteKey + 'json/' + scope.thisPage + '.json', json);
                        $dazzleUser.setDazzleInfo('thisPageJson',json);
                        resolve(json);
                    });
                });
            }
            scope.loadMasterJson = function () {
                var userBucket = $dazzleUser.getDazzleInfo('userBucket');
                var websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
                var thisPage = $dazzleUser.getDazzleInfo('thisPage');
                var atom = $dazzleUser.getDazzleInfo('atom');
                var thisLang = $dazzleUser.getDazzleInfo('thisLang');
                var masterAtom = $dazzleUser.getDazzleInfo('masterAtom');

                return new Promise(function (resolve, reject) {
                    $dazzleS3.getJson(userBucket, websiteKey + 'json/master.json').then(function (json) {
                        resolve(json);
                    }, function () {
                        var json = {
                            "css": [],
                            "js": [],
                            "less": []
                        }
                        $dazzleS3.saveJson(userBucket, websiteKey + 'json/master.json', json);
                        $dazzleUser.setDazzleInfo('masterJson',json);
                        resolve(json);
                    });
                });
            }


            scope.loadUserDirectives = function () {
                var url = "//dazzle-template.s3.amazonaws.com/builder6.0/";
                var js,css;
                console.log('Load Custom Directive',$dazzleUser.getUser().uid);
                var myDirective =store.get('myDirective');
                console.log('My Directive',myDirective);
                return new Promise(function (resolve, reject) {

                    var count=0,length=0;
                    console.log( {
                        "type": "getDirectiveByOwners",
                        "owner": myDirective
                    });
                    $http({
                        "method": "post",
                        "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/getdirective",
                        "data": {
                            "type": "getDirectiveByOwners",
                            "owner": myDirective
                        }
                    }).then(function (result) {
                        console.log('Custom Result',result);
                        if (result.data.code > 0) {
                            $dazzleUser.setDazzleInfo('customDirectivesJson',result.data.data);
                            length = result.data.data.length;
                            if (!length)
                                resolve();
                            for (var i=0;i<length;i++){
                                js = url + result.data.data[i].name+"/element.js";
                                css = url + result.data.data[i].name+"/element.css";
                                console.log('Load Directive',css,js);
                                $ocLazyLoad.load([css, js], {cache: false}).then(function () {
                                    count++;
                                    if (count>=length)
                                        resolve();
                                }, function () {
                                    count++;
                                    if (count>=length)
                                        resolve();
                                });
                            }


                        } else {
                            resolve();
                        }
                    }, function () {
                        resolve();
                    });



                });
            }


            scope.loadCustomDirectives = function () {
                var url = "//dazzle-template.s3.amazonaws.com/builder6.0/";
                var js,css;
                console.log('Load Custom Directive',$dazzleUser.getUser().uid);
                return new Promise(function (resolve, reject) {

                    var count=0,length=0;

                    $http({
                        "method": "post",
                        "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/getdirective",
                        "data": {
                            "type": "getDirectiveByOwner",
                            "owner": $dazzleUser.getUser().uid
                        }
                    }).then(function (result) {
                        console.log('Custom Result',result);
                        if (result.data.code > 0) {
                            $dazzleUser.setDazzleInfo('customDirectivesJson',result.data.data);
                            length = result.data.data.length;
                            if (!length)
                                resolve();
                            for (var i=0;i<length;i++){
                                js = url + result.data.data[i].name+"/element.js";
                                css = url + result.data.data[i].name+"/element.css";
                                console.log('Load Directive',css,js);
                                $ocLazyLoad.load([css, js], {cache: false}).then(function () {
                                    count++;
                                    if (count>=length)
                                        resolve();
                                }, function () {
                                    count++;
                                    if (count>=length)
                                        resolve();
                                });
                            }


                        } else {
                            resolve();
                        }
                    }, function () {
                        resolve();
                    });



                });
            }

            scope.loadCoreDirectives = function () {
                console.log('Load Core Directive');
                return new Promise(function (resolve, reject) {
                    var directiveIdArray = [];
                    var directives = [];
                    $http({
                        "method": "post",
                        "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/getdirective",
                        "data": {
                            "type": "getNewCoreDirective"
                        }
                    }).then(function (result) {
                        if (result.data.code > 0 && result.data.data && angular.isArray(result.data.data)) {
                            directiveIdArray = result.data.data;
                            //if (!directiveIdArray.length)
                            //    resolve([]);
                            for (var i = 0; i < directiveIdArray.length; i++) {
                                load(directiveIdArray[i]);
                            }
                            resolve(directiveIdArray);
                        } else {
                            resolve([]);
                        }
                    });

                    function load(directive) {
                        js = url + directive.name+"/element.js";
                        css = url + directive.name+"/element.css";
                        console.log('Load Directive',css,js);
                        $ocLazyLoad.load([css, js], {cache: false}).then(function () {
                            console.log('Success Load',directive.name);
                            done(directive.name);
                        }, function () {
                            console.log('Fail Load',directive.name);
                            done(directive.name);
                        });
                    }

                    function done(id) {
                        directives.push(id);
                        if (directives.length == directiveIdArray.length) {
                            $dazzleUser.setDazzleInfo('coreDirectivesJson', directives);
                            resolve(directives);
                        }
                    }
                });
            }
            scope.logout = function () {
                //     store.clearAll();
                //     document.location.href = "http://dazzle.website/";
            }
            scope.setUserType = function () {
                if (scope.user) {
                    scope.isUser = true;
                    if (scope.user.type) {
                        if (scope.user.type === 'admin') {
                            scope.isAdmin = true;
                            scope.isDesigner = true;
                        } else if (scope.user.type === 'designer') {
                            scope.isDesigner = true;
                        }
                    } else {
                        scope.user.type = 'user';
                    }
                }
                $dazzleUser.setDazzleInfo('type',scope.user.type);
            }



            // scope.featherEditorInit = function () {
            //     scope.featherEditor = new Aviary.Feather({
            //         apiKey: 'cdafe997-4562-44ad-a074-6a79cd643067',
            //         theme: 'light',
            //         tools: 'all',
            //         language: "zh_HANT",
            //         appendTo: '',
            //         apiVersion: 3,
            //         onSave: function (imageID, newURL) {
            //             $http({
            //                 "method": "post",
            //                 "url": "https://122nqw3zfj.execute-api.ap-northeast-1.amazonaws.com/prod",
            //                 "data": {
            //                     "photoUrl": newURL,
            //                     "bucket": scope.exportBucket
            //                 }
            //             }).then(function (result) {
            //                 var jdate = JSON.parse(result.data);
            //                 if (jdate.code > 0) {
            //                     scope.featherEditor.scope.model.src = jdate.text;
            //                     scope.featherEditor.scope.updateHtml();
            //                 }
            //                 scope.featherEditor.close();
            //             });
            //         }
            //     });
            // }();

            scope.editorContainerInit = function (scope, element, attr) {
                var thisPageJson = $dazzleUser.getDazzleInfo('thisPageJson');
                var masterJson = $dazzleUser.getDazzleInfo('masterJson');
                var atom = $dazzleUser.getDazzleInfo('atom');
                return new Promise(function (resolve, reject) {
                    scope.id = element.attr('id') || "con" + new Date().getTime() + "-" + Object.keys(scope.atom).length;
                    element.attr('id', scope.id);
                    element.attr('concustom', scope.type);
                    if (thisPageJson.css.indexOf(scope.http + "builder6.0/" + scope.directiveId + "/" + "element.css") < 0) {
                        thisPageJson.css.push(scope.http + "builder6.0/" + scope.directiveId + "/" + "element.css");
                        $ocLazyLoad.load([scope.http + "builder6.0/" + scope.directiveId + "/" + "element.css"], {cache: false});
                    }
                    if (element.closest('[master]').length > 0) {
                        if (masterJson.css.indexOf(scope.http + "builder6.0/" + scope.directiveId + "/" + "element.css") < 0) {
                            masterJson.css.push(scope.http + "builder6.0/" + scope.directiveId + "/" + "element.css");
                        }
                    }
                    if (angular.isUndefined(atom[scope.id])) {
                        atom[scope.id] = {
                            "id": scope.id,
                            "type": scope.type,
                            "html": $.trim(element.html())
                        };
                        $dazzleUser.setDazzleInfo('atom',atom);
                    }
                });
            };

            scope.useTemplate = function (scp) {
                console.log('Compile Info','Use Template');
                return new Promise(function (rs, rj) {
                    if (scp.model.template) {
                        $ocLazyLoad.load([scp.model.template.css], {cache: false});
                        scp.templatePath = "builder6.0/template/" + scp.model.type + "/" + scp.model.template.id + ".html?id=" + new Date().getTime()
                        scp.templateUrl = scp.http + scp.templatePath;
                    }
                    scope.updateHtml(scp).then(function () {
                        rs();
                    });
                });
            }

            scope.updateHtml = function (scp) {
                return new Promise(function (rs, rj) {
                    $templateRequest(scp.templateUrl).then(function (html) {
                        var template = angular.element("<div></div>").html(html);
                        scope.unwrap(template);
                        scp.model.html = template.html();
                        scope.saveModel(scp.model);
                        rs();
                    });
                });
            }

            scope.editorCustomInit = function (scp, element, attr) {
                return new Promise(function (resolve, reject) {
                    scp.updateHtml = function () {
                        return new Promise(function (rs, rj) {
                            $templateRequest(scp.templateUrl).then(function (html) {
                                var template = angular.element("<div></div>").html(html);
                                scope.unwrap(template);
                                scp.model.html = template.html();
                                rs();
                            });
                        });
                    }
                    scp.useTemplate = function () {
                        return new Promise(function (rs, rj) {
                            if (scp.model.template) {
                                $ocLazyLoad.load([scp.model.template.css], {cache: false});
                                scp.templatePath = "builder6.0/template/" + scp.model.type + "/" + scp.model.template.id + ".html?id=" + new Date().getTime()
                                scp.templateUrl = scp.http + scp.templatePath;
                            }
                            scp.updateHtml().then(function () {
                                rs();
                            });
                        });
                    }
                    scp.updateRealHtml = function () {
                        return new Promise(function () {
                            $templateRequest(scp.http + "builder6.0/" + scp.directiveId + "/realHtml.html" + "?id" + new Date().getTime()).then(function (html) {
                                scp.model.realHtml = html;
                            });
                        })
                    }

                    var atom = $dazzleUser.getDazzleInfo('atom');

                    console.log('Load Custom Element',element);

                    scp.id = element.attr('id') || "ele" + new Date().getTime() + "-" + Object.keys(atom).length;
                    console.log('Atom',scp.id,atom);

                    element.attr('id', scp.id);
                    element.attr('custom', scp.type);

                    var thisPageJson = $dazzleUser.getDazzleInfo('thisPageJson');
                    var masterJson = $dazzleUser.getDazzleInfo('masterJson');
                    console.log(thisPageJson);
                    // if (!angular.Undefined(scp.thisPageJson.css))
                    //     if (thisPageJson.css.indexOf(scp.http + "builder6.0/" + scp.directiveId + "/" + "element.css") < 0) {
                    //         thisPageJson.css.push(scp.http + "builder6.0/" + scp.directiveId + "/" + "element.css");
                    //         $ocLazyLoad.load([scp.http + "builder6.0/" + scp.directiveId + "/" + "element.css"], {cache: false});
                    //     }
                    if (element[0].closest('[master]')) {
                        if (masterJson.css.indexOf(scp.http + "builder6.0/" + scp.directiveId + "/" + "element.css") < 0) {
                            masterJson.css.push(scp.http + "builder6.0/" + scp.directiveId + "/" + "element.css");
                        }
                    }

                    if (angular.isUndefined(atom[scp.id])) {
                        //this is new atom
                        atom[scp.id] = {
                            "id": scp.id,
                            "type": scp.type,
                            "html": "Hello World" + " - " + scp.id + "[" + scp.type + "]"
                        };
                        if ($.trim(element.html())) {
                            //this new atom have content
                            scope.unwrap(element);
                            atom[scp.id].html = element.html();
                            scp.model = atom[scp.id];
                            $dazzleUser.setDazzleInfo('atom',atom);
                            resolve();
                        } else {
                            //this atom no content, get template
                            scp.model = atom[scp.id];
                            $dazzleUser.setDazzleInfo('atom',atom);
                            scp.updateHtml().then(function () {
                                resolve();
                            });
                        }
                    } else {
                        //this is old atom
                        var oldAtom = angular.element("<div></div>").html(atom[scp.id].html);
                        scope.unwrap(oldAtom);
                        atom[scp.id].html = oldAtom.html();
                        scp.model = atom[scp.id];
                        $dazzleUser.setDazzleInfo('atom',atom);
                        if (!angular.isUndefined(scp.model.template) && scp.model.template) {
                            //this atom using template
                            if (scp.model.template.cssCode) {
                                $ocLazyLoad.load([scp.model.template.cssCode], {cache: false});
                            }
                            resolve();
                        } else {
                            resolve();
                        }
                    }
                });
            };




            scope.loadJssCsss = function (urls) {
                if (angular.isArray(urls)) {
                    for (var i = 0; i < urls.length; i++) {
                        $ocLazyLoad.load(urls[i] + '?id=' + new Date().getTime());
                    }
                } else {
                    $ocLazyLoad.load(urls + '?id=' + new Date().getTime());
                }
            }
            scope.loading = function () {
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


            scope.copyFile = function (CopySource, bucket, key) {
                return new Promise(function (resolve, reject) {
                    var s3 = new AWS.S3();
                    var params = {
                        Bucket: bucket,
                        Key: key,
                        CopySource: CopySource
                    }
                    s3.copyObject(params, function (err, data) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                });
            }
            scope.checkFile = function (bucket, key) {
                return new Promise(function (resolve, reject) {
                    var s3 = new AWS.S3();
                    var params = {
                        Bucket: bucket,
                        Key: key
                    };
                    s3.headObject(params, function (err, data) {
                        if (err) {
                            resolve(false)
                        } else {
                            resolve(true);
                        }
                    });
                });
            }


            scope.getFileUrl = function (bucket, key) {
                return new Promise(function (resolve, reject) {
                    var s3 = new AWS.S3();
                    s3.getSignedUrl('getObject', {
                        "Bucket": bucket,
                        "Key": key
                    }, function (err, url) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(url);
                        }
                    });
                })
            }

            scope.makeId = function () {
                return new Date().getTime();
            }

        }]);

    $provide.service('$dazzleS3', function () {
        this.saveMyImage = function (uid, file,subowner) {
            return new Promise(function (resolve, reject) {

                var s3 = new AWS.S3();

                var oldFilename = encodeURIComponent(file.name);
                var fileExtansion = oldFilename.split('.').pop();
                var newId = 'id' + new Date().getTime()
                var newFilename =  newId + '.jpg';
                var params = {
                    Bucket: "designerrrr",
                    Key: "images/" + uid + "/" + newFilename,
                    ContentType: file.type,
                    Body: file,
                    Metadata: {
                        "newVersion": "new",
                        "gid": newId,
                        "owner_id": uid,
                        "original_name": oldFilename,
                        "galleryType": "photo",
                        "subowner": subowner
                    }

                };
                console.log('Sub-owner',subowner);
                // if (subowner !='')
                //         params.Metadata['subowner'] = subowner;

                s3.putObject(params, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            "oldFilename": oldFilename,
                            "newFilename": newFilename,
                            "fileExtansion": fileExtansion,
                            "fileType": file.type
                        });
                    }
                });
            });
        }


        this.saveTemplate = function (template) {
            return new Promise(function (resolve, reject) {

                console.log('Template:',template);
                $http({
                    "method": "post",
                    "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/getdirective",
                    "data": {
                        "type": "updateTemplate",
                        "template": template
                    }
                }).then(function () {
                    resolve();
                },function(){
                    reject();
                });
            });
        };



        this.getJson = function (bucket, key) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    Bucket: bucket,
                    Key: key,
                    ResponseExpires: new Date()
                };
                s3.getObject(params, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        try {
                            resolve(JSON.parse(data.Body.toString()));
                        } catch (e) {
                            reject();
                        }
                    }
                });
            });
        }

        this.saveJson = function (bucket, key, json) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    Bucket: bucket,
                    Key: key,
                    ContentType: "application/json",
                    Body: JSON.stringify(json, null, 4)
                }
                s3.putObject(params, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            })
        }

        this.copyFolder = function(bucket,src, dest){
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    Bucket: bucket,
                    Prefix: src
                };
                s3.listObjects(params, function (err, data) {
                    if (err) return callback(err);

                    console.log('Data',data);
                    var count = 0;
                    data.Contents.forEach(function (content) {

                        var str = content.Key;
                        str = str.replace(src,dest);

                        that.getFile(bucket,content.Key).then(function(data2){
                            that.saveFile(bucket,str,data2).then(function(data3){
                                count++;
                                console.log(count);
                                console.log(data.Contents.length);
                                if (count == data.Contents.length)
                                    resolve(data3);
                            },function(){
                                reject();
                            });
                        },function(){
                            reject();
                        });

                    });


                });
            });
        }

        this.removeFolder = function(bucket,prefix){
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    Bucket: bucket,
                    Prefix: prefix
                };
                s3.listObjects(params, function (err, data) {
                    if (err) return callback(err);

                    if (data.Contents.length == 0) callback();

                    params = {Bucket: bucket};
                    params.Delete = {Objects: []};

                    data.Contents.forEach(function (content) {
                        params.Delete.Objects.push({Key: content.Key});
                    });

                    s3.deleteObjects(params, function (err, data) {
                        if (err) return callback(err);
                        if (data.Contents.length == 1000) emptyBucket(bucketName, callback);
                        else callback();
                    });
                });
            });
        }

        this.removeFile = function (bucket, key) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    Bucket: bucket,
                    Key: key
                };
                s3.deleteObject(params, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
        }

        this.getFile = function (bucket, key) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    Bucket: bucket,
                    Key: key,
                    ResponseExpires: new Date()
                };
                s3.getObject(params, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data.Body.toString());
                    }
                });
            });
        }

        this.saveFile = function (bucket, key, string) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    Bucket: bucket,
                    Key: key,
                    Body: string
                }

                var ext = key.substr(key.lastIndexOf('.') + 1);
                if (ext === 'css') {
                    params.ContentType = 'text/css';
                } else if (ext === 'less') {
                    params.ContentType = 'text/css';
                } else if (ext === 'js') {
                    params.ContentType = 'application/javascript';
                } else if (ext === 'json') {
                    params.ContentType = 'application/json';
                } else if (ext === 'jpg') {
                    params.ContentType = 'image/jpeg';
                } else if (ext === 'jpeg') {
                    params.ContentType = 'image/jpeg';
                } else if (ext === 'png') {
                    params.ContentType = 'image/png';
                } else if (ext === 'gif') {
                    params.ContentType = 'image/gif';
                } else if (ext === 'html') {
                    params.ContentType = 'text/html';
                }

                s3.putObject(params, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
        }

        this.saveMyImage = function (uid, file,subowner) {
            return new Promise(function (resolve, reject) {

                var s3 = new AWS.S3();

                var oldFilename = encodeURIComponent(file.name);
                var fileExtansion = oldFilename.split('.').pop();
                var newId = 'id' + new Date().getTime()
                var newFilename =  newId + '.jpg';
                var params = {
                    Bucket: "designerrrr",
                    Key: "images/" + uid + "/" + newFilename,
                    ContentType: file.type,
                    Body: file,
                    Metadata: {
                        "newVersion": "new",
                        "gid": newId,
                        "owner_id": uid,
                        "original_name": oldFilename,
                        "galleryType": "photo",
                        "subowner": subowner
                    }

                };
                console.log('Sub-owner',subowner);
                // if (subowner !='')
                //         params.Metadata['subowner'] = subowner;

                s3.putObject(params, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            "oldFilename": oldFilename,
                            "newFilename": newFilename,
                            "fileExtansion": fileExtansion,
                            "fileType": file.type
                        });
                    }
                });
            });
        }

        this.saveImage = function (uid, file) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var oldFilename = encodeURIComponent(file.name);
                var fileExtansion = oldFilename.split('.').pop();
                var newId = 'id' + new Date().getTime()
                var newFilename =  newId + '.jpg';
                var params = {
                    Bucket: "designerrrr",
                    Key: "images/" + uid + "/" + newFilename,
                    ContentType: file.type,
                    Body: file,
                    Metadata: {
                        "newVersion": "new",
                        "gid": newId,
                        "owner_id": uid,
                        "original_name": oldFilename,
                        "galleryType": "photo"
                    }
                };
                s3.putObject(params, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            "oldFilename": oldFilename,
                            "newFilename": newFilename,
                            "fileExtansion": fileExtansion,
                            "fileType": file.type
                        });
                    }
                });
            });
        }

        this.listObject = function (bucket, key) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    Bucket: bucket,
                    Prefix: key
                };
                s3.listObjects(params, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data.Contents);
                    }
                });
            });
        }

        this.copyFile = function (copySource, bucket, key) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    Bucket: bucket,
                    Key: key,
                    CopySource: encodeURIComponent(copySource)
                }
                s3.copyObject(params, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
        }

        this.checkFile = function (bucket, key) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    Bucket: bucket,
                    Key: key
                };
                s3.headObject(params, function (err, data) {
                    if (err) {
                        resolve(false)
                    } else {
                        resolve(true);
                    }
                });
            });
        }

        this.getFileUrl = function (bucket, key, expires) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    "Bucket": bucket,
                    "Key": key
                };
                if (expires) {
                    params.Expires = expires;
                }
                s3.getSignedUrl('getObject', params, function (err, url) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(url);
                    }
                });
            })
        }
    });
    $provide.service("$dazzlePopup", ['$mdDialog', '$mdBottomSheet', '$mdToast', '$ocLazyLoad', '$dazzleUser' , function ($mdDialog, $mdBottomSheet, $mdToast, $ocLazyLoad, $dazzleUser) {
        this.callPopup = function (params) {
            return new Promise(function (resolve, reject) {
                $dazzleUser.setDazzleInfo('params', params);
                var jss = [];
                if (!angular.isUndefined(params.name) && params.name){
                    var directiveUrl = "https://dazzle-template.s3.amazonaws.com/builder6.0/"+params.name+"/element.js" + "?id=" + new Date().getTime();
                    jss.push(directiveUrl);
                }

                var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/modelPopup/dzPopupModel.html" + "?id=" + new Date().getTime();
                var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/modelPopup/dzPopup.js" + "?id=" + new Date().getTime();
                jss.push(controllerUrl);

                $ocLazyLoad.load(jss, {cache: false}).then(function () {
                    $mdDialog.show({
                        templateUrl: templateUrl,
                        controller: modelPopupController,
                        clickOutsideToClose: true,
                        escapeToClose: true,
                        multiple: true
                    }).then(function (output) {
                        resolve(output);
                    }, function () {
                        reject();
                    });
                });
            });
        }

        this.toast = function (text) {
            $mdToast.show(
                $mdToast.simple()
                    .position('top right')
                    .textContent(text)
                    .hideDelay(1500)
            );
        }


    }]);

    $provide.service("$dazzleFn", ['$dazzleS3', '$dazzleElastic', '$dazzlePopup', '$dazzleUser', '$dazzleInit', '$mdDialog', '$compile', '$rootScope', '$dazzleData',
        function ($dazzleS3,$dazzleElastic,$dazzlePopup,$dazzleUser,$dazzleInit,$mdDialog,$compile,$rootScope,$dazzleData) {


        }]);



    $provide.service("$dazzleElastic", ['$window', '$http', '$compile','$mdDialog','$mdToast', '$mdBottomSheet', '$ocLazyLoad', '$mdDateLocale', '$dazzleS3', '$dazzlePopup', '$dazzleUser', '$dazzleInit','$rootScope', 'moment',
        function ($window, $http, $compile, $mdDialog, $mdToast, $mdBottomSheet, $ocLazyLoad, $mdDateLocale, $dazzleS3, $dazzlePopup, $dazzleUser, $dazzleInit, $rootScope,moment) {

            var scope = this;
            var that = this;
            scope.$http = $http;
            scope.$window = $window;
            scope.$compile = $compile;
            scope.$mdDialog = $mdDialog;
            scope.$mdToast = $mdToast;
            scope.$mdBottomSheet = $mdBottomSheet;
            scope.$ocLazyLoad = $ocLazyLoad;
            scope.$mdDateLocale = $mdDateLocale;
            scope.$dazzleS3 = $dazzleS3;
            scope.$dazzlePopup = $dazzlePopup;
            scope.$dazzleUser = $dazzleUser;
            scope.$dazzleInit = $dazzleInit;
            scope.moment = moment;
            scope.alasql = alasql;
            scope.table = $dazzleUser.dazzleInfo['thisTable'];
            scope.tableJson={};
            var website = $dazzleUser.getDazzleInfo('website');
            var dataKey='';

            scope.user = $dazzleUser.getUser();

            console.log(scope.user);

            var columnDefs = [];

            var rowData = [];


            scope.checkUserIndexExists= function(index,type) {

                return new Promise(function (resolve, reject) {
                    $http({
                        "method": "post",
                        "url": "https://d8u48dml7g5f6.cloudfront.net",
                        "data": {
                            "action": "checkIndex",
                            "index": index+"."+ type
                        }
                    }).then(function (result) {

                        console.log('dzUser',result);
                        if (result.data.resolve < 0) {
                            resolve(false);
                        } else {
                            resolve(true);
                        }
                    });

                });
            }

            scope.createUserIndex =function(index,type) {
                return new Promise(function (resolve, reject) {
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "createIndex",
                            "index":index+"."+user
                        }
                    }).then(function (result) {
                        console.log('dzUser',result);
                        if (result.data.resolve < 0) {
                            reject();
                        } else {
                            resolve();
                        }
                    });

                });

            }
            scope.initSettings = function(websiteId,tableName){
                return new Promise(function (resolve, reject) {
                    that.loadTable(websiteId,tableName).then(function (table) {
                        console.log('Load Table',table);
                        that.tableName = tableName;
                        that.tableJson = table;
                        $dazzleUser.dazzleInfo['tableJson']=table;
                        if (angular.isArray(that.tableJson.buttons)) {
                            for (var i = 0; i < that.tableJson.buttons.length; i++) {
                                that.loadButton(that.tableJson.buttons[i]);
                            }
                        }

                        that.loadSchema(websiteId,tableName).then(function (json) {
                            that.schemaJson = json;
                            $dazzleUser.dazzleInfo['schemaJson']=json;
                            console.log('Schema Json', that.schemaJson);
                            resolve();
                        });
                    });
                });
            }

            scope.initGrid = function(websiteId,tableName) {
                that.gridOptions = {
                    owSelection: 'multiple',
                    rowHeight: 45,
                    animateRows: true,
                    floatingFilter: true,
                    angularCompileRows: true,
                    angularCompileFilters: true,
                    angularCompileHeaders: true,
                    enableColResize: true,
                    enableFilter: true,
                    enableSorting: true,
                    rowSelection: 'multiple',
                    rowMultiSelectWithClick: true,
                    isExternalFilterPresent: function () {
                        return true;
                    },
                    doesExternalFilterPass: function (node) {
                        if (node.deleted) {
                            return false;
                        } else {
                            return true;
                        }
                    },
                    defaultColDef: {
                        headerCheckboxSelection: that.isFirstColumn,
                        checkboxSelection: that.isFirstColumn,
                        editable: true,
                        cellEditor: "text",
                        filter: 'text'
                    },
                    onSelectionChanged: function() {

                        var selectedRows = that.gridOptions.api.getSelectedRows();
                        $dazzleUser.dazzleInfo['selectedRows'] = selectedRows;
                        console.log(selectedRows);

                    },
                    columnDefs: columnDefs,
                    rowData: rowData,
                    onGridReady: function () {
                        that.loadTable(websiteId,tableName).then(function (table) {
                            console.log('Load Table',table);
                            that.tableName = tableName;
                            that.tableJson = table;
                            $dazzleUser.dazzleInfo['tableJson']= table;
                            if (angular.isArray(that.tableJson.buttons)) {
                                for (var i = 0; i < that.tableJson.buttons.length; i++) {
                                    that.loadButton(that.tableJson.buttons[i]);
                                }
                            }
                            that.loadSchema(websiteId,tableName).then(function (json) {
                                that.schemaJson = json;
                                console.log('Schema Json',that.schemaJson );
                                // that.loadNewCell(json).then(function(){

                                // })
                                that.loadCell(json).then(function () {
                                    that.gridOptions.api.setColumnDefs(json);
                                    that.gridOptions.api.refreshView();
                                    that.loadData().then(function (json) {
                                        that.gridOptions.api.setRowData(json);
                                        that.gridOptions.api.refreshView();
                                        console.log('Table:', that.tableJson);
                                        console.log('Schema:', that.schemaJson);
                                        console.log('Data:', json);
                                        that.refresh();
                                        $dazzleUser.dazzleInfo['myGrid']  = that.gridOptions;
                                    });
                                });
                            });
                        });
//							setTimeout(function () {
//								that.gridOptions.api.resetRowHeights();
//							}, 500);
                    },
                    onCellEditingStarted: function (event) {
                        event.$scope.oldValue = event.value;
                    },
                    onCellEditingStopped: function (event) {
                        if (!angular.isUndefined(event.colDef.key) && event.colDef.key) {
                            that.gridOptions.api.forEachNode(function (rowNode, index) {
                                if (rowNode.data[event.colDef.field] == event.value && rowNode.rowIndex !== event.rowIndex) {
                                    event.$scope.rowNode.setDataValue(event.colDef.field, event.$scope.oldValue);
                                    $dazzlePopup.toast('ERROR: Key already exists');
                                    return;
                                }
                            });
                        }
                        if (!angular.isUndefined(event.colDef.required) && event.colDef.required) {
                            if (!event.value) {
                                event.$scope.rowNode.setDataValue(event.colDef.field, event.$scope.oldValue);
                                $dazzlePopup.toast('ERROR: This is required');
                            }
                        }
                    },
                    onCellFocused: function (event) {
                        if (event.rowIndex !== null) {
                            that.gridOptions.api.getModel().rowsToDisplay[event.rowIndex].edited = true;
                        }
                    }
                };
            }




            scope.getWebsiteJson = function () {
                $dazzleS3.getJson("dazzle-user-" + $dazzleUser.getUser().uid, "website/" + $dazzleUser.dazzleInfo['websiteId'] + '/json/website.json').then(function (json) {
                    scope.websiteJson = json;
                });
            }

            scope.dbManage = function (table) {
                //    $dazzlePopup.dataManagement(website.websiteId, table);
                document.location.href = "index.html#!/myDbManage/"+$dazzleUser.dazzleInfo['websiteId']+"/"+table;
            }

            scope.listElastic = function (table) {
                //    $dazzlePopup.dataManagement(website.websiteId, table);
                document.location.href = "index.html#!/listElastic/"+table;
            }

            scope.home = function (table) {
                //    $dazzlePopup.dataManagement(website.websiteId, table);
                document.location.href = "index.html#!/myWebsite";
            }



            scope.loadButton = function (b) {
                var myScope;
                myScope = $dazzleUser.dazzleInfo['myScope'];
//                myScope = $dazzleUser.getRootScope();
                console.log('BUtton',b);
                $ocLazyLoad.load({files: b.js, cache: false}).then(function () {
                    console.log('Button HTML',b.html);
                    var button = angular.element(b.html);
                    angular.element('#customButtons').append(button);
                    $compile(button)(myScope);
                });
            }

            scope.editSchema = function () {

                var params = {
                    name: 'dzEditSchemaPopup',
                    directive:'<dz-edit-Schema-popup></dz-edit-Schema-popup>',
                    websiteId: $dazzleUser.dazzleInfo['websiteId'],
                    table: $dazzleUser.dazzleInfo['table'],
                    schema:[],
                    big:true
                };

                $dazzlePopup.callPopup(params).then(function(newSchema){
                    console.log(newSchema);
                });

            }

            scope.addTable = function() {
                var params = {
                    name: "createTablePopup",
                    directive:"<create-table-popup></create-table-popup>",
                    big:true
                };

                $dazzlePopup.callPopup(params).then(function(output) {

                });


            }

            scope.removeTable = function () {
                var confirm = $mdDialog.confirm().title('刪除資料表').textContent('你真的要刪除此資料表嗎? (注意: 所有資料將會被刪除)').ariaLabel('Lucky day').ok('刪除').cancel('取消');
                $mdDialog.show(confirm).then(function () {
                    $dazzleS3.removeFile($dazzleUser.dazzleInfo['userBucket'],$dazzleUser.dazzleInfo['websiteKey']+'content/'+$dazzleUser.dazzleInfo['thisTable']+'-table.json').then(function(){
                        $dazzleS3.removeFile($dazzleUser.dazzleInfo['userBucket'],$dazzleUser.dazzleInfo['websiteKey']+'content/'+$dazzleUser.dazzleInfo['thisTable']+'-schema.json').then(function(){
                            $dazzleS3.removeFile($dazzleUser.dazzleInfo['userBucket'],$dazzleUser.dazzleInfo['websiteKey']+'content/'+$dazzleUser.dazzleInfo['thisTable']+'-data.json').then(function(){
                                alert('已刪除資料表');
                                document.location.href = "index.html#!/myWebsite";
                            });
                        });
                    });
                });
            }

            scope.loadTable = function (websiteId,tableName) {
                var table,tableJson,char;
                return new Promise(function (resolve, reject) {

                    if (websiteId =="_master") {

                        var defaulttable = {
                            "data": {
                                "type": "dynamodb",
                                "table":tableName,
                                "index":$dazzleUser.getUser().uid,
                                "key":"id"
                            },
                            "buttons": []
                        }
                        resolve(defaulttable);
                    } else {

                        $http({
                            "method": "post",
                            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                            "data": {
                                "action": "getData",
                                "index": $dazzleUser.getUser().uid,
                                "type": "_table",
                                "id":tableName
                            }
                        }).then(function (result) {
                            console.log(result);
                            if (result.data.code < 0) {
                                $dazzlePopup.toast(result.data.text + ":" + result.data.reject.msg);
                                resolve([]);
                            } else {
                                tableJson = {
                                    "data": {
                                        "type": "dynamodb",
                                        "index":$dazzleUser.getUser().uid,
                                        "table":tableName,
                                        "key":result.data.resolve['key']
                                    },
                                    "buttons": []
                                }


                                console.log('Load Button',result);
                                angular.forEach(result.data.resolve['button'],function(item,index){
                                    scope.newLoadButton(item);



                                });

                                resolve(tableJson);
                            }
                        });
                    }
                });
            }

            scope.newLoadButton = function(item) {

                var str='';
                var js;
                // var myScope = $dazzleUser.dazzleInfo['myScope'];
                var myScope = $rootScope.$new();
                for(i=0;i<item.length;i++) {
                    char = item[i];
                    if (char==char.toUpperCase()) {
                        str = str+"-"+char.toLowerCase();
                        console.log(i);
                    } else
                        str = str+char;
                }
                console.log('Button',str);

                js = "https://dazzle-template.s3.amazonaws.com/builder6.0/"+item+"/element.js";

                $ocLazyLoad.load([js], {cache: false}).then(function () {
                    console.log('Button JS',js);
                    var button = angular.element("<"+str+"></"+str+">");
                    angular.element('#customButtons').append(button);
                    $compile(button)(myScope);
                });
            }

            scope.initTable = function () {
                return new Promise(function (resolve, reject) {
                    $dazzlePopup.toast('正在初始化s3 Table:' + tableName);
                    var table = {
                        "data": {
                            "type": "s3"
                        },
                        "buttons": []
                    }
                    $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" +$dazzleUser.dazzleInfo['websiteId'] + "/content/" + tableName + "-table.json", table);
                    resolve(table);
                });
            }

            scope.checkDynamoTable = function (table) {
                return new Promise(function (resolve, reject) {
                    $http({
                        "method": "post",
                        "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/check",
                        "data": {
                            "action": "checkDynamoTable",
                            "table": table
                        }
                    }).then(function (result) {
                        if (result.data.code == 14) {
                            resolve(result.data.data);
                        } else {
                            reject(result.data.text);
                        }
                    })
                });
            }


            scope.loadSchema = function (websiteId,tableName) {
                var item;
                var json,schema=[],schemaTemplate=[];

                return new Promise(function (resolve, reject) {

                    if (websiteId=="_master") {
                        var filename;
                        switch (tableName) {
                            case '_table': filename = '_table-schema.tpl.json'; break;
                            case '_schema': filename = '_schema-schema.tpl.json'; break;
                            case '_page': filename = '_page-schema.tpl.json'; break;
                            case '_atom': filename = '_atom-schema.tpl.json'; break;
                        }

                        $dazzleS3.getJson('dazzle-template','file6.0/'+filename).then(function (json) {
                            console.log('My Schema',json);
                            resolve(json);
                        }, function () {
                            resolve([]);
                        });
                    }else {

                        $http({
                            "method": "post",
                            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                            "data": {
                                "action": "searchData",
                                "index": $dazzleUser.getUser().uid,
                                "type": "_schema",
                                "body":{
                                    "query":{
                                        "bool":{
                                            must:[
                                                {"match":{"websiteId":websiteId}},
                                                {"match":{"tableId":tableName}}
                                            ]
                                        }
                                    },
                                    "sort":[
                                        {
                                            "order": {"order" : "asc"}
                                        }
                                    ]
                                }
                            }
                        }).then(function (result) {
                            console.log('Schema',result);
                            if (result.data.code < 0) {
                                $dazzlePopup.toast(result.data.text + ":" + result.data.reject.msg);
                                resolve([]);
                            } else {
                                json = result.data.resolve;
                                schema=[];
                                angular.forEach(json,function(item,index){
                                    var key,cell;
                                    if (item['order']=="0")
                                        key = true;
                                    else
                                        key = false;

                                    cell = {
                                        "editable": true,
                                        "cellEditor": item['directive']+"Editor",
                                        "cellRenderer": item['directive']+"Renderer",
                                        "filter": item['directive']+"Filter",
                                        "directive": item['directive'],
                                        "directiveName": item['directive'],
                                        "headerName": item['fieldName'],
                                        "field": item['fieldName'],
                                        "key": key,
                                        "default": "",
                                        "defaultByTimestamp": false,
                                        "width": 200
                                    };
                                    schema.push(cell);

                                });
                                resolve(schema);
                            }
                        });
                    }
                });
            };


            scope.loadData = function () {
                return new Promise(function (resolve, reject) {
                    console.log('Load DynamoDB Data');
                    console.log('Load Data',$dazzleUser.getUser().uid,that.tableName,that.tableJson);
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "searchData",
                            "index": $dazzleUser.getUser().uid,
                            "type": that.tableName,
                            "body": {"query": {"match_all": {}}}
                        }
                    }).then(function (result) {
                        console.log(result);
                        if (result.data.code < 0) {
                            $dazzlePopup.toast(result.data.text + ":" + result.data.reject.msg);
                            resolve([]);
                        } else {
                            that.dataLength = result.data.resolve.length;
                            resolve(result.data.resolve);
                        }
                    });

                });
            };

            scope.loadNewCell = function(schema){
                return new Promise(function(resolve,reject){

                });
            }
            scope.loadCell = function (schema) {
                return new Promise(function (resolve, reject) {
                    for (var i = 0; i < schema.length; i++) {
                        if (schema[i].key)
                            dataKey = schema[i].field;

                        if (!angular.isUndefined(schema[i].jsId)) {
                            scope.setCellJs(schema[i]);
                        }
                        if (!angular.isUndefined(schema[i].cellEditor)) {
                            scope.setCellEditor(schema[i]);
                        }
                        if (!angular.isUndefined(schema[i].cellRenderer)) {
                            scope.setCellRenderer(schema[i]);
                        }
                        if (!angular.isUndefined(schema[i].cellFilter)) {
                            scope.setCellFilter(schema[i]);
                        }
                        if (!angular.isUndefined(schema[i].cellFilterer)) {
                            scope.setCellFilterer(schema[i]);
                        }
                    }
                    setTimeout(function () {
                        resolve();
                    }, 1000);
                });
            }

            scope.setCellJs = function (schema) {
                $ocLazyLoad.load("https://d25k6mzsu7mq5l.cloudfront.net/backend6.0/" + schema.directive + "/js/" + schema.jsId + '.js', {cache: false});
            }

            scope.setCellFilterer = function (schema) {
                $ocLazyLoad.load("https://d25k6mzsu7mq5l.cloudfront.net/backend6.0/" + schema.directive + "/" + schema.cellFilterer + ".js", {cache: false}).then(function () {
                    schema.filter = window[schema.cellFilterer];
                });
            }

            scope.setCellFilter = function (schema) {
                $ocLazyLoad.load("https://d25k6mzsu7mq5l.cloudfront.net/backend6.0/" + schema.directive + "/" + schema.cellFilter + ".js", {cache: false}).then(function () {
                    schema.filterParams = window[schema.cellFilter];
                });
            }

            scope.setCellEditor = function (schema) {
                $ocLazyLoad.load("https://d25k6mzsu7mq5l.cloudfront.net/backend6.0/" + schema.directive + "/" + schema.cellEditor + ".js", {cache: false}).then(function () {
                    that.gridOptions.api.cellEditorFactory.addCellEditor(schema.cellEditor, window[schema.cellEditor]);
                });
            }

            scope.setCellRenderer = function (schema) {
                $ocLazyLoad.load("https://d25k6mzsu7mq5l.cloudfront.net/backend6.0/" + schema.directive + "/" + schema.cellRenderer + ".js", {cache: false}).then(function () {
                    that.gridOptions.api.cellRendererFactory.addCellRenderer(schema.cellRenderer, window[schema.cellRenderer]);
                });
            }


            scope.referAdd = function (object) {
                console.log('Open Data Select');
                $dazzlePopup.dataSelect(scope.website, scope.table).then(function (data) {

                });

            }

            scope.addFilter = function (filter) {
                this.filter = filter;
                this.gridOptions.api.onFilterChanged();
            }

            scope.add = function (object) {
                if (scope.modelType == "refer") {
                    $dazzlePopup.dataSelect(scope.website, scope.table);
                } else {
                    var date = new Date().getTime().toString();
                    var newObject = {};
                    if (object) {
                        newObject = object;
                    }
                    if (scope.tableJson.data.type === 'dynamodb') {
                        newObject[scope.tableJson.data.key] = date;
                    }
                    for (var i = 0; i < scope.schemaJson.length; i++) {
                        if (scope.schemaJson[i].defaultByTimestamp) {
                            newObject[scope.schemaJson[i].field] = scope.schemaJson[i].default + date;
                        } else if (scope.schemaJson[i].default) {
                            newObject[scope.schemaJson[i].field] = scope.schemaJson[i].default;
                        }
                    }
                    scope.gridOptions.api.updateRowData({add: [newObject], addIndex: 0});
                    scope.dataLength++;
                    scope.gridOptions.api.refreshInMemoryRowModel();
                    scope.gridOptions.api.getModel().rowsToDisplay[0].edited = true;
                }
            }

            scope.addRecord = function (object) {
                var date = new Date().getTime().toString();

                var newObject = {};
                if (object) {
                    newObject = object;
                }

                for (var i = 0; i < that.schemaJson.length; i++) {
                    if (that.schemaJson[i].defaultByTimestamp) {
                        newObject[that.schemaJson[i].field] = date;
                    }
                    // else if ($scope.schemaJson[i].default) {
                    //     newObject[$scope.schemaJson[i].field] = $scope.schemaJson[i].default;
                    // }

                }
                that.gridOptions.api.updateRowData({add: [newObject], addIndex: 0});
                that.dataLength++;
                that.gridOptions.api.refreshInMemoryRowModel();
                that.gridOptions.api.getModel().rowsToDisplay[0].edited = true;
            }

            scope.remove = function () {
                var nodes = scope.gridOptions.api.getSelectedNodes();
                for (var i = 0; i < nodes.length; i++) {
                    nodes[i].deleted = true;
                }
                scope.gridOptions.api.onFilterChanged();
            }

            scope.refresh = function () {
                //                $scope.loadSchema().then(function (json) {
                //                   $scope.schemaJson = json;
                console.log('Start refresh',scope.schemaJson);
                scope.loadCell(scope.schemaJson).then(function () {
                    console.log('Load Cell',scope.schemaJson);
                    scope.gridOptions.api.setColumnDefs(scope.schemaJson);
                    scope.loadData().then(function (json) {
                        scope.gridOptions.api.setRowData(json);
                        scope.gridOptions.api.refreshView();
                        console.log('Finish Refresh');
                    });
                });

                //               });
            }

            scope.isFirstColumn = function (params) {
                var displayedColumns = params.columnApi.getAllDisplayedColumns();
                var scopeIsFirstColumn = displayedColumns[0] === params.column;
                return scopeIsFirstColumn;
            }

            scope.cancel = function () {
                $mdDialog.hide(scope.lastUpdated);
            }

            scope.save = function () {
                return new Promise(function (resolve, reject) {
                    scope.saveSchema();
                    scope.getData().then(function (result) {
                        scope.saveData(result).then(function () {
                            $dazzlePopup.toast('儲存成功');
                            resolve(result);
                        });
                    });
                });
            }

            scope.saveSchema = function () {
                var newShcema = [];
                var oldSchema = scope.gridOptions.columnApi.getAllGridColumns();
                for (var i = 0; i < oldSchema.length; i++) {
                    oldSchema[i].colDef.width = oldSchema[i].actualWidth;
                    for (var obj in oldSchema[i].colDef) {
                        if (obj !== 'headerCheckboxSelection' && obj !== 'checkboxSelection' && Object.prototype.toString.call(oldSchema[i].colDef[obj]) == '[object Function]') {
                            delete oldSchema[i].colDef[obj];
                        }
                    }
                    newShcema.push(oldSchema[i].colDef);
                }
                $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + website + "/content/" + scope.table + "-schema.json", JSON.parse(angular.toJson(newShcema)));
                scope.schemaJson = newShcema;
            }

            scope.saveData = function (data) {
                return new Promise(function (resolve, reject) {
                    console.log("Data:",data);
                    console.log("TableJson:",scope.tableJson);
                    if (scope.tableJson.data.type === 's3') {
                        //console.log('save to s3');
                        scope.gridOptions.api.removeItems(data.deleted);
                        $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $dazzleUser.dazzleInfo['websiteId'] + "/content/" + $scope.table + "-data.json", JSON.parse(angular.toJson(data.rows))).then(function () {
                            resolve();
                        });
                    } else if (scope.tableJson.data.type === 'dynamodb') {
                        var params = [];
                        for (var i = 0; i < data.deleted.length; i++) {
                            var dataObject = JSON.parse(angular.toJson(data.deleted[i].data));
                            params.push({
                                "delete": {
                                    _index: scope.tableJson.data.index+'.'+scope.tableJson.data.table.toLowerCase() || 'dazzle',
                                    _type: '_doc',
                                    _id: dataObject[scope.tableJson.data.key]
                                }
                            });
                        }
                        console.log("Params:",params);
                        if (!data.edited.length){
                            scope.bulkUpdateData(params).then(function(){
                                resolve();
                            },function(err){
                                reject();
                            });
                        }
                        var count = 0;
                        for (var i = 0; i < data.edited.length; i++) {

                            console.log(scope.tableJson);


                            var dataObject = JSON.parse(angular.toJson(data.edited[i].data));
                            scope.clean(dataObject);

                            scope.checkExist(scope.tableJson.data,dataObject).then(function(result){
                                params.push({
                                    "update": {
                                        _index: scope.tableJson.data.index+'.'+scope.tableJson.data.table.toLowerCase() || 'dazzle',
                                        _type: '_doc',
                                        _id: result[scope.tableJson.data.key]
                                    }
                                });
                                params.push({
                                    "doc": result
                                });
                                count++;
                                if(count == data.edited.length){
                                    scope.bulkUpdateData(params).then(function(){
                                        resolve();
                                    },function(err){
                                        reject();
                                    });
                                }
                            },function(err){
                                params.push({
                                    "create": {
                                        _index: scope.tableJson.data.index+'.'+scope.tableJson.data.table.toLowerCase() || 'dazzle',
                                        _type: '_doc',
                                        _id: err[scope.tableJson.data.key]
                                    }
                                });
                                params.push(err);
                                count++;
                                if(count == data.edited.length){
                                    scope.bulkUpdateData(params).then(function(){
                                        resolve();
                                    },function(err){
                                        reject();
                                    });
                                }
                            });
                        }

                    }
                })
            }

            scope.loadElasticRecordById = function(index,table,id) {
                return new Promise(function (resolve, reject) {
                    console.log('Load Elastic Data',id,table,index);
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "getData",
                            "index": index,
                            "type": table,
                            "id":id
                        }
                    }).then(function (result) {
                        console.log('Load Elastic Record',result);
                        if (result.data.code < 0) {
                            //$dazzlePopup.toast(result.data.text + ":" + result.data.reject.msg);
                            reject();
                        } else {
                            resolve(result.data.resolve);
                        }
                    });
                });
            }

            scope.checkExist = function (tableJson,data) {
                return new Promise(function (resolve, reject) {
                    that.loadElasticRecordById(tableJson.index,tableJson.table,data[tableJson.key]).then(function(record){
                        resolve(data);
                    },function(err){
                        reject(data);
                    });
                });
            }

            scope.bulkUpdateData = function (params) {
                console.log('Params',params);
                return new Promise(function (resolve, reject) {
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "bulkData",
                            "body": params
                        }
                    }).then(function (result) {
                        console.log(result);
                        scope.created = [];
                        if (result.data.code > 0) {
                            resolve();
                        } else {
                            console.log('Error',result.data.text + ":" + result.data.err.code);
                            $dazzlePopup.toast(result.data.text + ":" + result.data.err.code);
                            reject();
                        }
                    });
                });
            }

            scope.getData = function () {
                return new Promise(function (resolve, reject) {
                    var nodes = [];
                    var rows = [];
                    var edited = [];
                    var deleted = [];
                    scope.gridOptions.api.forEachNode(function (node) {
                        nodes.push(node);
                        if (node.deleted == true) {
                            deleted.push(node);
                        } else {
                            if (node.edited == true) {
                                edited.push(node);
                            }
                            rows.push(node.data);
                        }
                    });

                    resolve({
                        "nodes": nodes,
                        "rows": rows,
                        "edited": edited,
                        "deleted": deleted
                    });
                })
            }




            scope.import = function () {
                if (!scope.fileChooser) {
                    scope.fileChooser = document.createElement('input');
                    scope.fileChooser.setAttribute("type", "file");
                    scope.fileChooser.style.display = "none";
                    scope.fileChooser.addEventListener('change', function (event) {
                        var file = scope.files[0];
                        alasql('SELECT * FROM FILE(?,{headers:true})', [event], function (data) {
                            scope.gridOptions.api.setRowData(data);
                            scope.gridOptions.api.refreshView();
                            scope.gridOptions.api.forEachNode(function (node) {
                                node.edited = true;
                            });
                        });
                    });
                }
                scope.fileChooser.click();
            }


            scope.export = function () {
                // var rowData = [];
                // that.gridOptions.api.forEachNode(function (node) {
                //     rowData.push(node.data);
                // });
                // that.alasql('SELECT * INTO XLSX("' + scope.table + '.xlsx",{headers:true}) FROM ?', [rowData]);



                var params = {
                    skipHeader: false,
                    columnGroups: false,
                    skipFooters: true,
                    skipGroups: true,
                    skipPinnedTop: true,
                    skipPinnedBottom:true,
                    allColumns: true,
                    onlySelected: false,
                    fileName: 'export.xls',
                    sheetName: 'export'
                };


                that.gridOptions.api.exportDataAsExcel(params);

            }

            scope.isObject = function (item) {
                return (typeof item === "object" && !Array.isArray(item) && item !== null);
            }

            scope.clean = function (obj) {
                for (var propName in obj) {
                    if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
                        delete obj[propName];
                    }
                }
            }


        }]);
    $provide.service("$dazzleData",['$window', '$http', '$compile','$mdDialog','$mdToast', '$mdBottomSheet', '$ocLazyLoad', '$mdDateLocale', '$dazzleS3', '$dazzlePopup', '$dazzleUser', '$dazzleInit','$rootScope', 'moment',
        function ($window, $http, $compile, $mdDialog, $mdToast, $mdBottomSheet, $ocLazyLoad, $mdDateLocale, $dazzleS3, $dazzlePopup, $dazzleUser, $dazzleInit, $rootScope,moment) {





        }]);

    $provide.factory('dzS3',function(){
       var dzS3 ={};
        dzS3.copyFolder = function(bucket,src, dest){
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    Bucket: bucket,
                    Prefix: src
                };
                s3.listObjects(params, function (err, data) {
                    if (err) return callback(err);

                    console.log('Data',data);
                    var count = 0;
                    data.Contents.forEach(function (content) {

                        var str = content.Key;
                        str = str.replace(src,dest);

                        dzS3.getFile(bucket,content.Key).then(function(data2){
                            dzS3.saveFile(bucket,str,data2).then(function(data3){
                                count++;
                                console.log(count);
                                console.log(data.Contents.length);
                                if (count == data.Contents.length)
                                    resolve(data3);
                            },function(){
                                reject();
                            });
                        },function(){
                            reject();
                        });

                    });


                });
            });
        }
        dzS3.removeFolder = function(bucket,prefix){
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    Bucket: bucket,
                    Prefix: prefix
                };
                s3.listObjects(params, function (err, data) {
                    if (err)
                        reject(err);

                    if (data.Contents.length == 0)
                        reject();

                    params = {Bucket: bucket};
                    params.Delete = {Objects: []};

                    data.Contents.forEach(function (content) {
                        params.Delete.Objects.push({Key: content.Key});
                    });

                    s3.deleteObjects(params, function (err, data) {
                        if (err)
                            reject(err);
                        else
                            resolve();
                    });
                });
            });
        }

        dzS3.removeFile = function (bucket, key) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    Bucket: bucket,
                    Key: key
                };
                s3.deleteObject(params, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
        }
        dzS3.getFile = function (bucket, key) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    Bucket: bucket,
                    Key: key,
                    ResponseExpires: new Date()
                };
                s3.getObject(params, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data.Body.toString());
                    }
                });
            });
        }

        dzS3.saveFile = function (bucket, key, string) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    Bucket: bucket,
                    Key: key,
                    Body: string
                }

                var ext = key.substr(key.lastIndexOf('.') + 1);
                if (ext === 'css') {
                    params.ContentType = 'text/css';
                } else if (ext === 'less') {
                    params.ContentType = 'text/css';
                } else if (ext === 'js') {
                    params.ContentType = 'application/javascript';
                } else if (ext === 'json') {
                    params.ContentType = 'application/json';
                } else if (ext === 'jpg') {
                    params.ContentType = 'image/jpeg';
                } else if (ext === 'jpeg') {
                    params.ContentType = 'image/jpeg';
                } else if (ext === 'png') {
                    params.ContentType = 'image/png';
                } else if (ext === 'gif') {
                    params.ContentType = 'image/gif';
                } else if (ext === 'html') {
                    params.ContentType = 'text/html';
                }

                s3.putObject(params, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
        }
        dzS3.saveMyImage = function (uid, file,subowner) {
            return new Promise(function (resolve, reject) {

                var s3 = new AWS.S3();

                var oldFilename = encodeURIComponent(file.name);
                var fileExtansion = oldFilename.split('.').pop();
                var newId = 'id' + new Date().getTime()
                var newFilename =  newId + '.jpg';
                var params = {
                    Bucket: "designerrrr",
                    Key: "images/" + uid + "/" + newFilename,
                    ContentType: file.type,
                    Body: file,
                    Metadata: {
                        "newVersion": "new",
                        "gid": newId,
                        "owner_id": uid,
                        "original_name": oldFilename,
                        "galleryType": "photo",
                        "subowner": subowner
                    }

                };
                console.log('Sub-owner',subowner);
                // if (subowner !='')
                //         params.Metadata['subowner'] = subowner;

                s3.putObject(params, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            "oldFilename": oldFilename,
                            "newFilename": newFilename,
                            "fileExtansion": fileExtansion,
                            "fileType": file.type
                        });
                    }
                });
            });
        }

        dzS3.saveImage = function (uid, file) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var oldFilename = encodeURIComponent(file.name);
                var fileExtansion = oldFilename.split('.').pop();
                var newId = 'id' + new Date().getTime()
                var newFilename =  newId + '.jpg';
                var params = {
                    Bucket: "designerrrr",
                    Key: "images/" + uid + "/" + newFilename,
                    ContentType: file.type,
                    Body: file,
                    Metadata: {
                        "newVersion": "new",
                        "gid": newId,
                        "owner_id": uid,
                        "original_name": oldFilename,
                        "galleryType": "photo"
                    }
                };
                s3.putObject(params, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            "oldFilename": oldFilename,
                            "newFilename": newFilename,
                            "fileExtansion": fileExtansion,
                            "fileType": file.type
                        });
                    }
                });
            });
        }

        dzS3.listObject = function (bucket, key) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    Bucket: bucket,
                    Prefix: key
                };
                s3.listObjects(params, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data.Contents);
                    }
                });
            });
        }

        dzS3.copyFile = function (copySource, bucket, key) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    Bucket: bucket,
                    Key: key,
                    CopySource: encodeURIComponent(copySource)
                }
                s3.copyObject(params, function (err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
        }

        dzS3.checkFile = function (bucket, key) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    Bucket: bucket,
                    Key: key
                };
                s3.headObject(params, function (err, data) {
                    if (err) {
                        resolve(false)
                    } else {
                        resolve(true);
                    }
                });
            });
        }

        this.getFileUrl = function (bucket, key, expires) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    "Bucket": bucket,
                    "Key": key
                };
                if (expires) {
                    params.Expires = expires;
                }
                s3.getSignedUrl('getObject', params, function (err, url) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(url);
                    }
                });
            })
        }
       return dzS3;
    });
    $provide.factory('panelInfo',function($dazzleUser,$dazzleElastic,pageInfo){
       var panelInfo = {};

       panelInfo.panelType = {
         'image':{
            'active':false
         },
         'text':{
             'active':false
         },
         'html':{
             'active':false
         },
         'link':{
            'active':false
         },
         'data':{
             'active':false,
             'data':[]
         }
       };

       panelInfo.html = "";
       panelInfo.template = "";
       return panelInfo;
    });
    $provide.factory('dzPopup', function($dazzleUser,$dazzlePopup){
        var dzPopup = {};

        dzPopup.gallery = function(){
          return new Promise(function(resolve,reject) {
              var params = {
                  name: "dzUserGalleryPopup",
                  directive: "<dz-user-gallery-popup></dz-user-gallery-popup>"
              };

              $dazzlePopup.callPopup(params).then(function (output) {
                    resolve(output);
              });
          });
        }

        dzPopup.menu = function(params={}){


        }


        return dzPopup;

    });


	$provide.factory('websiteInfo', function($dazzleUser){
		var websiteInfo = {};

		websiteInfo.table = [];
		websiteInfo.schema = [];
		websiteInfo.expiryDate = null;
		websiteInfo.masterJs =['js/master.js'];
		websiteInfo.masterCss = ['css/master.css'];
		websiteInfo.master = {};
		return websiteInfo;

	});
	$provide.factory('atomInfo',function($dazzleS3,$dazzleElastic,userInfo) {
		var atomInfo ={};


			atomInfo.init = function() {
					$dazzleS3.getJson(userInfo.userBucket,location.hostname+'/json/master.json').then(function(json){
						atomInfo.master = json;
					});
					$dazzleS3.getJson(userInfo.userBucket,userInfo.websiteKey+'atom.json').then(function(atom){
						atomInfo.atom = atom;
					});
					console.log('Atom Init');
			}
			atomInfo.getMaster = function(id){
				return atomInfo.master[id];
			}

			atomInfo.getAtom = function(id){
				return atomInfo.atom[id];
			}


		return atomInfo;
	});

	$provide.factory('pageInfo',function($dazzleUser,$dazzlePopup,$dazzleS3,userInfo,dataInfo,atomInfo,dbFactory) {
		var pageInfo = {};
		pageInfo.model ={};
		pageInfo.model.title = '標題';
		pageInfo.model.meta = '';
		pageInfo.model.pageJs = [];
		pageInfo.model.pageCss = [];
		pageInfo.model.masterJs = [];
		pageInfo.model.masterCss = [];
		pageInfo.model.head = '';
		pageInfo.model.body = '';
		pageInfo.model.fullHtml = '';
		pageInfo.model.directives = [];
		pageInfo.model.masterBlock = {};
		pageInfo.model.dataBlock ={};
		pageInfo.model.dataInfo ={};
        pageInfo.thisPage = decodeURIComponent(location.pathname).substring(location.pathname.lastIndexOf('/') + 1) || 'index.html';

        pageInfo.loadData = function(id){
            return new Promise(function(resolve,reject){
                dbFactory.loadData(pageInfo.model.dataInfo[id]).then(function(data){
                    resolve(data);
                },function(){
                    resolve([]);
                });

            });
        }
		pageInfo.saveDataInfoById = function(id,json) {
		    pageInfo.model.dataInfo[id] = json;
        }

        pageInfo.saveDataInfo = function(){
		    return new Promise(function(resolve,reject){
                $dazzleS3.saveJson(userInfo.userBucket,userInfo.websiteKey+'/json/data-info.json',dataInfo.model.dataInfo).then(function(){
                    $dazzlePopup.toast('Success Save Data Info');
                    resolve();
                },function(err){
                    reject();
                });

            });
        }

		pageInfo.loadDataInfo = function() {
			return new Promise(function(resolve,reject){
				$dazzleS3.getJson(userInfo.userBucket,userInfo.websiteKey+'/json/data-info.json').then(function(json){
                    pageInfo.model.dataInfo = json;
                    console.log('Success Load Data Info');
                    resolve();
				},function(err){
					pageInfo.model.dataInfo ={};
				    reject();
				});
			});
		}

        pageInfo.getMaster = function(id) {
		    return pageInfo.model.masterBlock[id];
        }

        pageInfo.loadMaster = function() {
            var htm = pageInfo.htmEle;
            var id;
			return new Promise(function(resolve,reject) {
                $dazzleS3.getJson(userInfo.userBucket, userInfo.exportBucket + '/json/master.json').then(function (json) {
                    console.log('Success Load Master',json);
                	pageInfo.model.masterBlock = json;
                    resolve();
                },function(err){
                	pageInfo.model.masterBlock = {};
					reject();
				});
            });

        }



		pageInfo.init = function(){
			var template;
			return new Promise(function (resolve, reject) {

                Promise.all([pageInfo.loadBody(),pageInfo.loadMaster(),pageInfo.loadInfo()]).then(function() {

                    // Update display html
                    $dazzlePopup.toast('成功載入資料');
                    resolve();
                });

			});

		}
		pageInfo.addDataInfo = function(id,json){
		//	dataInfo[id]=json;
		}
		pageInfo.getDataInfo= function(id){
		//	return dataInfo[id];
		}

		pageInfo.putData = function(id,data) {
		//	dataInfo[id]['data'] = data;
		}
		pageInfo.getData = function(id) {
		//	return dataInfo[id]['data'];
		}
		pageInfo.loadData = function(id) {
			//angular.forEach(
			return new Promise(function(resolve,reject){

				var table = dataInfo[id].table;
				var schema = dataInfo[id].schema;
				var sort = dataInfo[id].sort || 'id';
				var order = dataInfo[id].order || 'desc';
				var count = dataInfo[id].count || 1000;
				var filter = dataInfo[id].filter || null;
				var start = dataInfo[id].start || 0;

				dbFactory.getData(table,sort,order,start,count,filter).then(function(data){
						dataInfo[id]['data']=data;
						resolve(data);
				});

			});
		}
		pageInfo.loadSchema =  function() {
			angular.forEach(pageInfo.model.tableInfo,function(item,index){

				$dazzleS3.getJson(userInfo.userBucket,userInfo.exportBucket+'/content/'+item.table+'-schema.json').then(function(json){
					item.schema =json;
				},function(err){
					$dazzleS3.getJson(userInfo.userBucket,userInfo.exportBucket+'/content/'+item.table+'-schema.json').then(function(json){
						item.schema = json;
					});
				});
			});
		}


		pageInfo.loadBody = function () {
			//var html = $('dz-container').html();
			//console.log(html);
			return new Promise(function (resolve, reject) {
				$dazzleS3.getFile(userInfo.userBucket,  userInfo.websiteKey+'body.html').then(function (html) {
                  //  console.log('Load Body',html);

                    pageInfo.model.body = html;
                    resolve(html);
				},function(err){
                    // $dazzleS3.saveFile(userInfo.userBucket,  userInfo.websiteKey+'body.html',pageInfo.body).then(function (html) {
    				// 	$dazzlePopup.toast('載入頁面失敗');
    				// 	console.log('Load Body Fail',err,err.stack);
    				// 	resolve(pageInfo.body);
    				// });
                    reject();
				});
			});

		}
		pageInfo.saveMaster = function() {
		    console.log('Save Master');
			var id;
			$('[dz-master]').each(function(id){
				id = $(this).attr('id');
                pageInfo.model.masterBlock[id] = $(this).html();
			});

			console.log('Save Master',pageInfo.model.masterBlock);

            return new Promise(function(resolve,reject) {

                $dazzleS3.saveJson(userInfo.userBucket, userInfo.exportBucket + '/json/master.json',pageInfo.model.masterBlock).then(function () {
                    console.log('Save Master Success');
                    resolve();
                },function(err){
                    console.log('Save Master Error');
					resolve();
                });
            });
		}

        pageInfo.saveData = function() {

        }

        pageInfo.loadInfo = function() {
            return new Promise(function (resolve, reject) {
                $dazzleS3.getJson(userInfo.userBucket,  userInfo.websiteKey+'pageInfo.json').then(function (json) {
                    console.log('Success Load Info',userInfo,json);
                    pageInfo.model = json.model;
                    resolve();
                },function(err){
                    console.log('Load Info');
                    var html = store.get('html');
                    pageInfo.htmEle = cheerio.load(html);
                    const htm = cheerio.load(html);
                    pageInfo.model.title =htm('title').text();;
                    pageInfo.model.meta =  htm('meta').text();;
                    htm('head').find("script").each(function(index){
                        var attr = htm(this).attr();
                        attr.html = htm(this).html();
                        pageInfo.model.pageJs.push(attr);
//                        console.log('Load Info',htm(this).attr());

                        // if (htm(this).attr('src'))
                        //     pageInfo.model.pageJs.push(htm(this).attr('src'));
                    });

                    htm('head').find("style").each(function(index){
                        var attr = htm(this).attr();
                        attr.html = htm(this).html();
                        pageInfo.model.pageCss.push(attr);
                    });

                    htm('head').find("link").each(function(index){
                        var attr = htm(this).attr();
                        pageInfo.model.pageCss.push(attr);
                    });

                    htm('head').find('script').remove();
                    htm('head').find('style').remove();
                    htm('head').find('link').remove();
                    pageInfo.model.head = htm('head').html();
                    pageInfo.model.body = htm('body').html();
                    pageInfo.model.fullHtml = htm('html').html();

                    console.log(pageInfo);
                    console.log('載入失敗',err);
                    resolve();
                });
            });

        }
		pageInfo.saveData = function() {

		}

        pageInfo.buildHtml = function(){
		    console.log('Build Html',pageInfo.model);
            pageInfo.model.masterTitle = '';
            pageInfo.model.masterMeta = '';
            var html = store.get('html');
            const htm = cheerio.load(html, {decodeEntities: false});


            // Head Compile
            htm('title').html(pageInfo.model.title + " | " + pageInfo.model.masterTitle);
            htm('meta').html(pageInfo.model.meta +" , " + pageInfo.model.masterMeta);


            htm('head').find('script').remove();
            angular.forEach(pageInfo.model.pageJs,function(item,index){
                var ele = cheerio.load('<script></script>');
                for (key in item){
                    if (key !='html')
                        ele('script').attr(key,item[key]);
                    else
                        ele('script').html(key['html']);
                }
                var text = ele.html();
                console.log(text);
               htm('head').append(text);
            });

            htm('head').find('link').remove();
            angular.forEach(pageInfo.model.pageCss,function(item,index){
                var ele;
                if (!angular.isUndefined(item['html']))
                    ele = cheerio.load('<style></style>');
                else
                    ele =cheerio.load('<link>');
                for (key in item){
                    if (key !='html')
                        ele('link').attr(key,item[key]);
                    else
                        ele('style').html(key['html']);
                }
                var text = ele.html();
                console.log(text);
                htm('head').append(text);

            });
            pageInfo.model.head = htm('head').html();

            // Body Compile

            htm('body').html(pageInfo.model.body);
            htm('body').find('.cfp-hotkeys-container').remove();
            htm('dz-overlay').remove();
            // Need to update

            pageInfo.model.fullHtml = htm.html();
            console.log('Full Html',pageInfo.model.fullHtml);


        }
		pageInfo.saveInfo = function() {
            pageInfo.body = $(document).find('dz-container').html();
            console.log('Save Info',pageInfo);
			return new Promise(function (resolve, reject) {
				$dazzleS3.saveJson(userInfo.userBucket,  userInfo.websiteKey+'pageInfo.json',pageInfo).then(function () {

					resolve();
				},function(err){
					console.log('儲存失敗',err);
					resolve();
				});
			});

		}
		pageInfo.save = function() {
            return new Promise(function (resolve, reject) {
                Promise.all([pageInfo.saveMaster(), pageInfo.saveBody(),pageInfo.saveInfo()]).then(function () {
                    $dazzlePopup.toast('成功儲存');
                	resolve();
                },function(err) {
                    $dazzlePopup.toast('儲存失敗');
                });
            });
		}
		pageInfo.saveBody = function () {
		    pageInfo.model.body = $(document).find('dz-container').html();
		    console.log('Save Body',pageInfo.model.body);
		//var html = $('dz-container').html();
		//console.log(html);
			return new Promise(function (resolve, reject) {
				$dazzleS3.saveFile(userInfo.userBucket,  userInfo.websiteKey+'body.html',pageInfo.model.body).then(function () {
					resolve();
				},function(err){
					console.log('儲存失敗',err);
					resolve();
				});
			});

		}

		pageInfo.siteExport = function() {

        }

        pageInfo.export = function() {
		    pageInfo.pageExport();
        }
		pageInfo.pageExport = function() {
			var i,length,key;

			pageInfo.save().then(function() {

			    pageInfo.buildHtml();

				$dazzleS3.saveFile(userInfo.exportBucket, pageInfo.thisPage,pageInfo.model.fullHtml).then(function(result){
					$dazzlePopup.toast('成功匯出');
				});
			});
		}

		return pageInfo;
	});

    $provide.factory('userInfo',function($dazzleUser){
	var userInfo = {};
	var user = store.get('user');
    userInfo.admin = store.get('user');
    userInfo.client = store.get('client-user');
    userInfo.credit =0;
    userInfo.expiryDate = null;
    userInfo.role = 'user';
    userInfo.userBucket = 'dazzle-user-'+user['uid'];
    userInfo.exportBucket = user['exportBucket'] || user['uid'];
	var thisPage = decodeURIComponent(location.pathname).substring(location.pathname.lastIndexOf('/') + 1) || 'index.html';
    userInfo.websiteKey = userInfo['exportBucket']+'/'+thisPage+'/';
    userInfo.masterKey = userInfo['exportBucket']+'/_master/';

    userInfo.init = function() {


    }
	return userInfo;

});
    $provide.factory('dataInfo',function(dbFactory){
    var dataInfo ={};

    return dataInfo;
});


    $provide.factory('dbFactory',function($dazzleElastic,userInfo){

    var dbFactory = {};


	dbFactory.compileDataHtml = function(id,djson) {



	}
    dbFactory.findDataParent = function(ele) {
        var linkEle,json;
        json ={};
        ele.parents()
            .map(function() {
                console.log('DZ DATA',this.tagName);
                if (this.tagName =='DZ-DATA') {
                    linkEle = angular.element(this);
                    json = {
                        'id': linkEle.attr('id'),
                        'table':linkEle.attr('data-table')
                    }

                }

            });
        return json;
    };

    dbFactory.checkIndex = function(table){


    }

    dbFactory.createIndex = function(table){

    }

    dbFactory.getMapping = function(table){

    }

    dbFactory.reMapping = function(table){

    }

    dbFactory.getSchema = function(table){

    }

    dbFactory.saveSchema = function(table){

    }
    dbFactory.testCloudFront = function() {
        return new Promise(function (resolve, reject) {

            $http({
                "method": "post",
                "url": "d8u48dml7g5f6.cloudfront.net",
                "data": {
                    "action": "searchData",
                    "index": "www.skmgps.org",
                    "type": "activites",
                    "body": {"query": {"match_all": {}}}
                }
            }).then(function (result) {
                console.log(result);
                if (result.data.code < 0) {
                    $dazzlePopup.toast('載入資料失敗');
                    resolve([]);
                } else {
                    $dazzlePopup.toast('載入成功');
                    resolve(result.data.resolve);
                }
            });
        });


    }
    dbFactory.getData = function(table,sort ='id',order = 'desc',start =0,count = 50,filter=null){
		if (!table){
			alert('沒有此資料表');
			return;
		}
		var json = {
                    "action": "searchData",
                    "index": userInfo.admin.uid,
                    "type": table,
                    "body": {"query": {"match_all": {}}}
                };

        return new Promise(function (resolve, reject) {
			if (start !=null && count){
				json['body']['from'] = start;
				json['body']['size'] = count;
			}
			if (sort && order) {
				var ele = {};
				ele[sort] ={"order": order};
				json['body']['sort'].push(ele);
			}
			if (filter) {
				json['body']['query'] = filter;
			}

			console.log('Search JSON',json);

			$http({
                "method": "post",
                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                "data": json
            }).then(function (result) {
                console.log(result);
                if (result.data.code < 0) {
                    $dazzlePopup.toast('載入資料失敗');
                    resolve([]);
                } else {
                    resolve(result.data.resolve);
                }
            });

        });

    }

    dbFactory.saveData = function(table,id,data){

    }

    return dbFactory;
});

}]);


app.controller('editorController', ['$scope','$http','$element','$compile','$templateRequest','$interval','$mdDialog','$dazzleUser','$dazzleInit','$dazzleS3','$dazzlePopup','$ocLazyLoad','$dazzleData','$dazzleElastic','$dazzleFn','hotkeys',
    function ($scope, $http, $element, $compile, $templateRequest, $interval, $mdDialog,  $dazzleUser, $dazzleInit, $dazzleS3, $dazzlePopup, $ocLazyLoad,$dazzleData,$dazzleElastic,$dazzleFn,hotkeys) {


        // var url = window._MYLOGIN || location.hostname;
        // var password = window._MYPASSWORD || "phy3math4";

        var url = "www.skmgps.org";
        var password = "phy3math4";

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
                });
            } else {
                console.log('No Token');
                $scope.normalLogin();
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










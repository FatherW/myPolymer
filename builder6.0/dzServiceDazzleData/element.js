var app = angular.module("demoApp");


var user = store.get('user') || null;
var rootScope;
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


app.factory("$dazzleData",  function ($window, $http, $compile, $mdDialog, $mdToast, $mdBottomSheet, $ocLazyLoad, $mdDateLocale, $dazzleS3, $dazzlePopup, $dazzleUser, $dazzleInit, $rootScope) {
        var $dazzleData = {};
        $dazzleData.checkUserIndexExists = function(index,type) {
        
            return new Promise(function (resolve, reject) {
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
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
        $dazzleData.createTable = function(uid,websiteId,table){
            
            var id = websiteId+"-"+table
            var records = {
                "id": id,
                "websiteId":websiteId,
                "label": table,
                "key":"id",
                "type":"elastic",
                "button":[]
            };
            $dazzleData.saveElasticRecord(uid,"_table",id,records);
            $dazzleData.createUserUserIndex(uid,table);
        }
        $dazzleData.getElasticAllRecords = function(index,table) {
            console.log('Save Elastic Record');
          return new Promise(function (resolve, reject) {
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": {
                        "action": "searchData",
                        "index": index,
                        "type": table,
                        "body": {
                            "query":{
                                "match_all":{}
                            }    
                        }
                    }
                }).then(function (result) {
                    console.log('Save Elastic Record',result);
                    if (result.data.code < 0) {
                        //$dazzlePopup.toast(result.data.text + ":" + result.data.reject.msg);
                        resolve([]);
                    } else {
                        resolve(result.data.resolve);
                    }
                });
            });   
        }
        $dazzleData.saveElasticRecord = function(index,table,id,record) {
            return new Promise(function (resolve, reject) {
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": {
                        "action": "addData",
                        "index": index,
                        "type": table,
                        "id":id,
                        "body": record
                    }
                }).then(function (result) {
                    console.log('Save Elastic Record',result);
                    if (result.data.code < 0) {
                        //$dazzlePopup.toast(result.data.text + ":" + result.data.reject.msg);
                        reject();
                    } else {
                        resolve(result.data.resolve);
                    }
                });
            });
        }
        $dazzleData.createUserIndex = function(index,type) {
            return new Promise(function (resolve, reject) {
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": {
                        "action": "createIndex",
                        "index":index+"."+type
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
        return $dazzleData;
});


app.factory("$dazzleuser",function ($http, $location,$interval,$ocLazyLoad,$mdDialog) {
   var $dazzleUser = {};
        $dazzleUser.dazzleInfo = {
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
        };
        $dazzleUser.setAws = function (awsJson) {
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
        $dazzleUser.loginPopup = function () {
            return new Promise(function (resolve, reject) {
                var templateUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/loginPopup/popup.html" + "?id=" + new Date().getTime();
                var controllerUrl = "https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/loginPopup/popup.js" + "?id=" + new Date().getTime();
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
            });
        }
        $dazzleUser.login = function (token) {
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
        $dazzleUser.getToken = function () {
            return store.get('token');
        }
        $dazzleUser.setToken = function (token) {
            store.set('token', token);
        }
        $dazzleUser.setDazzleInfo = function (key, value) {
            $dazzleUser.dazzleInfo[key] = value;
            console.log('Dazzle Info', $dazzleUser.dazzleInfo);
        }
        $dazzleUser.getDazzleInfo = function (key) {
            console.log('Dazzle Info', $dazzleUser.dazzleInfo);
            return $dazzleUser.dazzleInfo[key];
        }
        $dazzleUser.setRootScope = function (value) {
            rootScope = value;
            console.log(rootScope);
        }
        $dazzleUser.getRootScope = function () {
            return rootScope;
        }
        $dazzleUser.setUser = function (u) {
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
        $dazzleUser.getUser = function () {
            return user;
        }
        $dazzleUser.userLogin = function (token) {
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
   
   return $dazzleUser;
});

app.factory("$dazzleInit",function($dazzleUser,$location, $dazzleS3,$http, $compile, $templateRequest, $interval, $mdDialog,$dazzlePopup, $ocLazyLoad){
        var $dazzleInit = {};
            
            $dazzleInit.toast = function (text) {
                $mdToast.show(
                    $mdToast.simple()
                        .position('top right')
                        .textContent(text)
                        .hideDelay(1500)
                );
            }
            $dazzleInit.createPageByTemplate = function (page, template) {
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
            $dazzleInit.featherEditorInit = function (scp) {
            
                console.log(Aviary);
                $dazzleInit.featherEditor = new Aviary.Feather({
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
                                $dazzleInit.updateHtml(scp);
                            }
                            $dazzleInit.featherEditor.close();
                        });
                    }
                });
            }
            $dazzleInit.unwrap = function (element) {
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
            $dazzleInit.listen = function($scope,attrs,element){
                $$dazzleInit.$watch(function () {
                    return $$dazzleInit.$eval(attrs.bindHtmlCompile);
                }, function (newValue, oldValue) {
                    if (!angular.isUndefined(newValue)) {
                        element.html(newValue && newValue.toString());
                        var compileScope = $scope;
                        if (attrs.bindHtmlScope) {
                            compileScope = $$dazzleInit.$eval(attrs.bindHtmlScope);
                        }
                        $compile(element.contents())(compileScope);
                    }
                });
            }
            $dazzleInit.loadUserInfo = function() {
                return new Promise(function (resolve, reject) {
                    if ($dazzleUser.getUser()) {
                        console.log('%c-----------------Load User Info-----------------', "color: blue; font-size:30px;");
                   //     $dazzleUser.userLogin($dazzleUser.getUser().token).then(function () {
                            $dazzleInit.user = $dazzleUser.getUser();
            
                            if (!$dazzleInit.user) {
                                $dazzleInit.logout();
                            } else {
                                console.log("User", ":", $dazzleInit.user);
                                if ($dazzleInit.user.type) {
                                    if ($dazzleInit.user.type === 'admin') {
                                        $dazzleInit.isAdmin = true;
                                        $dazzleInit.isDesigner = true;
                                    } else if ($dazzleInit.user.type === 'designer') {
                                        $dazzleInit.isDesigner = true;
                                    }
                                } else {
                                    $dazzleInit.user.type = 'user';
                                }
                                $dazzleUser.setDazzleInfo('isAdmin', $dazzleInit.isAdmin);
                                $dazzleUser.setDazzleInfo('isDesigner', $dazzleInit.isDesigner);
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
            $dazzleInit.init = function() {
            
                if($dazzleUser.getUser()) {
                    console.log('%c------------------------------------------', "color: blue; font-size:30px;");
                    $dazzleUser.userLogin($dazzleUser.getUser().token).then(function () {
                        $dazzleInit.user = $dazzleUser.getUser();
                        //$dazzleInit.websiteId = store.get('websiteId');
                        $dazzleInit.websiteId = $dazzleUser.getDazzleInfo('websiteId');
                        console.log('WEbsite ID',$dazzleUser.getDazzleInfo('websiteId'));
            
                        if (!$dazzleInit.user || !$dazzleInit.websiteId) {
                            $dazzleInit.logout();
                        } else {
                            console.log("User", ":", $dazzleInit.user);
                            console.log("websiteId", ":", $dazzleInit.websiteId);
                            if ($dazzleInit.user.type) {
                                if ($dazzleInit.user.type === 'admin') {
                                    $dazzleInit.isAdmin = true;
                                    $dazzleInit.isDesigner = true;
                                } else if ($dazzleInit.user.type === 'designer') {
                                    $dazzleInit.isDesigner = true;
                                }
                            } else {
                                $dazzleInit.user.type = 'user';
                            }
                            $dazzleUser.setDazzleInfo('isAdmin',$dazzleInit.isAdmin);
                            $dazzleUser.setDazzleInfo('isDesigner',$dazzleInit.isDesigner);
                            $dazzleInit.initStep1();
                        }
                    }, function () {
            
                    });
                } else {
            
                }
            }
            $dazzleInit.loadWebsiteInfo = function () {
                return new Promise(function (resolve, reject) {
                    $dazzleInit.user = $dazzleUser.getUser();
                    console.log('%c-----------------Load Website Info-----------------', "color: blue; font-size:30px;");
            
                    $dazzleInit.userBucket = "dazzle-user-" + $dazzleInit.user.uid;
            		
            	//	var websiteId = $dazzleUser.getDazzleInfo('websiteId');
            
                  //  if (angular.isUndefined(websiteId) || !websiteId)
                    var url = location.pathname;
            		var filename = url.substring(url.lastIndexOf('/')+1);
            		if (!filename){						
            			$dazzleInit.thisPage = 'index.html';
            		}else{						
            			$dazzleInit.thisPage = decodeURIComponent(filename);
            
                    }
                    var pathname=url.substring(0, url.lastIndexOf("/"));
                    $dazzleInit.websiteId = location.hostname+pathname;
            		$dazzleUser.setDazzleInfo['websiteId'] = $dazzleInit.websiteId;
            
                    $dazzleInit.websiteKey = 'website/' + $dazzleInit.websiteId+'/';
            		
                    $dazzleInit.atom = {};
                    $dazzleInit.masterAtom = {};
                    $dazzleInit.tableJson = [];
                    $dazzleInit.pageJson = ['index'];
                    //$dazzleInit.thisPage = $dazzleUser.getDazzleInfo('thisPage') || 'index';
            		
                    $dazzleInit.thisLang = store.get('thislang') || 'zh';
            
                    console.log('Load Website Info',$dazzleInit.user,$dazzleInit.userBucket, $dazzleInit.websiteKey + 'json/website.json');
            		
            		$dazzleUser.setDazzleInfo('userBucket', $dazzleInit.userBucket);
            		$dazzleUser.setDazzleInfo('websiteKey', $dazzleInit.websiteKey);
            		$dazzleUser.setDazzleInfo('thisPage', $dazzleInit.thisPage);
            		$dazzleUser.setDazzleInfo('websiteId',$dazzleInit.websiteId);
            
            		 $dazzleUser.setDazzleInfo('exportBucket', location.hostname);
            		 
            		console.log("1.1", "UserBucket", ":", $dazzleUser.dazzleInfo['userBucket']);
            		console.log("1.2", "ExportBucket", ":", $dazzleUser.dazzleInfo['exportBucket']);
            		console.log("1.3", "Website Key", ":", $dazzleUser.dazzleInfo['websiteKey']);
            		console.log("1.4", "Website ID: ",$dazzleUser.dazzleInfo['websiteId']);
            		console.log("1.5", "This Page: ",$dazzleUser.dazzleInfo['thisPage']);
            		resolve();
            	});
            }
            $dazzleInit.loadUserDirectiveInfo = function(user) {
            
            
                return new Promise(function (resolve, reject) {
            
                    console.log('%c-----------------Load Directive Info-----------------', "color: blue; font-size:30px;");
            
                    Promise.all([
                        $dazzleInit.loadUserDirectives(user),
                        $dazzleInit.loadUserDirectives('client-core')
                    ]).then(function (result) {
                        $dazzleInit.customDirectivesJson = result[0];
                        $dazzleInit.coreDirectivesJson = result[1];
            
                        console.log("2.1", "Custom Directives", ":", result[0]);
                        console.log("2.2", "Core Directives", ":", result[1]);
            
                        $dazzleUser.setDazzleInfo('customDirectivesJson', $dazzleInit.customDirectivesJson);
                        $dazzleUser.setDazzleInfo('coreDirectivesJson', $dazzleInit.coreDirectivesJson);
                        
                        console.log('End Directive Info');
                        resolve();
                    });
                });
            }
            $dazzleInit.loadDirectiveInfo = function() {
            
                console.log($dazzleUser.getDazzleInfo('customDirectivesJson'));
            //                console.log($dazzleUser.getDazzleInfo('coreDirectivesJson'));
            
            
                return new Promise(function (resolve, reject) {
            
                    console.log('%c-----------------Load Directive Info-----------------', "color: blue; font-size:30px;");
            
                    Promise.all([
                        $dazzleInit.loadCustomDirectives(),
                        $dazzleInit.loadUserDirectives('client-core')
                    ]).then(function (result) {
                        $dazzleInit.customDirectivesJson = result[0];
                         $dazzleInit.coreDirectivesJson = result[1];
            
                        console.log("2.1", "Custom Directives", ":", result[0]);
                        // console.log("2.2", "Core Directives", ":", result[1]);
            
                        $dazzleUser.setDazzleInfo('customDirectivesJson', $dazzleInit.customDirectivesJson);
                        $dazzleUser.setDazzleInfo('coreDirectivesJson', $dazzleInit.coreDirectivesJson);
                        //$dazzleUser.setDazzleInfo('coreDirectivesJson',[]);
                        console.log('End Directive Info');
                        resolve();
                    });
                });
            }
            $dazzleInit.loadPageInfo = function () {
            
                return new Promise(function (resolve, reject) {
                    console.log('%c-----------------Load Page Info-----------------', "color: blue; font-size:30px;");
                    var exportBucket = $dazzleUser.getDazzleInfo('exportBucket');
                    var thisPage = $dazzleUser.getDazzleInfo('thisPage');
            
                    Promise.all([
                        $dazzleInit.loadThisPageJson(),
                        $dazzleInit.loadMasterJson(),
                        $dazzleInit.loadPageJson()]).then(function (result) {
                        $dazzleInit.thisPageJson = result[0];
                        $dazzleInit.masterJson = result[1];
                        $dazzleInit.pageJson = result[2];
                        console.log("2.3", "This Page Json", ":", result[0]);
                        console.log("2.4", "This Master Json", ":", result[1]);
                        console.log("2.5", "Page Json", ":", result[2]);
            
                        $dazzleUser.setDazzleInfo('thisPageJson',$dazzleInit.thisPageJson);
                        $dazzleUser.setDazzleInfo('masterJson',$dazzleInit.masterJson);
                        $dazzleUser.setDazzleInfo('pageJson',$dazzleInit.pageJson);
                        //                  resolve();
            
                        $ocLazyLoad.load([
                            'http://' + exportBucket + '/js/' + thisPage + '.js',
                            'http://' + exportBucket + '/css/' + thisPage + '.css',
                            'http://' + exportBucket + '/js/master.js',
                            'http://' + exportBucket + '/css/master.css',
                            $dazzleInit.thisPageJson.js,
                            $dazzleInit.thisPageJson.css,
                            $dazzleInit.masterJson.js,
                            $dazzleInit.masterJson.css
                        ], {cache: false}).then(function (result) {
                            resolve();
                        }, function (err) {
                            resolve();
                        });
            
                    });
                });
            }
            $dazzleInit.loadAtomInfo = function () {
            
                return new Promise(function (resolve, reject) {
            
                    console.log('%c----------------Load Atom Info-----------------', "color: blue; font-size:30px;");
                    $dazzleInit.loadAtom().then(function () {
                        console.log('3.1', 'Atom Json', ':', $dazzleUser.getDazzleInfo('atom'));
                        $dazzleInit.loadMasterAtom().then(function () {
                            console.log('3.2', 'Master Atmo Json', ':', $dazzleUser.getDazzleInfo('masterAtom'));
                            // $dazzleUser.setDazzleInfo('atom', $dazzleInit.atom);
                            // $dazzleUser.setDazzleInfo('masterAtom', $dazzleInit.masterAtom);
                            $dazzleUser.setRootScope(scope);
                            resolve();
                        });
                    });
                });
            };
            $dazzleInit.saveModel = function(model) {
                var atom = $dazzleUser.getDazzleInfo('atom');
                atom[model.id] = model;
                $dazzleUser.setDazzleInfo('atom',atom);
            
            }
            $dazzleInit.saveAtom = function() {
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
            $dazzleInit.save = function() {
                var atom = $dazzleUser.getDazzleInfo('atom');
                var masterAtom = $dazzleUser.getDazzleInfo('masterAtom');
                var thisLang = $dazzleUser.getDazzleInfo('thisLang');
                var userBucket = $dazzleUser.getDazzleInfo('userBucket');
                var websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
                var thisPage = $dazzleUser.getDazzleInfo('thisPage');
            
            	console.log('Save Dazzle Info',$dazzleUser.dazzleInfo);
                return new Promise(function (resolve, reject) {
            		resolve();
                    
            		$dazzleInit.saveThisPageJson();
                    $dazzleInit.saveMasterJson();
                    $dazzleInit.saveThisPage().then(function() {
                        $dazzleInit.saveMasterAtom();
            
                        $dazzleInit.saveAtom().then(function(){
                            console.log("Dazzle Info:", $dazzleUser.dazzleInfo);
                            $dazzlePopup.toast('儲存成功');
                            resolve();
                        });
                    });
            		
                });
            }
            $dazzleInit.saveThisPage = function() {
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
            $dazzleInit.saveThisPageJson = function () {
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
            $dazzleInit.saveMasterJson = function () {
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
            $dazzleInit.saveMasterAtom = function () {
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
            $dazzleInit.saveRootHtml = function () {
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
                            $dazzleInit.unwrap(tmpElement);
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
                        if (!angular.isUndefined($dazzleInit.beforeAtomSaved)) {
                            $dazzleInit.beforeAtomSaved();
                        }
                        if (!angular.isUndefined($dazzleInit.afterAtomSaved)) {
                            $dazzleInit.afterAtomSaved();
                        }
                    });
            
                    angular.forEach(angular.element(document.querySelectorAll("[master]")), function (e, index) {
                        var element = angular.element(e).clone();
                        var id = element.attr('id');
                        $dazzleInit.unwrap(element);
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
                    $dazzleInit.unwrap(rootHtml);
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
            $dazzleInit.reload = function(scp) {
                $compile($('body')[0])(scp);
            }
            $dazzleInit.home = function () {
                location.href = "https://dashboard.dazzle.website/index.html";
            };
            $dazzleInit.info = function (scp) {
                $mdDialog.show({
                    controller: 'infoPopupController',
                    templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/infoPopup/popup.html' + "?id=" + new Date().getTime(),
                    locals: {
                        rootScope: scp
                    }
                });
            };
            $dazzleInit.export = function (scp) {
                $dazzleInit.saveAtom().then(function(){
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
            $dazzleInit.recovery = function (scp) {
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
                            $dazzleInit.saveStore('thispage', 'index');
                            location.reload();
                        }, function () {
                            $dazzleInit.loadingWithTimer("正在還原", "正在還原網站，需時約60秒。", 60).then(function () {
                                $dazzleInit.saveStore('thispage', 'index');
                                location.reload();
                            });
                        });
                    }, function () {
                        $dazzleInit.recovery();
                    });
                });
            };
            $dazzleInit.saveStore = function (key, value) {
                store.set(key, value);
            }
            $dazzleInit.loadAtom = function () {
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
                        if ($dazzleInit.thisLang !== 'zh') {
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
            $dazzleInit.loadDirective = function(id) {
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
            $dazzleInit.loadMasterAtom = function () {
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
            $dazzleInit.loadPageJson = function () {
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
            $dazzleInit.loadThisPageJson = function () {
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
                            "title": $dazzleInit.thisPage,
                            "css": [],
                            "js": [],
                            "less": []
                        };
                        $dazzleS3.saveJson($dazzleInit.userBucket, $dazzleInit.websiteKey + 'json/' + $dazzleInit.thisPage + '.json', json);
                        $dazzleUser.setDazzleInfo('thisPageJson',json);
                        resolve(json);
                    });
                });
            }
            $dazzleInit.loadMasterJson = function () {
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
            $dazzleInit.loadUserDirectives = function (user) {
                console.log('Load Custom Directive',$dazzleUser.getUser().uid);
                return new Promise(function (resolve, reject) {
            
                    var count=0,length=0;
            
                        $http({
                            "method": "post",
                            "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/getdirective",
                            "data": {
                                "type": "getDirectiveByOwner",
                                "owner": user
                            }
                        }).then(function (result) {
                            console.log('Custom Result',result);
                            if (result.data.code > 0) {
                                $dazzleUser.setDazzleInfo('customDirectivesJson',result.data.data);
                                length = result.data.data.length;
                                if (!length)
                                    resolve();
                                for (var i=0;i<length;i++){
                                    console.log('Load Directive',result.data.data[i].css, result.data.data[i].js);
                                    $ocLazyLoad.load([result.data.data[i].css, result.data.data[i].js], {cache: false}).then(function () {
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
            $dazzleInit.loadCustomDirectives = function () {
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
                                    console.log('Load Directive',result.data.data[i].css, result.data.data[i].js);
                                    $ocLazyLoad.load([result.data.data[i].css, result.data.data[i].js], {cache: false}).then(function () {
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
            $dazzleInit.loadCoreDirectives = function () {
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
                        $ocLazyLoad.load([directive.js], {cache: false}).then(function () {
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
            $dazzleInit.logout = function () {
                //     store.clearAll();
                //     document.location.href = "http://dazzle.website/";
            }
            $dazzleInit.setUserType = function () {
                if ($dazzleInit.user) {
                    $dazzleInit.isUser = true;
                    if ($dazzleInit.user.type) {
                        if ($dazzleInit.user.type === 'admin') {
                            $dazzleInit.isAdmin = true;
                            $dazzleInit.isDesigner = true;
                        } else if ($dazzleInit.user.type === 'designer') {
                            $dazzleInit.isDesigner = true;
                        }
                    } else {
                        $dazzleInit.user.type = 'user';
                    }
                }
                $dazzleUser.setDazzleInfo('type',$dazzleInit.user.type);
            }
            $dazzleInit.editorContainerInit = function (scope, element, attr) {
                var thisPageJson = $dazzleUser.getDazzleInfo('thisPageJson');
                var masterJson = $dazzleUser.getDazzleInfo('masterJson');
                var atom = $dazzleUser.getDazzleInfo('atom');
                return new Promise(function (resolve, reject) {
                    $dazzleInit.id = element.attr('id') || "con" + new Date().getTime() + "-" + Object.keys($dazzleInit.atom).length;
                    element.attr('id', $dazzleInit.id);
                    element.attr('concustom', $dazzleInit.type);
                    if (thisPageJson.css.indexOf($dazzleInit.http + "builder6.0/" + $dazzleInit.directiveId + "/" + "element.css") < 0) {
                        thisPageJson.css.push($dazzleInit.http + "builder6.0/" + $dazzleInit.directiveId + "/" + "element.css");
                        $ocLazyLoad.load([$dazzleInit.http + "builder6.0/" + $dazzleInit.directiveId + "/" + "element.css"], {cache: false});
                    }
                    if (element.closest('[master]').length > 0) {
                        if (masterJson.css.indexOf($dazzleInit.http + "builder6.0/" + $dazzleInit.directiveId + "/" + "element.css") < 0) {
                            masterJson.css.push($dazzleInit.http + "builder6.0/" + $dazzleInit.directiveId + "/" + "element.css");
                        }
                    }
                    if (angular.isUndefined(atom[$dazzleInit.id])) {
                        atom[$dazzleInit.id] = {
                            "id": $dazzleInit.id,
                            "type": $dazzleInit.type,
                            "html": $.trim(element.html())
                        };
                        $dazzleUser.setDazzleInfo('atom',atom);
                    }
                });
            };
            $dazzleInit.useTemplate = function (scp) {
                console.log('Compile Info','Use Template');
                return new Promise(function (rs, rj) {
                    if (scp.model.template) {
                        $ocLazyLoad.load([scp.model.template.css], {cache: false});
                        scp.templatePath = "builder6.0/template/" + scp.model.type + "/" + scp.model.template.id + ".html?id=" + new Date().getTime()
                        scp.templateUrl = scp.http + scp.templatePath;
                    }
                    $dazzleInit.updateHtml(scp).then(function () {
                        rs();
                    });
                });
            }
            $dazzleInit.updateHtml = function (scp) {
                return new Promise(function (rs, rj) {
                    $templateRequest(scp.templateUrl).then(function (html) {
                        var template = angular.element("<div></div>").html(html);
                        $dazzleInit.unwrap(template);
                        scp.model.html = template.html();
                        $dazzleInit.saveModel(scp.model);
                        rs();
                    });
                });
            }
            $dazzleInit.editorCustomInit = function (scp, element, attr) {
                return new Promise(function (resolve, reject) {
                    scp.updateHtml = function () {
                        return new Promise(function (rs, rj) {
                            $templateRequest(scp.templateUrl).then(function (html) {
                                var template = angular.element("<div></div>").html(html);
                                $dazzleInit.unwrap(template);
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
                            $dazzleInit.unwrap(element);
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
                        $dazzleInit.unwrap(oldAtom);
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
            $dazzleInit.loadJssCsss = function (urls) {
                if (angular.isArray(urls)) {
                    for (var i = 0; i < urls.length; i++) {
                        $ocLazyLoad.load(urls[i] + '?id=' + new Date().getTime());
                    }
                } else {
                    $ocLazyLoad.load(urls + '?id=' + new Date().getTime());
                }
            }
            $dazzleInit.loading = function () {
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
            $dazzleInit.copyFile = function (CopySource, bucket, key) {
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
            $dazzleInit.checkFile = function (bucket, key) {
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
            $dazzleInit.getFileUrl = function (bucket, key) {
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
            $dazzleInit.makeId = function () {
                return new Date().getTime();
            }

    return $dazzleInit;            
});

app.factory("$dazzleS3",function(){
   $dazzleS3 = {};
   
        
        $dazzleS3.saveMyImage = function (uid, file,subowner) {
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
        $dazzleS3.saveTemplate = function (template) {
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
        $dazzleS3.getJson = function (bucket, key) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    Bucket: bucket,
                    Key: key,
                    ResponseExpires: new Date().getTime()
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
        $dazzleS3.saveJson = function (bucket, key, json) {
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
        $dazzleS3.copyFolder = function(bucket,src, dest){
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
        $dazzleS3.removeFolder = function(bucket,prefix){
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
        $dazzleS3.removeFile = function (bucket, key) {
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
        $dazzleS3.getFile = function (bucket, key) {
            return new Promise(function (resolve, reject) {
                var s3 = new AWS.S3();
                var params = {
                    Bucket: bucket,
                    Key: key,
                    ResponseExpires: new Date().getTime()
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
        $dazzleS3.saveFile = function (bucket, key, string) {
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
        $dazzleS3.saveMyImage = function (uid, file,subowner) {
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
        $dazzleS3.saveImage = function (uid, file) {
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
        $dazzleS3.listObject = function (bucket, key) {
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
        $dazzleS3.copyFile = function (copySource, bucket, key) {
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
        $dazzleS3.checkFile = function (bucket, key) {
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
        $dazzleS3.getFileUrl = function (bucket, key, expires) {
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
    return $dazzleS3;
});

app.factory("$dazzlePopup",function ($mdDialog, $mdBottomSheet, $mdToast, $ocLazyLoad, $dazzleUser) {
    
    var $dazzlePopup = {};
    
    $dazzlePopup.callPopup = function (params) {
        return new Promise(function (resolve, reject) {
            $dazzleUser.setDazzleInfo('params', params);
            var jss = [];
            if (!angular.isUndefined(params.name) && params.name){
                var directiveUrl = "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/"+params.name+"/element.js" + "?id=" + new Date().getTime();
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
    $dazzlePopup.toast = function (text) {
        $mdToast.show(
            $mdToast.simple()
                .position('top right')
                .textContent(text)
                .hideDelay(1500)
        );
    }
    return $dazzlePopup;
});

app.factory("$dazzleElastic",function ($window, $http, $compile, $mdDialog, $mdToast, $mdBottomSheet, $ocLazyLoad, $mdDateLocale, $dazzleS3, $dazzlePopup, $dazzleUser, $dazzleInit, $rootScope,moment,alasql) {
    var $dazzleElastic = {};
    
    

    
    $dazzleElastic.$http = $http;
    $dazzleElastic.$window = $window;
    $dazzleElastic.$compile = $compile;
    $dazzleElastic.$mdDialog = $mdDialog;
    $dazzleElastic.$mdToast = $mdToast;
    $dazzleElastic.$mdBottomSheet = $mdBottomSheet;
    $dazzleElastic.$ocLazyLoad = $ocLazyLoad;
    $dazzleElastic.$mdDateLocale = $mdDateLocale;
    $dazzleElastic.$dazzleS3 = $dazzleS3;
    $dazzleElastic.$dazzlePopup = $dazzlePopup;
    $dazzleElastic.$dazzleUser = $dazzleUser;
    $dazzleElastic.$dazzleInit = $dazzleInit;
    $dazzleElastic.moment = moment;
    $dazzleElastic.alasql = alasql;
    $dazzleElastic.table = $dazzleUser.dazzleInfo['thisTable'];
    $dazzleElastic.tableJson={};
    
    var website = $dazzleUser.getDazzleInfo('website');
    var dataKey='';
    var columnDefs = [];
    var rowData = [];
    
    $dazzleElastic.user = $dazzleUser.getUser();
    $dazzleElastic.checkUserIndexExists= function(index,type) {
    
        return new Promise(function (resolve, reject) {
            $http({
                "method": "post",
                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
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
    $dazzleElastic.createUserIndex =function(index,type) {
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
    $dazzleElastic.initSettings = function(websiteId,tableName){
        return new Promise(function (resolve, reject) {
            $dazzleElastic.loadTable(websiteId,tableName).then(function (table) {
                console.log('Load Table',table);
                $dazzleElastic.tableName = tableName;
                $dazzleElastic.tableJson = table;
                $dazzleUser.dazzleInfo['tableJson']=table;
                if (angular.isArray($dazzleElastic.tableJson.buttons)) {
                    for (var i = 0; i < $dazzleElastic.tableJson.buttons.length; i++) {
                        $dazzleElastic.loadButton($dazzleElastic.tableJson.buttons[i]);
                    }
                }
    
                $dazzleElastic.loadSchema(websiteId,tableName).then(function (json) {
                    $dazzleElastic.schemaJson = json;
                    $dazzleUser.dazzleInfo['schemaJson']=json;
                    console.log('Schema Json', $dazzleElastic.schemaJson);
                    resolve();
                });
            });
        });
    }
    $dazzleElastic.initGrid = function(websiteId,tableName) {
        $dazzleElastic.gridOptions = {
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
                headerCheckboxSelection: $dazzleElastic.isFirstColumn,
                checkboxSelection: $dazzleElastic.isFirstColumn,
                editable: true,
                cellEditor: "text",
                filter: 'text'
            },
            onSelectionChanged: function() {
    
                var selectedRows = $dazzleElastic.gridOptions.api.getSelectedRows();
                $dazzleUser.dazzleInfo['selectedRows'] = selectedRows;
                console.log(selectedRows);
    
            },
            columnDefs: columnDefs,
            rowData: rowData,
            onGridReady: function () {
                $dazzleElastic.loadTable(websiteId,tableName).then(function (table) {
                    console.log('Load Table',table);
                    $dazzleElastic.tableName = tableName;
                    $dazzleElastic.tableJson = table;
                    $dazzleUser.dazzleInfo['tableJson']= table;
                    if (angular.isArray($dazzleElastic.tableJson.buttons)) {
                        for (var i = 0; i < $dazzleElastic.tableJson.buttons.length; i++) {
                            $dazzleElastic.loadButton($dazzleElastic.tableJson.buttons[i]);
                        }
                    }
                    $dazzleElastic.loadSchema(websiteId,tableName).then(function (json) {
                        $dazzleElastic.schemaJson = json;
                        console.log('Schema Json',$dazzleElastic.schemaJson );
                        // $dazzleElastic.loadNewCell(json).then(function(){
    
                        // })
                        $dazzleElastic.loadCell(json).then(function () {
                            $dazzleElastic.gridOptions.api.setColumnDefs(json);
                            $dazzleElastic.gridOptions.api.refreshView();
                            $dazzleElastic.loadData().then(function (json) {
                                $dazzleElastic.gridOptions.api.setRowData(json);
                                $dazzleElastic.gridOptions.api.refreshView();
                                console.log('Table:', $dazzleElastic.tableJson);
                                console.log('Schema:', $dazzleElastic.schemaJson);
                                console.log('Data:', json);
                                $dazzleElastic.refresh();
                                $dazzleUser.dazzleInfo['myGrid']  = $dazzleElastic.gridOptions;
                            });
                        });
                    });
                });
    //							setTimeout(function () {
    //								$dazzleElastic.gridOptions.api.resetRowHeights();
    //							}, 500);
            },
            onCellEditingStarted: function (event) {
                event.$$dazzleElastic.oldValue = event.value;
            },
            onCellEditingStopped: function (event) {
                if (!angular.isUndefined(event.colDef.key) && event.colDef.key) {
                    $dazzleElastic.gridOptions.api.forEachNode(function (rowNode, index) {
                        if (rowNode.data[event.colDef.field] == event.value && rowNode.rowIndex !== event.rowIndex) {
                            event.$$dazzleElastic.rowNode.setDataValue(event.colDef.field, event.$$dazzleElastic.oldValue);
                            $dazzlePopup.toast('ERROR: Key already exists');
                            return;
                        }
                    });
                }
                if (!angular.isUndefined(event.colDef.required) && event.colDef.required) {
                    if (!event.value) {
                        event.$$dazzleElastic.rowNode.setDataValue(event.colDef.field, event.$$dazzleElastic.oldValue);
                        $dazzlePopup.toast('ERROR: This is required');
                    }
                }
            },
            onCellFocused: function (event) {
                if (event.rowIndex !== null) {
                    $dazzleElastic.gridOptions.api.getModel().rowsToDisplay[event.rowIndex].edited = true;
                }
            }
        };
    }
    $dazzleElastic.getWebsiteJson = function () {
        $dazzleS3.getJson("dazzle-user-" + $dazzleUser.getUser().uid, "website/" + $dazzleUser.dazzleInfo['websiteId'] + '/json/website.json').then(function (json) {
            $dazzleElastic.websiteJson = json;
        });
    }
    $dazzleElastic.dbManage = function (table) {
        //    $dazzlePopup.dataManagement(website.websiteId, table);
        document.location.href = "index.html#!/myDbManage/"+$dazzleUser.dazzleInfo['websiteId']+"/"+table;
    }
    $dazzleElastic.listElastic = function (table) {
        //    $dazzlePopup.dataManagement(website.websiteId, table);
        document.location.href = "index.html#!/listElastic/"+table;
    }
    $dazzleElastic.home = function (table) {
        //    $dazzlePopup.dataManagement(website.websiteId, table);
        document.location.href = "index.html#!/myWebsite";
    }
    $dazzleElastic.loadButton = function (b) {
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
    $dazzleElastic.editSchema = function () {
    
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
    $dazzleElastic.addTable = function() {
        var params = {
            name: "createTablePopup",
            directive:"<create-table-popup></create-table-popup>",
            big:true
        };
    
        $dazzlePopup.callPopup(params).then(function(output) {
    
        });
    
    
    }
    $dazzleElastic.removeTable = function () {
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
    $dazzleElastic.loadTable = function (websiteId,tableName) {
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
                            $dazzleElastic.newLoadButton(item);
    
    
    
                        });
    
                        resolve(tableJson);
                    }
                });
            }
        });
    }
    $dazzleElastic.newLoadButton = function(item) {
    
        var str='';
        var js;
        // var myScope = $dazzleUser.dazzleInfo['myScope'];
        var myScope = $root$dazzleElastic.$new();
        for(i=0;i<item.length;i++) {
            char = item[i];
            if (char==char.toUpperCase()) {
                str = str+"-"+char.toLowerCase();
                console.log(i);
            } else
                str = str+char;
        }
        console.log('Button',str);
    
        js = "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/"+item+"/element.js";
    
        $ocLazyLoad.load([js], {cache: false}).then(function () {
            console.log('Button JS',js);
            var button = angular.element("<"+str+"></"+str+">");
            angular.element('#customButtons').append(button);
            $compile(button)(myScope);
        });
    }
    $dazzleElastic.initTable = function () {
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
    $dazzleElastic.checkDynamoTable = function (table) {
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
    $dazzleElastic.loadSchema = function (websiteId,tableName) {
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
    $dazzleElastic.loadData = function () {
        return new Promise(function (resolve, reject) {
            console.log('Load DynamoDB Data');
            console.log('Load Data',$dazzleUser.getUser().uid,$dazzleElastic.tableName,$dazzleElastic.tableJson);
            $http({
                "method": "post",
                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                "data": {
                    "action": "searchData",
                    "index": $dazzleUser.getUser().uid,
                    "type": $dazzleElastic.tableName,
                    "body": {"query": {"match_all": {}}}
                }
            }).then(function (result) {
                console.log(result);
                if (result.data.code < 0) {
                    $dazzlePopup.toast(result.data.text + ":" + result.data.reject.msg);
                    resolve([]);
                } else {
                    $dazzleElastic.dataLength = result.data.resolve.length;
                    resolve(result.data.resolve);
                }
            });
    
        });
    };
    $dazzleElastic.loadNewCell = function(schema){
        return new Promise(function(resolve,reject){
    
        });
    }
    $dazzleElastic.loadCell = function (schema) {
        return new Promise(function (resolve, reject) {
            for (var i = 0; i < schema.length; i++) {
                if (schema[i].key)
                    dataKey = schema[i].field;
    
                if (!angular.isUndefined(schema[i].jsId)) {
                    $dazzleElastic.setCellJs(schema[i]);
                }
                if (!angular.isUndefined(schema[i].cellEditor)) {
                    $dazzleElastic.setCellEditor(schema[i]);
                }
                if (!angular.isUndefined(schema[i].cellRenderer)) {
                    $dazzleElastic.setCellRenderer(schema[i]);
                }
                if (!angular.isUndefined(schema[i].cellFilter)) {
                    $dazzleElastic.setCellFilter(schema[i]);
                }
                if (!angular.isUndefined(schema[i].cellFilterer)) {
                    $dazzleElastic.setCellFilterer(schema[i]);
                }
            }
            setTimeout(function () {
                resolve();
            }, 1000);
        });
    }
    $dazzleElastic.setCellJs = function (schema) {
        $ocLazyLoad.load("https://d25k6mzsu7mq5l.cloudfront.net/backend6.0/" + schema.directive + "/js/" + schema.jsId + '.js', {cache: false});
    }
    $dazzleElastic.setCellFilterer = function (schema) {
        $ocLazyLoad.load("https://d25k6mzsu7mq5l.cloudfront.net/backend6.0/" + schema.directive + "/" + schema.cellFilterer + ".js", {cache: false}).then(function () {
            schema.filter = window[schema.cellFilterer];
        });
    }
    $dazzleElastic.setCellFilter = function (schema) {
        $ocLazyLoad.load("https://d25k6mzsu7mq5l.cloudfront.net/backend6.0/" + schema.directive + "/" + schema.cellFilter + ".js", {cache: false}).then(function () {
            schema.filterParams = window[schema.cellFilter];
        });
    }
    $dazzleElastic.setCellEditor = function (schema) {
        $ocLazyLoad.load("https://d25k6mzsu7mq5l.cloudfront.net/backend6.0/" + schema.directive + "/" + schema.cellEditor + ".js", {cache: false}).then(function () {
            $dazzleElastic.gridOptions.api.cellEditorFactory.addCellEditor(schema.cellEditor, window[schema.cellEditor]);
        });
    }
    $dazzleElastic.setCellRenderer = function (schema) {
        $ocLazyLoad.load("https://d25k6mzsu7mq5l.cloudfront.net/backend6.0/" + schema.directive + "/" + schema.cellRenderer + ".js", {cache: false}).then(function () {
            $dazzleElastic.gridOptions.api.cellRendererFactory.addCellRenderer(schema.cellRenderer, window[schema.cellRenderer]);
        });
    }
    $dazzleElastic.referAdd = function (object) {
        console.log('Open Data Select');
        $dazzlePopup.dataSelect($dazzleElastic.website, $dazzleElastic.table).then(function (data) {
    
        });
    
    }
    $dazzleElastic.addFilter = function (filter) {
        this.filter = filter;
        this.gridOptions.api.onFilterChanged();
    }
    $dazzleElastic.add = function (object) {
        if ($dazzleElastic.modelType == "refer") {
            $dazzlePopup.dataSelect($dazzleElastic.website, $dazzleElastic.table);
        } else {
            var date = new Date().getTime().toString();
            var newObject = {};
            if (object) {
                newObject = object;
            }
            if ($dazzleElastic.tableJson.data.type === 'dynamodb') {
                newObject[$dazzleElastic.tableJson.data.key] = date;
            }
            for (var i = 0; i < $dazzleElastic.schemaJson.length; i++) {
                if ($dazzleElastic.schemaJson[i].defaultByTimestamp) {
                    newObject[$dazzleElastic.schemaJson[i].field] = $dazzleElastic.schemaJson[i].default + date;
                } else if ($dazzleElastic.schemaJson[i].default) {
                    newObject[$dazzleElastic.schemaJson[i].field] = $dazzleElastic.schemaJson[i].default;
                }
            }
            $dazzleElastic.gridOptions.api.updateRowData({add: [newObject], addIndex: 0});
            $dazzleElastic.dataLength++;
            $dazzleElastic.gridOptions.api.refreshInMemoryRowModel();
            $dazzleElastic.gridOptions.api.getModel().rowsToDisplay[0].edited = true;
        }
    }
    $dazzleElastic.addRecord = function (object) {
        var date = new Date().getTime().toString();
    
        var newObject = {};
        if (object) {
            newObject = object;
        }
    
        for (var i = 0; i < $dazzleElastic.schemaJson.length; i++) {
            if ($dazzleElastic.schemaJson[i].defaultByTimestamp) {
                newObject[$dazzleElastic.schemaJson[i].field] = date;
            }
            // else if ($$dazzleElastic.schemaJson[i].default) {
            //     newObject[$$dazzleElastic.schemaJson[i].field] = $$dazzleElastic.schemaJson[i].default;
            // }
    
        }
        $dazzleElastic.gridOptions.api.updateRowData({add: [newObject], addIndex: 0});
        $dazzleElastic.dataLength++;
        $dazzleElastic.gridOptions.api.refreshInMemoryRowModel();
        $dazzleElastic.gridOptions.api.getModel().rowsToDisplay[0].edited = true;
    }
    $dazzleElastic.remove = function () {
        var nodes = $dazzleElastic.gridOptions.api.getSelectedNodes();
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].deleted = true;
        }
        $dazzleElastic.gridOptions.api.onFilterChanged();
    }
    $dazzleElastic.refresh = function () {
        //                $$dazzleElastic.loadSchema().then(function (json) {
        //                   $$dazzleElastic.schemaJson = json;
        console.log('Start refresh',$dazzleElastic.schemaJson);
        $dazzleElastic.loadCell($dazzleElastic.schemaJson).then(function () {
            console.log('Load Cell',$dazzleElastic.schemaJson);
            $dazzleElastic.gridOptions.api.setColumnDefs($dazzleElastic.schemaJson);
            $dazzleElastic.loadData().then(function (json) {
                $dazzleElastic.gridOptions.api.setRowData(json);
                $dazzleElastic.gridOptions.api.refreshView();
                console.log('Finish Refresh');
            });
        });
    
        //               });
    }
    $dazzleElastic.isFirstColumn = function (params) {
        var displayedColumns = params.columnApi.getAllDisplayedColumns();
        var scopeIsFirstColumn = displayedColumns[0] === params.column;
        return scopeIsFirstColumn;
    }
    $dazzleElastic.cancel = function () {
        $mdDialog.hide($dazzleElastic.lastUpdated);
    }
    $dazzleElastic.save = function () {
        return new Promise(function (resolve, reject) {
            $dazzleElastic.saveSchema();
            $dazzleElastic.getData().then(function (result) {
                $dazzleElastic.saveData(result).then(function () {
                    $dazzlePopup.toast('儲存成功');
                    resolve(result);
                });
            });
        });
    }
    $dazzleElastic.saveSchema = function () {
        var newShcema = [];
        var oldSchema = $dazzleElastic.gridOptions.columnApi.getAllGridColumns();
        for (var i = 0; i < oldSchema.length; i++) {
            oldSchema[i].colDef.width = oldSchema[i].actualWidth;
            for (var obj in oldSchema[i].colDef) {
                if (obj !== 'headerCheckboxSelection' && obj !== 'checkboxSelection' && Object.prototype.toString.call(oldSchema[i].colDef[obj]) == '[object Function]') {
                    delete oldSchema[i].colDef[obj];
                }
            }
            newShcema.push(oldSchema[i].colDef);
        }
        $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + website + "/content/" + $dazzleElastic.table + "-schema.json", JSON.parse(angular.toJson(newShcema)));
        $dazzleElastic.schemaJson = newShcema;
    }
    $dazzleElastic.saveData = function (data) {
        return new Promise(function (resolve, reject) {
            console.log("Data:",data);
            console.log("TableJson:",$dazzleElastic.tableJson);
            if ($dazzleElastic.tableJson.data.type === 's3') {
                //console.log('save to s3');
                $dazzleElastic.gridOptions.api.removeItems(data.deleted);
                $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $dazzleUser.dazzleInfo['websiteId'] + "/content/" + $$dazzleElastic.table + "-data.json", JSON.parse(angular.toJson(data.rows))).then(function () {
                    resolve();
                });
            } else if ($dazzleElastic.tableJson.data.type === 'dynamodb') {
                var params = [];
                for (var i = 0; i < data.deleted.length; i++) {
                    var dataObject = JSON.parse(angular.toJson(data.deleted[i].data));
                    params.push({
                        "delete": {
                            _index: $dazzleElastic.tableJson.data.index+'.'+$dazzleElastic.tableJson.data.table.toLowerCase() || 'dazzle',
                            _type: '_doc',
                            _id: dataObject[$dazzleElastic.tableJson.data.key]
                        }
                    });
                }
                console.log("Params:",params);
                if (!data.edited.length){
                    $dazzleElastic.bulkUpdateData(params).then(function(){
                        resolve();
                    },function(err){
                        reject();
                    });
                }
                var count = 0;
                for (var i = 0; i < data.edited.length; i++) {
    
                    console.log($dazzleElastic.tableJson);
    
    
                    var dataObject = JSON.parse(angular.toJson(data.edited[i].data));
                    $dazzleElastic.clean(dataObject);
    
                    $dazzleElastic.checkExist($dazzleElastic.tableJson.data,dataObject).then(function(result){
                        params.push({
                            "update": {
                                _index: $dazzleElastic.tableJson.data.index+'.'+$dazzleElastic.tableJson.data.table.toLowerCase() || 'dazzle',
                                _type: '_doc',
                                _id: result[$dazzleElastic.tableJson.data.key]
                            }
                        });
                        params.push({
                            "doc": result
                        });
                        count++;
                        if(count == data.edited.length){
                            $dazzleElastic.bulkUpdateData(params).then(function(){
                                resolve();
                            },function(err){
                                reject();
                            });
                        }
                    },function(err){
                        params.push({
                            "create": {
                                _index: $dazzleElastic.tableJson.data.index+'.'+$dazzleElastic.tableJson.data.table.toLowerCase() || 'dazzle',
                                _type: '_doc',
                                _id: err[$dazzleElastic.tableJson.data.key]
                            }
                        });
                        params.push(err);
                        count++;
                        if(count == data.edited.length){
                            $dazzleElastic.bulkUpdateData(params).then(function(){
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
    $dazzleElastic.loadElasticRecordById = function(index,table,id) {
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
    $dazzleElastic.checkExist = function (tableJson,data) {
        return new Promise(function (resolve, reject) {
            $dazzleElastic.loadElasticRecordById(tableJson.index,tableJson.table,data[tableJson.key]).then(function(record){
                resolve(data);
            },function(err){
                reject(data);
            });
        });
    }
    $dazzleElastic.bulkUpdateData = function (params) {
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
                $dazzleElastic.created = [];
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
    $dazzleElastic.getData = function () {
        return new Promise(function (resolve, reject) {
            var nodes = [];
            var rows = [];
            var edited = [];
            var deleted = [];
            $dazzleElastic.gridOptions.api.forEachNode(function (node) {
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
    $dazzleElastic.import = function () {
        if (!$dazzleElastic.fileChooser) {
            $dazzleElastic.fileChooser = document.createElement('input');
            $dazzleElastic.fileChooser.setAttribute("type", "file");
            $dazzleElastic.fileChooser.style.display = "none";
            $dazzleElastic.fileChooser.addEventListener('change', function (event) {
                var file = $dazzleElastic.files[0];
                alasql('SELECT * FROM FILE(?,{headers:true})', [event], function (data) {
                    $dazzleElastic.gridOptions.api.setRowData(data);
                    $dazzleElastic.gridOptions.api.refreshView();
                    $dazzleElastic.gridOptions.api.forEachNode(function (node) {
                        node.edited = true;
                    });
                });
            });
        }
        $dazzleElastic.fileChooser.click();
    }
    $dazzleElastic.export = function () {
        // var rowData = [];
        // $dazzleElastic.gridOptions.api.forEachNode(function (node) {
        //     rowData.push(node.data);
        // });
        // $dazzleElastic.alasql('SELECT * INTO XLSX("' + $dazzleElastic.table + '.xlsx",{headers:true}) FROM ?', [rowData]);
    
    
    
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
    
    
        $dazzleElastic.gridOptions.api.exportDataAsExcel(params);
    
    }
    $dazzleElastic.isObject = function (item) {
        return (typeof item === "object" && !Array.isArray(item) && item !== null);
    }
    $dazzleElastic.clean = function (obj) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
                delete obj[propName];
            }
        }
    }
    return $dazzleElastic;
});

app.factory("$dazzleFn",  function ($dazzleS3,$dazzlePopup,$dazzleUser,$dazzleInit,$mdDialog,$compile,$rootScope,$dazzleData) {
    var $dazzleFn = {};
    
    
        
        
        $dazzleFn.alasql = function () {
            return alasql;
        }
        
        
        $dazzleFn.saveImage = function (uid, file,subowner='') {
            return new Promise(function (resolve, reject) {
        
                 var s3 = new AWS.S3();
                var u = $dazzleUser.getUser();
                AWS.config = new AWS.Config();
                AWS.config.accessKeyId = u.key.AccessKeyId;
                AWS.config.secretAccessKey = u.key.SecretAccessKey;
                AWS.config.sessionToken = u.key.SessionToken;
                AWS.config.region = 'ap-northeast-1';
        
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
        
        $dazzleFn.initRenderByType = function(model,element){
            var type = element.attr('type') || 'text';
            var html;
            var content;
        	switch (type) {
        		case 'image':
        //					    scp.model.data = element.find('img').attr('src');
        		    content = model.data;
        			html = '<img style="max-width: 100%; height: auto; position: relative;" class="ng-scope" src="'+content+'">';
        
        		break;
        
        		case 'text':
        		    html = model.data;
        		break;
        
        		case 'tags':
        		    if (!Array.isArray(model.data))
        		           model.data = [model.data];
        		    html = `
        		    <md-chips
                            ng-model="model.data"
                            readonly="true"
                            md-removable="false"
                            placeholder="輸入標籤"
                            delete-button-label="刪除標籤"
                            delete-hint="按Delete 刪除標籤"></md-chips>
                    `;
        	    break;
        
        		case 'html':
        
        //						scp.model.data = element.find('.dz-panel-content').html();
        			content = model.data;
        
        			if (!content)
        			    content = '請寫上一些東西';
        			//html = '<panel>'+$dazzleUser.dazzleInfo['toolbar']+'<dz-text class="dz-panel-content" style="min-height:50px;">'+content+'</dz-text></panel>';
        		    html = content;
        		break;
        	}
        
            element.html(html);
        
        	//return html;
        }
        
        
        $dazzleFn.renderByType = function(scp,element){
            var type = element.attr('type') || 'text';
            var html;
            var content;
        	switch (type) {
        		case 'image':
        
        		    scp.model.data = element.find('.dz-panel-content').find('img').attr('src');
        		    content = scp.model.data;
        			html = '<img style="max-width: 100%; height: auto; position: relative;" class="ng-scope" src="'+content+'">';
        
        		break;
        
        		case 'text':
        		    html = scp.model.data;
        		break;
        
        		case 'tags':
        		    if (!Array.isArray(scp.model.data))
        		           scp.model.data = [scp.model.data];
        		    html = `
        		    <md-chips
                            ng-model="model.data"
                            readonly="true"
                            md-removable="false"
                            placeholder="輸入標籤"
                            delete-button-label="刪除標籤"
                            delete-hint="按Delete 刪除標籤"></md-chips>
                    `;
        	    break;
        
        		case 'html':
        
        			scp.model.data = element.find('.dz-panel-content').html();
        			content = scp.model.data;
        
        			if (!content)
        			    content = '請寫上一些東西';
        			//html = '<panel>'+$dazzleUser.dazzleInfo['toolbar']+'<dz-text class="dz-panel-content" style="min-height:50px;">'+content+'</dz-text></panel>';
        		    html = content;
        		break;
        	}
        
        	return html;
        }
        
        $dazzleFn.updateInputByType = function(scp,element) {
        	var html;
        	var type = element.attr('type') || 'text';
        	var ele;
        	switch (type) {
        		case 'image':
        
        		var content = '<img dz-image context-menu="menuOptions" style="max-width: 100%; height: auto; position: relative;" class="ng-scope" ng-src="{{model.data}}">';
        		var src = scp.model.data || "http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg";
        
        		html = '<panel>'+$dazzleUser.dazzleInfo['simple-toolbar']+'<div class="dz-panel-content">'+content+'</div></panel>';
                ele = angular.element(html);
        
        		break;
        
        		case 'text':
        			content = '<input type="text" ng-model="model.data" placeholder="輸入資料" ng-keypress="myFunct($event)"/>';
        			html = '<panel>'+$dazzleUser.dazzleInfo['simple-toolbar']+'<span class="dz-panel-content">'+content+'</span></panel>';
        
        		break;
        
        		case 'tags':
        		    if (!Array.isArray(scp.model.data))
        		           scp.model.data = [scp.model.data];
        		    content = `
        		    <md-chips
                            ng-model="model.data"
                            readonly="false"
                            md-removable="true"
                            placeholder="輸入標籤"
                            delete-button-label="刪除標籤"
                            delete-hint="按Delete 刪除標籤"></md-chips>
                    `;
        			html = '<panel>'+$dazzleUser.dazzleInfo['simple-toolbar']+'<span class="dz-panel-content">'+content+'</span></panel>';
        	        ele = angular.element(html);
        	    break;
        
        		case 'html':
        
        			content = scp.model.data;
        			if (!content)
        			    content = '請寫上一些東西';
        			html = '<panel>'+$dazzleUser.dazzleInfo['simple-toolbar']+'<dz-text class="dz-panel-content" style="min-height:50px;">'+content+'</dz-text></panel>';
        
        		break;
        
        
        		case 'album':
        
        		        var container = document.createElement("div");
        		        var ele;
                        container.setAttribute("layout", "row");
                        container.setAttribute("layout-align", "center center");
                        button = document.createElement('button');
                        button.innerHTML = "圖片管理";
                        container.appendChild(button);
        
        
        
                        button.addEventListener('click', function () {
        
                            var params = {
                                "name":"dzGalleryPopup",
                                "directive":"<dz-gallery-popup></dz-gallery-popup>"
        
                            }
                            $dazzlePopup.callPopup(params).then(function (images) {
        
                            });
                        });
        
        
        	    	content = scp.model.data || [ "http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg"];
        			if (!content)
        			    content = [ "http://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg"];
        
        			html = '<panel>'+$dazzleUser.dazzleInfo['simple-toolbar']+'<div class="dz-panel-content" style="min-height:50px;"></div></panel>';
                    ele = angular.element(html);
                    ele.find('.dz-panel-content').append(container);
        
        
        		    break;
        	}
        
        
        	element.html(ele);
            $compile(element.contents())(scp);
        
        }
        
        
         $dazzleFn.saveAtom = function () {
            var userBucket = $dazzleUser.getDazzleInfo('userBucket');
            var websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
            var websiteId = $dazzleUser.dazzleInfo['websiteId'];
            var thisPage = $dazzleUser.getDazzleInfo('thisPage');
        	var isData = $dazzleUser.dazzleInfo['isData'];
        	var atom = $dazzleUser.dazzleInfo['atom'];
            var thisLang = $dazzleUser.getDazzleInfo('thisLang');
        
            console.log('My Dazzle Page',thisPage);
            console.log('Save Query',atom);
            for (key in atom){
                var item = atom[key];
                $dazzleFn.saveElasticAtom(key, item,false);
            }
        }
        
         $dazzleFn.loadAtom = function () {
            var userBucket = $dazzleUser.getDazzleInfo('userBucket');
            var websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
            var websiteId = $dazzleUser.dazzleInfo['websiteId'];
            var thisPage = $dazzleUser.getDazzleInfo('thisPage');
        	var isData = $dazzleUser.dazzleInfo['isData'];
        	var atom ={};
            var thisLang = $dazzleUser.getDazzleInfo('thisLang');
        
            console.log('My Dazzle Page',thisPage);
        
        
            return new Promise(function (resolve, reject) {
                var query = {
                    "action":"searchData",
                    "index":$dazzleUser.getUser().uid,
                    "type":"_atom",
                    "body":{
                        "query":{
                             "bool": {
                                  "filter": [
                                    { "match": { "websiteid": websiteId  }},
                                    { "match": { "pageName": thisPage }}
                                  ]
                                }
                        }
                    }
                }
        
                console.log('load Atom',query);
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": query
        
                }).then(function (result) {
                    console.log('Load Atom Result',result);
                    if (result.data.code < 0) {
                        resolve([]);
        
                    } else {
                        if (!Array.isArray(result.data.resolve))
                            result.data.resolve = [result.data.resolve];
                        console.log(result.data.resolve);
                        resolve(result.data.resolve);
                    }
                });
        
        
            });
        }
        
         $dazzleFn.useTemplate = function (obj) {
            return new Promise(function (rs, rj) {
                // if (scp.model.isDb)
                //     $dazzleFn.saveDataValue(scp.model.db,scp.model.data);
                $dazzleFn.updateHtml(obj);
                rs();
            });
        }
        
        $dazzleFn.updateHtml = function(obj){
            console.log('Load Obj',obj);
            var atom = $dazzleUser.dazzleInfo['atom'];
            switch(obj.type){
                case 'dzImage':
                    if(!obj.data)
                        obj.data = "http://st.motortrend.com/uploads/sites/5/2015/11/noimage.png?interpolation=lanczos-none&fit=around|300:200";
        
                    $('#'+obj.id).attr('src',obj.data);
                    break;
        
                default:
        
                break;
            }
        
            atom[obj.id] = obj;
        
            $dazzleUser.setDazzleInfo('atom',atom);
        
            $dazzleFn.saveElasticAtom(obj.id, obj,false);
        
            console.log('Update Html',atom);
        //                $dazzleFn.saveElasticAtom(obj.id,obj,false);
        
        }
        
        $dazzleFn.saveDataValue = function(db,value){
            return new Promise(function (rs, rj) {
        
                var query = {
                    "action":"saveField",
                    "index":db.index,
                    "type":db.table,
                    "field":db.field,
                    "id":db.id,
                    "value":value
                }
                console.log('Save Data',query);
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": query
        
                }).then(function (result) {
                    // console.log(field,result);
                    if (result.data.code < 0) {
                        rj();
        
                    } else {
                        rs();
                    }
                });
            });
        
        };
        $dazzleFn.getDataValue = function(db){
        
        
            return new Promise(function (rs, rj) {
        
                var query = {
                    "action":"getField",
                    "index":db.index,
                    "type":db.table,
                    "field":db.field,
                    "id":db.id
                }
                console.log('Get Data Value',query);
        
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": query
        
                }).then(function (result) {
                    console.log('Get Data Value',query,result);
                    if (result.data.code < 0) {
                        rs(null);
        
                    } else {
                        rs(result.data.resolve);
                    }
                });
            });
        }
        
        
        $dazzleFn.removePanel = function(){
        
            var html,ele,id,type;
        
            var atom = $dazzleUser.dazzleInfo['newAtom'];
        
            ele = angular.element('panel');
            id = ele.parent().attr('id');
            type = ele.parent().attr('type') || 'text';
            console.log('Panel Parnet',id,type);
            html = ele.find('.dz-panel-content').html();
            if (type=='html') {
                atom[id].data = html;
                console.log('Remove Html',atom[id].data);
            }
        
        
            ele2 = angular.element(html);
            ele.replaceWith(ele2);
        
            $dazzleUser.dazzleInfo['newAtom'] =atom;
            $dazzleFn.saveElasticAtom(id,atom[id],false);
        
        }
        $dazzleFn.editorCustomInit = function (scp, element, attr) {
            return new Promise(function (resolve, reject) {
        
        
                scp.id = element.attr('id') || "ele" + new Date().getTime();
        
                element.attr('id', scp.id);
        //                    element.attr('custom', scp.type);
        
                console.log('Editor ID',scp.id);
                var thisPageJson = $dazzleUser.getDazzleInfo('thisPageJson');
                var masterJson = $dazzleUser.getDazzleInfo('masterJson');
        
                console.log(thisPageJson);
        
                $dazzleFn.loadElasticAtom(scp.id,true).then(function(item){
                    console.log('Success Load');
                    scp.model = item;
                    $dazzleFn.useTemplate(item).then(function(){
                        resolve();
                    });
        
                },function(err){
                    console.log('Fail Load');
                    obj = {
                        "id": scp.id,
                        "type": scp.type,
                        "html": "Hello World" + " - " + scp.id + "[" + scp.type + "]",
                        "isDb":false
                    };
                    if ($.trim(element.html())) {
                        //this new atom have content
                        obj.html = element.html();
                        scp.model = obj;
                        $dazzleFn.saveElasticAtom(scp.id, obj,true);
                        resolve();
                    } else {
                        //this atom no content, get template
                        scp.model = obj;
                        resolve();
                    }
        
                });
        
        
        
        
        
        
            });
        };
        
        $dazzleFn.getElasticAtom = function (id,atom,isMaster) {
            return new Promise(function (resolve, reject) {
               console.log('Get Elastic Atom');
        
                var atom = $dazzleUser.getDazzleInfo('atom');
                var key;
                if(isMaster)
                    key = $dazzleUser.dazzleInfo['websiteId']+"-master-"+id;
                else
                    key = $dazzleUser.dazzleInfo['websiteId']+"-"+$dazzleUser.dazzleInfo['thisPage']+"-"+id;
        
                var object ={};
                var params = {
                        "action": "getData",
                        "index": $dazzleUser.getUser().uid,
                        "type": "_atom",
                        "id": key
                    };
                    console.log('Get Elastic Atom',params);
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data":params
                }).then(function (result) {
                    console.log('Get Elastic Atom',result);
                    if (result.data.code < 0) {
                        reject();
                    } else {
                        resolve(result.data.resolve);
                    }
                });
            });
        };
        
        
        $dazzleFn.loadElasticAtom = function (id, isMaster) {
           return new Promise(function (resolve, reject) {
        
               if (isMaster)
                   key = $dazzleUser.dazzleInfo['websiteId']+"-master-"+id;
               else
                   key = $dazzleUser.dazzleInfo['websiteId']+"-"+$dazzleUser.dazzleInfo['thisPage']+"-"+id;
        
        
        //                   var object =JSON.stringify(atom);
        //                    var dbIndex = atom.isDb ? atom.db.index : '';
        //                    var dbField = atom.isDb? atom.db.field : '';
        //                    var dbTable = atom.isDb? atom.db.table : '';
        //                    var dbId = atom.isDb? atom.db.id : '';
        
               // if (atom.isDb)
               //     $dazzleData.saveElasticFieldRecord(dbIndex,dbTable,dbField,dbId,atom['data']);
        
                var data = {
                    "action": "getData",
                       "index": $dazzleUser.getUser().uid,
                       "type": "_atom",
                       "id": key
                };
                console.log('Query',data);
               $http({
                   "method": "post",
                   "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                   "data": data
               }).then(function (result) {
                   if (result.data.code < 0) {
                        reject();
                   } else {
                      var item = result.data.resolve;
                      var obj = JSON.parse(item.object);
                    //   if (obj.isDb)
                    //         $dazzleFn.getDataValue(obj.db).then(function(value){
                    //             obj.data = value;
                    //             resolve(obj);
                    //         });
                    //   else
                       resolve(obj);
                   }
               });
           });
        };
        
        $dazzleFn.saveElasticAtom = function (id, atom,isMaster) {
        
            return new Promise(function (resolve, reject) {
        
                if (isMaster)
                    key = $dazzleUser.dazzleInfo['websiteId']+"-master-"+id;
                else
                    key = $dazzleUser.dazzleInfo['websiteId']+"-"+$dazzleUser.dazzleInfo['thisPage']+"-"+id;
        
        
                var object =JSON.stringify(atom);
                var dbIndex = atom.isDb ? atom.db.index : '';
                var dbField = atom.isDb? atom.db.field : '';
                var dbTable = atom.isDb? atom.db.table : '';
                var dbId = atom.isDb? atom.db.id : '';
        
                // if (atom.isDb)
                //     $dazzleData.saveElasticFieldRecord(dbIndex,dbTable,dbField,dbId,atom['data']);
                var data = {
                        "action": "addData",
                        "index": $dazzleUser.getUser().uid,
                        "type": "_atom",
                        "id": key,
                        "body": {
                                "id":key,
                                "objectid":id,
                                "isMaster": isMaster,
                                "language": '',
                                "object":object,
                                "pageName":$dazzleUser.dazzleInfo['thisPage'],
                                "websiteid":$dazzleUser.dazzleInfo['websiteId'],
                                "isDb":atom.isDb,
                                "dbIndex":dbIndex,
                                "dbTable":dbTable,
                                "dbField":dbField,
                                "dbId":dbId
                        }
                    };
                console.log('Save Query',data);
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": data
                }).then(function (result) {
                    if (result.data.code < 0) {
                        reject(result.data.text);
                    } else {
                        // if (atom.isDb)
                        //     $dazzleFn.saveDataValue(atom.db,atom.data);
                        resolve(result.data.text);
                    }
                });
            });
        };
        
        $dazzleFn.createElasticAtom = function (id, atom,isMaster) {
        
            return new Promise(function (resolve, reject) {
                var isMaster;
                var key;
        
                if(isMaster)
                    key = $dazzleUser.dazzleInfo['websiteId']+"-master-"+id;
        
                else
                    key = $dazzleUser.dazzleInfo['websiteId']+"-"+$dazzleUser.dazzleInfo['thisPage']+"-"+id;
        
        
                var object =JSON.stringify(atom);
                var dbIndex = atom.isDb ? atom.index : '';
                var dbField = atom.isDb? atom.field : '';
                var dbTable = atom.isDb? atom.table : '';
                var dbId = atom.isDb? atom.did : '';
        
                // if (atom.isDb)
                //     $dazzleData.saveElasticFieldRecord(dbIndex,dbTable,dbField,dbId,atom['data']);
        
        
                var params ={
                        "action": "createData",
                        "index": $dazzleUser.getUser().uid,
                        "type": "_atom",
                        "id": key,
                        "body": {
                            "id":key,
                            "objectid":id,
                            "isMaster": isMaster,
                            "language": '',
                            "object":object,
                            "pageName":$dazzleUser.dazzleInfo['thisPage'],
                            "websiteid":$dazzleUser.dazzleInfo['websiteId'],
                            "isDb":atom.isDb,
                            "dbIndex":dbIndex,
                            "dbTable":dbTable,
                            "dbField":dbField,
                            "dbId":dbId
                        }
                    };
                 console.log('Create Elastic Atom',params);
        
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": params
                }).then(function (result) {
        
                    console.log('Result',result);
                    if (result.data.code < 0) {
                        reject(result.data.text);
                    } else {
                        resolve(result.data.text);
                    }
                });
            });
        };
        
        
        $dazzleFn.updateRootPage = function(){
            return new Promise(function(resolve,reject){
                console.log($dazzleUser.dazzleInfo);
                console.log('This Page',$dazzleUser.dazzleInfo['thisPage']);
                var thisPage = $dazzleUser.dazzleInfo['singlePage'];
        
            //  $dazzleFn.mountDbToAtom().then(function(){
                    $dazzleS3.getFile($dazzleUser.dazzleInfo['userBucket'],$dazzleUser.dazzleInfo['websiteKey']+'page/'+thisPage+'/page.html').then(function(html){
                        var page = angular.element("<div>"+html+"</div>");
        
                            var atom = $dazzleUser.dazzleInfo['atom'];
                            console.log('Update Atom',atom);
                            for (key in atom) {
                                console.log('Key',key);
                                var item = atom[key];
                                if (item.hasOwnProperty('db')){
                                    console.log('DB key',key,atom[key].html);
                                    page.find('#'+key).html(atom[key].html.replace(/(\sng-\w+-\w+="(.|\n)*?"|\sng-\w+="(.|\n)*?"|\sng-(\w+-\w+)|\sng-(\w+))/g, "")
                                        .replace(/<!--(.*?)-->/gm, ""));
                                }
                            }
                            var newHtml = page.html();
                            console.log('New HTML',newHtml);
                            $dazzleS3.saveFile($dazzleUser.dazzleInfo['userBucket'],$dazzleUser.dazzleInfo['websiteKey']+'page/'+thisPage+'/page.html',newHtml).then(function(){
                                console.log('Saved Html');
                                resolve();
                            });
        
        
                    });
             //   });
        
            });
        }
        
        $dazzleFn.mountFieldToAtom = function(table,field,value) {
            var key = $dazzleFn.findDbMatchAtom(table,field);
            console.log('Mount To Atom',table,field,key,value);
        
            if (key !=null) {
                $dazzleData.getFieldSchemaByFieldName(table,field).then(function(schema) {
                        myModel = $dazzleUser.dazzleInfo['atom'][key];
                        console.log('My Schema',schema);
                        console.log('Mount', myModel, $dazzleUser.dazzleInfo['atom']);
                        console.log('My Directive', schema['directive'], value);
                        $dazzleFn.createInitValueByType(schema['directive'], value).then(function (newValue) {
                            console.log('New Value',key,value);
                            $dazzleUser.dazzleInfo['atom'][key].value = newValue;
                            $dazzleFn.updateAtomHtmlByTemplate(key).then(function(){
                                $dazzleInit.saveAtom();
                            });
                        });
                });
        
            }
        }
        
        
        $dazzleFn.saveDirectiveIntoAtom = function(key,table,field){
            return new Promise(function(resolve,reject) {
                $dazzleData.loadSchemaDirectiveByTableAndField(table, field).then(function (directive) {
                    console.log('Directive',directive);
                    $dazzleUser.dazzleInfo['atom'][key].db.directive = directive.directive;
                    resolve();
                });
            });
        }
        
        $dazzleFn.mountDbToAtom = function() {
            return new Promise(function(resolve,reject) {
                var atom = $dazzleUser.dazzleInfo['atom'];
                console.log('Mount DB To Atom',atom);
                var thisTable = $dazzleUser.dazzleInfo['thisTable'];
                for (key in atom) {
                    var item = atom[key];
                    console.log('Item', item);
                    if (item.hasOwnProperty('db')) {
                        //                        console.log('DB key',key,item,table,field);
                        if (thisTable == item.db.table) {
                            $dazzleFn.updateAtomHtmlByTemplate(key);
                        }
                    }
                }
                resolve();
            });
        }
        
        $dazzleFn.updateAtomHtmlByTemplate = function(id) {
            return new Promise(function(resolve,reject){
        
                myModel = $dazzleUser.dazzleInfo['atom'][id];
        
                if (!angular.isUndefined(myModel.template)) {
                    var htmlCode = myModel.template.htmlCode;
        
        
                    var scope = $rootScope;
        
        
                      scope.model = myModel;
                        scope.model.data =[];
        //                        console.log('My Model',myModel);
                    scope.$apply(function() {
                        var angHtml = $compile('<div>'+htmlCode+'</div>')(scope);
                        var comHtml = angular.element(angHtml);
                        console.log('Compile HTML',angHtml);
                         setTimeout(function() {
                            myModel['html'] = angHtml.html().replace(/(\sng-\w+-\w+="(.|\n)*?"|\sng-\w+="(.|\n)*?"|\sng-(\w+-\w+)|\sng-(\w+))/g, "")
                            .replace(/<!--(.*?)-->/gm, "");
                            console.log('Compile HTML',angHtml.html().replace(/(\sng-\w+-\w+="(.|\n)*?"|\sng-\w+="(.|\n)*?"|\sng-(\w+-\w+)|\sng-(\w+))/g, "")
                            .replace(/<!--(.*?)-->/gm, ""));
                            $dazzleUser.dazzleInfo['atom'][id] = myModel;
                            console.log('My Atom',$dazzleUser.dazzleInfo['atom']);
                            resolve();
                        }, 500);
                    });
        
                } else {
                        myModel['html'] = myModel.value;
                        $dazzleUser.dazzleInfo['atom'][id] = myModel;
                        console.log('No Template',id,myModel,$dazzleUser.dazzleInfo['atom']);
                        resolve();
                }
        
            });
        }
        
        $dazzleFn.findDbMatchAtom = function(table,field){
            var atom = $dazzleUser.getDazzleInfo('atom');
            console.log('Find DB Match Atom',atom);
            for (key in atom){
                var item = atom[key];
                console.log('Item',item);
                if (item.hasOwnProperty('db')){
                    console.log('DB key',key,table,field,item.db.table,item.db.field);
        
                    if (item.db.table == table && item.db.field == field) {
                        console.log('Return Key',key);
                        return key;
                    }
                }
            }
            return null;
        }
        
        $dazzleFn.getFileUrl = function (size, id) {
        
            if (!id) {
                return null;
            }
        
        
            if (id.indexOf(".jpg")>=0) {
                id=id.replace(".jpg","");
            }
        
            return "//designerrrr-output.s3.amazonaws.com/images/"+$dazzleUser.getUser().uid+"/"+size+"/"+id+".jpg";
        }
        
        $dazzleFn.createInitValueByType = function(directive,value){
            return new Promise(function(resolve,reject){
                if (angular.isUndefined(directive))
                    resolve(value);
        
                switch(directive){
                    case 'number':
        
                        output  = value || 0;
                        resolve(String(value));
                        break;
        
                    case 'image':
        
                        output =  value || "http://dazzle.website/image/lgo.png";
                        resolve(output);
                        break;
        
                    case 'referForm':
        
                        $dazzleData.loadFormByName(value).then(function(json){
                            var schema = json.schema;
                            $dazzleS3.getFile('dazzle-template','file6.0/form-template.html').then(function(html){
                                var scope = $rootScope;
                                scope.model = json;
                                scope.userBucket = $dazzleUser.dazzleInfo['userBucket'];
                                scope.websiteKey = $dazzleUser.dazzleInfo['websiteKey'];
                                scope.$apply(function() {
                                    var angHtml = $compile('<div>'+html+'</div>')(scope);
                                    var comHtml = angular.element(angHtml);
                                    console.log('Compile HTML',angHtml);
                                    setTimeout(function() {
                                        var newHtml = angHtml.html().replace(/(\sng-\w+-\w+="(.|\n)*?"|\sng-\w+="(.|\n)*?"|\sng-(\w+-\w+)|\sng-(\w+))/g, "")
                                            .replace(/<!--(.*?)-->/gm, "");
                                        console.log('refer Form HTML',newHtml);
                                        resolve(newHtml);
                                        //                                                              $dazzleUser.dazzleInfo['atom'][id] = myModel;
                                        //                          resolve();
                                    }, 500);
                                });
                            });
                        });
        
                        break;
        
                    case 'refer':
                        console.log('We Have Refer',value);
                        var arr=[];
                        if (!Array.isArray(value))
                            arr.push(value);
                        else
                            arr = value;
        
                        // console.log(schema.cellEditorParams['table']);
                        // $dazzleData.loadDataSetByTableName(schema.cellEditorParams['table'],arr).then(function(result){
                        //     console.log('Refer Result',result);
                        //     var output = {
                        //         ids: value,
                        //         data: result
                        //     }
                        //
                        //     resolve(output);
                        // },function(err){
                        //     resolve([]);
                        // });
        
                        resolve([]);
                        break;
        
                    case 'video':
                        resolve("https://www.youtube.com/embed/" + $dazzleFn.getYouTubeID(value));
                        break;
        
                    default:
                        resolve(value);
                        break;
                }
        
            });
        }
        $dazzleFn.dataInitByType = function(db){
            return new Promise(function(resolve,reject){
                if (!angular.isUndefined(db)){
                    //var db
                    $dazzleData.getAtomData(db).then(function(value){
                        console.log('Init Value');
                       $dazzleData.getFieldSchemaByFieldName(db.table,db.field).then(function(schema){
                            console.log('We Have Schema',schema);
                            if (angular.isUndefined(schema.directive)) {
                                alert('未設定模版');
                                resolve(value);
                            }
                            if (angular.isUndefined(value) || !value) {
                                    resolve("對應Table: "+db.table+". 對應Field: "+db.field);
                            }
                            else
                                $dazzleFn.createInitValueByType(schema.directive,value).then(function(output){
                                   resolve(output);
                                });
        
                       });
                    },function(err){
        //                        console.log('Init Error');
                        $dazzleData.getFieldSchemaByFieldName(db.table,db.field).then(function(schema){
                            console.log('We Have Schema',schema);
        
                            $dazzleFn.createInitValueByType(schema.directive,null).then(function(output){
                                resolve(output);
                            });
                        });
        
                        reject();
                    });
                } else {
                    reject();
                }
            });
        }
        
        $dazzleFn.getYouTubeID = function (url) {
            var ID = '';
            url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
            if (url[2] !== undefined) {
                ID = url[2].split(/[^0-9a-z_\-]/i);
                ID = ID[0];
            } else {
                ID = url;
            }
            return ID;
        }
        
        $dazzleFn.dataPopupByType = function(db,value){
            return new Promise(function(resolve,reject){
                $dazzleData.getTypeByFieldName(db.table,db.field).then(function(type){
        
                    switch(type) {
                        case 'text':
                        case 'number':
                        case 'email':
                        case 'password':
                            var confirm = $mdDialog.prompt()
                                .title('你要變更資料嗎?')
                                .textContent('輸入你的資料')
                                .placeholder(db.field)
                                .initialValue(value)
                                .required(true)
                                .ok('變更')
                                .cancel('取消');
        
                            $mdDialog.show(confirm).then(function(result) {
                                resolve(result);
        
                            });
        
                            break;
                        case 'video':
                            var confirm = $mdDialog.prompt()
                                .title('你要變更資料嗎?')
                                .textContent('輸入你的資料')
                                .placeholder(db.field)
                                .initialValue(value)
                                .required(true)
                                .ok('變更')
                                .cancel('取消');
        
                            $mdDialog.show(confirm).then(function(result) {
                                resolve("https://www.youtube.com/embed/" + $dazzleFn.getYouTubeID(result));
                            });
                            break;
                        case 'html':
        
                            console.log('HTML',value);
                            // $dazzleUser.setDazzleInfo('html',value);
                            // $dazzlePopup.html(value).then(function(output){
                            //     resolve(output);
                            // });
        
        
                            var params2 = {
                                html: value,
                                big: true,
                                name: 'htmlPopup',
                                directive:'<html-popup></html-popup>'
                            };
                            $dazzlePopup.callPopup(params2).then(function(output){
                                resolve(output);
                            });
                            break;
        
        
        
        
        
        
        
                        case 'textarea':
                        case 'code':
                            $dazzlePopup.code(value,'html').then(function(output){
                                resolve(output);
                            });
        
                            break;
        
                        case 'tag':
                            $dazzlePopup.tag(value).then(function (tags) {
                                resolve(tags);
                            });
                            break;
        
                        case 'select':
                            $dazzleData.getOptionByFieldName(db.table,db.field).then(function(result){
                                console.log('Options',result);
                                var params = {
                                    select: value,
                                    options: result,
                                    directive:"<select-popup></select-popup>"
                                };
        
                                $dazzlePopup.callPopup(params).then(function(output){
                                    //var image = output['image'];
                                    resolve(output);
                                });
                            });
                            break;
        
                        case 'refer':
                            $dazzlePopup.dataSelectById($dazzleUser.getDazzleInfo('websiteId'),db.referTable, value).then(function () {
                                resolve(true);
        
                            });
                            break;
                        case 'page':
        
                            break;
        
                        case 'multiselect':
        
                            break;
        
                        case 'image':
                            var params = {
                                directive:"<user-gallery-popup></user-gallery-popup>"
                            };
        
                            $dazzlePopup.callPopup(params).then(function(output){
                                //var image = output['image'];
                                var image = output;
                                $dazzleInit.copyFile($dazzleUser.getDazzleInfo('userBucket') + '/' + encodeURI(image.key), $dazzleUser.getDazzleInfo('exportBucket'), image.key).then(function () {
                                    var src = 'http://' + $dazzleUser.getDazzleInfo('exportBucket') + '/' + image.key;
                                    resolve(src);
                                });
                            });
                            break;
        
                        case 'gallery':
                            var params = {
                                'images':value,
                                directive:"<gallery-popup></gallery-popup>"
                            }
                            $dazzlePopup.callPopup(params).then(function (images) {
                                resolve(images);
                            });
                            break;
        
                        case 'formview':
                            break;
        
                        case 'file':
        
                            $dazzlePopup.uploadFile($dazzleUser.user.uid).then(function(uploaded){
                                resolve(uploaded);
                            });
                            break;
        
        
                        case 'datetime':
                        case 'date':
                        case 'time':
                            $mdDialog.show({
                                templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/recoveryPopup/popup.html' + '?id=' + new Date().getTime(),
                                controller: 'recoveryPopupController',
                                clickOutsideToClose: true,
                                locals: {
                                    rootScope: $dazzleUser.getRootScope()
                                }
                            }).then(function (date) {
                                resolve(date);
                            });
                            break;
        
                        case 'button':
                            break;
                        case 'checkbox':
                            break;
                    }
        
                });
            });
        }
        
        $dazzleFn.getUserForms = function (userId, websiteId) {
            return new Promise(function (resolve, reject) {
                var tables = [];
                if (userId, websiteId) {
                    $dazzleS3.listObject('dazzle-user-' + userId, 'website/' + websiteId + '/content/').then(function (files) {
                        for (var i = 0; i < files.length; i++) {
                            var file = files[i].Key.split('\\').pop().split('/').pop();
                            if (file && file.length > 0) {
                                var filename = file.split('.')[0];
                                var fileExtension = file.split('.')[1];
                                if (filename && filename.length > 0) {
                                    var isTable = filename.endsWith('-form');
                                    if (isTable) {
                                        var tableName = filename.replace('-form', "");
                                        if (tableName && tables.indexOf(tableName) < 0 && tableName !== 'undefined' && tableName !== 'null') {
                                            tables.push(tableName);
                                        }
                                    }
                                }
                            }
                        }
                        resolve(tables);
                    }, function () {
                        reject();
                    });
                } else {
                    reject();
                }
            });
        }
        
        $dazzleFn.getUserTables = function (userId, websiteId) {
            return new Promise(function (resolve, reject) {
                var tables = [];
                if (userId, websiteId) {
                    $dazzleS3.listObject('dazzle-user-' + userId, 'website/' + websiteId + '/content/').then(function (files) {
                        for (var i = 0; i < files.length; i++) {
                            var file = files[i].Key.split('\\').pop().split('/').pop();
                            if (file && file.length > 0) {
                                var filename = file.split('.')[0];
                                var fileExtension = file.split('.')[1];
                                if (filename && filename.length > 0) {
                                    var isTable = filename.endsWith('-table');
                                    if (isTable) {
                                        var tableName = filename.replace('-table', "");
                                        if (tableName && tables.indexOf(tableName) < 0 && tableName !== 'undefined' && tableName !== 'null') {
                                            tables.push(tableName);
                                        }
                                    }
                                }
                            }
                        }
                        resolve(tables);
                    }, function () {
                        reject();
                    });
                } else {
                    reject();
                }
            });
        }
        $dazzleFn.getTableTable = function (userId, websiteId, tableName) {
            return new Promise(function (resolve, reject) {
                $dazzleS3.getJson('dazzle-user-' + userId, 'website/' + websiteId + '/content/' + tableName + '-table.json').then(function (json) {
                    resolve(json);
                }, function () {
                    reject();
                });
            });
        }
        $dazzleFn.getTableSchema = function (userId, websiteId, tableName) {
            return new Promise(function (resolve, reject) {
                $dazzleS3.getJson('dazzle-user-' + userId, 'website/' + websiteId + '/content/' + tableName + '-schema.json').then(function (json) {
                    resolve(json);
                }, function () {
                    reject();
                });
            });
        }
        
        $dazzleFn.saveWebsite6Record = function(dazzleInfo,websiteInfo){
        
        }
    return $dazzleFn;
});

 
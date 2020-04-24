I
import jQuery from 'jquery';
import $ from 'jquery';

require('webpack-jquery-ui');
require('webpack-jquery-ui/css'); 

import AWS from 'aws-sdk';
import angular from 'angular';
//import interact from './js/interact.min.js';
import moment from 'moment';
import store from 'store';
import alasql from 'alasql';
import bootstrap from 'bootstrap';
//import ace from 'ace';
//import brace from "brace";
//import "brace/mode/json";
//import 'brace/mode/javascript';
//import "brace/theme/eclipse";

//var editor = ace.edit('javascript-editor');
//editor.getSession().setMode('ace/mode/javascript');
//editor.setTheme('ace/theme/monokai');
import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';


const MediumEditor =require('medium-editor');
import Aviary from './js/aviary-editor.js';
import hotkeys from './js/hotkeys.js';
import agGrid from  './js/ag-grid-enterprise-11.0.0.min.js';
import AutoList from './js/autolist.min.js';
require("slick-carousel");
const ngAnimate = require('angular-animate');
const ngTouch  = require('angular-touch');
const ngMessages = require('angular-messages');

const ngMaterial =require('angular-material');
const ezfb = require('angular-easyfb');
require('angular-slick');
// const angularGrid =require('angular-grid');
const angularGrid =require('angulargrid');

const oclazyload = require('oclazyload');
const uiBootstrap = require('angular-ui-bootstrap');
const uiTree =require('angular-ui-tree');
const uiSortable =require('angular-ui-sortable');
const uiAce =require('angular-ui-ace');
const uiBootstrapContextMenu = require('angular-bootstrap-contextmenu');
import ngMaterialSidemenu from './js/angular-material-sidemenu.js';
import angularMoment from './js/angular-moment.min.js';
import slickCarousel from './js/angular-slick-3.1.7.min.js';
import lfNgMdFileInput from './js/angular-material-fileinput-1.5.2.js';
import mdTimePicker from './js/angular-material-timepicker-1.0.7.js';
import atMultirangeSlider from './js/angular-multirange-slider-1.1.1.js';
import cfpHotkeys from './js/hotkeys.js';



window.MediumEditor = MediumEditor;
window.AutoList = AutoList;
window.moment = moment;
window.store = store;
window.alasql = alasql;
window.Aviary = Aviary;
window.$ = $;
window.jQuery = jQuery;
window.angular = angular;
window.brace = brace;


        console.log('dazzle.js');
        console.log(Aviary);
        // agGrid.LicenseManager.setLicenseKey("ag-Grid_Evaluation_License_Not_for_Production_100Devs21_June_2017__MTQ5Nzk5OTYwMDAwMA==896e8af7accaf15a04ddf6b6577c55c8");
        agGrid.LicenseManager.setLicenseKey("ag-Grid_Evaluation_License_Key_Not_for_Production_100Devs26_March_2018__MTUyMjAxODgwMDAwMA==e8f8bbc1ff5aff3ac920e42d0542b6c9");
        agGrid.initialiseAgGridWithAngular1(angular);


        jQuery.fn.outerHTML = function(s) {
            return s
                ? this.before(s).remove()
                : jQuery("<p>").append(this.eq(0).clone()).html();
        };
		 
        var dazzle = angular.module("dazzle", ['ngMaterial', 'ngMessages',
		'ngTouch', 'agGrid', 'angularGrid', 'oc.lazyLoad','ui.bootstrap','ui.tree','ui.ace','ui.sortable','ui.bootstrap.contextMenu',
		'ngMaterialSidemenu','angularMoment','slickCarousel','lfNgMdFileInput','md.time.picker','at.multirange-slider','cfp.hotkeys']);
	/*	
				dazzle.service('$dazzleUser', function ($http, $location,$interval) { 
				
				});
		
		        dazzle.service('$dazzleS3', function ($http, $location,$interval) { 
				
				});
				dazzle.service('$dazzlePopup', function ($http, $location,$interval) { 
				
				});
				dazzle.service('$dazzleInit', function ($http, $location,$interval) { 
				
				});
				dazzle.service('$dazzleData', function ($http, $location,$interval) { 
				
				});
				dazzle.service('$dazzleFn', function ($http, $location,$interval) { 
				
				});
				
	*/			
    // app.config(function (ezfbProvider) {
    //     *
    //      * Basic setup
    //      *
    //      * https://github.com/pc035860/angular-easyfb#configuration
         
    //     ezfbProvider.setInitParams({
    //         appId: '386469651480295'
    //     });
    // })

        dazzle.config(function ($sceDelegateProvider) {
            $sceDelegateProvider.resourceUrlWhitelist([
                'self',
                'https://rawgithub.com/**',
                'https://rawgithub.com/**',
                'https://s3-ap-southeast-1.amazonaws.com/**',
                'http://s3-ap-southeast-1.amazonaws.com/**',
                'https://s3-ap-northeast-1.amazonaws.com/**',
                'http://s3-ap-northeast-1.amazonaws.com/**',
                'https://dazzle-template.s3.amazonaws.com/**',
                'http://dazzle-template.s3.amazonaws.com/**'
            ]);
        });


         //  dazzle.config(function(ngAviaryProvider) {
         //      ngAviaryProvider.configure({
         //          apiKey: 'cdafe997-4562-44ad-a074-6a79cd643067',
         //          theme: 'light',
         //          tools: 'all',
         //          language: "zh_HANT",
         //          apiVersion: 3
         //      })
         // });

        

        dazzle.config(function ($sceProvider, $mdDateLocaleProvider) {
            moment.locale('zh-HK');
            $mdDateLocaleProvider.formatDate = function (date) {
                return moment(date).format('DD/MM/YYYY');
            };

            $mdDateLocaleProvider.parseDate = function (dateString) {
                var m = moment(dateString, 'DD/MM/YYYY', true);
                return m.isValid() ? m.toDate() : new Date(NaN);
            };

            $sceProvider.enabled(false);
        });
        dazzle.service('$dazzleUser', function ($http, $location,$interval, hotkeys) {
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


            this.getHotKeys = function () {
                return hotkeys;
            }
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

        });
        dazzle.service('$dazzleInit',function($dazzleUser,$location, $dazzleS3,$http, $compile, $templateRequest, $interval, $mdDialog, $uibModal, $dazzlePopup, $ocLazyLoad,hotkeys){
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
//                            scope.websiteId = $dazzleUser.getDazzleInfo('websiteId');

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
//                    scope.websiteId = 'www.hot-yeah.com';
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
//                        scope.logout();
                    });
                } else {

//                    scope.logout();
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
						scope.thisPage = filename;

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
//                    templateUrl: "https://dazzle-template.s3.amazonaws.com/builder6.0/dazzleToolbar/element.html?id=" + new Date().getTime(),

                    // $dazzleS3.getFile("dazzle-template", "file6.0/toolbar.html").then(function (result) {
                    //     scope.toolbar = result;
                    //     console.log('Tool Bar', result);
                    // });
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



            scope.loadDirectiveInfo = function() {

                console.log($dazzleUser.getDazzleInfo('customDirectivesJson'));
                console.log($dazzleUser.getDazzleInfo('coreDirectivesJson'));


                return new Promise(function (resolve, reject) {

                    console.log('%c-----------------Load Directive Info-----------------', "color: blue; font-size:30px;");

                    Promise.all([
                        scope.loadCustomDirectives(),
                        scope.loadCoreDirectives()
                    ]).then(function (result) {
                        scope.customDirectivesJson = result[0];
                        scope.coreDirectivesJson = result[1];

                        console.log("2.1", "Custom Directives", ":", result[0]);
                        console.log("2.2", "Core Directives", ":", result[1]);

                        $dazzleUser.setDazzleInfo('customDirectivesJson', scope.customDirectivesJson);
                        $dazzleUser.setDazzleInfo('coreDirectivesJson', scope.coreDirectivesJson);
                        $dazzleUser.setDazzleInfo('coreDirectivesJson',[]);
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
				var atom = $dazzleUser.dazzleInfo['atom'];
				
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
//                    scope.saveRootHtml().then(function () {
                        scope.saveMasterAtom();
                        console.log("Atom:", atom);
                        console.log("Master Atom:", masterAtom);
                        scope.saveAtom().then(function(){
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

                var thisPageJson = {};

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
                    templateUrl: 'https://dazzle-template.s3.amazonaws.com/cdn6.0/models/infoPopup/popup.html' + "?id=" + new Date().getTime(),
                    locals: {
                        rootScope: scp
                    }
                });
            };
            scope.export = function (scp) {
                scope.saveAtom().then(function(){
                    console.log('Non Single Page');
                    $mdDialog.show({
                        templateUrl: 'https://dazzle-template.s3.amazonaws.com/cdn6.0/models/nonSingleExportPopup/popup.html' + '?id=' + new Date().getTime(),
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
                    templateUrl: 'https://dazzle-template.s3.amazonaws.com/cdn6.0/models/recoveryPopup/popup.html' + '?id=' + new Date().getTime(),
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
                            templateUrl: "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/loadingPopup/popup.html" + "?id=" + new Date().getTime(),
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
//                                store.set('thispage', 'index');
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
//                var myDirective = $dazzleUser.setDazzleInfo('myDirective');
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

//                        $compile($element.find(name).contents())($scope);
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
                    $dazzleS3.getJson(userBucket, websiteKey + 'json/' + thisPage + '.json').then(function (json) {
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
            scope.loadCustomDirectives = function () {
                console.log('Load Custom Directive');
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
                                reject();
                            }
                        }, function () {
                            reject();
                        });

                    // function done(id) {
                    //     directives.push(id);
                    //     if (directives.length == directiveIdArray.length) {
                    //         $dazzleUser.setDazzleInfo('customDirectivesJson', directives);
                    //         resolve(directives);
                    //     }
                    // }

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

            scope.editRootHtml = function () {

                var atom = $dazzleUser.getDazzleInfo('atom');
                var masterAtom = $dazzleUser.getDazzleInfo('masterAtom');

                $dazzlePopup.code($('#root').html(), 'html').then(function (newCode) {
                    var rootHtml = angular.element("<div></div>").append(newCode);
                    scope.unwrap(rootHtml);
                    rootHtml.find("[custom]").each(function (index, element) {
                        var id = $(element).attr('id');
                        if (!angular.isUndefined(atom[id])) {
                            atom[id].html = $(element).html();
                            $dazzleUser.setDazzleInfo('atom',atom);
                        }
                    });

                    rootHtml.find("[master]").each(function (index, element) {
                        var id = $(element).attr('id');
                        if (!angular.isUndefined(masterAtom[id])) {
                            masterAtom[id].html = $(element).html();
                        }
                    });

                    //scope.$apply(function () {
                        //scope.rootHtml = rootHtml.html();
                    $dazzleUser.setDazzleInfo('atom',atom);
                    $dazzleUser.setDazzleInfo('masterAtom',masterAtom);
                    $dazzleUser.setDazzleInfo('rootHtml',rootHtml.html());
                    //});

                    setTimeout(function () {
                        scope.save();
//                        angular.element(document.getElementById('editor-header')).scope().saveAtom();
                    }, 1000);
                });
            }

   
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
            scope.loadingWithTimer = function (title, content, second) {
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
                            <h2 style="text-align:center;">請等候{{needSecond-usedSecond}}秒</h2>
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
                        controller: function (scope, $interval, $mdDialog, title, content, second) {
                            scope.title = title;
                            scope.content = content;
                            scope.needSecond = second;
                            scope.usedSecond = 0;
                            scope.everyScondPercentage = 100 / second;
                            $interval(function () {
                                scope.usedSecond++;
                                if (scope.usedSecond == scope.needSecond) {
                                    $mdDialog.hide();
                                }
                            }, 1000, 0);
                        }
                    }).then(function () {
                        resolve();
                    });
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

        });

        dazzle.service('$dazzleS3', function () {
            var that = this;
			
			
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

//                        if (data.Contents.length == 0) callback();
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
        dazzle.service('$dazzlePopup', function ($mdDialog, $mdBottomSheet, $mdToast, $ocLazyLoad, $dazzleUser) {
            var that = this;
            this.question = function (title, text, yText, nText) {
                return new Promise(function (resolve, reject) {
                    var confirm = $mdDialog.confirm()
                        .title(title)
                        .textContent(text)
                        .ariaLabel('question')
                        .multiple(true)
                        .ok(yText)
                        .cancel(nText);

                    $mdDialog.show(confirm).then(function () {
                        resolve();
                    }, function () {
                        reject();
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
            this.alert = function (title, text) {
                return new Promise(function (resolve, reject) {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .escapeToClose(false)
                            .clickOutsideToClose(false)
                            .title(title)
                            .textContent(text)
                            .ok('OK')
                    ).then(function () {
                        resolve();
                    });
                });
            };
            this.loading = function () {
                var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/loadingPopup/popup.html" + "?id=" + new Date().getTime();
                var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/loadingPopup/popup.js" + "?id=" + new Date().getTime();
                $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                    $mdDialog.show({
                        templateUrl: templateUrl,
                        controller: loadingPopupController,
                        clickOutsideToClose: false,
                        fullscreen: false
                    });
                });
            }
            this.callBottomSheet = function (params) {
                return new Promise(function (resolve, reject) {
                    $dazzleUser.setDazzleInfo('params', params);
                    var jss = [];
                    if (!angular.isUndefined(params.name) && params.name){
                        var directiveUrl = "https://dazzle-template.s3.amazonaws.com/builder6.0/"+params.name+"/element.js" + "?id=" + new Date().getTime();
                        jss.push(directiveUrl);
                    }

                    var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/modelPopup/popupModel.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/modelPopup/popup.js" + "?id=" + new Date().getTime();
                    jss.push(controllerUrl);

                    $ocLazyLoad.load(jss, {cache: false}).then(function () {
                        $mdBottomSheet.show({
                            templateUrl: templateUrl,
                            controller: modelPopupController,
                            clickOutsideToClose: true,
                            escapeToClose: true,
                            multiple: true
                        }).then(function (output) {
//                            var output = $dazzleUser.getDazzleInfo('output');
                            resolve(output);
                        }, function () {
                            reject();
                        });
                    });
                });
            }
            this.callPopup = function (params) {
                return new Promise(function (resolve, reject) {
                    $dazzleUser.setDazzleInfo('params', params);
                    var jss = [];
                    if (!angular.isUndefined(params.name) && params.name){
                        var directiveUrl = "https://dazzle-template.s3.amazonaws.com/builder6.0/"+params.name+"/element.js" + "?id=" + new Date().getTime();
                        jss.push(directiveUrl);
                    }

                    var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/modelPopup/dzPopupModel.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/modelPopup/dzPopup.js" + "?id=" + new Date().getTime();
                    jss.push(controllerUrl);

                    $ocLazyLoad.load(jss, {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: modelPopupController,
                            clickOutsideToClose: true,
                            escapeToClose: true,
                            multiple: true
                        }).then(function (output) {
//                            var output = $dazzleUser.getDazzleInfo('output');
                            resolve(output);
                        }, function () {
                            reject();
                        });
                    });
                });
            }
            this.login6 = function () {
                return new Promise(function (resolve, reject) {
                    var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/login6Popup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/login6Popup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: login6PopupController,
                            clickOutsideToClose: false,
                            escapeToClose: false,
                            multiple: true
                        }).then(function (user) {
                            resolve(user);
                        }, function () {
                            reject();
                        });
                    });
                });
            }


            this.login = function () {
                return new Promise(function (resolve, reject) {
                    var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/loginPopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/loginPopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: loginPopupController,
                            clickOutsideToClose: false,
                            escapeToClose: false,
                            multiple: true
                        }).then(function (user) {
                            resolve(user);
                        }, function () {
                            reject();
                        });
                    });
                });
            }
            this.codeManagerPopup = function () {
                return new Promise(function (resolve, reject) {
                    var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/codeManagerPopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/codeManagerPopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: 'codeManagerPopupController',
                            clickOutsideToClose: false,
                            escapeToClose: false,
                            multiple: true
                        }).then(function (result) {
                            resolve(result);
                        }, function () {
                            reject();
                        });
                    });
                });
            };

            this.directivePopup = function () {
                return new Promise(function (resolve, reject) {
                    var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/directivePopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/directivePopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: 'directivePopupController',
                            clickOutsideToClose: false,
                            escapeToClose: false,
                            multiple: true
                        }).then(function (result) {
                            resolve(result);
                        }, function () {
                            reject();
                        });
                    });
                });
            };

            this.addPagePopup = function () {
                return new Promise(function (resolve, reject) {
                    var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/addPagePopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/addPagePopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: 'addPagePopupController',
                            clickOutsideToClose: false,
                            escapeToClose: false,
                            multiple: true
                        }).then(function (result) {
                            resolve(result);
                        }, function () {
                            reject();
                        });
                    });
                });
            };


            this.recharge = function () {
                var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/rechargePopup/popup.html" + "?id=" + new Date().getTime();
                var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/rechargePopup/popup.js" + "?id=" + new Date().getTime();
                $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                    $mdDialog.show({
                        templateUrl: templateUrl,
                        controller: rechargePopupController
                    });
                });
            }
            this.sellWebsite = function (website) {
                if (website) {
                    var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/sellWebsitePopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/sellWebsitePopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: sellWebsitePopupController,
                            locals: {
                                website: website
                            }
                        });
                    });
                }
            }
            this.websiteSetting = function (websiteId) {
                if (websiteId) {
                    var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/websiteSettingPopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/websiteSettingPopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: websiteSettingPopupController,
                            locals: {
                                websiteId: websiteId
                            }
                        });
                    });
                }
            }
            this.photoDetail = function (gid, type) {
                if (!type) {
                    type = "photo";
                }
                if (gid) {
                    var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/photoDetailPopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/photoDetailPopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: photoDetailPopupController,
                            locals: {
                                gid: gid,
                                type: type
                            }
                        });
                    });
                }
            }
            this.websiteDetail = function (wid, website) {
                if (wid) {
                    var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/websiteDetailPopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/websiteDetailPopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: websiteDetailPopupController,
                            locals: {
                                wid: wid,
                                website: website || null
                            }
                        });
                    });
                }
            }
            this.buyDomain = function () {
                return new Promise(function (resolve, reject) {
                    var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/buyDomainPopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/buyDomainPopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: buyDomainPopupController,
                            multiple: true
                        });
                    }).then(function (domain) {
                        resolve(domain);
                    }, function () {
                        reject();
                    });
                });
            }

            this.formView = function (headerJson, formJson) {
                return new Promise(function (resolve, reject) {
                    var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/formViewPopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/formViewPopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: formViewPopupController,
                            multiple: true,
                            locals: {
                                headerJson: headerJson,
                                formJson: formJson
                            }
                        }).then(function (ele) {
                            resolve(ele);
                        }, function () {
                            reject();
                        });
                    });
                });
            }

            this.linkPopup = function (element, oldLink, rootScope) {
                return new Promise(function (resolve, reject) {
                    var params = {
                        "name":"linkPopup",
                        "directive":"<link-popup></link-popup>",
                        "oldLink":oldLink,
                        "element":element,
                        "big":true
                    }
                    that.callPopup(params).then(function(ele){
                        resolve(ele);
                    },function(){
                        reject();
                    });

                    // var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/linkPopup/popup.html" + "?id=" + new Date().getTime();
                    // var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/linkPopup/popup.js" + "?id=" + new Date().getTime();
                    // $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                    //     $mdDialog.show({
                    //         templateUrl: templateUrl,
                    //         controller: 'linkPopupDazzleCtrl',
                    //         multiple: true,
                    //         locals: {
                    //             element: element || null,
                    //             oldLink: oldLink || '',
                    //             rootScope: rootScope
                    //         }
                    //     }).then(function (ele) {
                    //         resolve(ele);
                    //     }, function () {
                    //         reject();
                    //     });
                    // });
                });
            }

            this.importPopup = function (json) {
                return new Promise(function (resolve, reject) {
                    var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/importPopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/importPopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
//                    controller: eval(functionName+"Controller"),
                            controller: importPopupController,
                            multiple: true,
                            clickOutsideToClose: true,
                            locals: {
                                result: json
                            }
                        }).then(function (ele) {
                            console.log('Dazzle importPopup', ele);
                            resolve(ele);
                        }, function () {
                            reject();
                        });
                    });
                });

            }


            this.popupCall = function (functionName, scope) {
                return new Promise(function (resolve, reject) {
                    var controllerName = functionName + "Controller";
                    var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/" + functionName + "/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/" + functionName + "/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
//                    controller: eval(functionName+"Controller"),
                            controller: eval(controllerName),
                            multiple: true,
                            clickOutsideToClose: true,
                            locals: {
                                rootScope: scope
                            }
                        }).then(function (ele) {
                            console.log('Dazzle popupCall', ele);
                            resolve(ele);
                        }, function () {
                            reject();
                        });
                    });
                });

            }

            this.addElement = function (scope) {
                return new Promise(function (resolve, reject) {
                    var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/addElementPopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/addElementPopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: addElementPopupController,
                            multiple: true,
                            locals: {
                                rootScope: scope
                            }
                        }).then(function (ele) {
                            console.log('Dazzle Add Element', ele);
                            resolve(ele);
                        }, function () {
                            reject();
                        });
                    });
                });
            }

            this.dataAddSelect = function (website, table) {
                return new Promise(function (resolve, reject) {
                    if (website && table) {
                        var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/dataSelectPopup/addselect.html" + "?id=" + new Date().getTime();
                        var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/dataSelectPopup/popup.js" + "?id=" + new Date().getTime();
                        $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                            $mdBottomSheet.show({
                                templateUrl: templateUrl,
                                controller: addSelectPopupController,
                                multiple: true,
                                clickOutsideToClose: true,
//                        parent:angular.element('#data-select'),
                                locals: {
                                    website: website,
                                    table: table,
                                    filter: null
                                }
                            }).then(function (data) {
                                resolve(data);
                            }, function () {
                                reject();
                            });
                        });
                    } else {
                        reject();
                    }
                });
            }

            this.dataSelect = function (website, table, ids,filter) {
                return new Promise(function (resolve, reject) {
                    if (website && table) {
                        var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/dataSelectPopup/popup.html" + "?id=" + new Date().getTime();
                        var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/dataSelectPopup/popup.js" + "?id=" + new Date().getTime();
                        $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                            $mdDialog.show({
                                templateUrl: templateUrl,
                                controller: dataSelectPopupController,
                                multiple: true,
                                clickOutsideToClose: true,
//                        parent:angular.element('#data-management'),
                                locals: {
                                    website: website,
                                    table: table,
                                    ids: ids,
                                    filter: filter
                                }
                            }).then(function (data) {
                                resolve(data);
                            }, function () {
                                reject();
                            });
                        });
                    } else {
                        reject();
                    }
                });
            }
            this.dataSelectById = function (website, table, ids) {
                return new Promise(function (resolve, reject) {
                    if (website && table) {
                        var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/dataSelectByIdPopup/popup.html" + "?id=" + new Date().getTime();
                        var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/dataSelectByIdPopup/popup.js" + "?id=" + new Date().getTime();
                        $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                            $mdDialog.show({
                                templateUrl: templateUrl,
                                controller: dataSelectByIdPopupController,
                                multiple: true,
                                locals: {
                                    website: website,
                                    table: table,
                                    ids: ids || null,
                                    alasql: alasql
                                }
                            }).then(function (data) {
                                resolve(data);
                            }, function () {
                                resolve();
                            });
                        });
                    } else {
                        reject();
                    }
                });
            }
            this.dataManagement = function (website, table, filter, isForm) {
                return new Promise(function (resolve, reject) {
                    if (website && table) {
                        var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/dataManagementPopup/popup.html" + "?id=" + new Date().getTime();
                        var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/dataManagementPopup/popup.js" + "?id=" + new Date().getTime();
                        $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                            $mdDialog.show({
                                templateUrl: templateUrl,
                                controller: dataManagementPopupController,
                                multiple: true,
                                locals: {
                                    website: website,
                                    table: table,
                                    filter: filter || null,
                                    isForm: isForm || "normal",
                                    alasql: alasql
                                }
                            }).then(function (data) {
                                resolve(data);
                            }, function () {
                                resolve();
                            });
                        });
                    } else {
                        reject();
                    }
                });
            }

            this.schema = function (website, table, isForm) {
                return new Promise(function (resolve, reject) {
                    if (website && table) {
                        var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/editSchemaPopup/popup.html" + "?id=" + new Date().getTime();
                        var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/editSchemaPopup/popup.js" + "?id=" + new Date().getTime();
                        $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                            $mdDialog.show({
                                templateUrl: templateUrl,
                                controller: editSchemaPopupController,
                                clickOutsideToClose: false,
                                escapeToClose: false,
                                multiple: true,
                                locals: {
                                    website: website,
                                    table: table,
                                    isForm: isForm
                                }
                            }).then(function (json) {
                                resolve(json);
                            }, function () {
                                reject();
                            });
                        });
                    } else {
                        reject();
                    }
                });
            }
            this.saveCode = function (code, type, bucket, key) {
                return new Promise(function (resolve, reject) {
                    var params = {
                        code: code,
                        type: type,
                        bucket: bucket,
                        key: key
                    }
                    var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/editCodePopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/editCodePopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: editCodePopupController,
                            clickOutsideToClose: false,
                            escapeToClose: false,
                            multiple: true,
                            locals: {
                                params: params || {}
                            }
                        }).then(function (newCode) {
                            resolve(newCode);
                        }, function () {
                            reject();
                        });
                    });
                });
            }

            this.code = function (code, type) {
                return new Promise(function (resolve, reject) {
                    var params = {
                        code: code,
                        type: type
                    }
                    var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/editCodePopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/editCodePopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: editCodePopupController,
                            clickOutsideToClose: false,
                            escapeToClose: false,
                            multiple: true,
                            locals: {
                                params: params || {}
                            }
                        }).then(function (newCode) {
                            resolve(newCode);
                        }, function () {
                            reject();
                        });
                    });
                });
            }
            this.html = function (html) {
                return new Promise(function (resolve, reject) {
                    var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/editHtmlPopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/editHtmlPopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: editHtmlPopupController,
                            clickOutsideToClose: false,
                            escapeToClose: false,
                            multiple: true,
                            locals: {
                                html: html
                            }
                        }).then(function (newHtml) {
                            resolve(newHtml);
                        }, function () {
                            reject();
                        });
                    });
                });
            }
            this.tag = function (tags, allTags) {
                return new Promise(function (resolve, reject) {
                    if (tags) {
                        var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/editTagsPopup/popup.html" + "?id=" + new Date().getTime();
                        var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/editTagsPopup/popup.js" + "?id=" + new Date().getTime();
                        $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                            $mdDialog.show({
                                templateUrl: templateUrl,
                                controller: editTagsPopupController,
                                clickOutsideToClose: false,
                                escapeToClose: false,
                                multiple: true,
                                locals: {
                                    tags: tags,
                                    allTags: allTags || []
                                }
                            }).then(function (newTags) {
                                resolve(newTags);
                            }, function () {
                                reject();
                            });
                        });
                    } else {
                        reject();
                    }
                });
            }
            this.documents = function (files) {

                return new Promise(function (resolve, reject) {

                    console.log('Load Documents');
                    var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/editDocumentsPopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/editDocumentsPopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: editDocumentsPopupController,
                            clickOutsideToClose: false,
                            escapeToClose: false,
                            multiple: true,
                            locals: {
                                files: files
                            }
                        }).then(function (newFiles) {
                            resolve(newFiles);
                        }, function () {
                            reject();
                        });
                    });

                });
            }
            this.gallery = function (images) {
                console.log('Load Gallery');

                return new Promise(function (resolve, reject) {

                    console.log('Load Gallery')
                    var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/editGalleryPopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/editGalleryPopup/popup.js" + "?id=" + new Date().getTime();
                    $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                        $mdDialog.show({
                            templateUrl: templateUrl,
                            controller: editGalleryPopupController,
                            clickOutsideToClose: false,
                            escapeToClose: false,
                            multiple: true,
                            locals: {
                                images: images
                            }
                        }).then(function (newImages) {
                            resolve(newImages);
                        }, function () {
                            reject();
                        });
                    });

                });
            }
            this.uploadFile = function (uid) {
                return new Promise(function (resolve, reject) {
                    if (uid) {
                        var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/uploadFilePopup/popup.html" + "?id=" + new Date().getTime();
                        var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/uploadFilePopup/popup.js" + "?id=" + new Date().getTime();
                        $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                            $mdDialog.show({
                                templateUrl: templateUrl,
                                controller: "uploadFileController",
                                clickOutsideToClose: false,
                                escapeToClose: false,
                                multiple: true,
                                locals: {
                                    uid: uid
                                }
                            }).then(function (uploadedFiles) {
                                resolve(uploadedFiles);
                            }, function () {
                                reject();
                            });
                        });
                    } else {
                        reject();
                    }
                });
            }

            this.uploadImage = function (uid) {
                return new Promise(function (resolve, reject) {
                    if (uid) {
                        var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/uploadImagePopup/popup.html" + "?id=" + new Date().getTime();
                        var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/uploadImagePopup/popup.js" + "?id=" + new Date().getTime();
                        $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
                            $mdDialog.show({
                                templateUrl: templateUrl,
                                controller: uploadImageController,
                                clickOutsideToClose: false,
                                escapeToClose: false,
                                multiple: true,
                                locals: {
                                    uid: uid
                                }
                            }).then(function (uploadedFiles) {
                                resolve(uploadedFiles);
                            }, function () {
                                reject();
                            });
                        });
                    } else {
                        reject();
                    }
                });
            }
        });
        dazzle.service("$dazzleFn", function ($dazzleS3,$dazzleData,$dazzlePopup,$dazzleUser,$dazzleInit,$mdDialog,$compile,$rootScope) {
            var that = this;
            this.alasql = function () {
                return alasql;
            }



			this.updateRootPage = function(){
				return new Promise(function(resolve,reject){
					console.log($dazzleUser.dazzleInfo);
					console.log('This Page',$dazzleUser.dazzleInfo['thisPage']);
					var thisPage = $dazzleUser.dazzleInfo['singlePage'];

				//	that.mountDbToAtom().then(function(){
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
			
			this.mountFieldToAtom = function(table,field,value) {
				var key = this.findDbMatchAtom(table,field);
				console.log('Mount To Atom',table,field,key,value);

				if (key !=null) {
                    $dazzleData.getFieldSchemaByFieldName(table,field).then(function(schema) {
                            myModel = $dazzleUser.dazzleInfo['atom'][key];
                            console.log('My Schema',schema);
                            console.log('Mount', myModel, $dazzleUser.dazzleInfo['atom']);
                            console.log('My Directive', schema['directive'], value);
                            that.createInitValueByType(schema['directive'], value).then(function (newValue) {
								console.log('New Value',key,value);
                                $dazzleUser.dazzleInfo['atom'][key].value = newValue;
                                that.updateAtomHtmlByTemplate(key).then(function(){
                                    $dazzleInit.saveAtom();									
								});
                            });
                    });

				}				
			}
			

            this.saveDirectiveIntoAtom = function(key,table,field){
                return new Promise(function(resolve,reject) {
                    $dazzleData.loadSchemaDirectiveByTableAndField(table, field).then(function (directive) {
                        console.log('Directive',directive);
                        $dazzleUser.dazzleInfo['atom'][key].db.directive = directive.directive;
                        resolve();
                    });
                });
            }
			
			this.mountDbToAtom = function() {
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
                                that.updateAtomHtmlByTemplate(key);
                            }
                        }
                    }
                    resolve();
                });
			}
			
			this.updateAtomHtmlByTemplate = function(id) {
				return new Promise(function(resolve,reject){

					myModel = $dazzleUser.dazzleInfo['atom'][id];
					
					if (!angular.isUndefined(myModel.template)) {
						var htmlCode = myModel.template.htmlCode;
						

						var scope = $rootScope;


						  scope.model = myModel;
                            scope.model.data =[];
//						  console.log('My Model',myModel);
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

            this.findDbMatchAtom = function(table,field){
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

            this.getFileUrl = function (size, id) {

                if (!id) {
                    return null;
                }
                

                if (id.indexOf(".jpg")>=0) {
                    id=id.replace(".jpg","");
                }

                return "//designerrrr-output.s3.amazonaws.com/images/"+$dazzleUser.getUser().uid+"/"+size+"/"+id+".jpg";
            }

            this.createInitValueByType = function(directive,value){
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
                                            //							resolve();
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
                            resolve("https://www.youtube.com/embed/" + that.getYouTubeID(value));
                            break;

                        default:
                            resolve(value);
                            break;
                    }

                });
            }
            this.dataInitByType = function(db){
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
                                    that.createInitValueByType(schema.directive,value).then(function(output){
                                       resolve(output);
                                    });

                           });
                        },function(err){
//                        console.log('Init Error');
                            $dazzleData.getFieldSchemaByFieldName(db.table,db.field).then(function(schema){
                                console.log('We Have Schema',schema);

                                that.createInitValueByType(schema.directive,null).then(function(output){
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

            this.getYouTubeID = function (url) {
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

            this.dataPopupByType = function(db,value){
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
                                    resolve("https://www.youtube.com/embed/" + that.getYouTubeID(result));
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
                                    templateUrl: 'https://dazzle-template.s3.amazonaws.com/cdn6.0/models/recoveryPopup/popup.html' + '?id=' + new Date().getTime(),
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

            this.getUserForms = function (userId, websiteId) {
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

            this.getUserTables = function (userId, websiteId) {
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
            this.getTableTable = function (userId, websiteId, tableName) {
                return new Promise(function (resolve, reject) {
                    $dazzleS3.getJson('dazzle-user-' + userId, 'website/' + websiteId + '/content/' + tableName + '-table.json').then(function (json) {
                        resolve(json);
                    }, function () {
                        reject();
                    });
                });
            }
            this.getTableSchema = function (userId, websiteId, tableName) {
                return new Promise(function (resolve, reject) {
                    $dazzleS3.getJson('dazzle-user-' + userId, 'website/' + websiteId + '/content/' + tableName + '-schema.json').then(function (json) {
                        resolve(json);
                    }, function () {
                        reject();
                    });
                });
            }

            this.saveWebsite6Record = function(dazzleInfo,websiteInfo){

            }
        });
dazzle.service("$dazzleData", function ($window, $http, $compile, $uibModal, $mdDialog, $mdToast, $mdBottomSheet, $ocLazyLoad, $mdDateLocale, $dazzleS3, $dazzlePopup, $dazzleUser,  moment) {

//            this = this;
    var that = this;
    this.$http = $http;
    this.$window = $window;
    this.$compile = $compile;
    this.$uibModal = $uibModal;
    this.$mdDialog = $mdDialog;
    this.$mdToast = $mdToast;
    this.$mdBottomSheet = $mdBottomSheet;
    this.$ocLazyLoad = $ocLazyLoad;
    this.$mdDateLocale = $mdDateLocale;
    this.$dazzleS3 = $dazzleS3;
    this.$dazzlePopup = $dazzlePopup;
    this.$dazzleUser = $dazzleUser;
    this.moment = moment;

    var website = $dazzleUser.getDazzleInfo('website');
    var dataKey='';


    this.user = $dazzleUser.getUser();

    console.log(that.user);


    // For New Data Function (2/11/2017)
    this.getTypeByFieldName = function(tableName,fieldName) {
        return new Promise(function (resolve, reject) {
            that.loadSchemaByTableName(tableName).then(function(schema){
                angular.forEach(schema,function(item,index){
                    if (item['field']==fieldName)
                        resolve(item['directive']);
                });
                resolve('');
            });
        });
    }
    this.getFieldSchemaByFieldName = function(tableName,fieldName) {
        return new Promise(function (resolve, reject) {
            that.loadSchemaByTableName(tableName).then(function(schema){
                angular.forEach(schema,function(item,index){
                    if (item['field']==fieldName) {
                        resolve(item);
                    }
                });
                resolve([]);
            });
        });
    }

    this.getOptionByFieldName = function(tableName,fieldName) {
        return new Promise(function (resolve, reject) {
            that.loadSchemaByTableName(tableName).then(function(schema){
                angular.forEach(schema,function(item,index){
                    if (item['field']==fieldName) {

                        resolve(item['cellEditorParams'].values);
                    }
                });
                resolve([]);
            });
        });
    }


    this.loadDataByTableJson = function (tableJson) {
        return new Promise(function (resolve, reject) {
            console.log('Table Json',tableJson);
            console.log('Table',tableJson.data.table);
            if (tableJson.data.type === 's3') {
                console.log('Load S3 Data');
                $dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $dazzleUser.getDazzleInfo('websiteId') + "/content/" + tableJson.data.table + "-data.json").then(function (json) {
                    this.dataLength = json.length;
                    console.log('JSON',json);
                    resolve(json);
                }, function () {
                    $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $dazzleUser.getDazzleInfo('websiteId') + "/content/" + tableJson.data.table + "-data.json", []);
                    resolve([]);
                });
            } else if (tableJson.data.type === 'dynamodb') {
                console.log('Load DynamoDB Data');
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": {
                        "action": "searchData",
                        "index": tableJson.data.index || "dazzle",
                        "type": tableJson.data.table,
                        "body": {"query": {"match_all": {}}}
                    }
                }).then(function (result) {
                    //console.log(result);
                    if (result.data.code < 0) {
                        $dazzlePopup.toast(result.data.text + ":" + result.data.reject.msg);
                        resolve([]);
                    } else {
                        this.dataLength = result.data.resolve.length;
                        resolve(result.data.resolve);
                    }
                });
            } else {
                $dazzlePopup.toast("未知數據來源");
                resolve([]);
            }
        });
    };
    this.initGrid = function(tableName){
        return new Promise(function (resolve, reject) {
            that.gridOptions = {
                rowSelection: 'multiple',
                rowHeight: 45,
                animateRows: true,
                floatingFilter: true,
                angularCompileRows: true,
                angularCompileFilters: true,
                angularCompileHeaders: true,
                enableColResize: true,
                enableFilter: true,
                enableSorting: true,
                isExternalFilterPresent: function () {
                    return true;
                },
                doesExternalFilterPass: function (node) {
                    if (node.deleted) {
                        return false;
                    } else {
                        // if (this.filter) {
                        //     if (this.filter.data.indexOf(node.data[filter.key]) < 0) {
                        //         return false;
                        //     } else {
                        //         return true;
                        //     }
                        // }
                        return true;
                    }
                },
                defaultColDef: {
                    headerCheckboxSelection: this.isFirstColumn,
                    checkboxSelection: this.isFirstColumn,
                    editable: true,
                    cellEditor: "text",
                    filter: 'text'
                },
                onGridReady: function () {
                    that.loadTableByName(tableName).then(function (table) {
                        that.tableJson = table;
                        if (angular.isArray(that.tableJson.buttons)) {
                            for (var i = 0; i < that.tableJson.buttons.length; i++) {
                                that.loadButton(that.tableJson.buttons[i]);
                            }
                        }
                        that.loadSchemaByTableName(tableName).then(function (json) {
                            that.schemaJson = json;
                            that.loadCell(json).then(function () {
                                console.log('Column JSON', json);

                                that.gridOptions.api.setColumnDefs(json);
                                that.gridOptions.api.refreshView();
                                that.loadDataSet(table, null).then(function (json) {
//                                    this.loadData().then(function (json) {
                                    console.log('Load Json', json);

                                    that.gridOptions.api.setRowData(json);

                                    that.gridOptions.api.refreshView();
                                    console.log('Table:', that.tableJson);
                                    console.log('Schema:', that.schemaJson);
                                    console.log('Data:', json);
                                    resolve(that.gridOptions);
                                });

                            });
                        });
                    });
                },
                onCellEditingStarted: function (event) {
                    event.this.oldValue = event.value;
                },
                onCellEditingStopped: function (event) {
                    if (!angular.isUndefined(event.colDef.key) && event.colDef.key) {
                        that.gridOptions.api.forEachNode(function (rowNode, index) {
                            if (rowNode.data[event.colDef.field] == event.value && rowNode.rowIndex !== event.rowIndex) {
                                event.this.rowNode.setDataValue(event.colDef.field, event.this.oldValue);
                                $dazzlePopup.toast('ERROR: Key already exists');
                                return;
                            }
                        });
                    }
                    if (!angular.isUndefined(event.colDef.required) && event.colDef.required) {
                        if (!event.value) {
                            event.this.rowNode.setDataValue(event.colDef.field, event.this.oldValue);
                            $dazzlePopup.toast('ERROR: this is required');
                        }
                    }
                },
                onCellFocused: function (event) {
                    if (event.rowIndex !== null) {
                        that.gridOptions.api.getModel().rowsToDisplay[event.rowIndex].edited = true;
                    }
                }
            }
        });
    }


    this.getDataKey = function(schema) {

        var dataKey;
        for (var i = 0; i < schema.length; i++) {
            if (schema[i].key)
                dataKey = schema[i].field;
        }

        return dataKey;
    }
    this.getFormSchema = function (table) {
        console.log('Table Schema',table);
        return new Promise(function (resolve, reject) {
            $dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid, 'website/' + $dazzleUser.getDazzleInfo('websiteId') + '/content/' + table.data.table + '-schema.json').then(function (json) {
                resolve(json);
            }, function () {
                reject();
            });
        });
    }

    this.getTableSchema = function (table) {
        console.log('Table Schema',table);
        return new Promise(function (resolve, reject) {
            $dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid, 'website/' + $dazzleUser.getDazzleInfo('websiteId') + '/content/' + table.data.table + '-schema.json').then(function (json) {
                resolve(json);
            }, function () {
                reject();
            });
        });
    }


    this.loadDataTable = function (tableName) {

        return new Promise(function (resolve, reject) {
            console.log('Load Data Table',$dazzleUser.getDazzleInfo('websiteId'));
            $dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid, 'website/' + $dazzleUser.getDazzleInfo('websiteId') + '/' + "content/" + tableName + "-table.json").then(function (json) {
                resolve(json);
            }, function () {
                this.initTable().then(function (t) {
                    resolve(t);
                });
            });
        });
    }

    // For New Data Function (2/11/2017)

    this.getGridOptions = function(website,table,ids){
        return new Promise(function (resolve, reject) {

            console.log('Init Data');
            this.inited = false;
            this.website = website;
            this.table = table;
            this.filter = null;
            console.log(this.website);
            console.log(this.table);
            this.getWebsiteJson();
            this.lastUpdated = null;
            this.gridOptions = {
                rowSelection: 'multiple',
                rowHeight: 45,
                animateRows: true,
                floatingFilter: true,
                angularCompileRows: true,
                angularCompileFilters: true,
                angularCompileHeaders: true,
                enableColResize: true,
                enableFilter: true,
                enableSorting: true,
                isExternalFilterPresent: function () {
                    return true;
                },
                doesExternalFilterPass: function (node) {
                    if (node.deleted) {
                        return false;
                    } else {
                        // if (this.filter) {
                        //     if (this.filter.data.indexOf(node.data[filter.key]) < 0) {
                        //         return false;
                        //     } else {
                        //         return true;
                        //     }
                        // }
                        return true;
                    }
                },
                defaultColDef: {
                    headerCheckboxSelection: this.isFirstColumn,
                    checkboxSelection: this.isFirstColumn,
                    editable: true,
                    cellEditor: "text",
                    filter: 'text'
                },
                onGridReady: function () {
                    console.log('Load Table');
                    this.loadTable().then(function (table) {
                        this.tableJson = table;
                        if (angular.isArray(this.tableJson.buttons)) {
                            for (var i = 0; i < this.tableJson.buttons.length; i++) {
                                this.loadButton(this.tableJson.buttons[i]);
                            }
                        }
                        this.loadSchema().then(function (json) {
                            this.schemaJson = json;
                            this.loadCell(json).then(function () {
                                console.log('Column JSON', json);
                                if (!this.editable)
                                    angular.forEach(json, function (item, index) {
                                        json[index].editable = false;
                                    });
                                this.gridOptions.api.setColumnDefs(json);
                                this.gridOptions.api.refreshView();
                                this.loadDataSet(table, ids).then(function (json) {
                                    //                                    this.loadData().then(function (json) {
                                    console.log('Load Json', json);

                                    this.gridOptions.api.setRowData(json);
                                    this.gridOptions.api.refreshView();
                                    this.inited = true;
                                    console.log('Table:', this.tableJson);
                                    console.log('Schema:', this.schemaJson);
                                    console.log('Data:', json);
                                    resolve(this.gridOptions);
                                });

                            });
                        });
                    });
                },
                onCellEditingStarted: function (event) {
                    event.this.oldValue = event.value;
                },
                onCellEditingStopped: function (event) {
                    if (!angular.isUndefined(event.colDef.key) && event.colDef.key) {
                        this.gridOptions.api.forEachNode(function (rowNode, index) {
                            if (rowNode.data[event.colDef.field] == event.value && rowNode.rowIndex !== event.rowIndex) {
                                event.this.rowNode.setDataValue(event.colDef.field, event.this.oldValue);
                                $dazzlePopup.toast('ERROR: Key already exists');
                                return;
                            }
                        });
                    }
                    if (!angular.isUndefined(event.colDef.required) && event.colDef.required) {
                        if (!event.value) {
                            event.this.rowNode.setDataValue(event.colDef.field, event.this.oldValue);
                            $dazzlePopup.toast('ERROR: this is required');
                        }
                    }
                },
                onCellFocused: function (event) {
                    if (event.rowIndex !== null) {
                        this.gridOptions.api.getModel().rowsToDisplay[event.rowIndex].edited = true;
                    }
                }
            }
        });
    }
    this.init = function (website, table, ids) {
        console.log('Init Data');
        this.inited = false;
        this.website = website;
        this.table = table;
        this.filter = null;
        console.log(this.website);
        console.log(this.table);
        this.getWebsiteJson();
        this.lastUpdated = null;
        this.gridOptions = {
            rowSelection: 'multiple',
            rowHeight: 45,
            animateRows: true,
            floatingFilter: true,
            angularCompileRows: true,
            angularCompileFilters: true,
            angularCompileHeaders: true,
            enableColResize: true,
            enableFilter: true,
            enableSorting: true,
            isExternalFilterPresent: function () {
                return true;
            },
            doesExternalFilterPass: function (node) {
                if (node.deleted) {
                    return false;
                } else {
                    // if (this.filter) {
                    //     if (this.filter.data.indexOf(node.data[filter.key]) < 0) {
                    //         return false;
                    //     } else {
                    //         return true;
                    //     }
                    // }
                    return true;
                }
            },
            defaultColDef: {
                headerCheckboxSelection: this.isFirstColumn,
                checkboxSelection: this.isFirstColumn,
                editable: true,
                cellEditor: "text",
                filter: 'text'
            },
            onGridReady: function () {
                this.loadTable().then(function (table) {
                    this.tableJson = table;
                    if (angular.isArray(this.tableJson.buttons)) {
                        for (var i = 0; i < this.tableJson.buttons.length; i++) {
                            this.loadButton(this.tableJson.buttons[i]);
                        }
                    }
                    this.loadSchema().then(function (json) {
                        this.schemaJson = json;
                        this.loadCell(json).then(function () {
                            console.log('Column JSON', json);
                            if (!this.editable)
                                angular.forEach(json, function (item, index) {
                                    json[index].editable = false;
                                });
                            this.gridOptions.api.setColumnDefs(json);
                            this.gridOptions.api.refreshView();
                            this.loadDataSet(table,ids).then(function (json) {
//                                    this.loadData().then(function (json) {
                                console.log('Load Json',json);

                                this.gridOptions.api.setRowData(json);
                                this.gridOptions.api.refreshView();
                                this.inited = true;
                                console.log('Table:', this.tableJson);
                                console.log('Schema:', this.schemaJson);
                                console.log('Data:', json);
                            });

                        });
                    });
                });
            },
            onCellEditingStarted: function (event) {
                event.this.oldValue = event.value;
            },
            onCellEditingStopped: function (event) {
                if (!angular.isUndefined(event.colDef.key) && event.colDef.key) {
                    this.gridOptions.api.forEachNode(function (rowNode, index) {
                        if (rowNode.data[event.colDef.field] == event.value && rowNode.rowIndex !== event.rowIndex) {
                            event.this.rowNode.setDataValue(event.colDef.field, event.this.oldValue);
                            $dazzlePopup.toast('ERROR: Key already exists');
                            return;
                        }
                    });
                }
                if (!angular.isUndefined(event.colDef.required) && event.colDef.required) {
                    if (!event.value) {
                        event.this.rowNode.setDataValue(event.colDef.field, event.this.oldValue);
                        $dazzlePopup.toast('ERROR: this is required');
                    }
                }
                if (this.filter) {
                    this.gridOptions.api.onFilterChanged();
                }
            },
            onCellFocused: function (event) {
                if (event.rowIndex !== null) {
                    this.gridOptions.api.getModel().rowsToDisplay[event.rowIndex].edited = true;
                }
            }
        }
    }

    this.getWebsiteJson = function () {
        $dazzleS3.getJson("dazzle-user-" + this.user.uid, "website/" + this.website + '/json/website.json').then(function (json) {
            this.websiteJson = json;
        });
    }

    this.loadButton = function (b) {
        $ocLazyLoad.load({files: b.js, cache: false}).then(function () {
            var button = angular.element(b.html);
            angular.element('#customButtons').append(button);
            $compile(button)(this);
        });
    }


    this.editSchema = function () {
        $dazzlePopup.schema(this.website, this.table, this.isForm).then(function (newSchema) {
            $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, 'website/' + this.website + '/' + "content/" + this.table + "-schema.json", JSON.parse(angular.toJson(newSchema)));
            this.schemaJson = newSchema;
            this.loadCell(newSchema).then(function () {
                this.gridOptions.api.setColumnDefs(newSchema);
                this.gridOptions.api.refreshView();
            });
        });
    }
    this.loadTableKey = function(tableName){
        return new Promise(function (resolve, reject) {
            this.loadTableByName(tableName).then(function(json){
                console.log('Load Table Key',json);
                resolve(json.data.key);
            });
        });
    }
    this.saveFormByName = function(tableName,json) {
        return new Promise(function (resolve, reject) {
            $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, 'website/' + $dazzleUser.getDazzleInfo('websiteId') + '/' + "content/" + tableName + "-form.json",json).then(function () {
                resolve();
            });
        });
    }

    this.saveTableByName = function(tableName,json) {
        return new Promise(function (resolve, reject) {
            $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, 'website/' + $dazzleUser.getDazzleInfo('websiteId') + '/' + "content/" + tableName + "-table.json",json).then(function () {
                resolve();
            });
        });
    }
    this.getTableParamsByName = function(tableName) {
        return new Promise(function (resolve, reject) {

            this.loadTableByName(tableName).then(function(json){
                console.log('Table JSON',json);
                if (json.hasOwnProperty('cellEditorParams'))
                    resolve(json.cellEditorParams);
                else
                    reject();

            });
        });
    }
    this.loadFormByName = function(formName){
        return new Promise(function (resolve, reject) {
            $dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid, 'website/' + $dazzleUser.getDazzleInfo('websiteId') + '/' + "content/" + formName + "-form.json").then(function (json) {
                resolve(json);
            },function(err){
                reject();
            });
        });
    }
    this.loadTableByName = function (tableName) {
        return new Promise(function (resolve, reject) {
            $dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid, 'website/' + $dazzleUser.getDazzleInfo('websiteId') + '/' + "content/" + tableName + "-table.json").then(function (json) {
                if (json.data && json.data.type && json.data.type === 'dynamodb') {
                    if (json.data.table && json.data.key) {
                        // scope.checkDynamoTable(json.data.table).then(function (dynamodb) {
                        //     resolve(json);
                        // }, function (text) {
                        //     $dazzlePopup.toast("DynamoDB:" + text);
                        //     reject();
                        // });
                        resolve(json);
                    } else if (!json.data.table) {
                        $dazzlePopup.toast('ERROR: 沒有設定Table');
                        reject();
                    } else if (!json.data.key) {
                        $dazzlePopup.toast('ERROR: 沒有設定Key');
                        reject();
                    }
                } else if (json.data && json.data.type && json.data.type === 's3') {
                    resolve(json);
                } else {
                    this.initTable().then(function (t) {
                        resolve(t);
                    })
                }
            }, function () {
                this.initTable().then(function (t) {
                    resolve(t);
                });
            });
        });
    }
    this.loadTable = function () {
        return new Promise(function (resolve, reject) {
            $dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid, 'website/' + this.website + '/' + "content/" + this.table + "-table.json").then(function (json) {
                if (json.data && json.data.type && json.data.type === 'dynamodb') {
                    if (json.data.table && json.data.key) {
                        // scope.checkDynamoTable(json.data.table).then(function (dynamodb) {
                        //     resolve(json);
                        // }, function (text) {
                        //     $dazzlePopup.toast("DynamoDB:" + text);
                        //     reject();
                        // });
                        resolve(json);
                    } else if (!json.data.table) {
                        $dazzlePopup.toast('ERROR: 沒有設定Table');
                        reject();
                    } else if (!json.data.key) {
                        $dazzlePopup.toast('ERROR: 沒有設定Key');
                        reject();
                    }
                } else if (json.data && json.data.type && json.data.type === 's3') {
                    resolve(json);
                } else {
                    this.initTable().then(function (t) {
                        resolve(t);
                    })
                }
            }, function () {
                this.initTable().then(function (t) {
                    resolve(t);
                });
            });
        });
    }

    this.initTable = function () {
        return new Promise(function (resolve, reject) {
            $dazzlePopup.toast('正在初始化s3 Table:' + this.table);
            var table = {
                "data": {
                    "type": "s3"
                },
                "buttons": []
            }
            $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + website + "/content/" + this.table + "-table.json", table);
            resolve(table);
        });
    }

    this.checkDynamoTable = function (table) {
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

    this.loadSchemaDirectiveByTableAndField = function(tableName,field){
        return new Promise(function (resolve, reject) {
            $dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $dazzleUser.getDazzleInfo('websiteId') + "/content/" + tableName + "-schema.json").then(function (json) {
                angular.forEach(json,function(item,index){
                    if (item.headerName == field)
                        resolve(item);
                });
            }, function () {
                reject();
            });

        });
    }
    this.loadSchemaByTableName = function (tableName) {
        return new Promise(function (resolve, reject) {
            console.log('Schema Path','dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $dazzleUser.getDazzleInfo('websiteId') + "/content/" + tableName + "-schema.json");
            $dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $dazzleUser.getDazzleInfo('websiteId') + "/content/" + tableName + "-schema.json").then(function (json) {
                resolve(json);
            }, function () {
                $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + this.website + "/content/" + this.table + "-schema.json", []);
                resolve([]);
            });
        });
    };
    this.loadFormSchemaItem = function(directiveName){
        $dazzleS3.getJson('dazzle-template' , "file6.0/form-schema-tpl.json").then(function (json) {
            angular.forEach(json,function(item,key){
                if (item.directiveName == directiveName)
                    return item;
            });
            resolve(json);
        }, function () {
            return {};
        });

    }
    this.loadSchema = function () {
        return new Promise(function (resolve, reject) {
            $dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + this.website + "/content/" + this.table + "-schema.json").then(function (json) {
                resolve(json);
            }, function () {
                $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + this.website + "/content/" + this.table + "-schema.json", []);
                resolve([]);
            });
        });
    };
    this.loadDataSetByTableName = function(tableName,ids){
        console.log('load Data Set By Table');
        return new Promise(function (resolve, reject) {
            this.loadTableByName(tableName).then(function (table) {
                this.loadDataSet(table,ids).then(function(data){
                    resolve(data);
                },function(err){
                    resolve([]);
                });
            });
        });
    }
    this.loadDataSet = function(table,ids){

        return new Promise(function (resolve, reject) {
            var data = [];
            var count = 0;
            var isAll = false;
            console.log('IDS',ids);
            console.log('Table',table);
            if (ids === null)
                isAll = true;

            if (table.data.type === 's3') {
                console.log('Load S3 Data');
                $dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $dazzleUser.getDazzleInfo('websiteId') + "/content/" + table.data.table + "-data.json").then(function (json) {
                    if (!isAll){
                        angular.forEach(json,function(item,index){
                            if (ids.indexOf(item[table.data.key]) > -1 )
                                data.push(item);
                        });
                        console.log('isAll',isAll);
                        resolve(data);

                    }
                    else {
                        resolve(json);
                    }
                });
            } else if (table.data.type === 'dynamodb') {
                console.log(ids);
                if (!isAll){
                    console.log('Load BY ID');
                    for(i=0;i<ids.length;i++){
                        this.loadElasticRecordById(table.data.index,table.data.table,ids[i]).then(function(record){

                            data.push(record);
                            count++;
                            console.log('Output',record);
                            if (count == ids.length)
                                resolve(data);
                        });

                    }
                } else {
                    console.log('Load Mass');
                    this.loadElasticRecord(table.data.index,table.data.table).then(function(record){
                        resolve(record);
                    });
                }
            } else {
                $dazzlePopup.toast("未知數據來源");
                resolve([]);
            }
        });
    }
    this.loadData = function () {
        return new Promise(function (resolve, reject) {
            if (this.tableJson.data.type === 's3') {
                console.log('Load S3 Data');
                $dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + this.website + "/content/" + this.table + "-data.json").then(function (json) {
                    resolve(json);
                }, function () {
                    $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + this.website + "/content/" + this.table + "-data.json", []);
                    resolve([]);
                });
            } else if (this.tableJson.data.type === 'dynamodb') {
                console.log('Load DynamoDB Data');
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": {
                        "action": "searchData",
                        "index": this.tableJson.data.index || "dazzle",
                        "type": this.tableJson.data.table,
                        "body": {"query": {"match_all": {}}}
                    }
                }).then(function (result) {
                    if (result.data.code < 0) {
                        $dazzlePopup.toast(result.data.text + ":" + result.data.err.code);
                        reject();
                    } else {
                        resolve(result.data.resolve);
                    }
                });
            } else {
                $dazzlePopup.toast("未知數據來源");
                resolve([]);
            }
        });
    };
    this.initDataByName = function(tableName) {
        return new Promise(function (resolve, reject) {

            $dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid, 'website/' + $dazzleUser.getDazzleInfo('websiteId') + '/' + "content/" + tableName + "-data.json").then(function (json) {
                resolve();
            },function(){
                $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, 'website/' + $dazzleUser.getDazzleInfo('websiteId') + '/' + "content/" + tableName + "-data.json",[]).then(function () {
                    resolve();
                });

            });
        });
    }

    this.saveSchemaByName = function(tableName,json){
        return new Promise(function (resolve, reject) {
            $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, 'website/' + $dazzleUser.getDazzleInfo('websiteId') + '/' + "content/" + tableName + "-schema.json",json).then(function () {
                resolve();
            });
        });
    }
    this.saveRecord = function (db,data) {
        return new Promise(function (resolve, reject) {
            var field,table;
            // if (db.refer){
            //     field = db.referField;
            //     table = db.referTable;
            // } else {
            field = db.field;
            table = db.table;
            //}

            var term={};
            var thisPageJson = $dazzleUser.getDazzleInfo('thisPageJson');
            term[field]=data;
            console.log(term);
            console.log(thisPageJson);
            if (!angular.isUndefined(thisPageJson.myID))
                db.id = thisPageJson.myID;
            else if (!angular.isUndefined(thisPageJson.exportID)) {
                db.id=thisPageJson.exportDatas[thisPageJson.exportID];
            }
            console.log('Save Record',db);
            if (db.type === 's3' && !angular.isUndefined(db.id)) {
                console.log('Load S3 Data');
                $dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $dazzleUser.getDazzleInfo('websiteId') + "/content/" + db.table + "-data.json").then(function (json) {
                    angular.forEach(json,function(item,index){
                        if (item[db.key]==db.id) {
                            item[db.field]=data;
                        }
                    });
                    $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $dazzleUser.getDazzleInfo('websiteId') + "/content/" + db.table + "-data.json",json).then(function(){
                        resolve();
                    });
                    resolve({});
                });
            } else if (db.type === 'dynamodb' && !angular.isUndefined(db.id)) {
                console.log('Load DynamoDB Data',db.key,db.id);
                var params = {
                    "action": "updateData",
                    'index': db.index,
                    'type': table,
                    'id': db.id,
                    body:{
                        doc:term
                    }
                };
                console.log('DB',db);
                console.log('Params',params);
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": {
                        "action": "updateData",
                        'index': db.index,
                        'type': table,
                        'id': db.id,
                        body:{
                            doc:term
                        }
                    }
                }).then(function (result) {
                    console.log(result);
                    if (result.data.code < 0) {
                        console.log(result.data.text + ":" + result.data.err.code);
                        $dazzlePopup.toast(result.data.text + ":" + result.data.err.code);
                        reject();
                    } else {
                        resolve(result.data.resolve);
                    }
                });
            } else {
                $dazzlePopup.toast("未知數據來源");
                resolve([]);
            }
        });
    };
    this.saveValue = function(db,value){
        return new Promise(function (resolve, reject) {
            // var thisPageJson = $dazzleUser.getDazzleInfo('thisPageJson');
            // if (!angular.isUndefined(thisPageJson.exportDatas)) {
            //     if (!db.refer) {
            //         thisPageJson.exportDatas[db.field]=value;
            //         $dazzleUser.setDazzleInfo('thisPageJson',thisPageJson);
            //         resolve(thisPageJson.exportDatas);
            //     } else {
            //         resolve('');
            //     }

            // }
        });
    };
    this.loadValue = function(db){

        return new Promise(function (resolve, reject) {
            var thisPageJson = $dazzleUser.getDazzleInfo('thisPageJson');
            if (!angular.isUndefined(thisPageJson.exportDatas)) {
                if (!db.refer) {
                    resolve(thisPageJson.exportDatas[db.field]);
                } else {
                    resolve('');
                }

            }
        });
    }
    // Only Allow in Elastic Search
    this.loadDataByModelDb = function(db) {
        return new Promise(function (resolve, reject) {

            var table,field,id,index,key;
            var thisPageJson = $dazzleUser.getDazzleInfo('thisPageJson');
            console.log('DB',db);
            index = db.index;

            if (db.refer){
                console.log(thisPageJson.exportDatas);
                table = db.referTable;
                field = db.referField;
            } else {
                table = db.table;
                field = db.field;
            }
            key =db.key;
            console.log({
                "action": "searchData",
                "index": index,
                "type": table,
                "from":0,
                "size":10,
                "body": {"query": {"match_all": {}}},
                "sort": { key: { "order": "desc" }}
            });

            var query = {
                "action": "searchData",
                "index": index,
                "type": table,
                "body": {
                    "query": {"match_all": {}}
                }
            };

            if (db.hasOwnProperty('limit')) {
                query['from']=0;
                query['size']=db.limit;
            }

            if (db.hasOwnProperty('sort'))
                key = db.sort;
            else
                key = db.key;

            if (db.hasOwnProperty('order'))
                order = db.order;
            else
                order = 'desc';

            query['body']['sort']={};
            query['body']['sort'][key]={"order":order};

            if (db.hasOwnProperty('filter')) {
                query['body']['query']={
                    'filtered': {
                        "query": db.filter
                    }
                }
            }

            console.log('Query',JSON.stringify(query));
            $http({
                "method": "post",
                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                "data": query

            }).then(function (result) {
                if (result.data.code < 0) {
                    $dazzlePopup.toast(result.data.text + ":" + result.data.err.code);
                    reject();
                } else {
                    resolve(result.data.resolve);
                }
            });
            // this.loadElasticRecord(index,table).then(function(record){
            //     console.log('Rec',record);
            //     resolve(record);
            // });
        });
    }

    this.getAtomData = function(db){
        return new Promise(function (resolve, reject) {

            var table,field,id,index;
            var thisPageJson = $dazzleUser.getDazzleInfo('thisPageJson');
            console.log('DB',db);

            index = db.index;

//                    if (!angular.isUndefined(thisPageJson.exportDatas))
            //id = thisPageJson.exportDatas[thisPageJson.exportID];
            // else

            id = thisPageJson.myID;

            console.log('Get ID',id);


            table = db.table;
            field = db.field;

            console.log('Load Elastic',index,table,id,field);
            if (angular.isUndefined(id))
                reject();

            if (db.type == "s3"){
                this.loadTableKey(table).then(function(key){
                    console.log('Load S3',thisPageJson,key);
                    id = thisPageJson.exportDatas[key];
                    this.loadS3RecordById(table,key,id).then(function(record){
                        console.log(record[0]);
                        var rec = record[0];
                        resolve(rec[field]);
                    });
                });

//                        resolve(thisPageJson.exportDatas[field]);
            }
            else if (db.type=="dynamodb"){
                this.loadElasticRecordById(index,table,id).then(function(record){
                    //var rec = record[0];
                    console.log('Rec',record);
                    resolve(record[field]);
                });
            }



        });

    }

    this.saveAtomData = function(db,value){
        return new Promise(function (resolve, reject) {

            var table,field,id,index;
            var thisPageJson = $dazzleUser.getDazzleInfo('thisPageJson');
            var website = $dazzleUser.getDazzleInfo('website');
            var userBucket = $dazzleUser.getDazzleInfo('userBucket');
            var websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
            console.log('DB',db);
            console.log('Website',$dazzleUser.getDazzleInfo('website'));
            index = db.index;

            if (db.refer){
                console.log(thisPageJson.exportDatas);
                table = db.referTable;
                field = db.referField;
                id = thisPageJson.exportDatas[db.field][0];
            } else {
                table = db.table;
                field = db.field;
                id = thisPageJson.exportDatas[thisPageJson.exportID];
            }

            if (db.type == "s3"){
                console.log('Load S3 Data',$dazzleUser.getUser().uid,websiteKey,table);
                $dazzleS3.getJson(userBucket, websiteKey + 'content/' + table + '-data.json').then(function (json) {
                    console.log(json);
                    angular.forEach(json, function (item, index) {
                        console.log('Whole record',thisPageJson.exportID,id,field,value);

                        if (item[thisPageJson.exportID] == id) {
                            json[index][field] = value;
                            $dazzleS3.saveJson(userBucket, websiteKey + 'content/' + table + '-data.json', json);
                        }
                    });

                });
                // $dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + website.website + "/content/" + table + "-data.json").then(function (json) {
                //     var data = [];
                //     angular.forEach(json,function(item,index){
                //         if (item[thisPageJson.exportID]==db.id) {
                //             item[field] = value;
                //         }
                //         data.push(item);
                //     });
                //     console.log('JSON',data);
                //     $dazzleS3.saveJson('dazzle-user-'+$dazzleUser.getUser().uid,'website/'+website.website+'/content/'+table+'-data.json',data).then(function(result){
                //         resolve(true);
                //     },function(){
                //         reject();
                //     });
                // });
                // if (!db.refer)
                //     thisPageJson.exportDatas[field]=value;

            }
            else if (db.type=="dynamodb"){

                console.log('Load DynamoDB Data',db.key,id);
                var term={};
                term[field]=value;
                var params = {
                    "action": "updateData",
                    'index': db.index,
                    'type': table,
                    'id': id,
                    body:{
                        doc:term
                    }
                };
                console.log('Params',params);

                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": {
                        "action": "updateData",
                        'index': db.index,
                        'type': table,
                        'id': id,
                        body:{
                            doc:term
                        }
                    }
                }).then(function (result) {
                    console.log('Result',result);
                    if (result.data.code < 0) {
                        console.log(result.data.text + ":" + result.data.err.code);
                        $dazzlePopup.toast(result.data.text + ":" + result.data.err.code);
                        reject();
                    } else {
                        resolve(true);
                    }
                });

            }
        });
    }

    this.loadElasticRecord = function(index,table) {


        return new Promise(function (resolve, reject) {
//                    console.log('Load Elastic Data',id,table,index);
            $http({
                "method": "post",
                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                "data": {
                    "action": "searchData",
                    "index": index,
                    "type": table,
                    "body": {"query": {"match_all": {}}}
                }
            }).then(function (result) {
                if (result.data.code < 0) {
                    $dazzlePopup.toast(result.data.text + ":" + result.data.err.code);
                    reject();
                } else {
                    resolve(result.data.resolve);
                }
            });
        });
    }

    this.loadS3RecordByFilterReturnID = function(table,key,filter) {
        var field = filter.field;
        var value = filter.value;
        var mode = filter.mode;
        var websiteId = $dazzleUser.getDazzleInfo('websiteId');
        var data=[];
        return new Promise(function (resolve, reject) {
            var data =[];
            $dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + websiteId + "/content/" + table + "-data.json").then(function (json) {
                angular.forEach(json,function(item,index){
                    console.log(item);
                    switch (mode){
                        case "fizzy":
                            console.log('Mode',mode,value);
                            if (item[field].indexOf(value)>-1)
                                data.push(item[key]);
                            break;
                        default:
                            if (item[field]==value)
                                data.push(item[key]);
                            break;
                    }
                });
                resolve(data);

            });

        });

    }

    this.createSchema = function(table,json){
        return new Promise(function(resolve,reject){
            $dazzleS3.saveJson($dazzleUser.getDazzleInfo('userBucket'),$dazzleUser.getDazzleInfo('websiteKey')+'content/'+table+'-schema.json',json).then(function(result){
                resolve();
            },function(err){
                reject();
            });
        });
    }
    this.initSchema = function(index,table,key){

        var json =     {
            "editable": true,
            "cellEditor": "text",
            "filter": "text",
            "directive": "text",
            "directiveName": "文字",
            "mapping": {
                "type": "string",
                "index": "not_analyzed"
            },
            "headerName": key,
            "field": "ID",
            "key": true,
            "required": true,
            "default": "",
            "defaultByTimestamp": true,
            "setting": "https://dazzle-template.s3.amazonaws.com/backend6.0/text/setting.html",
            "width": 200
        };
        return new Promise(function (resolve, reject) {
            $dazzleS3.saveJson($dazzleUser.getDazzleInfo('userBucket'),$dazzleUser.getDazzleInfo('websiteKey')+'content/'+table+'-schema.json',json).then(function(result){
                resolve();
            },function(err){
                reject();
            });
        });
    }
    this.createForm = function(table){

        return new Promise(function (resolve, reject) {
            var json = {
                "data": {
                    "type": "s3",
                    "table":table,
                    "index":$dazzleUser.getDazzleInfo('userBucket'),
                    "key": "ID"
                },
                "buttons": []
            };
            $dazzleS3.saveJson($dazzleUser.getDazzleInfo('userBucket'),$dazzleUser.getDazzleInfo('websiteKey')+'content/'+table+'-form.json',json).then(function(result){

                var schema = {


                };
                $dazzleS3.saveJson($dazzleUser.getDazzleInfo('userBucket'),$dazzleUser.getDazzleInfo('websiteKey')+'content/'+table+'-schema.json',schema).then(function(){
                    resolve();
                });

            },function(err){
                reject();
            });
        });
    }


    this.createTable = function(index,table,key, type){

        return new Promise(function (resolve, reject) {
            var json = {
                "data": {
                    "type": type,
                    "table":table,
                    "index":index,
                    "key":key
                },
                "buttons": []
            };
            $dazzleS3.saveJson($dazzleUser.getDazzleInfo('userBucket'),$dazzleUser.getDazzleInfo('websiteKey')+'content/'+table+'-table.json',json).then(function(result){
                resolve();
            },function(err){
                reject();
            });
        });
    }

    this.updateElasticRecord = function(index,table,id,rec){
        return new Promise(function (resolve, reject) {
            var params = [];
            var dataObject = JSON.parse(angular.toJson(rec));
            this.clean(dataObject);
            params.push({
                "update": {
                    _index: index,
                    _type: table,
                    _id: id
                }
            });
            params.push({
                "doc": dataObject
            });

            console.log('Params',params);


            $http({
                "method": "post",
                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                "data": {
                    "action": "bulkData",
                    "body": params
                }
            }).then(function (result) {
                console.log(result);
                if (result.data.code > 0) {
                    resolve();
                } else {
                    $dazzlePopup.toast(result.data.text + ":" + result.data.err.code);
                    reject();
                }
            });

        });

    }


    this.createElasticRecord = function(index,table,id,rec){
        return new Promise(function (resolve, reject) {
            $http({
                "method": "post",
                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                "data": {
                    "action": "createData",
                    "index": index,
                    "type": table,
                    "id":  id,
                    "body": rec
                }
            }).then(function (result) {
                if (result.data.code < 0) {
                    $dazzlePopup.toast(result.data.text + ":" + result.data.err.code);
                    reject();
                } else {
                    resolve(result.data.resolve);
                }
            });
        });
    }

    this.createS3Record = function(table,rec) {
        return new Promise(function (resolve, reject) {
            var data =[];
            //console.log('Load S3 Data',id,table,key);
            $dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $dazzleUser.getDazzleInfo('websiteId') + "/content/" + table + "-data.json").then(function (json) {
                console.log('JSON',json);
                if (rec['學生編號']) {
                    json.push(rec);
                    $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $dazzleUser.getDazzleInfo('websiteInfo') + "/content/" + table + "-data.json", json).then(function() {
                        resolve(true);
                    },function () {
                        reject();
                    });
                }
                else
                    reject("沒有學生編號");
            });
        });

    }
    this.loadS3RecordById = function(table,key,id) {
        return new Promise(function (resolve, reject) {
            var data =[];
            console.log('Load S3 Data',id,table,key);
            $dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $dazzleUser.getDazzleInfo('websiteId') + "/content/" + table + "-data.json").then(function (json) {
                angular.forEach(json,function(item,index){
                    console.log(item);
                    if (item[key]==id)
                        data.push(item);
                });
                resolve(data);

            }, function () {
                $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + this.website + "/content/" + table + "-data.json", []);
                resolve([]);
            });

        });

    }

    this.loadElasticRecordById = function(index,table,id) {
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
    this.loadElasticRecordByIds = function(index,table,ids){

        return new Promise(function (resolve, reject) {
            console.log('Load Elastic IDS',index,table,ids);
            var data = [];
            var count = 0;
            angular.forEach(ids,function(item,key){
                console.log('Every ID',index,table,item);
                this.loadElasticRecordById(index,table,item).then(function(row){
                    data.push(row);
                    count ++;
                    if (count==ids.length)
                        resolve(data);
                });
            });
        });
    }

    this.loadRecord = function (db) {
        return new Promise(function (resolve, reject) {
            var field,table;
            if (db.refer){
                field = db.referField;
                table = db.referTable;
            } else {
                field = db.field;
                table = db.table;
            }

            if (db.type === 's3') {
                console.log('Load S3 Data');
                $dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + this.website + "/content/" + db.table + "-data.json").then(function (json) {
                    angular.forEach(json,function(item,index){
                        if (item[db.key]==db.id)
                            resolve(item);
                    });
                    resolve({});
                });
            } else if (db.type === 'dynamodb') {
                console.log('Load DynamoDB Data',db.key);
                var search_term={};
                search_term[db.key]=db.id;
                console.log(search_term);
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": {
                        "action": "searchData",
                        "index": db.index,
                        "type": table,
                        "body": {"query":
                            {
                                // "term": {
                                //     "id": db.id
                                // }
                                "term": search_term
                            }
                        }
                    }
                }).then(function (result) {
                    if (result.data.code < 0) {
                        $dazzlePopup.toast(result.data.text + ":" + result.data.err.code);
                        reject();
                    } else {
                        resolve(result.data.resolve);
                    }
                });
            } else {
                $dazzlePopup.toast("未知數據來源");
                resolve([]);
            }
        });
    };


    this.loadCell = function (schema) {
        return new Promise(function (resolve, reject) {
            for (var i = 0; i < schema.length; i++) {
                if (schema[i].key)
                    dataKey = schema[i].field;

                if (!angular.isUndefined(schema[i].jsId)) {
                    this.setCellJs(schema[i]);
                }
                if (!angular.isUndefined(schema[i].cellEditor)) {
                    this.setCellEditor(schema[i]);
                }
                if (!angular.isUndefined(schema[i].cellRenderer)) {
                    this.setCellRenderer(schema[i]);
                }
                if (!angular.isUndefined(schema[i].cellFilter)) {
                    this.setCellFilter(schema[i]);
                }
                if (!angular.isUndefined(schema[i].cellFilterer)) {
                    this.setCellFilterer(schema[i]);
                }
            }
            setTimeout(function () {
                resolve();
            }, 1000);
        });
    }

    this.setCellJs = function (schema) {
        $ocLazyLoad.load("https://dazzle-template.s3.amazonaws.com/backend6.0/" + schema.directive + "/js/" + schema.jsId + '.js', {cache: false});
    }

    this.setCellFilterer = function (schema) {
        $ocLazyLoad.load("https://dazzle-template.s3.amazonaws.com/backend6.0/" + schema.directive + "/" + schema.cellFilterer + ".js", {cache: false}).then(function () {
            schema.filter = window[schema.cellFilterer];
        });
    }

    this.setCellFilter = function (schema) {
        $ocLazyLoad.load("https://dazzle-template.s3.amazonaws.com/backend6.0/" + schema.directive + "/" + schema.cellFilter + ".js", {cache: false}).then(function () {
            schema.filterParams = window[schema.cellFilter];
        });
    }

    this.setCellEditor = function (schema) {
        $ocLazyLoad.load("https://dazzle-template.s3.amazonaws.com/backend6.0/" + schema.directive + "/" + schema.cellEditor + ".js", {cache: false}).then(function () {
            this.gridOptions.api.cellEditorFactory.addCellEditor(schema.cellEditor, window[schema.cellEditor]);
        });
    }

    this.setCellRenderer = function (schema) {
        $ocLazyLoad.load("https://dazzle-template.s3.amazonaws.com/backend6.0/" + schema.directive + "/" + schema.cellRenderer + ".js", {cache: false}).then(function () {
            this.gridOptions.api.cellRendererFactory.addCellRenderer(schema.cellRenderer, window[schema.cellRenderer]);
        });
    }


    this.referAdd = function (object) {
        console.log('Open Data Select');
        $dazzlePopup.dataSelect(this.website, this.table).then(function (data) {

        });

    }

    this.addFilter = function (filter) {
        this.filter = filter;
        this.gridOptions.api.onFilterChanged();
    }

    this.add = function (object) {
        var date = new Date().getTime().toString();
        var newObject = {};
        if (object) {
            newObject = object;
        }
        if (this.tableJson.data.type === 'dynamodb') {
            newObject[this.tableJson.data.key] = date;
        }
        for (var i = 0; i < this.schemaJson.length; i++) {
            if (this.schemaJson[i].defaultByTimestamp) {
                newObject[this.schemaJson[i].field] = date;
            } else if (this.schemaJson[i].default) {
                newObject[this.schemaJson[i].field] = this.schemaJson[i].default;
            }
        }
        if (filter) {
            filter.data.push(date);
            newObject[filter.key] = date;
        }
        this.gridOptions.api.updateRowData({add: [newObject], addIndex: 0});
        this.gridOptions.api.refreshInMemoryRowModel();
        this.gridOptions.api.getModel().rowsToDisplay[0].edited = true;

    }

    this.remove = function () {
        var nodes = this.gridOptions.api.getSelectedNodes();
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].deleted = true;
        }
        this.gridOptions.api.onFilterChanged();
    }

    this.refresh = function () {
        console.log('Refresh');
        this.loadCell(this.schemaJson).then(function () {
            this.gridOptions.api.setColumnDefs(this.schemaJson);
        });
        this.loadData().then(function (json) {
            this.gridOptions.api.setRowData(json);
        });
    }

    this.isFirstColumn = function (params) {
        var displayedColumns = params.columnApi.getAllDisplayedColumns();
        var thisIsFirstColumn = displayedColumns[0] === params.column;
        return thisIsFirstColumn;
    }

    this.cancel = function () {
        $mdDialog.hide(this.lastUpdated);
    }

    this.save = function () {
        return new Promise(function (resolve, reject) {
            this.saveSchema();
            this.getData().then(function (result) {
                this.saveData(result).then(function () {
                    $dazzlePopup.toast('儲存成功');
                    resolve(result);
                });
            });
        });
    }


    this.saveSchema = function () {
        var newShcema = [];
        var oldSchema = this.gridOptions.columnApi.getAllGridColumns();
        for (var i = 0; i < oldSchema.length; i++) {
            oldSchema[i].colDef.width = oldSchema[i].actualWidth;
            for (var obj in oldSchema[i].colDef) {
                if (obj !== 'headerCheckboxSelection' && obj !== 'checkboxSelection' && Object.prototype.toString.call(oldSchema[i].colDef[obj]) == '[object Function]') {
                    delete oldSchema[i].colDef[obj];
                }
            }
            newShcema.push(oldSchema[i].colDef);
        }
        $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + website + "/content/" + this.table + "-schema.json", JSON.parse(angular.toJson(newShcema)));
        this.schemaJson = newShcema;
    }

    this.saveData = function (data) {
        return new Promise(function (resolve, reject) {
            console.log(data);
            if (this.tableJson.data.type === 's3') {
                console.log('save to s3');
                this.gridOptions.api.removeItems(data.deleted);
                $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + website + "/content/" + this.table + "-data.json", JSON.parse(angular.toJson(data.rows))).then(function () {
                    resolve();
                });
            } else if (this.tableJson.data.type === 'dynamodb') {
                var params = [];
                for (var i = 0; i < data.deleted.length; i++) {
                    var dataObject = JSON.parse(angular.toJson(data.deleted[i].data));
                    params.push({
                        "delete": {
                            _index: this.tableJson.data.index || 'dazzle',
                            _type: this.tableJson.data.table,
                            _id: dataObject[this.tableJson.data.key]
                        }
                    });
                }
                for (var i = 0; i < data.edited.length; i++) {
                    var dataObject = JSON.parse(angular.toJson(data.edited[i].data));
                    this.clean(dataObject);
                    params.push({
                        "delete": {
                            _index: this.tableJson.data.index || 'dazzle',
                            _type: this.tableJson.data.table,
                            _id: dataObject[this.tableJson.data.key]
                        }
                    });
                    params.push({
                        "create": {
                            "_index": this.tableJson.data.index || "dazzle",
                            "_type": this.tableJson.data.table,
                            "_id": dataObject[this.tableJson.data.key]
                        }
                    });
                    params.push(dataObject);
                }
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": {
                        "action": "bulkData",
                        "body": params
                    }
                }).then(function (result) {
                    console.log(result);
                    if (result.data.code > 0) {
                        resolve();
                    } else {
                        $dazzlePopup.toast(result.data.text + ":" + result.data.err.code);
                        reject();
                    }
                });
            }
        })
    }

    this.getData = function () {
        return new Promise(function (resolve, reject) {
            var nodes = [];
            var rows = [];
            var edited = [];
            var deleted = [];
            this.gridOptions.api.forEachNode(function (node) {
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

    this.import = function () {
        if (!this.fileChooser) {
            this.fileChooser = document.createElement('input');
            this.fileChooser.setAttribute("type", "file");
            this.fileChooser.style.display = "none";
            this.fileChooser.addEventListener('change', function (event) {
                var file = this.files[0];
                alasql('SELECT * FROM FILE(?,{headers:true})', [event], function (data) {
                    this.gridOptions.api.setRowData(data);
                    this.gridOptions.api.refreshView();
                    this.gridOptions.api.forEachNode(function (node) {
                        node.edited = true;
                    });
                });
            });
        }
        this.fileChooser.click();
    }

    this.export = function () {
        var rowData = [];
        this.gridOptions.api.forEachNode(function (node) {
            rowData.push(node.data);
        });
        alasql('SELECT * INTO XLSX("' + this.table + '.xlsx",{headers:true}) FROM ?', [rowData]);
    }

    this.isObject = function (item) {
        return (typeof item === "object" && !Array.isArray(item) && item !== null);
    }

    this.clean = function (obj) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
                delete obj[propName];
            }
        }
    }


});



//        return dazzle;

			//module.exports = {
		//		dazzle
	//		}
   // });

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
const ngRoute = require('angular-route');
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
//require('moment');
require('angular-bootstrap-calendar');

//import mwl.calendar from './js/angular-bootstrap-calendar-tpls.min.js';
import ngMaterialSidemenu from './js/angular-material-sidemenu.js';
import angularMoment from './js/angular-moment.min.js';
import slickCarousel from './js/angular-slick-3.1.7.min.js';
import lfNgMdFileInput from './js/angular-material-fileinput-1.5.2.js';
import mdTimePicker from './js/angular-material-timepicker-1.0.7.js';
import atMultirangeSlider from './js/angular-multirange-slider-1.1.1.js';
import cfpHotkeys from './js/hotkeys.js';
import datepicker from 'angular-ui-bootstrap/src/datepicker';


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
//window.calendarConfig = calendarConfig;


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

        var providers = {};
        var dazzle = angular.module("dazzle", ['ngRoute','ngMaterial', 'ngMessages',
		'ngTouch', 'agGrid', 'angularGrid', 'oc.lazyLoad','ui.bootstrap','ui.tree','ui.ace','ui.sortable','ui.bootstrap.contextMenu',
		'ngMaterialSidemenu','angularMoment','slickCarousel','lfNgMdFileInput','md.time.picker','at.multirange-slider','cfp.hotkeys','mwl.calendar',datepicker]);



//      var dzCalendar = angular.module("mwl.calendar",['dazzle'])
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

      dazzle.config(['calendarConfig', function(calendarConfig) {

            console.log('Calendar Config',calendarConfig);

            // Use either moment or angular to format dates on the calendar. Default angular. Setting this will override any date formats you have already set.
            calendarConfig.dateFormatter = 'moment';

            // This will configure times on the day view to display in 24 hour format rather than the default of 12 hour
            calendarConfig.allDateFormats.moment.date.hour = 'HH:mm';

            // This will configure the day view title to be shorter
            calendarConfig.allDateFormats.moment.title.day = 'ddd D MMM';

            // This will set the week number hover label on the month view
            calendarConfig.i18nStrings.weekNumber = 'Week {week}';

            // This will display all events on a month view even if they're not in the current month. Default false.
            calendarConfig.displayAllMonthEvents = true;

            // Make the week view more like the day view, ***with the caveat that event end times are ignored***.
            calendarConfig.showTimesOnWeekView = true;

        }]);



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
        dazzle.service('$dazzleUser', function ($http, $location,$interval,$ocLazyLoad,$mdDialog, hotkeys) {
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
                myCompileRecord:[],
                toolbar: `
                    <md-toolbar class="md-accent dazzle">
                        <div class="md-toolbar-tools-dazzle">
                            <i class="fa fa-x fa-arrows" aria-hidden="true" ng-click="up()"></i>
                            <i class="fa fa-x fa-cog" aria-hidden="true"></i>
                            <i class="fa fa-x fa-bank" aria-hidden="true" ng-click="addElement()"></i>
                            <i class="fa fa-x fa-database" aria-hidden="true" ng-click="dbsettings()"></i>                            
                            <i class="fa fa-x fa-info" aria-hidden="true"></i>                            
                            <i class="fa fa-close right" ng-click="remove()"></i>
                        </div>
                      </md-toolbar>                
                    `
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
                    var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/loginPopup/popup.html" + "?id=" + new Date().getTime();
                    var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/loginPopup/popup.js" + "?id=" + new Date().getTime();
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
        dazzle.service('$dazzleInit',function($dazzleUser,$location, $dazzleS3,$http, $compile, $templateRequest, $interval, $mdDialog, $uibModal,$dazzlePopup, $ocLazyLoad,hotkeys){
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
//                    scope.saveRootHtml().then(function () {
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
//                    fullHtml.children('#editor-header').remove();

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
//                                reject();
                                resolve();
                            }
                        }, function () {
                            resolve();
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

//             scope.editRootHtml = function () {

//                 var atom = $dazzleUser.getDazzleInfo('atom');
//                 var masterAtom = $dazzleUser.getDazzleInfo('masterAtom');

//                 $dazzlePopup.code($('#root').html(), 'html').then(function (newCode) {
//                     var rootHtml = angular.element("<div></div>").append(newCode);
//                     scope.unwrap(rootHtml);
//                     rootHtml.find("[custom]").each(function (index, element) {
//                         var id = $(element).attr('id');
//                         if (!angular.isUndefined(atom[id])) {
//                             atom[id].html = $(element).html();
//                             $dazzleUser.setDazzleInfo('atom',atom);
//                         }
//                     });

//                     rootHtml.find("[master]").each(function (index, element) {
//                         var id = $(element).attr('id');
//                         if (!angular.isUndefined(masterAtom[id])) {
//                             masterAtom[id].html = $(element).html();
//                         }
//                     });

//                     //scope.$apply(function () {
//                         //scope.rootHtml = rootHtml.html();
//                     $dazzleUser.setDazzleInfo('atom',atom);
//                     $dazzleUser.setDazzleInfo('masterAtom',masterAtom);
//                     $dazzleUser.setDazzleInfo('rootHtml',rootHtml.html());
//                     //});

//                     setTimeout(function () {
//                         scope.save();
// //                        angular.element(document.getElementById('editor-header')).scope().saveAtom();
//                     }, 1000);
//                 });
//             }

   
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
        dazzle.service("$dazzlePopup", function ($mdDialog, $mdBottomSheet, $mdToast, $ocLazyLoad, $dazzleUser) {
        var that = this;


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
 
            
        });
dazzle.service("$dazzleData", function ($window, $http, $compile, $uibModal, $mdDialog, $mdToast, $mdBottomSheet, $ocLazyLoad, $mdDateLocale, $dazzleS3, $dazzlePopup, $dazzleUser,  moment) {


});



//        return dazzle;

			//module.exports = {
		//		dazzle
	//		}
   // });

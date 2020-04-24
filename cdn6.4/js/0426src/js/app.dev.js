define(['dazzle', 'store', 'moment','domready','hotkeys'], function (dazzle, store,moment,hotkeys) {
    console.log('app.js');
    $(document).ready(function (e) {
        $('body').append(`
            <div style="height: 100%;" layout="row" layout-sm="column" layout-align="space-around" ng-if="!inited">
                <md-progress-circular md-mode="indeterminate"></md-progress-circular>
                <h1>如時間太長，沒有顯示。請重新載入</h1>
        </div>
        <new-editor-header id="editor-header"></new-editor-header>
        <editor-body id="editor-body"></editor-body>

        `);

        $('body').attr('ng-controller', 'editorController');
        $('body').attr('ng-init', 'init()');
    });

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



    var app = angular.module("demoApp", ["dazzle", "ui.bootstrap.contextMenu", "at.multirange-slider",'angularMoment','cfp.hotkeys']);
//... start
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

    //
    // app.directive('draggable', function() {
    //     return {
    //         // A = attribute, E = Element, C = Class and M = HTML Comment
    //         restrict: 'A',
    //         //The link function is responsible for registering DOM listeners as well as updating the DOM.
    //         link: function(scope, element, attrs) {
    //             element.draggable({
    //                 stop: function(event, ui) {
    //                     console.log("Check if its printing")
    //                     event.stopPropagation();
    //                 }
    //             });
    //         }
    //     };
    // });

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
//... end

    app.directive('bindHtmlCompile', function ($compile,$dazzleUser) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(function () {
                    return scope.$eval(attrs.bindHtmlCompile);
                }, function (newValue, oldValue) {
                    if (!angular.isUndefined(newValue)) {
                        element.html(newValue && newValue.toString());
                        var compileScope = scope;
                        if (attrs.bindHtmlScope) {
                            compileScope = scope.$eval(attrs.bindHtmlScope);
                        }


                        // console.log('Compile Info',element.parent().attr('id'),element);
                        // if (angular.isUndefined(element.parent().attr('id')))
                        //     console.log('You are undefined');
                        // else

                        console.log('Compile Info',element.parent().prop("tagName"),element.parent().attr('id'),element);
                        var id = element.parent().attr('id');

                        $compile(element.contents())(compileScope);

                    }
                });

            }
        };
    });




    app.controller('editorController', function ($scope, $http, $element, $compile, $templateRequest, $interval, $mdDialog, $uibModal, $dazzleUser, $dazzleInit, $dazzleS3, $dazzlePopup, $ocLazyLoad,hotkeys) {

        console.log('editorController');
        $scope.inited = false;

        hotkeys.bindTo($scope).add({
            combo: ['ctrl','s'],
            callback: function() {
                console.log('Editor Save');              
            }
        });
        // $scope.angularMoment = function(a,b,c){
        //         return moment(a,b,c);
        // }
        $scope.$dazzlePopup = $dazzlePopup;
        $scope.saveStore = function (key, value) {
            store.set(key, value);
        }
        $scope.loadStore = function (key) {
            return store.get(key);
        }
        $scope.removeStore = function (key) {
            store.remove(key);
        }
        $scope.init = function () {
            if (!angular.isUndefined(QueryString.singlePage)) {
                store.set('singlePage', QueryString.singlePage);
                console.log('singlePage',QueryString.singlePage);
                $dazzleUser.setDazzleInfo('singlePage',QueryString.singlePage);
            }
            if (!angular.isUndefined(QueryString.websiteId)) {
                store.set('websiteId', QueryString.websiteId);
                $dazzleUser.setDazzleInfo('websiteId',QueryString.websiteId);
            }
            if (!angular.isUndefined(QueryString.editPage)) {
                store.set('thisPage', QueryString.editPage);
                console.log('thisPage',QueryString.editPage);
                $dazzleUser.setDazzleInfo('thisPage',QueryString.editPage);
            }

            if (!angular.isUndefined(QueryString.token)) {
                $dazzleUser.userLogin(QueryString.token).then(function () {
                   //document.location.href = "page.html";
                   $scope.loadAllInfo();
                }, function () {
                    $scope.logout();
                });
            }

        }

        $scope.loadAllInfo = function() {

            if ($dazzleUser.getUser()) {
                console.log('%c------------------------------------------', "color: blue; font-size:30px;");
                $dazzleUser.userLogin($dazzleUser.getUser().token).then(function () {
                    $scope.user = $dazzleUser.getUser();
                    $scope.websiteId = store.get('websiteId');
                    $dazzleUser.setDazzleInfo('websiteId',$scope.websiteId);
                    if (!$scope.user || !$scope.websiteId) {
                        $scope.logout();
                    } else {
                        console.log("User", ":", $scope.user);
                        console.log("websiteId", ":", $scope.websiteId);
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
                    }
                }, function () {
                    $scope.logout();
                });
            } else {
                $scope.logout();
            }
        }


        $scope.initStep1 = function () {
            console.log('%c-----------------Init 1/3-----------------', "color: blue; font-size:30px;");
            $scope.userBucket = "dazzle-user-" + $scope.user.uid;
            $scope.websiteKey = 'website/' + $scope.websiteId + '/';
            $scope.atom = {};
            $scope.masterAtom = {};
            $scope.tableJson = [];
            $scope.pageJson = ['index'];
            $scope.thisPage = store.get('thispage') || 'index';
            $scope.thisLang = store.get('thislang') || 'zh';
            templateUrl: "https://dazzle-template.s3.amazonaws.com/builder6.0/dazzleToolbar/element.html?id=" + new Date().getTime(),

            $dazzleS3.getFile("dazzle-template","file6.0/toolbar.html").then(function(result){
                $scope.toolbar=result; 
                console.log('Tool Bar',result);
            });
            $dazzleS3.getJson($scope.userBucket, $scope.websiteKey + 'json/website.json').then(function (website) {
                $scope.website = website;
                $scope.exportBucket = $scope.website.bucket;
                console.log("1.1", "UserBucket", ":", $scope.userBucket);
                console.log("1.2", "ExportBucket", ":", $scope.exportBucket);
                console.log("1.3", "Website Key", ":", $scope.websiteKey);
                console.log("1.4", "Website", ":", website);
                if (store.get('singlepage')) {
                    $scope.singlepage = store.get('singlepage');
                    console.log("1.5", "SinglePage", ":", $scope.singlepage);
                    //               store.clear('singlepage');
                    store.remove("singlepage");
                }
                console.log("1.6", $scope.thisPage);
                console.log("1.7",$scope.websiteId);

                $dazzleUser.setDazzleInfo('userBucket',$scope.userBucket);
                $dazzleUser.setDazzleInfo('exportBucket',$scope.exportBucket);
                $dazzleUser.setDazzleInfo('websiteKey',$scope.websiteKey);
                $dazzleUser.setDazzleInfo('website',$scope.website);
                $dazzleUser.setDazzleInfo('singlepage',$scope.singlepage);
                $dazzleUser.setDazzleInfo('thisPage',$scope.thisPage);
                $dazzleUser.setDazzleInfo('websiteId',$scope.websiteId);

                $scope.initStep2();
            });
        }
        $scope.initStep2 = function () {
            console.log('%c-----------------Init 2/3-----------------', "color: blue; font-size:30px;");
            Promise.all([
                $scope.loadCustomDirectives(),
                $scope.loadCoreDirectives(),
                $scope.loadThisPageJson(),
                $scope.loadMasterJson(),
                $scope.loadPageJson()]).then(function (result) {
                $scope.customDirectivesJson = result[0];
                $scope.coreDirectivesJson = result[1];
                $scope.thisPageJson = result[2];
                $scope.masterJson = result[3];
                $scope.pageJson = result[4];
                console.log("2.1", "Custom Directives", ":", result[0]);
                console.log("2.2", "Core Directives", ":", result[1]);
                console.log("2.3", "This Page Json", ":", result[2]);
                console.log("2.4", "This Master Json", ":", result[3]);
                console.log("2.5", "Page Json", ":", result[4]);

                $dazzleUser.setDazzleInfo('customDirectivesJson',$scope.customDirectivesJson);
                $dazzleUser.setDazzleInfo('coreDirectivesJson',$scope.coreDirectivesJson);
                $dazzleUser.setDazzleInfo('thisPageJson',$scope.thisPageJson);
                $dazzleUser.setDazzleInfo('masterJson',$scope.masterJson);
                $dazzleUser.setDazzleInfo('pageJson',$scope.pageJson);


                $ocLazyLoad.load([
                    'http://' + $scope.exportBucket + '/js/' + $scope.thisPage + '.js',
                    'http://' + $scope.exportBucket + '/css/' + $scope.thisPage + '.css',
                    'http://' + $scope.exportBucket + '/js/master.js',
                    'http://' + $scope.exportBucket + '/css/master.css',
                    $scope.thisPageJson.js,
                    $scope.thisPageJson.css,
                    $scope.masterJson.js,
                    $scope.masterJson.css
                ], {cache: false}).then(function (result) {
                    $scope.initStep3();
                }, function (err) {
                    $scope.initStep3();
                });
            });
        }
        $scope.initStep3 = function () {
            console.log('%c-----------------Init 3/3-----------------', "color: blue; font-size:30px;");
            $scope.loadAtom().then(function () {
                console.log('3.1', 'Atom Json', ':', $scope.atom);
                $scope.loadMasterAtom().then(function () {
                    console.log('3.2', 'Master Atmo Json', ':', $scope.masterAtom);

                    $dazzleUser.setDazzleInfo('atom',$scope.atom);
                    $dazzleUser.setDazzleInfo('masterAtom',$scope.masterAtom);

                    $scope.initEnd();
                });
            });
        };

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

            setTimeout(function () {
//            if (angular.isUndefined($scope.rootHtml) || $scope.rootHtml == null) {
                //load page html
                $dazzleS3.getFile(userBucket, websiteKey + 'page/' + thisPage + '/page.html').then(function (html) {

                    //load html
                    var rootHtml = angular.element("<div></div>").append(html);
                    $scope.unwrap(rootHtml);
                    $scope.rootHtml = rootHtml.html();
//                        $('#root').html($scope.rootHtml);
                    $scope.$apply(function () {
 //                       $('#editor-body').html(html);
 //                        $compile($element.contents())($scope);
                        $compile($('editor-header'))($scope);
                        $compile($('new-editor-header'))($scope);
   //                     $scope.compileAtom();
                        $compile($('editor-body'))($scope);
                    },function(err){
                        console.log(err);
                    });

                    $dazzleUser.setDazzleInfo('rootHtml',$scope.rootHtml);
                    console.log('Compiling');
                    // $('editor-body2').html(html);
                    // $compile($element.contents())($scope);

                    // if ($scope.thisLang !== 'zh') {
                    //     //load other language
                    //     $dazzleS3.getFile(userBucket, websiteKey + 'page/' + thisPage + '/page' + '_' + thisLang + '.html').then(function (html) {
                    //         $scope.$apply(function () {
                    //             var rootHtml = angular.element("<div></div>").append(html);
                    //             $scope.unwrap(rootHtml);
                    //             $scope.rootHtml = rootHtml.html();
                    //             $compile($element.contents())($scope);
                    //             $dazzleUser.setDazzleInfo('rootHtml',$scope.rootHtml);
                    //
                    //         });
                    //     }, function (err) {
                    //         //other language html not found, save it
                    //         $dazzleS3.saveFile(userBucket, websiteKey + 'page/' + thisPage + '/page' + '_' + thisLang + '.html', $scope.rootHtml);
                    //     });
                    // }
                }, function (err) {
                    //zh html file not found , init a new one
                    AWS.config.region = 'ap-southeast-1';
                    $dazzleS3.getFile("dazzle-template", "file6.0/welcome.html").then(function (html) {
                        AWS.config.region = 'ap-northeast-1';
                        $scope.rootHtml = html || "<h2><span style='background-color: initial;'>甇∟��</span></h2>";
                        $compile($element.contents())($scope);
                        $dazzleS3.saveFile(userBucket, websiteKey + 'page/' + thisPage + '/page.html', $scope.rootHtml);
                        if ($scope.thisLang !== 'zh') {
                            $dazzleS3.saveFile(userBucket, websiteKey + 'page/' + thisPage + '/page' + '_' + thisLang + '.html', $scope.rootHtml);
                        }
                    });
                });
//            }
                $scope.inited = true;
                $dazzleUser.setRootScope($scope);
            }, 2000);
        }
        $scope.initEnd = function () {
            console.log('%c------------------------------------------ Load Page---------------', "color: blue; font-size:30px;");
            var userBucket = $dazzleUser.getDazzleInfo('userBucket');
            var websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
            var thisPage = $dazzleUser.getDazzleInfo('thisPage');
            var atom = $dazzleUser.getDazzleInfo('atom');
            var thisLang = $dazzleUser.getDazzleInfo('thisLang');

            setTimeout(function () {
//            if (angular.isUndefined($scope.rootHtml) || $scope.rootHtml == null) {
                //load page html
                $dazzleS3.getFile(userBucket, websiteKey + 'page/' + thisPage + '/page.html').then(function (html) {
                   
                        //load html
                        var rootHtml = angular.element("<div></div>").append(html);
                        $scope.unwrap(rootHtml);
                        $scope.rootHtml = rootHtml.html();
//                        $('#root').html($scope.rootHtml);
                        $scope.$apply(function () {
                            $('dazzle-body').html(html);
//                            $compile($element.contents())($scope);
                            $compile($('editor-header'))($scope);
                            $compile($('editor-body'))($scope);
                        },function(err){
                            console.log(err);
                        });
                        
                        $dazzleUser.setDazzleInfo('rootHtml',$scope.rootHtml);
                        console.log('Compiling');
                        // $('editor-body2').html(html);
                        // $compile($element.contents())($scope);

                    if ($scope.thisLang !== 'zh') {
                        //load other language
                        $dazzleS3.getFile(userBucket, websiteKey + 'page/' + thisPage + '/page' + '_' + thisLang + '.html').then(function (html) {
                            $scope.$apply(function () {
                                var rootHtml = angular.element("<div></div>").append(html);
                                $scope.unwrap(rootHtml);
                                $scope.rootHtml = rootHtml.html();
                                $compile($element.contents())($scope);
                                $dazzleUser.setDazzleInfo('rootHtml',$scope.rootHtml);

                            });
                        }, function (err) {
                            //other language html not found, save it
                            $dazzleS3.saveFile(userBucket, websiteKey + 'page/' + thisPage + '/page' + '_' + thisLang + '.html', $scope.rootHtml);
                        });
                    }
                }, function (err) {
                    //zh html file not found , init a new one
                    AWS.config.region = 'ap-southeast-1';
                    $dazzleS3.getFile("dazzle-template", "file6.0/welcome.html").then(function (html) {
                        AWS.config.region = 'ap-northeast-1';
                        $scope.rootHtml = html || "<h2><span style='background-color: initial;'>甇∟��</span></h2>";
                        $compile($element.contents())($scope);
                        $dazzleS3.saveFile(userBucket, websiteKey + 'page/' + thisPage + '/page.html', $scope.rootHtml);
                        if ($scope.thisLang !== 'zh') {
                            $dazzleS3.saveFile(userBucket, websiteKey + 'page/' + thisPage + '/page' + '_' + thisLang + '.html', $scope.rootHtml);
                        }
                    });
                });
//            }
                $scope.inited = true;
                $dazzleUser.setRootScope($scope);
            }, 2000);
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
        // $scope.featherEditorInit = function () {
        //     $scope.featherEditor = new Aviary.Feather({
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
        //                     "bucket": $scope.exportBucket
        //                 }
        //             }).then(function (result) {
        //                 var jdate = JSON.parse(result.data);
        //                 if (jdate.code > 0) {
        //                     $scope.featherEditor.scope.model.src = jdate.text;
        //                     $scope.featherEditor.scope.updateHtml();
        //                 }
        //                 $scope.featherEditor.close();
        //             });
        //         }
        //     });
        // }();
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


        // $scope.editorCustomInit = function (scope, element, attr) {
        //     return new Promise(function (resolve, reject) {
        //         scope.updateHtml = function() {
        //             return $dazzleInit.updateHtml(scope);
        //         }
        //         // scope.updateHtml = function () {
        //         //     return new Promise(function (rs, rj) {
        //         //         $templateRequest(scope.templateUrl).then(function (html) {
        //         //             var template = angular.element("<div></div>").html(html);
        //         //             $scope.unwrap(template);
        //         //             scope.model.html = template.html();
        //         //             rs();
        //         //         });
        //         //     });
        //         // }
        //         scope.useTemplate = fucntion() {
        //             return $dazzleInit.useTemplate(scope);
        //         }
        //         // scope.useTemplate = function () {
        //         //     return new Promise(function (rs, rj) {
        //         //         if (scope.model.template) {
        //         //             $ocLazyLoad.load([scope.model.template.css], {cache: false});
        //         //             scope.templatePath = "builder6.0/template/" + scope.model.type + "/" + scope.model.template.id + ".html?id=" + new Date().getTime()
        //         //             scope.templateUrl = scope.http + scope.templatePath;
        //         //         }
        //         //         scope.updateHtml().then(function () {
        //         //             rs();
        //         //         });
        //         //     });
        //         // }
        //
        //         scope.updateRealHtml = function() {
        //             return $dazzleInit.updateRealHtml(scope);
        //         }
        //         // scope.updateRealHtml = function () {
        //         //     return new Promise(function () {
        //         //         $templateRequest(scope.http + "builder6.0/" + scope.directiveId + "/realHtml.html" + "?id" + new Date().getTime()).then(function (html) {
        //         //             scope.model.realHtml = html;
        //         //         });
        //         //     })
        //         // }
        //         //
        //
        //         $scope.atom = $dazzleUser.getDazzleInfo('atom');
        //         $scope.thisPageJson = $dazzleUser.getDazzleInfo('thisPageJson');
        //
        //         scope.id = element.attr('id') || "ele" + new Date().getTime() + "-" + Object.keys($scope.atom).length;
        //
        //         element.attr('id', scope.id);
        //         element.attr('custom', scope.type);
        //
        //         if ($scope.thisPageJson.css.indexOf(scope.http + "builder6.0/" + scope.directiveId + "/" + "element.css") < 0) {
        //             $scope.thisPageJson.css.push(scope.http + "builder6.0/" + scope.directiveId + "/" + "element.css");
        //             $ocLazyLoad.load([scope.http + "builder6.0/" + scope.directiveId + "/" + "element.css"], {cache: false});
        //         }
        //         if (element.closest('[master]').length > 0) {
        //             if ($scope.masterJson.css.indexOf(scope.http + "builder6.0/" + scope.directiveId + "/" + "element.css") < 0) {
        //                 $scope.masterJson.css.push(scope.http + "builder6.0/" + scope.directiveId + "/" + "element.css");
        //             }
        //         }
        //
        //         if (angular.isUndefined($scope.atom[scope.id])) {
        //             //this is new atom
        //             $scope.atom[scope.id] = {
        //                 "id": scope.id,
        //                 "type": scope.type,
        //                 "html": "Hello World" + " - " + scope.id + "[" + scope.type + "]"
        //             };
        //             if ($.trim(element.html())) {
        //                 //this new atom have content
        //                 $scope.unwrap(element);
        //                 $scope.atom[scope.id].html = element.html();
        //                 scope.model = $scope.atom[scope.id];
        //
        //                 resolve();
        //             } else {
        //                 //this atom no content, get template
        //                 scope.model = $scope.atom[scope.id];
        //                 scope.updateHtml().then(function () {
        //
        //                     resolve();
        //                 });
        //             }
        //         } else {
        //             //this is old atom
        //             var oldAtom = angular.element("<div></div>").html($scope.atom[scope.id].html);
        //             $scope.unwrap(oldAtom);
        //             $scope.atom[scope.id].html = oldAtom.html();
        //             scope.model = $scope.atom[scope.id];
        //             if (!angular.isUndefined(scope.model.template) && scope.model.template) {
        //                 //this atom using template
        //                 if (scope.model.template.cssCode) {
        //                     $ocLazyLoad.load([scope.model.template.cssCode], {cache: false});
        //                 }
        //                 resolve();
        //             } else {
        //                 resolve();
        //             }
        //         }
        //     });
        // };
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
        //... start
        //
        //
        //
        //... old
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
        $scope.getJson = function (bucket, key) {
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
                        resolve(JSON.parse(data.Body.toString()));
                    }
                });
            });
        }
        $scope.saveJson = function (bucket, key, json) {
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
        $scope.getFile = function (bucket, key) {
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
        $scope.saveFile = function (bucket, key, string) {
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
        $scope.listObject = function (bucket, key) {
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
        $scope.copyFile = function (CopySource, bucket, key) {
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
        $scope.checkFile = function (bucket, key) {
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
        $scope.getFileUrl = function (bucket, key) {
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
        $scope.linkPopup = function (element, oldLink) {
            return new Promise(function (resolve, reject) {
                $mdDialog.show({
                    controller: 'linkPopupController',
                    templateUrl: 'https://dazzle-template.s3.amazonaws.com/cdn6.0/models/linkPopup/popup.html' + "?id=" + new Date().getTime(),
                    clickOutsideToClose: false,
                    escapeToClose: false,
                    multiple: true,
                    locals: {
                        rootScope: $scope,
                        element: element || null,
                        oldLink: oldLink || ''
                    }
                }).then(function (link) {
                    resolve(link);
                }, function () {
                    reject();
                });
            })
        }
        $scope.openDataPopup = function (table) {
            $mdDialog.show({
                controller: 'dataPopupController',
                templateUrl: 'https://dazzle-template.s3.amazonaws.com/cdn6.0/models/dataPopup/popup.html' + "?id=" + new Date().getTime(),
                clickOutsideToClose: false,
                escapeToClose: false,
                locals: {
                    rootScope: $scope,
                    table: table
                }
            }).then(function () {
                if ($scope.updateData && !$scope.dataManagement) {
                    $scope.updateData();
                }
            });
        }
        $scope.openPageJsCssPopup = function (pageJson) {
            return new Promise(function (resolve, reject) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    keyboard: false,
                    animation: true,
                    backdrop: 'static',
                    size: 'lg',
                    templateUrl: 'https://dazzle-template.s3.amazonaws.com/cdn6.0/models/pageJsCssPopup/popup.html' + "?id=" + new Date().getTime(),
                    controller: 'pageJsCssInstanceCtrl',
                    resolve: {
                        pageJson: function () {
                            return pageJson;
                        },
                        scope: function () {
                            return $scope
                        }
                    }
                });

                modalInstance.result.then(function (result) {
                    resolve(result);
                });
            })
        };
        $scope.openCodePopup = function (code, type,bucket,key) {
            return new Promise(function (resolve, reject) {
                $dazzlePopup.saveCode(code, type,$scope.userBucket,bucket,key).then(function (newcode) {
                    resolve(newcode);
                }, function () {
                    reject();
                })
            })
        };
        $scope.makeId = function () {
            return new Date().getTime();
        }
        //... old
    });
});
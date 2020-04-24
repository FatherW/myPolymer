
function loadCss(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}


loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/font-awesome-4.7.0.min.css");
loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/medium-editor-5.23.1.min.css");
loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/jquery-ui-1.12.1.min.css");
loadCss("https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.css");
loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/angular-jk-rating-stars-1.0.7.min.css");
loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/angular-multirange-slider-1.1.1.css");
loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/angular-ui-tree-2.22.5.min.css");
loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/bootstrap-3.3.7.min.css");
loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/slick-1.6.0.min.css");
loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/slick-1.6.0-theme.min.css");
loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/angular-material-fileinput-1.5.2.min.css");
loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/angular-material-timepicker-1.0.7.css");
loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/angular-material-1.1.4.min.css");
//        loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/builder-index.css");
loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/angular-material-sidemenu.css");

loadCss("https://fonts.googleapis.com/icon?family=Material+Icons");
loadCss("https://dashboard.dazzle.website/css/index.css");
loadCss("https://mattlewis92.github.io/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css");
//loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.0/controller/index.js");
//    loadJs("https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.4/js/bootstrap-select.min.js");
loadCss("https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.4/css/bootstrap-select.min.css");


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
var app = angular.module("demoApp");

app.config(['$provide', function($provide) {

    $provide.factory('dzFn', function ($http, $dazzleUser, $dazzleS3, $ocLazyLoad, $mdDialog, $mdToast) {
        var dzFn={};
        dzFn.sendSystemMessage = function(topic,msg) {
            return new Promise(function (resolve, reject) {

                var params = {
                    Message: JSON.stringify(msg),
                    TopicArn: 'arn:aws:sns:ap-northeast-1:448984897563:' + topic
                };

                // Create promise and SNS service object
                var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

                // Handle promise's fulfilled/rejected states
                publishTextPromise.then(
                    function (data) {
                        console.log(`Message ${params.Message} send sent to the topic ${params.TopicArn}`);
                        console.log("MessageID is " + data.MessageId);
                        resolve();
                    }).catch(
                    function (err) {
                        console.error(err, err.stack);
                        reject();
                    });
            });
        }
        return dzFn;
    });
}]);
//
// app.config(['calendarConfig', function(calendarConfig) {
//
//     // View all available config
//     console.log(calendarConfig);
//
//     // Change the month view template globally to a custom template
//     //    calendarConfig.templates.calendarMonthView = 'path/to/custom/template.html';
//
//     // Use either moment or angular to format dates on the calendar. Default angular. Setting this will override any date formats you have already set.
//     calendarConfig.dateFormatter = 'moment';
//
//     // This will configure times on the day view to display in 24 hour format rather than the default of 12 hour
//     calendarConfig.allDateFormats.moment.date.hour = 'HH:mm';
//
//     // This will configure the day view title to be shorter
//     calendarConfig.allDateFormats.moment.title.day = 'ddd D MMM';
//
//     // This will set the week number hover label on the month view
//     calendarConfig.i18nStrings.weekNumber = 'Week {week}';
//
//     // This will display all events on a month view even if they're not in the current month. Default false.
//     calendarConfig.displayAllMonthEvents = true;
//
//     // Make the week view more like the day view, ***with the caveat that event end times are ignored***.
//     calendarConfig.showTimesOnWeekView = true;
//
// }]);

app.filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);
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
app.directive('bindHtmlCompile', ['$compile', function ($compile) {
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
                    // if (angular.isUndefined(element.parent().attr('id')))
                    //     console.log('You are undefined');
                    // else
                    $compile(element.contents())(compileScope);
                }
            });
        }
    };
}]);


app.controller('editorController', function ($scope, $http, $element, $compile, $templateRequest, $interval, $mdDialog, $uibModal, $dazzleUser, $dazzleInit, $dazzleS3, $dazzlePopup, $ocLazyLoad,hotkeys) {

    console.log('editorController');
	console.log(window);
    $scope.inited = false;

    hotkeys.bindTo($scope).add({
        combo: ['ctrl','s'],
        callback: function() {
            console.log('Editor Save');
        }
    });
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
        console.log('Init');
        $scope.loadAllInfo();

        // if (!angular.isUndefined(QueryString.singlePage)) {
        //     store.set('singlePage', QueryString.singlePage);
        //     console.log('singlePage',QueryString.singlePage);
        //     $dazzleUser.setDazzleInfo('singlePage',QueryString.singlePage);
        // }
        // if (!angular.isUndefined(QueryString.websiteId)) {
        //     store.set('websiteId', QueryString.websiteId);
        //     $dazzleUser.setDazzleInfo('websiteId',QueryString.websiteId);
        // }
        // if (!angular.isUndefined(QueryString.editPage)) {
        //     store.set('thisPage', QueryString.editPage);
        //     console.log('thisPage',QueryString.editPage);
        //     $dazzleUser.setDazzleInfo('thisPage',QueryString.editPage);
        // }
        //
        // if (!angular.isUndefined(QueryString.token)) {
        //     $dazzleUser.userLogin(QueryString.token).then(function () {
        //         //document.location.href = "page.html";
        //         $scope.loadAllInfo();
        //     }, function () {
        //         $scope.logout();
        //     });
        // }

    }

    $scope.loadAllInfo = function() {
        console.log('Load All Info');
        console.log('%c------------------------------------------', "color: blue; font-size:30px;");
        $dazzleUser.userLogin($dazzleUser.getUser().token).then(function () {
            $scope.user = $dazzleUser.getUser();
            $scope.websiteId = $dazzleUser.getDazzleInfo('websiteId');
            $scope.userBucket = $dazzleUser.getDazzleInfo('userBucket');
            $scope.websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
            $scope.website = $dazzleUser.getDazzleInfo('website');
            console.log('Info',$scope.userBucket);
            console.log("User", ":", $scope.user);
            console.log("websiteId", ":", $scope.websiteId);
            $scope.setUserType();
            $dazzleInit.loadDirectiveInfo().then(function(){
                $dazzleInit.loadPageInfo().then(function(){
                    $dazzleInit.loadAtomInfo().then(function(){
                        console.log('End');
                        $scope.loadPage();
                        setTimeout(function () {
                            $dazzleInit.save().then(function(result){
                                $http({
                                    "method": "post",
                                    "url": "https://d8fz9pfue5.execute-api.ap-northeast-1.amazonaws.com/prod/export/exportcontroller",
                                    "data": {
                                        "user": $dazzleUser.getUser(),
                                        "website": $dazzleUser.getDazzleInfo('website'),
                                        "exportPage": $dazzleUser.getDazzleInfo('thisPage')
                                    }
                                }).then(function (result) {
                                    console.log(result);
                                },function(err){
                                    console.log(err);
                                });
                                console.log('Saved');
                            });
                        }, 2000);

                    });
                });
            });
        }, function () {
            $scope.logout();
        });
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

//            setTimeout(function () {
        //load page html
        $dazzleS3.getFile(userBucket, websiteKey + 'page/' + thisPage + '/page.html').then(function (html) {

            //load html
            var rootHtml = angular.element("<div></div>").append(html);
            $scope.unwrap(rootHtml);
            $scope.rootHtml = rootHtml.html();
            $scope.$apply(function () {
                //                       $('#editor-body').html(html);
                //                        $compile($element.contents())($scope);
                $compile($('editor-header'))($scope);
                $compile($('new-editor-header'))($scope);
                $compile($('editor-body'))($scope);
            },function(err){
                console.log(err);
            });

            $dazzleUser.setDazzleInfo('rootHtml',$scope.rootHtml);
            console.log('Compiling');

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
        $scope.inited = true;
        $dazzleUser.setRootScope($scope);
        //          }, 2000);
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
    // $scope.loadingWithTimer = function (title, content, second) {
    //     return new Promise(function (resolve, reject) {
    //         $mdDialog.show({
    //             clickOutsideToClose: false,
    //             fullscreen: false,
    //             template: `<md-dialog aria-label="Loading">
    //                   <form ng-cloak>
    //                     <md-toolbar>
    //                       <div class="md-toolbar-tools">
    //                         <h2>{{title}}</h2>
    //                       </div>
    //                     </md-toolbar>
    //                     <md-dialog-content>
    //                       <div class="md-dialog-content">
    //                         <h2 style="text-align:center;">隢讠�匧�㬹{needSecond-usedSecond}}蝘�</h2>
    //                         <p>{{content}}<p>
    //                         <div layout="row" layout-sm="column" layout-align="space-around">
    //                           <md-progress-linear md-mode="determinate" value="{{everyScondPercentage * usedSecond}}"></md-progress-linear>
    //                         </div>
    //                       </div>
    //                     </md-dialog-content>
    //                   </form>
    //                 </md-dialog>`,
    //             locals: {
    //                 title: title,
    //                 content: content,
    //                 second: second,
    //             },
    //             controller: function ($scope, $interval, $mdDialog, title, content, second) {
    //                 $scope.title = title;
    //                 $scope.content = content;
    //                 $scope.needSecond = second;
    //                 $scope.usedSecond = 0;
    //                 $scope.everyScondPercentage = 100 / second;
    //                 $interval(function () {
    //                     $scope.usedSecond++;
    //                     if ($scope.usedSecond == $scope.needSecond) {
    //                         $mdDialog.hide();
    //                     }
    //                 }, 1000, 0);
    //             }
    //         }).then(function () {
    //             resolve();
    //         });
    //     });
    // }
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

app.config(function ($routeProvider) {
    $routeProvider
        .when('/main', {
            templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/main.html' + "?id=" + new Date().getTime(),
            controller: 'mainController'
        })
        .when('/detail', {
            templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/detail.html' + "?id=" + new Date().getTime(),
            controller: 'detailController'
        })
        .when('/changePassword', {
            templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/changePassword.html' + "?id=" + new Date().getTime(),
            controller: 'changePasswordController'
        })
        .when('/rechargeRecord', {
            templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/rechargeRecord.html' + "?id=" + new Date().getTime(),
            controller: 'rechargeRecordController'
        })
        .when('/buyRecord', {
            templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/buyRecord.html' + "?id=" + new Date().getTime(),
            controller: 'buyRecordController'
        })
        .when('/sellRecord', {
            templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/sellRecord.html' + "?id=" + new Date().getTime(),
            controller: 'sellRecordController'
        })
        .when('/listWebsite', {
            templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/listWebsite.html' + "?id=" + new Date().getTime(),
            controller: 'listWebsiteController'
        })
        .when('/controlDb/:table', {
            templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/myElastic.html' + "?id=" + new Date().getTime(),
            controller: 'controlDbController'
        })
        .when('/listElastic/:website/:id', {
            templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/myElastic.html' + "?id=" + new Date().getTime(),
            controller: 'myElasticController'
        })
        .when('/myPhotos', {
            templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/myPhotos.html' + "?id=" + new Date().getTime(),
            controller: 'myPhotosController'
        })
        .when('/myWebsite', {
            templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/myWebsite.html' + "?id=" + new Date().getTime(),
            controller: 'myWebsiteController'
        })
        .when('/paypalCallback', {
            templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/paypalCallback.html' + "?id=" + new Date().getTime(),
            controller: 'paypalCallbackController'
        })
        .when('/myDoc', {
            templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/myDoc.html' + "?id=" + new Date().getTime(),
            controller: 'myDocController'
        })
        .when('/boughtImage', {
            templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/boughtImage.html' + "?id=" + new Date().getTime(),
            controller: 'boughtImageController'
        })
        .when('/soldImage', {
            templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/soldImage.html' + "?id=" + new Date().getTime(),
            controller: 'soldImageController'
        })
        .when('/myVideos', {
            templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/myVideos.html' + "?id=" + new Date().getTime(),
            controller: 'myVideosController'
        })
        .when('/myDbManage/:website/:id', {
            templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/myDbManage.html' + "?id=" + new Date().getTime(),
            controller: 'myDbManageController'
        })
        .otherwise({
            redirectTo: '/myWebsite'
        });
});
app.config(function ($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function (date) {
        return moment(date).format('DD/MM/YYYY');
    };
});
app.filter('toDate', function () {
    return function (input) {
        return moment(input, 'DD/MM/YYYY').toDate();
    }
});
app.filter('toDDMMYYYDate', function ($filter) {
    return function (theDate) {
        if (theDate && angular.isDate(new Date(theDate))) {
            return moment(new Date(theDate)).format('DD/MM/YYYY');
        } else {
            return "";
        }
    }
});

app.directive('dashboard', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var dashboard = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard-view.html',
        link: function (scope, element, attrs) {
        },
        controller: function ($scope, $element, $attrs, $http, $timeout, $ocLazyLoad, $mdDialog, $dazzleS3, $dazzlePopup, $dazzleUser,$dazzleInit) {
            // console.log('dashboardController');
            // $scope.dashboardInited = false;
            // $scope.isAdmin = false;
            // $scope.isDesigner = false;
            // $scope.isUser = false;
            // $scope.loadDirectiveInfo = function() {
            //
            //
            //     var url = "//dazzle-template.s3.amazonaws.com/builder6.0/";
            //     return new Promise(function (resolve, reject) {
            //
            //
            //         $http({
            //             "method": "post",
            //             "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/getdirective",
            //             "data": {
            //                 "type": "getDirectiveByOwners",
            //                 "owner":["dazzle6.4"]
            //             }
            //         }).then(function (result) {
            //             if (result.data.code > 0) {
            //                 json = result.data.data;
            //                 console.log('My Directive',json);
            //                 var count = 0;
            //                 var length = json.length;
            //                 for (var i = 0; i < length; i++) {
            //                     js = url + json[i].name + "/element.js";
            //                     css = url + json[i].name + "/element.css";
            //                     console.log('Load Directive', css, js);
            //                     $ocLazyLoad.load([css, js], {cache: false}).then(function () {
            //                         count++;
            //                         if (count >= length)
            //                             resolve();
            //                     }, function () {
            //                         count++;
            //                         if (count >= length)
            //                             resolve();
            //                     });
            //                 }
            //
            //
            //             } else
            //                 reject();
            //         });
            //     });
            // }
            // $scope.init = function () {
            //     if (!angular.isUndefined(QueryString.token)) {
            //         console.log('dashboardController2');
            //
            //         $dazzleUser.userLogin(QueryString.token).then(function () {
            //             document.location.href = "index.html";
            //         }, function () {
            //             $scope.logout();
            //         });
            //     } else if ($dazzleUser.getUser()) {
            //         console.log('dashboardController3');
            //
            //         $dazzleUser.userLogin($dazzleUser.getUser().token).then(function () {
            //             $scope.$apply(function () {
            //                 $scope.user = $dazzleUser.getUser();
            //                 $scope.loadDirectiveInfo();
            //                 $scope.setUserType();
            //                 $scope.dashboardInited = true;
            //                 //  $dazzleInit.loadCustomElasticDirectives();
            //             });
            //         }, function () {
            //             $scope.logout();
            //         });
            //     } else {
            //         console.log('dashboardController4');
            //         $scope.logout();
            //     }
            // }
            // $scope.logout = function () {
            //     store.clearAll();
            //     document.location.href = "http://dazzle.website/";
            // }
            // $scope.setUserType = function () {
            //     if ($scope.user) {
            //         $scope.isUser = true;
            //         if ($scope.user.type) {
            //             if ($scope.user.type === 'admin') {
            //                 $scope.isAdmin = true;
            //                 $scope.isDesigner = true;
            //             } else if ($scope.user.type === 'designer') {
            //                 $scope.isDesigner = true;
            //             }
            //         } else {
            //             $scope.user.type = 'user';
            //         }
            //     }
            // }
            // $scope.toggleLeftMenu = buildDelayedToggler('left');
            // $scope.recharge = function () {
            //     $dazzlePopup.recharge();
            // }
            //
            // function debounce(func, wait, context) {
            //     var timer;
            //     return function debounced() {
            //         var context = $scope,
            //             args = Array.prototype.slice.call(arguments);
            //         $timeout.cancel(timer);
            //         timer = $timeout(function () {
            //             timer = undefined;
            //             func.apply(context, args);
            //         }, wait || 10);
            //     };
            // }
            //
            // function buildDelayedToggler(navID) {
            //     return debounce(function () {
            //         $mdSidenav(navID)
            //             .toggle()
            //             .then(function () {
            //                 console.log('toggleLeftMenu')
            //             });
            //     }, 200);
            // }
            //
            // $scope.listElastic = function(table) {
            //     document.location.href = "index.html#!/controlDb/"+table;
            // }
            //
            // $scope.loadElastic = function(table) {
            //     document.location.href = "index.html#!/listElastic/"+table;
            // }
            //
            // $scope.grabWebsite = function () {
            //     var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/grabWebsitePopup/popup.html" + "?id=" + new Date().getTime();
            //     var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/grabWebsitePopup/popup.js" + "?id=" + new Date().getTime();
            //     $ocLazyLoad.load([controllerUrl], {cache: false}).then(function () {
            //         $mdDialog.show({
            //             templateUrl: templateUrl,
            //             controller: grabWebsitePopupController
            //         });
            //     });
            // }
            //
            // $scope.loadMyTables = function() {
            //     return new Promise(function (resolve, reject) {
            //
            //         $http({
            //             "method": "post",
            //             "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
            //             "data": {
            //                 "action": "searchData",
            //                 "index": $dazzleUser.getUser().uid,
            //                 "type": "_table",
            //                 "body": {"query": {"match_all": {}}}
            //             }
            //         }).then(function (result) {
            //             console.log(result);
            //             if (result.data.code < 0) {
            //                 $dazzlePopup.toast(result.data.text + ":" + result.data.reject.msg);
            //                 $scope.myTables = [];
            //                 resolve([]);
            //
            //             } else {
            //                 if (!Array.isArray(result.data.resolve)){
            //                     $scope.myTables = [result.data.resolve];
            //                     resolve([result.data.resolve]);
            //                 }
            //                 else{
            //                     $scope.myTables = result.data.resolve;
            //                     resolve(result.data.resolve);
            //                 }
            //             }
            //         });
            //
            //     });
            // }


        }
    };
    return dashboard;
});

app.controller('dashboardController', function ($scope, $http, $timeout, $ocLazyLoad, $mdDialog, $dazzleS3, $dazzlePopup, $dazzleUser,$dazzleInit) {
    console.log('dashboardController');
	
	
	console.log(window);
	
	$ocLazyLoad.load("https://dazzle-template.s3.amazonaws.com/cdn6.0/js/src-noconflict/ace.js").then(function(){
		console.log('Post Window',window);
	});
	
	
	
    $scope.dashboardInited = false;
    $scope.isAdmin = false;
    $scope.isDesigner = false;
    $scope.isUser = false;
    $scope.loadDirectiveInfo = function() {


        var url = "//dazzle-template.s3.amazonaws.com/builder6.0/";
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
    $scope.init = function () {
        if (!angular.isUndefined(QueryString.token)) {
            console.log('dashboardController2');

            $dazzleUser.userLogin(QueryString.token).then(function () {
                document.location.href = "index.html";
            }, function () {
                $scope.logout();
            });
        } else if ($dazzleUser.getUser()) {
            console.log('dashboardController3');

            $dazzleUser.userLogin($dazzleUser.getUser().token).then(function () {
                $scope.$apply(function () {
                    $scope.user = $dazzleUser.getUser();
                    $scope.loadDirectiveInfo();
                    $scope.setUserType();
                    $scope.dashboardInited = true;
                    //  $dazzleInit.loadCustomElasticDirectives();
                });
            }, function () {
                $scope.logout();
            });
        } else {
            console.log('dashboardController4');
            $scope.logout();
        }
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
        var templateUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/grabWebsitePopup/popup.html" + "?id=" + new Date().getTime();
        var controllerUrl = "https://dazzle-template.s3.amazonaws.com/cdn6.0/models/grabWebsitePopup/popup.js" + "?id=" + new Date().getTime();
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
});

// function to act as a class
function dateRenderer() {
    this.container = document.createElement('div');
}

// gets called once before the renderer is used
dateRenderer.prototype.init = function (params) {
    if (params.value) {
        this.container.innerHTML = moment(new Date(params.value)).format('DD/MM/YYYY HH:mm:ss');
    } else {
        this.container.innerHTML = "";
    }
};

// gets called once when grid ready to insert the element
dateRenderer.prototype.getGui = function () {
    return this.container;
};

// gets called whenever the user gets the cell to refresh
dateRenderer.prototype.refresh = function (params) {
    this.container.innerHTML = "";
    this.init(params);
};

// gets called when the cell is removed from the grid
dateRenderer.prototype.destroy = function () {

};

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


app.controller('batchDownloadPopupController', function ($scope, $http, $filter, $mdDialog, $mdBottomSheet, $interval, allID, type) {
    $scope.loading = true;
    $scope.ok = false;
    $scope.err = false;
    var id = new Date().getTime();
    var url = "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/batchdownload";
    var params = {
        "target": allID,
        "id": id,
        "type": type
    }
    $http.post(url, params).then(function (result) {
        $scope.loading = false;
        console.log(result);
        if (result.data.indexOf("successful") != -1) {
            $scope.ok = true;
            console.log("vvvv whyyyy");
            console.log(result.data.replace("successful ", ""));
            $scope.successCount = parseInt(result.data.replace("successful ", ""));
            $scope.failCount = allID.length - $scope.successCount;
            $scope.downloadURL = "https://dashboard.dazzle.website/tempZip/dazzle-photo-" + id + ".zip";
        } else {
            $scope.err = true;
        }
    });
    $scope.cancel = function () {
        $mdDialog.hide();
    }
    $scope.download = function () {
        $mdDialog.hide();
    }
});

app.controller('boughtImageController', function ($scope, $http, $filter, $mdDialog, $mdBottomSheet, $mdToast) {
    $scope.eachShowNum = 500;
    console.log("vvvv vvvv 8");
    //for upload user defind data
    $scope.userType = '相片';
    //$scope.types = ("相片 插畫 3D模型 字型 LOGO 網站樣辦").split(' ').map(function(type) { //use later
    $scope.types = ("相片 插畫").split(' ').map(function (type) {
        return {abbrev: type};
    });

    $scope.init = function (type) {
        //$scope.$apply(function(){
        $scope.type = type;
        $scope.allNewArray = [];
        $scope.deleting = false;
        $scope.loading = true;
        $scope.end = false;
        $scope.tags = [];
        $scope.selected = [];
        $scope.selecting = false;
        $scope.deletedURL = [];
        $scope.selectedTags = [];
        $scope.LastEvaluatedKey = null;
        $scope.websitesAngularGridOptions = {
            gridWidth: 200,
            gutterSize: 4,
            infiniteScrollDelay: 1000,
            infiniteScrollDistance: 95,
            scrollContainer: '#sidecontent'
        }
        $scope.inited = false;
        $scope.websites = [];
        //});
        switch ($scope.type) {
            case "相片":
                console.log("vvvv 相片");
                $scope.px = 'images/' + $scope.user.uid + '/medium-web/';
                $scope.nowType = ".jpg";
                break;
            case "插畫":
                console.log("vvvv 插畫");
                $scope.px = 'illustration/' + $scope.user.uid + '/png/';
                $scope.nowType = ".png";
                break;
        }
        console.log('myPhotosController');
        console.log($scope.user.uid);
        console.log(AWS.config);

        var getBoughtUrl = "https://d8fz9pfue5.execute-api.ap-northeast-1.amazonaws.com/prod/getboughtimage";
        var gbParams = {
            "buyerId": $scope.user.uid,
            "type": type
        }
        $http.post(getBoughtUrl, gbParams).then(function (result) {
            console.log("vvvv newGet");
            console.log(result);
            var ay = [];
            if (!result.data.errorMessage) {
                console.log(result.data.Responses["dazzle-gallery"]);
                var dg = result.data.Responses["dazzle-gallery"];
                for (i = 0; i < dg.length; i++) {
                    switch ($scope.type) {
                        case "相片":
                            var dg1 = dg[i].mid_url.replace("https://designerrrr-output.s3-ap-northeast-1.amazonaws.com/", "");
                            var dgg = dg1.replace("medium", "medium-web");
                            break;
                        case "插畫":
                            var dg1 = dg[i].png_url.replace("https://designerrrr-output.s3-ap-northeast-1.amazonaws.com/", "");
                            var dgg = dg1;
                            break;
                    }
                    ay = ay.concat({Key: dgg});
                }
            }
            var dataa = {};
            dataa.Contents = ay;
            console.log(dataa);
            $scope.data = dataa;
            $scope.getWebsites($scope.eachShowNum, 0).then(function (anArray) {
                $scope.$apply(function () {
                    $scope.inited = true;
                    $scope.loading = false;
                    $scope.websites = $scope.websites.concat(anArray);
                    $scope.LastEvaluatedKey = $scope.eachShowNum;
                    console.log("vvvv $scope.websites");
                    console.log($scope.websites);
                });
            });
        });
    }

    $scope.loadMore = function () {
        console.log("loadMore");
        if (!$scope.end && !$scope.loading) {
            $scope.loading = true;
            $scope.getWebsites($scope.eachShowNum, $scope.LastEvaluatedKey).then(function (anArray) {
                $scope.loading = false;
                if (anArray.length > 0) {
                    $scope.websites = $scope.websites.concat(anArray);
                    $scope.LastEvaluatedKey = $scope.LastEvaluatedKey + $scope.eachShowNum;
                } else {
                    $scope.end = true;
                }
            });
        }
    }
    $scope.getWebsites = function (limit, key) {
        return new Promise(function (resolve, reject) {
            console.log("getWebsites");
            var data = $scope.data;
            console.log(data);
            var anArray = [];
            var counter = 0;
            var s3 = new AWS.S3();
            if ($scope.LastEvaluatedKey < data.Contents.length && data.Contents.length - $scope.LastEvaluatedKey < $scope.eachShowNum) { //show photo when unshow photo less than 50
                console.log("if");
                for (i = (0 + key); i < data.Contents.length; i++) {
                    var checkID = data.Contents[i].Key.substring(data.Contents[i].Key.lastIndexOf("/") + 1).replace($scope.nowType, "");
                    console.log("vvvv checkID");
                    console.log(checkID);
                    var notLoad = false;
                    for (j = 0; j < $scope.deletedURL.length; j++) {
                        if ($scope.deletedURL[j] == checkID) {
                            notLoad = true;
                        }
                    }
                    if (notLoad) {
                        console.log("dead img found");
                    } else {
                        console.log("dead img else");
                        var params = {
                            Bucket: "designerrrr-output",
                            Key: data.Contents[i].Key
                        };
                        var url = s3.getSignedUrl('getObject', params);
                        anArray[counter] = url;
                        counter++;
                    }
                }
                if ($scope.data.Contents.length <= $scope.eachShowNum) {
                    console.log("endFirst");
                    $scope.end = true;
                }
                console.log(anArray);
                resolve(anArray);
            } else if ($scope.LastEvaluatedKey < data.Contents.length) {
                console.log("else if");
                for (i = (0 + key); i < (limit + key); i++) {
                    console.log("vvvv for");
                    console.log(data.Contents[i]);
                    console.log(data.Contents[i].Key);
                    var checkID = data.Contents[i].Key.substring(data.Contents[i].Key.lastIndexOf("/") + 1).replace($scope.nowType, "");
                    console.log("vvvv checkID");
                    console.log(checkID);
                    var notLoad = false;
                    for (j = 0; j < $scope.deletedURL.length; j++) {
                        if ($scope.deletedURL[j] == checkID) {
                            notLoad = true;
                        }
                    }
                    if (notLoad) {
                        console.log("dead img found");
                    } else {
                        console.log("dead img else");
                        var params = {
                            Bucket: "designerrrr-output",
                            Key: data.Contents[i].Key
                        };
                        var url = s3.getSignedUrl('getObject', params);
                        anArray[counter] = url;
                        counter++;
                    }
                }
                console.log(anArray);
                resolve(anArray);
            } else {
                if ($scope.websites.length == 0) {
                    console.log("vvvv first 0");
                    $scope.inited = true;
                    $scope.loading = false;
                    $scope.LastEvaluatedKey = 0;
                }
                $scope.end = true;
                console.log("reject");
                reject("end");
            }
        });
    }
    $scope.getImage = function (key) {
        var s3 = new AWS.S3();
        var params = {
            Bucket: "designerrrr-output",
            Key: key
        };
        var url = s3.getSignedUrl('getObject', params);
        console.log(url);
        return url;
    }
    //For toast popup use
    var last = {
        bottom: true,
        top: false,
        left: false,
        right: true
    };
    $scope.toastPosition = angular.extend({}, last);
    $scope.getToastPosition = function () {
        sanitizePosition();
        return Object.keys($scope.toastPosition).filter(function (pos) {
            return $scope.toastPosition[pos];
        }).join(' ');
    };

    function sanitizePosition() {
        var current = $scope.toastPosition;
        if (current.bottom && last.top) current.top = false;
        if (current.top && last.bottom) current.bottom = false;
        if (current.right && last.left) current.left = false;
        if (current.left && last.right) current.right = false;
        last = angular.extend({}, current);
    }

    // /For toast popup use
    $scope.showPhoto = function (website, index) {
        //尋日做到show photo,要改show photo.js showPhoto.html d type 同 url2017 7 26
        console.log(index);
        //console.log($scope.websites[index]);
        $mdDialog.show({
            controller: "showPhotoController",
            templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/showPhoto.html',
            escapeToClose: false,
            clickOutsideToClose: false,
            locals: {
                website: website,
                rootScope: $scope,
                bought: true,
                sold: false
            }
        }).then(function (objj) {
            console.log("vvvv showPhoto then");
            console.log(objj);
            /*
                if (objj.tORf) {
                    var confirm = $mdDialog.confirm().title('刪除圖片').textContent('你真的要刪除此圖片嗎?').ariaLabel('Lucky day').ok('刪除').cancel('取消');
                    $mdDialog.show(confirm).then(function() {
                        $scope.selected = [];
                        $scope.deleting = true;
                        var delID = $scope.websites[index].substring(0, $scope.websites[index].indexOf($scope.nowType + "?AWSAccessKeyId")).replace($scope.nowType + "?AWSAccessKeyId", "");
                        console.log(delID);
                        delID = delID.substring(delID.lastIndexOf("/") + 1);
                        console.log(delID);
                        $scope.deletedURL.push(delID);
                        console.log("vvvv dellll");
                        console.log($scope.deletedURL);
                        //This part is for a special case that user delete the photo just upload in same page
                        for (i = 0; i < $scope.allNewArray.length; i++) {
                            console.log($scope.allNewArray[i]);
                            console.log($scope.websites[index]);
                            if ($scope.allNewArray[i] === $scope.websites[index]) {
                                console.log("same!");
                                $scope.allNewArray.splice(i, 1);
                            }
                        }
                        //This part is for arrange the pictures after delete.
                        $scope.websites.splice(index, 1);
                        setTimeout(function() {
                            var temp = $scope.websites.length;
                            console.log("vvvv thennnn7");
                            $scope.temp = temp;
                            $scope.websites = $scope.websites.concat(["https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png"]);
                        }, 1500);
                        setTimeout(function() {
                            console.log("vvvv 2000 thennnn7");
                            $scope.websites.splice($scope.temp, 1);
                            $scope.deleting = false;
                        }, 4000);
                        // /This part is for arrange the pictures after delete.
                        var url = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
                        var params = {
                            "operation": "delete",
                            "accessKeyId": "sdasda",
                            "secretAccessKey": "asdsa",
                            "sessionToken": "vhndi757Bydd",
                            "TableName": "dazzle-gallery",
                            "Key": {
                                "gid": objj.id
                            }
                        }
                        $http.post(url, params).then(function(result) {
                            console.log("deleted");
                            console.log(result);
                            var pinTo = $scope.getToastPosition();
                            $scope.getTags().then(function(result) {
                                $scope.tags = result.data;
                            });
                            $mdToast.show($mdToast.simple().textContent('已刪除').position(pinTo).hideDelay(3000));
                        });
                        var s3 = new AWS.S3();
                        switch ($scope.type) {
                            case "相片":
                                console.log("vvvv 相片 3");
                                var diffObj = [{
                                    Key: "images/" + $scope.user.uid + "/large/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/large-web/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/medium/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/medium-web/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/small/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/small-web/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/thumbnail/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/thumbnail-web/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/original/" + objj.id + objj.type
                                }];
                                break;
                            case "插畫":
                                console.log("vvvv 插畫 3");
                                var diffObj = [{
                                    Key: "illustration/" + $scope.user.uid + "/eps/" + objj.id + ".eps"
                                }, {
                                    Key: "illustration/" + $scope.user.uid + "/svg/" + objj.id + ".svg"
                                }, {
                                    Key: "illustration/" + $scope.user.uid + "/png/" + objj.id + ".png"
                                }];
                                break;
                        }

                        var paramsDel = {
                            Bucket: "designerrrr-output",
                            Delete: {
                                Objects: diffObj,
                                Quiet: false
                            }
                        };
                        s3.deleteObjects(paramsDel, function(err, data) {
                            if (err) {
                                console.log("s3 fail");
                                console.log(err);
                            } else {
                                console.log("delete from s3 successful");
                                console.log(data);
                                console.log($scope.websites);
                                //$scope.init();
                                /*for(i=0;i<$scope.websites.length;i++){
                                    if($scope.websites[i].indexOf(objj.id)!=-1){
                                        console.log("splice ok");
                                        $scope.websites.splice(i,1);
                                    }
                                }
                                console.log($scope.websites);*/
            /*}
                        });
                    }, function() {});
                }*/
        });
    }
    $scope.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
            list.splice(idx, 1);
        } else {
            list.push(item);
        }
    };
    $scope.toggleAll = function (item) {
        if ($scope.selected.length === $scope.websites.length) {
            $scope.selected = [];
        } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
            $scope.selected = $scope.websites.slice(0);
        }
    }
    $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };
    $scope.select = function () {
        $scope.selecting = true;
    }
    $scope.selectCancel = function () {
        $scope.selected = [];
        $scope.selecting = false;
    }
    $scope.downloadAll = function () {
        if ($scope.selected.length != 0) {
            var allID = [];
            console.log($scope.selected);
            for (i = 0; i < $scope.selected.length; i++) {
                allID[i] = $scope.selected[i].substring(0, $scope.selected[i].indexOf("?AWSAccessKeyId")).substring($scope.selected[i].lastIndexOf("/") + 1).replace($scope.nowType, "");
            }
            console.log(allID);
            $mdDialog.show({
                controller: "batchDownloadPopupController",
                templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/batchDownloadPopup.html',
                escapeToClose: false,
                clickOutsideToClose: false,
                locals: {
                    allID: allID,
                    type: $scope.type
                }
            }).then(function () {
            });
        } else {
            var pinTo = $scope.getToastPosition();
            $mdToast.show($mdToast.simple().textContent('請選擇項目').position(pinTo).hideDelay(3000));
        }
    }
    /*
        $scope.deleteAll = function(website) {
            var allID = [];
            console.log($scope.selected);
            for (i = 0; i < $scope.selected.length; i++) {
                allID[i] = $scope.selected[i].substring(0, $scope.selected[i].indexOf("?AWSAccessKeyId")).substring($scope.selected[i].lastIndexOf("/") + 1).replace($scope.nowType, "");
            }
            console.log(allID);
            var confirm = $mdDialog.confirm().title('刪除圖片').textContent('你真的要刪除' + $scope.selected.length + '張圖片嗎?').ariaLabel('Lucky day').ok('刪除').cancel('取消');
            $mdDialog.show(confirm).then(function() {
                $scope.deleteAllPhoto();
                $scope.deleteAllData();
            });
        }
        $scope.upload = function() {
            console.log("vvvv upload");
            console.log($scope.user);
            $scope.alert = '';
            $mdBottomSheet.show({
                templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/upload.html',
                controller: 'uploadController',
                clickOutsideToClose: false,
                disableParentScroll: false,
                locals: {
                    bucket: "designerrrr-output",
                    key: $scope.px,
                    rootScope: $scope
                }
            }).then(function(uploadedFiles) {
                $scope.getTags().then(function(result) {
                    $scope.tags = result.data;
                });
                console.log("vvvv then");
                console.log(uploadedFiles);
                var newItemArray = [];
                console.log("vvvv md dialog");
                if (uploadedFiles.length != 0) {
                    for (i = 0; i < uploadedFiles.length; i++) {
                        newItemArray[i] = $scope.getImage(uploadedFiles[i].path);
                    }
                    console.log(newItemArray);
                    if ($scope.allNewArray.length == 0) {
                        $scope.allNewArray = newItemArray;
                    } else {
                        $scope.allNewArray = newItemArray.concat($scope.allNewArray);
                    }
                    $scope.websites = newItemArray.concat($scope.websites);
                }
                //$scope.websites.concat(uploadedFiles);
            }).catch(function(error) {
                // User clicked outside or hit escape
            });
        };
        $scope.changeTagsAll = function() {
            console.log("AAAA");
            //console.log($scope.websites[index]);
            $mdDialog.show({
                controller: "changeTagController",
                templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/changeTag.html',
                escapeToClose: false,
                clickOutsideToClose: false,
                locals: {
                    rootScope: $scope
                }
            }).then(function(tagNeedToBeAdded) {
                console.log($scope.selected);
                $scope.saveAllTagtoPhoto(tagNeedToBeAdded);
            });
        }
        $scope.saveAllTagtoPhoto = function(SelectedTag) {
            console.log("AAAAA");
            for (i = 0; i < $scope.selected.length; i++) {
                var thisPhotoId = $scope.selected[i].substring(0, $scope.selected[i].indexOf("?AWSAccessKeyId"));
                thisPhotoId = thisPhotoId.substring(thisPhotoId.lastIndexOf("/") + 1);
                thisPhotoId = thisPhotoId.substring(0, thisPhotoId.lastIndexOf("."));
                console.log(thisPhotoId);
                var url = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
                var params = {
                    "operation": "get",
                    "accessKeyId": "sdasda",
                    "secretAccessKey": "asdsa",
                    "sessionToken": "vhndi757Bydd",
                    "TableName": "dazzle-gallery",
                    "Key": {
                        "gid": thisPhotoId
                    }
                }
                $http.post(url, params).then(function(result) {
                    console.log("db successful");
                    console.log(result);
                    $scope.checking = false;
                    $scope.tags = result.data.Item.tags;
                    console.log($scope.tags);
                    for (i = 0; i < SelectedTag.length; i++) {
                        $scope.tags.push(SelectedTag[i]);
                    }
                    console.log($scope.tags);
                    $scope.tags = $scope.tags.filter(function(elem, pos) {
                        return $scope.tags.indexOf(elem) == pos;
                    })
                    console.log($scope.tags);
                    result.data.Item.tags = $scope.tags;
                    $scope.save(result.data.Item);
                })
            }
        }
        $scope.save = function(Item) {
            var urlS = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
            var paramsS = {
                "operation": "batchWrite",
                "accessKeyId": "sdasda",
                "secretAccessKey": "asdsa",
                "sessionToken": "vhndi757Bydd",
                "RequestItems": {
                    "dazzle-gallery": [{
                        PutRequest: {
                            Item: Item
                        }
                    }]
                }
            };
            console.log(paramsS);
            $http.post(urlS, paramsS).then(function(result) {
                console.log("vvvv save 2");
                console.log(result);
                var pinTo = $scope.getToastPosition();
                $mdToast.show($mdToast.simple().textContent('已儲存').position(pinTo).hideDelay(3000));
                $scope.getTags().then(function(result) {
                    console.log("vvvv getT");
                    $scope.rootScope.tags = result.data;
                });
            });
        }*/
    $scope.selectType = function (type) {
        console.log("vvvv select");
        console.log(type);
        $scope.init(type);
    }
});

app.filter('toDDMMYY', function () {
    return function (input) {
        return moment(new Date(input)).format('DD/MM/YYYY HH:mm:ss');
    }
});
app.controller('buyRecordController', function ($scope, $http, $dazzleUser) {
    console.log('buyRecordController');
    $scope.inited = false;
    $scope.init = function () {
        $scope.gridOptions = {
            rowHeight: 45,
            animateRows: true,
            enableColResize: true,
            angularCompileRows: true,
            enableSorting: true,
            defaultColDef: {
                editable: false,
                filter: 'text'
            },
            columnDefs: [{
                headerName: "交易ID",
                field: "id",
            }, {
                headerName: "購買金額",
                field: "price",
                filter: 'number'
            }, {
                headerName: "購買時間",
                field: "time",
                cellRenderer: dateRenderer,
                comparator: dateComparator,
                filter: 'date',
                filterParams: {
                    comparator: function (filterLocalDateAtMidnight, cellValue) {
                        var cellDate = new Date(cellValue).setHours(12, 0, 0, 0);
                        if (cellDate < filterLocalDateAtMidnight) {
                            return -1;
                        } else if (cellDate > filterLocalDateAtMidnight) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }
                }
            }, {
                headerName: "購買類別",
                field: "type"
            }, {
                headerName: "項目ID",
                field: "itemId"
            }],
            onGridReady: function () {
                $scope.getBuyRecord().then(function (record) {
                    $scope.gridOptions.api.setRowData(record);
                    $scope.gridOptions.api.setSortModel([
                        {colId: 'time', sort: 'desc'}
                    ]);
                    $scope.gridOptions.api.refreshView();
                    $scope.inited = true;
                });
            }
        };
    }
    $scope.getBuyRecord = function () {
        return new Promise(function (resolve, reject) {
            $http({
                "method": "post",
                "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/transaction",
                "data": {
                    "action": "getBuyRecordById",
                    "buyerId": $scope.user.uid
                }
            }).then(function (result) {
                if (result.data.code > 0) {
                    resolve(result.data.data);
                } else {
                    resolve([]);
                }
            })
        })
    }
});
app.directive('passwordVerify', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, elem, attrs, ngModel) {
            if (!ngModel) return;
            scope.$watch(attrs.ngModel, function () {
                validate();
            });
            attrs.$observe('passwordVerify', function (val) {
                validate();
            });
            var validate = function () {
                var val1 = ngModel.$viewValue;
                var val2 = attrs.passwordVerify;
                ngModel.$setValidity('passwordVerify', val1 === val2);
            };
        }
    }
});
app.controller('changePasswordController', function ($scope, $http, $dazzlePopup) {
    console.log('changePasswordController');
    $scope.submitForm = function (newPassword) {
        $http({
            "method": "post",
            "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/updateuser",
            "data": {
                "uid": $scope.user.uid,
                "user": $scope.user,
                "action": "update",
                "field": "password",
                "value": newPassword
            }
        }).then(function (result) {
            if (result.data.code > 0) {
                $dazzlePopup.alert('成功', '用戶密碼更新成功!').then(function () {
                    location.reload();
                });
            } else {
                $dazzlePopup.alert('失敗', result.data.text);
            }
        });
        $dazzlePopup.loading();
    }
});
app.controller('changeTagController', function ($scope, $http, $q, $mdDialog, $mdToast, rootScope) {
    $scope.checking = true;
    $scope.rootScope = rootScope;
    $scope.init = function () {
        $scope.tags = [];

    }
    var last = {
        bottom: true,
        top: false,
        left: false,
        right: true
    };
    $scope.toastPosition = angular.extend({}, last);
    $scope.getToastPosition = function () {
        sanitizePosition();

        return Object.keys($scope.toastPosition)
            .filter(function (pos) {
                return $scope.toastPosition[pos];
            })
            .join(' ');
    };

    function sanitizePosition() {
        var current = $scope.toastPosition;

        if (current.bottom && last.top) current.top = false;
        if (current.top && last.bottom) current.bottom = false;
        if (current.right && last.left) current.left = false;
        if (current.left && last.right) current.right = false;

        last = angular.extend({}, current);
    }

    $scope.cancel = function () {
        console.log("AAAA;;;A");
        $mdDialog.cancel();
    }
    $scope.tagClicked = function (tag) {
        console.log("vvvv tc1");

    }
    $scope.tagsChanged = function () {
        console.log("vvvv tc2");

    }
    $scope.save = function () {
        $mdDialog.hide($scope.tags);


    }

});
var app = angular.module("demoApp");
app.controller('deleteLoadPopupController', function ($scope, $http, $filter, $mdDialog, $mdBottomSheet, $interval) {
});
app.controller('deleteTagController', function ($scope, $http, $q, $mdDialog, $mdToast, rootScope) {
    $scope.checking = true;
    $scope.rootScope = rootScope;
    $scope.init = function () {
        $scope.tags = [];

    }
    var last = {
        bottom: true,
        top: false,
        left: false,
        right: true
    };
    $scope.toastPosition = angular.extend({}, last);
    $scope.getToastPosition = function () {
        sanitizePosition();

        return Object.keys($scope.toastPosition)
            .filter(function (pos) {
                return $scope.toastPosition[pos];
            })
            .join(' ');
    };

    function sanitizePosition() {
        var current = $scope.toastPosition;

        if (current.bottom && last.top) current.top = false;
        if (current.top && last.bottom) current.bottom = false;
        if (current.right && last.left) current.left = false;
        if (current.left && last.right) current.right = false;

        last = angular.extend({}, current);
    }

    $scope.cancel = function () {
        console.log("AAAA;;;A");
        $mdDialog.cancel();
    }
    $scope.tagClicked = function (tag) {
        console.log("vvvv tc1");

    }
    $scope.tagsChanged = function () {
        console.log("vvvv tc2");

    }
    $scope.save = function () {
        $mdDialog.hide($scope.tags);


    }

});
app.controller('detailController', function ($scope, $http, $dazzlePopup, $dazzleS3) {
    console.log('detailController');
    $scope.save = function () {
        console.log($scope.user);
        $http({
            "method": "post",
            "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/updateuser",
            "data": {
                "uid": $scope.user.uid,
                "user": $scope.user,
                "action": "put"
            }
        }).then(function (result) {
            if (result.data.code > 0) {
                $dazzlePopup.alert('成功', '用戶資料更新成功!').then(function () {
                    location.reload();
                });
            } else {
                $dazzlePopup.alert('失敗', result.data.text);
            }
        });
        $dazzlePopup.loading();
    }
    $scope.uploadIcon = function (file) {
        $scope.$apply(function () {
            $scope.user.userIcon = "https://dazzle-template.s3.amazonaws.com/cdn6.0/images/loading.gif";
        });
        $dazzleS3.saveImage($scope.user.uid, file).then(function (result) {
            setTimeout(function () {
                $scope.user.userIcon = "https://designerrrr-output.s3-ap-northeast-1.amazonaws.com/images/" + $scope.user.uid + "/original/" + result.newFilename;
                console.log("image url after upload: ", $scope.user.userIcon);
                $scope.save();
            }, 1000);
        });
    }
});
app.controller('imgLoadPopupController', function ($scope, $http, $filter, $mdDialog, $mdBottomSheet, $interval) {
    console.log("imgController");

    $scope.close = function () {
        console.log("vvvv whyyyy");
        $mdDialog.hide();
    }
});
app.controller('listWebsiteController', function ($scope, $http, $ocLazyLoad) {

    $scope.websites = [];
    $scope.init = function () {

        console.log('init');
        $http({
            "method": "post",
            "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/listwebsite",
            "data": {
//                "tag": tag,
//                "action": "bytag"
            }
        }).then(function (result) {
            console.log('Website', result);
            if (result.data.code > 0) {
                console.log(result.data);
                $scope.websites = result.data.data;
                console.log($scope.websites);
//                resolve(result.data);
            } else {
                resolve([]);
            }
        });
    }

    $scope.view = function (id) {
        window.open("http://template.dazzle.website/" + id + "/");
    }

    $scope.delete = function (id) {
        console.log('Delete');
        $http({
            "method": "post",
            "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/listwebsite",
            "data": {
                "action": "removeById",
                "id": id
            }
        }).then(function (result) {
            $('#tile-' + id).remove();

            console.log('Website Removed', result);
        });

    }
    $scope.buy = function (id) {
        console.log('Buy');
    }
    $scope.edit = function (id) {
        window.open("http://template.dazzle.website/" + id + "/admin/");

    }
});
app.controller('mainController', function ($scope) {
    console.log('mainController');

//        document.location.href = "index.html#!/myWebsite";
});
Date.prototype.yyyymmdd = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear() + "年",
        mm + "月",
        dd + "日"
    ].join('');
};

String.prototype.trunc = String.prototype.trunc ||
    function (n) {
        return (this.length > n) ? this.substr(0, n - 1) + '...' : this;
    };

app.controller('myDocController', function ($scope, $http, $filter, $mdDialog, $mdBottomSheet, $mdToast) {
    $scope.eachShowNum = 20;
    $scope.fileIcon = function (typee) {
        var type = typee.toLowerCase();
        var theType;
        switch (type) {
            case ".js":
                theType = "http://dazzle-template.s3.amazonaws.com/cdn6.0/images/jsIcon.png";//js
                break;
            case ".png":
            case ".jpg":
            case ".jpeg":
            case ".gif":
                theType = "http://dazzle-template.s3.amazonaws.com/cdn6.0/images/imageIcon.png";//image
                break;
            case ".csv":
            case ".xls":
            case ".xlsx":
                theType = "http://dazzle-template.s3.amazonaws.com/cdn6.0/images/excelIcon.png";//excel
                break;
            case ".zip":
            case".rar":
                theType = "http://dazzle-template.s3.amazonaws.com/cdn6.0/images/zipIcon.png";//zip
                break;
            case ".html":
                theType = "http://dazzle-template.s3.amazonaws.com/cdn6.0/images/htmlIcon.png";//html
                break;
            default:
                theType = "http://dazzle-template.s3.amazonaws.com/cdn6.0/images/fileIcon.png";//other files
                break;
        }
        return theType;
    }
    $scope.formatBytes = function (bytes) {
        if (bytes < 1024) return bytes + " Bytes";
        else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB";
        else if (bytes < 1073741824) return (bytes / 1048576).toFixed(2) + " MB";
        else return (bytes / 1073741824).toFixed(2) + " GB";
    };
    $scope.init = function () {
        console.log('myPhotosController');
        console.log($scope.user.uid);
        console.log(AWS.config);
        var s3 = new AWS.S3();
        var params = {
            Bucket: "dazzle-user-" + $scope.user.uid, /* required */
            Prefix: 'files/'
        };
        s3.listObjects(params, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else {
                console.log("listObj");
                console.log(data);
                data.Contents = data.Contents.reverse();
                $scope.data = data;

                //$scope.data.Contents.shift();
                $scope.inited = false;
                $scope.loading = true;
                $scope.end = false;
                $scope.tags = [];
                $scope.websites = [];
                $scope.LastEvaluatedKey = null;
                $scope.websitesAngularGridOptions = {
                    gridWidth: 400,
                    gutterSize: 4,
                    infiniteScrollDelay: 1000,
                    infiniteScrollDistance: 95,
                    scrollContainer: '#sidecontent'
                }
                $scope.getWebsites($scope.eachShowNum, 0).then(function (anArray) {
                    $scope.inited = true;
                    $scope.loading = false;
                    $scope.websites = $scope.websites.concat(anArray);
                    $scope.LastEvaluatedKey = $scope.eachShowNum;
                    console.log("vvvv $scope.websites");
                    console.log($scope.websites);
                });
            }
        });
    }

    $scope.loadMore = function () {
        console.log("loadMore");
        if (!$scope.end && !$scope.loading) {
            $scope.loading = true;
            $scope.getWebsites($scope.eachShowNum, $scope.LastEvaluatedKey).then(function (anArray) {
                $scope.loading = false;
                if (anArray.length > 0) {
                    $scope.websites = $scope.websites.concat(anArray);
                    $scope.LastEvaluatedKey = $scope.LastEvaluatedKey + $scope.eachShowNum;
                } else {
                    $scope.end = true;
                }
            });
        }
    }
    $scope.getWebsites = function (limit, key) {
        return new Promise(function (resolve, reject) {
            console.log("getWebsites");
            var data = $scope.data;
            console.log(data);
            var anArray = [];
            var counter = 0;
            var s3 = new AWS.S3();
            if ($scope.LastEvaluatedKey < data.Contents.length && data.Contents.length - $scope.LastEvaluatedKey < $scope.eachShowNum) {
                console.log("if");
                for (i = (0 + key); i < data.Contents.length; i++) {
                    var oobj = {};
                    oobj["name"] = data.Contents[i].Key.replace("files/", "");
                    oobj["nameS"] = data.Contents[i].Key.replace("files/", "").trunc(35);
                    oobj["size"] = $scope.formatBytes(data.Contents[i].Size);
                    oobj["date"] = data.Contents[i].LastModified.yyyymmdd();
                    oobj["icon"] = $scope.fileIcon(data.Contents[i].Key.substring(data.Contents[i].Key.lastIndexOf(".")));
                    anArray[counter] = oobj;
                    counter++;
                }
                if ($scope.data.Contents.length <= $scope.eachShowNum) {
                    console.log("endFirst");
                    $scope.end = true;
                }
                $scope.endFirst = true;
                console.log(anArray);
                resolve(anArray);
            } else if ($scope.LastEvaluatedKey < data.Contents.length) {
                console.log("else if");
                for (i = (0 + key); i < (limit + key); i++) {
                    console.log("vvvv for");
                    console.log(data.Contents[i]);
                    console.log(data.Contents[i].Key);
                    var oobj = {};
                    oobj["name"] = data.Contents[i].Key.replace("files/", "");
                    oobj["nameS"] = data.Contents[i].Key.replace("files/", "").trunc(35);
                    oobj["size"] = $scope.formatBytes(data.Contents[i].Size);
                    oobj["date"] = data.Contents[i].LastModified.yyyymmdd();
                    oobj["icon"] = $scope.fileIcon(data.Contents[i].Key.substring(data.Contents[i].Key.lastIndexOf(".")));
                    anArray[counter] = oobj;
                    counter++;
                }
                console.log(anArray);
                resolve(anArray);
            } else {
                if ($scope.websites.length == 0) {
                    console.log("vvvv first 0");
                    $scope.inited = true;
                    $scope.loading = false;
                    $scope.LastEvaluatedKey = 0;
                }
                $scope.end = true;
                console.log("reject");
                reject("end");
            }
        });
    }
    $scope.getImage = function (key) {
        var s3 = new AWS.S3();
        var params = {Bucket: "designerrrr-output", Key: key};
        var url = s3.getSignedUrl('getObject', params);
        console.log(url);
        return url;
    }


    //For toast popup use
    var last = {
        bottom: true,
        top: false,
        left: false,
        right: true
    };
    $scope.toastPosition = angular.extend({}, last);
    $scope.getToastPosition = function () {
        sanitizePosition();

        return Object.keys($scope.toastPosition)
            .filter(function (pos) {
                return $scope.toastPosition[pos];
            })
            .join(' ');
    };

    function sanitizePosition() {
        var current = $scope.toastPosition;

        if (current.bottom && last.top) current.top = false;
        if (current.top && last.bottom) current.bottom = false;
        if (current.right && last.left) current.left = false;
        if (current.left && last.right) current.right = false;

        last = angular.extend({}, current);
    }

    // /For toast popup use


    $scope.showPhoto = function (website, index) {
        console.log(index);
        //console.log($scope.websites[index]);

        $mdDialog.show({
            controller: "showFileController",
            templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/showFile.html',
            escapeToClose: false,
            clickOutsideToClose: false,
            locals: {
                website: website,
                rootScope: $scope
            }
        }).then(function (objj) {
            console.log("vvvv showPhoto then");
            console.log(objj);
            if (objj.tORf) {
                var confirm = $mdDialog.confirm()
                    .title('刪除檔案')
                    .textContent('你真的要刪除此檔案嗎?')
                    .ariaLabel('Lucky day')
                    .ok('刪除')
                    .cancel('取消');

                $mdDialog.show(confirm).then(function () {

                    //This part is for arrange the pictures after delete.
                    $scope.websites.splice(index, 1);
                    setTimeout(function () {
                        var temp = $scope.websites.length;
                        console.log("vvvv thennnn7");
                        $scope.temp = temp;
                        $scope.websites = $scope.websites.concat(["https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png"]);
                    }, 1500);
                    setTimeout(function () {
                        console.log("vvvv 2000 thennnn7");
                        $scope.websites.splice($scope.temp, 1);
                    }, 4000);
                    // /This part is for arrange the pictures after delete.

                    var url = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
                    var params = {
                        "operation": "delete",
                        "accessKeyId": "sdasda",
                        "secretAccessKey": "asdsa",
                        "sessionToken": "vhndi757Bydd",
                        "TableName": "dazzle-gallery",
                        "Key": {
                            "gid": objj.id
                        }
                    }
                    $http.post(url, params).then(function (result) {
                        console.log("deleted");
                        console.log(result);
                        var pinTo = $scope.getToastPosition();
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('已刪除')
                                .position(pinTo)
                                .hideDelay(3000)
                        );
                    });
                    var s3 = new AWS.S3();
                    var paramsDel = {
                        Bucket: "designerrrr-output",
                        Delete: {
                            Objects: [
                                {
                                    Key: "images/" + $scope.user.uid + "/large/" + objj.id + ".jpg"
                                },
                                {
                                    Key: "images/" + $scope.user.uid + "/large-web/" + objj.id + ".jpg"
                                },
                                {
                                    Key: "images/" + $scope.user.uid + "/medium/" + objj.id + ".jpg"
                                },
                                {
                                    Key: "images/" + $scope.user.uid + "/medium-web/" + objj.id + ".jpg"
                                },
                                {
                                    Key: "images/" + $scope.user.uid + "/small/" + objj.id + ".jpg"
                                },
                                {
                                    Key: "images/" + $scope.user.uid + "/small-web/" + objj.id + ".jpg"
                                },
                                {
                                    Key: "images/" + $scope.user.uid + "/thumbnail/" + objj.id + ".jpg"
                                },
                                {
                                    Key: "images/" + $scope.user.uid + "/thumbnail-web/" + objj.id + ".jpg"
                                },
                                {
                                    Key: "images/" + $scope.user.uid + "/original/" + objj.id + objj.type
                                }
                            ],
                            Quiet: false
                        }
                    };
                    s3.deleteObjects(paramsDel, function (err, data) {
                        if (err) {
                            console.log("s3 fail");
                            console.log(err);
                        } else {
                            console.log("delete from s3 successful");
                            console.log(data);
                            console.log($scope.websites);
                            //$scope.init();

                            /*for(i=0;i<$scope.websites.length;i++){
                                    if($scope.websites[i].indexOf(objj.id)!=-1){
                                        console.log("splice ok");
                                        $scope.websites.splice(i,1);
                                    }
                                }
                                console.log($scope.websites);*/
                        }
                    });
                }, function () {
                });
            }
        });
    }
    $scope.upload = function () {
        console.log("vvvv upload");
        console.log($scope.user);

        $scope.alert = '';
        $mdBottomSheet.show({
            templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/uploadDoc.html',
            controller: 'uploadDocController',
            clickOutsideToClose: false,
            disableParentScroll: false,
            locals: {
                bucket: "designerrrr-output",
                key: 'images/' + $scope.user.uid + '/medium-web/',
                rootScope: $scope
            }
        }).then(function (uploadedFiles) {
            console.log("vvvv then");
            console.log(uploadedFiles);
            var newItemArray = [];
            console.log("vvvv md dialog");
            if (uploadedFiles.length != 0) {
                var countt = 0;
                for (i = 0; i < uploadedFiles.length; i++) {
                    var found = $scope.websites.some(function (el) {
                        return el.name === uploadedFiles[i].upload.body.name;
                    });
                    if (!found) {
                        console.log("not found!");
                        var objo = {};
                        objo["name"] = uploadedFiles[i].upload.body.name;
                        objo["nameS"] = uploadedFiles[i].upload.body.name.trunc(35);
                        objo["size"] = $scope.formatBytes(uploadedFiles[i].upload.body.size);
                        objo["date"] = moment(uploadedFiles[i].upload.body.LastModifiedDate).format('L');
                        objo["icon"] = $scope.fileIcon(uploadedFiles[i].upload.body.name.substring(uploadedFiles[i].upload.body.name.lastIndexOf(".")));
                        newItemArray[countt] = objo;
                        countt++;
                    } else {
                        console.log("found!");
                    }
                }
                console.log(newItemArray);
                $scope.websites = newItemArray.concat($scope.websites);
            }
            //$scope.websites.concat(uploadedFiles);
        }).catch(function (error) {
            // User clicked outside or hit escape
        });
    };
});
app.controller('myPhotosController', function ($scope, $http, $filter, $mdDialog, $mdBottomSheet, $mdToast) {
    console.log("vvvv vvvv 9");
    var QueryString = function () {
        // This function is anonymous, is executed immediately and
        // the return value is assigned to QueryString!
        var query_string = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = decodeURIComponent(pair[1]);
                // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                query_string[pair[0]] = arr;
                // If third or later entry with this name
            } else {
                query_string[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }

        return query_string;
    }();
    console.log(QueryString);
    console.log("vvvv qs type whyyyy2");
    $scope.eachShowNum = 500;


    $scope.init = function () {
        //$scope.$apply(function(){
        $scope.type = QueryString.type;
        $scope.allNewArray = [];
        $scope.deleting = false;
        $scope.loading = true;
        $scope.end = false;
        $scope.tags = [];
        $scope.selected = [];
        $scope.selecting = false;
        $scope.deletedURL = [];
        $scope.selectedTags = [];
        $scope.LastEvaluatedKey = null;
        $scope.websitesAngularGridOptions = {
            gridWidth: 200,
            gutterSize: 4,
            infiniteScrollDelay: 1000,
            infiniteScrollDistance: 95,
            scrollContainer: '#sidecontent'
        }
        $scope.inited = false;
        $scope.websites = [];
        //});
        switch ($scope.type) {
            case "相片":
                console.log("vvvv 相片");
                $scope.px = 'images/' + $scope.user.uid + '/medium-web/';
                $scope.nowType = ".jpg";
                break;
            case "插畫":
                console.log("vvvv 插畫");
                $scope.px = 'illustration/' + $scope.user.uid + '/png/';
                $scope.nowType = ".png";
                break;
        }
        /*
            console.log('myPhotosController');
            console.log($scope.user.uid);
            console.log(AWS.config);
            var s3 = new AWS.S3();
            var params = {
                Bucket: "designerrrr-output",
                // required
                Prefix: $scope.px
            };
            s3.listObjects(params, function(err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else {
                    console.log("listObj");
                    console.log(data);
                    data.Contents = data.Contents.reverse();
                    $scope.data = data;
                    $scope.getTags().then(function(result) {
                        $scope.tags = result.data;
                    });
                    $scope.getWebsites($scope.eachShowNum, 0).then(function(anArray) {
                        $scope.$apply(function() {
                            $scope.inited = true;
                            $scope.loading = false;
                            $scope.websites = $scope.websites.concat(anArray);
                            $scope.LastEvaluatedKey = $scope.eachShowNum;
                            console.log("vvvv $scope.websites");
                            console.log($scope.websites);
                        });
                    });
                }
            });*/


        $scope.getItemsById().then(function (result) {
            console.log("vvvv new db");
            console.log(result);
            $scope.getTags().then(function (result) {
                $scope.tags = result.data;
            });
            $scope.$apply(function () {
                $scope.inited = true;
                $scope.loading = false;
                var tempArray = [];
                var s3 = new AWS.S3();
                for (i = 0; i < result.length; i++) {
                    var theID = result[i]._source.gid;
                    console.log("vvvv newDB");
                    console.log(theID);
                    switch ($scope.type) {
                        case "相片":
                            console.log("vvvv 相片 2");
                            var theLink = "images/" + $scope.user.uid + "/medium-web/" + theID + ".jpg"
                            break;
                        case "插畫":
                            console.log("vvvv 插畫 2");
                            var theLink = "illustration/" + $scope.user.uid + "/png/" + theID + ".png"
                            break;
                    }
                    console.log(theLink);
                    var params = {
                        Bucket: "designerrrr-output",
                        Key: theLink
                    };
                    var url = s3.getSignedUrl('getObject', params);
                    tempArray.push(url);
                }
                $scope.websites = $scope.websites.concat(tempArray);
                console.log("vvvv $scope.websites");
                console.log($scope.websites);
                $scope.newNowPosition = 500;
            });
        });


    }
    $scope.getItemsById = function () {
        return new Promise(function (resolve, reject) {
            $http({
                "method": "post",
                "url": "https://9g1gx9kfdc.execute-api.ap-northeast-1.amazonaws.com/dazzlegallery/getid",
                "data": {
                    "action": "byowner",
                    "owner_id": $scope.user.uid,
                    "type": $scope.type
                }
            }).then(function (result) {
                console.log('Get ID', result);
                var anArray = [];
                if (result.data.data.length > 0) {
                    resolve(result.data.data);
                } else
                    resolve([]);
            });
        });
    }
    $scope.tagClicked = function (tag) {
        console.log("vvvv tc1");
        $scope.selectedTags = [];
        $scope.selectedTags.push(tag);
        $scope.tagsChanged();
    }
    $scope.tagsChanged = function () {
        console.log("vvvv tc2");
        $scope.loading = true;
        $scope.end = false;
        $scope.LastEvaluatedKey = null;
        $scope.websites = [];
        if ($scope.selectedTags.length <= 0) {
            $scope.getWebsites($scope.eachShowNum, 0).then(function (anArray) {
                $scope.$apply(function () {
                    $scope.loading = false;
                    anArray = $scope.allNewArray.concat(anArray);
                    $scope.websites = $scope.websites.concat(anArray);
                    $scope.LastEvaluatedKey = $scope.eachShowNum;
                });
            });
        } else {
            var uniArray = [];
            var done = [];
            for (var i = 0; i < $scope.selectedTags.length; i++) {
                $scope.getWebsitesByTag($scope.selectedTags[i]).then(function (anArray) {
                    $scope.$apply(function () {
                        uniArray = uniArray.concat(anArray);
                        done.push({});
                        if (done.length == $scope.selectedTags.length) {
                            uniArray = uniArray.filter(function (elem, pos) {
                                return uniArray.indexOf(elem) == pos;
                            });
                            $scope.websites = $scope.websites.concat(uniArray);
                            console.log($scope.websites);
                        }
                    });
                });
            }
            $scope.loading = false;
            $scope.end = true;
        }
    }
    $scope.queryTags = function (query) {
        console.log(query);
        return $filter('filter')(angular.lowercase($scope.tags), angular.lowercase(query));
    }
    $scope.getTags = function () {
        return new Promise(function (resolve, reject) {
            var data = {};
            data.userName = $scope.user.uid;
            data.type = $scope.type;
            console.log("vvvv whyyyyyy 323232");
            console.log($scope.user.uid);
            $http({
                "method": "post",
                "url": "https://9g1gx9kfdc.execute-api.ap-northeast-1.amazonaws.com/dazzlegallery/gettags",
                "data": data
            }).then(function (result) {
                console.log("vvvv getTag");
                console.log(result);
                if (result.data.code > 0) {
                    resolve(result.data);
                } else {
                    reject(result.data.text);
                }
            })
        })
    }
    $scope.getWebsitesByTag = function (tag) {
        return new Promise(function (resolve, reject) {
            $http({
                "method": "post",
                "url": "https://9g1gx9kfdc.execute-api.ap-northeast-1.amazonaws.com/dazzlegallery/getid",
                "data": {
                    "tag": tag,
                    "action": "bytag",
                    "owner_id": $scope.user.uid,
                    "type": $scope.type
                }
            }).then(function (result) {
                console.log(result);
                if (result.data.code > 0) {
                    var s3 = new AWS.S3();
                    var anArray = [];
                    for (i = 0; i < result.data.data.length; i++) {
                        var theID = result.data.data[i].gid;
                        switch ($scope.type) {
                            case "相片":
                                console.log("vvvv 相片 2");
                                var theLink = "images/" + $scope.user.uid + "/medium-web/" + theID + ".jpg"
                                break;
                            case "插畫":
                                console.log("vvvv 插畫 2");
                                var theLink = "illustration/" + $scope.user.uid + "/png/" + theID + ".png"
                                break;
                        }
                        var params = {
                            Bucket: "designerrrr-output",
                            Key: theLink
                        };
                        var url = s3.getSignedUrl('getObject', params);
                        anArray[i] = url;
                    }
                    console.log(anArray);
                    resolve(anArray);
                } else {
                    resolve([]);
                }
            });
        });
    }
    $scope.loadMore = function () {
        console.log("loadMore");
        if (!$scope.end && !$scope.loading) {
            $scope.loading = true;
            $scope.getWebsites($scope.eachShowNum, $scope.LastEvaluatedKey).then(function (anArray) {
                $scope.loading = false;
                if (anArray.length > 0) {
                    $scope.websites = $scope.websites.concat(anArray);
                    $scope.LastEvaluatedKey = $scope.LastEvaluatedKey + $scope.eachShowNum;
                } else {
                    $scope.end = true;
                }
            });
        }
    }
    $scope.getWebsites = function (limit, key) {
        return new Promise(function (resolve, reject) {
            console.log("getWebsites");
            var data = $scope.data;
            console.log(data);
            var anArray = [];
            var counter = 0;
            var s3 = new AWS.S3();
            if ($scope.LastEvaluatedKey < data.Contents.length && data.Contents.length - $scope.LastEvaluatedKey < $scope.eachShowNum) { //show photo when unshow photo less than 50
                console.log("if");
                for (i = (0 + key); i < data.Contents.length; i++) {
                    var checkID = data.Contents[i].Key.substring(data.Contents[i].Key.lastIndexOf("/") + 1).replace($scope.nowType, "");
                    var notLoad = false;
                    for (j = 0; j < $scope.deletedURL.length; j++) {
                        if ($scope.deletedURL[j] == checkID) {
                            notLoad = true;
                        }
                    }
                    if (notLoad) {
                        //found a invalid url
                    } else {
                        var params = {
                            Bucket: "designerrrr-output",
                            Key: data.Contents[i].Key
                        };
                        var url = s3.getSignedUrl('getObject', params);
                        anArray[counter] = url;
                        counter++;
                    }
                }
                if ($scope.data.Contents.length <= $scope.eachShowNum) {
                    console.log("endFirst");
                    $scope.end = true;
                }
                console.log(anArray);
                resolve(anArray);
            } else if ($scope.LastEvaluatedKey < data.Contents.length) {
                console.log("else if");
                for (i = (0 + key); i < (limit + key); i++) {
                    console.log("vvvv for");
                    console.log(data.Contents[i]);
                    console.log(data.Contents[i].Key);
                    var checkID = data.Contents[i].Key.substring(data.Contents[i].Key.lastIndexOf("/") + 1).replace($scope.nowType, "");
                    console.log("vvvv checkID");
                    console.log(checkID);
                    var notLoad = false;
                    for (j = 0; j < $scope.deletedURL.length; j++) {
                        if ($scope.deletedURL[j] == checkID) {
                            notLoad = true;
                        }
                    }
                    if (notLoad) {
                        console.log("dead img found");
                    } else {
                        console.log("dead img else");
                        var params = {
                            Bucket: "designerrrr-output",
                            Key: data.Contents[i].Key
                        };
                        var url = s3.getSignedUrl('getObject', params);
                        anArray[counter] = url;
                        counter++;
                    }
                }
                console.log(anArray);
                resolve(anArray);
            } else {
                if ($scope.websites.length == 0) {
                    console.log("vvvv first 0");
                    $scope.inited = true;
                    $scope.loading = false;
                    $scope.LastEvaluatedKey = 0;
                }
                $scope.end = true;
                console.log("reject");
                reject("end");
            }
        });
    }
    $scope.getImage = function (key) {
        var s3 = new AWS.S3();
        var params = {
            Bucket: "designerrrr-output",
            Key: key
        };
        var url = s3.getSignedUrl('getObject', params);
        console.log(url);
        return url;
    }
    //For toast popup use
    var last = {
        bottom: true,
        top: false,
        left: false,
        right: true
    };
    $scope.toastPosition = angular.extend({}, last);
    $scope.getToastPosition = function () {
        sanitizePosition();
        return Object.keys($scope.toastPosition).filter(function (pos) {
            return $scope.toastPosition[pos];
        }).join(' ');
    };

    function sanitizePosition() {
        var current = $scope.toastPosition;
        if (current.bottom && last.top) current.top = false;
        if (current.top && last.bottom) current.bottom = false;
        if (current.right && last.left) current.left = false;
        if (current.left && last.right) current.right = false;
        last = angular.extend({}, current);
    }

    // /For toast popup use
    $scope.showPhoto = function (website, index) {
        //尋日做到show photo,要改show photo.js showPhoto.html d type 同 url2017 7 26
        console.log(index);
        //console.log($scope.websites[index]);
        $mdDialog.show({
            controller: "showPhotoController",
            templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/showPhoto.html',
            escapeToClose: false,
            clickOutsideToClose: false,
            locals: {
                website: website,
                rootScope: $scope,
                bought: false,
                sold: false
            }
        }).then(function (objj) {
            console.log("vvvv showPhoto then");
            console.log(objj);
            if (objj.tORf) {
                var confirm = $mdDialog.confirm().title('刪除圖片').textContent('你真的要刪除此圖片嗎?').ariaLabel('Lucky day').ok('刪除').cancel('取消');
                $mdDialog.show(confirm).then(function () {
                    $scope.selected = [];
                    $scope.deleting = true;
                    var delID = $scope.websites[index].substring(0, $scope.websites[index].indexOf($scope.nowType + "?AWSAccessKeyId")).replace($scope.nowType + "?AWSAccessKeyId", "");
                    console.log(delID);
                    delID = delID.substring(delID.lastIndexOf("/") + 1);
                    console.log(delID);
                    $scope.deletedURL.push(delID);
                    console.log("vvvv dellll");
                    console.log(delID);
                    console.log(objj.id);
                    console.log($scope.deletedURL);
                    //This part is for a special case that user delete the photo just upload in same page
                    for (i = 0; i < $scope.allNewArray.length; i++) {
                        console.log($scope.allNewArray[i]);
                        console.log($scope.websites[index]);
                        if ($scope.allNewArray[i] === $scope.websites[index]) {
                            console.log("same!");
                            $scope.allNewArray.splice(i, 1);
                        }
                    }
                    //This part is for arrange the pictures after delete.
                    $scope.websites.splice(index, 1);
                    setTimeout(function () {
                        var temp = $scope.websites.length;
                        console.log("vvvv thennnn7");
                        $scope.temp = temp;
                        $scope.websites = $scope.websites.concat(["https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png"]);
                    }, 1500);
                    setTimeout(function () {
                        console.log("vvvv 2000 thennnn7");
                        $scope.websites.splice($scope.temp, 1);
                        $scope.deleting = false;
                    }, 4000);
                    // /This part is for arrange the pictures after delete.
                    var url = "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/hohopost-user-newdb";
                    var params = {
                        "operation": "delete",
                        "index": "gallery",
                        "type": "table",
                        "id": objj.id
                    }
                    $http.post(url, params).then(function (result) {
                        console.log("deleted");
                        console.log(result);
                        var pinTo = $scope.getToastPosition();
                        $scope.getTags().then(function (result) {
                            $scope.tags = result.data;
                        });
                        $mdToast.show($mdToast.simple().textContent('已刪除').position(pinTo).hideDelay(3000));
                    });
                    var s3 = new AWS.S3();
                    switch ($scope.type) {
                        case "相片":
                            console.log("vvvv 相片 3");
                            var diffObj = [{
                                Key: "images/" + $scope.user.uid + "/large/" + objj.id + ".jpg"
                            }, {
                                Key: "images/" + $scope.user.uid + "/large-web/" + objj.id + ".jpg"
                            }, {
                                Key: "images/" + $scope.user.uid + "/medium/" + objj.id + ".jpg"
                            }, {
                                Key: "images/" + $scope.user.uid + "/medium-web/" + objj.id + ".jpg"
                            }, {
                                Key: "images/" + $scope.user.uid + "/small/" + objj.id + ".jpg"
                            }, {
                                Key: "images/" + $scope.user.uid + "/small-web/" + objj.id + ".jpg"
                            }, {
                                Key: "images/" + $scope.user.uid + "/thumbnail/" + objj.id + ".jpg"
                            }, {
                                Key: "images/" + $scope.user.uid + "/thumbnail-web/" + objj.id + ".jpg"
                            }, {
                                Key: "images/" + $scope.user.uid + "/original/" + objj.id + objj.type
                            }];
                            break;
                        case "插畫":
                            console.log("vvvv 插畫 3");
                            var diffObj = [{
                                Key: "illustration/" + $scope.user.uid + "/eps/" + objj.id + ".eps"
                            }, {
                                Key: "illustration/" + $scope.user.uid + "/svg/" + objj.id + ".svg"
                            }, {
                                Key: "illustration/" + $scope.user.uid + "/png/" + objj.id + ".png"
                            }];
                            break;
                    }

                    var paramsDel = {
                        Bucket: "designerrrr-output",
                        Delete: {
                            Objects: diffObj,
                            Quiet: false
                        }
                    };
                    s3.deleteObjects(paramsDel, function (err, data) {
                        if (err) {
                            console.log("s3 fail");
                            console.log(err);
                        } else {
                            console.log("delete from s3 successful");
                            console.log(data);
                            console.log($scope.websites);
                            //$scope.init();
                            /*for(i=0;i<$scope.websites.length;i++){
                                    if($scope.websites[i].indexOf(objj.id)!=-1){
                                        console.log("splice ok");
                                        $scope.websites.splice(i,1);
                                    }
                                }
                                console.log($scope.websites);*/
                        }
                    });
                }, function () {
                });
            }
        });
    }
    $scope.toggle = function (item, list) {
        console.log(item);
        var idx = list.indexOf(item);
        console.log(idx);
        if (idx > -1) {
            list.splice(idx, 1);
        } else {
            list.push(item);
        }
    };
    $scope.toggleAll = function (item) {
        if ($scope.selected.length === $scope.websites.length) {
            $scope.selected = [];
        } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
            $scope.selected = $scope.websites.slice(0);
        }
    }
    $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };
    $scope.select = function () {
        $scope.selecting = true;
    }
    $scope.selectCancel = function () {
        $scope.selected = [];
        $scope.selecting = false;
    }
    $scope.deleteAll = function (website) {
        if ($scope.selected.length != 0) {
            if ($scope.selected.length > 1000) {
                var pinTo = $scope.getToastPosition();
                $mdToast.show($mdToast.simple().textContent('不可刪除多於1000項').position(pinTo).hideDelay(3000));
                return;
            }
            var allID = [];
            console.log($scope.selected);
            $scope.deleteAllCount = 0;
            $scope.deleteAllLength = angular.copy($scope.selected.length);
            for (i = 0; i < $scope.selected.length; i++) {
                allID[i] = $scope.selected[i].substring(0, $scope.selected[i].indexOf("?AWSAccessKeyId")).substring($scope.selected[i].lastIndexOf("/") + 1).replace($scope.nowType, "");
            }
            console.log(allID);
            var confirm = $mdDialog.confirm().title('刪除圖片').textContent('你真的要刪除' + $scope.selected.length + '張圖片嗎?').ariaLabel('Lucky day').ok('刪除').cancel('取消');
            $mdDialog.show(confirm).then(function () {
                $mdDialog.show({
                    controller: 'deleteLoadPopupController',
                    templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/deleteLoadPopup.html',
                    clickOutsideToClose: false,
                    fullscreen: false, // Only for -xs, -sm breakpoints.
                    locals: {}
                })
                switch ($scope.type) {
                    case "相片":
                        var url = "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/batchgettype";
                        var params = {
                            "allID": allID
                        }
                        $http.post(url, params).then(function (result) {
                            console.log("vvvv batch type");
                            console.log(result);
                            var obj = result.data;

                            function todo(i) {
                                if (i == allID.length) {
                                    $mdDialog.hide();
                                    console.log("loop fin");
                                    $scope.selectCancel();
                                    return;
                                }
                                console.log("vvvv delete start");
                                console.log($scope.websites.indexOf($scope.selected[i]));
                                console.log(obj[allID[i]]);
                                $scope.executeDelete(allID[i], $scope.websites.indexOf($scope.selected[i]), obj[allID[i]]).then(function (result) {
                                    console.log("loop" + i);
                                    console.log(result);
                                    i++;
                                    todo(i);
                                });
                            }

                            todo(0);
                        });
                        break;
                    case "插畫":
                        console.log("vvvv delete start");
                        console.log($scope.websites.indexOf($scope.selected[i]));

                    function todo(i) {
                        if (i == allID.length) {
                            $mdDialog.hide();
                            console.log("loop fin");
                            $scope.selectCancel();
                            return;
                        }
                        $scope.executeDelete(allID[i], $scope.websites.indexOf($scope.selected[i]), null).then(function (result) {
                            console.log("loop" + i);
                            console.log(result);
                            i++;
                            todo(i);
                        });
                    }

                        todo(0);
                        break;
                }
            });
        } else {
            var pinTo = $scope.getToastPosition();
            $mdToast.show($mdToast.simple().textContent('請選擇項目').position(pinTo).hideDelay(3000));
        }
    }
    $scope.executeDelete = function (delID, index, ttype) {
        return new Promise(function (resolve, reject) {
            console.log(delID);
            $scope.deleteAllCount++;
            $scope.deleting = true;
            $scope.deletedURL.push(delID);
            console.log("vvvv dellll");
            console.log($scope.deletedURL);
            //This part is for a special case that user delete the photo just upload in same page
            for (i = 0; i < $scope.allNewArray.length; i++) {
                console.log($scope.allNewArray[i]);
                console.log($scope.websites[index]);
                if ($scope.allNewArray[i] === $scope.websites[index]) {
                    console.log("same!");
                    $scope.allNewArray.splice(i, 1);
                }
            }
            var url = "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/hohopost-user-newdb";
            var params = {
                "operation": "delete",
                "index": "gallery",
                "type": "table",
                "id": delID
            }
            $http.post(url, params).then(function (result) {
                console.log("deleted");
                console.log(result);
                var pinTo = $scope.getToastPosition();
                $scope.getTags().then(function (result) {
                    $scope.tags = result.data;
                });
            });
            var s3 = new AWS.S3();
            switch ($scope.type) {
                case "相片":
                    console.log("vvvv 相片 3");
                    var diffObj = [{
                        Key: "images/" + $scope.user.uid + "/large/" + delID + ".jpg"
                    }, {
                        Key: "images/" + $scope.user.uid + "/large-web/" + delID + ".jpg"
                    }, {
                        Key: "images/" + $scope.user.uid + "/medium/" + delID + ".jpg"
                    }, {
                        Key: "images/" + $scope.user.uid + "/medium-web/" + delID + ".jpg"
                    }, {
                        Key: "images/" + $scope.user.uid + "/small/" + delID + ".jpg"
                    }, {
                        Key: "images/" + $scope.user.uid + "/small-web/" + delID + ".jpg"
                    }, {
                        Key: "images/" + $scope.user.uid + "/thumbnail/" + delID + ".jpg"
                    }, {
                        Key: "images/" + $scope.user.uid + "/thumbnail-web/" + delID + ".jpg"
                    }, {
                        Key: "images/" + $scope.user.uid + "/original/" + delID + ttype
                    }];
                    break;
                case "插畫":
                    console.log("vvvv 插畫 3");
                    var diffObj = [{
                        Key: "illustration/" + $scope.user.uid + "/eps/" + delID + ".eps"
                    }, {
                        Key: "illustration/" + $scope.user.uid + "/svg/" + delID + ".svg"
                    }, {
                        Key: "illustration/" + $scope.user.uid + "/png/" + delID + ".png"
                    }];
                    break;
            }

            var paramsDel = {
                Bucket: "designerrrr-output",
                Delete: {
                    Objects: diffObj,
                    Quiet: false
                }
            };
            s3.deleteObjects(paramsDel, function (err, data) {
                if (err) {
                    console.log("s3 fail");
                    console.log(err);
                    resolve("err");
                } else {
                    console.log("delete from s3 successful");
                    console.log(data);
                    console.log($scope.websites);
                    //This part is for arrange the pictures after delete.
                    $scope.websites.splice(index, 1);
                    if ($scope.deleteAllCount == $scope.deleteAllLength) {
                        setTimeout(function () {
                            var temp = $scope.websites.length;
                            console.log("vvvv thennnn7");
                            $scope.temp = temp;
                            $scope.websites = $scope.websites.concat(["https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png"]);
                        }, 1500);
                        setTimeout(function () {
                            console.log("vvvv 2000 thennnn7");
                            $scope.websites.splice($scope.temp, 1);
                            $scope.deleting = false;
                        }, 4000);
                        var pinTo = $scope.getToastPosition();
                        $mdToast.show($mdToast.simple().textContent('已刪除').position(pinTo).hideDelay(3000));
                    }
                    // /This part is for arrange the pictures after delete.
                    resolve("ok");
                    //$scope.init();
                    /*for(i=0;i<$scope.websites.length;i++){
                            if($scope.websites[i].indexOf(objj.id)!=-1){
                                console.log("splice ok");
                                $scope.websites.splice(i,1);
                            }
                        }
                        console.log($scope.websites);*/
                }
            });
        });
    }
    $scope.downloadAll = function () {
        if ($scope.selected.length != 0) {
            var allID = [];
            console.log($scope.selected);
            for (i = 0; i < $scope.selected.length; i++) {
                allID[i] = $scope.selected[i].substring(0, $scope.selected[i].indexOf("?AWSAccessKeyId")).substring($scope.selected[i].lastIndexOf("/") + 1).replace($scope.nowType, "");
            }
            console.log(allID);
            $mdDialog.show({
                controller: "batchDownloadPopupController",
                templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/batchDownloadPopup.html',
                escapeToClose: false,
                clickOutsideToClose: false,
                locals: {
                    allID: allID,
                    type: $scope.type
                }
            }).then(function () {
            });
        } else {
            var pinTo = $scope.getToastPosition();
            $mdToast.show($mdToast.simple().textContent('請選擇項目').position(pinTo).hideDelay(3000));
        }
    }
    $scope.upload = function () {
        console.log("vvvv upload");
        console.log($scope.user);
        $scope.alert = '';
        $mdBottomSheet.show({
            templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/upload.html',
            controller: 'uploadController',
            clickOutsideToClose: false,
            disableParentScroll: false,
            locals: {
                bucket: "designerrrr-output",
                key: $scope.px,
                rootScope: $scope
            }
        }).then(function () {
            /*
                $scope.getTags().then(function(result) {
                    $scope.tags = result.data;
                });
                console.log("vvvv then");
                console.log(uploadedFiles);
                var newItemArray = [];
                console.log("vvvv md dialog");
                if (uploadedFiles.length != 0) {
                    for (i = 0; i < uploadedFiles.length; i++) {
                        newItemArray[i] = $scope.getImage(uploadedFiles[i].path);
                    }
                    console.log(newItemArray);
                    if ($scope.allNewArray.length == 0) {
                        $scope.allNewArray = newItemArray;
                    } else {
                        $scope.allNewArray = newItemArray.concat($scope.allNewArray);
                    }
                    $scope.websites = newItemArray.concat($scope.websites);
                }*/
            //$scope.websites.concat(uploadedFiles);
        }).catch(function (error) {
            // User clicked outside or hit escape
        });
    };
    $scope.uploadWatermark = function () {
        console.log("vvvv uploadWatermark");
        console.log($scope.user);
        $scope.alert = '';
        $mdBottomSheet.show({
            templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/uploadWatermark.html',
            controller: 'uploadWatermarkController',
            clickOutsideToClose: false,
            disableParentScroll: false,
            locals: {
                bucket: "designerrrr",
                key: $scope.px,
                rootScope: $scope
            }
        }).then(function (uploadedFiles) {
            if (uploadedFiles == "ok") {
                console.log("okkkkkkkkWater");
                var pinTo = $scope.getToastPosition();
                $mdToast.show($mdToast.simple().textContent('已儲存自訂水印，請於上傳時開啟自訂水印模式').position(pinTo).hideDelay(5000));
            }
            //$scope.websites.concat(uploadedFiles);
        }).catch(function (error) {
            // User clicked outside or hit escape
        });
    };
    $scope.deleteTagsAll = function () {
        if ($scope.selected.length != 0) {
            console.log("vvvv avatar");
            //console.log($scope.websites[index]);
            $mdDialog.show({
                controller: "deleteTagController",
                templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/deleteTag.html',
                escapeToClose: false,
                clickOutsideToClose: false,
                locals: {
                    rootScope: $scope
                }
            }).then(function (tagNeedToBeDeleted) {
                console.log(tagNeedToBeDeleted);
                console.log($scope.selected);
                $scope.deleteAllTagtoPhoto(tagNeedToBeDeleted);
            });
        } else {
            var pinTo = $scope.getToastPosition();
            $mdToast.show($mdToast.simple().textContent('請選擇項目').position(pinTo).hideDelay(3000));
        }
    }
    $scope.changeTagsAll = function () {
        if ($scope.selected.length != 0) {
            console.log("AAAA");
            //console.log($scope.websites[index]);
            $mdDialog.show({
                controller: "changeTagController",
                templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/changeTag.html',
                escapeToClose: false,
                clickOutsideToClose: false,
                locals: {
                    rootScope: $scope
                }
            }).then(function (tagNeedToBeAdded) {
                console.log($scope.selected);
                $scope.saveAllTagtoPhoto(tagNeedToBeAdded);
            });
        } else {
            var pinTo = $scope.getToastPosition();
            $mdToast.show($mdToast.simple().textContent('請選擇項目').position(pinTo).hideDelay(3000));
        }
    }
    $scope.saveAllTagtoPhoto = function (SelectedTag) {
        console.log("AAAAA");
        if (SelectedTag.length != 0) {
            console.log("vvvv have tag");
            $scope.saveAllTagCount = 0;
            $scope.saveAllTagLength = angular.copy($scope.selected.length);
            for (i = 0; i < $scope.selected.length; i++) {
                var thisPhotoId = $scope.selected[i].substring(0, $scope.selected[i].indexOf("?AWSAccessKeyId"));
                thisPhotoId = thisPhotoId.substring(thisPhotoId.lastIndexOf("/") + 1);
                thisPhotoId = thisPhotoId.substring(0, thisPhotoId.lastIndexOf("."));
                console.log(thisPhotoId);
                var url = "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/hohopost-user-newdb";
                var params = {
                    "operation": "get",
                    "index": "gallery",
                    "type": "table",
                    "id": thisPhotoId
                }
                $http.post(url, params).then(function (result) {
                    console.log("db successful");
                    console.log(result);
                    $scope.checking = false;
                    $scope.tags = result._source.tags;
                    console.log($scope.tags);
                    for (i = 0; i < SelectedTag.length; i++) {
                        $scope.tags.push(SelectedTag[i]);
                    }
                    console.log($scope.tags);
                    $scope.tags = $scope.tags.filter(function (elem, pos) {
                        return $scope.tags.indexOf(elem) == pos;
                    })
                    console.log($scope.tags);
                    result._source.tags = $scope.tags;
                    $scope.save(result._source);
                })
            }
        }
    }
    $scope.deleteAllTagtoPhoto = function (SelectedTag) {
        console.log("vvvv delete");
        if (SelectedTag.length != 0) {
            console.log("vvvv have tag");
            $scope.saveAllTagCount = 0;
            $scope.saveAllTagLength = angular.copy($scope.selected.length);
            for (i = 0; i < $scope.selected.length; i++) {
                var thisPhotoId = $scope.selected[i].substring(0, $scope.selected[i].indexOf("?AWSAccessKeyId"));
                thisPhotoId = thisPhotoId.substring(thisPhotoId.lastIndexOf("/") + 1);
                thisPhotoId = thisPhotoId.substring(0, thisPhotoId.lastIndexOf("."));
                console.log(thisPhotoId);
                var url = "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/hohopost-user-newdb";
                var params = {
                    "operation": "get",
                    "index": "gallery",
                    "type": "table",
                    "id": thisPhotoId
                }
                $http.post(url, params).then(function (result) {
                    console.log("db successful");
                    console.log(result);
                    $scope.checking = false;
                    $scope.tags = result._source.tags;
                    console.log($scope.tags);
                    for (i = 0; i < SelectedTag.length; i++) {
                        if ($scope.tags.indexOf(SelectedTag[i]) != -1) {
                            console.log("vvvv delete if");
                            console.log($scope.tags.indexOf(SelectedTag[i]));
                            $scope.tags.splice($scope.tags.indexOf(SelectedTag[i]), 1);
                        }
                    }
                    console.log($scope.tags);
                    $scope.tags = $scope.tags.filter(function (elem, pos) {
                        return $scope.tags.indexOf(elem) == pos;
                    })
                    console.log($scope.tags);
                    result._source.tags = $scope.tags;
                    $scope.save(result._source);
                })
            }
        }
    }
    $scope.save = function (Item) {
        console.log(Item);
        /*
            var urlS = "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/hohopost-user-newdb";
            var paramsS = {
                "operation": "batchWrite",
                "accessKeyId": "sdasda",
                "secretAccessKey": "asdsa",
                "sessionToken": "vhndi757Bydd",
                "RequestItems": {
                    "dazzle-gallery": [{
                        PutRequest: {
                            Item: Item
                        }
                    }]
                }
            };
            console.log(paramsS);
            $http.post(urlS, paramsS).then(function(result) {
                console.log("vvvv save 2");
                console.log(result);
                var pinTo = $scope.getToastPosition();
                $scope.saveAllTagCount++;
                if ($scope.saveAllTagCount == $scope.saveAllTagLength) {
                    $mdToast.show($mdToast.simple().textContent('已儲存').position(pinTo).hideDelay(3000));
                }
                $scope.getTags().then(function(result) {
                    console.log("vvvv getT");
                    $scope.tags = result.data;
                });
            });*/
    }
});

app.controller('myPhotosController', function ($scope, $http, $filter, $mdDialog, $mdBottomSheet, $mdToast) {
    console.log("vvvv vvvv 8");
    var QueryString = function () {
        // This function is anonymous, is executed immediately and
        // the return value is assigned to QueryString!
        var query_string = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = decodeURIComponent(pair[1]);
                // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                query_string[pair[0]] = arr;
                // If third or later entry with this name
            } else {
                query_string[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }

        return query_string;
    }();
    console.log(QueryString);
    console.log("vvvv qs type whyyyy2");
    $scope.eachShowNum = 500;


    $scope.init = function () {
        //$scope.$apply(function(){
        $scope.type = QueryString.type;
        $scope.allNewArray = [];
        $scope.deleting = false;
        $scope.loading = true;
        $scope.end = false;
        $scope.tags = [];
        $scope.selected = [];
        $scope.selecting = false;
        $scope.deletedURL = [];
        $scope.selectedTags = [];
        $scope.LastEvaluatedKey = null;
        $scope.websitesAngularGridOptions = {
            gridWidth: 200,
            gutterSize: 4,
            infiniteScrollDelay: 1000,
            infiniteScrollDistance: 95,
            scrollContainer: '#sidecontent'
        }
        $scope.inited = false;
        $scope.websites = [];
        //});
        switch ($scope.type) {
            case "相片":
                console.log("vvvv 相片");
                $scope.px = 'images/' + $scope.user.uid + '/medium-web/';
                $scope.nowType = ".jpg";
                break;
            case "插畫":
                console.log("vvvv 插畫");
                $scope.px = 'illustration/' + $scope.user.uid + '/png/';
                $scope.nowType = ".png";
                break;
        }
        console.log('myPhotosController');
        console.log($scope.user.uid);
        console.log(AWS.config);
        var s3 = new AWS.S3();
        var params = {
            Bucket: "designerrrr-output",
            /* required */
            Prefix: $scope.px
        };
        s3.listObjects(params, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else {
                console.log("listObj");
                console.log(data);
                data.Contents = data.Contents.reverse();
                $scope.data = data;
                $scope.getTags().then(function (result) {
                    $scope.tags = result.data;
                });
                $scope.getWebsites($scope.eachShowNum, 0).then(function (anArray) {
                    $scope.$apply(function () {
                        $scope.inited = true;
                        $scope.loading = false;
                        $scope.websites = $scope.websites.concat(anArray);
                        $scope.LastEvaluatedKey = $scope.eachShowNum;
                        console.log("vvvv $scope.websites");
                        console.log($scope.websites);
                    });
                });
            }
        });
    }
    $scope.tagClicked = function (tag) {
        console.log("vvvv tc1");
        $scope.selectedTags = [];
        $scope.selectedTags.push(tag);
        $scope.tagsChanged();
    }
    $scope.tagsChanged = function () {
        console.log("vvvv tc2");
        $scope.loading = true;
        $scope.end = false;
        $scope.LastEvaluatedKey = null;
        $scope.websites = [];
        if ($scope.selectedTags.length <= 0) {
            $scope.getWebsites($scope.eachShowNum, 0).then(function (anArray) {
                $scope.$apply(function () {
                    $scope.loading = false;
                    anArray = $scope.allNewArray.concat(anArray);
                    $scope.websites = $scope.websites.concat(anArray);
                    $scope.LastEvaluatedKey = $scope.eachShowNum;
                });
            });
        } else {
            var uniArray = [];
            var done = [];
            for (var i = 0; i < $scope.selectedTags.length; i++) {
                $scope.getWebsitesByTag($scope.selectedTags[i]).then(function (anArray) {
                    $scope.$apply(function () {
                        uniArray = uniArray.concat(anArray);
                        done.push({});
                        if (done.length == $scope.selectedTags.length) {
                            uniArray = uniArray.filter(function (elem, pos) {
                                return uniArray.indexOf(elem) == pos;
                            });
                            $scope.websites = $scope.websites.concat(uniArray);
                            console.log($scope.websites);
                        }
                    });
                });
            }
            $scope.loading = false;
            $scope.end = true;
        }
    }
    $scope.queryTags = function (query) {
        console.log(query);
        return $filter('filter')(angular.lowercase($scope.tags), angular.lowercase(query));
    }
    $scope.getTags = function () {
        return new Promise(function (resolve, reject) {
            var data = {};
            data.userName = $scope.user.uid;
            data.type = $scope.type;
            console.log("vvvv whyyyyyy 323232");
            console.log($scope.user.uid);
            $http({
                "method": "post",
                "url": "https://9g1gx9kfdc.execute-api.ap-northeast-1.amazonaws.com/dazzlegallery/gettags",
                "data": data
            }).then(function (result) {
                console.log("vvvv getTag");
                console.log(result);
                if (result.data.code > 0) {
                    resolve(result.data);
                } else {
                    reject(result.data.text);
                }
            })
        })
    }
    $scope.getWebsitesByTag = function (tag) {
        return new Promise(function (resolve, reject) {
            $http({
                "method": "post",
                "url": "https://9g1gx9kfdc.execute-api.ap-northeast-1.amazonaws.com/dazzlegallery/getid",
                "data": {
                    "tag": tag,
                    "action": "bytag",
                    "owner_id": $scope.user.uid,
                    "type": $scope.type
                }
            }).then(function (result) {
                console.log(result);
                if (result.data.code > 0) {
                    var s3 = new AWS.S3();
                    var anArray = [];
                    for (i = 0; i < result.data.data.length; i++) {
                        var theID = result.data.data[i].gid;
                        switch ($scope.type) {
                            case "相片":
                                console.log("vvvv 相片 2");
                                var theLink = "images/" + $scope.user.uid + "/medium-web/" + theID + ".jpg"
                                break;
                            case "插畫":
                                console.log("vvvv 插畫 2");
                                var theLink = "illustration/" + $scope.user.uid + "/png/" + theID + ".png"
                                break;
                        }
                        var params = {
                            Bucket: "designerrrr-output",
                            Key: theLink
                        };
                        var url = s3.getSignedUrl('getObject', params);
                        anArray[i] = url;
                    }
                    console.log(anArray);
                    resolve(anArray);
                } else {
                    resolve([]);
                }
            });
        });
    }
    $scope.loadMore = function () {
        console.log("loadMore");
        if (!$scope.end && !$scope.loading) {
            $scope.loading = true;
            $scope.getWebsites($scope.eachShowNum, $scope.LastEvaluatedKey).then(function (anArray) {
                $scope.loading = false;
                if (anArray.length > 0) {
                    $scope.websites = $scope.websites.concat(anArray);
                    $scope.LastEvaluatedKey = $scope.LastEvaluatedKey + $scope.eachShowNum;
                } else {
                    $scope.end = true;
                }
            });
        }
    }
    $scope.getWebsites = function (limit, key) {
        return new Promise(function (resolve, reject) {
            console.log("getWebsites");
            var data = $scope.data;
            console.log(data);
            var anArray = [];
            var counter = 0;
            var s3 = new AWS.S3();
            if ($scope.LastEvaluatedKey < data.Contents.length && data.Contents.length - $scope.LastEvaluatedKey < $scope.eachShowNum) { //show photo when unshow photo less than 50
                console.log("if");
                for (i = (0 + key); i < data.Contents.length; i++) {
                    var checkID = data.Contents[i].Key.substring(data.Contents[i].Key.lastIndexOf("/") + 1).replace($scope.nowType, "");
                    var notLoad = false;
                    for (j = 0; j < $scope.deletedURL.length; j++) {
                        if ($scope.deletedURL[j] == checkID) {
                            notLoad = true;
                        }
                    }
                    if (notLoad) {
                        //found a invalid url
                    } else {
                        var params = {
                            Bucket: "designerrrr-output",
                            Key: data.Contents[i].Key
                        };
                        var url = s3.getSignedUrl('getObject', params);
                        anArray[counter] = url;
                        counter++;
                    }
                }
                if ($scope.data.Contents.length <= $scope.eachShowNum) {
                    console.log("endFirst");
                    $scope.end = true;
                }
                console.log(anArray);
                resolve(anArray);
            } else if ($scope.LastEvaluatedKey < data.Contents.length) {
                console.log("else if");
                for (i = (0 + key); i < (limit + key); i++) {
                    console.log("vvvv for");
                    console.log(data.Contents[i]);
                    console.log(data.Contents[i].Key);
                    var checkID = data.Contents[i].Key.substring(data.Contents[i].Key.lastIndexOf("/") + 1).replace($scope.nowType, "");
                    console.log("vvvv checkID");
                    console.log(checkID);
                    var notLoad = false;
                    for (j = 0; j < $scope.deletedURL.length; j++) {
                        if ($scope.deletedURL[j] == checkID) {
                            notLoad = true;
                        }
                    }
                    if (notLoad) {
                        console.log("dead img found");
                    } else {
                        console.log("dead img else");
                        var params = {
                            Bucket: "designerrrr-output",
                            Key: data.Contents[i].Key
                        };
                        var url = s3.getSignedUrl('getObject', params);
                        anArray[counter] = url;
                        counter++;
                    }
                }
                console.log(anArray);
                resolve(anArray);
            } else {
                if ($scope.websites.length == 0) {
                    console.log("vvvv first 0");
                    $scope.inited = true;
                    $scope.loading = false;
                    $scope.LastEvaluatedKey = 0;
                }
                $scope.end = true;
                console.log("reject");
                reject("end");
            }
        });
    }
    $scope.getImage = function (key) {
        var s3 = new AWS.S3();
        var params = {
            Bucket: "designerrrr-output",
            Key: key
        };
        var url = s3.getSignedUrl('getObject', params);
        console.log(url);
        return url;
    }
    //For toast popup use
    var last = {
        bottom: true,
        top: false,
        left: false,
        right: true
    };
    $scope.toastPosition = angular.extend({}, last);
    $scope.getToastPosition = function () {
        sanitizePosition();
        return Object.keys($scope.toastPosition).filter(function (pos) {
            return $scope.toastPosition[pos];
        }).join(' ');
    };

    function sanitizePosition() {
        var current = $scope.toastPosition;
        if (current.bottom && last.top) current.top = false;
        if (current.top && last.bottom) current.bottom = false;
        if (current.right && last.left) current.left = false;
        if (current.left && last.right) current.right = false;
        last = angular.extend({}, current);
    }

    // /For toast popup use
    $scope.showPhoto = function (website, index) {
        //尋日做到show photo,要改show photo.js showPhoto.html d type 同 url2017 7 26
        console.log(index);
        //console.log($scope.websites[index]);
        $mdDialog.show({
            controller: "showPhotoController",
            templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/showPhoto.html',
            escapeToClose: false,
            clickOutsideToClose: false,
            locals: {
                website: website,
                rootScope: $scope,
                bought: false,
                sold: false
            }
        }).then(function (objj) {
            console.log("vvvv showPhoto then");
            console.log(objj);
            if (objj.tORf) {
                var confirm = $mdDialog.confirm().title('刪除圖片').textContent('你真的要刪除此圖片嗎?').ariaLabel('Lucky day').ok('刪除').cancel('取消');
                $mdDialog.show(confirm).then(function () {
                    $scope.selected = [];
                    $scope.deleting = true;
                    var delID = $scope.websites[index].substring(0, $scope.websites[index].indexOf($scope.nowType + "?AWSAccessKeyId")).replace($scope.nowType + "?AWSAccessKeyId", "");
                    console.log(delID);
                    delID = delID.substring(delID.lastIndexOf("/") + 1);
                    console.log(delID);
                    $scope.deletedURL.push(delID);
                    console.log("vvvv dellll");
                    console.log($scope.deletedURL);
                    //This part is for a special case that user delete the photo just upload in same page
                    for (i = 0; i < $scope.allNewArray.length; i++) {
                        console.log($scope.allNewArray[i]);
                        console.log($scope.websites[index]);
                        if ($scope.allNewArray[i] === $scope.websites[index]) {
                            console.log("same!");
                            $scope.allNewArray.splice(i, 1);
                        }
                    }
                    //This part is for arrange the pictures after delete.
                    $scope.websites.splice(index, 1);
                    setTimeout(function () {
                        var temp = $scope.websites.length;
                        console.log("vvvv thennnn7");
                        $scope.temp = temp;
                        $scope.websites = $scope.websites.concat(["https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png"]);
                    }, 1500);
                    setTimeout(function () {
                        console.log("vvvv 2000 thennnn7");
                        $scope.websites.splice($scope.temp, 1);
                        $scope.deleting = false;
                    }, 4000);
                    // /This part is for arrange the pictures after delete.
                    var url = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
                    var params = {
                        "operation": "delete",
                        "accessKeyId": "sdasda",
                        "secretAccessKey": "asdsa",
                        "sessionToken": "vhndi757Bydd",
                        "TableName": "dazzle-gallery",
                        "Key": {
                            "gid": objj.id
                        }
                    }
                    $http.post(url, params).then(function (result) {
                        console.log("deleted");
                        console.log(result);
                        var pinTo = $scope.getToastPosition();
                        $scope.getTags().then(function (result) {
                            $scope.tags = result.data;
                        });
                        $mdToast.show($mdToast.simple().textContent('已刪除').position(pinTo).hideDelay(3000));
                    });
                    var s3 = new AWS.S3();
                    switch ($scope.type) {
                        case "相片":
                            console.log("vvvv 相片 3");
                            var diffObj = [{
                                Key: "images/" + $scope.user.uid + "/large/" + objj.id + ".jpg"
                            }, {
                                Key: "images/" + $scope.user.uid + "/large-web/" + objj.id + ".jpg"
                            }, {
                                Key: "images/" + $scope.user.uid + "/medium/" + objj.id + ".jpg"
                            }, {
                                Key: "images/" + $scope.user.uid + "/medium-web/" + objj.id + ".jpg"
                            }, {
                                Key: "images/" + $scope.user.uid + "/small/" + objj.id + ".jpg"
                            }, {
                                Key: "images/" + $scope.user.uid + "/small-web/" + objj.id + ".jpg"
                            }, {
                                Key: "images/" + $scope.user.uid + "/thumbnail/" + objj.id + ".jpg"
                            }, {
                                Key: "images/" + $scope.user.uid + "/thumbnail-web/" + objj.id + ".jpg"
                            }, {
                                Key: "images/" + $scope.user.uid + "/original/" + objj.id + objj.type
                            }];
                            break;
                        case "插畫":
                            console.log("vvvv 插畫 3");
                            var diffObj = [{
                                Key: "illustration/" + $scope.user.uid + "/eps/" + objj.id + ".eps"
                            }, {
                                Key: "illustration/" + $scope.user.uid + "/svg/" + objj.id + ".svg"
                            }, {
                                Key: "illustration/" + $scope.user.uid + "/png/" + objj.id + ".png"
                            }];
                            break;
                    }

                    var paramsDel = {
                        Bucket: "designerrrr-output",
                        Delete: {
                            Objects: diffObj,
                            Quiet: false
                        }
                    };
                    s3.deleteObjects(paramsDel, function (err, data) {
                        if (err) {
                            console.log("s3 fail");
                            console.log(err);
                        } else {
                            console.log("delete from s3 successful");
                            console.log(data);
                            console.log($scope.websites);
                            //$scope.init();
                            /*for(i=0;i<$scope.websites.length;i++){
                                    if($scope.websites[i].indexOf(objj.id)!=-1){
                                        console.log("splice ok");
                                        $scope.websites.splice(i,1);
                                    }
                                }
                                console.log($scope.websites);*/
                        }
                    });
                }, function () {
                });
            }
        });
    }
    $scope.toggle = function (item, list) {
        console.log(item);
        var idx = list.indexOf(item);
        console.log(idx);
        if (idx > -1) {
            list.splice(idx, 1);
        } else {
            list.push(item);
        }
    };
    $scope.toggleAll = function (item) {
        if ($scope.selected.length === $scope.websites.length) {
            $scope.selected = [];
        } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
            $scope.selected = $scope.websites.slice(0);
        }
    }
    $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };
    $scope.select = function () {
        $scope.selecting = true;
    }
    $scope.selectCancel = function () {
        $scope.selected = [];
        $scope.selecting = false;
    }
    $scope.deleteAll = function (website) {
        if ($scope.selected.length != 0) {
            var allID = [];
            console.log($scope.selected);
            for (i = 0; i < $scope.selected.length; i++) {
                allID[i] = $scope.selected[i].substring(0, $scope.selected[i].indexOf("?AWSAccessKeyId")).substring($scope.selected[i].lastIndexOf("/") + 1).replace($scope.nowType, "");
            }
            console.log(allID);
            var confirm = $mdDialog.confirm().title('刪除圖片').textContent('你真的要刪除' + $scope.selected.length + '張圖片嗎?').ariaLabel('Lucky day').ok('刪除').cancel('取消');
            $mdDialog.show(confirm).then(function () {
                $scope.deleteAllPhoto();
                $scope.deleteAllData();
            });
        }
    }
    $scope.downloadAll = function () {
        if ($scope.selected.length != 0) {
            var allID = [];
            console.log($scope.selected);
            for (i = 0; i < $scope.selected.length; i++) {
                allID[i] = $scope.selected[i].substring(0, $scope.selected[i].indexOf("?AWSAccessKeyId")).substring($scope.selected[i].lastIndexOf("/") + 1).replace($scope.nowType, "");
            }
            console.log(allID);
            $mdDialog.show({
                controller: "batchDownloadPopupController",
                templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/batchDownloadPopup.html',
                escapeToClose: false,
                clickOutsideToClose: false,
                locals: {
                    allID: allID,
                    type: $scope.type
                }
            }).then(function () {
            });
        }
    }
    $scope.upload = function () {
        console.log("vvvv upload");
        console.log($scope.user);
        $scope.alert = '';
        $mdBottomSheet.show({
            templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/upload.html',
            controller: 'uploadController',
            clickOutsideToClose: false,
            disableParentScroll: false,
            locals: {
                bucket: "designerrrr-output",
                key: $scope.px,
                rootScope: $scope
            }
        }).then(function () {
            /*
                $scope.getTags().then(function(result) {
                    $scope.tags = result.data;
                });
                console.log("vvvv then");
                console.log(uploadedFiles);
                var newItemArray = [];
                console.log("vvvv md dialog");
                if (uploadedFiles.length != 0) {
                    for (i = 0; i < uploadedFiles.length; i++) {
                        newItemArray[i] = $scope.getImage(uploadedFiles[i].path);
                    }
                    console.log(newItemArray);
                    if ($scope.allNewArray.length == 0) {
                        $scope.allNewArray = newItemArray;
                    } else {
                        $scope.allNewArray = newItemArray.concat($scope.allNewArray);
                    }
                    $scope.websites = newItemArray.concat($scope.websites);
                }*/
            //$scope.websites.concat(uploadedFiles);
        }).catch(function (error) {
            // User clicked outside or hit escape
        });
    };
    $scope.uploadWatermark = function () {
        console.log("vvvv uploadWatermark");
        console.log($scope.user);
        $scope.alert = '';
        $mdBottomSheet.show({
            templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/uploadWatermark.html',
            controller: 'uploadWatermarkController',
            clickOutsideToClose: false,
            disableParentScroll: false,
            locals: {
                bucket: "designerrrr",
                key: $scope.px,
                rootScope: $scope
            }
        }).then(function (uploadedFiles) {
            if (uploadedFiles == "ok") {
                console.log("okkkkkkkkWater");
                var pinTo = $scope.getToastPosition();
                $mdToast.show($mdToast.simple().textContent('已儲存自訂水印，請於上傳時開啟自訂水印模式').position(pinTo).hideDelay(5000));
            }
            //$scope.websites.concat(uploadedFiles);
        }).catch(function (error) {
            // User clicked outside or hit escape
        });
    };
    $scope.changeTagsAll = function () {
        if ($scope.selected.length != 0) {
            console.log("AAAA");
            //console.log($scope.websites[index]);
            $mdDialog.show({
                controller: "changeTagController",
                templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/changeTag.html',
                escapeToClose: false,
                clickOutsideToClose: false,
                locals: {
                    rootScope: $scope
                }
            }).then(function (tagNeedToBeAdded) {
                console.log($scope.selected);
                $scope.saveAllTagtoPhoto(tagNeedToBeAdded);
            });
        }
    }
    $scope.saveAllTagtoPhoto = function (SelectedTag) {
        console.log("AAAAA");
        if (SelectedTag.length != 0) {
            console.log("vvvv have tag");
            $scope.saveAllTagCount = 0;
            $scope.saveAllTagLength = angular.copy($scope.selected.length);
            for (i = 0; i < $scope.selected.length; i++) {
                var thisPhotoId = $scope.selected[i].substring(0, $scope.selected[i].indexOf("?AWSAccessKeyId"));
                thisPhotoId = thisPhotoId.substring(thisPhotoId.lastIndexOf("/") + 1);
                thisPhotoId = thisPhotoId.substring(0, thisPhotoId.lastIndexOf("."));
                console.log(thisPhotoId);
                var url = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
                var params = {
                    "operation": "get",
                    "accessKeyId": "sdasda",
                    "secretAccessKey": "asdsa",
                    "sessionToken": "vhndi757Bydd",
                    "TableName": "dazzle-gallery",
                    "Key": {
                        "gid": thisPhotoId
                    }
                }
                $http.post(url, params).then(function (result) {
                    console.log("db successful");
                    console.log(result);
                    $scope.checking = false;
                    $scope.tags = result.data.Item.tags;
                    console.log($scope.tags);
                    for (i = 0; i < SelectedTag.length; i++) {
                        $scope.tags.push(SelectedTag[i]);
                    }
                    console.log($scope.tags);
                    $scope.tags = $scope.tags.filter(function (elem, pos) {
                        return $scope.tags.indexOf(elem) == pos;
                    })
                    console.log($scope.tags);
                    result.data.Item.tags = $scope.tags;
                    $scope.save(result.data.Item);
                })
            }
        }
    }
    $scope.save = function (Item) {
        var urlS = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
        var paramsS = {
            "operation": "batchWrite",
            "accessKeyId": "sdasda",
            "secretAccessKey": "asdsa",
            "sessionToken": "vhndi757Bydd",
            "RequestItems": {
                "dazzle-gallery": [{
                    PutRequest: {
                        Item: Item
                    }
                }]
            }
        };
        console.log(paramsS);
        $http.post(urlS, paramsS).then(function (result) {
            console.log("vvvv save 2");
            console.log(result);
            var pinTo = $scope.getToastPosition();
            $scope.saveAllTagCount++;
            if ($scope.saveAllTagCount == $scope.saveAllTagLength) {
                $mdToast.show($mdToast.simple().textContent('已儲存').position(pinTo).hideDelay(3000));
            }
            $scope.getTags().then(function (result) {
                console.log("vvvv getT");
                $scope.tags = result.data;
            });
        });
    }
});

app.controller('controlDbController', function ($scope, $window, $http, $compile, $uibModal, $mdDialog, $mdToast, $mdBottomSheet, $ocLazyLoad, $mdDateLocale, $dazzleS3, $dazzlePopup, $dazzleUser,$dazzleData, $dazzleInit, $dazzleFn,$dazzleElastic, $routeParams,moment) {
    console.log('elasticPopupController');




    $scope.created = [];

//      $scope.$element = $element;
    $scope.$http = $http;
    $scope.$window = $window;
    $scope.$compile = $compile;
    $scope.$uibModal = $uibModal;
    $scope.$mdDialog = $mdDialog;
    $scope.$mdToast = $mdToast;
    $scope.$mdBottomSheet = $mdBottomSheet;
    $scope.$ocLazyLoad = $ocLazyLoad;
    $scope.$mdDateLocale = $mdDateLocale;
    $scope.$dazzleS3 = $dazzleS3;
    $scope.$dazzlePopup = $dazzlePopup;
    $scope.$dazzleUser = $dazzleUser;
    $scope.$dazzleData = $dazzleData;
    $scope.$dazzleInit = $dazzleInit;
    $scope.$dazzleFn = $dazzleFn;
    $scope.$dazzleElastic = $dazzleElastic;
    $scope.website = $dazzleUser.dazzleInfo['website'];
    $scope.table = $routeParams.table;
    $dazzleUser.dazzleInfo['thisTable'] = $scope.table;
    //$scope.table = table;
    $scope.isForm = false;
    $scope.editable = true;
    $scope.modelType = false;
    $scope.alasql = alasql;
    $scope.websiteTable=[];
    $scope.moment = moment;
    $dazzleUser.dazzleInfo['myScope']=$scope;

    if (!$scope.user) {
        $scope.user = $dazzleUser.getUser();
    }

    $scope.init = function () {

        switch($routeParams.table){
            case '_table':
            case '_schema':
            case '_page':
            case '_atom':
                $dazzleElastic.initGrid('_master',$routeParams.table);
                break;
            default:
                $dazzleElastic.initGrid($dazzleUser.getUser().uid,$routeParams.table);
                break;

        }


        $scope.gridOptions = $dazzleElastic.gridOptions;
        console.log('Grid Options',$scope.gridOptions);


        $dazzleInit.loadWebsiteInfo().then(function(){
            $scope.inited = true;

            $dazzleInit.loadDirectiveInfo();
            $dazzleInit.loadCustomElasticDirectives();
            $scope.userBucket = $dazzleUser.getDazzleInfo('userBucket');
            $scope.websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
            $scope.thisTable = $scope.table;
            $dazzleUser.setDazzleInfo('thisTable',$scope.thisTable);
            //           $dazzleUser.setDazzleInfo('websiteId',$dazzleUser.dazzleInfo['website'].website);
            $dazzleUser.dazzleInfo['websiteId'] = $routeParams.website;
            $scope.websiteId = $dazzleUser.dazzleInfo['websiteId'];
            $scope.websiteId = $routeParams.website;

            $dazzleFn.getUserTables($dazzleUser.getUser().uid, $routeParams.website).then(function (tables) {
                $scope.$apply(function () {
                    $scope.websiteTable = $scope.websiteTable.concat(tables);
                });
            });
            console.log('Load Website Bucket',$scope.userBucket,$scope.websiteKey,$scope.thisTable,$dazzleUser.dazzleInfo['websiteId']);
            console.log('Website ID',$dazzleUser.dazzleInfo['websiteId']);
            $scope.inited = true;
            //$scope.refresh();
        });
    }


    console.log($dazzleUser.getDazzleInfo('thisTable'));
    $scope.lastUpdated = null;


    $scope.massMailPopup = function() {
        var params = {
            name: 'dazzleMassMailPopup',
            directive: '<dazzle-mass-mail-popup></dazzle-mass-mail-popup>'
        }
        $dazzlePopup.callPopup(params).then(function(result){

        });
    }
    $scope.sendEmail = function(from,to,subject,text) {
        return new Promise(function (resolve, reject) {
            console.log('Load DynamoDB Data');
            $http({
                "method": "post",
                "url": "https://9hhtm40jpe.execute-api.ap-northeast-1.amazonaws.com/sendemail",
                "data": {
                    "from": from,       // sender address
                    "to": to,           // list of receivers
                    "subject": subject, // Subject line
                    "text": text        // html body

                }
            }).then(function (result) {
                console.log(result);
                if (result.data.code < 0) {
                    reject();
                } else {
                    resolve();
                }
            });
        });
    }

    $scope.massMail = function(){
        var selectedRows = $dazzleUser.dazzleInfo['selectedRows'];
        var from,to,subject,html;
        console.log('Send Email',selectedRows);
        from = "support@01power.net";


        angular.forEach(selectedRows,function(item,index){
            text = "各位石硤尾官小的校友﹕\n" +
                "\n" +
                " \n" +
                "因學校網頁已經轉移到較快的新系統中，現需麻煩各位重新設定個人密碼來使用網站內之所有功能，請點擊以下連結及使用現提供之用戶登入名稱及臨時密碼登入及完成重設密碼手續，謝謝﹗"+
                "\n" +
                " \n" +
                "連結：http://www.skmgps.org/更改密碼.html"
            " \n" + "賬號："+item['login']
            " \n" + "密碼："+item['password']
            "\n" +
            " \n" +
            "在輸入賬號、密碼、及新密碼後，用戶即可使用本站的留言版、尋找同學及時光隧道等功能。"

            $scope.sendEmail(from,item['email'],"系統已更新及更改密碼通知。",text);
        });




        // api = "https://9hhtm40jpe.execute-api.ap-northeast-1.amazonaws.com/sendemail";
        //



    }

    $scope.dbManage = function (table) {
        $dazzleElastic.dbManage(table);
    }

    $scope.listElastic = function (table) {
        $dazzleElastic.listElastic(table);
    }

    $scope.home = function (table) {
        $dazzleElastic.home(table);

    }

    $scope.loadButton = function (b) {
        $dazzleElastic.loadButton(b);
    }

    $scope.editSchema = function () {
        $dazzleElastic.editSchema();
    }

    $scope.addTable = function() {
        $dazzleElastic.addTable();
    }

    $scope.removeTable = function () {
        $dazzleElastic.removeTable();
    }

    $scope.loadTable = function (tableName) {
        $dazzleElastic.loadTable(tableName);
    }

    $scope.initTable = function () {
        $dazzleElastic.initTable();
    }


    $scope.loadData = function () {
        $dazzleElastic.loadData();
    };

    $scope.loadCell = function (schema) {
        $dazzleElastic.loadCell(schema);
    }

    $scope.setCellJs = function (schema) {
        $dazzleElastic.setCellJs(schema);
    }

    $scope.setCellFilterer = function (schema) {
        $dazzleElastic.setCellFilterer(schema);
    }

    $scope.setCellFilter = function (schema) {
        $dazzleElastic.setCellFilter(schema);
    }

    $scope.setCellEditor = function (schema) {
        $dazzleElastic.setCellEditor(schema);
    }

    $scope.setCellRenderer = function (schema) {
        $dazzleElastic.setCellRenderer(schema);
    }


    $scope.referAdd = function (object) {
        $dazzleElastic.referAdd(object);
    }

    $scope.addFilter = function (filter) {
        $dazzleElastic.addFilter(filter);
    }


    $scope.add = function(object) {
        $dazzleElastic.add(object);
    }


    $scope.addRecord = function(object) {
        $dazzleElastic.addRecord(object);
    }

    $scope.remove = function() {
        $dazzleElastic.remove();
    }

    $scope.refresh = function () {
        $dazzleElastic.refresh();
    }

    $scope.isFirstColumn = function (params) {
        $dazzleElastic.isFirstColumn(params);

    }
    $scope.cancel = function () {
        $mdDialog.hide($scope.lastUpdated);
    }
    $scope.save = function () {
        $dazzleElastic.save();
    }

    $scope.saveSchema = function () {
        $dazzleElastic.saveSchema();

    }
    $scope.saveData = function(data) {
        $dazzleElastic.saveData(data);
    }
    $scope.checkExist = function (tableJson,data) {
        $dazzleElastic.checkExist(tableJson,data);

    }

    $scope.bulkUpdateData = function (params) {
        $dazzleElastic.bulkUpdateData(params);
    }

    $scope.getData = function() {
        $dazzleElastic.getData();
    }

    $scope.import = function() {
        $dazzleElastic.import();
    }

    $scope.export = function() {
        $dazzleElastic.export();
    }

    $scope.import = function () {
        if (!$scope.fileChooser) {
            $scope.fileChooser = document.createElement('input');
            $scope.fileChooser.setAttribute("type", "file");
            $scope.fileChooser.style.display = "none";
            $scope.fileChooser.addEventListener('change', function (event) {
                console.log('Change');
                var file = this.files[0];
                var tagField = [];
                for (var i = 0; i < $dazzleElastic.schemaJson.length; i++) {
                    if ($dazzleElastic.schemaJson[i].directive == 'tag') {
                        tagField.push($dazzleElastic.schemaJson[i].field);
                    }
                }
                alasql('SELECT * FROM FILE(?,{headers:true})', [event], function (data) {
                    console.log('Import',data);


                    for (var i=0;i<data.length; i++) {
                        $scope.addRecord(data[i]);
                    }

                    // $scope.gridOptions.api.setRowData(data);
                    // $scope.gridOptions.api.refreshView();
                    // $scope.gridOptions.api.forEachNode(function (node) {
                    //  for (var i = 0; i < tagField.length; i++) {
                    //      if (node.data[tagField[i]] && !angular.isArray(node.data[tagField[i]])) {
                    //          node.data[tagField[i]] = node.data[tagField[i]].split(',');
                    //      }
                    //  }
                    //  node.edited = true;
                    // });
                });
            });
        }
        $scope.fileChooser.click();
    }

});



app.controller('myElasticController', function ($scope, $window, $http, $compile, $uibModal, $mdDialog, $mdToast, $mdBottomSheet, $ocLazyLoad, $mdDateLocale, $dazzleS3, $dazzlePopup, $dazzleUser,$dazzleData, $dazzleInit, $dazzleFn,$dazzleElastic, $routeParams,moment) {
    console.log('elasticPopupController');




    $scope.created = [];

//      $scope.$element = $element;
    $scope.$http = $http;
    $scope.$window = $window;
    $scope.$compile = $compile;
    $scope.$uibModal = $uibModal;
    $scope.$mdDialog = $mdDialog;
    $scope.$mdToast = $mdToast;
    $scope.$mdBottomSheet = $mdBottomSheet;
    $scope.$ocLazyLoad = $ocLazyLoad;
    $scope.$mdDateLocale = $mdDateLocale;
    $scope.$dazzleS3 = $dazzleS3;
    $scope.$dazzlePopup = $dazzlePopup;
    $scope.$dazzleUser = $dazzleUser;
    $scope.$dazzleData = $dazzleData;
    $scope.$dazzleInit = $dazzleInit;
    $scope.$dazzleFn = $dazzleFn;
    $scope.$dazzleElastic = $dazzleElastic;
    $scope.website = $dazzleUser.dazzleInfo['website'];
    $scope.table = $dazzleUser.dazzleInfo['thisTable'];
    $dazzleUser.dazzleInfo['thisTable'] = $scope.table;
    $scope.table = $routeParams.id;
    //$scope.table = table;
    $scope.isForm = false;
    $scope.editable = true;
    $scope.modelType = false;
    $dazzleUser.dazzleInfo['websiteId'] = $routeParams.website;
    $scope.websiteId = $routeParams.website;
    $scope.alasql = alasql;
    $scope.websiteTable=[];
    $scope.moment = moment;
    $dazzleUser.dazzleInfo['myScope']=$scope;


    if (!$scope.user) {
        $scope.user = $dazzleUser.getUser();
    }

    $scope.loadButton = function (b) {
        var myScope;
        myScope = $dazzleUser.dazzleInfo['myScope'];
        console.log('BUtton',b);
        $ocLazyLoad.load({files: b.js, cache: false}).then(function () {
            console.log('Button HTML',b.html);
            var button = angular.element(b.html);
            $compile(button)(myScope);
        });
    }
    $scope.init = function () {
        // $dazzleUser.dazzleInfo['myScope']=$scope;
        // $dazzleElastic.initSettings($routeParams.website,$routeParams.table).then(function(){
        //     console.log('Finish Init',$dazzleUser.dazzleInfo['tableJson']);
        //     $dazzleElastic.initGrid2();
        //     $scope.gridOptions = $dazzleElastic.gridOptions;
        //     console.log('Grid Options',$scope.gridOptions);
        //     if (angular.isArray($dazzleElastic.tableJson.buttons)) {
        //             for (var i = 0; i < $dazzleElastic.tableJson.buttons.length; i++) {
        //                 $scope.loadButton($dazzleElastic.tableJson.buttons[i]);
        //             }
        //         }
        //
        // });
        $scope.inited = true;


        $dazzleElastic.initGrid($routeParams.website,$routeParams.id);
        $scope.gridOptions = $dazzleElastic.gridOptions;
        console.log('Grid Options',$scope.gridOptions);
        console.log('Finish Init',$dazzleUser.dazzleInfo['tableJson']);

        // if (angular.isArray($dazzleUser.dazzleInfo['tableJson'].buttons)) {
        //         for (var i = 0; i < $dazzleUser.dazzleInfo['tableJson'].buttons.length; i++) {
        //             $scope.loadButton($dazzleUser.dazzleInfo['tableJson'].buttons[i]);
        //         }
        //     }


        $dazzleInit.loadWebsiteInfo().then(function(){

            $dazzleInit.loadDirectiveInfo();
            $scope.userBucket = $dazzleUser.getDazzleInfo('userBucket');
            $scope.websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
            $scope.thisTable = $scope.table;
            $dazzleUser.setDazzleInfo('thisTable',$scope.thisTable);
            //           $dazzleUser.setDazzleInfo('websiteId',$dazzleUser.dazzleInfo['website'].website);
            $dazzleUser.dazzleInfo['websiteId'] = $routeParams.website;
            $scope.websiteId = $dazzleUser.dazzleInfo['websiteId'];
            $scope.websiteId = $routeParams.website;

            // $dazzleFn.getUserTables($dazzleUser.getUser().uid, $routeParams.website).then(function (tables) {
            //     $scope.$apply(function () {
            //         $scope.websiteTable = $scope.websiteTable.concat(tables);
            //     });
            // });

            $scope.getUserTables().then(function(tables){
                $scope.$apply(function(){
                    console.log('User Tables',tables);
                    $scope.websiteTable = tables;
                });
            });
            console.log('Load Website Bucket',$scope.userBucket,$scope.websiteKey,$scope.thisTable,$dazzleUser.dazzleInfo['websiteId']);
            console.log('Website ID',$dazzleUser.dazzleInfo['websiteId']);

            $scope.inited = true;




            //$scope.refresh();
        });
    }

    $scope.getUserTables = function() {

        return new Promise(function (resolve, reject) {
            console.log('Load DynamoDB Data');
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
                    resolve([]);
                } else {
                    if (!Array.isArray(result.data.resolve))
                        resolve([result.data.resolve]);
                    else
                        resolve(result.data.resolve);
                }
            });

        });
    }


    console.log($dazzleUser.getDazzleInfo('thisTable'));
    $scope.lastUpdated = null;

    $scope.dbManage = function (table) {
        $dazzleElastic.dbManage(table);
    }

    $scope.listElastic = function (table) {
        $dazzleElastic.listElastic(table);
    }

    $scope.home = function (table) {
        $dazzleElastic.home(table);

    }

    $scope.loadButton = function (b) {
        $dazzleElastic.loadButton(b);
    }

    $scope.editSchema = function () {
        $dazzleElastic.editSchema();
    }

    $scope.addTable = function() {
        $dazzleElastic.addTable();
    }

    $scope.removeTable = function () {
        $dazzleElastic.removeTable();
    }

    $scope.loadTable = function (tableName) {
        $dazzleElastic.loadTable(tableName);
    }

    $scope.initTable = function () {
        $dazzleElastic.initTable();
    }


    $scope.loadData = function () {
        $dazzleElastic.loadData();
    };

    $scope.loadCell = function (schema) {
        $dazzleElastic.loadCell(schema);
    }

    $scope.setCellJs = function (schema) {
        $dazzleElastic.setCellJs(schema);
    }

    $scope.setCellFilterer = function (schema) {
        $dazzleElastic.setCellFilterer(schema);
    }

    $scope.setCellFilter = function (schema) {
        $dazzleElastic.setCellFilter(schema);
    }

    $scope.setCellEditor = function (schema) {
        $dazzleElastic.setCellEditor(schema);
    }

    $scope.setCellRenderer = function (schema) {
        $dazzleElastic.setCellRenderer(schema);
    }


    $scope.referAdd = function (object) {
        $dazzleElastic.referAdd(object);
    }

    $scope.addFilter = function (filter) {
        $dazzleElastic.addFilter(filter);
    }


    $scope.add = function(object) {
        $dazzleElastic.add(object);
    }


    $scope.addRecord = function(object) {
        $dazzleElastic.addRecord(object);
    }

    $scope.remove = function() {
        $dazzleElastic.remove();
    }

    $scope.refresh = function () {
        $dazzleElastic.refresh();
    }

    $scope.isFirstColumn = function (params) {
        $dazzleElastic.isFirstColumn(params);

    }
    $scope.cancel = function () {
        $mdDialog.hide($scope.lastUpdated);
    }
    $scope.save = function () {
        $dazzleElastic.save();
    }

    $scope.saveSchema = function () {
        $dazzleElastic.saveSchema();

    }
    $scope.saveData = function(data) {
        $dazzleElastic.saveData(data);
    }
    $scope.checkExist = function (tableJson,data) {
        $dazzleElastic.checkExist(tableJson,data);

    }

    $scope.bulkUpdateData = function (params) {
        $dazzleElastic.bulkUpdateData(params);
    }

    $scope.getData = function() {
        $dazzleElastic.getData();
    }


    $scope.export = function() {
        $dazzleElastic.export();
    }

    $scope.import = function () {
        if (!$scope.fileChooser) {
            $scope.fileChooser = document.createElement('input');
            $scope.fileChooser.setAttribute("type", "file");
            $scope.fileChooser.style.display = "none";
            $scope.fileChooser.addEventListener('change', function (event) {
                console.log('Change');
                var file = this.files[0];
                var tagField = [];
                for (var i = 0; i < $scope.schemaJson.length; i++) {
                    if ($scope.schemaJson[i].directive == 'tag') {
                        tagField.push($scope.schemaJson[i].field);
                    }
                }
                alasql('SELECT * FROM FILE(?,{headers:true})', [event], function (data) {
                    console.log('Import',data);


                    for (var i=0;i<data.length; i++) {
                        $scope.addRecord(data[i]);
                    }

                    // $scope.gridOptions.api.setRowData(data);
                    // $scope.gridOptions.api.refreshView();
                    // $scope.gridOptions.api.forEachNode(function (node) {
                    //  for (var i = 0; i < tagField.length; i++) {
                    //      if (node.data[tagField[i]] && !angular.isArray(node.data[tagField[i]])) {
                    //          node.data[tagField[i]] = node.data[tagField[i]].split(',');
                    //      }
                    //  }
                    //  node.edited = true;
                    // });
                });
            });
        }
        $scope.fileChooser.click();
    }
});


app.controller('myDbManageController', function ($scope, $window, $http, $compile, $uibModal, $mdDialog, $mdToast, $mdBottomSheet, $ocLazyLoad, $mdDateLocale,
                                                 $dazzleS3, $dazzlePopup, $dazzleUser,$dazzleData, $dazzleInit, $dazzleFn,$dazzleElastic, $routeParams,moment) {

    console.log('dataManagementPopupController');


    $scope.created = [];

//          $scope.$element = $element;
    $scope.$http = $http;
    $scope.$window = $window;
    $scope.$compile = $compile;
    $scope.$uibModal = $uibModal;
    $scope.$mdDialog = $mdDialog;
    $scope.$mdToast = $mdToast;
    $scope.$mdBottomSheet = $mdBottomSheet;
    $scope.$ocLazyLoad = $ocLazyLoad;
    $scope.$mdDateLocale = $mdDateLocale;
    $scope.$dazzleS3 = $dazzleS3;
    $scope.$dazzlePopup = $dazzlePopup;
    $scope.$dazzleUser = $dazzleUser;
    $scope.$dazzleData = $dazzleData;
    $scope.$dazzleInit = $dazzleInit;
    $scope.$dazzleFn = $dazzleFn;
    $scope.website = $dazzleUser.dazzleInfo['website'];
//          $scope.table = $dazzleUser.dazzleInfo['thisTable'];
    $dazzleUser.dazzleInfo['thisTable'] = $routeParams.id;
    $scope.table = $routeParams.id;
    $scope.isForm = false;
    $scope.editable = true;
    $scope.modelType = false;
    $dazzleUser.dazzleInfo['websiteId'] = $routeParams.website;
    $scope.websiteId = $routeParams.website;
    $scope.alasql = alasql;
    $scope.websiteTable=[];
    $scope.moment = moment;
    if (!$scope.user) {
        $scope.user = $dazzleUser.getUser();
    }

    $scope.getUserTables = function (userId, websiteId) {
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


    $scope.init = function () {
        $dazzleInit.loadWebsiteInfo().then(function(){
            $dazzleInit.loadDirectiveInfo();
            $scope.userBucket = $dazzleUser.getDazzleInfo('userBucket');
            $scope.websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
            $scope.thisTable = $scope.table;
            $dazzleUser.setDazzleInfo('thisTable',$scope.thisTable);
            //           $dazzleUser.setDazzleInfo('websiteId',$dazzleUser.dazzleInfo['website'].website);
            $dazzleUser.dazzleInfo['websiteId'] = $routeParams.website;
            $scope.websiteId = $dazzleUser.dazzleInfo['websiteId'];
            $scope.websiteId = $routeParams.website;
            $scope.getUserTables($dazzleUser.getUser().uid, $routeParams.website).then(function (tables) {
                $scope.$apply(function () {
                    $scope.websiteTable = $scope.websiteTable.concat(tables);
                });
            });
            console.log('Load Website Bucket',$scope.userBucket,$scope.websiteKey,$scope.thisTable,$dazzleUser.dazzleInfo['websiteId']);
            console.log('Website ID',$dazzleUser.dazzleInfo['websiteId']);
            //$scope.refresh();
        });
    }


    console.log($dazzleUser.getDazzleInfo('thisTable'));

    $scope.inited = false;
    //$scope.getWebsiteJson();f
    $scope.lastUpdated = null;
    $scope.gridOptions = {
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
            headerCheckboxSelection: $scope.isFirstColumn,
            checkboxSelection: $scope.isFirstColumn,
            editable: $scope.editable,
            cellEditor: "text",
            filter: 'text'
        },
        onSelectionChanged: function() {

            var selectedRows = $scope.gridOptions.api.getSelectedRows();

            $dazzleUser.dazzleInfo['selectedRows'] = selectedRows;
            console.log(selectedRows);

            // if (!angular.isUndefined($scope.tableJson.cellEditorParams.pageNameField)) {
            //
            //     var key = $scope.tableJson.cellEditorParams.pageNameField;
            //     console.log(selectedRows);
            //     $dazzleUser.dazzleInfo['isData']=true;
            //     $dazzleUser.dazzleInfo['singlePage'] = selectedRows[0][key];
            //     $dazzleInit.loadAtomInfo().then(function() {
            //     });
            // }
        },
        onGridReady: function () {
            $scope.loadTable().then(function (table) {
                console.log('Load Table',table);
                $scope.tableJson = table;
                if (angular.isArray($scope.tableJson.buttons)) {
                    for (var i = 0; i < $scope.tableJson.buttons.length; i++) {
                        $scope.loadButton($scope.tableJson.buttons[i]);
                    }
                }
                $scope.loadSchema().then(function (json) {
                    $scope.schemaJson = json;
                    console.log('Schema Json',$scope.schemaJson );
                    $scope.loadCell(json).then(function () {
                        if (!$scope.editable) {
                            angular.forEach(json, function (item, index) {
                                json[index].editable = false;
                            });
                        }
                        $scope.gridOptions.api.setColumnDefs(json);
                        $scope.gridOptions.api.refreshView();
                        $scope.loadData().then(function (json) {
                            $scope.gridOptions.api.setRowData(json);
                            $scope.gridOptions.api.refreshView();
                            $scope.inited = true;
                            console.log('Table:', $scope.tableJson);
                            console.log('Schema:', $scope.schemaJson);
                            console.log('Data:', json);
                            $scope.refresh();
                        });
                    });
                });
            });
        },
        onCellEditingStarted: function (event) {
            event.$scope.oldValue = event.value;
        },
        onCellEditingStopped: function (event) {
            if (!angular.isUndefined(event.colDef.key) && event.colDef.key) {
                $scope.gridOptions.api.forEachNode(function (rowNode, index) {
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
                $scope.gridOptions.api.getModel().rowsToDisplay[event.rowIndex].edited = true;
            }
        }
    }


    $scope.getWebsiteJson = function () {
        $dazzleS3.getJson("dazzle-user-" + $dazzleUser.getUser().uid, "website/" + $dazzleUser.dazzleInfo['websiteId'] + '/json/website.json').then(function (json) {
            $scope.websiteJson = json;
        });
    }

    $scope.dbManage = function (table) {
        //    $dazzlePopup.dataManagement(website.websiteId, table);
        document.location.href = "index.html#!/myDbManage/"+$dazzleUser.dazzleInfo['websiteId']+"/"+table;
    }

    $scope.listElastic = function (table) {
        //    $dazzlePopup.dataManagement(website.websiteId, table);
        document.location.href = "index.html#!/listElastic/"+$dazzleUser.dazzleInfo['websiteId']+"/"+table;
    }

    $scope.home = function (table) {
        //    $dazzlePopup.dataManagement(website.websiteId, table);
        document.location.href = "index.html#!/myWebsite";
    }

    $scope.loadButton = function (b) {
        console.log('BUtton',b);
        $ocLazyLoad.load({files: b.js, cache: false}).then(function () {
            console.log('Button HTML',b.html);
            var button = angular.element(b.html);
            angular.element('#customButtons').append(button);
            $compile(button)($scope);
        });
    }


    $scope.editSchema = function () {
        console.log('Edit schema');
        $dazzlePopup.schema($dazzleUser.dazzleInfo['websiteId'], $scope.table, false).then(function (newSchema) {
            $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, 'website/' + $dazzleUser.dazzleInfo['websiteId'] + '/' + "content/" + $scope.table + "-schema.json", JSON.parse(angular.toJson(newSchema)));
            $scope.schemaJson = newSchema;
            $scope.loadCell(newSchema).then(function () {
                $scope.gridOptions.api.setColumnDefs(newSchema);
                $scope.gridOptions.api.refreshView();
            });
        });
    }

    $scope.addTable = function() {
        var params = {
            name: "createTablePopup",
            directive:"<create-table-popup></create-table-popup>",
            big:true
        };

        $dazzlePopup.callPopup(params).then(function(output) {

        });


    }

    $scope.removeTable = function() {
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

    $scope.loadTable = function () {
        return new Promise(function (resolve, reject) {
            console.log('Get','dazzle-user-' + $dazzleUser.getUser().uid+'/website/' + $routeParams.website + '/' + "content/" + $scope.table + "-table.json");

            $dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid,'website/' + $routeParams.website + '/' + "content/" + $scope.table + "-table.json").then(function (json) {
                if (json.data && json.data.type && json.data.type === 'dynamodb') {
                    if (json.data.table && json.data.key) {

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
                    $scope.initTable().then(function (t) {
                        resolve(t);
                    })
                }
            }, function () {
                // $scope.initTable().then(function (t) {
                //     resolve(t);
                // });
                $dazzlePopup.toast('不能讀取'+$scope.table);
                console.log('dazzle-user-' + $dazzleUser.getUser().uid+'/website/' + $routeParams.website + '/' + "content/" + $scope.table + "-table.json");
                $scope.cancel();
                //reject();
            });
        });
    }

    $scope.initTable = function () {
        return new Promise(function (resolve, reject) {
            $dazzlePopup.toast('正在初始化s3 Table:' + $scope.table);
            var table = {
                "data": {
                    "type": "s3"
                },
                "buttons": []
            }
            $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" +$dazzleUser.dazzleInfo['websiteId'] + "/content/" + $scope.table + "-table.json", table);
            resolve(table);
        });
    }

    $scope.checkDynamoTable = function (table) {
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

    $scope.loadSchema = function () {
        console.log('Load Schema','dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $dazzleUser.dazzleInfo['websiteId'] + "/content/" + $scope.table + "-schema.json");
        return new Promise(function (resolve, reject) {
            $dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $dazzleUser.dazzleInfo['websiteId'] + "/content/" + $scope.table + "-schema.json").then(function (json) {
                console.log('My Schema',json);
                resolve(json);
            }, function () {
                //$dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $dazzleUser.dazzleInfo['websiteId'] + "/content/" + $scope.table + "-schema.json", []);
                resolve([]);
            });
        });
    };

    $scope.loadData = function () {
        return new Promise(function (resolve, reject) {
            if ($scope.tableJson.data.type === 's3') {
                console.log('Load S3 Data');
                $dazzleS3.getJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $dazzleUser.dazzleInfo['websiteId'] + "/content/" + $scope.table + "-data.json").then(function (json) {
                    $scope.dataLength = json.length;
                    console.log('S3 data',json);
                    resolve(json);
                }, function () {
                    //  $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $dazzleUser.dazzleInfo['websiteId'] + "/content/" + $scope.table + "-data.json", []);
                    resolve([]);
                });
            } else if ($scope.tableJson.data.type === 'dynamodb') {
                console.log('Schema JSON',$scope.schemaJson);
                var field = [];
                angular.forEach($scope.schemaJson,function(item,index){
                   field.push(item.field);
                });
                console.log('Schema JSON',field);
                var query = {
                    "action": "searchData",
                    "index": $scope.tableJson.data.index || "dazzle",
                    "type": $scope.tableJson.data.table,
                    "body": {"query": {"match_all": {}}},
                    "_source":field,
                    "from":0,
                    "size":2000
                };
                console.log('Load DynamoDB Data',query);
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": query
                }).then(function (result) {
                    console.log(result);
                    if (result.data.code < 0) {
                        $dazzlePopup.toast(result.data.text + ":" + result.data.reject.msg);
                        resolve([]);
                    } else {
                        $scope.dataLength = result.data.resolve.length;
                        resolve(result.data.resolve);
                    }
                });
            } else {
                $dazzlePopup.toast("未知數據來源");
                resolve([]);
            }
        });
    };

    $scope.loadCell = function (schema) {
        return new Promise(function (resolve, reject) {
            for (var i = 0; i < schema.length; i++) {
                if (!angular.isUndefined(schema[i].jsId)) {
                    $scope.setCellJs(schema[i]);
                }
                if (!angular.isUndefined(schema[i].cellEditor)) {
                    $scope.setCellEditor(schema[i]);
                }
                if (!angular.isUndefined(schema[i].cellRenderer)) {
                    $scope.setCellRenderer(schema[i]);
                }
                if (!angular.isUndefined(schema[i].cellFilter)) {
                    $scope.setCellFilter(schema[i]);
                }
                if (!angular.isUndefined(schema[i].cellFilterer)) {
                    $scope.setCellFilterer(schema[i]);
                }
            }
            setTimeout(function () {
                resolve();
            }, 1000);
        });
    }

    $scope.setCellJs = function (schema) {
        $ocLazyLoad.load("https://dazzle-template.s3.amazonaws.com/backend6.0/" + schema.directive + "/js/" + schema.jsId + '.js', {cache: false});
    }

    $scope.setCellFilterer = function (schema) {
        $ocLazyLoad.load("https://dazzle-template.s3.amazonaws.com/backend6.0/" + schema.directive + "/" + schema.cellFilterer + ".js", {cache: false}).then(function () {
            schema.filter = window[schema.cellFilterer];
        });
    }

    $scope.setCellFilter = function (schema) {
        $ocLazyLoad.load("https://dazzle-template.s3.amazonaws.com/backend6.0/" + schema.directive + "/" + schema.cellFilter + ".js", {cache: false}).then(function () {
            schema.filterParams = window[schema.cellFilter];
        });
    }

    $scope.setCellEditor = function (schema) {
        $ocLazyLoad.load("https://dazzle-template.s3.amazonaws.com/backend6.0/" + schema.directive + "/" + schema.cellEditor + ".js", {cache: false}).then(function () {
            $scope.gridOptions.api.cellEditorFactory.addCellEditor(schema.cellEditor, window[schema.cellEditor]);
        });
    }

    $scope.setCellRenderer = function (schema) {
        $ocLazyLoad.load("https://dazzle-template.s3.amazonaws.com/backend6.0/" + schema.directive + "/" + schema.cellRenderer + ".js", {cache: false}).then(function () {
            $scope.gridOptions.api.cellRendererFactory.addCellRenderer(schema.cellRenderer, window[schema.cellRenderer]);
        });
    }

    $scope.add = function (object) {
        if ($scope.modelType == "refer") {
            $dazzlePopup.dataSelect($scope.website, $scope.table);
        } else {
            var date = new Date().getTime().toString();
            var newObject = {};
            if (object) {
                newObject = object;
            }
            if ($scope.tableJson.data.type === 'dynamodb') {
                newObject[$scope.tableJson.data.key] = date;
            }
            for (var i = 0; i < $scope.schemaJson.length; i++) {
                if ($scope.schemaJson[i].defaultByTimestamp) {
                    newObject[$scope.schemaJson[i].field] = $scope.schemaJson[i].default + date;
                } else if ($scope.schemaJson[i].default) {
                    newObject[$scope.schemaJson[i].field] = $scope.schemaJson[i].default;
                }
            }
            $scope.gridOptions.api.updateRowData({add: [newObject], addIndex: 0});
            $scope.dataLength++;
            $scope.gridOptions.api.refreshInMemoryRowModel();
            $scope.gridOptions.api.getModel().rowsToDisplay[0].edited = true;
        }

    }
    $scope.addRecord = function (object) {
        var date = new Date().getTime().toString();

        var newObject = {};
        if (object) {
            newObject = object;
        }

        for (var i = 0; i < $scope.schemaJson.length; i++) {
            if ($scope.schemaJson[i].defaultByTimestamp) {
                newObject[$scope.schemaJson[i].field] = date;
            }
            // else if ($scope.schemaJson[i].default) {
            //     newObject[$scope.schemaJson[i].field] = $scope.schemaJson[i].default;
            // }

        }
        $scope.gridOptions.api.updateRowData({add: [newObject], addIndex: 0});
        $scope.dataLength++;
        $scope.gridOptions.api.refreshInMemoryRowModel();
        $scope.gridOptions.api.getModel().rowsToDisplay[0].edited = true;
    }


    $scope.remove = function () {
        var nodes = $scope.gridOptions.api.getSelectedNodes();
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].deleted = true;
        }
        $scope.gridOptions.api.onFilterChanged();
    }

    $scope.refresh = function () {
//                $scope.loadSchema().then(function (json) {
        //                   $scope.schemaJson = json;
        console.log('Start refresh',$scope.schemaJson);
        $scope.loadCell($scope.schemaJson).then(function () {
            console.log('Load Cell',$scope.schemaJson);
            $scope.gridOptions.api.setColumnDefs($scope.schemaJson);
            $scope.loadData().then(function (json) {
                $scope.gridOptions.api.setRowData(json);
                $scope.gridOptions.api.refreshView();
                console.log('Finish Refresh');
            });
        });

        //               });
    }

    $scope.isFirstColumn = function (params) {
        var displayedColumns = params.columnApi.getAllDisplayedColumns();
        var thisIsFirstColumn = displayedColumns[0] === params.column;
        return thisIsFirstColumn;
    }

    $scope.cancel = function () {
        $mdDialog.hide($scope.lastUpdated);
    }

    $scope.save = function () {
        return new Promise(function (resolve, reject) {
            $scope.saveSchema();
            $scope.getData().then(function (result) {
                $scope.saveData(result).then(function () {
                    $dazzlePopup.toast('儲存成功');
                    resolve(result);
                });
            });
        });
    }

    $scope.saveSchema = function () {
        var newShcema = [];
        var oldSchema = $scope.gridOptions.columnApi.getAllGridColumns();
        for (var i = 0; i < oldSchema.length; i++) {
            oldSchema[i].colDef.width = oldSchema[i].actualWidth;
            for (var obj in oldSchema[i].colDef) {
                if (obj !== 'headerCheckboxSelection' && obj !== 'checkboxSelection' && Object.prototype.toString.call(oldSchema[i].colDef[obj]) == '[object Function]') {
                    delete oldSchema[i].colDef[obj];
                }
            }
            newShcema.push(oldSchema[i].colDef);
        }
        $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $dazzleUser.dazzleInfo['websiteId'] + "/content/" + $scope.table + "-schema.json", JSON.parse(angular.toJson(newShcema)));
        $scope.schemaJson = newShcema;
    }

    $scope.saveData = function (data) {
        return new Promise(function (resolve, reject) {
            console.log('DB Data',data);
            console.log($scope.tableJson);
            if ($scope.tableJson.data.type === 's3') {
                //console.log('save to s3');
                $scope.gridOptions.api.removeItems(data.deleted);
                $dazzleS3.saveJson('dazzle-user-' + $dazzleUser.getUser().uid, "website/" + $dazzleUser.dazzleInfo['websiteId'] + "/content/" + $scope.table + "-data.json", JSON.parse(angular.toJson(data.rows))).then(function () {
                    resolve();
                });
            } else if ($scope.tableJson.data.type === 'dynamodb') {
                var params = [];
                for (var i = 0; i < data.deleted.length; i++) {
                    var dataObject = JSON.parse(angular.toJson(data.deleted[i].data));
                    delete dataObject._id;
                    params.push({
                        "delete": {
                            _index: $scope.tableJson.data.index+'.'+$scope.tableJson.data.table.toLowerCase() || 'dazzle',
                            _type: '_doc',
                            _id: dataObject[$scope.tableJson.data.key]
                        }
                    });
                }
                console.log(params);
                if (!data.edited.length){
                    $scope.bulkUpdateData(params).then(function(){
                        resolve();
                    },function(err){
                        reject();
                    });
                }
                var count = 0;
                for (var i = 0; i < data.edited.length; i++) {

                    console.log($scope.tableJson);


                    var dataObject = JSON.parse(angular.toJson(data.edited[i].data));
                    delete dataObject._id;
                    $scope.clean(dataObject);

                    $scope.checkExist($scope.tableJson.data,dataObject).then(function(result){
                        
                        params.push({
                            "update": {
                                _index: $scope.tableJson.data.index+'.'+$scope.tableJson.data.table.toLowerCase() || 'dazzle',
                                _type: '_doc',
                                _id: result[$scope.tableJson.data.key]
                            }
                        });
                        params.push({
                            "doc": result
                        });
                        count++;
                        if(count == data.edited.length){
                            $scope.bulkUpdateData(params).then(function(){
                                resolve();
                            },function(err){
                                reject();
                            });
                        }
                    },function(err){
                        params.push({
                            "create": {
                                _index: $scope.tableJson.data.index+'.'+$scope.tableJson.data.table.toLowerCase() || 'dazzle',
                                _type: '_doc',
                                _id: err[$scope.tableJson.data.key]
                            }
                        });
                        params.push(err);
                        count++;
                        if(count == data.edited.length){
                            $scope.bulkUpdateData(params).then(function(){
                                resolve();
                            },function(err){
                                reject();
                            });
                        }
                    });
                    //                     $dazzleData.loadElasticRecordById($scope.tableJson.data.index,$scope.tableJson.data.table,dataObject[$scope.tableJson.data.key]).then(function(record){
                    //                             params.push({
                    //                                 "update": {
                    //                                     _index: $scope.tableJson.data.index || 'dazzle',
                    //                                     _type: $scope.tableJson.data.table,
                    //                                     _id: dataObject[$scope.tableJson.data.key]
                    //                                 }
                    //                             });
                    //                             params.push({
                    //                                 "doc": dataObject
                    //                             });
                    //                             count++;
                    //                             console.log(i,' found');
                    //                             if(count == data.edited.length)
                    //                                 $scope.bulkUpdateData(params).then(function(){
                    //                                     resolve();
                    //                                 },function(err){
                    //                                     reject();
                    //                                 });
                    //                     },function(err){
                    //                             params.push({
                    //                                 "create": {
                    //                                     _index: $scope.tableJson.data.index || 'dazzle',
                    //                                     _type: $scope.tableJson.data.table,
                    //                                     _id: dataObject[$scope.tableJson.data.key]
                    //                                 }
                    //                             });
                    //                             params.push(dataObject);
                    //                             count++;
                    //                             console.log(i,' not found');

                    // //                            console.log(dataObject[$scope.tableJson.data.key],' not found');
                    //                             if(count == data.edited.length)
                    //                                 $scope.bulkUpdateData(params).then(function(){
                    //                                     resolve();
                    //                                 },function(err){
                    //                                     reject();
                    //                                 });
                    //                     });


                }

            }
        })
    }

    // $scope.checkExist = function(tableJson,data) {
    //
    //     return new Promise(function (resolve, reject) {
    //         $dazzleData.loadElasticRecordById(tableJson.index,tableJson.table,data[tableJson.key]).then(function(record){
    //             resolve(data);
    //         },function(err){
    //             reject(data);
    //         });
    //     });
    // }

    $scope.checkExist = function (tableJson,data) {
        return new Promise(function (resolve, reject) {
            $dazzleElastic.loadElasticRecordById(tableJson.index,tableJson.table,data[tableJson.key]).then(function(record){
                resolve(data);
            },function(err){
                reject(data);
            });
        });

    }
    $scope.bulkUpdateData=function(params){
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
                $scope.created = [];
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

    $scope.getData = function () {
        return new Promise(function (resolve, reject) {
            var nodes = [];
            var rows = [];
            var edited = [];
            var deleted = [];
            $scope.gridOptions.api.forEachNode(function (node) {
                //console.log('Node', node);
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

    $scope.import = function () {
        if (!$scope.fileChooser) {
            $scope.fileChooser = document.createElement('input');
            $scope.fileChooser.setAttribute("type", "file");
            $scope.fileChooser.style.display = "none";
            $scope.fileChooser.addEventListener('change', function (event) {
                console.log('Change');
                var file = this.files[0];
                var tagField = [];
                for (var i = 0; i < $scope.schemaJson.length; i++) {
                    if ($scope.schemaJson[i].directive == 'tag') {
                        tagField.push($scope.schemaJson[i].field);
                    }
                }
                alasql('SELECT * FROM FILE(?,{headers:true})', [event], function (data) {
                    console.log('Import',data);


                    for (var i=0;i<data.length; i++) {
                        $scope.addRecord(data[i]);
                    }

                    // $scope.gridOptions.api.setRowData(data);
                    // $scope.gridOptions.api.refreshView();
                    // $scope.gridOptions.api.forEachNode(function (node) {
                    //  for (var i = 0; i < tagField.length; i++) {
                    //      if (node.data[tagField[i]] && !angular.isArray(node.data[tagField[i]])) {
                    //          node.data[tagField[i]] = node.data[tagField[i]].split(',');
                    //      }
                    //  }
                    //  node.edited = true;
                    // });
                });
            });
        }
        $scope.fileChooser.click();
    }

    $scope.export = function () {
        var rowData = [];
        $scope.gridOptions.api.forEachNode(function (node) {
            rowData.push(node.data);
        });
        alasql('SELECT * INTO XLSX("' + $scope.table + '.xlsx",{headers:true}) FROM ?', [rowData]);
    }

    $scope.isObject = function (item) {
        return (typeof item === "object" && !Array.isArray(item) && item !== null);
    }

    $scope.clean = function (obj) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
                delete obj[propName];
            }
        }
    }

});


app.controller('myVideosController', function ($scope, $http, $filter, $mdDialog, $mdBottomSheet, $mdToast) {
    console.log("vvvv vvvv 9");
    var QueryString = function () {
        // This function is anonymous, is executed immediately and
        // the return value is assigned to QueryString!
        var query_string = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = decodeURIComponent(pair[1]);
                // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                query_string[pair[0]] = arr;
                // If third or later entry with this name
            } else {
                query_string[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }

        return query_string;
    }();
    console.log(QueryString);
    console.log("vvvv qs type whyyyy2");
    $scope.eachShowNum = 500;


    $scope.init = function () {
        //$scope.$apply(function(){
        $scope.type = "Video";
        $scope.allNewArray = [];
        $scope.deleting = false;
        $scope.loading = true;
        $scope.end = false;
        $scope.tags = [];
        $scope.selected = [];
        $scope.selecting = false;
        $scope.deletedURL = [];
        $scope.selectedTags = [];
        $scope.LastEvaluatedKey = null;
        $scope.websitesAngularGridOptions = {
            gridWidth: 200,
            gutterSize: 4,
            infiniteScrollDelay: 1000,
            infiniteScrollDistance: 95,
            scrollContainer: '#sidecontent'
        }
        $scope.inited = false;
        $scope.websites = [];
        //});\
        console.log('myPhotosController');
        console.log($scope.user.uid);
        console.log(AWS.config);
        var s3 = new AWS.S3();
        var params = {
            Bucket: "designerrrr-output",
            /* required */
            Prefix: $scope.px
        };
        s3.listObjects(params, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else {
                console.log("listObj");
                console.log(data);
                data.Contents = data.Contents.reverse();
                $scope.data = data;
                $scope.getTags().then(function (result) {
                    $scope.tags = result.data;
                });
                $scope.getWebsites($scope.eachShowNum, 0).then(function (anArray) {
                    $scope.$apply(function () {
                        $scope.inited = true;
                        $scope.loading = false;
                        $scope.websites = $scope.websites.concat(anArray);
                        $scope.LastEvaluatedKey = $scope.eachShowNum;
                        console.log("vvvv $scope.websites");
                        console.log($scope.websites);
                    });
                });
            }
        });
    }
    $scope.tagClicked = function (tag) {
        console.log("vvvv tc1");
        $scope.selectedTags = [];
        $scope.selectedTags.push(tag);
        $scope.tagsChanged();
    }
    $scope.tagsChanged = function () {
        console.log("vvvv tc2");
        $scope.loading = true;
        $scope.end = false;
        $scope.LastEvaluatedKey = null;
        $scope.websites = [];
        if ($scope.selectedTags.length <= 0) {
            $scope.getWebsites($scope.eachShowNum, 0).then(function (anArray) {
                $scope.$apply(function () {
                    $scope.loading = false;
                    anArray = $scope.allNewArray.concat(anArray);
                    $scope.websites = $scope.websites.concat(anArray);
                    $scope.LastEvaluatedKey = $scope.eachShowNum;
                });
            });
        } else {
            var uniArray = [];
            var done = [];
            for (var i = 0; i < $scope.selectedTags.length; i++) {
                $scope.getWebsitesByTag($scope.selectedTags[i]).then(function (anArray) {
                    $scope.$apply(function () {
                        uniArray = uniArray.concat(anArray);
                        done.push({});
                        if (done.length == $scope.selectedTags.length) {
                            uniArray = uniArray.filter(function (elem, pos) {
                                return uniArray.indexOf(elem) == pos;
                            });
                            $scope.websites = $scope.websites.concat(uniArray);
                            console.log($scope.websites);
                        }
                    });
                });
            }
            $scope.loading = false;
            $scope.end = true;
        }
    }
    $scope.queryTags = function (query) {
        console.log(query);
        return $filter('filter')(angular.lowercase($scope.tags), angular.lowercase(query));
    }
    $scope.getTags = function () {
        return new Promise(function (resolve, reject) {
            var data = {};
            data.userName = $scope.user.uid;
            data.type = $scope.type;
            console.log("vvvv whyyyyyy 323232");
            console.log($scope.user.uid);
            $http({
                "method": "post",
                "url": "https://9g1gx9kfdc.execute-api.ap-northeast-1.amazonaws.com/dazzlegallery/gettags",
                "data": data
            }).then(function (result) {
                console.log("vvvv getTag");
                console.log(result);
                if (result.data.code > 0) {
                    resolve(result.data);
                } else {
                    reject(result.data.text);
                }
            })
        })
    }
    $scope.getWebsitesByTag = function (tag) {
        return new Promise(function (resolve, reject) {
            $http({
                "method": "post",
                "url": "https://9g1gx9kfdc.execute-api.ap-northeast-1.amazonaws.com/dazzlegallery/getid",
                "data": {
                    "tag": tag,
                    "action": "bytag",
                    "owner_id": $scope.user.uid,
                    "type": $scope.type
                }
            }).then(function (result) {
                console.log(result);
                if (result.data.code > 0) {
                    var s3 = new AWS.S3();
                    var anArray = [];
                    for (i = 0; i < result.data.data.length; i++) {
                        var theID = result.data.data[i].gid;
                        switch ($scope.type) {
                            case "相片":
                                console.log("vvvv 相片 2");
                                var theLink = "images/" + $scope.user.uid + "/medium-web/" + theID + ".jpg"
                                break;
                            case "插畫":
                                console.log("vvvv 插畫 2");
                                var theLink = "illustration/" + $scope.user.uid + "/png/" + theID + ".png"
                                break;
                        }
                        var params = {
                            Bucket: "designerrrr-output",
                            Key: theLink
                        };
                        var url = s3.getSignedUrl('getObject', params);
                        anArray[i] = url;
                    }
                    console.log(anArray);
                    resolve(anArray);
                } else {
                    resolve([]);
                }
            });
        });
    }
    $scope.loadMore = function () {
        console.log("loadMore");
        if (!$scope.end && !$scope.loading) {
            $scope.loading = true;
            $scope.getWebsites($scope.eachShowNum, $scope.LastEvaluatedKey).then(function (anArray) {
                $scope.loading = false;
                if (anArray.length > 0) {
                    $scope.websites = $scope.websites.concat(anArray);
                    $scope.LastEvaluatedKey = $scope.LastEvaluatedKey + $scope.eachShowNum;
                } else {
                    $scope.end = true;
                }
            });
        }
    }
    $scope.getWebsites = function (limit, key) {
        return new Promise(function (resolve, reject) {
            console.log("getWebsites");
            var data = $scope.data;
            console.log(data);
            var anArray = [];
            var counter = 0;
            var s3 = new AWS.S3();
            if ($scope.LastEvaluatedKey < data.Contents.length && data.Contents.length - $scope.LastEvaluatedKey < $scope.eachShowNum) { //show photo when unshow photo less than 50
                console.log("if");
                for (i = (0 + key); i < data.Contents.length; i++) {
                    var checkID = data.Contents[i].Key.substring(data.Contents[i].Key.lastIndexOf("/") + 1).replace($scope.nowType, "");
                    var notLoad = false;
                    for (j = 0; j < $scope.deletedURL.length; j++) {
                        if ($scope.deletedURL[j] == checkID) {
                            notLoad = true;
                        }
                    }
                    if (notLoad) {
                        //found a invalid url
                    } else {
                        var params = {
                            Bucket: "designerrrr-output",
                            Key: data.Contents[i].Key
                        };
                        var url = s3.getSignedUrl('getObject', params);
                        anArray[counter] = url;
                        counter++;
                    }
                }
                if ($scope.data.Contents.length <= $scope.eachShowNum) {
                    console.log("endFirst");
                    $scope.end = true;
                }
                console.log(anArray);
                resolve(anArray);
            } else if ($scope.LastEvaluatedKey < data.Contents.length) {
                console.log("else if");
                for (i = (0 + key); i < (limit + key); i++) {
                    console.log("vvvv for");
                    console.log(data.Contents[i]);
                    console.log(data.Contents[i].Key);
                    var checkID = data.Contents[i].Key.substring(data.Contents[i].Key.lastIndexOf("/") + 1).replace($scope.nowType, "");
                    console.log("vvvv checkID");
                    console.log(checkID);
                    var notLoad = false;
                    for (j = 0; j < $scope.deletedURL.length; j++) {
                        if ($scope.deletedURL[j] == checkID) {
                            notLoad = true;
                        }
                    }
                    if (notLoad) {
                        console.log("dead img found");
                    } else {
                        console.log("dead img else");
                        var params = {
                            Bucket: "designerrrr-output",
                            Key: data.Contents[i].Key
                        };
                        var url = s3.getSignedUrl('getObject', params);
                        anArray[counter] = url;
                        counter++;
                    }
                }
                console.log(anArray);
                resolve(anArray);
            } else {
                if ($scope.websites.length == 0) {
                    console.log("vvvv first 0");
                    $scope.inited = true;
                    $scope.loading = false;
                    $scope.LastEvaluatedKey = 0;
                }
                $scope.end = true;
                console.log("reject");
                reject("end");
            }
        });
    }
    $scope.getImage = function (key) {
        var s3 = new AWS.S3();
        var params = {
            Bucket: "designerrrr-output",
            Key: key
        };
        var url = s3.getSignedUrl('getObject', params);
        console.log(url);
        return url;
    }
    //For toast popup use
    var last = {
        bottom: true,
        top: false,
        left: false,
        right: true
    };
    $scope.toastPosition = angular.extend({}, last);
    $scope.getToastPosition = function () {
        sanitizePosition();
        return Object.keys($scope.toastPosition).filter(function (pos) {
            return $scope.toastPosition[pos];
        }).join(' ');
    };

    function sanitizePosition() {
        var current = $scope.toastPosition;
        if (current.bottom && last.top) current.top = false;
        if (current.top && last.bottom) current.bottom = false;
        if (current.right && last.left) current.left = false;
        if (current.left && last.right) current.right = false;
        last = angular.extend({}, current);
    }

    // /For toast popup use
    $scope.showPhoto = function (website, index) {
        //尋日做到show photo,要改show photo.js showPhoto.html d type 同 url2017 7 26
        console.log(index);
        //console.log($scope.websites[index]);
        $mdDialog.show({
            controller: "showPhotoController",
            templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/showPhoto.html',
            escapeToClose: false,
            clickOutsideToClose: false,
            locals: {
                website: website,
                rootScope: $scope,
                bought: false,
                sold: false
            }
        }).then(function (objj) {
            console.log("vvvv showPhoto then");
            console.log(objj);
            if (objj.tORf) {
                var confirm = $mdDialog.confirm().title('刪除圖片').textContent('你真的要刪除此圖片嗎?').ariaLabel('Lucky day').ok('刪除').cancel('取消');
                $mdDialog.show(confirm).then(function () {
                    $scope.selected = [];
                    $scope.deleting = true;
                    var delID = $scope.websites[index].substring(0, $scope.websites[index].indexOf($scope.nowType + "?AWSAccessKeyId")).replace($scope.nowType + "?AWSAccessKeyId", "");
                    console.log(delID);
                    delID = delID.substring(delID.lastIndexOf("/") + 1);
                    console.log(delID);
                    $scope.deletedURL.push(delID);
                    console.log("vvvv dellll");
                    console.log($scope.deletedURL);
                    //This part is for a special case that user delete the photo just upload in same page
                    for (i = 0; i < $scope.allNewArray.length; i++) {
                        console.log($scope.allNewArray[i]);
                        console.log($scope.websites[index]);
                        if ($scope.allNewArray[i] === $scope.websites[index]) {
                            console.log("same!");
                            $scope.allNewArray.splice(i, 1);
                        }
                    }
                    //This part is for arrange the pictures after delete.
                    $scope.websites.splice(index, 1);
                    setTimeout(function () {
                        var temp = $scope.websites.length;
                        console.log("vvvv thennnn7");
                        $scope.temp = temp;
                        $scope.websites = $scope.websites.concat(["https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png"]);
                    }, 1500);
                    setTimeout(function () {
                        console.log("vvvv 2000 thennnn7");
                        $scope.websites.splice($scope.temp, 1);
                        $scope.deleting = false;
                    }, 4000);
                    // /This part is for arrange the pictures after delete.
                    var url = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
                    var params = {
                        "operation": "delete",
                        "accessKeyId": "sdasda",
                        "secretAccessKey": "asdsa",
                        "sessionToken": "vhndi757Bydd",
                        "TableName": "dazzle-gallery",
                        "Key": {
                            "gid": objj.id
                        }
                    }
                    $http.post(url, params).then(function (result) {
                        console.log("deleted");
                        console.log(result);
                        var pinTo = $scope.getToastPosition();
                        $scope.getTags().then(function (result) {
                            $scope.tags = result.data;
                        });
                        $mdToast.show($mdToast.simple().textContent('已刪除').position(pinTo).hideDelay(3000));
                    });
                    var s3 = new AWS.S3();
                    switch ($scope.type) {
                        case "相片":
                            console.log("vvvv 相片 3");
                            var diffObj = [{
                                Key: "images/" + $scope.user.uid + "/large/" + objj.id + ".jpg"
                            }, {
                                Key: "images/" + $scope.user.uid + "/large-web/" + objj.id + ".jpg"
                            }, {
                                Key: "images/" + $scope.user.uid + "/medium/" + objj.id + ".jpg"
                            }, {
                                Key: "images/" + $scope.user.uid + "/medium-web/" + objj.id + ".jpg"
                            }, {
                                Key: "images/" + $scope.user.uid + "/small/" + objj.id + ".jpg"
                            }, {
                                Key: "images/" + $scope.user.uid + "/small-web/" + objj.id + ".jpg"
                            }, {
                                Key: "images/" + $scope.user.uid + "/thumbnail/" + objj.id + ".jpg"
                            }, {
                                Key: "images/" + $scope.user.uid + "/thumbnail-web/" + objj.id + ".jpg"
                            }, {
                                Key: "images/" + $scope.user.uid + "/original/" + objj.id + objj.type
                            }];
                            break;
                        case "插畫":
                            console.log("vvvv 插畫 3");
                            var diffObj = [{
                                Key: "illustration/" + $scope.user.uid + "/eps/" + objj.id + ".eps"
                            }, {
                                Key: "illustration/" + $scope.user.uid + "/svg/" + objj.id + ".svg"
                            }, {
                                Key: "illustration/" + $scope.user.uid + "/png/" + objj.id + ".png"
                            }];
                            break;
                    }

                    var paramsDel = {
                        Bucket: "designerrrr-output",
                        Delete: {
                            Objects: diffObj,
                            Quiet: false
                        }
                    };
                    s3.deleteObjects(paramsDel, function (err, data) {
                        if (err) {
                            console.log("s3 fail");
                            console.log(err);
                        } else {
                            console.log("delete from s3 successful");
                            console.log(data);
                            console.log($scope.websites);
                            //$scope.init();
                            /*for(i=0;i<$scope.websites.length;i++){
                                    if($scope.websites[i].indexOf(objj.id)!=-1){
                                        console.log("splice ok");
                                        $scope.websites.splice(i,1);
                                    }
                                }
                                console.log($scope.websites);*/
                        }
                    });
                }, function () {
                });
            }
        });
    }
    $scope.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
            list.splice(idx, 1);
        } else {
            list.push(item);
        }
    };
    $scope.toggleAll = function (item) {
        if ($scope.selected.length === $scope.websites.length) {
            $scope.selected = [];
        } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
            $scope.selected = $scope.websites.slice(0);
        }
    }
    $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };
    $scope.select = function () {
        $scope.selecting = true;
    }
    $scope.selectCancel = function () {
        $scope.selected = [];
        $scope.selecting = false;
    }
    $scope.deleteAll = function (website) {
        var allID = [];
        console.log($scope.selected);
        for (i = 0; i < $scope.selected.length; i++) {
            allID[i] = $scope.selected[i].substring(0, $scope.selected[i].indexOf("?AWSAccessKeyId")).substring($scope.selected[i].lastIndexOf("/") + 1).replace($scope.nowType, "");
        }
        console.log(allID);
        var confirm = $mdDialog.confirm().title('刪除圖片').textContent('你真的要刪除' + $scope.selected.length + '張圖片嗎?').ariaLabel('Lucky day').ok('刪除').cancel('取消');
        $mdDialog.show(confirm).then(function () {
            $scope.deleteAllPhoto();
            $scope.deleteAllData();
        });
    }
    $scope.upload = function () {
        console.log("vvvv upload");
        console.log($scope.user);
        $scope.alert = '';
        $mdBottomSheet.show({
            templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/uploadVideo.html',
            controller: 'uploadController',
            clickOutsideToClose: false,
            disableParentScroll: false,
            locals: {
                bucket: "designerrrr-output",
                key: $scope.px,
                rootScope: $scope
            }
        }).then(function () {
            /*
                $scope.getTags().then(function(result) {
                    $scope.tags = result.data;
                });
                console.log("vvvv then");
                console.log(uploadedFiles);
                var newItemArray = [];
                console.log("vvvv md dialog");
                if (uploadedFiles.length != 0) {
                    for (i = 0; i < uploadedFiles.length; i++) {
                        newItemArray[i] = $scope.getImage(uploadedFiles[i].path);
                    }
                    console.log(newItemArray);
                    if ($scope.allNewArray.length == 0) {
                        $scope.allNewArray = newItemArray;
                    } else {
                        $scope.allNewArray = newItemArray.concat($scope.allNewArray);
                    }
                    $scope.websites = newItemArray.concat($scope.websites);
                }*/
            //$scope.websites.concat(uploadedFiles);
        }).catch(function (error) {
            // User clicked outside or hit escape
        });
    };
    $scope.uploadWatermark = function () {
        console.log("vvvv uploadWatermark");
        console.log($scope.user);
        $scope.alert = '';
        $mdBottomSheet.show({
            templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/uploadWatermark.html',
            controller: 'uploadWatermarkController',
            clickOutsideToClose: false,
            disableParentScroll: false,
            locals: {
                bucket: "designerrrr",
                key: $scope.px,
                rootScope: $scope
            }
        }).then(function (uploadedFiles) {
            if (uploadedFiles == "ok") {
                console.log("okkkkkkkkWater");
                var pinTo = $scope.getToastPosition();
                $mdToast.show($mdToast.simple().textContent('已儲存自訂水印，請於上傳時開啟自訂水印模式').position(pinTo).hideDelay(5000));
            }
            //$scope.websites.concat(uploadedFiles);
        }).catch(function (error) {
            // User clicked outside or hit escape
        });
    };
    $scope.changeTagsAll = function () {
        console.log("AAAA");
        //console.log($scope.websites[index]);
        $mdDialog.show({
            controller: "changeTagController",
            templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/changeTag.html',
            escapeToClose: false,
            clickOutsideToClose: false,
            locals: {
                rootScope: $scope
            }
        }).then(function (tagNeedToBeAdded) {
            console.log($scope.selected);
            $scope.saveAllTagtoPhoto(tagNeedToBeAdded);
        });
    }
    $scope.saveAllTagtoPhoto = function (SelectedTag) {
        console.log("AAAAA");
        for (i = 0; i < $scope.selected.length; i++) {
            var thisPhotoId = $scope.selected[i].substring(0, $scope.selected[i].indexOf("?AWSAccessKeyId"));
            thisPhotoId = thisPhotoId.substring(thisPhotoId.lastIndexOf("/") + 1);
            thisPhotoId = thisPhotoId.substring(0, thisPhotoId.lastIndexOf("."));
            console.log(thisPhotoId);
            var url = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
            var params = {
                "operation": "get",
                "accessKeyId": "sdasda",
                "secretAccessKey": "asdsa",
                "sessionToken": "vhndi757Bydd",
                "TableName": "dazzle-gallery",
                "Key": {
                    "gid": thisPhotoId
                }
            }
            $http.post(url, params).then(function (result) {
                console.log("db successful");
                console.log(result);
                $scope.checking = false;
                $scope.tags = result.data.Item.tags;
                console.log($scope.tags);
                for (i = 0; i < SelectedTag.length; i++) {
                    $scope.tags.push(SelectedTag[i]);
                }
                console.log($scope.tags);
                $scope.tags = $scope.tags.filter(function (elem, pos) {
                    return $scope.tags.indexOf(elem) == pos;
                })
                console.log($scope.tags);
                result.data.Item.tags = $scope.tags;
                $scope.save(result.data.Item);
            })
        }
    }
    $scope.save = function (Item) {
        var urlS = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
        var paramsS = {
            "operation": "batchWrite",
            "accessKeyId": "sdasda",
            "secretAccessKey": "asdsa",
            "sessionToken": "vhndi757Bydd",
            "RequestItems": {
                "dazzle-gallery": [{
                    PutRequest: {
                        Item: Item
                    }
                }]
            }
        };
        console.log(paramsS);
        $http.post(urlS, paramsS).then(function (result) {
            console.log("vvvv save 2");
            console.log(result);
            var pinTo = $scope.getToastPosition();
            $mdToast.show($mdToast.simple().textContent('已儲存').position(pinTo).hideDelay(3000));
            $scope.getTags().then(function (result) {
                console.log("vvvv getT");
                $scope.rootScope.tags = result.data;
            });
        });
    }
});

app.controller('myWebsiteController', function ($scope, $http, $mdDialog, $ocLazyLoad, $dazzleS3, $dazzlePopup, $dazzleUser,$dazzleFn,$dazzleInit) {
    console.log('myWebsiteController');
    $scope.init = function () {
        $scope.websites = [];
        if (angular.isArray($scope.user.webdomain)) {
            for (var i = 0; i < $scope.user.webdomain.length; i++) {
                $scope.websites.push({
                    "websiteId": $scope.user.webdomain[i],
                    "websiteJson": {
                        "website": $scope.user.webdomain[i]
                    }
                });
            }
        } else {
            $scope.websites.push({
                "websiteId": $scope.user.webdomain,
                "websiteJson": {
                    "website": $scope.user.webdomain
                }
            });
        }
    }

    $scope.initWebsite = function (website) {
        $scope.initWebsiteJson(website);
        $scope.initWebsiteTable(website);
    }

    $scope.initWebsiteJson = function (website) {
        $dazzleS3.getJson('dazzle-user-' + $scope.user.uid, 'website/' + website.websiteId + '/json/website.json').then(function (json) {
            $scope.$apply(function () {
                website.websiteJson = json;
            });
        });
    }

    $scope.getUserTables = function (userId, websiteId) {
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
    $scope.initWebsiteTable = function (website) {
        website.websiteTable = [];
        $scope.getUserTables($scope.user.uid, website.websiteId).then(function (tables) {
            $scope.$apply(function () {
                website.websiteTable = website.websiteTable.concat(tables);
            });
        });
    }

    $scope.builder = function (website) {
        window.open(
            "http://builder.dazzle.website/index.html?token:===:" + $scope.user.token + "&&&websiteId:===:" + website.websiteId + "&&&editPage:===:" + "index",
            '_blank'
        );
    }

    $scope.listElastic = function(website) {
        $dazzleUser.setDazzleInfo('thisTable',website.websiteTable[0]);
        document.location.href = "index.html#!/listElastic/"+website.websiteId+"/"+website.websiteTable[0];
    }

    $scope.dbManage = function(website) {
        $dazzleUser.setDazzleInfo('thisTable',website.websiteTable[0]);
        document.location.href = "index.html#!/myDbManage/"+website.websiteId+"/"+website.websiteTable[0];
    }

    $scope.websiteSetting = function (website) {
        $dazzlePopup.websiteSetting(website.websiteId);
    }

    $scope.recoveryData = function (website) {
        console.log("WebsiteId:",website.websiteId);
        var params ={
            "name":"dzRecoveryPopup",
            "directive":"<dz-recovery-popup></dz-recovery-popup>"
        }

        $dazzlePopup.callPopup(params).then(function(result){
            console.log("Website key:",$dazzleUser.getDazzleInfo('websiteKey'));
            console.log("User bucket:",$dazzleUser.getDazzleInfo('userBucket'));
            console.log("Export bucket:",$dazzleUser.getDazzleInfo('exportBucket'));
        });

    }

    $scope.home = function() {
        document.location.href = "index.html#!/myWebsite";
    }

    $scope.data = function (website, table) {
        //    $dazzlePopup.dataManagement(website.websiteId, table);
        console.log('website',website);
        $dazzleUser.setDazzleInfo('thisTable',table);
        document.location.href = "index.html#!/myDbManage/"+website.websiteId+"/"+table;
    }

    $scope.sell = function (website) {
        $dazzlePopup.sellWebsite(website.websiteId);
    }

    $scope.remove = function (website, index) {
        var confirm = $mdDialog.confirm()
            .title('移除網站?')
            .textContent('你是否要移除網站?')
            .ariaLabel('removeWebsite')
            .ok('是')
            .cancel('否');

        $mdDialog.show(confirm).then(function () {
            $dazzlePopup.loading();
            $http({
                "method": "post",
                "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/removewebsite",
                "data": {
                    "uid": $scope.user.uid,
                    "webdomain": website.websiteId
                }
            }).then(function (result) {
                $dazzlePopup.alert('移除網站', result.data.text).then(function () {
                    location.reload();
                });
            })
        });
    }
});


app.controller('paypalCallbackController', function ($scope, $http, $location) {
    console.log('paypalCallbackController');
    $scope.init = function () {
        $scope.result = {
            "src": "https://dazzle-template.s3.amazonaws.com/cdn6.0/images/loadingTo.gif",
            "title": "正在驗証",
            "text": "多謝，正在驗証你的付款。"
        };
        $scope.url = "https://www.paypal.com/cgi-bin/webscr";
        $scope.at = "51khhw6HcqTbT6hp7hO1gdDWQR7o5SLqCP6wlQzwDJa_O9D-_Uk_ucdgjRC";
        $scope.cmd = "_notify-synch";
        $scope.tx = $location.search().tx;
        if ($scope.tx) {
            $scope.check($scope.tx).then(function (text) {
                setTimeout(function () {
                    $scope.$apply(function () {
                        $scope.result = {
                            "src": "https://dazzle-template.s3.amazonaws.com/cdn6.0/images/loadingToSuccess-once.gif",
                            "title": "充值成功",
                            "text": "多謝，你的付款" + text
                        };
                    });
                    setTimeout(function () {
                        document.location.href = "index.html#!/rechargeRecord";
                    }, 1500);
                }, 500);
            }, function (err) {
                setTimeout(function () {
                    $scope.$apply(function () {
                        $scope.result = {
                            "src": "https://dazzle-template.s3.amazonaws.com/cdn6.0/images/loadingToFail-once.gif",
                            "title": "正在驗証",
                            "text": "錯誤，驗証你的付款失敗。"
                        };
                    })
                    setTimeout(function () {
                        document.location.href = "index.html#!/myWebsite";
                    }, 1500);
                }, 500);
            });
        } else {
            document.location.href = "index.html#!/myWebsite";
        }
    }
    $scope.check = function (tx) {
        return new Promise(function (resolve, reject) {
            $http({
                method: "POST",
                url: "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/paypal/receive-pdt",
                data: {
                    tx: tx
                }
            }).then(function (result) {
                if (result.data.code > 0) {
                    resolve(result.data.text);
                } else {
                    reject();
                }
            }, function (err) {
                reject(err);
            });
        });
    }
});

app.controller('rechargeRecordController', function ($scope, $http, $dazzleUser) {
    console.log('rechargeRecordController');
    $scope.inited = false;
    $dazzleUser.userLogin({
        "uid": $dazzleUser.getUser().uid,
        "AccessKeyId": $dazzleUser.getUser().key.AccessKeyId,
        "SecretAccessKey": $dazzleUser.getUser().key.SecretAccessKey,
        "SessionToken": $dazzleUser.getUser().key.SessionToken,
        "type": "token"
    }).then(function () {
        $scope.$apply(function () {
            $scope.$parent.user = $dazzleUser.getUser();
        });
    }, function () {
        $scope.logout();
    });
    $scope.init = function () {
        $scope.gridOptions = {
            rowHeight: 45,
            animateRows: true,
            enableColResize: true,
            angularCompileRows: true,
            enableSorting: true,
            defaultColDef: {
                editable: false,
                filter: 'text'
            },
            columnDefs: [{
                headerName: "充值ID",
                field: "txn_id",
            }, {
                headerName: "充值金額",
                field: "mc_gross",
                filter: 'number'
            }, {
                headerName: "充值時間",
                field: "payment_date",
                cellRenderer: dateRenderer,
                comparator: dateComparator,
                filter: 'date',
                filterParams: {
                    comparator: function (filterLocalDateAtMidnight, cellValue) {
                        var cellDate = new Date(cellValue).setHours(12, 0, 0, 0);
                        if (cellDate < filterLocalDateAtMidnight) {
                            return -1;
                        } else if (cellDate > filterLocalDateAtMidnight) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }
                }
            }, {
                headerName: "充值狀態",
                field: "payment_status"
            }],
            onGridReady: function () {
                $scope.getRechargeRecord().then(function (record) {
                    $scope.gridOptions.api.setRowData(record);
                    $scope.gridOptions.api.setSortModel([
                        {colId: 'payment_date', sort: 'desc'}
                    ]);
                    $scope.gridOptions.api.refreshView();
                    $scope.inited = true;
                });
            }
        };
    }
    $scope.getRechargeRecord = function () {
        return new Promise(function (resolve, reject) {
            $http({
                "method": "post",
                "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/paypal/get-record",
                "data": {
                    "action": "listRecordByUid",
                    "uid": $scope.user.uid
                }
            }).then(function (result) {
                if (result.data.code > 0) {
                    resolve(result.data.data);
                } else {
                    resolve([]);
                }
            })
        })
    }
});

app.controller('sellRecordController', function ($scope, $http, $dazzleUser) {
    console.log('sellRecordController');
    $scope.inited = false;
    $scope.init = function () {
        $scope.gridOptions = {
            rowHeight: 45,
            animateRows: true,
            enableColResize: true,
            angularCompileRows: true,
            enableSorting: true,
            defaultColDef: {
                editable: false,
                filter: 'text'
            },
            columnDefs: [{
                headerName: "交易ID",
                field: "id",
            }, {
                headerName: "銷售金額",
                field: "price",
                filter: 'number'
            }, {
                headerName: "銷售時間",
                field: "time",
                cellRenderer: dateRenderer,
                comparator: dateComparator,
                filter: 'date',
                filterParams: {
                    comparator: function (filterLocalDateAtMidnight, cellValue) {
                        var cellDate = new Date(cellValue).setHours(12, 0, 0, 0);
                        if (cellDate < filterLocalDateAtMidnight) {
                            return -1;
                        } else if (cellDate > filterLocalDateAtMidnight) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }
                }
            }, {
                headerName: "銷售類別",
                field: "type"
            }, {
                headerName: "項目ID",
                field: "itemId"
            }],
            onGridReady: function () {
                $scope.getBuyRecord().then(function (record) {
                    $scope.gridOptions.api.setRowData(record);
                    $scope.gridOptions.api.setSortModel([
                        {colId: 'time', sort: 'desc'}
                    ]);
                    $scope.gridOptions.api.refreshView();
                    $scope.inited = true;
                });
            }
        };
    }
    $scope.getBuyRecord = function () {
        return new Promise(function (resolve, reject) {
            $http({
                "method": "post",
                "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/transaction",
                "data": {
                    "action": "getSellRecordById",
                    "sellerId": $scope.user.uid
                }
            }).then(function (result) {
                if (result.data.code > 0) {
                    resolve(result.data.data);
                } else {
                    resolve([]);
                }
            })
        })
    }
});
app.controller('showFileController', function ($scope, $http, $q, $mdDialog, $mdToast, rootScope, website) {
    $scope.checking = true;
    console.log('showFileController');
    $scope.rootScope = rootScope;
    $scope.website = website;
    console.log($scope.website);
    console.log("vvvv user");
    console.log($scope.rootScope.user);

    //load download link from s3
    var s3 = new AWS.S3();
    var params = {Bucket: "dazzle-user-" + $scope.rootScope.user.uid, Key: 'files/' + $scope.website.name};
    var url = s3.getSignedUrl('getObject', params);
    $scope.downloadURL = url;

    $scope.init = function () {

        $scope.checking = false;
    }


    $scope.delete = function (ev) {
        console.log("vvvv delete ret");
        console.log($scope.websiteID);
        var obj = {};
        obj.tORf = true;
        obj.id = $scope.websiteID;
        obj.type = $scope.originalType;
        $mdDialog.hide(obj);
    }


    //For toast popup use
    var last = {
        bottom: true,
        top: false,
        left: false,
        right: true
    };
    $scope.toastPosition = angular.extend({}, last);
    $scope.getToastPosition = function () {
        sanitizePosition();

        return Object.keys($scope.toastPosition)
            .filter(function (pos) {
                return $scope.toastPosition[pos];
            })
            .join(' ');
    };

    function sanitizePosition() {
        var current = $scope.toastPosition;

        if (current.bottom && last.top) current.top = false;
        if (current.top && last.bottom) current.bottom = false;
        if (current.right && last.left) current.left = false;
        if (current.left && last.right) current.right = false;

        last = angular.extend({}, current);
    }

    // /For toast popup use
    $scope.cancel = function () {
        $mdDialog.cancel();
    }
});
app.controller('showPhotoController', function ($scope, $http, $q, $mdDialog, $mdToast, rootScope, website, bought, sold) {
    console.log("vvvv vvvv 7");
    $scope.soldLoad = true;
    $scope.sold = sold;
    $scope.bought = bought;
    $scope.checking = true;
    console.log('showPhotoController');
    $scope.rootScope = rootScope;
    console.log($scope.rootScope.deleting)
    $scope.website = website;
    console.log($scope.website);
    $scope.websiteID = $scope.website.substring(0, $scope.website.indexOf("?AWSAccessKeyId"));
    $scope.websiteID = $scope.websiteID.substring($scope.websiteID.lastIndexOf("/") + 1);
    $scope.websiteID = $scope.websiteID.substring(0, $scope.websiteID.lastIndexOf("."));
    console.log($scope.websiteID);
    console.log("vvvv user");
    console.log($scope.rootScope.user);

    /////for showing bought user use
    $scope.getUserImage = function (uid) {
        return new Promise(function (resolve, reject) {
            var url = "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/gallerydirective";
            var params = {
                "operation": "getUserImage",
                "uid": uid
            }
            $http.post(url, params).then(function (result) {
                console.log("vvvv getUserImage");
                console.log(result);
                resolve(result.data);
            });
        });
    }
    if (sold) {
        $scope.iconArray = [];
        var soldURL = "https://9g1gx9kfdc.execute-api.ap-northeast-1.amazonaws.com/dazzlegallery/getsolddetails";
        var soldParams = {
            "itemId": $scope.websiteID
        };
        $http.post(soldURL, soldParams).then(function (result) {
            console.log('vvvv sold result', result);
            var imagePath = "https://designerrrr-output.s3-ap-northeast-1.amazonaws.com/images/61920585/original/id1501736641437.jpg";
            $scope.messages = [];

            function todo(i) {
                if (i == result.data.length) {
                    console.log("vvvv todo end");
                    console.log($scope.iconArray);
                    for (j = 0; j < result.data.length; j++) {
                        $scope.messages = $scope.messages.concat({
                            face: $scope.iconArray[j].userIcon,
                            buyerId: $scope.iconArray[j].userName,
                            time: result.data[j].time,
                            price: result.data[j].price,
                            id: result.data[j].id
                        });
                    }
                    console.log("vvvv whyyyy message");
                    console.log($scope.messages);
                    $scope.soldLoad = false;
                    return;
                }
                $scope.getUserImage(result.data[i].buyerId).then(function (url) {
                    console.log("vvvv todo i");
                    console.log(i);
                    console.log(url);
                    $scope.iconArray = $scope.iconArray.concat(url);
                    i++;
                    todo(i);
                });
            }

            todo(0);
        });
    }
    /////

    $scope.addCount = function () {
        var urlC = "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/hohopost-user-newdb";
        var paramsC = {
            "operation": "update",
            "index": "gallery",
            "type": "table",
            "id": $scope.websiteID,
            "doc": {
                clickRate: $scope.clickRate + 1
            }
        };
        $http.post(urlC, paramsC).then(function (result) {
            console.log('Added count', result);
        });
    }

    $scope.init = function () {
        var url = "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/hohopost-user-newdb";
        var params = {
            "operation": "get",
            "index": "gallery",
            "type": "table",
            "id": $scope.websiteID
        }
        $http.post(url, params).then(function (result) {
            console.log("db successful");
            console.log(result);
            $scope.checking = false;
            switch ($scope.rootScope.type) {
                case "相片":
                    var theKey = result.data._source.large_url;
                    theKey = theKey.replace("https://designerrrr-output.s3-ap-northeast-1.amazonaws.com/", "");
                    theKey = theKey.replace("large", "large-web");
                    theKey = theKey.substring(0, theKey.lastIndexOf("."));
                    theKey += ".jpg";
                    break;
                case "插畫":
                    var theKey = result.data._source.png_url;
                    theKey = theKey.replace("https://designerrrr-output.s3-ap-northeast-1.amazonaws.com/", "");
                    //theKey = theKey.replace("png", "png-web");
                    theKey = theKey.substring(0, theKey.lastIndexOf("."));
                    theKey += ".png";
                    break;
            }
            $scope.imgURL = $scope.getImage(theKey);
            $scope.type = result.data._source.category;
            $scope.original = result.data._source.original_name;
            $scope.status = result.data._source.status;
            $scope.clickRate = result.data._source.clickRate;
            $scope.downloadRate = result.data._source.downloaded;
            $scope.rating = result.data._source.rating;
            $scope.readOnly = true;
            $scope.desc = result.data._source.remark;
            $scope.tags = result.data._source.tags;
            $scope.owner_id = result.data._source.owner_id;
            $scope.price = result.data._source.price;
            $scope.showPrice = "$" + result.data._source.price;
            if ($scope.tags) {
                $scope.tags = $scope.tags.filter(function (elem, pos) {
                    return $scope.tags.indexOf(elem) == pos;
                })
            } else {
                $scope.tags = [];
            }

            $scope.originalType = result.data._source.original_name.substring(result.data._source.original_name.lastIndexOf("."));

            //load for download link
            var s3 = new AWS.S3();
            switch ($scope.rootScope.type) {
                case "相片":
                    var paramsAA = {
                        Bucket: "designerrrr-output",
                        Key: 'images/' + $scope.owner_id + '/original/' + $scope.websiteID + $scope.originalType
                    };
                    var paramsAA2 = {
                        Bucket: "designerrrr-output",
                        Key: 'images/' + $scope.owner_id + '/large/' + $scope.websiteID + ".jpg"
                    };
                    break;
                case "插畫":
                    var paramsAA = {
                        Bucket: "designerrrr-output",
                        Key: 'illustration/' + $scope.owner_id + '/png/' + $scope.websiteID + ".png"
                    };
                    var paramsAA2 = {
                        Bucket: "designerrrr-output",
                        Key: 'illustration/' + $scope.owner_id + '/eps/' + $scope.websiteID + ".eps"
                    };
                    var paramsAA3 = {
                        Bucket: "designerrrr-output",
                        Key: 'illustration/' + $scope.owner_id + '/svg/' + $scope.websiteID + ".svg"
                    };
                    break;
            }
            var urlAA = s3.getSignedUrl('getObject', paramsAA);
            $scope.downloadURL = urlAA;
            switch ($scope.rootScope.type) {
                case "相片":
                    var urlAA2 = s3.getSignedUrl('getObject', paramsAA2);
                    $scope.downloadURL2 = urlAA2;
                    break;
                case "插畫":
                    var urlAA2 = s3.getSignedUrl('getObject', paramsAA2);
                    $scope.downloadURL2 = urlAA2;
                    var urlAA3 = s3.getSignedUrl('getObject', paramsAA3);
                    $scope.downloadURL3 = urlAA3;
                    break;
            }

            /*Not use by the popup, but necessary to get all the item for doing batch operation*/
            $scope.descc = result.data._source.desc;
            $scope.galleryType = result.data._source.galleryType;
            $scope.status = result.data._source.status;
            $scope.JSONcheck = result.data._source.JSONcheck;
            $scope.newVersion = result.data._source.newVersion;
            switch ($scope.rootScope.type) {
                case "相片":
                    $scope.original_url = result.data._source.original_url;
                    $scope.large_url = result.data._source.large_url;
                    $scope.mid_url = result.data._source.mid_url;
                    $scope.small_url = result.data._source.small_url;
                    break;
                case "插畫":
                    $scope.png_url = result.data._source.png_url;
                    $scope.svg_url = result.data._source.svg_url;
                    $scope.eps_url = result.data._source.eps_url;
                    break;
            }
            /**/

            console.log($scope.tags);
            $scope.addCount();
        });
    }

    $scope.getImage = function (key) {
        console.log(key);
        var s3 = new AWS.S3();
        var params = {Bucket: "designerrrr-output", Key: key};
        var url = s3.getSignedUrl('getObject', params);
        console.log(url);
        return url;
    }
    $scope.delete = function (ev) {
        console.log("vvvv delete ret");
        console.log($scope.websiteID);
        var obj = {};
        obj.tORf = true;
        obj.id = $scope.websiteID;
        obj.type = $scope.originalType;
        $mdDialog.hide(obj);
    }


    //For toast popup use
    var last = {
        bottom: true,
        top: false,
        left: false,
        right: true
    };
    $scope.toastPosition = angular.extend({}, last);
    $scope.getToastPosition = function () {
        sanitizePosition();

        return Object.keys($scope.toastPosition)
            .filter(function (pos) {
                return $scope.toastPosition[pos];
            })
            .join(' ');
    };

    function sanitizePosition() {
        var current = $scope.toastPosition;

        if (current.bottom && last.top) current.top = false;
        if (current.top && last.bottom) current.bottom = false;
        if (current.right && last.left) current.left = false;
        if (current.left && last.right) current.right = false;

        last = angular.extend({}, current);
    }

    // /For toast popup use


    $scope.save = function () {
        var urlS = "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/hohopost-user-newdb";
        var savePitem = {
            galleryType: $scope.galleryType,
            clickRate: $scope.clickRate + 1,
            desc: $scope.descc,
            downloaded: $scope.downloadRate,
            owner_id: $scope.owner_id,
            price: $scope.price,
            rating: $scope.rating,
            remark: $scope.desc,
            status: $scope.status,
            category: $scope.type,
            original_name: $scope.original,
            tags: $scope.tags,
            JSONcheck: $scope.JSONcheck,
            newVersion: $scope.newVersion
        };
        switch ($scope.rootScope.type) {
            case "相片":
                savePitem["original_url"] = $scope.original_url;
                savePitem["large_url"] = $scope.large_url;
                savePitem["mid_url"] = $scope.mid_url;
                savePitem["small_url"] = $scope.small_url;
                break;
            case "插畫":
                savePitem["png_url"] = $scope.png_url;
                savePitem["svg_url"] = $scope.svg_url;
                savePitem["eps_url"] = $scope.eps_url;
                break;
        }
        var paramsS = {
            "operation": "update",
            "index": "dazzle",
            "type": "gallery",
            "id": $scope.websiteID,
            "doc": savePitem,
        };
        console.log(paramsS);
        $http.post(urlS, paramsS).then(function (result) {
            console.log("vvvv save 2");
            console.log(result);
            var pinTo = $scope.getToastPosition();
            $mdToast.show(
                $mdToast.simple()
                    .textContent('已儲存')
                    .position(pinTo)
                    .hideDelay(3000)
            );
            $scope.rootScope.getTags().then(function (result) {
                console.log("vvvv getT");
                $scope.rootScope.tags = result.data;
            });
        });

    }
    $scope.updateDownload = function () {
        console.log("updateDownload");
        var urlC = "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/hohopost-user-newdb";
        var paramsC = {
            "operation": "update",
            "index": "gallery",
            "type": "table",
            "id": $scope.websiteID,
            "doc": {
                downloaded: $scope.downloadRate + 1
            }
        };
        $http.post(urlC, paramsC).then(function (result) {
            console.log('Added downloadRate', result);
        });
    }
    $scope.cancel = function () {
        $mdDialog.cancel();
    }
    $scope.vvvv = function () {
        var urlC = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";

        function todo(key) {
            var paramsV = {
                "operation": "list",
                "accessKeyId": "sdasda",
                "secretAccessKey": "asdsa",
                "sessionToken": "vhndi757Bydd",
                "TableName": "dazzle-gallery",
                "Limit": 1
            };
            if (key) {
                console.log("vvvv whyyyy2");
                paramsV.ExclusiveStartKey = key;
            }
            $http.post(urlC, paramsV).then(function (result) {
                if (!result.data.LastEvaluatedKey) {
                    console.log("vvvv FINNNNN");
                }
                console.log('vvvv vvvv', result);
                if (result.data.Items.length > 0) {
                    var paramsC = {
                        "operation": "update",
                        "accessKeyId": "sdasda",
                        "secretAccessKey": "asdsa",
                        "sessionToken": "vhndi757Bydd",
                        "TableName": "dazzle-gallery",
                        "Key": {
                            "gid": result.data.Items[0].gid
                        },
                        "UpdateExpression": "set #status = :status",
                        "ExpressionAttributeNames": {
                            "#status": "status"
                        },
                        "ExpressionAttributeValues": {
                            ":status": "未出售"
                        }
                    };
                    $http.post(urlC, paramsC).then(function (result2) {
                        console.log('vvvv', result2);
                        if (result.data.LastEvaluatedKey) {
                            console.log("vvvv whyyyy1");
                            todo(result.data.LastEvaluatedKey);
                        }
                    });
                } else {
                    console.log("0 length");
                    if (result.data.LastEvaluatedKey) {
                        todo(result.data.LastEvaluatedKey);
                    }
                }
            });
        }

        todo();
    }
    $scope.vvvv2 = function () {
        var urlC = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
        var arrayyy = [];

        function todo(key) {
            var paramsV = {
                "operation": "list",
                "accessKeyId": "sdasda",
                "secretAccessKey": "asdsa",
                "sessionToken": "vhndi757Bydd",
                "TableName": "dazzle-gallery"
            };
            if (key) {
                console.log("vvvv whyyyy2");
                paramsV.ExclusiveStartKey = key;
            }
            $http.post(urlC, paramsV).then(function (result) {
                console.log(result);
                if (!result.data.LastEvaluatedKey) {
                    console.log("vvvv FINNNNN");
                    arrayyy.concat(result.data.Item);
                    console.log(arrayyy);
                } else {
                    arrayyy.concat(result.data.Item);
                    todo(result.data.LastEvaluatedKey);
                }
            });
        }

        todo();
    }
    $scope.vvvv3 = function () {
        var urlD = "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/again";
        var paramsD = {
            "vvvv": "vvvvabcd",
        };
        $http.post(urlD, paramsD).then(function (result) {
            console.log(result);
        });
    }
    $scope.vvvv4 = function () {
        var urlvvvv = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
        var bigURL = [];

        function todo2(i) {
            console.log("times");
            console.log(i);
            if (i == bigURL.length) {
                console.log("enDDDDDD!!!!");
                return;
            }
            if (!bigURL[i].tags) {
                console.log("tagssssssss");
                var urltt = "https://d8fz9pfue5.execute-api.ap-northeast-1.amazonaws.com/prod/updatetag";
                if (bigURL[i].mid_url) {
                    console.log("midddddd urllllll");
                    var url = bigURL[i].mid_url.replace("medium", "medium-web");
                    console.log(url);
                    console.log(bigURL[i].gid);
                    var paramstt = {
                        "url": url,
                        "gid": bigURL[i].gid
                    };
                    $http.post(urltt, paramstt).then(function (result2) {
                        console.log("updateeee");
                        console.log(result2);
                        i++;
                        todo2(i);
                    });
                } else {
                    i++;
                    todo2(i);
                }
            } else {
                i++;
                todo2(i);
            }
        }

        function todo(key) {
            var paramsvvvv = {
                "operation": "list",
                "accessKeyId": "sdasda",
                "secretAccessKey": "asdsa",
                "sessionToken": "vhndi757Bydd",
                "TableName": "dazzle-gallery"
            };
            if (key) {
                console.log("keyyyyy");
                paramsvvvv.ExclusiveStartKey = key;
            }
            $http.post(urlvvvv, paramsvvvv).then(function (result) {
                console.log(result.data.Items);
                bigURL = bigURL.concat(result.data.Items);
                if (result.data.LastEvaluatedKey) {
                    todo(result.data.LastEvaluatedKey);
                } else {
                    console.log(bigURL);
                    todo2(0);
                }
            });
        }

        todo();
    }
    $scope.vvvv5 = function () {
        var urlvvvv = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
        $scope.i = 0;

        function todo(key) {
            $scope.i++;
            console.log("times");
            console.log($scope.i);
            var paramsvvvv = {
                "operation": "list",
                "accessKeyId": "sdasda",
                "secretAccessKey": "asdsa",
                "sessionToken": "vhndi757Bydd",
                "TableName": "dazzle-gallery",
                "Limit": 1
            };
            if (key) {
                console.log("keyyyyy");
                paramsvvvv.ExclusiveStartKey = key;
            }
            $http.post(urlvvvv, paramsvvvv).then(function (result) {
                console.log(result);
                if (!result.data.Items[0].tags) {
                    console.log("tagssssssss");
                    var urltt = "https://d8fz9pfue5.execute-api.ap-northeast-1.amazonaws.com/prod/updatetag";
                    if (result.data.Items[0].mid_url) {
                        console.log("midddddd urllllll");
                        var url = result.data.Items[0].mid_url.replace("medium", "medium-web");
                        console.log(url);
                        console.log(result.data.Items[0].gid);
                        var paramstt = {
                            "url": url,
                            "gid": result.data.Items[0].gid
                        };
                        $http.post(urltt, paramstt).then(function (result2) {
                            console.log("updateeee");
                            console.log(result2);
                            if (result.data.LastEvaluatedKey) {
                                todo(result.data.LastEvaluatedKey);
                            }
                        });
                    } else if (result.data.LastEvaluatedKey) {
                        todo(result.data.LastEvaluatedKey);
                    }
                } else if (result.data.LastEvaluatedKey) {
                    todo(result.data.LastEvaluatedKey);
                }
            });
        }

        todo();
    }
    $scope.vvvv6 = function () {
        var urlvvvv = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
        var paramsvvvv = {
            "operation": "list",
            "accessKeyId": "sdasda",
            "secretAccessKey": "asdsa",
            "sessionToken": "vhndi757Bydd",
            "TableName": "dazzle-transaction"
        };
        $http.post(urlvvvv, paramsvvvv).then(function (result) {
            console.log(result);

            for (i = 0; i < result.data.Items.length; i++) {
                if (i == result.data.Items.length) {
                    return;
                }
                console.log(result.data.Items[i]);
                var u2u2 = "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/hohopost-user-newdb";
                var paramsvvvv2 = {
                    "operation": "create",
                    "type": "dazzle-transaction-test",
                    "id": result.data.Items[i].id,
                    "body": result.data.Items[i]
                };
                $http.post(u2u2, paramsvvvv2).then(function (result2) {
                    console.log("elasticccc 66666");
                    console.log(result2.data);
                });
            }
        });
    }
    $scope.vvvv7 = function () {
        var u2u2 = "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/hohopost-user-newdb";
        var paramsvvvv2 = {
            "operation": "listAll",
            "type": "dazzle-transaction",
            "size": 1000,
            "from": 0
        };
        $http.post(u2u2, paramsvvvv2).then(function (result) {
            console.log("elasticccc 77777");
            console.log(result.data);
        });
    }

});
app.controller('soldImageController', function ($scope, $http, $filter, $mdDialog, $mdBottomSheet, $mdToast) {
    $scope.eachShowNum = 500;
    console.log("vvvv vvvv 8");
    //for upload user defind data
    $scope.userType = '相片';
    //$scope.types = ("相片 插畫 3D模型 字型 LOGO 網站樣辦").split(' ').map(function(type) { //use later
    $scope.types = ("相片 插畫").split(' ').map(function (type) {
        return {abbrev: type};
    });

    $scope.init = function (type) {
        //$scope.$apply(function(){
        $scope.type = type;
        $scope.allNewArray = [];
        $scope.deleting = false;
        $scope.loading = true;
        $scope.end = false;
        $scope.tags = [];
        $scope.selected = [];
        $scope.selecting = false;
        $scope.deletedURL = [];
        $scope.selectedTags = [];
        $scope.LastEvaluatedKey = null;
        $scope.websitesAngularGridOptions = {
            gridWidth: 200,
            gutterSize: 4,
            infiniteScrollDelay: 1000,
            infiniteScrollDistance: 95,
            scrollContainer: '#sidecontent'
        }
        $scope.inited = false;
        $scope.websites = [];
        //});
        switch ($scope.type) {
            case "相片":
                console.log("vvvv 相片");
                $scope.px = 'images/' + $scope.user.uid + '/medium-web/';
                $scope.nowType = ".jpg";
                break;
            case "插畫":
                console.log("vvvv 插畫");
                $scope.px = 'illustration/' + $scope.user.uid + '/png/';
                $scope.nowType = ".png";
                break;
        }
        console.log('myPhotosController');
        console.log($scope.user.uid);
        console.log(AWS.config);

        var getBoughtUrl = "https://d8fz9pfue5.execute-api.ap-northeast-1.amazonaws.com/prod/getboughtimage";
        var gbParams = {
            "sellerId": $scope.user.uid,
            "type": type,
            "sell": true
        }
        console.log(gbParams);
        $http.post(getBoughtUrl, gbParams).then(function (result) {
            console.log("vvvv newGet");
            console.log(result);
            var ay = [];
            if (!result.data.errorMessage) {
                console.log(result.data.Responses["dazzle-gallery"]);
                var dg = result.data.Responses["dazzle-gallery"];
                for (i = 0; i < dg.length; i++) {
                    switch ($scope.type) {
                        case "相片":
                            var dg1 = dg[i].mid_url.replace("https://designerrrr-output.s3-ap-northeast-1.amazonaws.com/", "");
                            var dgg = dg1.replace("medium", "medium-web");
                            break;
                        case "插畫":
                            var dg1 = dg[i].png_url.replace("https://designerrrr-output.s3-ap-northeast-1.amazonaws.com/", "");
                            var dgg = dg1;
                            break;
                    }
                    ay = ay.concat({Key: dgg});
                }
            }
            var dataa = {};
            dataa.Contents = ay;
            console.log(dataa);
            $scope.data = dataa;
            $scope.getWebsites($scope.eachShowNum, 0).then(function (anArray) {
                $scope.$apply(function () {
                    $scope.inited = true;
                    $scope.loading = false;
                    $scope.websites = $scope.websites.concat(anArray);
                    $scope.LastEvaluatedKey = $scope.eachShowNum;
                    console.log("vvvv $scope.websites");
                    console.log($scope.websites);
                });
            });
        });
    }
    /*
        $scope.tagClicked = function(tag) {
            console.log("vvvv tc1");
            $scope.selectedTags = [];
            $scope.selectedTags.push(tag);
            $scope.tagsChanged();
        }
        $scope.tagsChanged = function() {
            console.log("vvvv tc2");
            $scope.loading = true;
            $scope.end = false;
            $scope.LastEvaluatedKey = null;
            $scope.websites = [];
            if ($scope.selectedTags.length <= 0) {
                $scope.getWebsites($scope.eachShowNum, 0).then(function(anArray) {
                    $scope.$apply(function() {
                        $scope.loading = false;
                        anArray = $scope.allNewArray.concat(anArray);
                        $scope.websites = $scope.websites.concat(anArray);
                        $scope.LastEvaluatedKey = $scope.eachShowNum;
                    });
                });
            } else {
                var uniArray = [];
                var done = [];
                for (var i = 0; i < $scope.selectedTags.length; i++) {
                    $scope.getWebsitesByTag($scope.selectedTags[i]).then(function(anArray) {
                        $scope.$apply(function() {
                            uniArray = uniArray.concat(anArray);
                            done.push({});
                            if (done.length == $scope.selectedTags.length) {
                                uniArray = uniArray.filter(function(elem, pos) {
                                    return uniArray.indexOf(elem) == pos;
                                });
                                $scope.websites = $scope.websites.concat(uniArray);
                                console.log($scope.websites);
                            }
                        });
                    });
                }
                $scope.loading = false;
                $scope.end = true;
            }
        }
        $scope.queryTags = function(query) {
            console.log(query);
            return $filter('filter')(angular.lowercase($scope.tags), angular.lowercase(query));
        }
        $scope.getTags = function() {
            return new Promise(function(resolve, reject) {
                var data = {};
                data.userName = $scope.user.uid;
                data.type = $scope.type;
                console.log("vvvv whyyyyyy 323232");
                console.log($scope.user.uid);
                $http({
                    "method": "post",
                    "url": "https://9g1gx9kfdc.execute-api.ap-northeast-1.amazonaws.com/dazzlegallery/gettags",
                    "data": data
                }).then(function(result) {
                    console.log("vvvv getTag");
                    console.log(result);
                    if (result.data.code > 0) {
                        resolve(result.data);
                    } else {
                        reject(result.data.text);
                    }
                })
            })
        }
        $scope.getWebsitesByTag = function(tag) {
            return new Promise(function(resolve, reject) {
                $http({
                    "method": "post",
                    "url": "https://9g1gx9kfdc.execute-api.ap-northeast-1.amazonaws.com/dazzlegallery/getid",
                    "data": {
                        "tag": tag,
                        "action": "bytag",
                        "owner_id": $scope.user.uid,
                        "type": $scope.type
                    }
                }).then(function(result) {
                    console.log(result);
                    if (result.data.code > 0) {
                        var s3 = new AWS.S3();
                        var anArray = [];
                        for (i = 0; i < result.data.data.length; i++) {
                            var theID = result.data.data[i].gid;
                            switch ($scope.type) {
                                case "相片":
                                    console.log("vvvv 相片 2");
                                    var theLink = "images/" + $scope.user.uid + "/medium-web/" + theID + ".jpg"
                                    break;
                                case "插畫":
                                    console.log("vvvv 插畫 2");
                                    var theLink = "illustration/" + $scope.user.uid + "/png/" + theID + ".png"
                                    break;
                            }
                            var params = {
                                Bucket: "designerrrr-output",
                                Key: theLink
                            };
                            var url = s3.getSignedUrl('getObject', params);
                            anArray[i] = url;
                        }
                        console.log(anArray);
                        resolve(anArray);
                    } else {
                        resolve([]);
                    }
                });
            });
        }*/
    $scope.loadMore = function () {
        console.log("loadMore");
        if (!$scope.end && !$scope.loading) {
            $scope.loading = true;
            $scope.getWebsites($scope.eachShowNum, $scope.LastEvaluatedKey).then(function (anArray) {
                $scope.loading = false;
                if (anArray.length > 0) {
                    $scope.websites = $scope.websites.concat(anArray);
                    $scope.LastEvaluatedKey = $scope.LastEvaluatedKey + $scope.eachShowNum;
                } else {
                    $scope.end = true;
                }
            });
        }
    }
    $scope.getWebsites = function (limit, key) {
        return new Promise(function (resolve, reject) {
            console.log("getWebsites");
            var data = $scope.data;
            console.log(data);
            var anArray = [];
            var counter = 0;
            var s3 = new AWS.S3();
            if ($scope.LastEvaluatedKey < data.Contents.length && data.Contents.length - $scope.LastEvaluatedKey < $scope.eachShowNum) { //show photo when unshow photo less than 50
                console.log("if");
                for (i = (0 + key); i < data.Contents.length; i++) {
                    var checkID = data.Contents[i].Key.substring(data.Contents[i].Key.lastIndexOf("/") + 1).replace($scope.nowType, "");
                    console.log("vvvv checkID");
                    console.log(checkID);
                    var notLoad = false;
                    for (j = 0; j < $scope.deletedURL.length; j++) {
                        if ($scope.deletedURL[j] == checkID) {
                            notLoad = true;
                        }
                    }
                    if (notLoad) {
                        console.log("dead img found");
                    } else {
                        console.log("dead img else");
                        var params = {
                            Bucket: "designerrrr-output",
                            Key: data.Contents[i].Key
                        };
                        var url = s3.getSignedUrl('getObject', params);
                        anArray[counter] = url;
                        counter++;
                    }
                }
                if ($scope.data.Contents.length <= $scope.eachShowNum) {
                    console.log("endFirst");
                    $scope.end = true;
                }
                console.log(anArray);
                resolve(anArray);
            } else if ($scope.LastEvaluatedKey < data.Contents.length) {
                console.log("else if");
                for (i = (0 + key); i < (limit + key); i++) {
                    console.log("vvvv for");
                    console.log(data.Contents[i]);
                    console.log(data.Contents[i].Key);
                    var checkID = data.Contents[i].Key.substring(data.Contents[i].Key.lastIndexOf("/") + 1).replace($scope.nowType, "");
                    console.log("vvvv checkID");
                    console.log(checkID);
                    var notLoad = false;
                    for (j = 0; j < $scope.deletedURL.length; j++) {
                        if ($scope.deletedURL[j] == checkID) {
                            notLoad = true;
                        }
                    }
                    if (notLoad) {
                        console.log("dead img found");
                    } else {
                        console.log("dead img else");
                        var params = {
                            Bucket: "designerrrr-output",
                            Key: data.Contents[i].Key
                        };
                        var url = s3.getSignedUrl('getObject', params);
                        anArray[counter] = url;
                        counter++;
                    }
                }
                console.log(anArray);
                resolve(anArray);
            } else {
                if ($scope.websites.length == 0) {
                    console.log("vvvv first 0");
                    $scope.inited = true;
                    $scope.loading = false;
                    $scope.LastEvaluatedKey = 0;
                }
                $scope.end = true;
                console.log("reject");
                reject("end");
            }
        });
    }
    $scope.getImage = function (key) {
        var s3 = new AWS.S3();
        var params = {
            Bucket: "designerrrr-output",
            Key: key
        };
        var url = s3.getSignedUrl('getObject', params);
        console.log(url);
        return url;
    }
    //For toast popup use
    var last = {
        bottom: true,
        top: false,
        left: false,
        right: true
    };
    $scope.toastPosition = angular.extend({}, last);
    $scope.getToastPosition = function () {
        sanitizePosition();
        return Object.keys($scope.toastPosition).filter(function (pos) {
            return $scope.toastPosition[pos];
        }).join(' ');
    };

    function sanitizePosition() {
        var current = $scope.toastPosition;
        if (current.bottom && last.top) current.top = false;
        if (current.top && last.bottom) current.bottom = false;
        if (current.right && last.left) current.left = false;
        if (current.left && last.right) current.right = false;
        last = angular.extend({}, current);
    }

    // /For toast popup use
    $scope.showPhoto = function (website, index) {
        //尋日做到show photo,要改show photo.js showPhoto.html d type 同 url2017 7 26
        console.log(index);
        //console.log($scope.websites[index]);
        $mdDialog.show({
            controller: "showPhotoController",
            templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/showPhoto.html',
            escapeToClose: false,
            clickOutsideToClose: false,
            locals: {
                website: website,
                rootScope: $scope,
                bought: true,
                sold: true
            }
        }).then(function (objj) {
            console.log("vvvv showPhoto then");
            console.log(objj);
            /*
                if (objj.tORf) {
                    var confirm = $mdDialog.confirm().title('刪除圖片').textContent('你真的要刪除此圖片嗎?').ariaLabel('Lucky day').ok('刪除').cancel('取消');
                    $mdDialog.show(confirm).then(function() {
                        $scope.selected = [];
                        $scope.deleting = true;
                        var delID = $scope.websites[index].substring(0, $scope.websites[index].indexOf($scope.nowType + "?AWSAccessKeyId")).replace($scope.nowType + "?AWSAccessKeyId", "");
                        console.log(delID);
                        delID = delID.substring(delID.lastIndexOf("/") + 1);
                        console.log(delID);
                        $scope.deletedURL.push(delID);
                        console.log("vvvv dellll");
                        console.log($scope.deletedURL);
                        //This part is for a special case that user delete the photo just upload in same page
                        for (i = 0; i < $scope.allNewArray.length; i++) {
                            console.log($scope.allNewArray[i]);
                            console.log($scope.websites[index]);
                            if ($scope.allNewArray[i] === $scope.websites[index]) {
                                console.log("same!");
                                $scope.allNewArray.splice(i, 1);
                            }
                        }
                        //This part is for arrange the pictures after delete.
                        $scope.websites.splice(index, 1);
                        setTimeout(function() {
                            var temp = $scope.websites.length;
                            console.log("vvvv thennnn7");
                            $scope.temp = temp;
                            $scope.websites = $scope.websites.concat(["https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png"]);
                        }, 1500);
                        setTimeout(function() {
                            console.log("vvvv 2000 thennnn7");
                            $scope.websites.splice($scope.temp, 1);
                            $scope.deleting = false;
                        }, 4000);
                        // /This part is for arrange the pictures after delete.
                        var url = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
                        var params = {
                            "operation": "delete",
                            "accessKeyId": "sdasda",
                            "secretAccessKey": "asdsa",
                            "sessionToken": "vhndi757Bydd",
                            "TableName": "dazzle-gallery",
                            "Key": {
                                "gid": objj.id
                            }
                        }
                        $http.post(url, params).then(function(result) {
                            console.log("deleted");
                            console.log(result);
                            var pinTo = $scope.getToastPosition();
                            $scope.getTags().then(function(result) {
                                $scope.tags = result.data;
                            });
                            $mdToast.show($mdToast.simple().textContent('已刪除').position(pinTo).hideDelay(3000));
                        });
                        var s3 = new AWS.S3();
                        switch ($scope.type) {
                            case "相片":
                                console.log("vvvv 相片 3");
                                var diffObj = [{
                                    Key: "images/" + $scope.user.uid + "/large/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/large-web/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/medium/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/medium-web/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/small/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/small-web/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/thumbnail/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/thumbnail-web/" + objj.id + ".jpg"
                                }, {
                                    Key: "images/" + $scope.user.uid + "/original/" + objj.id + objj.type
                                }];
                                break;
                            case "插畫":
                                console.log("vvvv 插畫 3");
                                var diffObj = [{
                                    Key: "illustration/" + $scope.user.uid + "/eps/" + objj.id + ".eps"
                                }, {
                                    Key: "illustration/" + $scope.user.uid + "/svg/" + objj.id + ".svg"
                                }, {
                                    Key: "illustration/" + $scope.user.uid + "/png/" + objj.id + ".png"
                                }];
                                break;
                        }

                        var paramsDel = {
                            Bucket: "designerrrr-output",
                            Delete: {
                                Objects: diffObj,
                                Quiet: false
                            }
                        };
                        s3.deleteObjects(paramsDel, function(err, data) {
                            if (err) {
                                console.log("s3 fail");
                                console.log(err);
                            } else {
                                console.log("delete from s3 successful");
                                console.log(data);
                                console.log($scope.websites);
                                //$scope.init();
                                /*for(i=0;i<$scope.websites.length;i++){
                                    if($scope.websites[i].indexOf(objj.id)!=-1){
                                        console.log("splice ok");
                                        $scope.websites.splice(i,1);
                                    }
                                }
                                console.log($scope.websites);*/
            /*}
                        });
                    }, function() {});
                }*/
        });
    }
    $scope.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
            list.splice(idx, 1);
        } else {
            list.push(item);
        }
    };
    $scope.toggleAll = function (item) {
        if ($scope.selected.length === $scope.websites.length) {
            $scope.selected = [];
        } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
            $scope.selected = $scope.websites.slice(0);
        }
    }
    $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };
    $scope.select = function () {
        $scope.selecting = true;
    }
    $scope.selectCancel = function () {
        $scope.selected = [];
        $scope.selecting = false;
    }
    $scope.downloadAll = function () {
        if ($scope.selected.length != 0) {
            var allID = [];
            console.log($scope.selected);
            for (i = 0; i < $scope.selected.length; i++) {
                allID[i] = $scope.selected[i].substring(0, $scope.selected[i].indexOf("?AWSAccessKeyId")).substring($scope.selected[i].lastIndexOf("/") + 1).replace($scope.nowType, "");
            }
            console.log(allID);
            $mdDialog.show({
                controller: "batchDownloadPopupController",
                templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/batchDownloadPopup.html',
                escapeToClose: false,
                clickOutsideToClose: false,
                locals: {
                    allID: allID,
                    type: $scope.type
                }
            }).then(function () {
            });
        } else {
            var pinTo = $scope.getToastPosition();
            $mdToast.show($mdToast.simple().textContent('請選擇項目').position(pinTo).hideDelay(3000));
        }
    }
    /*
        $scope.deleteAll = function(website) {
            var allID = [];
            console.log($scope.selected);
            for (i = 0; i < $scope.selected.length; i++) {
                allID[i] = $scope.selected[i].substring(0, $scope.selected[i].indexOf("?AWSAccessKeyId")).substring($scope.selected[i].lastIndexOf("/") + 1).replace($scope.nowType, "");
            }
            console.log(allID);
            var confirm = $mdDialog.confirm().title('刪除圖片').textContent('你真的要刪除' + $scope.selected.length + '張圖片嗎?').ariaLabel('Lucky day').ok('刪除').cancel('取消');
            $mdDialog.show(confirm).then(function() {
                $scope.deleteAllPhoto();
                $scope.deleteAllData();
            });
        }
        $scope.upload = function() {
            console.log("vvvv upload");
            console.log($scope.user);
            $scope.alert = '';
            $mdBottomSheet.show({
                templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/upload.html',
                controller: 'uploadController',
                clickOutsideToClose: false,
                disableParentScroll: false,
                locals: {
                    bucket: "designerrrr-output",
                    key: $scope.px,
                    rootScope: $scope
                }
            }).then(function(uploadedFiles) {
                $scope.getTags().then(function(result) {
                    $scope.tags = result.data;
                });
                console.log("vvvv then");
                console.log(uploadedFiles);
                var newItemArray = [];
                console.log("vvvv md dialog");
                if (uploadedFiles.length != 0) {
                    for (i = 0; i < uploadedFiles.length; i++) {
                        newItemArray[i] = $scope.getImage(uploadedFiles[i].path);
                    }
                    console.log(newItemArray);
                    if ($scope.allNewArray.length == 0) {
                        $scope.allNewArray = newItemArray;
                    } else {
                        $scope.allNewArray = newItemArray.concat($scope.allNewArray);
                    }
                    $scope.websites = newItemArray.concat($scope.websites);
                }
                //$scope.websites.concat(uploadedFiles);
            }).catch(function(error) {
                // User clicked outside or hit escape
            });
        };
        $scope.changeTagsAll = function() {
            console.log("AAAA");
            //console.log($scope.websites[index]);
            $mdDialog.show({
                controller: "changeTagController",
                templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/changeTag.html',
                escapeToClose: false,
                clickOutsideToClose: false,
                locals: {
                    rootScope: $scope
                }
            }).then(function(tagNeedToBeAdded) {
                console.log($scope.selected);
                $scope.saveAllTagtoPhoto(tagNeedToBeAdded);
            });
        }
        $scope.saveAllTagtoPhoto = function(SelectedTag) {
            console.log("AAAAA");
            for (i = 0; i < $scope.selected.length; i++) {
                var thisPhotoId = $scope.selected[i].substring(0, $scope.selected[i].indexOf("?AWSAccessKeyId"));
                thisPhotoId = thisPhotoId.substring(thisPhotoId.lastIndexOf("/") + 1);
                thisPhotoId = thisPhotoId.substring(0, thisPhotoId.lastIndexOf("."));
                console.log(thisPhotoId);
                var url = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
                var params = {
                    "operation": "get",
                    "accessKeyId": "sdasda",
                    "secretAccessKey": "asdsa",
                    "sessionToken": "vhndi757Bydd",
                    "TableName": "dazzle-gallery",
                    "Key": {
                        "gid": thisPhotoId
                    }
                }
                $http.post(url, params).then(function(result) {
                    console.log("db successful");
                    console.log(result);
                    $scope.checking = false;
                    $scope.tags = result.data.Item.tags;
                    console.log($scope.tags);
                    for (i = 0; i < SelectedTag.length; i++) {
                        $scope.tags.push(SelectedTag[i]);
                    }
                    console.log($scope.tags);
                    $scope.tags = $scope.tags.filter(function(elem, pos) {
                        return $scope.tags.indexOf(elem) == pos;
                    })
                    console.log($scope.tags);
                    result.data.Item.tags = $scope.tags;
                    $scope.save(result.data.Item);
                })
            }
        }
        $scope.save = function(Item) {
            var urlS = "https://38drzhtmz4.execute-api.ap-northeast-1.amazonaws.com/dazzle/gallery";
            var paramsS = {
                "operation": "batchWrite",
                "accessKeyId": "sdasda",
                "secretAccessKey": "asdsa",
                "sessionToken": "vhndi757Bydd",
                "RequestItems": {
                    "dazzle-gallery": [{
                        PutRequest: {
                            Item: Item
                        }
                    }]
                }
            };
            console.log(paramsS);
            $http.post(urlS, paramsS).then(function(result) {
                console.log("vvvv save 2");
                console.log(result);
                var pinTo = $scope.getToastPosition();
                $mdToast.show($mdToast.simple().textContent('已儲存').position(pinTo).hideDelay(3000));
                $scope.getTags().then(function(result) {
                    console.log("vvvv getT");
                    $scope.rootScope.tags = result.data;
                });
            });
        }*/
    $scope.selectType = function (type) {
        console.log("vvvv select");
        console.log(type);
        $scope.init(type);
    }
});
app.controller('uploadController', function ($scope, $http, $dazzleS3, $mdBottomSheet, $mdDialog, $dazzleUser, bucket, key, rootScope) {
    console.log("vvvv vvvv 4");
    $scope.privateORpublic = false;
    $scope.bucket = bucket;
    $scope.key = key;
    $scope.uploading = false;
    $scope.rootScope = rootScope;
    $scope.uploadedFiles = [];
    console.log($scope.bucket);
    console.log($scope.key);
    $scope.idArray = [];
    $dazzleS3.getFile("designerrrr", "cusWatermark/" + $scope.rootScope.user.uid + "/image.png").then(function (data) {
        console.log("okkkk check cus");
        $scope.cusWatermarkURL = "https://designerrrr.s3-ap-northeast-1.amazonaws.com/cusWatermark/" + $scope.rootScope.user.uid + "/image.png";
    }, function (err) {
        console.log("okkkk check cus nooooo");
        $scope.cusWatermarkURL = "https://designerrrr.s3-ap-northeast-1.amazonaws.com/new-logo.png";
        $scope.notSet = true;
    });

    //for upload user defind data
    $scope.userType = '相片';
    //$scope.types = ("相片 插畫 3D模型 字型 LOGO 網站樣辦").split(' ').map(function(type) { //use later
    $scope.types = ("相片 插畫 影片").split(' ').map(function (type) {
        return {abbrev: type};
    });
    console.log("vvvv check user or not");
    console.log($dazzleUser.getUser());
    if ($dazzleUser.getUser().type == 'user') {
        $scope.allBoxes = ["版權未明", "私人", "非賣品", "免費下載"];
    } else {
        $scope.allBoxes = ["可出售", "版權未明", "私人", "非賣品", "免費下載"];
    }
    $scope.selecteDboxes = ["私人"];
    $scope.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
            list.splice(idx, 1);
        } else {
            list.push(item);
        }
        if (list.indexOf("可出售") != -1) {
            console.log("vvvv 可出售");
            $scope.privateORpublic = true;
        } else {
            console.log("else");
            console.log($scope.selecteDboxes);
            $scope.privateORpublic = false;
            $scope.authorize = "-";
            $scope.dollar = 0.0;
        }
    };
    $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };

    $scope.cusWatermark = false;
    $scope.cusWatermarkShow = function (tf) {
        if (tf) {
            return "使用自訂水印"
        } else {
            return "使用預設水印"
        }
    }
    $scope.descNew = "-";
    $scope.tagsNew = [];
    $scope.authorize = "-";
    $scope.dollar = 0.0;

    $scope.upload = function () {
        $scope.uploading = true;
        $scope.uploaded = 0;
        for (var i = 0; i < $scope.files.length; i++) {
            console.log($scope.files[i]);
            $scope.uploadThis($scope.files[i]);
        }
    }
    $scope.uploadAgain = function () {
        $scope.uploading = false;
        $scope.uploaded = 0;
        $scope.files = [];
    }
    $scope.uploadThis = function (file) {
        var fid = "id" + new Date().getTime();
        var s3 = new AWS.S3();
        $scope.idArray.push(fid);
        var realFileType = file.lfFileType.substring(file.lfFileType.indexOf("/") + 1);
        if (realFileType == "jpeg") {
            realFileType = "jpg";
        }
        var arrayTOstring = $scope.tagsNew.join(';;');
        switch ($scope.userType) {
            case "相片":
                var diffType = "images/";
                break;
            case "插畫":
                var diffType = "illustration/";
                break;
        }
        var cusMark = "notCus";
        if ($scope.cusWatermark) {
            cusMark = "cus";
        }
        var params = {
            Bucket: "designerrrr",
            Key: diffType + $scope.rootScope.user.uid + "/" + fid + "." + realFileType,
            ContentType: file.lfFileType,
            Body: file.lfFile,
            Metadata: {
                "newVersion": "new",
                "gid": fid.toString(),
                "owner_id": $scope.rootScope.user.uid,
                "original_name": encodeURIComponent(file.lfFileName),
                "galleryType": "photo",
                "category": encodeURIComponent($scope.userType),
                "status": encodeURIComponent($scope.selecteDboxes),
                "tags": encodeURIComponent(arrayTOstring),
                "remark": encodeURIComponent($scope.descNew),
                "authorize": encodeURIComponent($scope.authorize),
                "price": $scope.dollar.toString(),
                "cusWatermark": cusMark
            }
        };
        console.log(params);
        file.upload = s3.upload(params);

        file.upload.on('httpUploadProgress', function (evt) {
            file.uploadProgress = parseInt((evt.loaded * 100) / evt.total);
        });

        file.upload.send(function (err, data) {
            console.log(err);
            console.log(data);
            console.log(file);
            $scope.uploadedFiles.push(file);
            $scope.$apply(function () {
                $scope.uploaded++;
                if ($scope.uploaded == $scope.files.length) {
                    console.log("finish");
                    console.log($scope.files);
                    $mdDialog.show({
                        controller: 'imgLoadPopupController',
                        templateUrl: 'https://dazzle-template.s3.amazonaws.com/file6.0/dashboard/imgLoadPopup.html',
                        clickOutsideToClose: false,
                        fullscreen: false, // Only for -xs, -sm breakpoints.
                        locals: {}
                    })
                }
            });
        });

    }
    $scope.remove = function (index) {
        $scope.files[index].upload.abort();
        $scope.files.splice(index, 1);
        $scope.uploaded--;
        if ($scope.files.length <= 0) {
            $scope.uploading = false;
            $scope.uploaded = 0;
        }
    }
    $scope.close = function () {
        console.log("vvvv close");
        /*
            var uploadedFiles = [];
            for (var i = 0; i < $scope.uploadedFiles.length; i++) {
                var realFileType = $scope.uploadedFiles[i].lfFileType.substring($scope.uploadedFiles[i].lfFileType.indexOf("/") + 1);
                if (realFileType == "jpeg") {
                    realFileType = "jpg";
                }
                /* use later 2017/6/19
                uploadedFiles.push({
                    "bucket": $scope.bucket,
                    "key": $scope.key,
                    "filename": $scope.uploadedFiles[i].lfFileName,
                    "path": $scope.key + $scope.uploadedFiles[i].lfFileName,
                    "type": $scope.uploadedFiles[i].lfFileType,
                })*/
        /*
                            if ($scope.rootScope.type == $scope.userType) {
                                switch ($scope.rootScope.type) {
                                    case "相片":
                                        var diffKey = "images/" + $scope.rootScope.user.uid + "/medium-web/";
                                        var diffPath = "images/" + $scope.rootScope.user.uid + "/medium-web/" + $scope.idArray[i] + ".jpg";
                                        uploadedFiles.push({
                                            "bucket": "designerrrr-output",
                                            "key": diffKey,
                                            "filename": $scope.idArray[i] + "." + realFileType,
                                            "path": diffPath,
                                            "type": $scope.uploadedFiles[i].lfFileType
                                        });
                                        break;
                                    case "插畫":
                                        break;
                                }
                            }
                            console.log(uploadedFiles);
                        }*/
        $mdBottomSheet.hide();
    }
});
app.controller('uploadDocController', function ($scope, $mdBottomSheet, $mdDialog, bucket, key, rootScope) {
    $scope.bucket = bucket;
    $scope.key = key;
    $scope.uploading = false;
    $scope.rootScope = rootScope;
    $scope.uploadedFiles = [];
    console.log($scope.bucket);
    console.log($scope.key);
    $scope.idArray = [];
    $scope.upload = function () {
        $scope.uploading = true;
        $scope.uploaded = 0;
        for (var i = 0; i < $scope.files.length; i++) {
            console.log($scope.files[i]);
            $scope.uploadThis($scope.files[i]);
        }
    }
    $scope.uploadAgain = function () {
        $scope.uploading = false;
        $scope.uploaded = 0;
        $scope.files = [];
    }
    $scope.uploadThis = function (file) {
        var s3 = new AWS.S3();
        var params = {
            Bucket: "dazzle-user-" + $scope.rootScope.user.uid,
            Key: "files/" + file.lfFileName,
            ContentType: file.lfFileType,
            Body: file.lfFile
        };
        file.upload = s3.upload(params);

        file.upload.on('httpUploadProgress', function (evt) {
            file.uploadProgress = parseInt((evt.loaded * 100) / evt.total);
        });

        file.upload.send(function (err, data) {
            console.log(file);
            $scope.uploadedFiles.push(file);
            $scope.$apply(function () {
                $scope.uploaded++;
                if ($scope.uploaded == $scope.files.length) {
                    console.log("finish");
                    console.log($scope.files);
                }
            });
        });

    }
    $scope.remove = function (index) {
        $scope.files[index].upload.abort();
        $scope.files.splice(index, 1);
        $scope.uploaded--;
        if ($scope.files.length <= 0) {
            $scope.uploading = false;
            $scope.uploaded = 0;
        }
    }
    $scope.close = function () {
        console.log("vvvv close");
        console.log($scope.uploadedFiles);
        $mdBottomSheet.hide($scope.uploadedFiles);
    }
});
app.controller('uploadWatermarkController', function ($scope, $mdBottomSheet, $mdDialog, $mdToast, bucket, key, rootScope) {
    console.log("vvvv vvvv 4");
    $scope.bucket = bucket;
    $scope.key = key;
    $scope.uploading = false;
    $scope.rootScope = rootScope;
    $scope.uploadedFiles = [];
    console.log($scope.bucket);
    console.log($scope.key);


    //For toast popup use
    var last = {
        bottom: true,
        top: false,
        left: true,
        right: false
    };
    $scope.toastPosition = angular.extend({}, last);
    $scope.getToastPosition = function () {
        sanitizePosition();
        return Object.keys($scope.toastPosition).filter(function (pos) {
            return $scope.toastPosition[pos];
        }).join(' ');
    };

    function sanitizePosition() {
        var current = $scope.toastPosition;
        if (current.bottom && last.top) current.top = false;
        if (current.top && last.bottom) current.bottom = false;
        if (current.right && last.left) current.left = false;
        if (current.left && last.right) current.right = false;
        last = angular.extend({}, current);
    }

    // /For toast popup use

    $scope.upload = function () {

        console.log($scope.files);
        if ($scope.files.length > 1) {
            var pinTo = $scope.getToastPosition();
            $mdToast.show($mdToast.simple().textContent('只可上載一個檔案').position(pinTo).hideDelay(3000));
            console.log("vvvv <1");
        } else {
            var image = new Image();
            image.onload = function () {
                console.log(this.width, this.height);
                if (this.width == 1000 && this.height == 300) {
                    $scope.uploading = true;
                    $scope.uploaded = 0;
                    for (var i = 0; i < $scope.files.length; i++) {
                        console.log($scope.files[i]);
                        $scope.uploadThis($scope.files[i]);
                    }
                } else {
                    var pinTo = $scope.getToastPosition();
                    $mdToast.show($mdToast.simple().textContent('尺寸必須為1000x300').position(pinTo).hideDelay(3000));
                }
            }
            image.src = $scope.files[0].lfDataUrl;
        }
    }

    $scope.uploadThis = function (file) {
        var s3 = new AWS.S3();
        var params = {
            Bucket: "designerrrr",
            Key: "cusWatermark/" + $scope.rootScope.user.uid + "/image.png",
            ContentType: file.lfFileType,
            Body: file.lfFile
        };
        console.log(params);
        file.upload = s3.upload(params);

        file.upload.on('httpUploadProgress', function (evt) {
            file.uploadProgress = parseInt((evt.loaded * 100) / evt.total);
        });

        file.upload.send(function (err, data) {
            console.log(err);
            console.log(data);
            console.log(file);
            $scope.uploadedFiles.push(file);
            $scope.$apply(function () {
                $scope.uploaded++;
                if ($scope.uploaded == $scope.files.length) {
                    console.log("finish");
                    console.log($scope.files);
                    $mdBottomSheet.hide("ok");
                }
            });
        });

    }
    $scope.remove = function (index) {
        $scope.files[index].upload.abort();
        $scope.files.splice(index, 1);
        $scope.uploaded--;
        if ($scope.files.length <= 0) {
            $scope.uploading = false;
            $scope.uploaded = 0;
        }
    }
    $scope.close = function () {
        console.log("vvvv close");
        var uploadedFiles = [];
        $mdBottomSheet.hide();
    }
});



var app = angular.module('demoApp');
//require(['store'],function(store){

app.directive('newEditorHeader', function ($compile, $timeout, $uibModal, $mdDialog, $mdToast, $dazzleS3,$dazzleData, $dazzleUser, $dazzlePopup,$dazzleInit) {
            // Function save$scope.thisPageJson, save$scope.masterJson, saveRootHtml, saveMasterAtom, save$scope.thisPage
                    // $scope.thisPage => $scope.pagename
                    // $scope.websiteKey => 'website/'+$scope.hostname;

    var newEditorHeader = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "http://d27btag9kamoke.cloudfront.net/builder6.0/newEditorHeader/element.html?id=" + new Date().getTime(),
        controller: function ($scope, $http, $element) {
            

            $scope.init = function() {
                $scope.userBucket = $dazzleUser.getDazzleInfo('userBucket');
                $scope.websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
                $scope.thisPage = $dazzleUser.getDazzleInfo('thisPage');
                console.log('This Page',$scope.thisPage);
                thisLang = $dazzleUser.getDazzleInfo('thisLang');
                $scope.thisPageJson = $dazzleUser.getDazzleInfo('thisPageJson');
                $scope.masterJson = $dazzleUser.getDazzleInfo('masterJson');
                $scope.pageJson = $dazzleUser.getDazzleInfo('pageJson');
                $scope.exportBucket = $dazzleUser.getDazzleInfo('exportBucket');
            }



            $scope.importPage = function(pages){
                angular.forEach(pages,function(page,index){
                    var json = {
                        'pageName':page,
                        '頁面類型': '一般',
                        '新頁':''
                    };
                   $dazzleData.createElasticRecord($dazzleUser.getUser().uid,'page',page, json).then(function(result){
                        console.log(page,'DOne'); 
                   }); 
                });
                
            }

            $scope.pageManager = function() {
                var pageJson = $dazzleUser.getDazzleInfo('pageJson');
                return new Promise(function(resolve,reject){
                    $dazzleS3.getFile($scope.userBucket,$scope.websiteKey+'content/page-data.json').then(function(data){
                            //console.log('Hello');
            //                $scope.importPage(pageJson);
                         $dazzlePopup.dataManagement($dazzleUser.getDazzleInfo('websiteId'), 'page',null).then(function(result) {
                             
                         });
            
                    },function(err){
                        $dazzleData.createTable($dazzleUser.getUser().uid,'page','pageName','dynamodb').then(function(table){
                            $dazzleS3.getJson('dazzle-template','file6.0/page-schema-template.json').then(function(json){
                                $dazzleData.createSchema("page",json).then(function(result){
                                    $scope.importPage(pageJson);
                                });
                            });

                        });
                    });

                });
            }
            
            $scope.saveAtom = function () {
                return new Promise(function (resolve, reject) {
                    $dazzleInit.save().then(function(result){
                       resolve(result); 
                    },function(err){
                        reject(err);
                    });
                });
            };
            /* 
            $scope.save$scope.thisPage = function() {
                return new Promise(function (resolve, reject) {
                    $http.get("http://" + location.hostname + location.pathname).then(function (response) {
                        var raw_html = response.data;
                       // console.log(raw_html);
                        $dazzleS3.saveFile($scope.userBucket, $scope.websiteKey + 'page/' + $scope.thisPage + '/' + "full.html", raw_html).then(function(result){
                            console.log('Full HTML Saved');
                            var object = {
                                "method": "post",
                                "url": "https://d8fz9pfue5.execute-api.ap-northeast-1.amazonaws.com/prod/export62",
                                "data": {
                                    "operation": "default",
                                    "exportPage": $scope.thisPage,
                                    "user": {
                                        "uid": $scope.user.uid,
                                    },
                                    "website": {
                                        "bucket": $scope.exportBucket,
                                        "key" :$scope.websiteKey
                                    }
                                }
                            };
                            console.log(JSON.stringify(object,null,4));
                            $http(object).then(function (result) {
                                console.log(result);
                                resolve();

                            }, function (error) {
                                console.log(error);
                                reject();
                            });
                            
                        },function(err){
                            console.log(err);
                            reject();
                        });

                    });
                });
            }
            $scope.save$scope.thisPageJson = function () {
                return new Promise(function (resolve, reject) {
                    $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'json/' + $scope.thisPage + '.json', $dazzleUser.getDazzleInfo('$scope.thisPageJson')).then(function () {
                        resolve();
                    });
                })
            }
            $scope.save$scope.masterJson = function () {
                return new Promise(function (resolve, reject) {
                    $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'json/master.json', $dazzleUser.getDazzleInfo('$scope.masterJson')).then(function () {
                        resolve();
                    });
                })
            }
            $scope.saveMasterAtom = function () {
                $scope.masterAtom = $dazzleUser.getDazzleInfo('masterAtom');
                return new Promise(function (resolve, reject) {
                    if ($scope.thisLang !== 'zh') {
                        $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'json/masterAtom' + '_' + thisLang + '.json', JSON.parse(angular.toJson($scope.masterAtom))).then(function () {
                            resolve();
                        });
                    } else {
                        $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'json/masterAtom.json', JSON.parse(angular.toJson($scope.masterAtom))).then(function () {
                            resolve();
                        });
                    }
                });
            }
            $scope.saveRootHtml = function () {
                
                return new Promise(function (resolve, reject) {
                    //update all atom
                    $dazzleInit.saveRootHtml().then(function(result){
                        resolve(result); 
                    },function(err){
                        reject(err);
                    });

                });
            }
            
            */
            
            $scope.home = function () {
                location.href = "https://dashboard.dazzle.website/index.html";
            };
            $scope.info = function () {
                $mdDialog.show({
                    controller: 'infoPopupController',
                    templateUrl: 'https://d27btag9kamoke.cloudfront.net/cdn6.0/models/infoPopup/popup.html' + "?id=" + new Date().getTime(),
                    locals: {
                        rootScope: $scope
                    }
                });
            };
            $scope.export = function () {
                // var singlepage = $scope.singlepage;
                // if (singlepage) {
                //     console.log('Single Page');
                //     $scope.saveAtom().then(function () {
                //         $dazzlePopup.popupCall("exportPopup", $scope).then(function (result) {
                //             console.log('Export Finish');
                //         });
                //     });
                // } else {
            
                console.log('Non Single Page');
                $dazzleInit.save().then(function(){
                    $mdDialog.show({
                        templateUrl: 'https://d27btag9kamoke.cloudfront.net/cdn6.0/models/nonSingleExportPopup/popup.html' + '?id=' + new Date().getTime(),
                        controller: 'nonSingleExportPopupController',
                        clickOutsideToClose: true,
                        locals: {
                            rootScope: $scope
                        }
                    });
                });
//                }
            };
            
            $scope.recovery = function () {
                
                $mdDialog.show({
                    templateUrl: 'https://d27btag9kamoke.cloudfront.net/cdn6.0/models/recoveryPopup/popup.html' + '?id=' + new Date().getTime(),
                    controller: 'recoveryPopupController',
                    clickOutsideToClose: true
                }).then(function (date) {
                    console.log('REcovery');
                });
            };
            $scope.directivePopup = function () {
                $dazzlePopup.directivePopup().then(function(result){
                    
                });
                // $mdDialog.show({
                //     controller: 'directivePopupController',
                //     templateUrl: 'https://d27btag9kamoke.cloudfront.net/cdn6.0/models/directivePopup/popup.html' + "?id=" + new Date().getTime(),
                //     locals: {
                //         rootScope: $scope
                //     }
                // });
            };
            $scope.removePage = function () {

                if ($scope.thisPage == 'index') {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('失敗！')
                            .textContent('不能移除' + $scope.thisPage)
                            .ok('Got it!')
                    );
                } else {
                    var confirm = $mdDialog.confirm()
                        .title('是否移除？')
                        .textContent($scope.thisPage + " " + '移除後將不能繼續編緝。')
                        .ok('Yes')
                        .cancel('No');

                    $mdDialog.show(confirm).then(function () {
                        var index = pageJson.indexOf($scope.thisPage);
                        if (index !== -1) {
                            $scope.loading();
                            pageJson.splice(index, 1);
                            $scope.saveJson($scope.userBucket, $scope.websiteKey + 'json/page.json', pageJson).then(function () {
                                //store.set('$scope.thisPage', 'index');
                                $dazzleInit.saveStore('thisPage', 'index');
                                location.reload();
                            });
                        }
                    });
                }
            }
            
            $scope.addPage = function () {
                
                $dazzlePopup.addPagePopup().then(function(result){
                    if (result.useTemplate) {
                        $scope.createPageByTemplate(result.newPageName);
                    } else {
                        $scope.createPage(result.newPageName);
                    } 
                });
                
                // $mdDialog.show({
                //     controller: 'addPagePopupController',
                //     templateUrl: 'https://d27btag9kamoke.cloudfront.net/cdn6.0/models/addPagePopup/popup.html' + "?id=" + new Date().getTime(),
                //     locals: {
                //         rootScope: $scope
                //     }
                // }).then(function (result) {
                //     if (result.useTemplate) {
                //         $scope.createPageByTemplate(result.newPageName);
                //     } else {
                //         $scope.createPage(result.newPageName);
                //     }
                // });
            }
            
            $scope.templatePage = function () {

                $dazzlePopup.loading();
                var copyed = 0;
                $dazzleS3.getFile($scope.userBucket, $scope.websiteKey + 'json/' + $scope.thisPage + '.json').then(function (file) {
                    $dazzleS3.saveFile($scope.userBucket, $scope.websiteKey + 'template/templateJson.json', file).then(function () {
                        copyed++;
                        if (copyed >= 3) {
                            $dazzlePopup.alert('設為模版成功');
                        }
                    });
                });
                $dazzleS3.getFile($scope.userBucket, $scope.websiteKey + 'page/' + $scope.thisPage + '/atom.json').then(function (file) {
                    $dazzleS3.saveFile($scope.userBucket, $scope.websiteKey + 'template/templateAtom.json', file).then(function () {
                        copyed++;
                        if (copyed >= 3) {
                            $dazzlePopup.alert('設為模版成功');
                        }
                    });
                })
                $dazzleS3.getFile($scope.userBucket, $scope.websiteKey + 'page/' + $scope.thisPage + '/page.html').then(function (file) {
                    $dazzleS3.saveFile($scope.userBucket, $scope.websiteKey + 'template/templatePage.html', file).then(function () {
                        copyed++;
                        if (copyed >= 3) {
                            $dazzlePopup.alert('設為模版成功');
                        }
                    });
                })
            }
            $scope.changePage = function (selectedPage) {
                if (selectedPage !== $scope.thisPage) {
                    $scope.loading();
                    $dazzleInit.saveStore('$scope.thisPage', selectedPage);
                    location.href = "http://builder.dazzle.website/page.html?singlePage:===:" + selectedPage + "&&&uid:===:" + $dazzleUser.getUser().uid + "&&&websiteId:===:" + $dazzleUser.getDazzleInfo('websiteId') + "&&&editPage:===:" + selectedPage + "&&&token:===:" + $dazzleUser.getUser().token

//                    store.set('$scope.thisPage', selectedPage);
              //      location.reload();
                }
            }
            $scope.changeLang = function (selectedLang) {
                if (selectedLang !== $scope.thisLang) {
                    $scope.loading();
                    $dazzleInit.saveStore('thislang', selectedLang);
//                    store.set('thislang', selectedLang);
                    location.reload();
                }
            }
            $scope.createPageByTemplate = function (newPageName) {
                $scope.loading();
                var copyed = 0;
                $scope.pageJson.push(newPageName);
                $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'json/page.json', $scope.pageJson).then(function () {
                    copyed++;
                    if (copyed >= 4) {
                        copyDone();
                    }
                });

                $dazzleS3.getFile($scope.userBucket, $scope.websiteKey + 'template/templateJson.json').then(function (file) {
                    $dazzleS3.saveFile($scope.userBucket, $scope.websiteKey + 'json/' + newPageName + '.json', file).then(function () {
                        copyed++;
                        if (copyed >= 4) {
                            copyDone();
                        }
                    });
                });
                $dazzleS3.getFile($scope.userBucket, $scope.websiteKey + 'template/templateAtom.json').then(function (file) {
                    $dazzleS3.saveFile($scope.userBucket, $scope.websiteKey + 'page/' + newPageName + '/atom.json', file).then(function () {
                        copyed++;
                        if (copyed >= 4) {
                            copyDone();
                        }
                    });
                })
                $dazzleS3.getFile($scope.userBucket, $scope.websiteKey + 'template/templatePage.html').then(function (file) {
                    $dazzleS3.saveFile($scope.userBucket, $scope.websiteKey + 'page/' + newPageName + '/page.html', file).then(function () {
                        copyed++;
                        if (copyed >= 4) {
                            copyDone();
                        }
                    });
                })

                function copyDone() {
                    $scope.saveStore('thisPage', newPageName);
//                    store.set('$scope.thisPage', newPageName);
                    location.reload();
                }
            }
            $scope.createPage = function (pagename) {
                //var atom = $dazzleUser.getDazzleInfo('atom');

                if (pageJson.indexOf(pagename) < 0) {
                    $scope.loading();
                    pageJson.push(pagename);
                    AWS.config.region = 'ap-southeast-1';
                    $dazzleS3.getFile("dazzle-template", "file6.0/welcome.html").then(function (html) {
                        AWS.config.region = 'ap-northeast-1';
                        var html = html || '<h2><span style="background-color: initial;">歡迎</span></h2>';
                        var atom = {};
                        var structure = {
                            "title": pagename,
                            "js": [],
                            "css": [],
                            "less": []
                        };
                        Promise.all([
                            $dazzleS3.saveFile($scope.exportBucket, 'js/' + pagename + '.js', ""),
                            $dazzleS3.saveFile($scope.exportBucket, 'css/' + pagename + '.css', ""),
                            $dazzleS3.saveFile($scope.userBucket, $scope.websiteKey + 'page/' + pagename + '/page.html', html),
                            $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'page/' + pagename + '/atom.json', atom),
                            $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'page/' + pagename + '/atom' + '_' + thisLang + '.json', atom),
                            $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'json/' + pagename + '.json', structure),
                            $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'json/page.json', pageJson)
                        ]).then(function () {
                            //$dazzleInit.saveStore('$scope.thisPage', pagename);

                            $dazzleUser.setDazzleInfo('pageJson',pageJson);
                            $dazzleUser.setDazzleInfo('thisPage',pagename);

                            $dazzleInit.loadDirectiveInfo().then(function(){
                                $dazzleInit.loadPageInfo().then(function(){
                                    $dazzleInit.loadAtomInfo().then(function(){
                                        console.log('Change Page Success');
                                        $scope.loadPage();
                                    });
                                });
                            });

                            // $dazzleInit.save().then(function(){
                            //     console.log(pagename);
                            //     //$scope.changePage(pagename);
                            // });
//                            store.set('$scope.thisPage', pagename);
                            //location.reload();
                        });
                    });
                } else {
                    $scope.changePage(pagename);
                }
            }
            $scope.codeManager = function () {
                var $scope.thisPageJson = $dazzleUser.getDazzleInfo('thisPageJson');


                $dazzlePopup.codeManagerPopup().then(function(result){
                    $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'json/' + $scope.thisPage + '.json', $scope.thisPageJson);
                });
                
                // $mdDialog.show({
                //     controller: 'codeManagerPopupController',
                //     templateUrl: 'https://d27btag9kamoke.cloudfront.net/cdn6.0/models/codeManagerPopup/popup.html' + "?id=" + new Date().getTime(),
                //     locals: {
                //         rootScope: $scope
                //     }
                // }).then(function () {
                //     $scope.saveJson($scope.userBucket, $scope.websiteKey + 'json/' + $scope.thisPage + '.json', $scope.thisPageJson);
                // });
            }
            $element.find('input').on('keydown', function (ev) {
                ev.stopPropagation();
            });
        }
    };
    return newEditorHeader;
});

//});
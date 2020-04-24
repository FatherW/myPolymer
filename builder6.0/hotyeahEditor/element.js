var app = angular.module('demoApp');
//require(['store'],function(store){
app.directive('hotyeahHeader', function ($compile, $timeout, $uibModal, $mdDialog, $mdToast, $dazzleS3, $dazzlePopup) {
    var hotyeahHeader = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "http://d25k6mzsu7mq5l.cloudfront.net/builder6.0/hotyeahHeader/element.html?id=" + new Date().getTime(),
//        templateUrl: "http://builder.dazzle.website/directives/hotyeahHeader/directive.html" + "?id=" + new Date().getTime(),
        controller: function ($scope, $http, $element) {
            $scope.saveAtom = function () {
                return new Promise(function (resolve, reject) {
                    $scope.saveThisPageJson();
                    $scope.saveMasterJson();
                    $scope.saveThisPage();
                    $scope.saveRootHtml().then(function () {
                        $scope.saveMasterAtom();
                        console.log("Atom:", $scope.atom);
                        console.log("Master Atom:", $scope.masterAtom);
                        if ($scope.thisLang !== 'zh') {
                            $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'page/' + $scope.thisPage + '/atom' + '_' + $scope.thisLang + '.json', JSON.parse(angular.toJson($scope.atom))).then(function () {
                                $dazzlePopup.toast('儲存成功');
                                resolve();
                            });
                        } else {
                            $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'page/' + $scope.thisPage + '/atom.json', JSON.parse(angular.toJson($scope.atom))).then(function () {
                                $dazzlePopup.toast('儲存成功');
                                resolve();
                            });
                        }
                    });
                });
            };
            $scope.reload = function() {
                    $compile($('body')[0])($scope);

            }
            $scope.saveThisPage = function() {
                return new Promise(function (resolve, reject) {
                    $dazzleS3.saveFile($scope.userBucket,$scope.websiteKey + 'page/'+$scope.thisPage+'/full.html',$scope.fullHtml).then(function(result){
                            console.log('Full HTML Saved');
                            resolve();
                    },function(err){

                    });
                });
            }
            $scope.saveThisPageJson = function () {
                return new Promise(function (resolve, reject) {
                    console.log('save This Page',$scope.thisPageJson);
                    $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'json/' + $scope.thisPage + '.json', $scope.thisPageJson).then(function () {
                        resolve();
                    });
                })
            }
            $scope.saveMasterJson = function () {
                return new Promise(function (resolve, reject) {
                    $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'json/master.json', $scope.masterJson).then(function () {
                        resolve();
                    });
                })
            }
            $scope.saveMasterAtom = function () {
                return new Promise(function (resolve, reject) {
                    if ($scope.thisLang !== 'zh') {
                        $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'json/masterAtom' + '_' + $scope.thisLang + '.json', JSON.parse(angular.toJson($scope.masterAtom))).then(function () {
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
                    console.log('Save Root HTML');
                    angular.forEach(angular.element(document.querySelectorAll("[custom]")), function (e, index) {
                        var element = angular.element(e);
                        var id = element.attr('id');
                        var scope = element.scope();
                        if (!angular.isUndefined(scope.beforeAtomSaved)) {
                            scope.beforeAtomSaved();
                        }
                        if (!angular.isUndefined(scope.atom[id])) {
                            var tmpElement = element.clone();
                            $scope.unwrap(tmpElement);
                            scope.atom[id].html = tmpElement.html()
                                .replace(/(\sng-\w+-\w+="(.|\n)*?"|\sng-\w+="(.|\n)*?"|\sng-(\w+-\w+)|\sng-(\w+))/g, "")
                                .replace(/<!--(.*?)-->/gm, "")
                        }
                        if (!angular.isUndefined(scope.afterAtomSaved)) {
                            scope.afterAtomSaved();
                        }
                        if (element.closest("[master]").length >= 1) {
                            $scope.masterAtom[id] = $scope.atom[id];
                        }
                    });
                    // angular.forEach(angular.element(document.querySelectorAll("[text], text")), function (e, index) {
                    //     var element = angular.element(e);
                    //     var id = element.attr('id');
                    //     var scope = element.scope();
                    //     if (!angular.isUndefined(scope.beforeAtomSaved)) {
                    //         scope.beforeAtomSaved();
                    //     }
                    //     if (!angular.isUndefined(scope.afterAtomSaved)) {
                    //         scope.afterAtomSaved();
                    //     }
                    // });

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
                        $scope.unwrap(element);
                        if (angular.isUndefined($scope.masterAtom[id])) {
                            $scope.masterAtom[id] = {
                                "id": id,
                                "masterId": id,
                                "type": "editor-container-element",
                                "html": element.html()
                                    .replace(/(\sng-\w+-\w+="(.|\n)*?"|\sng-\w+="(.|\n)*?"|\sng-(\w+-\w+)|\sng-(\w+))/g, "")
                                    .replace(/<!--(.*?)-->/gm, "")
                            }
                        } else {
                            $scope.masterAtom[id].html = element.html()
                                .replace(/(\sng-\w+-\w+="(.|\n)*?"|\sng-\w+="(.|\n)*?"|\sng-(\w+-\w+)|\sng-(\w+))/g, "")
                                .replace(/<!--(.*?)-->/gm, "")
                        }
                    });
                    //save Data
                    var singlepage = $scope.singlepage;
                    console.log($scope.thisPageJson);
                    if($scope.thisPageJson.hasOwnProperty("exportDatas") && $scope.thisPageJson.hasOwnProperty("exportTable")){
                        console.log('Single Page');
                        var thisPageJson = $scope.thisPageJson;
                        var exportTable = thisPageJson.exportTable;
                        var exportKey = thisPageJson.exportKey;
                        var exportDatas = thisPageJson.exportDatas;
                        console.log(exportDatas);
                        $dazzleS3.getJson($scope.userBucket, $scope.websiteKey + 'content/' + exportTable + '-data.json').then(function (json) {
                            angular.forEach(json, function (item, index) {
                                if (item[exportKey] == exportDatas[exportKey]) {
                                    json[index] = exportDatas;
                                    $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'content/' + exportTable + '-data.json', json);
                                }
                            });

                        });
                    }

                    //save rootHtml
                    if ($scope.templateMode) {
                        
                        resolve();
                    } else {
                        var rootHtml = $('#root').clone();
                        $scope.unwrap(rootHtml);
                        if ($scope.thisLang !== 'zh') {
                            $dazzleS3.saveFile($scope.userBucket, $scope.websiteKey + 'page/' + $scope.thisPage + '/page' + '_' + $scope.thisLang + '.html', rootHtml.html()
                                .replace(/(\sng-\w+-\w+="(.|\n)*?"|\sng-\w+="(.|\n)*?"|\sng-(\w+-\w+)|\sng-(\w+))/g, "")
                                .replace(/<!--(.*?)-->/gm, ""))
                        } else {
                            $dazzleS3.saveFile($scope.userBucket, $scope.websiteKey + 'page/' + $scope.thisPage + '/page.html', rootHtml.html()
                                .replace(/(\sng-\w+-\w+="(.|\n)*?"|\sng-\w+="(.|\n)*?"|\sng-(\w+-\w+)|\sng-(\w+))/g, "")
                                .replace(/<!--(.*?)-->/gm, ""))
                        }
                        resolve();
                    }
                });
            }
            $scope.home = function () {
                location.href = "https://dashboard.dazzle.website/index.html";
            };
            $scope.info = function () {
                $mdDialog.show({
                    controller: 'infoPopupController',
                    templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/infoPopup/popup.html' + "?id=" + new Date().getTime(),
                    locals: {
                        rootScope: $scope
                    }
                });
            };
            $scope.export = function () {

                
                 $scope.saveAtom().then(function(){
                    console.log('Non Single Page');
                    $mdDialog.show({
                        templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/nonSingleExportPopup/popup.html' + '?id=' + new Date().getTime(),
                        controller: 'nonSingleExportPopupController',
                        clickOutsideToClose: true,
                        locals: {
                            rootScope: $scope
                        }
                    });                     
                 });

            };
            $scope.recovery = function () {
                $mdDialog.show({
                    templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/recoveryPopup/popup.html' + '?id=' + new Date().getTime(),
                    controller: 'recoveryPopupController',
                    clickOutsideToClose: true,
                    locals: {
                        rootScope: $scope
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
                                folder: $scope.websiteKey,
                                bucket: $scope.userBucket,
                                exportBucket: $scope.exportBucket,
                                recoveryTime: date
                            }
                        }).then(function (result) {
                            $scope.saveStore('thispage', 'index');
//                            store.set('thispage', 'index');
                            location.reload();
                        }, function () {
                            $scope.rootScope.loadingWithTimer("正在還原", "正在還原網站，需時約60秒。", 60).then(function () {
                                $scope.saveStore('thispage', 'index');
//                                store.set('thispage', 'index');
                                location.reload();
                            });
                        });
                    }, function () {
                        $scope.recovery();
                    });
                });
            };
            $scope.directivePopup = function () {
                $mdDialog.show({
                    controller: 'directivePopupController',
                    templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/directivePopup/popup.html' + "?id=" + new Date().getTime(),
                    locals: {
                        rootScope: $scope
                    }
                });
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
                        var index = $scope.pageJson.indexOf($scope.thisPage);
                        if (index !== -1) {
                            $scope.loading();
                            $scope.pageJson.splice(index, 1);
                            $scope.saveJson($scope.userBucket, $scope.websiteKey + 'json/page.json', $scope.pageJson).then(function () {
                                //store.set('thispage', 'index');
                                $scope.saveStore('thispage', 'index');
                                location.reload();
                            });
                        }
                    });
                }
            }
            $scope.addPage = function () {
                $mdDialog.show({
                    controller: 'addPagePopupController',
                    templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/addPagePopup/popup.html' + "?id=" + new Date().getTime(),
                    locals: {
                        rootScope: $scope
                    }
                }).then(function (result) {
                    if (result.useTemplate) {
                        $scope.createPageByTemplate(result.newPageName);
                    } else {
                        $scope.createPage(result.newPageName);
                    }
                });
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
                    $scope.saveStore('thispage', selectedPage);
//                    store.set('thispage', selectedPage);
                    location.reload();
                }
            }
            $scope.changeLang = function (selectedLang) {
                if (selectedLang !== $scope.thisLang) {
                    $scope.loading();
                    $scope.saveStore('thislang', selectedLang);
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
                    $scope.saveStore('thispage', newPageName);
//                    store.set('thispage', newPageName);
                    location.reload();
                }
            }
            $scope.createPage = function (pagename) {
                if ($scope.pageJson.indexOf(pagename) < 0) {
                    $scope.loading();
                    $scope.pageJson.push(pagename);
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
                            $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'page/' + pagename + '/atom' + '_' + $scope.thisLang + '.json', atom),
                            $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'json/' + pagename + '.json', structure),
                            $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'json/page.json', $scope.pageJson)
                        ]).then(function () {
                            $scope.saveStore('thispage', pagename);
//                            store.set('thispage', pagename);
                            location.reload();
                        });
                    });
                } else {
                    $scope.changePage(pagename);
                }
            }
            $scope.codeManager = function () {
                $mdDialog.show({
                    controller: 'codeManagerPopupController',
                    templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/codeManagerPopup/popup.html' + "?id=" + new Date().getTime(),
                    locals: {
                        rootScope: $scope
                    }
                }).then(function () {
                    $scope.saveJson($scope.userBucket, $scope.websiteKey + 'json/' + $scope.thisPage + '.json', $scope.thisPageJson);
                });
            }
            $element.find('input').on('keydown', function (ev) {
                ev.stopPropagation();
            });
        }
    };
    return hotyeahHeader;
});

//});
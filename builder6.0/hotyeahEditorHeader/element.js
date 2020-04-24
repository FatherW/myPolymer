var app = angular.module('demoApp');
//require(['store'],function(store){
jQuery.noConflict();
(function( $ ) {
  $(function() {
        app.directive('hotyeahEditorHeader', function ($compile, $timeout, $uibModal, $mdDialog, $mdToast, $dazzleS3,$dazzleData, $dazzleUser, $dazzlePopup,$dazzleInit) {
                    // Function save$scope.thisPageJson, save$scope.masterJson, saveRootHtml, saveMasterAtom, save$scope.thisPage
                            // $scope.thisPage => $scope.pagename
                            // $scope.websiteKey => 'website/'+$scope.hostname;
        
            var hotyeahEditorHeader = {
                restrict: 'E',
                priority: 1000,
                scope: true,
                templateUrl: "//d25k6mzsu7mq5l.cloudfront.net/builder6.0/hotyeahEditorHeader/element.html?id=" + new Date().getTime(),
                controller: function ($scope, $http, $element) {
                    
                    $scope.isAdmin = false;

                    $scope.init = function() {
                        var filename = location.pathname.substring(location.pathname.lastIndexOf('/')+1);
                        
                        $scope.userBucket = $dazzleUser.getDazzleInfo('userBucket');
                        $scope.websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
                        $scope.websiteId = $dazzleUser.getDazzleInfo('websiteId');
                        $scope.thisPage = $dazzleUser.getDazzleInfo('thisPage');

                        $scope.thisPageJson = $dazzleUser.getDazzleInfo('thisPageJson');
                        $scope.masterJson = $dazzleUser.getDazzleInfo('masterJson');
                        $scope.pageJson = $dazzleUser.getDazzleInfo('pageJson');
        
                        $scope.exportBucket = $dazzleUser.getDazzleInfo('exportBucket');
                        
                        
                        
                        $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "getData",
                            "index": "5metal.dazzle.website",
                            "type": "company",
                            "id": "31771"
                        }
                    }).then(function (result) {
                        //console.log(result);
                        if (result.data.code < 0) {
                            console.log('Unsuccess');
                        } else {
                            console.log('Company Success');
                            $scope.hello = result.data.resolve['title'];
                        }

                    });
                        
                        
                    }
                    $scope.imageManager = function() {
                        var params = {
                            name: "dzUserGalleryPopup",
                            directive:"<dz-user-gallery-popup></dz-user-gallery-popup>"
                        };
        
                        $dazzlePopup.callPopup(params).then(function(output){
                            //var image = output['image'];
                        });
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
                        $scope.pageJson = $dazzleUser.getDazzleInfo('pageJson');
                        return new Promise(function(resolve,reject){
                            $dazzleS3.getFile($scope.userBucket,$scope.websiteKey+'content/page-data.json').then(function(data){
                                    //console.log('Hello');
                    //                $scope.importPage($scope.pageJson);
                                 $dazzlePopup.dataManagement($dazzleUser.getDazzleInfo('websiteId'), 'page',null).then(function(result) {
                                     
                                 });
                    
                            },function(err){
                                $dazzleData.createTable($dazzleUser.getUser().uid,'page','pageName','dynamodb').then(function(table){
                                    $dazzleS3.getJson('dazzle-template','file6.0/page-schema-template.json').then(function(json){
                                        $dazzleData.createSchema("page",json).then(function(result){
                                            $scope.importPage($scope.pageJson);
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
                    
                    $scope.saveBody = function() {
                        $('.dz-overlay').remove();
                        $('.dz-border').removeClass('dz-border');
                        var html = $('dz-container > div').html();
                        //console.log(html);
                        console.log($scope.userBucket, $scope.websiteKey + 'page/' + $scope.thisPage + '/body.html');
                        return new Promise(function (resolve, reject) {
                            $dazzleS3.saveFile($scope.userBucket, $scope.websiteKey + 'page/' + $scope.thisPage + '/body.html', html).then(function () {
                                $dazzlePopup.toast('Body 儲存成功');
                                resolve();
                            });
                        });
                    }
        
                    $scope.save = function() {
                        return new Promise(function (resolve, reject) {
                            $scope.saveBody();
//                            $dazzleUser.dazzleInfo['bodyHtml'] = html;
                            $dazzleInit.save().then(function(result){
                               resolve(result); 
                            },function(err){
                                reject(err);
                            });
                        });
        
                    }
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
                            $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'json/' + $scope.thisPage + '.json', $dazzleUser.getDazzleInfo('thisPageJson')).then(function () {
                                resolve();
                            });
                        })
                    }
                    $scope.save$scope.masterJson = function () {
                        return new Promise(function (resolve, reject) {
                            $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'json/master.json', $dazzleUser.getDazzleInfo('masterJson')).then(function () {
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
                        location.href = "http://www.hot-yeah.com";
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
        
                        console.log('Non Single Page');
                        //var paths = $scope.websiteKey.split("/");
                        var path = $scope.websiteKey;
                        path = path.replace("website/"+$scope.exportBucket+"/","");
                        //path = path.replace("page/","");
                        console.log(path);
                        console.log($scope.exportBucket,path+$scope.thisPage);
                        $dazzleS3.getFile($scope.exportBucket,path+$scope.thisPage).then(function(html){
                          var ele = angular.element(html);
//                            console.log('Angular',ele('html').html());
                           var ele1 = $(html);
                           console.log('Jquery',ele1('html').html());
                           var body = $dazzleUser.dazzleInfo['bodyHtml'];
                           ele.children('body').html(body);
                          // console.log(ele.html());
                           html ="<html>"+ele.html()+"</html>";
                           console.log(html);
                           
                           //$dazzleS3.saveFile($scope.exportBucket,path+$scope.thisPage,html).then(function(result){
                            //  $dazzlePopup.toast('匯出成功');
                        //    });
                        });
                        
                        // $dazzleInit.save().then(function(){
                        //     var params = {
                        //       name : 'dzExportPopup',
                        //       directive: '<dz-export-popup></dz-export-popup>'
                        //     };
                        //     $dazzlePopup.callPopup(params).then(function(result){
                                
                        //     });
        
                        // });
                        
                        
                    };
                    
                    $scope.recovery = function () {
        
                        var params = {
                          name : 'recoveryPopup',
                          directive: '<recovery-popup></recovery-popup>'
                        };
                        $dazzlePopup.callPopup(params).then(function(result){
                            
                        });
                        // $mdDialog.show({
                        //     templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/recoveryPopup/popup.html' + '?id=' + new Date().getTime(),
                        //     controller: 'recoveryPopupController',
                        //     clickOutsideToClose: true
                        // }).then(function (date) {
                        //     console.log('REcovery');
                        // });
                    };
                    $scope.directivePopup = function () {
                        $dazzlePopup.directivePopup().then(function(result){
                            
                        });
                        // $mdDialog.show({
                        //     controller: 'directivePopupController',
                        //     templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/directivePopup/popup.html' + "?id=" + new Date().getTime(),
                        //     locals: {
                        //         rootScope: $scope
                        //     }
                        // });
                    };
                    
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
                
                            }, 2000);
                        }
                    $scope.reload = function() {
                        
                        $dazzleInit.loadDirectiveInfo().then(function(){
                            $dazzleInit.loadPageInfo().then(function(){
        						$dazzleInit.loadAtomInfo().then(function(){
        							console.log('End');
        							$scope.loadPage();
        						});
        					});
                        });
                    }
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
                                        //store.set('thisPage', 'index');
                                        $dazzleInit.saveStore('thisPage', 'index');
                                        location.reload();
                                    });
                                }
                            });
                        }
                    }
                    
                    $scope.logout = function() {
                        store.clearAll();
                        location.reload();
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
                        //     templateUrl: 'https://d25k6mzsu7mq5l.cloudfront.net/cdn6.0/models/addPagePopup/popup.html' + "?id=" + new Date().getTime(),
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
                            $dazzleInit.saveStore('thisPage', selectedPage);
                            location.href = "http://builder.dazzle.website/page.html?singlePage:===:" + selectedPage + "&&&uid:===:" + $dazzleUser.getUser().uid + "&&&websiteId:===:" + $dazzleUser.getDazzleInfo('websiteId') + "&&&editPage:===:" + selectedPage + "&&&token:===:" + $dazzleUser.getUser().token
        
        //                    store.set('thisPage', selectedPage);
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
        //                    $scope.saveStore('thisPage', newPageName);
        //                    store.set('thisPage', newPageName);
        //                    location.reload();
                                $scope.changePage(newPageName);
                        }
                    }
                    $scope.createPage = function (pagename) {
                        //var atom = $dazzleUser.getDazzleInfo('atom');
        
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
                                    $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'page/' + pagename + '/atom' + '_' + thisLang + '.json', atom),
                                    $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'json/' + pagename + '.json', structure),
                                    $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'json/page.json', $scope.pageJson)
                                ]).then(function () {
                                    $dazzleInit.saveStore('thisPage', pagename);
                                    $scope.changePage(pagename);
        
                                    // $dazzleUser.setDazzleInfo('pageJson',$scope.pageJson);
                                    // $dazzleUser.setDazzleInfo('thisPage',pagename);
                                    //
                                    // $dazzleInit.loadDirectiveInfo().then(function(){
                                    //     $dazzleInit.loadPageInfo().then(function(){
                                    //         $dazzleInit.loadAtomInfo().then(function(){
                                    //             console.log('Change Page Success');
                                    //             $scope.loadPage();
                                    //         });
                                    //     });
                                    // });
        
                                    // $dazzleInit.save().then(function(){
                                    //     console.log(pagename);
                                    //     //$scope.changePage(pagename);
                                    // });
        //                            store.set('thisPage', pagename);
                                    //location.reload();
                                });
                            });
                        } else {
                            $scope.changePage(pagename);
                        }
                    }
                    $scope.codeManager = function () {
                        $scope.thisPageJson = $dazzleUser.getDazzleInfo('thisPageJson');
        
                        var params = {
                          name: 'dzCodeManagerPopup',
                          directive: '<dz-code-manager-popup></dz-code-manager-popup>'
                        };
                        $dazzlePopup.callPopup(params).then(function(result){
                            $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'json/' + $scope.thisPage + '.json', $scope.thisPageJson);
                        });
                        
                        // $dazzlePopup.codeManagerPopup().then(function(result){
                        //     $dazzleS3.saveJson($scope.userBucket, $scope.websiteKey + 'json/' + $scope.thisPage + '.json', $scope.thisPageJson);
                        // });
                        
                    }
                    $element.find('input').on('keydown', function (ev) {
                        ev.stopPropagation();
                    });
                }
            };
            return hotyeahEditorHeader;
        }); 
 
 
 
 
  });
})(jQuery);
 



//});
var app = angular.module('demoApp');
// jQuery.noConflict();
// (function( $ ) {
//   $(function() {
        app.directive('dzEditorHeader', function ($compile, $timeout, $uibModal, $mdDialog, $mdToast, $dazzleS3,$dazzleData,$dazzleFn, $dazzleUser, $dazzlePopup,$dazzleInit,$dazzleElastic,hotkeys,pageInfo){
                    // Function save$scope.thisPageJson, save$scope.masterJson, saveRootHtml, saveMasterAtom, save$scope.thisPage
                            // $scope.thisPage => $scope.pagename
                            // $scope.websiteKey => 'website/'+$scope.hostname;
        
        
        
        
            var dzEditorHeader = {
                restrict: 'E',
                priority: 1000,
                scope: true,
                templateUrl: "//d27btag9kamoke.cloudfront.net/builder6.0/dzEditorHeader/element.html?id=" + new Date().getTime(),
                controller: function ($scope, $http, $element) {
                    var html,length;
				    document.getElementById("myBar").style.width = $scope.percent*10 + "px";

                    $scope.thisPage = pageInfo.thisPage;
					$scope.percent = 0;
                        hotkeys.add({
                            combo: 'ctrl+z',
                            callback: function() {
                                length = dzFn.info['version'].length;
                                html = dzFn.info['version'][length-1];
                                dzFn.info['version'].pop();
                                $('dz-container').html(html);
                            }
                        });
					   hotkeys.add({
						combo: 'ctrl+down',
						description: 'This one goes to 11',
						callback: function() {
							store.set('editMode','normal');
							$scope.logout();
						}
					  });
					   hotkeys.add({
						combo: 'ctrl+w',
						description: 'This one goes to 11',
						callback: function() {
							console.log('Stop Watch');
							for (var i = 1; i < 99999; i++)
								window.clearInterval(i);
							setInterval(function(){
									if ($dazzleUser.dazzleInfo['isCheck'])
										$dazzleUser.dazzleInfo['isCheck'] = false;
							},250);

						}
					  });
					   hotkeys.add({
						combo: 'ctrl+shift+s',
						description: 'Save',
						callback: function() {
							$scope.save();
						}
					  });
                    hotkeys.add({
                        combo: 'ctrl+shift+p',
                        description: 'This Page Info Edit',
                        callback: function() {
                            $scope.thisPageManager();
                        }
                    });
					  
                    hotkeys.add({
                        combo: 'ctrl+shift+e',
                        description: 'Export',
                        callback: function() {
                            $scope.export();
                        }
                    });
					  hotkeys.add({
						combo: 'a',
						description: 'This one goes to 11',
						callback: function(e) {
								 if ($dazzleUser.dazzleInfo['isEdit'])
									return;
								 $scope.percent = 100;
                                 e.preventDefault();
                                 document.getElementById("myBar").style.width = $scope.percent*10 +"px";
                                 $dazzleUser.dazzleInfo['overlayDepth'] = $scope.percent;
						}
					  });
					  
					  hotkeys.add({
						combo: 'z',
						description: 'This one goes to 11',
						callback: function(e) {
								 if ($dazzleUser.dazzleInfo['isEdit'])
									return;
								 $scope.percent = 0;
                                 e.preventDefault();
                                 document.getElementById("myBar").style.width = $scope.percent*10 +"px";
                                 $dazzleUser.dazzleInfo['overlayDepth'] = $scope.percent;
						}
					  });
					  
					  hotkeys.add({
						combo: 'right',
						description: 'This one goes to 11',
						callback: function(e) {
								 if ($dazzleUser.dazzleInfo['isEdit'])
									return;
								 if ($scope.percent<100)
                                    $scope.percent += 1;
                                 e.preventDefault();
                                 document.getElementById("myBar").style.width = $scope.percent*10 +"px";
                                 $dazzleUser.dazzleInfo['overlayDepth'] = $scope.percent;
						}
					  });
					  
					  hotkeys.add({
						combo: 'left',
						description: 'This one goes to 11',
						callback: function(e) {
                                console.log('Left');
								 if ($dazzleUser.dazzleInfo['isEdit'])
									return;
                                console.log('Left 2');	
                                 if ($scope.percent>0)
                                    $scope.percent -= 1;
                                console.log('Left',$scope.percent);
								e.preventDefault();
								document.getElementById("myBar").style.width = $scope.percent*10 +"px";
								$dazzleUser.dazzleInfo['overlayDepth'] = $scope.percent;
						}
					  });
					  
//                    var barWidth;
/*                     document.getElementById("myBar").style.width = $scope.percent*10 + "px";
                     document.body.onkeydown = function(e){
                      
                         console.log('Key: ',e.keyCode);
                         if ($dazzleUser.dazzleInfo['isEdit'])
                            return;
                            
                         switch(e.keyCode){
                             case 38:
                                 if ($scope.percent<100)
                                    $scope.percent += 1;
                                 e.preventDefault();
                                 document.getElementById("myBar").style.width = $scope.percent*10 +"px";
                                 $dazzleUser.dazzleInfo['overlayDepth'] = $scope.percent;
                                 break;
                            case 40:
                                 if ($scope.percent>0)
                                    $scope.percent -= 1;
                                e.preventDefault();
                                document.getElementById("myBar").style.width = $scope.percent*10 +"px";
                                $dazzleUser.dazzleInfo['overlayDepth'] = $scope.percent;
                                break;
							case 87:
								console.log('Stop Watch');
								for (var i = 1; i < 99999; i++)
									window.clearInterval(i);
								setInterval(function(){
										if ($dazzleUser.dazzleInfo['isCheck'])
											$dazzleUser.dazzleInfo['isCheck'] = false;
								},250);
							break;
                         }

                     }
  */                           
                      $scope.changeBackground = function(){
                                    var allEle = $('dz-container').find('*');
                                    var  bgArray  =[];
                                    var id;
                                    console.log(allEle);
                                    allEle.each(function(){
                                       var bg = $(this).css('background-image'); 
                                        console.log('Background',bg);
                                        if (bg!='none') {
                                           id = $(this).attr('id') || 'bg-'+new Date().getTime(); 
                                           $(this).attr('id',id);
                                            bgArray.push($(this));
                                        }
                                    });
                                    
                                    console.log('BG array',bgArray);
                                    var params = {
                                        name: 'dzBackgroundPopup',
                                        directive: '<dz-background-popup></dz-background-popup>',
                                        items: bgArray
                                    }
                                    $dazzlePopup.callPopup(params).then(function(result){
                                        result.forEach(function(){
                                           id = $(this).attr('id'); 
                                        });
                                    });
                               
                        }
	$dazzleElastic.getUserElasticTables = function() {

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
                    $scope.isAdmin = false;
                    
                    $scope.profile = function() {
                          var params = {
                            name: "userProfilePopup",
                            directive:"<user-profile-popup></user-profile-popup>"
                        };
        
                        $dazzlePopup.callPopup(params).then(function(output){
                            //var image = output['image'];
                        });
                    }
                    $scope.init = function() {
        //                 var filename = location.pathname.substring(location.pathname.lastIndexOf('/')+1);
        //
        //                 $scope.userBucket = $dazzleUser.getDazzleInfo('userBucket');
        //                 $scope.websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
        //                 $scope.websiteId = $dazzleUser.getDazzleInfo('websiteId');
        //                 $scope.thisPage = pageInfo.thisPage;
        // //                $scope.thisDecodePage = decodeURIComponent($scope.thisPage);
        // //                $scope.websiteId = location.hostname;
        // //                $dazzleUser.dazzleInfo['websiteId'] = $scope.websiteId;
        // //                $scope.thisPage = filename;
        //  //               $dazzleUser.dazzleInfo['thisPage'] = $scope.thisPage;
        // //                $scope.thisPage = $dazzleUser.getDazzleInfo('thisPage');
        //                 console.log('This Page',$scope.thisPage);
        // //                thisLang = $dazzleUser.getDazzleInfo('thisLang');
        //
        //                 $scope.thisPageJson = $dazzleUser.getDazzleInfo('thisPageJson');
        //                 $scope.masterJson = $dazzleUser.getDazzleInfo('masterJson');
        //                 $scope.pageJson = $dazzleUser.getDazzleInfo('pageJson');
        //
        //                 $scope.exportBucket = $dazzleUser.getDazzleInfo('exportBucket');
        //
        //                 $dazzleElastic.getUserElasticTables().then(function(list){
        //                     $dazzleUser.dazzleInfo['tableList'] = list;
        //                 });

                        
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
        
                    $scope.logout = function() {
                        
                        store.clearAll();
                        
                        location.href = $scope.thisPage;

                        
                    }
                    
                    $scope.thisPageManager = function() {
                        var params = {
                            name : 'pageInfoManagerPopup',
                            directive: '<page-info-manager-popup></page-info-manager>'
                        };
                        $dazzlePopup.callPopup(params).then(function(result){
                            
                        });
                        
                    }
                    $scope.pageManager = function() {
                        
                        var params = {
                            name:'dzDataPopup',
                            directive: '<dz-data-popup></dz-data-popup>',
                            table: '_page',
                            tableLabel: '頁面管理'
                        };
                        $dazzlePopup.callPopup(params).then(function(result){
                            
                        });
  
                    }
        
                    $scope.loadDatabase = function() {
                        
                        console.log('Table List',$dazzleUser.dazzleInfo['tableList']);
                        var params = {
                            name:'dzDataPopup',
                            directive: '<dz-data-popup></dz-data-popup>'
                        };
                        $dazzlePopup.callPopup(params).then(function(result){
                            
                        });
  
                    }
                    $scope.importPage = function(pages){
                        angular.forEach(pages,function(page,index){
                            var json = {
                                'pageName':page,
                                '頁面類型': '一般',
                                '語言':'繁體'
                            };
                           $dazzleData.createElasticRecord($dazzleUser.getUser().uid,'_page',page, json).then(function(result){
                                console.log(page,'DOne'); 
                           }); 
                        });
                        
                    }
        
                 /*   $scope.pageManager = function() {
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
                    */

                    $scope.saveAtom = function () {
                        return new Promise(function (resolve, reject) {
                            
                            $dazzleFn.saveAtom();
                        });
                    };
                    
     //                $scope.saveMaster = function() {
     //                    var html,id;
     //                    $('.dz-border').removeClass('dz-border');
     //                    $('dz-overlay').remove();
     //
     //                    console.log('Save Master');
     //                    $("*[dz-master]").each(function(index){
     //                        html = $(this).html();
     //                        id = $(this).attr('id');
     //                        console.log('Master ID',id);
     //                        console.log($scope.userBucket, $scope.websiteKey + 'page/' + $scope.thisPage + '/master-'+id+'.html');
     //                         $dazzleS3.saveFile($scope.userBucket, $scope.websiteKey + 'page/_master/'+id+'.html', html).then(function () {
     //                            $dazzlePopup.toast('Master 儲存成功');
     //                        },function(err){
     //                            console.log('Error',err);
     //                        });
     //                    });
     //                }
     //                $scope.saveBody = function() {
	//
	// 				   return new Promise(function (resolve, reject) {
	// 						$('.dz-border').removeClass('dz-border');
	// 						$('dz-overlay').remove();
	//
	// 						var body = $('dz-container').html();
	// 						var data = store.get('html');
	// 						var user = store.get('user');
	// 						var html='';
	// 						const $dzHtml = cheerio.load(data);
	//
	// 						$dzHtml('body').html(body);
	// 						body = $dzHtml('body').html();
	// 						head = $dzHtml('head').html();
	// 						html = $dzHtml.html();
	// 						html = "<html>"+html+"</html>";
	// 						console.log('BODY',html);
	// //						Promise.all([
	// 								$dazzleS3.saveFile("dazzle-user-"+user['uid'], location.hostname + $scope.thisPage + '/myPage.html', html);
	// 								$dazzleS3.saveFile("dazzle-user-"+user['uid'], location.hostname + $scope.thisPage + '/body.html', body);
	// 								$dazzleS3.saveFile("dazzle-user-"+user['uid'], location.hostname + $scope.thisPage + '/head.html', head);
	// 	//					]).then(function () {
	// 								$dazzlePopup.toast('儲存成功');
	// 								resolve();
	// 		//				});
     //                   });
     //                }
        
                    $scope.save = function() {
						console.log('Save');

                            pageInfo.save();
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
                    $scope.compilePage = function() {
                       var master,body,fullText,allHtml,head;
                       return new Promise(function (resolve, reject) {
                          //Get Master
                            var path,ele,fullText,head;
                          console.log('Location',window.location.hostname);
                          console.log('Location',window.location.pathname);
                          path = window.location.pathname;
                          path = path.replace("/admin/","");
                          
                            $dazzleS3.getFile(window.location.hostname,path).then(function(file){

                            //   master = file;
                            //   console.log('Master',master);
                              ele = angular.element(file);
                              head = ele.find('head').html();
                              $dazzleS3.getFile($scope.userBucket,$scope.websiteKey+'page/'+$scope.thisPage+'/body.html').then(function(body){
                                    
                                    //ele.find('body').html(body);
                                    // body = file;
                                    // fullText = master.replace("[[[BODY]]]",body);
                                    //fullText = ele.find('html').html();
                                    //console.log(ele);
                                    //console.log(fullText);
                                    fullText = "<html><head>"+head+"</head><body>"+body+"</body></html>";
                                    console.log($scope.userBucket,$scope.thisPage,fullText);
                                    $scope.exportBucket = "yot2.dazzle.website";
                                    $dazzleS3.saveFile($scope.exportBucket,$scope.thisPage,fullText).then(function(result){
                                        console.log('成功匯出');
                                        $dazzlePopup.toast('成功匯出');
                                        resolve();
                                    });
                                    resolve();
                              });
                            });
                          // Get Body
                       });
                    }
                    
                    $scope.export = function () {
						pageInfo.export();

				 //      $scope.save().then(function(){
                  //         $scope.compilePage().then(function(result){
                  //             
                  //         });
                  //      });
                                          
                        
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
                            var user = store.get('user');
                            var userBucket = 'dazzle-user-'+user['uid'];
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
            return dzEditorHeader;
        }); 


// window.onscroll = function() {myFunction()};

// function myFunction() {
//   var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
//   var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
//   var scrolled = (winScroll / height) * 100;
//   document.getElementById("myBar").style.width = scrolled + "%";
// }
 
 
//   });
// })(jQuery);
 


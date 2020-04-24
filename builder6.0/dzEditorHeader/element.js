var app = angular.module('demoApp');
        app.directive('dzEditorHeader', function ($compile, $timeout, $mdDialog, $mdToast, $dazzleS3,$dazzleUser, $dazzlePopup,hotkeys,pageInfo,dzFn,dzS3,userInfo){
            var dzEditorHeader = {
                restrict: 'E',
                priority: 1000,
                scope: true,
                templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/dzEditorHeader/element.html?id=" + new Date().getTime(),
                css: {
                  href: "https://d27btag9kamoke.cloudfront.net/builder6.0/dzEditorHeader/element.css?id=" + new Date().getTime(),
                  
                  preload: true
                },
                 compile : function(elements, attributes){
                    return{
                        pre : function(scope,element,attribute) {
                           
        
                        },
                        post : function(scope, element, attribute){
                        }
                    };
                 },
                controller: function ($scope, $http, $element) {
                    var html,length;
                    document.getElementById("myBar").style.width = $scope.percent*10 + "px";

                    $scope.thisPage = pageInfo.thisPage;
                    $scope.percent = 100;
                    $scope.depth= 0;
                    document.getElementById("myBar").style.width = $scope.percent*10 +"px";
                    $dazzleUser.dazzleInfo['overlayDepth'] = $scope.percent;
                    $('dz-overlay').remove();
                    
                       
                      hotkeys.add({
                        combo: 'ctrl+down',
                        description: 'This one goes to 11',
                        callback: function() {
                            store.set('editMode','normal');
                            store.set('user',null);
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
                        combo: 'ctrl+r',
                        description: 'reload',
                        callback: function() {
                            $scope.reload();
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
                            pageInfo.export();
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
                                 $('dz-overlay').remove();
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
                                 $('dz-overlay').remove();
                        }
                      });
                      
                      hotkeys.add({
                        combo: 'up',
                        description: 'This one goes to 11',
                        callback: function(e) {
                                 if ($dazzleUser.dazzleInfo['isEdit'])
                                    return;
                                 $scope.depth += 1;
                                 $dazzleUser.dazzleInfo['myDepth'] = $scope.depth;
                                 var depth = 0;
                                 var ele = $dazzleUser.dazzleInfo['editElement'];
                                    $('.dz-border').removeClass('dz-border');
                                    ele.parents().each(function(){

                                        if (depth==$dazzleUser.dazzleInfo['myDepth']) {
                                            $(this).addClass('dz-border');
                                            $dazzleUser.dazzleInfo['editElement'] = $(this);
                                        }
                                        depth++;            
                                        console.log('parent',$(this)); 
                                    });                              

                                 
                                 e.preventDefault();
                                 $('dz-overlay').remove();
                        }
                      });
                      
                      hotkeys.add({
                        combo: 'down',
                        description: 'This one goes to 11',
                        callback: function(e) {
                                 if ($dazzleUser.dazzleInfo['isEdit'])
                                    return;
                                    if ($scope.depth<=0){
                                        alert("已是最底層.");
                                        return;
                                    }
                                    
                                 $scope.depth -= 1;
                                 $dazzleUser.dazzleInfo['myDepth'] = $scope.depth;
                                  var depth = 0;
                                 var ele = $dazzleUser.dazzleInfo['editElement'];
                                    $('.dz-border').removeClass('dz-border');
                                    ele.parents().each(function(){

                                        if (depth==$dazzleUser.dazzleInfo['myDepth']) {
                                            $(this).addClass('dz-border');
                                            $dazzleUser.dazzleInfo['editElement'] = $(this);
                                        }
                                        depth++;            
                                        console.log('parent',$(this)); 
                                    });                              

                                 
                                 e.preventDefault();
                                 $('dz-overlay').remove();
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
                                 $('dz-overlay').remove();
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
                                $('dz-overlay').remove();
                        }
                      });
                      
                        
                      $scope.changeBackground = function(){
                                    var allEle = $('dz-container').find('*');
                                    var imgEle = $('dz-container').find('img');
                                    var  bgArray  =[],imgArray=[];
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
                                    imgEle.each(function(){
                                       var bg = $(this).attr('src'); 
                                        console.log('Image',bg);
                                        id = $(this).attr('id') || 'img-'+new Date().getTime(); 
                                        $(this).attr('id',id);
                                        imgArray.push($(this));
                                   
                                    });

                                    
                                    console.log('BG array',bgArray);
                                    var params = {
                                        name: 'dzBackgroundPopup',
                                        directive: '<dz-background-popup></dz-background-popup>',
                                        items: bgArray,
                                        image_items:imgArray
                                    }
                                    $dazzlePopup.callPopup(params).then(function(result){
                                        //result.forEach(function(){
                                         //  id = $(this).attr('id'); 
                                        //});
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
                        store.set('user',null);
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
                    $scope.dataSettings = function(){
                         var params ={
                            'name':"dzDatasetSettingsPopup",
                            "directive":"<dz-dataset-settings-popup></dz-dataset-settings-popup>",
                            "settings": {}
                        }
                        $dazzlePopup.callPopup(params).then(function(db){
                            console.log('DB',db);

                        });                       
                    }
                    $scope.dataManager = function() {
                         dzS3.getData('table.json').then(function(tableList){
                            var params = {
                                name: 'dzSelectPopup',
                                directive: '<dz-select-popup></dz-select-popup>',
                                options: tableList,
                                select: tableList[0].id,
                                width:"300px"
                            }
                            
                            dzFn.callPopup(params).then(function(tableId){
                               $scope.loadDatabase(tableId); 
                            });
                            // $dazzlePopup.callPopup(params).then(function(tableId){
                            //     $scope.loadDatabase(tableId);
                            // });                             
                             
                         });

  
                    }
        
                    $scope.loadDatabase = function(tableId) {
                        
                        console.log('Table List',$dazzleUser.dazzleInfo['tableList']);
                        var params = {
                            name:'dzDataPopup2',
                            directive: '<dz-data-popup2></dz-data-popup2>',
                            width: '90%',
                            table: tableId
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
        
                    /* $scope.pageManager = function() {
                        $scope.pageJson = $dazzleUser.getDazzleInfo('pageJson');
                        return new Promise(function(resolve,reject){
                            $dazzleS3.getFile($scope.userBucket,$scope.websiteKey+'content/page-data.json').then(function(data){
                     
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
                    } */


                    $scope.saveAtom = function () {
                        return new Promise(function (resolve, reject) {
                            
                            //$dazzleFn.saveAtom();
                        });
                    };
                    
    
                    $scope.save = function() {
                        console.log('Save');

                            pageInfo.save();
                    }
                    
                    var load = false;
                    $scope.reload = function(){
//                        dzFn.reload();

/*                       var bodyScript = pageInfo.model.bodyScript || null;
                       if (!load){
                            $("<div id='dz-script'>"+bodyScript+"</div>").insertAfter($('dz-container'));                        
                            load = true;
                       } else {
                            $('#dz-script').remove();
                            $compile($('body').contents())($scope);
                            load=false;
                       }                      
*/
						if (userInfo.user['uid'] == 'dazzleadmin') {
							$('dz-container').html('<dashboard></dashboard>');
							$compile($('body').contents())($scope);
						}
                    }
                   
                    $scope.home = function () {
                       // location.href = "http://www.hot-yeah.com";
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
                    /*
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
                    } */
                    
                    $scope.export = function () {
                        var params = {
                          name: "dzExportPopup",
                          directive: '<dz-export-popup></dz-export-popup>'
                        };
                        
                        $dazzlePopup.callPopup(params).then(function(result){
                            
                        });
                        
                    };
                    
                    $scope.recovery = function () {
        
                        var params = {
                          name : 'recoveryPopup',
                          directive: '<recovery-popup></recovery-popup>',
                          page: userInfo.thisPage,
                          bucket: userInfo.exportBucket
                        };
                        $dazzlePopup.callPopup(params).then(function(result){
                            
                        });
                    };
                    
                    $scope.directivePopup = function () {
                        $dazzlePopup.directivePopup().then(function(result){
                            
                        });
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
                    
                    $scope.removePage = function () {
        
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
                       
                    }
                    $scope.changeLang = function (selectedLang) {
                   
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


 


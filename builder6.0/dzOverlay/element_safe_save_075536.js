var app = angular.module('demoApp');

// jQuery.noConflict();
// (function( $ ) {
//   $(function() {
      
app.directive('dzOverlay', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzleS3,$dazzleInit,$dazzlePopup,$dazzleData,$dazzleFn) {
    var dzOverlay = {
        restrict: 'EA',
        priority: 1000,
        scope: true,
        templateUrl: "//d27btag9kamoke.cloudfront.net/builder6.0/dzOverlay/element.html?id=" + new Date().getTime(),
        compile: function (tElem, tAttrs) {
           console.log(': compile');
           console.log(tElem.html());
           return {
               pre: function ($scope, iElem, iAttrs) {

                    $dazzleInit.editorCustomInit($scope, iElem, iAttrs);
                
                    var ele = $dazzleUser.dazzleInfo['overlayEle'];
                    var size = $dazzleUser.dazzleInfo['overlaySize'];
                    var isInMaster = false;
                    // height = ele[0].offsetHeight;
                    // width = ele[0].offsetWidth;  
                    // //top = target[0].offsetTop;
                    // //left = target[0].offsetLeft;
                    // top = ele.offset().top;
                    // left = ele.offset().left;
                    master = ele.attr('dz-master');
                    console.log('Size',size.width,size.height,size.top,size.left);
                
                    iElem.css('position','absolute');
                    iElem.css('width',size.width);
                    iElem.css('height',size.height);
                    iElem.css('top',size.top);
                    iElem.css('left',size.left);
                    if (size.master)
                        iElem.css('background','rgba(255,0,0,0.3)');
                    else
                        iElem.css('background','rgba(0,0,0,0.3)');
                        
                    
                    ele.parents()
                      .map(function() {
                          var thisEle = angular.element(this);
                          var isMaster = thisEle.attr('dz-master');
                          if (!angular.isUndefined(isMaster)) 
                            isInMaster = true;
                      });    
                    
                    if (isInMaster)
                         iElem.css('background','rgba(255,0,0,0.3)');                       
                        

               },
               post: function (scope, iElem, iAttrs) {
                   console.log(': post link');
                  // $compile(iElem)(scope);
                  
                   iElem.bind('dblclick', function($event){
                        console.log("It's a double click");
                         
                        isSingleClick = false;
                        
                        setTimeout(function(){
                            isSingleClick = true;
                            return;
                        }, 500);
  
                         $dazzleUser.dazzleInfo['isEdit'] = true;
                        // $dazzleUser.dazzleInfo['needCompile'] = true;
                        $dazzleUser.dazzleInfo['addPanel'] = true;
                        iElem.remove();




                     });
               }
           }
       },
        link: function (scope, element, attrs) {
            scope.http = "//d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "dzOverlay";
            scope.type = "dzOverlay";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
 

        },
        controller: function ($scope, $element, $attrs) {
            
            $scope.target = $dazzleUser.dazzleInfo['overlayEle'];
            console.log('Target',$scope.target);

            if ($scope.target.find('img').length==1)
                $dazzleUser.dazzleInfo['panelType']['image'] =true;
            if ($scope.target.find('a').length==1)
                $dazzleUser.dazzleInfo['panelType']['link'] =true;

            // var size = $dazzleUser.dazzleInfo['overlaySize'];
            // var ele = $scope.target;
            // if (!size.master) {
            //     var parentEls = $scope.target.parents()
            //       .map(function() {
            //           var master = this.attr('dz-master');
            //             if (!angular.isUndefined(master)) {
            //                 ele.attr('dz-master','');
            //                 $compile(ele)($scope);
            //                 $element.remove();                            
            //             }

            //       });
                
            // }


            $scope.menuOptions = [
                ["編輯", function () {
                    var ele = $scope.target;

                    $dazzleUser.dazzleInfo['isEdit'] = true;
                    // $dazzleUser.dazzleInfo['needCompile'] = true;
                    $dazzleUser.dazzleInfo['addPanel'] = true;
                    $element.remove();
                }],
                
                ["啟用／取消Master", function () {
                    var ele = $scope.target;
                    var master = ele.attr('dz-master');
                    if (!angular.isUndefined(master))
                        ele.removeAttr('dz-master');
                    else
                        ele.attr('dz-master','');
                    $compile(ele)($scope);
                    $element.remove();
                }],
                ["刪除", function ($itemScope) {
                    var ele = $scope.target;
                    ele.remove();                    
                    $element.remove();
                }]
            ];
            
            
            $scope.menuOptions.push(["元件",[ 
				["樣式編輯", function ($itemScope) {
					var ele=$scope.target;
					var cls = ele.attr('class')||'';
					var confirm = $mdDialog.prompt()
					  .title('更改樣式')
					  .placeholder('諭輸入內容')
					  .initialValue(cls)
					  .required(true)
					  .ok('OK')
					  .cancel('取消');
				
					$mdDialog.show(confirm).then(function(result) {
						ele.attr('class',result);
					}, function() {

					});
				}],

				["向上複製", function ($itemScope) {
                    
                    var ele = $scope.target;
                    var id = ele.attr('id');
                    if (angular.isUndefined(id)){
                        id =new Date().getTime();
                        ele.attr('id',id);
                    }

                    var cloneEle = $('#'+id).clone();
                    cloneEle.attr('id',new Date().getTime());
                    
                    var ele2 = angular.element(cloneEle);
                    ele2.insertBefore(ele);
                    $compile(ele2)($scope);
                    $element.remove(); 
                    
                }],
                ["向下複製", function ($itemScope) {
                    var ele = $scope.target;
                    var id = ele.attr('id');
                    if (angular.isUndefined(id)){
                        id =new Date().getTime();
                        ele.attr('id',id);
                    }

                    var cloneEle = $('#'+id).clone();
                    cloneEle.attr('id',new Date().getTime());
                    
                    var ele2 = angular.element(cloneEle);
                    ele2.insertAfter(ele);
                    $compile(ele2)($scope);
                    $element.remove();                    

                }]
            ]
            ]);
			
			$scope.menuOptions.push(["資料",[ 
				["資料綁定", function ($itemScope) {
                        var dzEle;
                        var ele = $scope.target;
                        var id = ele.attr('id');
					   
					   if (ele.parents('dz-data').length) {
                            alert('I find It');
                            // ele.closest( "dz-data" ).css('background','red');
                            // alert(ele.closest('dz-data').attr('id'));
                            
                            dzEle = ele.parents('dz-data')[0];
                            dzEle.css('border','red solid 1px');
                            ele.parents('dz-data').each(function(index){
                            //   console.log('DZ DATA',$(this)); 
                              console.log('DZ DATA',$(this).attr('id'));
                            });
                        } 
						
				}],
				
				["欄位綁定", function ($itemScope) {
						var json = {
							table: 'activity',
							count: 2
						};
				}],
				["重載資料", function ($itemScope) {

				
				}],
				["模版置入", function ($itemScope) {
					  var ele = $scope.target;
					  var id;
                        console.log('DZ DATA',ele);
					   var addLink = false;
//                        var linkEle = dbFactory.findDataParent(ele);
                        if (linkEle) {
                            addLink = true;
                            id = linkEle.attr('id');
                        }
                        
                        var parentEls = $scope.target.parents()
                          .map(function() {
                              console.log('TAG NAME',this.tagName);
                              if (this.tagName =='DZ-DATA') {
                                addLink = true;

                                linkEle = angular.element(this);
                                console.log('Link',linkEle);
                                id = linkEle.attr('id');
                              }
            
                          });
                          
            
                        if (addLink) {
                            $dazzleUser.dazzleInfo['data'][id]['template'] = ele[0].outerHTML;   
                            console.log('DZ DATA',$dazzleUser.dazzleInfo);
                        } else {
                            $dazzlePopup.toast('資料未曾綁定，無法置入模板。');
                        }					 
				
				}],
				["取消資料綁定", function ($itemScope) {
                    
                }]
            ]
            ]);
            $scope.menuOptions.push(["背景",[ 
                ['更換背景', function () {
                    var ele = $scope.target;
					console.log('Background Ele',ele);
					console.log('Background Ele',ele.css('background-image'));												
					var child = ele.find('*');					
					angular.forEach(child,function(item,index){
						console.log('Background Ele',item.css('background-image'));												
					});

                    var params = {
                        name: "dzUserGalleryPopup",
                        directive:"<dz-user-gallery-popup></dz-user-gallery-popup>"
                    };

                    $dazzlePopup.callPopup(params).then(function(output){
                        console.log('Ele',ele);
                        ele.css('background-image', 'url('+$dazzleFn.getFileUrl('large-web',output.gid)+')');
//                        $dazzleInit.useTemplate($scope);
                    });

                }],
                ["取消背景", function () {
                    var ele = $scope.target;

                        ele.css('background', 'none');
//                  
                }]
            ]
            ]);
           if ($scope.target.find('ul').length==1) {
                var ele = $scope.target.find('ul');
                console.log('Image',$scope.target);
               $scope.menuOptions.push(["選單",[ 
                    ["選單更新", function () {

								
						var menu = [];
						angular.forEach(ele.find('li'),function(el,index) {
								var json = {};
								var item = angular.element(el);
								json['title']= item.text();
								json['link'] = item.find('a').attr('href') || '#';
								json['class'] = item.attr('class') || '';
								json['html'] = item.html();
								json['id'] = "item-" + new Date().getTime();
								json['list'] =[];
								menu.push(json);
						});				
						var params = {
							menu: menu,
							directive: "<menu-popup></menu-popup>"
						};
						
						$dazzlePopup.callPopup(params).then(function(menu){
							console.log('Menu',menu);
							var ul = angular.element("<ul></ul>");
							angular.forEach(menu,function(item,index) {
								var li = angular.element("<li></li>");							
								var a = angular.element("<a></a>");
								a.text(item['title']);
								a.attr('href',item['link']);
								li.append(a);		
								li.attr('class',item['class']);
								ul.append(li);
							});
							console.log(ul.html());
							ele.html(ul.html());
							/*angular.forEach(ele.find('li'),function(el,index) {
									var json = {};
									var item = angular.element(el);
									item.text(menu[index]['title']);
									item.find('a').attr('href',menu[index]['link']);
									item.attr('class',menu[index]['class']);
							});*/	
						});
                    }],
				   ["選單模板", function () {
                    
                    }]

                 ]
                ]);
            }

           
            if ($scope.target.find('img').length==1) {
                var ele = $scope.target.find('img');
                console.log('Image',$scope.target);
               $scope.menuOptions.push(["圖片",[ 
                    ["更換圖片", function () {
                    
                        var params = {
                            name: "dzUserGalleryPopup",
                            directive:"<dz-user-gallery-popup></dz-user-gallery-popup>"
                        };
    
                        $dazzlePopup.callPopup(params).then(function(output){
                            ele.attr('src',$dazzleFn.getFileUrl('large-web',output.gid) );
                        });
                    }]
                 ]
                ]);
            }
            
            var addLink = false;
            var linkEle;
            var parentEls = $scope.target.parents()
              .map(function() {
                  if (this.tagName =='A') {
                    addLink = true;
                    linkEle = angular.element(this);
                    console.log('Link',linkEle);
                  }

              });
              
              if ($scope.target[0].tagName=='A') {
                addLink = true;
                linkEle = $scope.target;
              }

                
            if (!addLink)  
                if ($scope.target.find('a').length==1) {
                    linkEle = $scope.target.find('a');
                    addLink = true;
                }
              
            

            if (addLink) {
//                var ele = $scope.target.find('a');
                var ele = linkEle;
                console.log('a',ele);
                 $scope.menuOptions.push(["連結",[
                        
                        ["編緝連結文字", function ($itemScope) {
                             var confirm = $mdDialog.prompt()
                              .title('更改連結文字')
                              .placeholder('諭輸入內容')
                              .initialValue(ele.text())
                              .required(true)
                              .ok('OK')
                              .cancel('取消');
                        
                            $mdDialog.show(confirm).then(function(result) {
                                ele.text(result);
                            }, function() {
        
                            });
                        }],
                        ["編輯連結頁", function ($itemScope,$event) {
                               console.log('My Element',$itemScope,$event);
                               var ele = angular.element($event.target);
                               console.log(ele);
                               var link= ele.attr('href');
                              location.href = link;
                        }],
                        ["開新連結頁", function ($itemScope,$event) {
                            var params = {
                                name:"dzNewPagePopup",
                                directive:"<dz-new-page-popup></dz-new-page-popup>"
                            };
                            $dazzlePopup.callPopup(params).then(function(output) {
                                console.log('Link',ele);
                                ele.attr('href', output['link']);
            
                            });                                 
                            
                        }],
                        ["更換連結", function () {
                    
                            var params = {
                                name:"dzLinkPopup",
                                element: ele,
                                oldLink: ele.attr('href'),
                                directive:"<dz-link-popup></dz-link-popup>"
                            };
                            $dazzlePopup.callPopup(params).then(function(output) {
                                console.log('Link',ele);
                                ele.attr('href', output['link']);
            
                            });     
                        }]
                     ]
                    ]);
            }    
            if ($scope.target.find('form').length==1) {
                var ele = $scope.target.find('form');
                console.log('a');
                $scope.menuOptions.push(["編輯表單", function () {
                
                    var params = {
                        name:"dzFormSettingsPopup",
                        directive:"<dz-form-popup></dz-form-popup>",
                        formEle: ele
                    };
                    $dazzlePopup.callPopup(params).then(function(output) {
                        console.log(output);

                    });     
                }]);
            }    
            if ($scope.target.find('label').length==1) {
                var labelEle = $scope.target.find('label');
                console.log('Element',labelEle);
                                
                var label = labelEle.text();
                $scope.menuOptions.push(["編輯標籤", function () {
                            var confirm = $mdDialog.prompt()
                                .title('你要變更資料嗎?')
                                .textContent('輸入你的資料')
                                .initialValue(label)
                                .required(true)
                                .ok('變更')
                                .cancel('取消');

                            $mdDialog.show(confirm).then(function(result) {
                                labelEle.text(result);
                                changeModel(labelEle,result);
                            });    
                }]);
            }    
            
            if ($scope.target.find('input').length==1) {
                var ele = $scope.target.find('input');
                console.log('input');
                $scope.menuOptions.push(["表單元素編輯", function () {
                
                    var params = {
                        name:"dzDataSettingsPopup",
                        direction:'pull',
                        database:"hotyeah",
                        table: 'form',
                        field: 'name',
                        directive:"<dz-data-settings-popup></dz-data-settings-popup>"
                    };
                    $dazzlePopup.callPopup(params).then(function(output) {


                    });     
                }]);
            }    

            function changeModel(ele,name){
                var item = ele.parent().find('input');
                if (!angular.isUndefined(item))
                    item.attr('ng-model',"form['"+name+"']");
            }
        }
    };
    return dzOverlay;
});



// }
// })
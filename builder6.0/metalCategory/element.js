var app = angular.module('demoApp');

app.directive('metalCategory', function ($compile, $timeout,  $mdDialog, $mdToast, $dazzleS3,$dazzleUser, $dazzlePopup, $ocLazyLoad) {
            // Function save$scope.thisPageJson, save$scope.masterJson, saveRootHtml, saveMasterAtom, save$scope.thisPage
                    // $scope.thisPage => $scope.pagename
                    // $scope.websiteKey => 'website/'+$scope.hostname;

    var metalCategory = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/metalCategory/element.html?id=" + new Date().getTime(),
        controller: function ($scope, $http, $element) {
            $ocLazyLoad.load("//5metal.dazzle.website/js/5metal.js");
            $scope.catChildren =[];
            $scope.subCatStatus = -1;
            
             $scope.getCategoryParent = function(){
                    console.log('Tid To Category');
                    return new Promise(function (resolve, reject) {
            
                        console.log('company Init');
                        $http({
                            "method": "post",
                            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                            "data":{
                                "action": "searchData",
                                "index": "5metal.dazzle.website",
                                "type": "product_category",
                                "body": {
                                    "query":{
                                        "match":{
                                            "parent": "0"
                                        }
                                    }
                                }
            
                            }
                        }).then(function (result) {
                            console.log(result);
                            if (result.data.code < 0) {
                                $scope.catParent = [];
                                resolve([]);
                            } else {
                                $scope.catParent = result.data.resolve;
                                resolve(result.data.resolve);
                            }
                        });
                    });
                }
                $scope.isShow = function(){
                    if ($scope.subCatStatus>0){
                        console.log('Show is true');
                        return true;
                        
                    }
                    else{
                        console.log('Show is false');
                        return false;
                        
                    } 

                }
             $scope.getCategoryChildren = function(tid){
                    console.log('Tid To Category');
                    return new Promise(function (resolve, reject) {
            
                        console.log('company Init');
                        $http({
                            "method": "post",
                            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                            "data":{
                                "action": "searchData",
                                "index": "5metal.dazzle.website",
                                "type": "product_category",
                                "body": {
                                    "query":{
                                        "match":{
                                            "parent":tid
                                        }
                                    }
                                }
            
                            }
                        }).then(function (result) {
                            console.log(result);
                            if (result.data.code < 0) {
                                $scope.catChildren[tid] = [];
                                resolve([]);
                            } else {
                                $scope.catChildren[tid] = result.data.resolve;
                                resolve(result.data.resolve);
                            }
                        });
                    });
                }
                
            $scope.showPanel = function(){
                var left,top,cat_id;
                cat_id = $scope.subCatStatus;
                console.log($scope.subCatStatus);
                switch($scope.subCatStatus){
                    case 1:
                        left = '218px';
                        top: '126px';
                    break;
                    case 2:
                        left = '386px';
                        top: '126px';
                    break;
                    case 4:
                        left = '554px';
                        top: '126px';
                    break;
                    case 5:
                        left = '722px';
                        top: '126px';
                    break;
                    case 8:
                        left = '218px';
                        top: '294px';
                    break;
                    case 7:
                        left = '386px';
                        top: '294px';
                    break;
                    case 6:
                        left = '554px';
                        top: '294px';
                    break;
                    case 3:
                        left = '722px';
                        top: '294px';
                    break;
                    case -1:

                    break;
                }
                console.log('Top',top);
                if ($scope.subCatStatus>0) {
                    $('.arrow_up').css('left',left);
                    $('.home_category .sub_categories').css('top',top);
                    $('.home_category .sub_categories .sub_category').hide();
                    $('.home_category .sub_categories #sub_category_'+cat_id).show();
                    $('.home_category .sub_categories').css('display','block');
                }
                else {
                	$(".home_category .sub_categories").slideUp("fast",function(){
            			$(".home_category .sub_category").hide();
            		});                                            
                }
            }    
            $scope.hidePanel = function() {
                $scope.subCatStatus = -1;
            	$(".home_category .sub_categories").slideUp("fast",function(){
        			$(".home_category .sub_category").hide();
        		});
            }
            $scope.mouseenter = function(cat_id) {
                var top,left;
                console.log('Mouse Enter',cat_id);
//                	var cat_id = $(this).attr("rel");
 //               	$scope.show_subcategory(cat_id);
                $scope.subCatStatus = cat_id;
                console.log($scope.subCatStatus);
                switch($scope.subCatStatus){
                    case 1:
                        left = '218px';
                        top= '126px';
                    break;
                    case 2:
                        left = '386px';
                        top= '126px';
                    break;
                    case 4:
                        left = '554px';
                        top= '126px';
                    break;
                    case 5:
                        left = '722px';
                        top= '126px';
                    break;
                    case 8:
                        console.log('Case 8');
                        left = '218px';
                        top= "294px";
                    break;
                    case 7:
                        left = '386px';
                        top= '294px';
                    break;
                    case 6:
                        left = '554px';
                        top= '294px';
                    break;
                    case 3:
                        left = '722px';
                        top= '294px';
                    break;
                    case -1:

                    break;
                }
                console.log('Top',top);
                if ($scope.subCatStatus>0) {
                    $('.arrow_up').css('left',left);
                    $('.home_category .sub_categories').css('top',top);
                    $('.home_category .sub_categories .sub_category').hide();
                    $('.home_category .sub_categories #sub_category_'+cat_id).show();
                    $('.home_category .sub_categories').css('display','block');
                }
                else {
                	$(".home_category .sub_categories").slideUp("fast",function(){
            			$(".home_category .sub_category").hide();
            		});                                            
                }
        
            }    
            
            $scope.mouseleave = function(){
                    console.log('Mouse Leave');
            	    
	                //$scope.subCatStatus = -1;
                    
            }
            $scope.show_subcategory = function(cat_id){
                //  	var obj = $(".home_category .categories li a[rel='"+cat_id+"']");
                // 	if(!obj.length){ return; }
                	//$.scrollTo( '.home_category', 800 , {offset: {top:-80, left:0} } );
                	//$(".home_category .sub_category:visible").fadeOut("fast");
                	//$("#sub_category_"+cat_id).fadeIn("fast");

                	$(".home_category .sub_category:visible").hide();
                	$("#sub_category_"+cat_id).show();
                	$(".home_category .sub_categories").slideDown("fast");

                	var cat_pos = $(".home_category").offset();
                	var obj_pos = obj.offset();
                	var obj_l = obj_pos.left - cat_pos.left+58;
                	var obj_t = obj_pos.top - cat_pos.top+70;

                	if(obj_t < 230){
                			//obj_t+=60;
                	}

                	$(".home_category .sub_categories").css("top",obj_t+"px");
                	$(".home_category .sub_categories .arrow_up").css("left",obj_l+"px");               
            }    
        }
    };
    return metalCategory;
}); 
 
 

                // $(document).ready(function(){
                    
                //     var category_id = 0
            

                // 	$("#wrapper").click(function(){
                // 			$(".home_category .sub_categories").slideUp("fast",function(){
                // 			$(".home_category .sub_category").hide();
                // 		});
                // 	});


                // 	$(".home_category .categories li a").mouseenter(function(){
                // 		var cat_id = $(this).attr("rel");
                // 		show_subcategory(cat_id);
                // 	})

                // 	$(".cat_inner_wrapper").mouseleave(function(){
                // 		//$(".home_category .sub_category").hide("fast");
                // 		/*
                // 		if(category_id){
                // 			show_subcategory(category_id);
                // 			return;
                // 		}
                // 		*/
                // 		$(".home_category .sub_categories").slideUp("fast",function(){
                // 			$(".home_category .sub_category").hide();
                // 		});
                // 	});

                // 	if(category_id){
                // 		show_subcategory(category_id);
                // 	}
                // });

                // function show_subcategory(cat_id){
                // 	var obj = $(".home_category .categories li a[rel='"+cat_id+"']");
                // 	if(!obj.length){ return; }
                // 	//$.scrollTo( '.home_category', 800 , {offset: {top:-80, left:0} } );
                // 	//$(".home_category .sub_category:visible").fadeOut("fast");
                // 	//$("#sub_category_"+cat_id).fadeIn("fast");

                // 	$(".home_category .sub_category:visible").hide();
                // 	$("#sub_category_"+cat_id).show();
                // 	$(".home_category .sub_categories").slideDown("fast");

                // 	var cat_pos = $(".home_category").offset();
                // 	var obj_pos = obj.offset();
                // 	var obj_l = obj_pos.left - cat_pos.left+58;
                // 	var obj_t = obj_pos.top - cat_pos.top+70;

                // 	if(obj_t < 230){
                // 			//obj_t+=60;
                // 	}

                // 	$(".home_category .sub_categories").css("top",obj_t+"px");
                // 	$(".home_category .sub_categories .arrow_up").css("left",obj_l+"px");
                // }

 
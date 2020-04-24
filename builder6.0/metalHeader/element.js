var app = angular.module('demoApp');

app.directive('metalHeader', function ($compile, $timeout, $uibModal, $mdDialog, $mdToast, $dazzleS3,$dazzleData, $dazzleUser, $dazzlePopup,$dazzleInit) {
            // Function save$scope.thisPageJson, save$scope.masterJson, saveRootHtml, saveMasterAtom, save$scope.thisPage
                    // $scope.thisPage => $scope.pagename
                    // $scope.websiteKey => 'website/'+$scope.hostname;

    var metalHeader = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/metalHeader/element.html?id=" + new Date().getTime(),
        controller: function ($scope, $http, $element) {
            	var nav_ani;
            	$scope.logout = function(){
            	    store.clearAll();
            	    location.reload();
            	}
            	
            	$scope.isUser = function() {
            	     var uid = store.get('uid');
            	     if (!angular.isUndefined(uid))
            	        return true;
            	     else
            	        return false;
            	}
                $scope.init = function(page){
                    $scope.uid = store.get('uid');
                    $scope.uname = store.get('uname');
                    $scope.page = page;
                    console.log('User',$scope.uname);
                    init_nav();
                    init_searchnav();
            		$(".nav_subs .nav_sub").removeClass("active");

                    if (page==2)
            			$("#subnav_products").addClass("active");
                    if (page==3)
            			$("#subnav_companys").addClass("active");
                    
                }           
                $scope.changeTab = function(e){
                    $('.search ul li a').removeClass('active');
                    ele = e.currentTarget;
                    ele.addClass('active');
                }
                
                function init_searchnav(){
                	$(".search ul li a").click(function(){
                		$(".search ul li a").removeClass("active");
                		$(this).addClass("active");
                		return false;
                	});
                }

                function init_nav() {
                    	$(".nav_group ul.nav_main").append("<li class='float_nav'></li>");
                    	float_nav();
                    
                    	$(".nav_group ul.nav_main li").mouseenter(function(){
                    		var rel = $(this).find("a").attr("rel");
                    		$(".nav_subs .nav_sub").removeClass("active");
                    		if(rel && $("#subnav_"+rel).length){
                    			$("#subnav_"+rel).addClass("active");
                    		}
                    
                    		$(".nav_group ul.nav_main li.current").removeClass("current");
                    		$(this).addClass("current");
                    		float_nav($(this));
                    	});
                    
                    	$(".nav_group").mouseleave(function(e){
                    		var rel= $(".nav_group .nav_main .float_nav").attr("rel");
                    		if(rel && $("#subnav_"+rel).length){
                    			//if(!$(e.target).closest("#subnav_"+rel)){
                    				$(".nav_group ul.nav_main li.current").removeClass("current");
                    				$(".nav_group ul.nav_main li.active").addClass("current");
                    				float_nav();
                    			//}
                    		}else{
                    			$(".nav_group ul.nav_main li.current").removeClass("current");
                    			$(".nav_group ul.nav_main li.active").addClass("current");
                    			float_nav();
                    		}
                    		
                    		if($(e.target).closest(".nav_subs")){
                    			return;
                    		}
                    		var active_rel = $(".nav_group ul.nav_main li.active a").attr("rel");
                    		$(".nav_subs .nav_sub").removeClass("active");
                    		if(active_rel && $("#subnav_"+active_rel).length){
                    			$("#subnav_"+active_rel).addClass("active");
                    		}
                    	});
                }
                function float_nav(obj){
                	$(".nav_subs .nav_sub").removeClass("active");
                	var float_nav = $(".nav_group .nav_main .float_nav");
                
                	if(!obj){
                		obj = $(".nav_group .nav_main li.active");
                	}
                	if(!obj.length){
                		float_nav.width("0");
                		return false;
                	}
                	
                	var nav = $(".nav_group .nav_main");
                
                	var rel = $(obj).find("a").attr("rel");
                	if(rel && $("#subnav_"+rel).length){
                		$("#subnav_"+rel).addClass("active");
                	}
                
                	var obj_h = obj.height();
                	var obj_w = obj.width();
                	var obj_o = obj.offset();
                	var obj_l = obj_o.left;
                	var obj_t = obj_o.top;
                	var nav_o = nav.offset();
                	var nav_l = nav_o.left;
                	var nav_t = nav_o.top;
                
                	var rel = obj.find("a").attr("rel");
                	if(rel){
                		float_nav.attr("rel",rel);
                	}
                
                	obj_l = obj_l - nav_l;
                	obj_t = obj_t - nav_t;
                	float_nav.stop( true, false );
                	float_nav.animate({
                		left: obj_l,
                		top: obj_t,
                		height: obj_h,
                		width: obj_w
                	}, 200);
                }
        }
    };
    return metalHeader;
}); 
 





function init_nav(){

}


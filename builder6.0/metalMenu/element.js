var app = angular.module('demoApp');
app.directive('metalMenu', function ($http, $compile, $templateRequest, $interval, $mdDialog,  $dazzleUser, $dazzleInit, $dazzleS3, $dazzlePopup, $ocLazyLoad) {
    var name = 'metalMenu';
    var link = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/metalMenu/element.html?id=" + new Date().getTime(),
         link: function (scope, element, attrs) {

        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
            $(document).ready(function(){
            	var nav_ani;
            	init_nav();
            	init_searchnav();
            });
            
            $(document).ready(function(){
            	var tmp = sessionStorage.getItem('__data_reg__');
            	console.log(tmp);
            	var arg0='node';
            	console.log(arg0);
            	if(tmp=='fromReg' && arg0=='user'){
            		var reg_type=sessionStorage.getItem('__data_reg_type__');
            		if(reg_type=='mobile'){
            			popTips('感謝您於香港五金網註冊。您將會收到另外一封包含登入密碼的手機訊息。');
            		}
            		else{
            			popTips('感謝您於香港五金網註冊。您將會收到另外一封包含登入名稱、密碼的電子郵件。');
            		}
            		sessionStorage.clear();
            	}
            });
            
            function init_searchnav(){
            	$(".search ul li a").click(function(){
            		$(".search ul li a").removeClass("active");
            		$(this).addClass("active");
            	});
            
            		return false;}
            
            function init_nav(){
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
    return link;
});
var app = angular.module('demoApp');
var uid = "www.rainbowcu.org.hk"; 
var user = store.get('rainbow-user');

app.directive('dzShoppingCart', function ($compile,$http, $templateRequest,  $mdDialog,$dazzlePopup,$dazzleUser,$http,$dazzleElastic, $dazzleFn,$dazzleData,$ocLazyLoad) {
    var dzShoppingCart = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "//d25k6mzsu7mq5l.cloudfront.net/builder6.0/dzShoppingCart/element.html?id=" + new Date().getTime(),
        link:  {

            pre: function(scope,element,attr){
                
                
                console.log('Dazzle Elastic',$dazzleElastic);
                console.log('Dazzle Data',$dazzleData);
                              `` 

            
                // Check User Login

                // console.log('Rainbow User',user);
                // if (!angular.isUndefined(user)){
                //     scope.user = user;
                //     scope.logined = true;
                // }
                // else
                //     scope.logined = false;

            },
            
            post: function(scope,element,attr){


            }
            

            
        },
        controller: function ($scope, $element, $attrs) {


                $scope.myPrice = function(item){
                    return item['volume'] * parseFloat(item['價錢']);
                }
                
             $scope.init = function () {
                  $ocLazyLoad.load(['http://www.rainbowcu.org.hk/js/md5.min.js','http://www.rainbowcu.org.hk/js/date.format.js']);
                    $scope.user = store.get('rainbow-user');
                    var cart =$scope.user['購物籃'];
                    var key = [];
                    $scope.products=[];
                    
                     angular.forEach(cart,function(item,index){
                         var ind = key.indexOf(item['id']);
                         if (ind<0) {
                            key.push(item['id']);
                            item['volume'] =1;
                            console.log(parseFloat(item['價錢']));
                            item.tPrice = parseFloat(item['價錢']);
                            $scope.products.push(item);
                         } else {
                             $scope.products[ind]['volume']++;
                             $scope.products[ind]['tPrice'] += parseFloat(item['價錢']);
                         }
                     });
                    $scope.usingPoint=false;
                    $scope.pointUse=0;
                    $scope.generalCreditUsed = 0;
                    $scope.specialCreditUsed = 0;
                    if (angular.isUndefined($scope.products)) {
                        $scope.products = [];
                    }
            		console.log($scope.products);
            		$scope.allTotalPrice = 0;
                    if($scope.products.length>0){
                    	$scope.numberOfProduct=true;
                    }
                    else{
                    	$scope.numberOfProduct=false;
                    }
                    for (var i = 0; i < $scope.products.length; i++) {
                        $scope.products[i].option = "1";
                        $scope.volumeChanged($scope.products[i]);
                        $scope.updateTotal(i,1);
                    }
            
            
                }
                
            
               $scope.updateTotal = function(index,value) {
                    console.log('Update Total',index,value);
                   var sp=0,gp=0;
                   $scope.originalPrice =0;
                   $scope.showTotalPrice =0;
                   $scope.generalCreditUsed =0;
                   $scope.specialCreditUsed = 0;
                   $scope.products[index].option=value;
                   for(i=0;i<$scope.products.length;i++){
                       sp=0;
                       gp=0;
                       if (!angular.isUndefined($scope.products[i]['普優折扣']))
                            gp = $scope.products[i]['普優折扣'];
                       if (!angular.isUndefined($scope.products[i]['特優折扣']))
                            sp = $scope.products[i]['特優折扣'];    
                       console.log('Products',$scope.products[i]);
                       $scope.originalPrice += $scope.products[i]['volume'] *parseFloat($scope.products[i]['價錢']);
            
                       console.log($scope.products[i]['option']);
                       switch($scope.products[i]['option']){
                           default:
                           case '1':
                               $scope.showTotalPrice += $scope.products[i]['volume'] *parseFloat($scope.products[i]['價錢']);
            
                               break;
                           case '2':
                               $scope.showTotalPrice += $scope.products[i]['volume'] *parseFloat($scope.products[i]['價錢']) /2;
                               $scope.generalCreditUsed +=parseFloat(gp);
                               $scope.user['普優積分'] -= gp;
            
                               break;
            
                           case '3':
                               $scope.showTotalPrice += $scope.products[i]['volume'] *parseFloat($scope.products[i]['價錢']) /2;
                               $scope.specialCreditUsed +=parseFloat(sp);
                               $scope.user['特優積分'] -=sp;
            
                               break;
                       }
            
                   }
               }
               
                $scope.checkMaxPoint=function(pointIsUsing){
                	if(pointIsUsing>$scope.maxPointUse){
                		$scope.pointUse=parseInt($scope.maxPointUse);
                	}
                }
            
            
            
                $scope.usePoint=function(){
                	$scope.usingPoint=true;
                	if($scope.allTotalPrice>=$scope.user['積分']){
                		$scope.pointUse=$scope.user['積分'];
                		$scope.allTotalPrice=$scope.allTotalPrice-$scope.user['積分'];
                	}
                	else{
                		$scope.pointUse=$scope.allTotalPrice;
                		$scope.allTotalPrice=0;
                	}
                	//$scope.pointUse=$scope.user['積分'];
                	//$scope.allTotalPrice=$scope.allTotalPrice-$scope.user['積分'];
                }
                
                $scope.cancelPoint=function(){
                	$scope.usingPoint=false;
                	$scope.pointUse=0;
                	$scope.allTotalPrice=$scope.showTotalPrice;
                }
            
                $scope.remove = function (product, index) {
                    $scope.products.splice(index, 1);
                    store.set('cart', JSON.parse(angular.toJson($scope.products)));
            
                    $scope.allTotalPrice = 0;
                    for (var i = 0; i < $scope.products.length; i++) {
                        $scope.volumeChanged($scope.products[i]);
                    }
                    
                }
            
                $scope.volumeChanged = function (product) {
                    product.tPrice = product.price * product.volume;
                    $scope.allTotalPrice = 0;
                    for (var i = 0; i < $scope.products.length; i++) {
                        $scope.allTotalPrice = $scope.allTotalPrice + $scope.products[i]['volume'] *parseFloat($scope.products[i]['價錢']);
                    }
                    console.log(typeof $scope.allTotalPrice);
                    $scope.showTotalPrice=$scope.allTotalPrice;
                    
                    if($scope.showTotalPrice>=$scope.user['積分']){
                    	$scope.maxPointUse=$scope.user['積分'];
                    }
                    else{
                    	$scope.maxPointUse=$scope.showTotalPrice;
                    }
                    
                    if($scope.usingPoint){
                    	$scope.allTotalPrice=$scope.allTotalPrice-$scope.user['積分'];
                    }
                }
                
                
            	
                $scope.confirmPay = function () {
//                    $.LoadingOverlay("show");
                    var date = new Date();
                    $scope.finalPayNum=$scope.showTotalPrice-$scope.pointUse;
                    var time =moment().format("YYYYMMDDhhmmss");
                    console.log(time);
                    var formJson = {
                        "acqID": "99020344",
                        "backURL": "http://www.rainbowcu.org.hk/successOrder.html",
                        "charSet": "UTF-8",
                        "frontURL": "http://www.rainbowcu.org.hk/successOrder.html",
                        "merID": "800039286992049",
                        "merReserve": $scope.user['會員編號'],
                        "orderAmount": $scope.finalPayNum,
                        "orderCurrency": "HKD",
                        "orderNum": 'id-' + date.getTime(),
                        "paymentSchema": "UP",
                        "signType": "MD5",
                        "transTime":time,
                        "transType": "PURC",
                        "version": "VER000000002"
                    }
/*                    var formJson = {
                        "acqID": "99020344",
                        "backURL": "http://www.rainbowcu.org.hk/successOrder.html",
                        "charSet": "UTF-8",
                        "frontURL": "http://www.rainbowcu.org.hk/successOrder.html",
                        "merID": "800039253992117",
                        "merReserve": $scope.user['會員編號'],
                        "orderAmount": $scope.finalPayNum,
                        "orderCurrency": "USD",
                        "orderNum": 'id-' + date.getTime(),
                        "paymentSchema": "UP",
                        "signType": "MD5",
                        "transTime":time,
                        "transType": "PURC",
                        "version": "VER000000002"
                    }
					*/
                    console.log(formJson);
                    var parameter = formJson;
                    var parametertmp = jsonToParameter(formJson) + 'addc3c5724c3451b9af4698cd02e1cdd';
//                    var parametertmp = jsonToParameter(formJson) + 'c35cce66a4544e659a1994c46a6e9226';
                    var md5parameter = md5(parametertmp);
                    
                    parameter.signature = md5parameter;
                    console.log( "https://api.allpayx.com/epayment/payment?" + jsonToParameter(parameter));
                   
                        
                    var products=[];
                    angular.forEach($scope.products,function(item,index){
                       var str = item['標題'] +':$'+ item['價錢']+':'+item['volume']+'件';
                       products.push(str);
                    });
					

					var post = {
                            method: 'order',
                            "id": formJson.orderNum,
                            "訂單編號": formJson.orderNum,
                            "社員編號": $scope.user['會員編號'],
                            "購買產品": products,
                            "總金額": $scope.allTotalPrice,
                            "折扣後金額": $scope.finalPayNum,
                            "狀態":"未付款",
                            "下單時間":  new Date().getTime()
                            // parameters: {
                            //     json: parameter,
                            //     params: jsonToParameter(parameter)
                            // }
                        };
						console.log(JSON.stringify(post));
                     
                    $http({
                        "method": "post",
                        "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/culhk-paymentcallback",
                        "data": post
                    }).then(function (response) {

                        if (response.data.code > 0) {
                            console.log(response.data.text);
                            store.remove('cart');
                            if($scope.finalPayNum>0){
//                            	alert(response.data.text);

								$scope.user['購物籃'] = [];
								store.set('rainbow-user',$scope.user);
                            	window.location = "https://api.allpayx.com/epayment/payment?" + jsonToParameter(parameter);
                            
//                                window.location = "https://testapi.allpayx.com/pay/v1?" + jsonToParameter(parameter);
                            
                            }
                            else{
                     //       	$scope.finalPay(formJson.transTime,formJson.orderNum);
								alert('下單失敗. 請聯絡管理員');
							}
                        } 
                    });
            
                }
            	
            	$scope.finalPay = function(transTime,orderNum){
            		$http({
                        "method": "post",
                        "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/culhk-paymentcallback",
                        "data": {
                            method: "pay",
                            json: {
                                "orderNumber": orderNum,
                                "orderTime": transTime
                            }
                        }
                    }).then(function successCallback(response) {
                        if (response.data.code > 0) {
                            alert(response.data.text);
                            $scope.user['積分']=$scope.user['積分']-$scope.pointUse;
                            store.set('user',$scope.user);
                            window.location = 'index.html';
                        }
                    });
            	}
//                function md5(d){result = M(V(Y(X(d),8*d.length)));return result.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}

                function jsonToParameter(json) {
                    return (Object.keys(json).map(function (k) {
                        return k + '=' + json[k]
                    }).join('&'));
                }
        }

    };
    return dzShoppingCart;
});
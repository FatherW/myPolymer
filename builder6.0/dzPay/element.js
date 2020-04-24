var app = angular.module('demoApp');
var handler;
var stripe, paymentstripe;
app.directive('dzPay', function ($compile, $ocLazyLoad,$templateRequest, $http, $mdDialog,$dazzleUser,$dazzleS3,$dazzleInit,$dazzlePopup,$dazzleData,$dazzleFn
,userInfo) {
    var link = {
        restrict: 'EA',
        priority: 1000,
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/dzPay/element.html?id=" + new Date().getTime(),

        compile: function (tElem, tAttrs) {
            var js1 = "https://js.stripe.com/v3/";
            var js2 = "https://checkout.stripe.com/checkout.js";
            
            
            // $ocLazyLoad.inject([js1, js2], {cache: false}).then(function(){

             
        //     });
        },
        link: function ($scope, $element, attrs) {
              stripe = Stripe('pk_test_M2x9FW6Icd4VXSiMN79emozP');
                paymentstripe = 'sk_test_tRIDTDGzAYvg0Afho8AQSWtG';
                //var stripe = Stripe('pk_live_BM1kEmhGrKjmDg9F7IvO2JLt');
                //var paymentstripe = 'sk_live_Xeuqq2FmmYYMONxFXxGX2zuc';
                var elements = stripe.elements();
                //======================
            
                handler = StripeCheckout.configure({
                    key: 'pk_test_M2x9FW6Icd4VXSiMN79emozP',//testing
                    //key:'sk_live_Xeuqq2FmmYYMONxFXxGX2zuc',//production
                    locale: 'auto',
                    token: function(token) {
                        console.log('token, ', token);
                        console.log('token id, ', token.id);
                        $scope.goPay(paymentstripe, token, $scope.stripeAmount, $scope.myDesc);
                    }
                });      
                
                
                $scope.submitPay  = function() {
                    if ($.isNumeric($scope.myAmount) && $scope.myAmount > 0) {
                        $scope.stripeAmount = $scope.myAmount * 100;
                        $scope.myDesc = '網上捐款';
                        handler.open({
                            name: 'Dazzle 增值:'+userInfo.uid,
                            description: 'Dazzle 增值',
                            image: 'http://dashboard.dazzle.website.s3.amazonaws.com/images/white.jpg',
                            currency: 'hkd',
                            amount: $scope.stripeAmount,
                            bitcoin: true,
                            alipay: true
                        });
                    } else if (!$.isNumeric($scope.myAmount)){
                        alert("請輸入數值");
                    } else if ($scope.myAmount <= 0) {
                        alert("請輸入大於零的數值")
                    }
                } 
    
                $scope.goPay = function (paymentstripe, token, myAmount, myDesc) {
                	$scope.orderId = new Date().getTime();
                	$scope.currency = 'hkd';
                    console.log('Amount, ', myAmount);
                    return new Promise(function (resolve, reject) {
                        $http({
                            "method": "post",
                            "url" : "https://d8fz9pfue5.execute-api.ap-northeast-1.amazonaws.com/prod/stripe-server",
                            "data": {
                                paymentstripe,
                                token,
                                "charge": {
                                    "amount": myAmount,
                                    "currency": $scope.currency,
                                    "description": myDesc,
                                    "connectedId":"acct_1B5qh8ArSxw2sVVO",
                                    "orderId":$scope.orderId
                                    //"applicationFee":"200"
                                },
                            },
                        }).then(function (result) {
                            if (result.data.statusCode > 0) {
                                //$scope.toast(result.data.text);
                                alert('支付成功！');
                                resolve();
                                $scope.currency = $scope.currency
            				//	$scope.saveDonation($scope.orderId, $scope.myAmount, $scope.currency, myDesc);                    
                            } else {
                                alert('支付失敗，請重新再試！');
                                reject();
                            }
                        });
                    });
                }
        },
        controller: function ($scope, $element, $attrs) {

        
         
        }
    };
    return link;
});
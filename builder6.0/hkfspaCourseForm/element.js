var app = angular.module('demoApp');
var name = 'hkfspaCourseForm';

app.directive(name, function ($compile, $templateRequest, $mdDialog, $dazzleUser,$dazzlePopup,
    pageInfo,userInfo,dzFn,dbFactory) {
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "//d27btag9kamoke.cloudfront.net/builder6.0/hkfspaCourseForm/element.html?id=" + new Date().getTime(),
         compile: function (tElem, tAttrs) {
           return {
               pre: function ($scope, $element, iAttrs) {
                    $scope.initCourse();
               },
               post: function (scope, iElem, iAttrs) {
                  // console.log('Dz Image Load');
               }
           }
       },
       link: function (scope, element, attrs) {
            scope.http = "//d27btag9kamoke.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http,$mdSidenav, $mdBottomSheet,$log) {
            $scope.receiveemail = 'hkfspa@hkfspa.org';
            $scope.formdata = {}; //init default form object
            $scope.formdata['驗證'] = "";
            $scope.formdata['折扣碼'] = "";
            $scope.totalCoursePrice = 0; //set default show price to 0
            $scope.originalPrice = 0; //set default original price to 0
            $scope.authCode = stringGen(5); //set 5 random code
            var tmpAllCoruseObj; //tmp all course object
            $scope.selectedCourseObj = {}; //tmp selected course object 
            $scope.selectedCourse = {}; //tmp selected course object title and content for display
            $scope.checkedOnlineSubmit = false; // init online submit disabled to false
            $scope.checkedPaySubmit = false; // init paypal submit disabled to false
            $scope.authStatus = 'has-normal';
            $scope.couponStatus = 'has-normal';
            $scope.actionToSubmit='online';
            
            //init set auth code
                var c = document.getElementById("myCanvas");
                var ctx = c.getContext("2d");
                ctx.font = "14px Arial";
                ctx.shadowBlur = 30;
                ctx.shadowColor = "rgb(90, 90, 0)";
                ctx.strokeStyle = "#ff0099";
                ctx.fillText($scope.authCode, 8, 20);

            $scope.initCourse = function() {
                console.log('Init Course');
                return new Promise(function (resolve, reject) {
                    //  dbFactory.loadData("course").then(function(data){
                    //     //get course data
                    //     console.log('Course Data',data);
                    //     tmpAllCoruseObj = data;
                    //     $scope.courseData = data;
                    //     $scope.defaultCourse=getUrlParameter('course');
                    //     if(!angular.isUndefined($scope.defaultCourse)){
                    //         console.log($scope.defaultCourse);
                    //         $scope.changeCourse($scope.defaultCourse);
                    //     }
                    //     resolve(); 
                    // },function(err){
                    //     console.log('Course Error');
                    // });
                    
                    
        //              $http({
        //                 "method": "post",
        //                 "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
        //                 "data": {
        //                     "action": "searchData",
        //                     "index": location.hostname,
        //                     "type": "course",
        //                     "body":{
        //                         "query":{
        //                             "match_all":{}
        //                         }
        //                     }
        //                 }
        //             }).then(function (result) {
    				//  //get course data
        //                 console.log(data);
        //                 tmpAllCoruseObj = data;
        //                 $scope.courseData = data;
        //                 $scope.defaultCourse=getUrlParameter('course');
        //                 if(!angular.isUndefined($scope.defaultCourse)){
        //                     console.log($scope.defaultCourse);
        //                     $scope.changeCourse($scope.defaultCourse);
        //                 }
        //                 resolve(); 
        //             });
                    
                    dbFactory.getAllData('course').then(function(data){
                        //get course data
                        console.log(data);
                        tmpAllCoruseObj = data;
                        $scope.courseData = data;
                        $scope.defaultCourse=getUrlParameter('course');
                        if(!angular.isUndefined($scope.defaultCourse)){
                            console.log($scope.defaultCourse);
                            $scope.changeCourse($scope.defaultCourse);
                        }
                        resolve(); 
                    },function(err){
                        console.log('Err',err);
                        
                        resolve();
                    });                
                });
            }



            // $http.get('/content/course-data.json').then(function(response) {
            //     //get course data
            //     console.log(response.data);
            //     tmpAllCoruseObj = response.data;
            //     $scope.courseData = response.data;
            //     $scope.defaultCourse=getUrlParameter('course');
            //  if(!angular.isUndefined($scope.defaultCourse)){
            //      console.log($scope.defaultCourse);
            //      $scope.changeCourse($scope.defaultCourse);
            //  }
            // });

            $http.get('/content/coupon-data.json').then(function(response) {
                $scope.couponData = response.data;
            });
            
            $scope.changePayMethod=function(actionToSubmit){
                $scope.actionToSubmit=actionToSubmit;
                $scope.submitThisForm();
            }
            
            $scope.submitThisForm = function(actionToSubmit) {
                //if all required elements are valid
                
                if ($scope.myForm.$valid) {
                    if ($scope.formdata['驗證'] != $scope.authCode) {
                        alert('驗證碼不正確請重新輸入！');
                        return false;
                    }
        
                    var createData = new Date();
                    $scope.formdata.formid = createData.getTime(); // set form id
                    var nd = new Date((createData.getTime() / 1000 + (3600 * 8)) * 1000);
                    $scope.formdata['日期時間'] = nd.toGMTString(); // set datetime
                    $scope.formdata['價錢'] = $scope.totalCoursePrice;
                    
                    //check payment method
                    if (actionToSubmit == 'paypal') {
                        $scope.formdata['付款狀態'] = '未付款';
                        $scope.checkedPaySubmit = true;
                    } else {
                        $scope.formdata['付款狀態'] = '網上提交';
                        $scope.checkedOnlineSubmit = true;
                    }
                    
                    //if coupon wrong, clear it
                    if ($scope.couponStatus != 'has-success') {
                        $scope.formdata['折扣碼'] = "";
                    }
                    $scope.formdata['訂單編號'] = $scope.formdata.formid;
                    $scope.formdata['交易編號'] = '';
                    $scope.formdata['課程／講座名稱'] = $scope.courseName;
                    var customMsg=JSON.stringify({
                        "invoice_id":$scope.formdata.formid,
                        "user_id":$scope.hostname,
                        "websiteKey":$scope.websiteKey,
                        "table_name":$scope.formname,
                        "user_email":$scope.formdata['電郵']
                    });
                    let options = {
                        "cmd": "_xclick",
                        "business": "hkfspa@hkfspa.org",
                        "item_name": $scope.courseName,
                        "item_number": $scope.formdata['課程／講座'],
                        "notify_url": "https://d8fz9pfue5.execute-api.ap-northeast-1.amazonaws.com/prod/paypal-ipn",
                        "return": "http://www.hkfspa.org/payment-done.html?orderNum="+$scope.formdata.formid,
                        "cancel_return": "http://www.hkfspa.org/enroll.html",
                        "lc": "zh_HK",
                        'charset':'utf-8',
                        "invoice": $scope.formdata.formid,
                        "custom": customMsg,
                        "amount": $scope.totalCoursePrice,
                        //"amount": 1,
                        "currency_code": "HKD",
                        "button_subtype": "services",
                        "no_note": 0,
                        "rm": 1
                    };
        
                    var key = new Date().getTime();
                    $scope.formdata['ID'] = key;
                    $scope.formdata['報名日期'] = new Date().getTime();
                    // var data = {
                    //     "ID":key,
                    //     "英文名稱":$scope.formdata['']
                    // };
                    
                    
                   


                    if (actionToSubmit == 'paypal') {
                        //emailToUser();
                         location.href = getPayPalLink(options);
                    } else {
                        emailToUser();
                         dbFactory.saveData("hkfspa.dazzle.website","enroll",key,$scope.formdata).then(function(){
                            $dazzlePopup.toast('成功儲存資料');
    
                        },function(){
                            $dazzlePopup.toast('不成功儲存資料');
                        });
                    }
                            
                   // $('body').LoadingOverlay('show');
                    // $http({
                    //         method: 'POST',
                    //         url: 'https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/saveformdatatojson',
                    //         data: { 'formdata': $scope.formdata, 'formname': $scope.formname, 'bucketname': $scope.hostname, 'websiteKey': $scope.websiteKey }
                    //     })
                    //     .then(function(succeed) {
                    //             console.log(succeed);
                    //             if (succeed.data.code > 0) {
                    //                 if (actionToSubmit == 'paypal') {
                    //                     //emailToUser();
                    //                     location.href = getPayPalLink(options);
                    //                 } else {
                    //                     emailToUser();
                    //                 }
                    //             } else {
                    //                 $('body').LoadingOverlay('hide');
                    //                 alert('提交失敗，請重新再試');
                    //                 $scope.checkedPaySubmit = false;
                    //                 $scope.checkedOnlineSubmit = false;
                    //             }
                    //         },
                    //         function(error) {
                    //             $('body').LoadingOverlay('hide');
                    //             alert('提交失敗，請重新再試');
                    //             $scope.checkedPaySubmit = false;
                    //             $scope.checkedOnlineSubmit = false;
        
                    //         }
                    //     );
        
        
                } //end if
            }

            $scope.changeCourse = function(selectedCode) {
                console.log('Change Course');
                $scope.formdata['折扣碼'] = ""; //clear coupon code
                $scope.couponStatus = 'has-normall';
                if (angular.isUndefined(selectedCode)) {
                    //if no selectedCode, init data
                    $scope.selectedCourseObj = {};
                    $scope.courseName = "";
                    $scope.originalPrice = 0;
                    $scope.totalCoursePrice = 0;
                    //$scope.selectedCourse['title'] = "";
                    //$scope.selectedCourse['content'] = "";
                    return false;
                }

                var thisCourse = tmpAllCoruseObj.filter(x => x['Course Code'] === selectedCode);
                if(thisCourse.length==1){
                    //if course selected
                    $scope.formdata['課程／講座']=selectedCode;
                    $scope.selectedCourseObj = thisCourse[0];
                    $scope.courseName = thisCourse[0]['Course Name'];
                    $scope.originalPrice = parseFloat($scope.selectedCourseObj['課程費用']);
                    $scope.totalCoursePrice = parseFloat($scope.selectedCourseObj['課程費用']);
                    if (angular.isUndefined($scope.selectedCourseObj['Coupon'])){
                        $scope.selectedCourseObj['Coupon']=[];
                    }
                }

                console.log('Change Course',$scope.originalPrice,$scope.totalCoursePrice);
                //$scope.selectedCourse['title'] = $scope.selectedCourseObj['Course Name'];
                //$scope.selectedCourse['content'] = $scope.selectedCourseObj['課程詳情'];
            }

            $scope.checkCoupon = function(thisData) {
                $scope.totalCoursePrice = angular.copy($scope.originalPrice);
                
                //check coupon code for payment
                if ($scope.selectedCourseObj['Coupon'].length==0 && $scope.formdata['折扣碼'] == "") {
                    $scope.formdata['折扣碼']="";
                    $scope.couponStatus = 'has-normall';
                    return false;
                }
                if ($scope.selectedCourseObj['Coupon'].length==0 && $scope.formdata['折扣碼'] != "") {
                    $scope.couponStatus = 'has-error';
                    return false;
                }
                
                if ($scope.selectedCourseObj['Coupon'].length > 0 && $scope.formdata['折扣碼'] != "") {
                    var matchCourseCouponObj = $scope.selectedCourseObj['Coupon'].filter(function(value) { return value == $scope.formdata['折扣碼']; }); //if input code match course's coupon code
                    var matchCouponDataObj = $scope.couponData.filter(x => x['Coupon Code'] === $scope.formdata['折扣碼']); //if input code match coupon poor
                    if (matchCourseCouponObj.length > 0 && matchCouponDataObj.length > 0) {
                        //if coupon code match course and coupon poor
                        if (matchCouponDataObj[0]['Valid'] == '是') {
                            //if coupon is valid
                            if (new Date().getTime() < new Date(matchCouponDataObj[0]['Expiry Date']).getTime()) {
                                if (matchCouponDataObj[0]['Coupon Type'] == "Discount Amount") {
                                    //if coupon is discount by amount
                                    $scope.totalCoursePrice = $scope.originalPrice - parseFloat(matchCouponDataObj[0]['Discount Amount']);
                                } else {
                                    $scope.totalCoursePrice = parseFloat($scope.originalPrice * (100 - parseFloat(matchCouponDataObj[0]['Discount(%)'])) / 100).toFixed(2);
                                }
                                $scope.couponStatus = 'has-success';
                                return;
                            } else {
                                //coupon expiry
                                //$scope.couponStatus = 'has-error';
                            }
                        } else {
                            //if coupon is invalid
                            //$scope.couponStatus = 'has-error';
                        }
                    } else {
                        //if input code not match all
                        //$scope.couponStatus = 'has-error';
                    }
                    $scope.couponStatus = 'has-error';
                } else {
                    $scope.couponStatus = 'has-normall';
                }
            }
            $scope.checkAuth = function(thisData) {
                if (angular.isUndefined($scope.formdata['驗證'])) {
                    $scope.authStatus = 'has-normall';
                } else if ($scope.formdata['驗證'] == $scope.authCode) {
                    $scope.authStatus = 'has-success';
                } else {
                    $scope.authStatus = 'has-error';
                }
            }
        
            function emailToAdmin() {
                console.log($scope.receiveemail);
                if (!$scope.receiveemail) {
                    alert("提交成功");
                    location.reload();
                    return false;
                }
                api = "https://9hhtm40jpe.execute-api.ap-northeast-1.amazonaws.com/sendemail";
                var jsonToAdmin = {};
                jsonToAdmin['from'] = 'support@01power.net';
                jsonToAdmin['to'] = $scope.receiveemail;
                jsonToAdmin['subject'] = '香港金融業協會課程網上報名';
                jsonToAdmin['html'] = '有新的課程網上報名表格提交<br><br>參考編號為:' + $scope.formdata.formid;
                jsonToAdmin['html'] += '<br>課程名稱:' + $scope.formdata['課程／講座名稱'];
                $.ajax({
                    type: "POST",
                    url: api,
                    data: JSON.stringify(jsonToAdmin),
                    contentType: "text/json; charset=utf-8",
                    dataType: "json",
                    success: function(msg) {
                        alert("提交成功");
                        location.reload();
                    },
                    error: function(msg) {
                        alert("提交成功");
                        location.reload();
                    }
                });
            }
        
            function emailToUser() {
                console.log($scope.receiveemail);
                if (angular.isUndefined($scope.formdata['電郵'])) {
                    //alert("提交成功");
                    emailToAdmin();
                    //location.reload();
                    return false;
                }
                api = "https://9hhtm40jpe.execute-api.ap-northeast-1.amazonaws.com/sendemail";
                var jsonToAdmin = {};
                jsonToAdmin['from'] = 'support@01power.net';
                jsonToAdmin['to'] = $scope.formdata['電郵'];
                jsonToAdmin['subject'] = '香港金融業協會課程網上報名';
                jsonToAdmin['html'] = '您好！您的香港金融業協會課程網上報名表格成功提交<br><br>參考編號為:' + $scope.formdata.formid;
                jsonToAdmin['html'] += '<br>課程名稱:' + $scope.formdata['課程／講座名稱'];
                jsonToAdmin['html'] += '<br>課程編號:' + $scope.formdata['課程／講座'];
                jsonToAdmin['html'] += '<br><br>香港金融業協會';
                $.ajax({
                    type: "POST",
                    url: api,
                    data: JSON.stringify(jsonToAdmin),
                    //async: false,
                    contentType: "text/json; charset=utf-8",
                    dataType: "json",
                    success: function(msg) {
                        //alert("提交成功");
                        //location.reload();
                        emailToAdmin();
                    },
                    error: function(msg) {
                        //alert("提交成功");
                        //location.reload();
                        emailToAdmin();
                    }
                });
            }
        
            function stringGen(len) {
                let text = "";
                let charset = "abcdefghijkmnopqrstuvwxyz123456789ABCDEFGHJKLMNPQRSTUVWXYZ123456789";
                for (var i = 0; i < len; i++) {
                    text += charset.charAt(Math.floor(Math.random() * charset.length));
                }
                return text;
            }
        
            function getPayPalLink(options) {
        
                let myQuery = 'https://www.paypal.com/cgi-bin/webscr?';
                var count = 0;
                for (let entry in options) {
                    myQuery += ((count++ > 0) ? "&" : "") + entry + '=' + encodeURIComponent(options[entry]);
                }
                return myQuery;
            }
        
            function getUrlParameter(sParam) {
                var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                    sURLVariables = sPageURL.split('&'),
                    sParameterName,
                    i;
        
                for (i = 0; i < sURLVariables.length; i++) {
                    sParameterName = sURLVariables[i].split('=');
        
                    if (sParameterName[0] === sParam) {
                        return sParameterName[1] === undefined ? true : sParameterName[1];
                    }
                }
                return false;
            };
        }
    };
    return link;
});



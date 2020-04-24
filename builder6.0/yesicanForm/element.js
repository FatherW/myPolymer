var app = angular.module('demoApp');
var _cdn = "//d27btag9kamoke.cloudfront.net/";
app.directive('yesicanForm', function ($window,$compile, $templateRequest, $mdDialog, $dazzlePopup,dzFn,atomInfo,dbFactory) {
    var dzSlider = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: _cdn+"builder6.0/yesicanForm/element.html?id=" + new Date().getTime(),
        css: {
          href: "//d27btag9kamoke.cloudfront.net/builder6.0/yesicanForm/element.css?id=" + new Date().getTime(),
      
          preload: true
        },
        link: function ($scope, element, attrs) {
            
                $scope.subUser = store.get('subUser') || null;
                console.log('Sub ',$scope.subUser);   
                $scope.isUser = function(){
                    if ($scope.subUser == null)
                        return false;
                    else
                        return true;
                }


        },
        controller: function ($scope, $element, $attrs,$http,$location) {
           AWS.config = new AWS.Config();
            AWS.config.accessKeyId = "AKIAIOCIHTJ47YSHEE7Q";
            AWS.config.secretAccessKey = "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";
            AWS.config.region = "ap-northeast-1";
            $scope.formdata={};
        
            var stripe = Stripe('pk_test_M2x9FW6Icd4VXSiMN79emozP');
            var paymentstripe = 'sk_test_tRIDTDGzAYvg0Afho8AQSWtG';
            //var stripe = Stripe('pk_live_BM1kEmhGrKjmDg9F7IvO2JLt');
            //var paymentstripe = 'sk_live_Xeuqq2FmmYYMONxFXxGX2zuc';
            var elements = stripe.elements();
            //======================
        
            var handler = StripeCheckout.configure({
                key: 'pk_test_M2x9FW6Icd4VXSiMN79emozP',//testing
                //key:'sk_live_Xeuqq2FmmYYMONxFXxGX2zuc',//production
                locale: 'auto',
                token: function(token) {
                    console.log('token, ', token);
                    console.log('token id, ', token.id);
                    $scope.goPay(paymentstripe, token, $scope.stripeAmount, $scope.myDesc);
                }
            });
        
            $scope.submitDonation  = function() {
                $scope.myAmount = $("#捐款金額").val();
                if ($.isNumeric($scope.myAmount) && $scope.myAmount > 0) {
                    $scope.stripeAmount = $scope.myAmount * 100;
                    $scope.myDesc = '網上捐款';
                    handler.open({
                        name: '我都得教育基金',
                        description: $scope.myDesc,
                        image: 'http://dashboard.dazzle.website.s3.amazonaws.com/images/white.jpg',
                        currency: 'hkd',
                        amount: $scope.stripeAmount,
                        bitcoin: false,
                        alipay: false
                    });
                } else if (!$.isNumeric($scope.myAmount)){
                    alert("請輸入數值");
                } else if ($scope.myAmount <= 0) {
                    alert("請輸入大於零的數值")
                }
            }
        
            // Close Checkout on page navigation:
            window.addEventListener('popstate', function() {
                handler.close();
            });
        
        
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
        					$scope.saveDonation($scope.orderId, $scope.myAmount, $scope.currency, myDesc);                    
                        } else {
                            alert('支付失敗，請重新再試！');
                            reject();
                        }
                    });
                });
            }
        
            $scope.saveDonation = function(orderid, myAmount, currency, myDesc) {
                //https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/saveformdatatojson
                var json = {
                	"orderid":orderid,
                	"amount":myAmount,
                	"currency":currency,
                	"description":myDesc,
                	"action":"save",
                	"index":"www.yesican.org.hk",
                	"type":"onlinedonation",
                	"id":orderid
                };
                $http(
                    {
                        method: 'POST',
                        url: 'https://d8fz9pfue5.execute-api.ap-northeast-1.amazonaws.com/prod/yes-i-can-save-donation',
                        data: json
                    })
                    .then(function(data) {
                        if (data.data.code > 0) {
                            //emailToUser();
                            //emailToAdmin();
                            //$scope.submitMyS3Form();
                            alert('捐款資料儲存成功');
                        } else {
                            alert('提交失敗，請重新再試');
                        }
                    },
                    function(error) {
                        alert('提交失敗，請重新再試');
                    }
                );
            }
        
            $scope.password = generate_password();
        
            function generate_password() {
        	    var length = 6;
                var string = "abcdefghijklmnopqrstuvwxyz"; //to upper 
                var numeric = '0123456789';
                var punctuation = '!@#$%';
                var password = "";
                var character = "";
                var crunch = true;
                while( password.length<length ) {
                    entity1 = Math.ceil(string.length * Math.random()*Math.random());
                    entity2 = Math.ceil(numeric.length * Math.random()*Math.random());
                    entity3 = Math.ceil(punctuation.length * Math.random()*Math.random());
                    hold = string.charAt( entity1 );
                    hold = (entity1%2==0)?(hold.toUpperCase()):(hold);
                    character += hold;
                    character += numeric.charAt( entity2 );
                    character += punctuation.charAt( entity3 );
                    password = character;
                }
                return password;
        	};
        
            //$scope.formdata['password'] = password;
            //$scope.formdata['狀態'] = '可登入';   
        
            $scope.submitMyForm = function() {
                if($scope.myForm.$valid){
                    //https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/saveformdatatojson
                    var createData=new Date();
                    $scope.formdata.formid=createData.getTime();
                    var nd=new Date((createData.getTime()/1000+(3600*8))*1000);
                    $scope.formdata['日期時間']=nd.toGMTString();
                    $scope.formdata['日期']=createData.getTime();
                    $scope.password = $scope.formdata['password'];
        //            $scope.formdata['password'] = $scope.password;
        		    $scope.formdata['狀態'] = '可登入';
        
        		    var query = {
                        'formdata':$scope.formdata,
                        'formname':$scope.formname,
                        'table1':$scope.table1,
                        'table2':$scope.table2,
                        'id':$scope.formdata['電郵'],
                        'bucketname':$scope.hostname,
                        'index':'www.yesican.org.hk',
                        'table':'user',
                        'websiteKey':$scope.websiteKey,
                        'action':'elastic'
                    };
        
        		    console.log('My Query',JSON.stringify(query));
                    $http(
                        {
                            method: 'POST',
                            url: 'https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/saveformdatatojson',
                            data: query
                        })
                        .then(function(data) {
                            if (data.data.code > 0) {
                                emailToUser();
                                emailToAdmin();
                              //  $scope.submitMyS3Form();
                                console.log('My Query',JSON.stringify(query));
        
                            } else {
                                alert('註冊失敗。用戶電郵或已註冊。請聯絡管理員。');
        
                            }
                        },
                        function(error) {
        
                            alert('註冊失敗。用戶電郵或已註冊。請聯絡管理員。');
                        }
                    );
        
                }//end if
            }
        
            $scope.submitMyS3Form = function() {
        
                if($scope.myForm.$valid){
        	        //https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/saveformdatatojson
        	        var createData=new Date();
        	        $scope.formdata.formid=createData.getTime();
        	    	var nd=new Date((createData.getTime()/1000+(3600*8))*1000);
        	        $scope.formdata['日期時間']=nd.toGMTString();
        	        $scope.formdata['日期']=createData.getTime();
        	        $scope.formdata['password'] = $scope.password;
        		    $scope.formdata['狀態'] = '可登入';
        	        $http(
        	        	{
        	                method: 'POST',
        	                url: 'https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/saveformdatatojson',
        	                data: {'formdata':$scope.formdata,'formname':$scope.formname,'bucketname':'dazzle-user-www.yesican.org.hk','websiteKey':$scope.websiteKey}
        	            })
        	            .then(function(succeed) {
        	             	console.log(succeed);
        	                if (succeed.data.code > 0) {
        	                 	emailToUser();
        	                    emailToAdmin();
        	                    alert('提交成功');
        	                } else {
        	                    alert('提交失敗，請重新再試');
        	                }
        	            },
        	            function(error) {
        	                alert('提交失敗，請重新再試');
        	            }
        	        );
                
            	}//end if
            }
        
            $scope.uploadPdfToDomain=function(dataName,filename,acceptType='all'){
                var x = document.createElement("INPUT");
                var pdffilename = "";
                x.setAttribute("type", "file");
                if(acceptType=='imageOnly'){
                    x.setAttribute("accept","image/*");
                }
                x.click();
                x.addEventListener('change', function () {
                    var file = this.files[0];
        
                    if (file.type == "application/pdf") {
                        var bucket = new AWS.S3();
                        switch (dataName) {
                            case "上載申請表(Upload Application Form)": pdffilename = "uploadofapplicationform"; break;
                            case "上載自我介紹文章(Upload Personal Introduction Form)": pdffilename = "uploadofpersonalintroductionform"; break;
                            case "上載成績表影印本(Upload Copy of School Report Card)": pdffilename = "uploadcopyofschoolreportcard"; break;
                            case "上載校內校外活動紀錄(Upload Copy of ECA Record)": pdffilename = "uploadcopyofecarecord"; break;
                            case "上載證書及獎項(Upload Copy of Certificate & Awards)": pdffilename = "uploadcopyofcertificateandawards"; break;
                            case "上載服務紀錄(Upload Copy of Service Record)": pdffilename = "uploadcopyofservicerecord"; break;
                            case "上載推薦信(Upload Copy of Recommend Letter)": pdffilename = "uploadcopyofrecommendletter"; break;
                        }
                        var key = 'files/'+$scope.user['formid']+"_"+pdffilename+'.pdf';
                        var pdfname = $scope.user['formid']+"_"+pdffilename+'.pdf';
                        var params = { Bucket: $location.host(), Key: key, ContentType: file.type, Body: file };
                        bucket.upload(params, function(err, data) {
                            $scope.$apply(function(){
                                var thisLink=document.getElementById(filename);
                                thisLink.href=data.Location;
                                //thisLink.text=file.name;
                                thisLink.text=pdfname;
                                if(acceptType=='imageOnly'){
                                    var thisImageLink=document.getElementById('img_'+filename);
                                    thisImageLink.src=data.Location;
                                }
                                //$scope.formdata[dataName]=data.Location;
                                $scope.formdata[dataName]=key;
                                alert('上載成功');
                            });
                        });
                    } else {
                        alert('上載失敗！請上載pdf檔案！');
                    };
               });
        
            }
        
            $scope.uploadToDomain=function(dataName,filename,acceptType='all'){
                var x = document.createElement("INPUT");
                x.setAttribute("type", "file");
                if(acceptType=='imageOnly'){
                    x.setAttribute("accept","image/*");
                }
                x.click();
                x.addEventListener('change', function () {
                    var file = this.files[0];
                    console.log(file);
                    if (file) {
                        var bucket = new AWS.S3();
                        var params = { Bucket: $location.host(), Key: 'files/'+new Date().getTime()+"_"+file.name, ContentType: file.type, Body: file };
                        bucket.upload(params, function(err, data) {
                            $scope.$apply(function(){
                                var thisLink=document.getElementById(filename);
                                thisLink.href=data.Location;
                                thisLink.text=file.name;
                                if(acceptType=='imageOnly'){
                                    var thisImageLink=document.getElementById('img_'+filename);
                                    thisImageLink.src=data.Location;
                                }
                                $scope.formdata[dataName]=data.Location;
                                alert('上載成功');
                            });
                        });
                    };
                });
        
            }
        
             $scope.updateMyForm = function() {
                
                $scope.user['上載申請表(Upload Application Form)'] = 'http://www.yesican.org.hk/files/'+$('#form1_8').text();            
                $scope.user['上載自我介紹文章(Upload Personal Introduction Form)'] = 'http://www.yesican.org.hk/files/'+$("#form2_8").text();
                $scope.user['上載成績表影印本(Upload Copy of School Report Card)'] = 'http://www.yesican.org.hk/files/'+$("#form3_8").text();
                $scope.user['上載校內校外活動紀錄(Upload Copy of ECA Record)'] = 'http://www.yesican.org.hk/files/'+$("#form4_8").text();
                $scope.user['上載證書及獎項(Upload Copy of Certificate & Awards)'] = 'http://www.yesican.org.hk/files/'+$("#form5_8").text();
                $scope.user['上載服務紀錄(Upload Copy of Service Record)'] = 'http://www.yesican.org.hk/files/'+$("#form6_8").text();
                $scope.user['上載推薦信(Upload Copy of Recommend Letter)'] = 'http://www.yesican.org.hk/files/'+$("#form7_8").text();
         
                console.log('申請表:',$scope.user['上載申請表(Upload Application Form)']);
                console.log('自我介紹文章',$scope.user['上載自我介紹文章(Upload Personal Introduction Form)']);
                console.log('成績表影印本',$scope.user['上載成績表影印本(Upload Copy of School Report Card)']);
                console.log('校內校外活動紀錄',$scope.user['上載校內校外活動紀錄(Upload Copy of ECA Record)']);
                console.log('證書及獎項',$scope.user['上載證書及獎項(Upload Copy of Certificate & Awards)']);
                console.log('服務紀錄',$scope.user['上載服務紀錄(Upload Copy of Service Record)']);
                console.log('推薦信',$scope.user['上載推薦信(Upload Copy of Recommend Letter)']);
        
        		var json = {
                	        'formdata':$scope.user,
                            'formname':$scope.formname,
                            'id':$scope.user['電郵'],
                            'bucketname':$scope.hostname,
                            'websiteKey':$scope.websiteKey,
                            'action':'elastic'
                        };
                $http(
         	        {
            	        method: 'POST',
                        url: 'https://d8fz9pfue5.execute-api.ap-northeast-1.amazonaws.com/prod/yes-i-can-update-data',
                        data: json
                    })
                    .then(function(data) {
                        if (data.data.code > 0) {
                            //emailToUser();
                            emailToAdminUpdate();
                            emailToUserUpdate();
                            //$scope.updateMyS3Form();
                            if ($scope.user['上載申請表(Upload Application Form)'] != "" && $scope.user['上載自我介紹文章(Upload Personal Introduction Form)'] != "" && $scope.user['上載成績表影印本(Upload Copy of School Report Card)'] != "" &&  $scope.user['上載校內校外活動紀錄(Upload Copy of ECA Record)'] != "" &&  $scope.user['上載證書及獎項(Upload Copy of Certificate & Awards)'] != "" && $scope.user['上載服務紀錄(Upload Copy of Service Record)'] != "" && $scope.user['上載推薦信(Upload Copy of Recommend Letter)'] != "") {
                                $(".combine").css('display','block');
                            }
                            alert('更新成功');
                        } else {
                        	console.log('Data',data);
                            alert('更新失敗，請重新再試');
                        }
                    },
                    function(error) {
                    	console.log('Error',errpr);
                        alert('更新失敗，請重新再試');
                    }
            	);
             }
             /*
              $scope.updateMyS3Form = function() {
                $scope.formdata['姓名(中文)'] = $scope.user['姓名(中文)'];
                $scope.formdata['電郵'] = $scope.user['電郵'];
              	//https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/saveformdatatojson
        	    $http(
        	    	{
        	            method: 'POST',
        	            url: 'https://d8fz9pfue5.execute-api.ap-northeast-1.amazonaws.com/prod/yes-i-can-update-data',
        	            data: {'formdata':$scope.formdata,'formname':$scope.formname,'bucketname':'dazzle-user-www.yesican.org.hk','websiteKey':$scope.websiteKey,'action':'s3'}
        	        })
        	        .then(function(succeed) {
        	           	console.log(succeed);
        	            if (succeed.data.code > 0) {
        	               	//emailToUser();
        	                //emailToAdmin();
        	                alert('更新成功');
        	            } else {
        	                alert('更新失敗，請重新再試');
        	            }
        	        },
        	        function(error) {
        	            alert('更新失敗，請重新再試');
        	        }
        	    );
        	 }
             */
             $scope.combinefile = function() {
                $scope.user['上載申請表(Upload Application Form)'] = 'http://www.yesican.org.hk/files/'+$('#form1_8').text();            
                $scope.user['上載自我介紹文章(Upload Personal Introduction Form)'] = 'http://www.yesican.org.hk/files/'+$("#form2_8").text();
                $scope.user['上載成績表影印本(Upload Copy of School Report Card)'] = 'http://www.yesican.org.hk/files/'+$("#form3_8").text();
                $scope.user['上載校內校外活動紀錄(Upload Copy of ECA Record)'] = 'http://www.yesican.org.hk/files/'+$("#form4_8").text();
                $scope.user['上載證書及獎項(Upload Copy of Certificate & Awards)'] = 'http://www.yesican.org.hk/files/'+$("#form5_8").text();
                $scope.user['上載服務紀錄(Upload Copy of Service Record)'] = 'http://www.yesican.org.hk/files/'+$("#form6_8").text();
                $scope.user['上載推薦信(Upload Copy of Recommend Letter)'] = 'http://www.yesican.org.hk/files/'+$("#form7_8").text();
                if ($scope.user['上載申請表(Upload Application Form)'] != "" && $scope.user['上載自我介紹文章(Upload Personal Introduction Form)'] != "" && $scope.user['上載成績表影印本(Upload Copy of School Report Card)'] != "" &&  $scope.user['上載校內校外活動紀錄(Upload Copy of ECA Record)'] != "" &&  $scope.user['上載證書及獎項(Upload Copy of Certificate & Awards)'] != "" && $scope.user['上載服務紀錄(Upload Copy of Service Record)'] != "" && $scope.user['上載推薦信(Upload Copy of Recommend Letter)'] != "") {   
                    var updatedata = {
                        '上載申請表(Upload Application Form)': $scope.user['上載申請表(Upload Application Form)'],
                        '上載自我介紹文章(Upload Personal Introduction Form)': $scope.user['上載自我介紹文章(Upload Personal Introduction Form)'],
                        '上載成績表影印本(Upload Copy of School Report Card)': $scope.user['上載成績表影印本(Upload Copy of School Report Card)'],
                        '上載校內校外活動紀錄(Upload Copy of ECA Record)': $scope.user['上載校內校外活動紀錄(Upload Copy of ECA Record)'],
                        '上載證書及獎項(Upload Copy of Certificate & Awards)': $scope.user['上載證書及獎項(Upload Copy of Certificate & Awards)'],
                        '上載服務紀錄(Upload Copy of Service Record)': $scope.user['上載服務紀錄(Upload Copy of Service Record)'],
                        '上載推薦信(Upload Copy of Recommend Letter)': $scope.user['上載推薦信(Upload Copy of Recommend Letter)']
        
                    }
                    var url = 
                        [
                            $scope.user['上載申請表(Upload Application Form)'], 
                            $scope.user['上載自我介紹文章(Upload Personal Introduction Form)'], 
                            $scope.user['上載成績表影印本(Upload Copy of School Report Card)'], 
                            $scope.user['上載校內校外活動紀錄(Upload Copy of ECA Record)'], 
                            $scope.user['上載證書及獎項(Upload Copy of Certificate & Awards)'], 
                            $scope.user['上載服務紀錄(Upload Copy of Service Record)'], 
                            $scope.user['上載推薦信(Upload Copy of Recommend Letter)']
                        ];
                    $http(
                    {
                        method: 'POST',
                        url: 'https://d8fz9pfue5.execute-api.ap-northeast-1.amazonaws.com/prod/yes-i-can-update-combined-pdf',
                        data: {'formdata':updatedata,'url':url,'formname':$scope.formname,'bucketname':'www.yesican.org.hk','id':$scope.user['電郵'],'formid':$scope.user['formid']}
                    }) 
                     .then(function(data) {
                        if (data.data.code > 0) {
                            console.log(data.data);
                            emailToAdminUpdate();
        					emailToUserUpdate();
                            alert('更新成功. 你們會受到電郵通知. 若不能收到, 請聯絡我們查詢');
                        } else {
                            console.log(data);
                            alert('更新失敗，請重新再試');
                        }
                    },
                    function(error) {
                        console.log('Error',error);
                        alert('更新失敗，請重新再試');
                    }
                    );
                } else {
                    alert("你尚有檔案未上載");
                }
             }
                
            function emailToAdminUpdate() {
                console.log($scope.receiveemail);
                if(!$scope.receiveemail){
                    alert("提交成功");
                    location.reload();
                    return false;
                }
                api = "https://9hhtm40jpe.execute-api.ap-northeast-1.amazonaws.com/sendemail";
                var jsonToAdmin = {};
                jsonToAdmin['from'] = 'info@yesican.org.hk';
                jsonToAdmin['to'] = 'yesicanhk@gmail.com';
                jsonToAdmin['subject'] = $scope.formname+'表格';
                jsonToAdmin['html'] = 
                '有新的 '+$scope.formname+
                ' 資料更新<br><br>參考編號為:'+$scope.user['formid']+
                '<br><br>姓名(中文):'+$scope.user['姓名(中文)']+
                '<br><br>電郵:'+$scope.user['電郵']+
                '<br><br>其他資料，請登入後台查看'  
                
        
                console.log('Form',$scope.formdata);
                $.ajax({
                    type: "POST",
                    url: api,
                    data: JSON.stringify(jsonToAdmin),
                    //async: false,
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
            	
            function emailToUserUpdate() {
                 console.log('Update Email TO User');
                console.log($scope.receiveemail);
        //        if(!$scope.receiveemail){
        
        //            location.reload();
        //            return false;
        //        }
                api = "https://9hhtm40jpe.execute-api.ap-northeast-1.amazonaws.com/sendemail";
                var jsonToAdmin = {};
                jsonToAdmin['from'] = 'info@yesican.org.hk';
                jsonToAdmin['to'] = $scope.user['電郵'];
                jsonToAdmin['subject'] = '我們已經收到你的申請文件';
                jsonToAdmin['html'] = `
        			致：「原來我得㗎」獎學金計劃 申請人 <br>
        <br>
        			感謝你的申請，我們已經收到你的申請文件。<br>
        <br>
        			「我都得」教育基金沒有額外義工替同學檢查，煩請自行檢查是否已交齊所有有關文件。<br>
        			成功的第一步便是嘗試！ 申請人必須參與所有申請程序，請先預留11月10日（六）下午出席第一個申請程序 – 「獎學金解說會」，日期確實後，將於我都得教育基金網站 http://www.yesican.org.hk 發放相關資料。同學必須於11月1日後主動到網頁 “最新消息” 查閱「獎學金解說會」日期及詳情。
        <br>
        <br>
        			解說會內容： <br>
        			1) 各申請程序要注意的地方；<br>
        			2) 獎學金的性質及要求；<br>
        			3) 申請人應有的期望；<br>
        			4) 升學的考慮<br>
        <br>
        			注意： <br>
        			1) 每位獎學金申請人必須 準時 出席；<br>
        			2) 最少一位家長或合法監護人必須出席 (如家長不能出席，申請人不能繼續參與獎學金) ；<br>
        			3) 歡迎邀請學校教職員，或關心你的同學、朋友一同出席，人數不限；<br>
        			4) 請帶備一支原子筆；<br>
        			5) 如有任何問題，歡迎於解說會中提出；<br>
        			6) 日後所有關於獎學金的申請程序，均於網上發佈，不另行個別通知，同學必須自行上網查閱<br>
        <br>
        			＊＊＊＊＊＊＊＊＊＊ 這是電腦發送的郵件，請勿回覆，如有查詢，請電郵yesicanhk@gmail.com ＊＊＊＊＊＊＊＊＊＊<br>
        		`;
                
        
                console.log('Form',$scope.formdata);
                $.ajax({
                    type: "POST",
                    url: api,
                    data: JSON.stringify(jsonToAdmin),
                    //async: false,
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
                    return new Promise(function (resolve, reject) {
        
                        api = "https://9hhtm40jpe.execute-api.ap-northeast-1.amazonaws.com/sendemail";
                        var jsonToAdmin = {};
                        jsonToAdmin['from'] = 'info@yesican.org.hk';
                        jsonToAdmin['to'] = $scope.formdata['電郵'];
                        jsonToAdmin['subject'] = '「我都得教育基金」-你的申請已被確認';
                        jsonToAdmin['html'] =`				
                            閣下可到本網站 http://www.yesican.org.hk 登入, 以更改資料及查看申請狀況和通知";
                            <br>以下是閣下登入資料:
                            <br>
                            賬號: 你的註冊電郵 (即本電郵)
                            <br>
                            密碼:`+$scope.password;
                            console.log(JSON.stringify(jsonToAdmin));
                        $.ajax({
                            type: "POST",
                            url: api,
                            data: JSON.stringify(jsonToAdmin),
                            //async: false,
                            contentType: "text/json; charset=utf-8",
                            dataType: "json",
                            success: function(msg) {
                                
                                alert('成功電郵通知賬戶資料');
                                resolve();
                            },
                            error: function(msg) {
                                console.log(msg);
                                alert('傳送失敗. 請另行通知用戶');
                                reject();
                            }
                        });
                    });
                }
        
            function emailToAdmin() {
                console.log($scope.receiveemail);
                // if(!$scope.receiveemail){
                //     alert("提交成功");
                //     location.reload();
                //     return false;
                // }
                api = "https://9hhtm40jpe.execute-api.ap-northeast-1.amazonaws.com/sendemail";
                var jsonToAdmin = {};
                jsonToAdmin['from'] = 'info@yesican.org.hk';
                jsonToAdmin['to'] = 'yesicanhk@gmail.com';
                jsonToAdmin['subject'] = $scope.formname+'表格';
                jsonToAdmin['html'] = 
                '有新的 '+$scope.formname+
                ' 表格提交<br><br>參考編號為:'+$scope.formdata.formid+
                '<br><br>姓名(中文):'+$scope.formdata['姓名(中文)']+
                '<br><br>電郵:'+$scope.formdata['電郵']+
                '<br><br>其他資料，請登入後台查看'	
                
        
                console.log('Form',$scope.formdata);
                $.ajax({
                    type: "POST",
                    url: api,
                    data: JSON.stringify(jsonToAdmin),
                    //async: false,
                    contentType: "text/json; charset=utf-8",
                    dataType: "json",
                    success: function(msg) {
                        alert("提交成功");
                 //       location.reload();
                    },
                    error: function(msg) {
                        alert("提交成功");
                   //     location.reload();
                    }
                });
            }
        
            /*
            function emailToUser() {
                console.log($scope.receiveemail);
                if(angular.isUndefined($scope.formdata['電郵'])){
                    //alert("提交成功");
                    emailToAdmin();
                      //location.reload();
                    return false;
                }
                api = "https://9hhtm40jpe.execute-api.ap-northeast-1.amazonaws.com/sendemail";
                var jsonToAdmin = {};
                jsonToAdmin['from'] = 'kan@01power.net';
                jsonToAdmin['to'] = $scope.formdata['電郵'];
                jsonToAdmin['subject'] = $scope.formname+'表格';
                jsonToAdmin['html'] = '您的'+$scope.formname+'表格成功提交<br><br>參考編號為:'+$scope.formdata.formid+"<br><br>"+JSON.stringify($scope.formdata);
                console.log($scope.formdata);
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
        	*/         
        }
    };
    return dzSlider;
});


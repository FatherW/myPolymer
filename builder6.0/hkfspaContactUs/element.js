var app = angular.module('demoApp');
var name = 'hkfspaContactUs';

app.directive(name, function ($compile, $templateRequest, $mdDialog, $uibModal,$dazzleUser,$dazzleS3,$dazzlePopup,$dazzleFn,$dazzleInit,pageInfo,userInfo,dzFn) {
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "//d27btag9kamoke.cloudfront.net/builder6.0/hkfspaContactUs/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "//d27btag9kamoke.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http,$mdSidenav, $mdBottomSheet,$log,$http,$location) {
            
               AWS.config = new AWS.Config();
                AWS.config.accessKeyId = "AKIAIOCIHTJ47YSHEE7Q";
                AWS.config.secretAccessKey = "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";
                AWS.config.region = "ap-northeast-1";
                $scope.formdata={};
                $scope.submitMyForm = function() {
            
                    console.log($scope.formdata);
                    console.log($scope.hostname);
                    if($scope.myForm.$valid){
                    //https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/saveformdatatojson
                    var createData=new Date();
                    $scope.formdata.formid=createData.getTime();
                	var nd=new Date((createData.getTime()/1000+(3600*8))*1000);
                    $scope.formdata['日期時間']=nd.toGMTString();
                    $scope.formdata['日期']=createData.getTime();
                    $http(
                    		{
                                method: 'POST',
                                url: 'https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/saveformdatatojson',
                                data: {'formdata':$scope.formdata,'formname':$scope.formname,'bucketname':$scope.hostname,'websiteKey':$scope.websiteKey}
                            })
                            .then(function(succeed) {
                            	console.log(succeed);
                                if (succeed.data.code > 0) {
                                	emailToUser();
                                    emailToAdmin();
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
                
                function emailToAdmin() {
                        console.log($scope.receiveemail);
                        if(!$scope.receiveemail){
                        		alert("提交成功");
                                location.reload();
                                return false;
                        }
                        api = "https://9hhtm40jpe.execute-api.ap-northeast-1.amazonaws.com/sendemail";
                        var jsonToAdmin = {};
                        jsonToAdmin['from'] = 'support@01power.net';
                        jsonToAdmin['to'] = $scope.receiveemail;
                        jsonToAdmin['subject'] = $scope.formname+'表格';
                        jsonToAdmin['html'] = '有新的 '+$scope.formname+' 表格提交<br><br>參考編號為:'+$scope.formdata.formid+"<br><br>"+JSON.stringify($scope.formdata);
            
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
                        console.log($scope.receiveemail);
                        if(angular.isUndefined($scope.formdata['電郵'])){
                        		//alert("提交成功");
                        		emailToAdmin();
                                //location.reload();
                                return false;
                        }
                        api = "https://9hhtm40jpe.execute-api.ap-northeast-1.amazonaws.com/sendemail";
                        var jsonToAdmin = {};
                        jsonToAdmin['from'] = 'support@01power.net';
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
            
            
        }
    };
    return link;
});



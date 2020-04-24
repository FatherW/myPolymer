var app = angular.module('demoApp');



app.directive('userProfilePopup', function ($compile, $templateRequest, $mdDialog, $dazzlePopup,$dazzleData,$dazzleElastic
    ,dzFn,dbFactory,userInfo,dzS3,pageInfo) {
    var name = 'userProfilePopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/"+name+"/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "//d27btag9kamoke.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            scope.user = userInfo.user;
            
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser,$dazzleFn) {
                console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');
                $('#dz-pregress').hide();
                $scope.user = store.get('user');
                console.log('User',$scope.user);
                $scope.myDNS = null;
                
                $scope.checkDNS = function(){
                    var domain = $scope.website.domain;
                    if(domain){
                        dzFn.getDNS(domain).then(function(answer){
                            $scope.$apply(function(){
                                $scope.myDNS = answer.toString();
                                
                            });
                            
                            console.log(answer);
                        });                  
                    }
                }
                 $scope.editFactory2 = function(){
                     var params = {
                        name :'dzCodePopup',
                        directive: '<dz-code-popup></dz-code-popup>',
                        bucket : 'dazzle-template',
                        key: 'cdn6.4/dazzleFactory.6.5.2.js',
                        big:true
                    };
                    $dazzlePopup.callPopup(params).then(function(newCode){
                        dzS3.saveFile(userInfo.exportBucket, element, newCode);
                    });                        
                }
                $scope.editFactory5 = function(){
                     var params = {
                        name :'dzCodePopup',
                        directive: '<dz-code-popup></dz-code-popup>',
                        bucket : 'dazzle-template',
                        key: 'cdn6.4/dazzleFactory.6.5.5.js',
                        big:true
                    };
                    $dazzlePopup.callPopup(params).then(function(newCode){
                        dzS3.saveFile(userInfo.exportBucket, element, newCode);
                    });                        
                }
                
                $scope.checkDomain = function(){
                    $('#dz-pregress').show();
                    dzFn.checkDomainAvailability($scope.website['domain']).then(function(answer){
                        if (answer){
                            $('#av_domain').css('color','green').css('opacity',1).show();
                            $('#av_undomain').css('color','red').css('opacity',1).hide();
                        }
                        else{
                            $('#av_domain').css('color','green').css('opacity',1).hide();
                            $('#av_undomain').css('color','red').css('opacity',1).show();
                        }
                        $('#dz-pregress').hide();
                    },function(){
                        $('#av_domain').css('color','grey').css('opacity',0.2).show();
                        $('#av_undomain').css('color','red').css('opacity',1).hide();
                        $('#dz-pregress').hide();
                        console.log('Not Available');
                    });                       
                }
                
                $scope.buyDomain = function(){
                    
                     var confirm = $mdDialog.confirm()
                      .title('是否購買域名？')
                      .textContent('注意！每賬戶只能連接一個域名，故當購買完成後，整個網站會轉移至新域名，並不會作另行通知。')
                      .ok('是')
                      .cancel('否');
            
                    $mdDialog.show(confirm).then(function() {
                        dzFn.checkDomainAvailability($scope.website['domain']).then(function(answer){
                           alert('你已成功購買域名。此網站將會轉移至www.'+$scope.website['daomain']+'需時一個工作天。');
                        },function(){
                           alert('很抱歉，未能購買域名。請與我們客戶服務聯絡，我們會儘快跟進事情');
                        });                       
                    }, function() {
                    });
                    

                }
                
                $scope.save = function(user){
                    dbFactory.saveUser(user);
                    
                }
                $scope.uploadSite = function(){
                    var params = {
                        "name": "dzUploadZipPopup",
                        "directive":"<dz-upload-zip-popup></dz-upload-zip-popup>",
                        "key":"files/",
                        "bucket":userInfo.exportBucket
                    };
                    
                    $dazzlePopup.callPopup(params).then(function(files){
                        console.log('Uploaded');
                    });
                }
                $scope.siteFile = function(){
                    var params = {
                        name: 'dzFileModel',
                        directive:'<dz-file-model></dz-file-model>'
                    }
                    $dazzlePopup.callPopup(params).then(function(result){
                        
                    });
                }
        }
    };
    return link;
});


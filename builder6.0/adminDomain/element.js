var app = angular.module('demoApp');
    app.directive('adminDomain', function($compile, $timeout,$mdDialog, $mdToast, $dazzleS3,  $dazzleUser, $dazzlePopup,
    dzFn,dzS3) {
      // Function save$scope.thisPageJson, save$scope.masterJson, saveRootHtml, saveMasterAtom, save$scope.thisPage
      // $scope.thisPage => $scope.pagename
      // $scope.websiteKey => 'website/'+$scope.hostname;

      var adminDashboard = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/adminDomain/element.html?id=" + new Date().getTime(),
        controller: function($scope, $http, $element, $timeout, $ocLazyLoad,$mdSidenav) {
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

        }
      };
      return adminDashboard;
    });







//});
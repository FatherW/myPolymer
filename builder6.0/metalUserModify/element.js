var app = angular.module('demoApp');
var MD5 = function(d){result = M(V(Y(X(d),8*d.length)));return result.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}

/** NORMAL words**/

app.directive('metalUserModify', function ($http, $compile, $templateRequest, $interval, $mdDialog, $mdToast,$dazzleUser, $dazzleS3, $dazzlePopup, $ocLazyLoad) {
    var name = 'metalUserModify';
    var link = {
        restrict: 'E',
        scope:  true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/metalUserModify/element.html?id=" + new Date().getTime(),
         link: function ($scope, element, attrs) {
              var user = store.get('subUser') || null;
              
              $scope.user = user;
              if (!$scope.user) {
                  alert('未曾登入, 不能進入此頁');
                  location.href = "index.html";
              }
                
//              $scope.model = {};

//               if (!angular.isUndefined(user) && user['uid']==162) {
                    
//                     var ID= $dazzleUser.dazzleInfo['newUserID'];
//                     var name = $dazzleUser.dazzleInfo['newUserName'];
//                     var email=$dazzleUser.dazzleInfo['newUserEmail'];
                   
//                   if (confirm("是否新增用戶？")) {
//                       var password = prompt("請輸入新用戶密碼");
//                       $scope.user ={
//                           "uid": ID,
//                           "name":name,
//                           "mail":email,
//                           "password":MD5(password)
//                       };
// //                       $scope.save();
//                   } else {
//                     //   var password = prompt("請輸入用戶密碼, 以進入此頁");
//                     //     var result = MD5(password);
//                     //   if ($scope.user['password'] !=result){
//                     //       alert("密碼不符");
//                     //       location.href="/index.html";
//                     //   }
//                         if (!user)
//                             location.href = "/index.html";
//                         $scope.user = user;
//                   }
//               } else {
//                   alert('沒有任何用戶登入，閣下無權進入此頁');
//                   location.href="index.html";
//               }

                    //   var password = prompt("請輸入用戶密碼, 以進入此頁");
                    //     var result = MD5(password);
                    //   if ($scope.user['pass'] !=result){
                    //       alert("密碼不符");
                    //       location.href="/index.html";
                    //   }
            console.log('User Modify',$scope.user);
                var json;
                    json = {
                                "action": "getData",
                                "index": "5metal.dazzle.website",
                                "type": "user",
                                "id": $scope.user['uid']
                            };
    
                    $http({
                            "method": "post",
                            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                            "data":json
                        }).then(function (result) {
                            console.log(result);
                            if (result.data.code < 0) {
                                alert('不能找到用戶資料');
                            } else {
                                $scope.user = result.data.resolve;
                            }
                        });
               
            
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser,dzFn) {
        
        
                $scope.getNewID = function(){
                   return new Promise(function (resolve, reject) {
                       
                       Promise.all([$scope.getUserCount()]).then(function(values) {
                                var count = values[0]+40000;
                                resolve(count);
                        },function(){
                            reject();
                        });
                  });
                }
                $scope.getUserCount = function(){
                   return new Promise(function (resolve, reject) {
                    $http({
                      "method": "post",
                      "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                      "data":{
                        "action": "getCount",
                        "index": "5metal.dazzle.website",
                        "type": "user"
                  }
                    }).then(function (result) { 
                        if (result.data.code>0){
                                var count = result.data.resolve['count'];
                                resolve(count);                            
                        } else
                            reject();

                    });                   
                  });
                }        
        
                $scope.updateCategory = function(){
                     var params = {
                          'name':'metalCategoryPopup',
                          'directive':'<metal-category-popup></metal-category-popup>',
                          'categories':$scope.user['category']
                        };
                        
                        $dazzlePopup.callPopup(params).then(function(result){
                                $scope.user['category'] =result;

                        });
                }
                    $scope.upload = function(field){
                        var item;
                         var params = {
                            'name':'metalGalleryPopup',
                            'directive':'<metal-gallery-popup></metal-gallery-popup>',
                            'images':$scope.item
                        };
                        $dazzlePopup.callPopup(params).then(function(result){
                        
                          item= [dzFn.getFileUrl('large-web',result.gid)];
                            
                            $scope.model[field] = item;
                            $scope.save();
                            

                        });
                        // var params = {
                        //     'name':'metalImageGalleryPopup',
                        //     'directive':'<metal-image-gallery-popup></metal-image-gallery-popup>',
                        //     'images':[],
                        //     'owner':"owner:"+$scope.user['uid']
                        // };
                        // $dazzlePopup.callPopup(params).then(function(result){

                        //     item= [dzFn.getFileUrl('large-web',result.gid)];
                            
                        //     $scope.model[field] = item;
                        //     $scope.save();
                            
                        // });
                    }

                $scope.init = function() {
                     
                    
                
                }


                $scope.save = function() {
                     
                     var json;
                     var timestamp =Math.floor(Date.now() /1000);
    
                    console.log($dazzleUser.dazzleInfo);
                    $scope.user['changed'] = timestamp;
                    json = {
                                "action": "addData",
                                "index": "5metal.dazzle.website",
                                "type": "user",
                                "id": $scope.user['uid'],
                                "body": $scope.user   
                                
                            };
    
                    $http({
                            "method": "post",
                            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                            "data":json
                        }).then(function (result) {
                            console.log(result);
                            if (result.data.code < 0) {
                                alert('更新失敗');
                            } else {
                                alert('成功更新');
                            }
                        });
                
                }

		
					$scope.loadPage = function(page) {
						$('.part').hide();
						$('#'+page).show();
						$('.tab').removeClass('active');
						$('a[rel='+page+']').addClass('active');
					}
				     $scope.loadImage = function(images) {
                            var url;
                            if (Array.isArray(images))
                                url =  images[0];
                            else
                                url = images;
                               url = url.replace("Product#",""); 
            			    return url;
            			}
        }
    };
    return link;
});





var app = angular.module('demoApp');
app.directive('metalUserHeader', function ($http, $compile, $templateRequest, $interval, $mdDialog, $mdToast,$dazzleUser, $dazzleS3, $dazzlePopup, $ocLazyLoad) {
    var name = 'metalUserHeader';
    var link = {
        restrict: 'E',
        scope:  true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/metalUserHeader/element.html?id=" + new Date().getTime(),
         link: function ($scope, element, attrs) {
              var uid,user;
              user = store.get('subUser');
              uid = store.get('uid') || user['uid'] || null;

              console.log('Sub User',user);
              if (angular.isUndefined(user)  || user==null) {
                     $http({
                      "method": "post",
                      "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                      "data":{
                        "action": "getData",
                        "index": "5metal.dazzle.website",
                        "type": "user",
                        "id":uid
                      }
                    }).then(function (result) {
                      console.log('Load Sub User',result);
                      if (result.data.code < 0) {
                        store.set('subUser',null);
                        $scope.user = null;
                      } else {
                        store.set('subUser',result.data.resolve);
                        $scope.user = result.data.resolve;
                        $dazzleUser.dazzleInfo['subUser'] = result.data.resolve;
                      }
                    },function(err){
                        console.log(err);
                    });
              
              } else{
                $scope.user = user;            
                $dazzleUser.dazzleInfo['subUser'] = $scope.user;
              }
              
              $accessKey = "AKIAWRCMV3AN4VYNC5VA";
              $accessSecret ="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";
                AWS.config = new AWS.Config();
                AWS.config.accessKeyId = $accessKey;
                AWS.config.secretAccessKey = $accessSecret;
                AWS.config.region = 'ap-northeast-1';
                
              //  $scope.updateProductPage();
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
              var user = store.get('subUser') || null;
              var uid;
              $scope.user = user;
              if (user)
                 uid =  user['uid'] || null;
              else
                 uid =  null;
                 console.log('UID2',uid);
            
                if ($scope.user)    
                    $scope.newItem ={
                            body: "請填上產品內容",
                            category: [],
                            changed: parseInt(new Date().getTime()),
                            company_detail_home_recomm: null,
                            company_id: $scope.user['company_id'] ||null,
                            company_nid:$scope.user['company_id'] || null,
                            created: parseInt(new Date().getTime()),
                            diff_product: null,
                            home_recommend: null,
                            images: [],
                            info_recommend: null,
                            integer_weight: "3",
                            meta_abstract: null,
                            meta_canonical: null,
                            meta_copyright: null,
                            meta_description: null,
                            meta_keywords: null,
                            meta_meta_title: null,
                            meta_revisit_after: null,
                            meta_robots: null,
                            nid: null,
                            product_attributes: [],
                            product_code: "",
                            product_detail_spec:0,
                            product_list_spec: 0,
                            product_model: "",
                            product_model_real: "",
                            product_price: null,
                            product_unit: "件",
                            product_views: 0,
                            product_company: $scope.user['user_company'] || null,
                            recommended: null,
                            status: 1,
                            title: "請填上標題",
                            trade_vol: "0",
                            uid: uid,
                            up_down: "1",
                            weight: "0",
                            wiki_term: null 
                         };
                  


              $scope.getUser = function(company) {
                return new Promise(function (resolve, reject) {
                    $http({
                      "method": "post",
                      "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                      "data":{
                        "action": "searchData",
                        "index": "5metal.dazzle.website",
                        "type": "user",
                        "body":{
                            "query":{
                                "match":{
                                    'company_nid' :company  
                                }
                            }
                        }
                      }
                    }).then(function (result) { 
                            store.set('subUser',result.data.resolve[0]);
                            location.reload();
                    });

                });
                  
              }
              $scope.loginPopup = function(){
                  
             
                var params = {
                    "name":"metalLoginPopup",
                    "directive":"<metal-login-popup></metal-login-popup>",
                     width: '425px',
             height:'auto'
                };    

                $dazzlePopup.callPopup(params).then(function(user){
                      // location.href = "/node/"+user['nid'];
                     store.set('subUser',user);
                     $scope.user = user;
                //     $compile($element.contents())($scope);
                    
            //          console.log('Metal User',result);
            //      if (result.data.code < 0) {
            //        store.set('subUser',null);
            //        $scope.user = null;
            //      } else {
            //        store.set('subUser',result.data.resolve);
            //        $scope.user = result.data.resolve;
            //      }
                });              
                  
              }
              
              $scope.login = function(uid){
                   $http({
                      "method": "post",
                      "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                      "data":{
                        "action": "getData",
                        "index": "5metal.dazzle.website",
                        "type": "user",
                        "id":uid
                      }
                    }).then(function (result) {
                      console.log('Load Sub User',result);
                      if (result.data.code < 0) {
                        store.set('subUser',null);
                        $scope.user = null;
                      } else {
                        store.set('subUser',result.data.resolve);
                        $scope.user = result.data.resolve;
                      }
                    },function(err){
                        console.log(err);
                    });
              }
              
        $scope.isLogin = function() {
          if(!angular.isUndefined($scope.user) && $scope.user != null)
            return true;
          else
            return false;
        }
            $scope.isAdmin = function() {
              if(!angular.isUndefined($scope.user) && $scope.user != null && $scope.user['uid']=="162")
                return true;
              else
                return false;
            }
        $scope.changeUser = function() {
            var params ={
                name: 'metalCompanyPopup',
                directive: '<metal-company-popup></metal-company-popup>'
            }
            $dazzlePopup.callPopup(params).then(function(result){
                console.log(result);
                $scope.getUser(result['value']);
            });
        }
              $scope.newLogin = function() {
                  var params = {
                      name: "metalLoginPopup",
                      directive: "<metal-login-popup></metal-login-popup>",
            width: '425px',
            height:'auto'
          }
                  $dazzlePopup.callPopup(params).then(function(user){
                     // location.href = "/node/"+user['nid'];
                     console.log('User',user);
                     store.set('subUser',user);
                     $scope.user = user;
                     $compile($element.contents())($scope);
                  });
              }
             
       $scope.logout = function() {
         store.clearAll();
         $scope.user = null;
         
//         location.href="/user/logout";
          $compile($element.contents())($scope);
       }
       
       $scope.addMyCompany = function(){
           
           var params = {
              'name':'metalCompanyPopup',
              'directive':'<metal-company-popup></metal-company-popup>'
            };

            $dazzlePopup.callPopup(params).then(function(result){
                console.log('Company Select',result);
                var company_id = result['value'];
                $scope.user['user_company'] = result['display'];
                $scope.saveMyCompany(result['value'],result['display']);
            });                        
            
           
       }
                $scope.getCompanyId = function(name){
                    return new Promise(function (resolve, reject) {
                         $http({
                            "method": "post",
                            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                            "data":{
                                "action": "searchData",
                                "index": "5metal.dazzle.website",
                                "type": "company",
                                "body":{
                                   "query": {
                                       "match": { "title": name}
                                   }
                                }
                            }
                        }).then(function (result) {
                            console.log(result);
                            if (result.data.code < 0) {
                                resolve(null);
    //                            resolve({});
                            } else {
                                $scope.company_id = result.data.resolve[0]['nid'];
                                $scope.company_name = result.data.resolve[0]['title'];
                                resolve(result.data.resolve[0]['nid']);
                            }
                        });
                    });
                }

                $scope.isSeller = function(){
         //           console.log('My User',$scope.user['roles']);
                    if (Array.isArray($scope.user['roles']))
                        if ($scope.user['roles'].indexOf('賣貨者')>-1)
                            return true;
                        else
                            return false;
                    
                    return false;
                }

                $scope.isBuyer = function(){
           //         console.log('My User',$scope.user['roles']);
                    if (Array.isArray($scope.user['roles']))
                        if ($scope.user['roles'].indexOf('求貨者')>-1)
                            return true;
                        else
                            return false;
                    return false;
                }
              

                $scope.getNewID = function(){
                   return new Promise(function (resolve, reject) {
                       
                       Promise.all([$scope.getProductCount(),$scope.getCompanyCount(),$scope.getUserCount()]).then(function(values) {
                                var count = values[0]+values[1] + values[2]+40000;
                                resolve(count);
                        },function(){
                            reject();
                        });
                  });
                }
                $scope.getUserNewID = function(){
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
                $scope.getProductCount = function(){
                   return new Promise(function (resolve, reject) {
                    $http({
                      "method": "post",
                      "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                      "data":{
                        "action": "getCount",
                        "index": "5metal.dazzle.website",
                        "type": "product"
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
                $scope.getCompanyCount = function(){
                   return new Promise(function (resolve, reject) {
                    $http({
                      "method": "post",
                      "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                      "data":{
                        "action": "getCount",
                        "index": "5metal.dazzle.website",
                        "type": "company"
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
                
                $scope.addUser = function(){
                    var name = prompt("請輪入用戶名稱，注意不能與其他人重覆，並以不多於8個的英文及數字所組成。（大小寫有區分）");
                    
                    if (name){
                        var email = prompt("請輸入注冊電郵，注意不能與其他人重覆");
                        if (email){
                            $scope.getUserNewID().then(function(ID){
                               var password = prompt("請輸入新用戶密碼");
                               $scope.model ={
                                   "uid": ID,
                                   "name":name,
                                   "mail":email                               };

                                 $http({
                                    "method": "post",
                                    "url": "https://j96d5s2sme.execute-api.ap-northeast-1.amazonaws.com/prod/login",
                                    "data": {
                                        "uid":ID,
                                        "name": name,
                                        "pass": password,
                                        "mail": email,
                                        "type": "login5metalByRegister"
                                    }
                                }).then(function (result) {
                                    console.log(result);
                                    if (result.data.code > 0) {
                                        alert("註冊新用戶成功，我們會轉換閣下成新用戶，並繼續輸入資料");
                                        store.set('subUser',$scope.model);

                                        location.href = "/user/modify.html";
                                    } 
                                }, function () {
                                    alert('註冊失敗');
                                });
                                
                            });                            
                        }

                    }                                        
                }
                
            
                $scope.saveMyCompany = function(nid,title){
                 return new Promise(function (resolve, reject) {
                         var short_code = prompt("請輸入網址short code", "注意只能是小階英文及數字。建議不能超過8個字符");
                          if (short_code != null) {
                              
                                $scope.getFile("5metal.dazzle.website","my-company-template.html").then(function(html){
                                            //html=html.replace("[nid]",nid);
                                            var find = '「nid」';
                                            var re = new RegExp(find, 'g');
                                            
                                            html = html.replace(re, nid);
                                            find = '「title」';
                                            re = new RegExp(find, 'g');
                                            html = html.replace(re, title);
                                            
                                            
                                            console.log('HTML',html);
                                            $scope.getFile("5metal.dazzle.website",short_code).then(function(){
                                                alert('專頁已存在。請檢查資料是否有誤');
                                                reject();
                                                
                                            },function(){
                                                $scope.saveHtml("5metal.dazzle.website", short_code, html).then(function(){
                                                    alert('已成功新增.');
                                                    //location.href ="/"+url_code;
                                                    resolve();                                                
                                                },function(){
                                                    alert('檔案存取有誤');
                                                    reject();                                                    
                                                });
                                            
                                            });
                                                
                                            
                                        },function(){
                                            alert('樣辦檔案讀取有誤');
                                            reject();
                                        });

                          }
                    });
                }
            
                $scope.addProduct = function(){
                 return new Promise(function (resolve, reject) {
                
                        console.log('Add Item',$scope.user);    
                         var title = prompt("請輸入產品標題", "留意標題會成為產品網址，請勿重覆.");
                          if (title != null) {
                                $scope.getNewID().then(function(nid){
                                    $scope.saveProduct(nid,title).then(function(){
                                        //location.href = "/node/template";
                                        alert('已成功新增產品，產品ID為：'+nid+'. 請繼續編輯');
                                        location.href ="http://5metal.dazzle.website/node/"+nid;
                                        
                                    });
                                    
                                });
                          }
                    });
                }
                  $scope.getFile = function (bucket, key) {
                        return new Promise(function (resolve, reject) {
                            var s3 = new AWS.S3();
                            var params = {
                                Bucket: bucket,
                                Key: key,
                                ResponseExpires: new Date()
                            };
                            s3.getObject(params, function (err, data) {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(data.Body.toString());
                                }
                            });
                        });
                    }
                
                    $scope.saveHtml = function (bucket, key, string) {
                        return new Promise(function (resolve, reject) {
                            var s3 = new AWS.S3();
                            var params = {
                                Bucket: bucket,
                                Key: key,
                                Body: string
                            }
                        
                            params.ContentType='text/html';
                            s3.putObject(params, function (err, data) {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(data);
                                }
                            });
                        });
                    }
                 $scope.updateProductPage = function(){
                      return new Promise(function (resolve, reject) {
                        
                          $http({
                              "method": "post",
                              "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                              "data":{
                                        "action": "searchData",
                                        "index": "5metal.dazzle.website",
                                        "type": "product",
                                        "body": {
                                            "_source": [ "nid", "title" ],
                                            "query": {
                                                "match_all":{}
                                            }
                                        }
                                  }
                            }).then(function (result) { 
                                if (result.data.code >0){
                                    var length = result.data.resolve.length;
                                    var i=0;
                                        $scope.getFile("5metal.dazzle.website","product-template.html").then(function(sample){
                                            angular.forEach(result.data.resolve,function(item,index){
                                                var nid = item['nid'];
                                                var title = item['title'];
                                                var html = sample;            
                                                    //html=html.replace("[nid]",nid);
                                                    var find = '「nid」';
                                                    var re = new RegExp(find, 'g');
                                                    
                                                    html = html.replace(re, nid);
                                                    find = '「title」';
                                                    re = new RegExp(find, 'g');
                                                    html = html.replace(re, title);
                                                    
                                                    console.log('Success Product',nid);                                            
                                                    $scope.saveHtml("5metal.dazzle.website","content/"+title);
                                                    $scope.saveHtml("5metal.dazzle.website", "node/"+nid, html).then(function(){
                                                        i++;
                                                        if (i>=length)
                                                            resolve();
                                                    },function(){
                                                        i++;
                                                        if (i>=length)
                                                            resolve();
                                                    });
        
                                                                                 
                                            });
                                        },function(){
                                            reject();
                                        });      
                                }
                                
                                
                            });
                            
                      });
                 }
              
                 $scope.saveProduct = function(nid,title){
                     var model = $scope.newItem;
                     model['nid'] = nid;
                     model['title'] =title;
                     
                    return new Promise(function (resolve, reject) {
                        
                          $http({
                              "method": "post",
                              "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                              "data":{
                                        "action": "addData",
                                        "index": "5metal.dazzle.website",
                                        "type": "product",
                                        "id":nid,
                                        "body":model
                                  }
                            }).then(function (result) { 
                                        $scope.getFile("5metal.dazzle.website","product-template.html").then(function(html){
                                            //html=html.replace("[nid]",nid);
                                            var find = '「nid」';
                                            var re = new RegExp(find, 'g');
                                            
                                            html = html.replace(re, nid);
                                            find = '「title」';
                                            re = new RegExp(find, 'g');
                                            html = html.replace(re, title);
                                            
                                            
                                            console.log('HTML',html);
                                            $scope.saveHtml("5metal.dazzle.website","content/"+title);
                                            $scope.saveHtml("5metal.dazzle.website", "node/"+nid, html).then(function(){
                                                resolve();                                                
                                            });

                                        },function(){
                                            reject();
                                        });
                            });
                        
                    });
                }

        }
    };
    return link;
});





var app = angular.module('demoApp');
//require(['store'],function(store){
        app.directive('metalUserBindCompany', function ($compile, $timeout,  $mdDialog, $mdToast, $dazzleS3,$dazzleUser, $dazzlePopup,$http) {
                   
        
            var metalUserBindCompany = {
                restrict: 'E',
                priority: 1000,
                scope: true,
                templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/metalUserBindCompany/element.html?id=" + new Date().getTime(),
                link: function ($scope, element, attrs) {
                      var user = store.get('subUser');
                      $scope.user = user;
                                    if (!angular.isUndefined(user)) {
                                        $scope.user = user;
                                    } else {
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
                                                console.log(result);
                                                if (result.data.code < 0) {
                                                    console.log('Unsuccess');
                                                    $scope.user = null;
                                                } else {
                                                    $scope.user = result.data.resolve;
                                                    store.set('subUser',$scope.user);
                                                    
                                                }
                                            });
                                    }          
                                    
                      $accessKey = "AKIAWRCMV3AN4VYNC5VA";
                      $accessSecret ="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";
                        AWS.config = new AWS.Config();
                        AWS.config.accessKeyId = $accessKey;
                        AWS.config.secretAccessKey = $accessSecret;
                        AWS.config.region = 'ap-northeast-1';
                    
                }, 
                controller: function ($scope, $http, $element) {
                     $scope.updateCompanyPage = function(){
                         
                            $http({
                                "method": "post",
                                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                                "data":{
                                    "action": "addData",
                                    "index": "5metal.dazzle.website",
                                    "type": "company",
                                    "id":$scope.user['company_id'],
                                    "body":{
                                        "uid":$scope.user['uid']
                                    }
                                }
                            }).then(function (result) {
                                console.log(result);
                                if (result.data.code < 0) {
                                    alert('不能綁定');
                                } else {
                                    alert('成功綁定');
                                }
                            });
                     } 
                     
                  $scope.addCompany = function(){
                 return new Promise(function (resolve, reject) {
                
                         var title = prompt("請輸入公司標題", "留意標題會成為網址名稱，請勿重覆.");
                          if (title != null) {
                                $scope.getNewID().then(function(nid){
                                    $scope.saveCompany(nid,title).then(function(){
                                        //location.href = "/node/template";
                                        alert('已成功新增公司頁，公司ID為：'+nid+'. 請繼續編輯');
                                        location.href ="/node/"+nid;
                                        
                                    });
                                    
                                });
                          }
                    });
                }
                
                $scope.getNewID = function(){
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
                                count = 40000 + count +1;
                                resolve(count);                            
                        } else
                            reject();

                    });                   
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
                    $scope.newItem = {
                        bid_times: 0,
                        bidwin_times: 0,
                        body: "",
                        changed: new Date().getTime(),
                        company_address: null,
                        company_code: null,
                        company_fax: null,
                        company_keywords: null,
                        company_logo: ["https://www.5metal.com.hk/sites/all/themes/metal/images/logo_company.jpg"],
                        company_mode: null,
                        company_name_en: null,
                        company_recommend: 0,
                        company_size: null,
                        company_tel: null,
                        company_type: [],
                        company_url: null,
                        company_views: 0,
                        contact_method: null,
                        contact_person: null,
                        created: new Date().getTime(),
                        distirct: null,
                        email: null,
                        last_post_product_date: new Date().getTime(),
                        merchant_times: 0,
                        meta_abstract: null,
                        meta_canonical: null,
                        meta_copyright: null,
                        meta_description: null,
                        meta_keywords: null,
                        meta_meta_title: null,
                        meta_revisit_after: null,
                        meta_robots: null,
                        mobile: null,
                        myProducts: [],
                        nid: null,
                        noProduct: 0,
                        product_limit: 10,
                        sale_type: "批發為主",
                        show_company_product: 0,
                        slide_images: [],
                        status: 1,
                        template: null,
                        title: "No Title",
                        uid: $scope.user['uid'],
                        url_code: null,
                        voting: 0
                    }
                    
                    $scope.saveCompany = function(nid,title){
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
                                            "type": "company",
                                            "id":nid,
                                            "body":model
                                      }
                                }).then(function (result) { 
                                            $scope.getFile("5metal.dazzle.website","company-template.html").then(function(html){
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
            return metalUserBindCompany;
        }); 
 
 
 
 



//});
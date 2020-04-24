var app = angular.module('demoApp');
var no_per_page = 60;
var all_tid_arr = [];
var all_did_arr = [];
var all_sid_arr = [];
var did_ele = 0;
var sid_ele = 0;
var tid_ele = 0;
var order = "";
var order_parm = "";
var order_type = "";
var product_sorting = {};
var tid_query = {};
var did_query = {};
var sid_query = {};
var company_query = [];
var text = "";
var search_keyword = "";
var randomdata = [];
var randomArray = [];
var page = 0;
var start = page * no_per_page;
var end = no_per_page;

var company_name_arr = [];
var company_name = "";


$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
        return null;
    }
    else{
        return decodeURI(results[1]) || 0;
    }
}
 app.controller('AppCtrl', function ($timeout,$scope,$http) {
          // In this example, we set up our model using a plain object.
          // Using a class works too. All that matters is that we implement
          // getItemAtIndex and getLength.
           var vm = this;
           var data={};
            var query_init = {};
            // $scope.init = function() {
            //     console.log('App Ctrl');
            //     $scope.page++;
            //       $scope.from = $scope.page * no_per_page;
            //     $scope.getProductQuery();
            //     console.log($scope.query_init);
                
            // }
            
          $scope.infiniteItems = {
              numLoaded_: 0,
              toLoad_: 0,
              items: [],

              // Required.
              getItemAtIndex: function (index) {
                  if (index > this.numLoaded_) {
                      this.fetchMoreItems_(index);
                      return null;
                  }
                  return this.items[index];
              },

              // Required.
              getLength: function () {
                  return this.numLoaded_ + 60;
              },

              fetchMoreItems_: function (index) {
                 var that = this;
                  if (this.toLoad_ < index) {
                      this.toLoad_ += 60;
                      // $http.get('items.json').then(angular.bind(this, function (obj) {
                      //     this.items = this.items.concat(obj.data);
                      //     this.numLoaded_ = this.toLoad_;
                      // }));
                      query_init = {
                          "method": "post",
                          "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                          "data":{
                              "action": "searchData",
                              "from" : this.toLoad_,
                              "size" : 60,
                              "index": "5metal.dazzle.website",
                              "type": "product",
                              "body": {
                                  "_source" : ["nid","title","images","product_company","company_id","product_price"],
                                  
                                  "query": {
                                    "match_all": {}
                                  }
                              }
                          }
                      }
                       $scope.page++;
                        $scope.from = $scope.page * no_per_page;
                        $scope.getProductQuery();
                      console.log('My Query',$scope.query_init);
                      $http($scope.query_init).then(function (result) {
                          console.log("Product result:",result);
                          if (result.data.code < 0) {
                              console.log('Unsuccess');
                          } else {
                              console.log(result.data.resolve);
                              data = JSON.parse(angular.toJson(result.data.resolve));
                              that.items = that.items.concat(data);
                              that.numLoaded_ = that.toLoad_;
                          }
                      });
                      
                      
                      
                      
                  }
              }
          };




       });

app.directive('metalProductFilter', function ($http, $compile, $templateRequest, $interval, $mdDialog,  $dazzleUser,  $dazzleS3, $dazzlePopup, $ocLazyLoad) {
    var name = 'metalProductFilter';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/metalProductFilter/element.html?id=" + new Date().getTime(),
         link: function (scope, element, attrs) {
                //   $scope.getProductQuery();
                //   console.log()
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser,$timeout) {

            $scope.hello = function() {
                console.log('hello');
            }
        
            $scope.logout = function() {
                store.clearAll();
            }
        
            $scope.myDate = function(timestamp){
                //console.log(timestamp);
                var newTS,d,str;
                if (timestamp> 1000000000000)
                    newTS = timestamp;
                else
                    newTS = timestamp *1000;
        
                d = new Date(newTS);
                str = d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes();
                console.log(str);
                return str;
        //                return new Date(newTS).toLocaleDateString();
            }
        
            $scope.isAdmin = function(){
                var user = store.get('user');
                console.log('is Admin',user);
                if (!angular.isUndefined(user) && user['uid']==162) {
                    // console.log('true');
                    return true;
                }
                else {
                    // console.log('false');
                    return false;
                }
        
            }
            
       

        
            $scope.userLogin = function(uid){
                return new Promise(function (resolve, reject) {
        
                    console.log('company Init',uid);
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "getData",
                            "index": "5metal.dazzle.website",
                            "type": "user",
                            "id":uid
        //                     "body": {
        // //                        "_source" : ["nid", "company_logo","title"],
        //                         "query":{
        //                             "match":{
        //                                 "uid":uid
        //                             }
        //                         }
        //                     }
                        }
                    }).then(function (result) {
                        //console.log(result);
                        if (result.data.code < 0) {
                            console.log('Unsuccess');
                        } else {
                            //console.log('ID',id,result.data.resolve);
                            $scope.user = result.data.resolve;
                            store.set('user',$scope.user);
                            console.log('Hot Success', $scope.user);
        //                    $scope.reload();
                            resolve();
                        }
                    });
                });
        
            }
            $scope.loadImage = function(images) {
                var loadImages;
                if (Array.isArray(images))
                    loadImages=images[0];
                else
                    loadImages = images;
        
                if (angular.isUndefined(loadImages))
                    loadImages = 'https://www.5metal.com.hk/sites/all/themes/metal/images/logo_company.jpg';
        
             //   console.log('Load Images',loadImages);
                return loadImages;
        
            }
            $scope.list = [
                {
                    "id": 1,
                    "title": "node1",
                    "nodes": [
                        {
                            "id": 11,
                            "title": "node1.1",
                            "nodes": [
                                {
                                    "id": 111,
                                    "title": "node1.1.1",
                                    "nodes": []
                                }
                            ]
                        },
                        {
                            "id": 12,
                            "title": "node1.2",
                            "nodes": []
                        }
                    ]
                },
                {
                    "id": 2,
                    "title": "node2",
                    "nodrop": true,
                    "nodes": [
                        {
                            "id": 21,
                            "title": "node2.1",
                            "nodes": []
                        },
                        {
                            "id": 22,
                            "title": "node2.2",
                            "nodes": []
                        }
                    ]
                },
                {
                    "id": 3,
                    "title": "node3",
                    "nodes": [
                        {
                            "id": 31,
                            "title": "node3.1",
                            "nodes": []
                        }
                    ]
                }
            ];
        
            $scope.indexSlides = [
                "http://www.5metal.com.hk/sites/all/themes/metal/images/slide1.jpg",
                "http://www.5metal.com.hk/sites/all/themes/metal/images/slide2.jpg",
                "http://www.5metal.com.hk/sites/all/themes/metal/images/slide3.jpg",
                "http://www.5metal.com.hk/sites/all/themes/metal/images/slide4.jpg"
            ];
            $scope.company = [];
            $scope.data = [];
            $scope.bigdata = [];
            $scope.newdata = [];
            $scope.hotData =[];
            $scope.start = start;
            $scope.end = end;
            $scope.status = { "match": { "status":  1 }};
            $scope.grandTotal = 0;
            $scope.randomData = [];
            $scope.recordtotal = 0;
            $scope.index = "5metal.dazzle.website";
            $scope.producttable = "product";
            $scope.companytable = "company";
            $scope.active = {};
            $scope.sortOrder ={};
            $scope.companyActive = {};
            $scope.companySortOrder = {};
        
            $scope.active['view'] = '';
            $scope.active['price'] = '';
            $scope.active['update'] = 'active';
        
            $scope.sortOrder['view'] = 'desc';
            $scope.sortOrder['price'] = 'desc';
            $scope.sortOrder['update'] = 'desc';
        
        
            $scope.companyActive['view'] = 'active';
            $scope.companyActive['stock'] = '';
            $scope.companyActive['vote'] = '';
            $scope.companyActive['register'] = '';
        
            $scope.companySortOrder['view'] = 'desc';
            $scope.companySortOrder['stock'] = 'desc';
            $scope.companySortOrder['vote'] = 'desc';
            $scope.companySortOrder['register'] = 'desc';
            $scope.page = 0;
            $scope.from = 0;
            console.log('Load Me');
        
            $scope.urlParam = function(name){
                var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
                if (results==null){
                    return null;
                }
                else{
                    return decodeURI(results[1]) || 0;
                }
            }
        
            $scope.reload = function() {
                $scope.loading = false;
            }
        
        
            $scope.hotCompanyInit = function(id) {
                return new Promise(function (resolve, reject) {
        
                    console.log('company Init');
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "searchData",
                            "index": "5metal.dazzle.website",
                            "type": "company",
                            "body": {
                                "_source" : ["nid", "company_logo","title"],
                                "query":{
                                    "match":{
                                        "company_recommend":1
                                    }
                                },
                                "from":0,
                                "size":$scope.size
                            }
                        }
                    }).then(function (result) {
                        //console.log(result);
                        if (result.data.code < 0) {
                            console.log('Unsuccess');
                        } else {
                            //console.log('ID',id,result.data.resolve);
                            $scope.hotCompanyList = result.data.resolve;
                            console.log('Hot Success', $scope.hotCompanyList);
                            $scope.reload();
                            resolve();
                        }
                    });
                });
            }
            $scope.loadCompanyMore = function() {
                console.log("More:",start,end,$scope.total,$scope.end,$scope.recordtotal);
                $scope.loading = true;
                if ($scope.recordtotal > 0) { $scope.total = $scope.recordtotal};
                if ($scope.total >= $scope.end) {
                    page++;
                    start = page * no_per_page;
                    //end = (page+1) * 60;
                    $scope.initCompany();
                }
            }
            $scope.loadMore = function() {
                var data;
                console.log("More:",start,end,$scope.total,$scope.end,$scope.recordtotal);
                $scope.loading = true;
                
                if ($scope.recordtotal > 0) { $scope.total = $scope.recordtotal};
                if ($scope.total >= $scope.end) {
                    $scope.page++;
                    $scope.from = $scope.page * no_per_page;
                    //end = (page+1) * 60;
                    $scope.init($scope.queryType);
                }
            }
            $scope.initSetting = function() {
                $.urlParam = function(name){
                    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
                    if (results==null){
                        return null;
                    }
                    else{
                        return decodeURI(results[1]) || 0;
                    }
                }
        
                order = $.urlParam('order');
                order_type = $.urlParam('order_type');
                //page = $.urlParam('page');
                //console.log('Page:',page);
        
                if (order == null && order_type == null) {
                    $(".order_list li .active.asc").removeClass('active');
                    $(".order_list li .active.desc").removeClass('active');
                    $("#sort_update").removeClass('asc');
                    $('#sort_update').addClass('desc');
                    $('#sort_update').addClass('active');
                    product_sorting = {"changed": {"order" :"desc"}};
                    $scope.product_sorting = product_sorting;
                }
        
                if (order == null) {
                    order = "changed";
                    $scope.order = order;
                }
        
                if (order_type == null) {
                    order_type = "desc";
                    $scope.order_type = order_type;
                }
        
                var tid = $.urlParam('tid');
                if (tid != null) {
                    var tid_arr = tid.split(',');
                    for (var a=0; a<tid_arr.length; a++) {
                        if (tid_arr[a] >=1 && tid_arr[a] <= 8) {
                            $("#sub_category_"+tid_arr[a]).children("li").children("a").each(function(){
                                all_tid_arr.push($(this).text());
                            })
                        } else if (tid_arr[a] > 8) {
                            if ($.inArray(tid_arr[a], all_tid_arr)) {
                                var tid_name = $("#ref_"+tid_arr[a]).text();
                                all_tid_arr.push(tid_name);
                            }
                        }
                    }
                    tid_ele = 1;
                    tid_query = {"terms":{"category": all_tid_arr}};
                    $scope.tid_query = tid_query;
                    $scope.tid_ele = tid_ele;
                }
        
                var did = $.urlParam('region');
                if (did != null) {
                    var did_arr = did.split(',');
                    for (var a=0; a<did_arr.length; a++) {
                        if (did_arr[a] >= 4179 && did_arr[a] <= 4182) {
                            console.log("did");
                            switch (did_arr[a]) {
                                case '4179': did = 9; break;
                                case '4180': did = 10; break;
                                case '4181': did = 11; break;
                                case '4182': did = 12; break;
                            }
                            $("#sub_category_"+did).children("li").children("a").each(function(){
                                all_did_arr.push($(this).text());
                            })
                        } else {
                            if ($.inArray(did_arr[a], all_did_arr)) {
                                var did_name = $("#ref_"+did_arr[a]).text();
                                all_did_arr.push(did_name);
                            }
                        }
                    }
                    did_ele = 1;
                    $scope.did_ele = did_ele;
                }
        
                var sid = $.urlParam('salestype');
                if (sid != null) {
                    var sid_arr = sid.split(',');
                    for (var a=0; a<sid_arr.length; a++) {
                        switch (sid_arr[a]) {
                            case "批發": all_sid_arr.push('批發為主'); all_sid_arr.push('純批發'); break;
                            case "零售": all_sid_arr.push('零售為主'); all_sid_arr.push('約零售'); break;
                        }
                    }
                    sid_ele = 1;
                    $scope.sid_ele = sid_ele;
                }
                /*
                if (did_query != {}) {
                    company_query = did_query;
                    if (sid_query != {}) {
                        company_query = $.extend(did_query, sid_query);
                    }
                } else {
                    company_query = sid_query;
                }
                */
                console.log("Product tid:",all_tid_arr);
                console.log("Disrict tid:",all_did_arr);
                console.log("Salestype tid:",all_sid_arr);
        
                if (order == "update") {
                    order_type = $('#sort_update').attr('class');
                    if (order_type == "asc") {
                        $(".order_list li .active.asc").removeClass('active');
                        $('#sort_update').addClass('.active');
                        text=$('#sort_update').text();
                        text=text.replace("遠->近","近->遠");
                        $('#sort_update').text(text);
                        product_sorting = {
                            "changed": {"order" :"asc"}
                        };
                    } else if (order_type == "desc") {
                        $(".order_list li .active.desc").removeClass('active');
                        $('#sort_update').addClass('active');
                        text=$('#sort_update').text();
                        text=text.replace("近->遠","遠->近");
                        $('#sort_update').text(text);
                        product_sorting = {
                            "changed": {"order" : "desc"}
                        };
                    }
                } else if (order == "price") {
                    order_type = $('#sort_price').attr('class');
                    if (order_type == "asc") {
                        $(".order_list li .active.asc").removeClass('active');
                        $('#sort_price').addClass('active');
                        text=$('#sort_price').text();
                        text=text.replace("高->低","低->高");
                        $('#sort_price').text(text);
                        product_sorting = {
                            "product_price": {"order" :"asc"}
                        };
                    } else if (order_type == "desc") {
                        $(".order_list li .active.desc").removeClass('active');
                        $('#sort_price').addClass('active');
                        text=$('#sort_price').text();
                        text=text.replace("低->高","高->低");
                        $('#sort_price').text(text);
                        product_sorting = {
                            "product_price": {"order" : "desc"}
                        };
                    }
                } else if (order == "click") {
                    order_type = $('#sort_view').attr('class');
                    if (order_type == "asc") {
                        $(".order_list li .active.desc").removeClass('active');
                        $('#sort_view').addClass('active');
                        text=$('#sort_view').text();
                        text=text.replace("多->少","少->多");
                        $('#sort_view').text(text);
                        product_sorting = {
                            "poduct_views": {"order" :"asc"}
                        };
                    } else if (order_type == "desc") {
                        $(".order_list li .active.desc").removeClass('active');
                        $('#sort_view').addClass('active');
                        text=$('#sort_view').text();
                        text=text.replace("少->多","多->少");
                        $('#sort_view').text(text);
                        product_sorting = {
                            "product_views": {"order" : "desc"}
                        };
                    }
                }
        
                $scope.product_sorting = product_sorting;
                $scope.order = order;
            }
           $scope.returnPrice = function(item){
           console.log('Item',item);
                if (item['product_price'])
                    return "$"+item['product_price'];
                else
                    return "按此查詢";
            }
            $scope.initCompany = function() {
                console.log('5metal Init');
                keyword = $scope.urlParam('keyword');
                $scope.tid = $scope.urlParam('tid');
        
                if (keyword)
                    $scope.keyword = keyword;
                console.log('Keyword',$scope.keyword);
        
                console.log('Tid',$scope.tid,'.categories li a[rel="'+$scope.tid+'"]');
                var category;
                $scope.category = $('.sub_category li a[rel="'+$scope.tid+'"]').text();
                if (!$scope.category)
                    $scope.category = $('.categories li a[rel="'+$scope.tid+'"]').text();
        
                $scope.hotTotal = (page+1) *20;
                console.log($scope.category);
                $scope.getCompanyQuery();
            }
        
            $scope.getCategoryChildren = function(tid){
                console.log('Tid To Category');
                return new Promise(function (resolve, reject) {
        
                    console.log('company Init');
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data":{
                            "action": "searchData",
                            "index": "5metal.dazzle.website",
                            "type": "product_category",
                            "body": {
                                "query":{
                                    "match":{
                                        "parent":tid
                                    }
                                }
                            }
        
                        }
                    }).then(function (result) {
                        console.log(result);
                        if (result.data.code < 0) {
                            $scope.catChildren = [];
                            resolve([]);
                        } else {
                            $scope.catChildren = result.data.resolve;
                            resolve(result.data.resolve);
                        }
                    });
                });
        
            }
        
            $scope.tidToCategory = function(tid){
                console.log('Tid To Category');
                return new Promise(function (resolve, reject) {
        
                    console.log('company Init');
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data":{
                            "action": "getData",
                            "index": "5metal.dazzle.website",
                            "type": "product_category",
                            "id": tid
        
                        }
                    }).then(function (result) {
                        console.log(result);
                        if (result.data.code < 0) {
                            resolve('');
                        } else {
        
                            resolve(result.data.resolve['name']);
                            //                    return result.data.resolve[0]['nid'];
                        }
                    });
                });
        
            }
        
            $scope.init = function(type) {
                console.log('5metal Init');
              //  angular.element($('body')).scope().init();
        
                $scope.queryType = type;
                keyword = $scope.urlParam('keyword');
                $scope.tid = $scope.urlParam('tid');
                if (keyword)
                    $scope.keyword = keyword;
                console.log('Keyword',$scope.keyword);
        
                // console.log('Tid',$scope.tid,'.categories li a[rel="'+$scope.tid+'"]');
                // var category;
                //
                // $scope.category = $('.sub_category li a[rel="'+$scope.tid+'"]').text();
                // if (!$scope.category)
                //     $scope.category = $('.categories li a[rel="'+$scope.tid+'"]').text();
        
                if ($scope.tid)
                    $scope.tidToCategory($scope.tid).then(function(name){
                       console.log('Tid Name',name);
                       $scope.category = name;
                        if (type=='product')
                            $scope.getProductQuery();
                        else if (type=='company')
                            $scope.getCompanyQuery();
                    });
                else {
                    $scope.category = $scope.urlParam('cat');
                    $scope.getProductQuery();
                }
        //        console.log($scope.category);
        
            }
        
            $scope.findCompanyId = function(name){
                return new Promise(function (resolve, reject) {
        
                    console.log('company Init');
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data":{
                            "action": "searchData",
                            "index": "5metal.dazzle.website",
                            "type": "company",
                            "body":{
                                "query": {
                                    "title":name
                                }
                            }
        
                        }
                    }).then(function (result) {
                        console.log(result);
                        if (result.data.code < 0) {
                            return 0;
                        } else {
                            return result.data.resolve[0]['nid'];
                        }
                    });
                });
        
            }
            $scope.randomArray = function(array, total) {
                randomArray = [];
                var randomtotal = Math.floor(total / 4);
                while (randomtotal > 0) {
                    var result = Math.floor(Math.random()*total);
                    if ($scope.start > 0) {
                        result = result + $scope.start;
                    }
                    if ($.inArray(array[result],randomArray) == -1) {
                        randomArray.push(array[result]);
                        randomtotal --;
                    }
                }
        
                return array;
            }
        
            $scope.keyword_search = function() {
                var url;
                console.log('Search',$scope.keyword);
                url = "product_category?keyword="+$scope.keyword;
                document.location.href = url;
            }
        
            $scope.sortAsc = function(type) {
                $("#sort_"+type).removeClass('asc');
                $("#sort_"+type).addClass('desc');
                $("#sort_"+type).addClass('active');
                text=$("#sort_"+type).text();
                switch (type) {
                    case "view": text=text.replace("少->多","多->少"); product_sorting = { "product_views": {"order" : "asc"} }; break;
                    case "price": text=text.replace("低->高","高->低"); product_sorting = { "product_price": {"order" : "asc"} }; break;
                    case "update": text=text.replace("近->遠","遠->近"); product_sorting = { "changed": {"order" : "asc"} }; break;
                }
                $("#sort_"+type).text(text);
                $scope.product_sorting = product_sorting;
            }
        
            $scope.sortDesc = function(type) {
                $("#sort_"+type).removeClass('desc');
                $("#sort_"+type).addClass('asc');
                $("#sort_"+type).addClass('active');
                text=$("#sort_"+type).text();
                switch (type) {
                    case "view": text=text.replace("多->少","少->多"); product_sorting = { "product_views": {"order" : "desc"} }; break;
                    case "price": text=text.replace("高->低","低->高"); product_sorting = { "product_price": {"order" : "desc"} }; break;
                    case "update": text=text.replace("遠->近","近->遠"); product_sorting = { "changed": {"order" : "desc"} }; break;
                }
                $("#sort_"+type).text(text);
                $scope.product_sorting = product_sorting;
            }
        
            $scope.sortClass = function(type){
                var classes =[];
        
                classes.push($scope.active[type]);
                classes.push($scope.sortOrder[type]);
        
                return classes;
            }
            $scope.companySortClass = function(type){
                var classes =[];
        
                classes.push($scope.companyActive[type]);
                classes.push($scope.companySortOrder[type]);
        
                return classes;
            }
        
            $scope.companySort = function(type){
                console.log('Sort');
        
                if ($scope.companyActive[type]=='active') {
                    if($scope.companySortOrder[type]=='desc')
                        $scope.companySortOrder[type]='asc';
                    else
                        $scope.companySortOrder[type]='desc';
                } else
                    $scope.companySortOrder[type] = 'desc';
        
        
                $scope.companyActive['view'] ='';
                $scope.companyActive['stock'] ='';
                $scope.companyActive['vote'] ='';
                $scope.companyActive['register'] ='';
                $scope.companyActive[type] ='active';
        
                $scope.data = [];
                $scope.randomData = [];
                console.log("Random data:",$scope.randomData.length);
        
        //            start = 0;
        //            end = $scope.recordtotal;
        
                $scope.from = 0;
                $scope.page = 0;
                $scope.getCompanyQuery();
        
        
            }
        
            $scope.sort = function(type){
                console.log('Sort');
        
                if ($scope.active[type]=='active') {
                    if($scope.sortOrder[type]=='desc')
                        $scope.sortOrder[type]='asc';
                    else
                        $scope.sortOrder[type]='desc';
                } else
                    $scope.sortOrder[type] = 'desc';
        
        
                $scope.active['view'] ='';
                $scope.active['price'] ='';
                $scope.active['update'] ='';
        
                $scope.active[type] ='active';
        
                $scope.data = [];
                $scope.randomData = [];
                console.log("Random data:",$scope.randomData.length);
        
        //            start = 0;
        //            end = $scope.recordtotal;
                $scope.from = 0;
                $scope.page = 0;
                $scope.getProductQuery();
        
        
            }
        
            $scope.loadSingleProduct = function(id) {
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data":{
                        "action": "getData",
                        "index": "5metal.dazzle.website",
                        "type": "product",
                        "id": id
                    }
                }).then(function (result) {
                    console.log(result);
                    if (result.data.code < 0) {
                        console.log('Unsuccess');
                    } else {
                        console.log('ID',id,result.data.resolve);
                        console.log('Success');
                    }
                });
            }
        
            /* Get company information */
            $scope.loadCompanyInformation = function(query_init, number) {
        
                console.log('Query',query_init);
                $http(query_init).then(function (result) {
                    console.log("Company result:",result);
                    if (result.data.code < 0) {
                        console.log('Unsuccess');
                    } else {
                        console.log(result.data.resolve);
                        $scope.recordtotal = result.data.resolve.count;
                        console.log("Total:",$scope.recordtotal);
                        if (number == "part") {
                            $scope.data = $scope.data.concat(result.data.resolve);
                            $scope.newData = $scope.data;
                            $scope.total = $scope.data.length;
                            $scope.randomArray($scope.newData, $scope.total);
                            $scope.randomData = randomArray;
                        }
        
                        if (number == "hot") {
                            console.log('Hot Result',result.data.resolve);
                            $scope.hotData = $scope.hotData.concat(result.data.resolve);
                            // $scope.newHotData = $scope.hotData;
                            //$scope.hotTotal = $scope.data.length;
                            // $scope.randomArray($scope.newHotData, Math.round($scope.total/3));
                            // $scope.hotRandomData = randomArray;
                        }
        
                        //$scope.loadSingleProduct($scope.data[0]['nid']);
                        console.log('Success');
                        $scope.reload();
                    }
                });
            }
        
            /* Get product information */
            $scope.loadProductInformation = function(query_init, number) {
                var data=[];
                console.log('Query Init',query_init,$scope.from,end);
                $http(query_init).then(function (result) {
                    console.log("Product result:",result);
                    if (result.data.code < 0) {
                        console.log('Unsuccess');
                    } else {
                        console.log(result.data.resolve);
                        $scope.recordtotal = result.data.resolve.count;
                        console.log("Total:",$scope.data.length);
                        if (number == "part") {
                            data = JSON.parse(angular.toJson(result.data.resolve));
                            $scope.data = $scope.data.concat(data);
                            $scope.newData = $scope.data;
                            $scope.total = $scope.data.length;
                            $scope.randomArray($scope.newData, $scope.total);
                            $scope.randomData = randomArray;
                        }
                        //$scope.loadSingleProduct($scope.data[0]['nid']);
                        console.log('Success');
                        $scope.reload();
                    }
                });
            }
        
            /* Load product with keyword */
            // $scope.loadProductWithKeyword = function(keyword) {
            //     console.log("Products with keyword");
            //     $http({
            //         "method": "post",
            //         "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
            //         "data":{
            //             "action": "searchData",
            //             "from" : start,
            //             "size" : end,
            //             "index": "5metal.dazzle.website.product",
            //             "type": "_doc",
            //             "body": {
            //                 "sort" : [
            //                     $scope.product_sorting
            //                 ],
            //                 "query": {
            //                     "bool": {
            //                         "should": [
            //                             $scope.status
            //                           ],
            //                         "must": [
            //                             $scope.tid_query
            //                         ]
            //                     },
            //                     "wildcard" : { "title" : keyword }
            //                 }
            //             }
            //         }
            //     }).then(function (result) {
            //         console.log("Product result:",result);
            //         if (result.data.code < 0) {
            //             console.log('Unsuccess');
            //         } else {
            //             console.log(result.data.resolve);
            //             $scope.data = result.data.resolve;
            //             $scope.newData = $scope.data;
            //             $scope.total = $scope.data.length;
            //             //$scope.randomArray($scope.newData, $scope.total);
            //             //$scope.randomData = randomArray;
            //             //$scope.loadSingleProduct($scope.data[0]['nid']);
            //             console.log('Success');
            //             $scope.reload();
            //         }
            //     });
            // }
        
            $scope.sortingQuery = function() {
        
        
                var product_sorting = {};
                if ($scope.active['view']=='active') {
                    product_sorting = {
                        "product_views": {"order" : $scope.sortOrder['view']}
                    };
                }
                if ($scope.active['price']=='active') {
                    product_sorting = {
                        "product_price": {"order" : $scope.sortOrder['price']}
                    };
                }
                if ($scope.active['update']=='active') {
                    product_sorting = {
                        "created": {"order" : $scope.sortOrder['update']}
                    };
                }
        
                return product_sorting;
            }
        
        
            $scope.companySortingQuery = function() {
        
        
                var sorting = {};
                if ($scope.companyActive['view']=='active') {
                    sorting = {
                        "company_views": {"order" : $scope.companySortOrder['view']}
                    };
                }
                if ($scope.companyActive['stock']=='active') {
                    sorting = {
                        "last_post_product_date": {"order" : $scope.companySortOrder['stock']}
                    };
                }
                if ($scope.companyActive['vote']=='active') {
                    sorting = {
                        "voting": {"order" : $scope.companySortOrder['vote']}
                    };
                }
                if ($scope.companyActive['register']=='active') {
                    sorting = {
                        "created": {"order" : $scope.companySortOrder['register']}
                    };
                }
        
                return sorting;
            }
        
            $scope.getCompanyQuery = function() {
                console.log('Get Company');
        
        
        
                $scope.querystring = {"bool": {"must":[$scope.status]}}
        
                if ($scope.keyword) {
                    $scope.keywordstring = { "bool": { "should": [
                        {"match_phrase": {"title": $scope.keyword}},
                        {"match_phrase": {"body": $scope.keyword}},
                        {"match_phrase": {"company_address": $scope.keyword}},
                        {"match_phrase": {"company_code": $scope.keyword}},
                        {"match_phrase": {"company_name_en": $scope.keyword}},
                        {"match_phrase": {"company_tel": $scope.keyword}},
                        {"match_phrase": {"company_type": $scope.keyword}}
        
                    ] } };
                    $scope.querystring['bool']['must'].push($scope.keywordstring);
                }
        
                if ($scope.category) {
                    console.log($scope.category);
                    var tid_arr = [];
                    tid_arr.push($scope.category);
        
                    $scope.categorystring = {"terms":{"company_type": tid_arr}};
                    $scope.querystring['bool']['must'].push($scope.categorystring);
                }
        
                $scope.hotQuery_init =     {
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": {
                        "action": "searchData",
                        "index": "5metal.dazzle.website",
                        "type": "company",
                        "from": Math.round($scope.from /3),
                        "size": Math.round(end/3),
                        "body": {
                            "_source" : ["nid", "company_logo","title","product_price"],
                            "query":{
                                "match":{
                                    "status":"1"
                                }
                            },
                            "sort":{
                                "company_views": {"order" : "desc"}
                            }
                        }
                    }
                }
        
                $scope.query_init = {
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data":{
                        "action": "searchData",
                        "from" : $scope.from,
                        "size" : end,
                        "index": "5metal.dazzle.website",
                        "type": "company",
                        "body": {
                            "_source" : ["nid", "company_logo","title","company_recommend","product_price"],
                            "sort" : [
                                $scope.companySortingQuery()
                            ],
                            "query": $scope.querystring
                        }
                    }
                }
        
                $scope.query_count = {
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data":{
                        "action": "getCount",
                        "index": "5metal.dazzle.website",
                        "type": "company",
                        "body": {
                            "_source" : ["nid", "company_logo","title","product_price"],
                            "sort" : [
                                $scope.companySortingQuery()
                            ],
                            "query": $scope.querystring
                        }
                    }
                }
        
        
                console.log('Query Init',$scope.query_init);
                console.log('Query Count',$scope.query_count);
                console.log('Query Init',$scope.hotQuery_init);
        
             //   $scope.loadCompanyInformation($scope.query_count, "all");
            //   $scope.loadCompanyInformation($scope.hotQuery_init, "hot");
                $scope.loadCompanyInformation($scope.query_init, "part");
            }
        
            $scope.getProductQuery = function() {
                console.log('Get Product');
        
                // if (tid_ele == 1) {
                //        $scope.querystring = { "bool": { "should": [ $scope.status ], "must": [ $scope.tid_query ] } }
                //    } else {
                //        $scope.querystring = { "bool": { "should": [ $scope.status ] } };
                //    }
        
                $scope.querystring = {"bool": {"must":[$scope.status]}}
        
                if ($scope.keyword) {
                    $scope.keywordstring = { "bool": { "should": [
                        {"match_phrase": {"title": $scope.keyword}},
                        {"match_phrase": {"body": $scope.keyword}}
                    ] } };
                    $scope.querystring['bool']['must'].push($scope.keywordstring);
                }
        
                if ($scope.category) {
                    console.log($scope.category);
                    var tid_arr = [];
                    tid_arr.push($scope.category);
        //                     $scope.querystring['bool']['must']=[{"terms":{"category": tid_arr}}];
                    $scope.categorystring = {"terms":{"category": tid_arr}};
                    $scope.querystring['bool']['must'].push($scope.categorystring);
                }
        
                $scope.query_init = {
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data":{
                        "action": "searchData",
                        "from" : $scope.from,
                        "size" : end,
                        "index": "5metal.dazzle.website",
                        "type": "product",
                        "body": {
  //                          "_source" : ["nid"],
                            "_source" : ["nid","title","images","product_company","company_id","product_price"],
                            "sort" : [
        //                                $scope.product_sorting
                                $scope.sortingQuery()
                            ],
                            "query": $scope.querystring
                        }
                    }
                }
        
                $scope.query_count = {
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data":{
                        "action": "getCount",
                        "index": "5metal.dazzle.website",
                        "type": "product",
                        "body": {
                            "_source" : ["nid"],
                            "sort" : [
                                $scope.sortingQuery()
                            ],
                            "query": $scope.querystring
                        }
                    }
                }
                // if ($scope.keyword) {
                //     $scope.query_init['data']['body']['query']['wildcard'] = { "title" : $scope.keyword };
                //     $scope.query_count['data']['body']['query']['wildcard'] = { "title" : $scope.keyword };
                // }
                console.log('Query Init',$scope.query_init);
                console.log('Query Count',$scope.query_count);
                //$scope.loadProductInformation($scope.query_count, "all");
                $scope.loadProductInformation($scope.query_init, "part");
        
            }
        }
    };
    return link;
});
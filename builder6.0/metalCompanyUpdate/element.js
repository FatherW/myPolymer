var app = angular.module('demoApp');
// var google = window.google;
app.directive('metalCompanyUpdate', function ($http, $compile, $templateRequest, $interval, $mdDialog,  $dazzleUser,  $dazzleS3, $dazzlePopup, $ocLazyLoad) {
    var name = 'metalCompanyUpdate';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/metalCompanyUpdate/element.html?id=" + new Date().getTime(),


         link: function (scope, element, attrs) {
            // var user = store.get('user');
            // if (!angular.isUndefined(user)) {
            //         scope.inited = true;                    
            // }
            // else
            $dazzleUser.dazzleInfo['editType'] ="company";
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
          $scope.currentPage =0;
            $scope.pageSize = 20;
            $scope.total = 200;
            $scope.isLogin = false;
            //$scope.isAdmin = false;
            $scope.shelf = "1";

            $scope.noOnShelf = 0;
            $scope.noOffShelf = 0;
            $scope.filterCat = '';

           $scope.isAdmin = function(){
//                var user = store.get('user');
                var uid = store.get('uid');
                if (!angular.isUndefined(uid) && uid)
                    return true;
                else
                    return false;
            }
            $scope.loadGoogleMap = function(){
                console.log('Position',$scope.company['longitude'],$scope.company['latitude']);
                
            }

            $scope.findLocationByAddress = function(address){

                var url;
                url = "https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=AIzaSyAfeyIhvQi2PT6DOfO-zEf_FficjX_gevY";

                $http({
                    method: 'GET',
                    url: url
                }).then(function successCallback(response) {
                    console.log('Success Find Location',response);
                    $scope.company['longitude'] = response.data.results[0].geometry.location.lng;
                    $scope.company['latitude'] = response.data.results[0].geometry.location.lat;
                    console.log('Position',$scope.company['longitude'],$scope.company['latitude']);
                    moveMarker($scope.company['latitude'],$scope.company['longitude']);



                }, function errorCallback(response) {
                    console.log('UnSuccess');
                    $scope.company['longitude'] = -1;
                    $scope.company['latitude'] = -1;

                });

            }
            
            $scope.catFilter = function(cat) {
                var arr = [];
                angular.forEach($scope.company['myProducts'],function(item,index){
                    if (item['category'].indexOf(cat)>-1)
                        arr.push(item);
                });
                $scope.filteredProduct = arr;
            }
             function filterFn(con){
                if(!$scope.filterCat)
                    return true;
                    
                return con.indexOf($scope.filterCat) > -1;
              }
            $scope.update = function(item){
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": {
                        "action": "updateData",
                        "index": "5metal.dazzle.website",
                        "type": "product",
                        "id": item['nid'],
                        "body": {
                            "doc":item
                        }
                    }
                }).then(function (result) {
                    console.log(result);
                });
            }

            $scope.save = function() {
                var length = $scope.company['myProducts'].length;
                var i =0;
                return new Promise(function (resolve, reject) {
                    angular.forEach($scope.company['myProducts'], function (item, index) {
                        $http({
                            "method": "post",
                            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                            "data": {
                                "action": "updateData",
                                "index": "5metal.dazzle.website",
                                "type": "product",
                                "id": item['nid'],
                                "doc": item
                            }
                        }).then(function (result) {
                            console.log(result);
                            i++;
                            // if (i > length )
                            //     resolve();
                        });

                    });
                });

            }
            $scope.delete = function(item){
                var id = item['nid'];
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data": {
                        "action": "deleteData",
                        "index": "5metal.dazzle.website",
                        "type": "product",
                        "id": id
                    }
                }).then(function (result) {
                        console.log('Delete',result);
                        location.reload();
                });
            }




            $scope.slides = [{
                imageUrl: "https://i.ytimg.com/vi/MxwjEacvrtY/hqdefault.jpg",
                caption: "Allan Allan Al Al Allan"
            }, {
                imageUrl: "https://pbs.twimg.com/profile_images/2576554888/s8vftzr3j0a9r703xdfn.jpeg",
                caption: "Steve Steve Steve"
            }];

            $scope.loadCss = function(href) {

                var cssLink = $("<link>");
                $("head").append(cssLink); //IE hack: append before setting href

                cssLink.attr({
                    rel:  "stylesheet",
                    type: "text/css",
                    href: href
                });

            };

            $scope.checkLogin = function(uid,pass){
                $scope.isLogin = true;
                //$scope.isAdmin = false;
            }
            $scope.tab = function(page){
                var i, tabcontent, tablinks;
                $('.tabcontent').hide();
                $('#'+page).show();
            }
            $scope.category = '';
            $scope.categorys = {};
            $scope.updateCategory = function(cat){
                $scope.category = cat;
                console.log($scope.category);
            }
            $scope.getAllCategory = function(){
                //$scope.categorys = $scope.company['company_type'];
                $scope.categorys = [];
               // console.log('Products',$scope.company['company_type']);
                  
                   angular.forEach($scope.company['myProducts'],function(item,index){
                    console.log(item['category']);
                    angular.forEach(item['category'],function(item2,index2){
                        console.log('Category',item2);
                       if ($scope.categorys.indexOf(item2)<0)
                           $scope.categorys.push(item2);                        
                    });
                     
                   });


                console.log('Categorys',$scope.categorys);
            }


            $scope.increaseView = function(id,view){
                 $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "updateData",
                            "index": "5metal.dazzle.website",
                            "type": "company",
                            "id": id,
                            "body" :{
                                "doc":{
                                    "company_views":view
                                }
                            }
                        }
                    }).then(function(result){
                        console.log(result);
                    });
            }

            $scope.company_init = function(id) {
                console.log(id);
                console.log('ID',$scope.company_id);
                console.log('ID2',$scope.model);
                return new Promise(function (resolve, reject) {
                    var isCompanyLoad = false,isProductLoad = false;

                    console.log('company Init');
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "getData",
                            "index": "5metal.dazzle.website",
                            "type": "company",
                            "id": id
                        }
                    }).then(function (result) {
                        //console.log(result);
                        console.log('ID',id,result);

                        if (result.data.code < 0) {
                            console.log('Unsuccess');
                            resolve();
                        } else {
                            $scope.company = result.data.resolve;
                            console.log('Company',$scope.company);

                            $scope.increaseView($scope.company['nid'],$scope.company['company_views']+1);
                            $scope.findLocationByAddress($scope.company['company_address']);

                             $dazzleUser.dazzleInfo['company_id'] = $scope.company['nid'];
                             $dazzleUser.dazzleInfo['item'] = $scope.company;

                            store.set('item',$scope.company);
                            $scope.findMyProducts($scope.company['nid']).then(function(){
                               //$compile($element.contents())($scope);
                                resolve();
                            });
                        }

                    });


                });
            }
            
            $scope.init = function(id) {
                console.log(id);
                console.log('ID',$scope.company_id);
                console.log('ID2',$scope.model);
                return new Promise(function (resolve, reject) {
                    var isCompanyLoad = false,isProductLoad = false;

                    console.log('company Init');
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "getData",
                            "index": "5metal.dazzle.website",
                            "type": "company",
                            "id": id
                        }
                    }).then(function (result) {
                        //console.log(result);
                        console.log('ID',id,result);

                        if (result.data.code < 0) {
                            console.log('Unsuccess');
                            resolve();
                        } else {
                            $scope.company = result.data.resolve;
                            console.log('Company',$scope.company);

                            $scope.increaseView($scope.company['nid'],$scope.company['company_views']+1);
                            $scope.findLocationByAddress($scope.company['company_address']);

                             $dazzleUser.dazzleInfo['company_id'] = $scope.company['nid'];
                             $dazzleUser.dazzleInfo['item'] = $scope.company;

                            store.set('item',$scope.company);
                            $scope.findMyProducts($scope.company['nid']).then(function(){
                               //$compile($element.contents())($scope);
                                resolve();
                            });
                        }

                    });


                });
            }
            $scope.findMyProducts = function(nid) {
                return new Promise(function(resolve,reject) {
                    
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "searchData",
                            "index": "5metal.dazzle.website",
                            "type": "product",
                            "body": {
                                "query": {
                                                "match": {
                                                    "company_id": nid
                                                }
                                    }
                            }
                        }
                    }).then(function (result) {
                        console.log('Find My Products',result);
                        if (result.data.code < 0) {
                            $scope.company['noProduct'] = 0;
                            $scope.company['myProducts'] = [];
                            $scope.noOnShelf = 0;
                            $scope.noOffShelf = 0;
                            $scope.myProducts = [];
                            resolve();
                        } else {
                            $scope.company['noProduct'] = result.data.resolve.length;
                            $scope.company['myProducts'] = result.data.resolve;
                            $scope.filteredProduct = $scope.company['myProducts'];
                            $scope.myProducts = result.data.resolve;
                            resolve();
                         //   angular.forEach($scope.company['myProducts'],function(item,index){
                         //       if (item['status']=="1")
                         //           $scope.noOnShelf++;
                         //       else
                         //           $scope.noOffShelf++;
                         //   });

                        }

                    });

                    
                });
                
            }
            
            $scope.load = function() {
                
                var path = location.pathname.split("/");
                var id = path[path.length-1];
                
                console.log(id);
                console.log('Company ID',$scope.company_id);
                console.log('ID2',$scope.model);
                
                return new Promise(function (resolve, reject) {
                
                    var isCompanyLoad = false,isProductLoad = false;
                    $dazzleUser.dazzleInfo['editType'] ="company";
                    console.log('company Init');
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "getData",
                            "index": "5metal.dazzle.website",
                            "type": "company",
                            "id": id
                        }
                    }).then(function (result) {
                        //console.log(result);
                        console.log('ID',id,result);

                        if (result.data.code < 0) {
                            console.log('Unsuccess');
                        } else {
                            $scope.company = result.data.resolve;
                            $scope.increaseView($scope.company['nid'],$scope.company['company_views']+1);
                            $scope.findLocationByAddress($scope.company['company_address']);

                            console.log('My Company',$scope.company);
                            $dazzleUser.dazzleInfo['company_id'] = $scope.company['nid'];
                            $dazzleUser.dazzleInfo['item'] = $scope.company;
                            $scope.loadCss("https://www.5metal.com.hk/sites/all/themes/metal/company/"+$scope.company['template']+"/style.css");
                            console.log('Success', $scope.company);

                        }
                        isCompanyLoad = true;
                        if (isCompanyLoad && isProductLoad) {
//                            $compile($element.contents())($scope);
                            console.log('Finish');
                            //$scope.reload();
                            resolve();
                        }

                    });

                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "searchData",
                            "index": "5metal.dazzle.website",
                            "type": "product",
                            "body": {
                                "query": {
                                    "bool":{
                                        "must":[
                                            {
                                                "match": {
                                                    "company_id": id
                                                }
                                            }
                                            // {
                                            //     "match": {
                                            //         "status": "1"
                                            //     }
                                            // }

                                        ]
                                    }

                                }
                            }
                        }
                    }).then(function (result) {
                        console.log(result);
                        if (result.data.code < 0) {
                            $scope.company['noProduct'] = 0;
                            $scope.company['myProducts'] = [];
                            $scope.noOnShelf = 0;
                            $scope.noOffShelf = 0;
                            $scope.myProducts = [];
                        } else {
                            $scope.company['noProduct'] = result.data.resolve.length;
                            $scope.company['myProducts'] = result.data.resolve;
                            $scope.filteredProduct = $scope.company['myProducts'];
                            $scope.myProducts = result.data.resolve;
                            angular.forEach($scope.company['myProducts'],function(item,index){
                                if (item['status']=="1")
                                    $scope.noOnShelf++;
                                else
                                    $scope.noOffShelf++;
                            });
                            $scope.getAllCategory();

                        }

                        isProductLoad = true;
                        if (isCompanyLoad && isProductLoad) {
                 //           $compile($element.contents())($scope);
                            resolve();
                        }
                    });
                    $('#Index').show();


                });
            }
            


            $scope.companyAge = function(id) {
                var age,now,a,created;

//               now = new Date().getTime();
                now = Math.floor(Date.now() / 1000);

                //  var d = new Date(now), a = new Date($scope.model['created']);

               // console.log('Now',now);

//                console.log('Register year',a.getFullYear());
                //console.log($scope.company['created']);
                console.log('Company Age',$scope.company['created']);
                created = $scope.company['created'] || now;
                age =parseInt(now)-parseInt(created);
                //console.log('Age',age);
                var day = Math.floor(age / 3600 / 24 );
                //              age = now - parseInt($scope.model['created'])*3600*24;
                // age = age /3600 / 24;


                return day + "天";
            }


            $scope.loadImage = function(images) {
                var url;
                if (Array.isArray(images))
                    url =  images[0];
                else
                    url = images;
                if(url){
                   url = url.replace("Product#",""); 
                    url = url.replace("#","%23");                    
                }


//                console.log(url,encodeURI(url));
//              return encodeURI(url);
                return url;
            }



            $scope.putOnShelf = function(item){
                $scope.noOnShelf++;
                $scope.noOffShelf--;
                item['status'] = "1";
                $scope.update(item);
            }
            $scope.putOffShelf = function(item){
                $scope.noOnShelf--;
                $scope.noOffShelf++;
                console.log($scope.noOnShelf,$scope.noOffShelf);
                item['status'] ="0";
                $scope.update(item);
            } 

        }
    };
    return link;
});

app.directive('compileTemplate', function($compile, $parse){
    return {
        link: function(scope, element, attr){
            var parsed = $parse(attr.ngBindHtml);
            function getStringValue() {
                return (parsed(scope) || '').toString();
            }

            // Recompile if the template changes
            scope.$watch(getStringValue, function() {
                $compile(element, null, -9999)(scope);  // The -9999 makes it skip directives so that we do not recompile ourselves
            });
        }
    }
});

// Initialize and add the map
function initMap() {
    // The location of Uluru
    var uluru = {lat: -25.344, lng: 131.036};
    // The map, centered at Uluru
    map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4, center: uluru});
    // The marker, positioned at Uluru
    marker = new google.maps.Marker({position: uluru, map: map});
}

function moveMarker(lat,long) {
    // The location of Uluru
    var uluru = {lat: lat, lng: long};
    // The map, centered at Uluru
    map = new google.maps.Map(
        document.getElementById('map'), {zoom: 18, center: uluru});
    // The marker, positioned at Uluru
    marker = new google.maps.Marker({position: uluru, map: map});
}
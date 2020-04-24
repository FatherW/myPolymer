var app = angular.module('demoApp');
var uid = "www.rainbowcu.org.hk"; 
var user = store.get('rainbow-user');


app.directive('dzProductGallery', function ($compile, $templateRequest,  $mdDialog,$mdToast,$dazzlePopup,$dazzleUser,$http,$dazzleElastic, $dazzleFn,$dazzleData,$dazzleS3) {
    var dzProductGallery = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/dzProductGallery/element.html?id=" + new Date().getTime(),
        link:  {

            pre: function(scope,element,attr){
                
                

                // Check User Login

                console.log('Rainbow User',user);
                if (!angular.isUndefined(user)){
                    scope.user = user;
                    if (angular.isUndefined(scope.user['購物籃']))
                        scope.user['購物籃']= [];
                    scope.logined = true;
                }
                else
                    scope.logined = false;
                    
            },
            
            post: function(scope,element,attr){
             

            }
            

            
        },
        controller: function ($scope, $element, $attrs) {


            // $scope.loadProducts = function() {
            //     $dazzleData.getElasticAllRecords(uid,"product").then(function(result){
            //       $scope.product = result; 
            //       console.log('Product',result);
            //     });
            // }
            $scope.selected = "所有產品";
            
            
             $scope.findType = function(){
                 var item = $scope.selected;
                 console.log(item);
                if(item)
                    $scope.selected = item;
                else
                    $scope.selected = '所有產品';
                 console.log('FInd Type',item);
                var filter ='';
                if (item!='所有產品')
                    filter = "type:"+item;
                else
                    filter = null;
                 $element.find('dz-dataset').attr('data-filter',filter);
                 $compile($element.find('dz-dataset'))($scope);
             }
             $scope.type = 
                        [
                            "保健",
                            "食品"
                        ];
                        


            $scope.addToCart = function($event){
                var ele = angular.element($event.currentTarget);
                var id = ele.attr('data-id');
                console.log($dazzleUser.dazzleInfo['data'][id]);
                var p = $dazzleUser.dazzleInfo['data'][id];
                $scope.user['購物籃'].push(p);
                store.set('rainbow-user',$scope.user);
                $compile($('culhk-user'))($scope);
                $mdDialog.show(
                      $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('已加入購物籃')
                        .textContent('閣下可點擊右上角購物籃結算. ')
                        .ok('知道了！')
                    );
                
            }
//             $scope.menuOptions = [

//                 ["產品管理", function () {
//                     var params = {
//                         name: "dzProductGalleryPopup",
//                         directive:"<dz-product-gallery-popup></dz-product-gallery-popup>",
//                     };

//                     $dazzlePopup.callPopup(params).then(function(output){
//                         var url = $dazzleFn.getFileUrl('large-web',output.gid);
// //                                    $scope.model.src = url;
// //                                    $scope.model.data = url;
// //                                    $dazzleFn.useTemplate($scope.model);
//                             $scope.model.data = url;
//                           $element.attr('src',url);
// //                                      $dazzleFn.saveElasticAtom($scope.model.id,$scope.model,false);
//                          // $dazzleFn.saveElasticAtom()
//                     },function(err){
//                         console.log('dz-image',err);
//                     });

//                 }],["刪除", function () {
//                     $element.remove();
//                 }]
//             ];
        }

    };
    return dzProductGallery;
});
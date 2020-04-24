var app = angular.module('demoApp');
app.directive('metalEditButton', function ($http, $compile, $templateRequest, $interval, $mdDialog, $mdToast,$dazzleUser,  $dazzleS3, $dazzlePopup, $ocLazyLoad) {
    var name = 'metalEditButton';
    var link = {
        restrict: 'E',
        scope:  {
           'popup': '@popup',
           'item': '=',
           'field':'@field'
        },
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/metalEditButton/element.html?id=" + new Date().getTime(),
         link: function (scope, element, attrs) {

        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
            var id;
            var type = $dazzleUser.dazzleInfo['editType'];
//            console.log(type);
//            console.log($dazzleUser.dazzleInfo);
            
            $scope.saveCompany = function(company_id,company_name) {
                var json;
                var timestamp =Math.floor(Date.now() /1000);

                id = $scope.item['nid'];
                console.log($dazzleUser.dazzleInfo);
                 json = {
                            "action": "updateData",
                            "index": "5metal.dazzle.website",
                            "type": "product",
                            "id": id,
                            "body": {
                                "doc": {

                                }    
                            }
                        };
                json['body']['doc']['company_id'] = company_id;
                json['body']['doc']['product_company'] = company_name;
                json['body']['doc']['changed'] = timestamp;
                
                console.log('JSON',json);
                $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data":json
                    }).then(function (result) {
                        console.log(result);
                        if (result.data.code < 0) {
                            alert('更新失敗');
//                            resolve({});
                        } else {
                            alert('成功更新');
                        }
                    });               
                
            }
             $scope.getFileUrl = function (size, id) {
                    // return '';
                    //   return $dazzleFn.getFileUrl(size,id);
                    if (!id) {
                        return null;
                    }
        
        
                    if (id.indexOf(".jpg")>=0) {
                        id=id.replace(".jpg","");
                    }
        
                    return "//designerrrr-output.s3.amazonaws.com/images/5metal.dazzle.website/"+size+"/"+id+".jpg";
        
                }
             $scope.save = function() {
                 
                 var json;
                 var timestamp =Math.floor(Date.now() /1000);
                var item = $dazzleUser.dazzleInfo['item'];
                
                // if (type=="company")
                //     id = $dazzleUser.dazzleInfo['company_id'];
                // else if (type=="product")
                //     id = $dazzleUser.dazzleInfo['product_id'];

                id = item['nid'];
             //   console.log($dazzleUser.dazzleInfo);
                 json = {
                            "action": "updateData",
                            "index": "5metal.dazzle.website",
                            "type": $dazzleUser.dazzleInfo['editType'],
                            "id": id,
                            "body": {
                                "doc": {

                                }    
                            }
                        };
                json['body']['doc'][$scope.field] = $scope.item;            
                json['body']['doc']['changed'] = timestamp;
                
                console.log('JSON',json);
                $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data":json
                    }).then(function (result) {
                        console.log(result);
                        if (result.data.code < 0) {
                            alert('更新失敗');
//                            resolve({});
                        } else {
                            alert('成功更新');
                        }
                    });
                
            }
            $scope.init = function(item,type){
                // $scope.item = item;
                // $scope.type = type;
                if (!$scope.item)
                    $scope.item = content;

                if (type=="company")
                    id = $dazzleUser.dazzleInfo['company_id'];
                else if (type=="product")
                    id = $dazzleUser.dazzleInfo['product_id'];

            }
            
            $scope.isUser = function(){
//                var user = store.get('user');
                var user= store.get('subUser');
             //   console.log('Edit User',user);
                var field = $scope.popup;
                
                
                // console.log($dazzleUser.dazzleInfo['editType'],user);
                
                var type = $dazzleUser.dazzleInfo['editType'];

                if (angular.isUndefined(user)) {
                   // console.log('No UID');
                    return false;                    
                } else if (user){
                    var uid = user.uid;                    
                } else
                    return false;

                    

                
//                var item = $dazzleUser.dazzleInfo['item'];
                var item = store.get('item');
              
                    //console.log('Edit Type',item);

                
        if (uid=="1" || uid=="162")
          return true;                    
            
                if(item['uid'] ==uid)
                    return true;
                    
                if (type=="product")    {
                   // console.log('Product Check',uid,item);
                    if (uid == item['uid']) {
                        // console.log('Not True');
                        if (field!='company')
                            return true;
                        else
                            return false;
                    }
                    else
                        return false;                    
                }

                        
                        
                if (type=="company") {
                    console.log('We are company',user['company_id'],item['nid']);
                    if (user['company_id'] == item['nid']) {
                        console.log('True');
                        return true;                    
                    }
                    else{
                        console.log('False');
                        return false;
                        
                    }
                    
                }
                
    
            }
            
             $scope.myDate = function(timestamp){
                //console.log(timestamp);
                if (timestamp> 1000000000000)
                    return new Date(timestamp).toLocaleDateString();
                else
                    return new Date(timestamp*1000).toLocaleDateString();
            }
       
            
            $scope.edit = function(){
                
                console.log('Edit');
                var field = $scope.popup;
                console.log('Field',field);
                var uid = store.get('uid');

                switch(field){
                    default:
                    case 'text':

                            var confirm = $mdDialog.prompt()
                                .title('你要變更資料嗎?')
                                .textContent('輸入你的資料')
                                .placeholder(field)
                                .initialValue($scope.item)
                                .required(true)
                                .ok('變更')
                                .cancel('取消');

                            $mdDialog.show(confirm).then(function(result) {
                                $scope.item = result;
                                $scope.save();
                            });
                    break;
                    
                    case 'map':
                        var str = "你的坐標為：("+$scope.item[0]+","+$scope.item[1]+")";
                        alert(str);
                        
                        break;
                    case 'image':

                        var params = {
                            'name':'metalImageGalleryPopup',
                            'directive':'<metal-image-gallery-popup></metal-image-gallery-popup>',
                             'images':$scope.item,
                            'owner':"owner:"+uid
                        };
                        $dazzlePopup.callPopup(params).then(function(result){
                            // var images =[];
                            // angular.forEach(result,function(item,index){
                            //     var url="http://designerrrr-output.s3.amazonaws.com/"+path;
                            //     images.push(url);
                            // });
                            $scope.item= [$scope.getFileUrl('large-web',result.gid)];
                            console.log('Show Result',$scope.item,result);
                            $scope.save();
                            
                        });
                        break;
                        
                    case 'images':
                        angular.forEach($scope.item,function(img,index){
                            img = img.replace("product_list","img_large");
                            $scope.item[index]  = img;
                        });
                        var params = {
                            'name':'metalGalleryPopup',
                            'directive':'<metal-gallery-popup></metal-gallery-popup>',
                            'images':$scope.item
                        };
                        $dazzlePopup.callPopup(params).then(function(result){
                            // var images =[];
                            // angular.forEach(result,function(item,index){
                            //     var url="http://designerrrr-output.s3.amazonaws.com/"+path;
                            //     images.push(url);
                            // });
                          $scope.item = result;
                          console.log('Show Result',result);
                            $scope.save();

                        });
                        break;
                        
                    case 'category':
                        console.log('Pre Popup',$scope.item);
                        var params = {
                          'name':'metalCategoryPopup',
                          'directive':'<metal-category-popup></metal-category-popup>',
                          'categories':$scope.item
                        };
                        
                        $dazzlePopup.callPopup(params).then(function(result){
                            $scope.item = result;        
                            console.log('Post Popup',$scope.item);
                            $scope.save();

                        });
                        break;
                    
                    case 'company':
                        var params = {
                          'name':'metalCompanyPopup',
                          'directive':'<metal-company-popup></metal-company-popup>'
                        };

                        $dazzlePopup.callPopup(params).then(function(result){
                            console.log('Company Select',result);
                            $scope.item['company_id'] = result['value'];
                            $scope.item['product_company'] = result['display'];
                            $scope.saveCompany(result['value'],result['display']);
                        });                        
                        
                        break;
                        
                    case 'body':
                        var params = {
                          'name':'metalEditorPopup',
                          'directive':'<metal-editor-popup></metal-editor-popup>',
                          'body':$scope.item
                        };

                        $dazzlePopup.callPopup(params).then(function(result){
                            $scope.item = result;
                            $scope.save();

                             $mdToast.show(
                              $mdToast.simple()
                                .textContent('內容已更新')
                                .position('top')
                                .hideDelay(3000)
                            );
                        });                        
                        
                        break;
                    
                }
            }

        }
    };
    return link;
});
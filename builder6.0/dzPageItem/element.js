var app = angular.module('demoApp');
app.directive('dzPageItem', function ($http, $compile, $templateRequest, $interval, $mdDialog, $mdToast,$dazzleUser, $dazzleS3, $dazzlePopup, $ocLazyLoad,
dzFn,dzS3,atomInfo,userInfo,dbFactory,pageInfo) {
    var name = 'dzPageItem';
    var link = {
        restrict: 'EA',
        scope:  true,
        link: function ($scope, $element, attrs) {
                
                    $scope.id = $element.attr('id') || new Date().getTime();
                    $element.attr('id',$scope.id);
                    

                    $scope.table = atomInfo.atom['dz-page-content']['table'] || null;
                    $scope.key = atomInfo.atom['dz-page-content']['key']|| null;
                                    
                    $scope.data = atomInfo.atom['dz-page-content']['data'] ||  null;
                
                    dbFactory.loadDataByID($scope.table,$scope.key).then(function(data){
                        $scope.data = data;
                        $scope.updateContent();  
                    });



                console.log('Display Data',$scope.data);
                
                // if(!$scope.data[$scope.key])
                //     $element.remove();
               
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
            $scope.updateContent = function(){
                $element.find('[dz-set-field]').each(function(){
                    
                    var type = $(this).attr('data-type');
                    var field = $(this).attr('data-field');
                    var value = $scope.data[field] || '';
                    var json = {};
                    json[field] = value;
                    // console.log('Info',$scope.id,field,index);
                    var id = $scope.id +"-"+field;
                    // console.log('Info',$scope.id,field,index);
    
                    $(this).attr('id',id);
                    if (field==$scope.key)
                        $(this).attr('data-key','true');
                    $(this).attr('data-id',$scope.data[$scope.key]);
                    $(this).attr('data-table',$scope.table);
                    console.log('Type',type,value);
                    atomInfo.initAtom(id);
                    // console.log('atom',atomInfo.atom,id);
                    atomInfo.atom[id]['isData'] =true;
                    atomInfo.atom[id]['data'] = json;
                    atomInfo.atom[id]['type'] = type;
                    dbFactory.formatAtomByType(atomInfo.atom[id],value);
//                    dbFactory.formatByType(type,value,$element);
                    //    atomInfo.atom[id]['html'] = $(this).html();
                    
                });
                $compile($element.contents())($scope);
            }
   
            $scope.recordMenuOptions = [

                // ["新增", function () {
                //   var index = location.hostname;
                //     var table = $scope.schema['table'];
                //     var isAdd = false;
                //     var template = table+"-template.html";
                //     var created = new Date();       
                //     var json = {};
                //     var title = prompt("請輸入新資料標題。注意：重覆標題會導致資料被覆寫！");
            
                //     dzS3.checkFile(userInfo.exportBucket,title+'.html').then(function(answer){
                //         json[$scope.key] = title; 

                //         if (answer){
                //             if (!confirm('匯出會覆蓋舊頁，有否問題？'))
                //                 return;
                //             else
                //               dzFn.addNewPage(title+'.html',title,template,json,$scope.table);       
                //         } else
                //             dzFn.addNewPage(title+'.html',title,template,json,$scope.table);

                            
                        
                //     });

                // }],     
                ["刪除", function ($itemScope,$event) {

                    dbFactory.removeData($scope.table,$scope.dataId).then(function(){
                        alert('成功刪除資料。');
                        $element.remove();
                    });
                }],                
                [ "更新", function () {
                    var ele = angular.element($event.currentTarget);
                    var index = ele.attr('data-index');
                    var dataId = $scope.data[index][$scope.key];
                    
                    dbFactory.updateData($scope.table,dataId,data).then(function(){
                        alert('成功更新資料。');
                        ele.remove();
                    });
                }]
            ];
        }
    };
    return link;
});





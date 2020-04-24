var app = angular.module('demoApp');
app.directive('dzDisplayItem', function ($http, $compile, $templateRequest, $interval, $mdDialog, $mdToast,$dazzleUser, $dazzleS3, $dazzlePopup, $ocLazyLoad,
dzFn,dzS3,atomInfo,userInfo,dbFactory,pageInfo) {
    var name = 'dzDisplayItem';
    var link = {
        restrict: 'EA',
        scope:  true,
        link: function ($scope, $element, attrs) {
                
                var pageKey = pageInfo.thisPage.replace(".html","");
                $scope.id = $element.attr('id');
                console.log('Display ID',$scope.id);
                console.log('dz Display',$element,atomInfo.atom[$scope.id]);


                    $scope.table = atomInfo.atom[$scope.id]['table'] || null;
                    $scope.key = atomInfo.atom[$scope.id]['key']|| null;
                    $scope.datasetID=atomInfo.atom[$scope.id]['datasetID']|| null; 
                    $scope.template = atomInfo.atom[$scope.id]['template'] || null;
                    $scope.data = atomInfo.atom[$scope.id]['data'] ||  null;
                    $scope.dataId = $scope.data[$scope.key] ||  null;
                    

            

                console.log('Display Data',$scope.data,$scope.dataId);
                
                console.log('Page Key',pageKey);
                // if(!$scope.data[$scope.key])
                //     $element.remove();
                var index = 0;
               $element.find('[dz-set-field]').each(function(){
                    
                    var type = $(this).attr('data-type');
                    var field = $(this).attr('data-field');
                    var value = $scope.data[field] || '';
                    var json = {};
                    json[field] = value;
                    // console.log('Info',$scope.id,field,index);
                    var id = $scope.id +"-"+field+"-"+index;
                    // console.log('Info',$scope.id,field,index);
    
                    $(this).attr('id',id);
                    if (field==$scope.key)
                        $(this).attr('data-key','true');
                    $(this).attr('data-id',$scope.data[$scope.key]);
                    $(this).attr('data-table',$scope.table);
                    console.log('Type',type,id,$(this).html());
                    atomInfo.initAtom(id);
                    // console.log('atom',atomInfo.atom,id);
                //    atomInfo.atom[id]['id'] = id;
                  //  atomInfo.atom[id]['html'] = $(this).html();
                    atomInfo.atom[id]['isData'] =true;
                    atomInfo.atom[id]['data'] = json;
                    atomInfo.atom[id]['type'] = type;
                    console.log('Link',id,$(this).html());
                    dbFactory.formatAtomByType(atomInfo.atom[id],value);
//                    dbFactory.formatByType(type,value,$element);
                    //    atomInfo.atom[id]['html'] = $(this).html();
                    index++;
                });
                $compile($element.contents())($scope);
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {

   
            $scope.recordMenuOptions = [

                ["新增", function () {
                   var index = location.hostname;
                    var table = $scope.schema['table'];
                    var isAdd = false;
                    var template = $scope.template;
                    console.log(template);
                    var created = new Date().getTime();       
                    var json = {};
                    var title = prompt("請輸入新資料標題。注意：重覆標題會導致資料被覆寫！");
                    if(title){
                        json['ID'] = title;
                        json['title'] = title;
                        json['created'] = created;
                        dzFn.addNewPage(title+'.html',title,template,json,$scope.table);     
                    }
            
                }],     
                ["刪除", function ($itemScope,$event) {
                    
                    dbFactory.removeData($scope.table,$scope.dataId).then(function(){
                        alert('成功刪除資料。');
                        $element.remove();
                    });
                }],                
                [ "編輯", function ($event) {
                    // var ele = angular.element($event.currentTarget);
                    // var index = ele.attr('data-index');
                    // var dataId = $scope.data[index][$scope.key];
                    
                    // dbFactory.updateData($scope.table,dataId,data).then(function(){
                    //     alert('成功更新資料。');
                    //     ele.remove();
                    // });
                    console.log($event.currentTarget);
                    
                }]
            ];
        }
    };
    return link;
});





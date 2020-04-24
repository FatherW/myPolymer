var app = angular.module('demoApp');
app.directive('dzDisplayItem', function ($http, $compile, $templateRequest, $interval, $mdDialog, $mdToast,$dazzleUser, $dazzleS3, $dazzlePopup, $ocLazyLoad,
dzFn,dzS3,atomInfo,userInfo,dbFactory) {
    var name = 'dzDisplayItem';
    var link = {
        restrict: 'EA',
        scope:  true,
        link: function ($scope, $element, attrs) {
                $scope.id = $element.attr('id');
                $scope.data = atomInfo.atom[$scope.id]['data'];
                $scope.table = atomInfo.atom[$scope.id]['table'];
                $scope.key = atomInfo.atom[$scope.id]['key'];
                $scope.datasetID=atomInfo.atom[id]['datasetID']; 

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
                    dbFactory.formatByType(type,value,$(this));
                    atomInfo.initAtom(id);
                    // console.log('atom',atomInfo.atom,id);
                    atomInfo.atom[id]['isData'] =true;
                    atomInfo.atom[id]['data'] = json;
                    //    atomInfo.atom[id]['html'] = $(this).html();
                    
                });
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {

   
        }
    };
    return link;
});





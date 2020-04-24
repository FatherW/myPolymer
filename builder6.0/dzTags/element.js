var app = angular.module('demoApp');
//var _name ="dzDate";
app.directive('dzTags', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzleS3,$dazzleInit,$dazzlePopup,$dazzleData,$dazzleFn,
    atomInfo,userInfo) {
    var dzLink = {
      restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/dzTags/element.html?id=" + new Date().getTime(),
        css: {
          href: "https://d27btag9kamoke.cloudfront.net/builder6.0/dzTags/element.css?id=" + new Date().getTime(),
          /* Preload: this will trigger an HTTP request on app load.
           * Once the stylesheet is added, it will be loaded from the browser cache */
          preload: true
        },
                
        link: function ($scope, $element, attrs) {
                $element.find('.dz-date-ctrl').hide();

                var id = $element.attr('id') || new Date().getTime();
                $scope.id= id;
                $element.attr('id',id);
                atomInfo.initAtom(id);

                $scope.date = atomInfo.atom[id]['date'] || new Date();                
                atomInfo.atom[id]['date'] = $scope.date;
                
            //    console.log('User Info',store.get('editMode'));
                console.log('Date',$scope.date);  
                var editMode = store.get('editMode');
                if (editMode=='admin'){
                    console.log('Edit Admin Mode');
                    $element.find('#dzContextMenu').attr('context-menu','menuOptions');
                    $compile($element.find("#dzContextMenu"))($scope);
                }
                
                // if (editMode=="normal"){
                //     $element.find('[context-menu]').attr('context-menu','');
                // }

        },
        controller: function ($scope, $element, $attrs) {
              
            //$dazzleInit.featherEditorInit($scope);

                
            $scope.menuOptions = [
                ["編緝日期", function () {
                        $element.find('.dz-date-ctrl').show();
                    
                        // var params = {
                        //     'name':'dzDatePopup',
                        //     'date':$scope.date
                        // };
                        // $dazzlePopup.callPopup(params).then(function(date) {
                        //     $scope.userGallery = date;
                        //     atomInfo.atom[$scope.id]['date'] = date;
                        // });
    
                    }]
            ];
            $scope.hide = function(){
                $element.find('.dz-date-ctrl').hide();
            }
            $scope.myDate = function(timestamp){
                return new Date().getTime();
            }
           // atomInfo.atom[$scope.id]['contextMenu'] = $scope.menuOptions;
            

        }
    };
    return dzLink;
});
var app = angular.module('demoApp');

app.directive('dzData', function ($compile,$http,$templateRequest,$dazzleInit,$dazzleUser,$dazzlePopup,$dazzleFn,$dazzleData,$mdDialog,dbFactory) {
    var dazzleData = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function ($scope, $element, attrs) {
                     
                $scope.table = $element.attr('data-table') || null;
                $scope.count = $element.attr('data-count') || 'all';
                $scope.sort = $element.attr('data-sort') || null;
                $scope.order = $element.attr('data-order') || null;
                $scope.filter = $element.attr('data-filter') || null;

                // Load Data
                $dazzleUser.dazzleInfo['data'] =[];
                var id = $element.attr('id');
                console.log('Table',$scope.table);
               
                dbFactory.loadData($scope.table,$scope.count,null,null,null).then(function(data){
                   $scope.data = data; 
                });

            
                // Structure
                var isTemplate = $element.find('dz-data-template');
                var isPreview = $element.find('dz-data-preview');
                
                if (!isTemplate){
                    if (!isPreview){
                        $element.contents().wrap("<dz-data-preview></dz-data-preview>");
                    }
                    $element.append('<dz-data-template></dz-data-preview>');                    
                }

        },
        controller: function ($scope, $element, $attrs) {
            console.log('Dazzle Info',$dazzleUser.dazzleInfo);
            var dataMode = $dazzleUser.dazzleInfo['dataMode'];
            $element.find('dz-data-template').hide();
            
            //Check Table Exist
            var isTable = dbFactory.checkTableExist($scope.table);
            if (!isTable)
                dbFactory.createTable($scope.table);
            else {
                switch(dataMode){
                    case 'editTemplate':
                        
                        break;
                    
                    default:
                    case 'preview':
                    
                        var rawHtml = $element.find('dz-data-template').html() || '';
                        if (!rawHtml)
                            return;

                        var html = dbFactory.generateDataHtml(rawHtml);
                        $element.find('dz-data-preview').html(html);   
                        $compile($element.find('dz-data-preview'))($scope);
                    break;
                }
                
            }
        }
    };
    return dazzleData;
});


var app = angular.module('demoApp');



app.directive('referFieldPopup', function ($compile, $templateRequest, $mdDialog, $dazzlePopup,$dazzleData,$dazzleElastic) {
    var name = 'referFieldPopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/"+name+"/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "//d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser,$dazzleFn) {
                console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');
                $scope.table = params.table;
                
                $scope.init = function() {
                    $dazzleElastic.loadSchema(location.hostname,$scope.table).then(function(schema){
                        $scope.schemas = schema; 
                    });
                }
                
                
                $scope.choose = function(node){
                    $mdDialog.hide(node.field);
                }


                 $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
                    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
                    'WY').split(' ').map(function(state) {
                        return {abbrev: state};
                      });



        }
    };
    return link;
});


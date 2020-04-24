var app = angular.module('demoApp');
app.directive('fontPopup', function ($compile, $templateRequest, $mdDialog, $dazzlePopup) {
    var name = 'fontPopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/"+name+"/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
                console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');


                $scope.pageJson=$dazzleUser.getDazzleInfo('pageJson');
                $scope.thisPageJson=$dazzleUser.getDazzleInfo('thisPageJson');
                $scope.userBucket=$dazzleUser.getDazzleInfo('userBucket');
                $scope.exportBucket=$dazzleUser.getDazzleInfo('exportBucket');
                $scope.csss = $dazzleUser.getDazzleInfo('fontCss') || [{
                    label: '',
                    'text':''
                }];
                $scope.selectedIndex = 0;

                $scope.selectFont = function(font) {
                    if (!font.label) {
                        var length = $scope.csss.length;
                        $scope.csss.push({
                            label:'css'+length,
                            text:''
                        });
                        $scope.currentFont = $scope.csss[length];
                    } else 
                        $scope.selectedIndex=1;
                    console.log($scope.currentFont);

                }
                
                $scope.saveCSS=function(css) {
                    $scope.selectedIndex=0;

                    console.log($scope.csss);
                }

                $scope.cancel = function() {
                    $mdDialog.hide();
                }
                $scope.save = function() {
                    $dazzleUser.setDazzleInfo('fontCss',$scope.csss);
                    $mdDialog.hide($scope.currentFont);
                }
        }
    };
    return link;
});
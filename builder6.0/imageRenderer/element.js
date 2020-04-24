var app = angular.module('demoApp');
app.directive('imageRenderer', function ($http, $compile, $templateRequest, $interval,$mdDialog, $mdToast, $ocLazyLoad,hotkeys) {
    var name = 'imageRenderer';
    var link = {
        restrict: 'E',
        scope:  true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/imageRenderer/element.html?id=" + new Date().getTime(),
         link: function (scope, element, attrs) {

        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser,userInfo) {

               $scope.params = $dazzleUser.getDazzleInfo('params');

                if (!$scope.params.image)
                    $scope.params.image =  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1024px-No_image_3x4.svg.png";
                
                $scope.upload = function(){
                    $('#uploader').click();
                }        
                        
                 $('#uploader').addEventListener('change', function () {
                   $scope.params.image = "https://d27btag9kamoke.cloudfront.net/cdn6.0/images/loading.gif";
                    var file = $(this).files[0];
                    $dazzleS3.saveImage(userInfo.uid, file).then(function (uploadedFile) {
                        $scope.params.data[$scope.params.colDef.field] = "https://designerrrr.s3.amazonaws.com/images/" + userInfo.uid + "/" + uploadedFile.newFilename;
                        $scope.params.refreshCell();
            			
            				var thisTable = $dazzleUser.dazzleInfo['thisTable'];
            				var myValue = "https://designerrrr.s3.amazonaws.com/images/" + userInfo.uid + "/" + uploadedFile.newFilename;
            				
            				// console.log('This Table',thisTable);
            				
            				// myScope.$dazzleFn.mountFieldToAtom(thisTable,myField,myValue);
            
            					
            							
            			
                    });
                      
                });
        }
    };
    return link;
});
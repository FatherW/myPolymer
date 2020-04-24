var app = angular.module('demoApp');
app.directive('exportPopup', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var name = 'exportPopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/exportPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "exportPopup";
            scope.type = "exportPopup";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser,$dazzleS3,$dazzleData,$dazzleInit,$dazzleFn) {
                console.log('My Scope',$scope);

                var params = $dazzleUser.getDazzleInfo('params');

                $scope.count = 0;
                $scope.finishList = [];
                $scope.exportBucket = $dazzleUser.getDazzleInfo('exportBucket');
                $scope.thisPage = params.exportPage;
                $scope.exporting = true;
                
                $scope.init = function () {

                    $('md-dialog').css('opacity','1');
                    $('#export-wait').show();
                    $('#export-finish').hide();
                    
                    console.log($scope.exporting);                    

					
//					$dazzleFn.mountDbToAtom();
//						$dazzleInit.saveAtom().then(function() {
//							$dazzleFn.updateRootPage($scope.thisPage).then(function(){
								$scope.exportPage($scope.thisPage);
								$scope.exporting = false;
								$scope.apply();
								// setTimeout(function () {
								// 	$scope.$apply(function(){
								// 	  $scope.exporting = false;
								// 	});
                                 //
								//   },3000);
																
//							});
//						});
//						params.$scope.$dazzleFn.updateRootPage(params.data[params.colDef.cellEditorParams.pageNameField]).then(function(){
					



                }

                $scope.finish = function () {
                    var length = $scope.exportPages.length;
                    if ($scope.count >= length) {
                        $('#export-wait').hide();
                        $('#export-finish').show();
                    }
                    else {
                        $('#export-wait').show();
                        $('#export-finish').hide();
                    }
                }

                $scope.exportPage = function (page) {
                    return new Promise(function (resolve, reject) {
                        var json = {
                            "user": $dazzleUser.getUser(),
                            "website": $dazzleUser.dazzleInfo['website'],
                            "exportPage": [page]
                        };
                        console.log('Export JSON',json);

                        $http.post('https://d8fz9pfue5.execute-api.ap-northeast-1.amazonaws.com/prod/single-export', json).then(function (result) {
                            console.log(page + ' Success');
                            $scope.finishList.push(page);
                            $scope.count++;
                            resolve(result);
                        }, function () {
                            console.log(page + ' Fail');
                            $scope.count++;
                            resolve([]);
                        });

                    });
                }

        }
    };
    return link;
});
var app = angular.module('demoApp');
app.directive('hotyeahAddSchoolPopup', function ($compile, $templateRequest, $mdDialog, $uibModal) {
    var name = 'hotyeahAddSchoolPopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/hotyeahAddSchoolPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d27btag9kamoke.cloudfront.net/";
            scope.directiveId = "hotyeahAddSchoolPopup";
            scope.type = "hotyeahAddSchoolPopup";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzlePopup,$dazzleUser,$dazzleFn,$dazzleData,$timeout,$q) {
                console.log('My Scope',$scope);
				$scope.locations = [];
				$scope.model = {
					'id':'',
					'學校名稱':'',
					'地點':[],
					'開放時間':'',
					'語言':[],
					'對象':[], 
					'頭像':'',
					'課程s':[],
					'地址':'',
					'電話號碼':'',
					'電郵':'',
					'營業時間':'',
					'付款方式':'',
					'學校簡介':'',
					'價錢由': 0,
					'價錢至':0,
					'Albums': [],
					'NoBookmark':0,
					'NoView': 0,
					'聯絡人名稱':'',
					'聯絡電話':'',
					'其他標籤':[],
					'學校類型':[]
				};
                var params = $dazzleUser.getDazzleInfo('params');
//                $scope.pageJson=$dazzleUser.getDazzleInfo('pageJson');
//                $scope.thisPageJson=$dazzleUser.getDazzleInfo('thisPageJson');

                $scope.userBucket=$dazzleUser.getDazzleInfo('userBucket');
                $scope.exportBucket=$dazzleUser.getDazzleInfo('exportBucket');
                $scope.websiteKey = $dazzleUser.getDazzleInfo('websiteKey');
                $scope.uid = $dazzleUser.getUser().uid;
                $scope.websiteId = $dazzleUser.getDazzleInfo('websiteId');
                $scope.order = 0;
                
                $scope.editTag = function(key) {
                    $dazzlePopup.tag($scope.model[key]).then(function (tags) {
                            $scope.model[key] = tags;                    
                    });
                }


                $scope.setOrder = function(index){
                    $scope.order = index;
                    $scope.selectedIndex=index;
                }
                
                $scope.init = function(){
					$dazzleS3.getJson('dazzle-user-hotyeah','website/www.hot-yeah.com/content/area-data.json').then(function(json){
						
						angular.forEach(json,function(item,index){
							$scope.locations.push(item.Layer2);

						});
					});
					$dazzleS3.getJson('dazzle-user-hotyeah','website/www.hot-yeah.com/content/activities-data.json').then(function(json){
						$scope.activities = json;
					});
				
				
                    $scope.setOrder(0);

                }
                $scope.close = function() {
                    $mdDialog.hide();
                }
				$scope.coursePopup = function() {
					
				}
				$scope.uploadPhoto = function(key){
					$dazzlePopup.gallery($scope.model[key]).then(function (images) {
						$scope.model[key] = images;
					});
				}
				$scope.uploadFiles = function(key) {
					$dazzlePopup.gallery($scope.model[key]).then(function (files) {
						$scope.model[key] = files;
					});					
				}
				$scope.generate = function() {
					
					var require = ['學校名稱','電話號碼','地址','學校類型','聯絡人名稱','聯絡人電話'];
					var id = 'school-'+new Date().getTime().toString();
					
					$scope.model['id'] = id;
					
					angular.forEach(require,function(item,index) {
							if (!$scope.model[item]) {
								alert(item + '尚未填寫. 請填寫後再生成');
								setOrder(0);
								return;
							}
					});
					console.log('Model',$scope.model);
		
					$dazzleData.createElasticRecord('hotyeah','school',id,$scope.model).then(function(result) {


						setOrder(4);
						console.log(result);
					});

					
				}



					$scope.readonly = false;
					$scope.selectedItem = null;
					$scope.searchText = null;
					$scope.numberChips = [];
					$scope.numberChips2 = [];
					$scope.numberBuffer = '';
					$scope.autocompleteDemoRequireMatch = false;

					$scope.notFound = function(key) {
						console.log("key", key);
						transformChip(key);
					  }
					  /**
					   * Return the proper object when the append is called.
					   */
					$scope.transformChip= function(chip) {
					  // If it is an object, it's already a known chip
					  if (angular.isObject(chip)) {
						return chip;
					  }

					  // Otherwise, create a new one
					  return {
						name: chip,
						type: 'new'
					  }
					}

					/**
					 * Search for vegetables.
					 */
					$scope.querySearch=function(query) {
					  var results = query ? $scope.locations.filter(createFilterFor(query)) : [];
					  return results;
					}

					/**
					 * Create filter function for a query string
					 */
					$scope.createFilterFor = function(query) {
//					  var lowercaseQuery = angular.lowercase(query);

					  return function filterFn(locations) {
						return ($scope.locations.indexOf(query) === 0) ||
						  ($scope.locations.indexOf(query) === 0);
					  };

					}
				
        }
    };
    return link;
});



    var app = angular.module('demoApp');
    var map = null;
    var geocoder = null;
    var address = "香港科學園";
    app.directive('editorGooglemapElement', function ($compile, $templateRequest, $mdDialog, $ocLazyLoad,$dazzleData) {
        
        
        
        
        
        
        var editorGooglemapElement = {
            restrict: 'E',
            priority: 1000,
            scope: true,
            link: function (scope, element, attrs) {
                scope.http = "//d25k6mzsu7mq5l.cloudfront.net/";
                scope.directiveId = "editorGooglemapElement";
                scope.type = "editorGooglemapElement";
                scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
                scope.templateUrl = scope.http + scope.templatePath;
                scope.editorCustomInit(scope, element, attrs).then(function () {
                    if (angular.isUndefined(scope.model.location)) {
                        scope.model.location = "香港科學園";
                        scope.model.src = "http://maps.google.com.hk/maps?f=q&hl=zh-HK&q=" + scope.model.location + "&output=embed";
                    }
                    if (element.attr('field') &&
                        scope.thisPageJson &&
                        scope.thisPageJson.exportDatas &&
                        scope.thisPageJson.exportDatas[element.attr('field')]) {
                        scope.model.src = scope.thisPageJson.exportDatas[element.attr('field')];
                        scope.useTemplate();
                    } 
                     if (!angular.isUndefined(scope.model.db)){
                        $dazzleData.loadRecord(scope.model.db).then(function(record){
                            var rec = record[0];
                            scope.model.src = rec[scope.model.db.field];
                            scope.useTemplate();
                        });
                    }
                    var template = angular.element('<div bind-html-compile="model.html" context-menu="menuOptions"></div>');
                    element.html(template);
                    scope.$apply(function () {
                        $compile(template)(scope);
                    });
                });
                
            },
            controller: function ($scope, $element, $attrs) {
            $scope.init = function() {
                var js = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAN_dIE_33pcsdRWaRqx-EnJWNTNzOfqQI&libraries=places&callback=initMap";
                $ocLazyLoad.load({files: js, cache: false}).then(function () {
                       var width = $element.find('.map-container').innerWidth();
                        console.log('Width',width);
                        $element.find('.map-container').css('height', width * 0.25+'px');
                        map = new google.maps.Map(document.getElementById('dazzle-map'), {
                          zoom: 8,
                          center: {lat: -34.397, lng: 150.644}
                        });
                        geocoder = new google.maps.Geocoder();
                
                        geocodeAddress(address, geocoder,map);
                        map.setZoom(17);

                });
                 
                        
            }
                $scope.menuOptions = [
                    ["更換地址", function () {
                        var confirm = $mdDialog.prompt()
                            .title('請輸入你的地址')
                            .textContent('例如：香港科學園')
                            .ariaLabel('locaion')
                            .placeholder('請輸入你的地址')
                            .initialValue($scope.model.location)
                            .ok('確定')
                            .cancel('取消');
                        $mdDialog.show(confirm).then(function (result) {
                              $scope.model.location = result;
                               geocodeAddress(result, geocoder,map);

//                            $scope.updateHtml();
                        });
                    }]
                ];
                
               $scope.beforeAtomSaved = function () {

                    if (!angular.isUndefined($scope.model.db)){
                        //var db
                        $dazzleData.saveRecord($scope.model.db,$scope.model.src).then(function(){
                            console.log('Saved');
                        });
                    }
                }
            }
        };
        return editorGooglemapElement;
    });


    function geocodeAddress(address,geocoder,resultsMap) {
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }
      
      
      
      
      
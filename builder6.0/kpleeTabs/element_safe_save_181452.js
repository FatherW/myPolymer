var app = angular.module('demoApp');
app.filter("trust", ['$sce', function($sce) {
        return function(htmlCode) {
            if (!angular.isUndefined(htmlCode)) {
                return $sce.trustAsHtml(htmlCode);
            }
            return htmlCode;
        }
    }]);
app.directive('kpleeTabs', function ($compile, $templateRequest) {
    var http = "https://d27btag9kamoke.cloudfront.net/";
    var path = "builder6.0/kpleeTabs/";
    var directiveName = "kpleeTabs";
    var kpleeTabs = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element) {
            //console.log('kpleeTabs loading start');
            $templateRequest(http + path + "html/element.html?id=" + new Date().getTime()).then(function (html) {
                var template = angular.element(html);
                element.html(template);
                $compile(template)(scope);
            });
            //console.log('kpleeTabs loading end');
        },
        controller: function ($scope, $element, $attrs,$http) {
            //console.log('kpleeTabs init start');
            $scope.thisId=new Date().getTime();
            $scope.id = $element.attr('id') || "ele" + new Date().getTime() + "-" + Object.keys($scope.atom).length;
            $element.attr('id', $scope.id);
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "type": "editor-kpleeTabs-element"
                };
                if (!$.trim($element.html())) {
                    $scope.atom[$scope.id].html = '<div>kpleeTabs</div>'
                } else {
                    $scope.atom[$scope.id].html = $element.html();
                }
            }
            $scope.model = $scope.atom[$scope.id];
            $scope.editorCustomInit($scope, $element);
            //console.log('kpleeTabs init end');

            $scope.updateHtml = function () {
                //call this function if your html compiled by data and template
                $templateRequest(http + path + "html/template.html?id=" + new Date().getTime()).then(function (html) {
                    var template = angular.element(html);
                    $compile(template)($scope);
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.model.html = template[0].outerHTML
                                .replace(/(ng-\w+-\w+="(.|\n)*?"|ng-\w+="(.|\n)*?"|ng-(\w+-\w+)|ng-(\w+))/g, "")
                                .replace(/<!--(.*?)-->/gm, "");
                        });
                    }, 500);
                });
            }
            $scope.getUrlParameter = function(sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
            return false;
        };
        $element.responsiveTabs({
    		startCollapsed: 'accordion',
    		active: 0
  		});
            $scope.getJson=function(index,pathOfFile){
        	$http({
                    method: 'POST',
                    url: 'https://a61ef7rhqg.execute-api.ap-northeast-1.amazonaws.com/suntagetjson/sunta-getjson',
                    data: {
                        "hostToGet": "sunta520.dazzle.website",
                        "pathToGet": pathOfFile,
                        "dateMax": $scope.getUrlParameter('dateMax'),
                        "dateMin": $scope.getUrlParameter('dateMin')
                    }
                }).then(function(succeed) {
                	console.log(succeed);
                    if (succeed.data.code > 0) {
                        //$scope.rowdate[index]=succeed.data.data;
                        switch(index) {
    						case 0:
        						$scope.rowdate0=succeed.data.data;
        						break;
    						case 1:
        						$scope.rowdate1=succeed.data.data;
        						break;
        					case 2:
        						$scope.rowdate2=succeed.data.data;
        						break;
        					case 3:
        						$scope.rowdate3=succeed.data.data;
        						break;
    						default:
        						$scope.rowdate0=succeed.data.data;
						}
                        $scope.updateDate=succeed.data.updateDate;
                    }
                    console.log($scope.rowdate);
                }, function(error) {
                    console.log(error);
                });
        }
        
        	$scope.getJson(0,'/content/price1-data.json');
        	$scope.getJson(1,'/content/price2-data.json');
        	$scope.getJson(2,'/content/price3-data.json');
        	$scope.getJson(3,'/content/price4-data.json');
            
        }
    };
    return kpleeTabs;
});
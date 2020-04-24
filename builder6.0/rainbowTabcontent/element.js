var app = angular.module('demoApp');
app.directive('rainbowTabcontent', function ($compile, $templateRequest) {
    var path = "https://d25k6mzsu7mq5l.cloudfront.net/";
    var key = "builder6.0/rainbowTabcontent/html/id-1490831669221.html";
    var rainbowTabcontent = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element) {
            //console.log('rainbowTabcontent loading start');
            $templateRequest(path + key + "?id" + new Date().getTime()).then(function (html) {
                var template = angular.element(html);
                element.html(template);
                $compile(template)(scope);
                //console.log('rainbowTabcontent loading end');
            });
        },
        controller: function ($scope, $element, $attrs) {
            //console.log('rainbowTabcontent init start');
            $scope.id = $element.attr('id') || "ele" + new Date().getTime() + "-" + Object.keys($scope.atom).length;
            $element.attr('id', $scope.id);
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "type": "editor-rainbowTabcontent-element"
                };
                if (!$.trim($element.html())) {
                    $scope.atom[$scope.id].html = `<div class="tab-content">
	<div id="{{item.title}}" class="tab-pane fade in" ng-repeat="item in model.list">
		<h3>{{item.title}}</h3>
		<p text> 請輸入內容</p>
	</div>
</div>`;

                } else {
                    $scope.atom[$scope.id].html = $element.html();
                }
            }
            $scope.model = $scope.atom[$scope.id];
            $scope.editorCustomInit($scope, $element);
            //console.log('rainbowTabcontent init end');
        }
    };
    return rainbowTabcontent;
});
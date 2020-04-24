var app = angular.module('demoApp');
app.directive('custom', function ($mdDialog) {
    var master = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        link: function (scope, element) {
            el.append('<input type="checkbox" ng-model="input.checked"/><button ng-if="input.checked" ng-click="input.checked=false; doSomething()">X</button>');
            $compile(el)(scope);
            element.append(el);
        }
    };
    return master;
});
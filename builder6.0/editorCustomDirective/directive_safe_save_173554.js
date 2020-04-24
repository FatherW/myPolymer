var app = angular.module('demoApp');
app.directive('custom', function ($mdDialog) {
    var custom = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        link: function (scope, element, attr) {
            element.bind('mouseover', function (event) {
                var relTarg = evt.relatedTarget || evt.toElement;
                if (checkParent(relTarg, elm[0])) return;
                console.log(event.currentTarget);
            });
        }
    };
    return custom;
});
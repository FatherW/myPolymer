var app = angular.module('demoApp');
app.directive('custom', function ($mdDialog) {
    var custom = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        link: function (scope, element, attr) {
            elm.bind('mouseover', function (e) {
                var evt = e || window.event;
                var targetElement = evt.target || evt.srcElement;
                var relTarg = evt.relatedTarget || evt.fromElement;
                if (checkParent(relTarg, element[0])) return;

                console.log(targetElement);
            });
        }
    };
    return custom;
});
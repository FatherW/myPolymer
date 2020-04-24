var app = angular.module('demoApp');
app.directive('custom', function ($mdDialog) {
    var custom = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        link: function (scope, element, attr) {
            element.bind('mouseover', function (e) {
                var evt = e || window.event;
                var targetElement = evt.target || evt.srcElement;

                // check if mouse moves inside the element, if yes, return.
                var relTarg = evt.relatedTarget || evt.toElement;
                if (checkParent(relTarg, elm[0])) return;
            });
        }
    };
    return custom;
});
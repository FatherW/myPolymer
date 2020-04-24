var app = angular.module('demoApp');
app.directive('custom', function ($mdDialog) {
    var custom = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        link: function (scope, element, attr) {
            function checkParent(target, element) {
                if (angular.isUndefined(target)) return false;
                // Chrome and Firefox use parentNode, while Opera use offsetParent
                while (target.parentNode) {
                    if (target == element) return true;
                    target = target.parentNode;
                }
                while (target.offsetParent) {
                    if (target == element) return true;
                    target = target.offsetParent;
                }
                return false;
            };
            element.bind('mouseover', function (e) {
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
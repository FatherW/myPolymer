var app = angular.module('demoApp');
app.directive('custom', function ($mdDialog) {
    var custom = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        link: function (scope, elm, attrs) {
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

            function mouseover(target) {
                console.log('mouseover', target);
                $(target).append('<i id="removeButtonHandle" class="fa fa-2x fa-window-close-o" ng-click="removeAtom()"></i>')
            }

            function mouseout(target) {
                console.log('mouseout', target);
                $(target).children("#removeButtonHandle").remove();
            }

            scope.removeAtom = function () {
                alert('hi');
            }

            elm.bind('mouseover', function (e) {
                var evt = e || window.event;
                var targetElement = evt.target || evt.srcElement;
                var relTarg = evt.relatedTarget || evt.fromElement;
                if (checkParent(relTarg, elm[0])) {
                    return;
                } else {
                    mouseover(evt.currentTarget);
                }
            });

            elm.bind('mouseout', function (e) {
                var evt = e || window.event;
                var targetElement = evt.target || evt.srcElement;
                var relTarg = evt.relatedTarget || evt.toElement;
                if (checkParent(relTarg, elm[0])) {
                    return;
                } else {
                    mouseout(evt.currentTarget);
                }
            });
        }
    };
    return custom;
});
var app = angular.module('demoApp');
app.directive('text', function () {
    var text = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        controller: function ($scope, $http, $element, $attrs) {
            $scope.initEditor = function () {
                var editor = new MediumEditor($element[0], {
                    autoLink: true,
                    buttonLabels: 'fontawesome',
                    placeholder: false,
                    toolbar: {
                        buttons: ['fontsize', 'bold', 'italic', 'underline', 'orderedList', 'unorderList', 'justifyLeft', 'justifyRight', 'justifyCenter', 'justifyFull', 'removeFormat', 'h2', 'h4', 'h6'],
                    }
                }).subscribe('editableInput', function (event, element) {
                    console.log('test changed');
                });
            }
            setTimeout(function () {
                console.log()
            }, 5000);
        }
    };
    return text;
});

<h1 ng-model="textModel" medium-editor="" ng-init="textModel='bye world'">hello world</h1>
<p ng-model="textModel" ng-init="textModel='bye world'" medium-editor bind-options="{'toolbar': {'buttons': ['bold', 'italic', 'underline']}}" data-placeholder="Enter a description"></p>
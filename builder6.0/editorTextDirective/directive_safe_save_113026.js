var app = angular.module('demoApp');
app.directive('text', function () {
    var text = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        controller: function ($scope, $http, $element, $attrs) {
            $scope.isFocus = false;
            $element.removeAttr('contentEditable');
            $element.removeAttr('spellcheck');
            $element.removeAttr('data-medium-focused');
            $element.removeAttr('data-medium-editor-element');
            $element.removeAttr('role');
            $element.removeAttr('aria-multiline');
            $element.removeAttr('medium-editor-index');
            $element.removeAttr('data-medium-editor-editor-index');
            $element.removeClass('medium-editor-element');
            setTimeout(function () {
                console.log($element);
                var AnchorButton = MediumEditor.Extension.extend({
                    name: 'anchorButton',
                    init: function () {
                        this.button = this.document.createElement('button');
                        this.button.classList.add('medium-editor-action');
                        this.button.innerHTML = '<i class="fa fa-anchor"></i>';
                        this.on(this.button, 'click', this.handleClick.bind(this));
                    },
                    getButton: function () {
                        return this.button;
                    },
                    handleClick: function (event) {
                        alert($scope.pageJson);
                    }
                });
                var editor = new MediumEditor($element[0], {
                    autoLink: true,
                    buttonLabels: 'fontawesome',
                    placeholder: false,
                    toolbar: {
                        buttons: ['anchorButton', 'fontsize', 'bold', 'italic', 'underline', 'orderedList', 'unorderList', 'justifyLeft', 'justifyRight', 'justifyCenter', 'justifyFull', 'removeFormat', 'h2', 'h4', 'h6'],
                    },
                    extensions: {
                        'anchorButton': new AnchorButton()
                    }
                });
            }, 2000);
        }
    };
    return text;
});
var app = angular.module('demoApp');
app.directive('text', function ($compile) {
    var text = {
        restrict: 'A',
        priority: 1000,
        scope: true,
        controller: function ($scope, $http, $element, $attrs) {
            $scope.id = $element.attr('id') || "ele" + new Date().getTime() + "-" + Object.keys($scope.atom).length;
            $element.attr('id', $scope.id);
            var html = $element.html();
            var content;
            if (html.length < 5) {
                content = "<h1>Title</h1><p>Text</p>";
            } else {
                content = html;
            }
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "html": content,
                    "type": "text"
                };
                $element.attr('ng-model', 'model.html');
                $element.html(content);
            } else {
                $scope.atom[$scope.id].html = html;
            }

            $scope.model = $scope.atom[$scope.id];
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
                        editor.events.base.execAction('createLink', {"value": "hi"});
                        /*$scope.linkPopup().then(function (link) {
                            editor.events.base.execAction('createLink', {"value": link});
                        });*/
                    }
                });

                var ImageElementButton = MediumEditor.Extension.extend({
                    name: 'imageElementButton',
                    init: function () {
                        this.button = this.document.createElement('button');
                        this.button.classList.add('medium-editor-action');
                        this.button.innerHTML = '<i class="fa fa-picture-o"></i>';
                        this.on(this.button, 'click', this.handleClick.bind(this));
                    },
                    getButton: function () {
                        return this.button;
                    },
                    handleClick: function (event) {
                        editor.events.base.pasteHTML('<editor-image-element></editor-image-element>');
                        $compile($element)($scope);
                        this.base.checkContentChanged();
                    }
                });

                var editor = new MediumEditor($element[0], {
                    autoLink: true,
                    buttonLabels: 'fontawesome',
                    placeholder: false,
                    toolbar: {
                        buttons: ['anchorButton', 'imageElementButton', 'fontsize', 'bold', 'italic', 'underline', 'orderedList', 'unorderList', 'justifyLeft', 'justifyRight', 'justifyCenter', 'justifyFull', 'removeFormat', 'h2', 'h4', 'h6'],
                    },
                    anchorPreview: {
                        hideDelay: 500,
                        previewValueSelector: 'a'
                    },
                    extensions: {
                        'imageElementButton': new ImageElementButton(),
                        'anchorButton': new AnchorButton()
                    }
                });
            }, 2000);
        }
    };
    return text;
});
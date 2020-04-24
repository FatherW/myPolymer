var app = angular.module('demoApp');
app.directive('text', function ($compile) {
    var text = {
        restrict: 'EA',
        priority: 1000,
        scope: true,
        transclude: true,
        controller: function ($scope, $element, $attrs, $transclude) {

            $transclude(function (clone, scope) {
                var element = angular.element("<div></div>").append(clone);
                if ($.trim(element.html())) {
                    $element.html(element.html());
                } else {
                    $element.html("<h2>請在這裡輸入文字</h2>");
                }
                $compile($element.contents())($scope);
            })

            var editorIndex = $element.attr('data-medium-editor-editor-index');
            $("#medium-editor-anchor-preview-" + editorIndex).remove();
            $("#medium-editor-toolbar-" + editorIndex).remove();

            $element.removeAttr('contentEditable');
            $element.removeAttr('spellcheck');
            $element.removeAttr('data-medium-focused');
            $element.removeAttr('data-medium-editor-element');
            $element.removeAttr('role');
            $element.removeAttr('aria-multiline');
            $element.removeAttr('medium-editor-index');
            $element.removeAttr('data-medium-editor-editor-index');
            $element.removeClass('medium-editor-element');


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
                    $scope.editor.saveSelection();
                    var oldlink = $($scope.editor.getSelectedParentElement()).find("a").attr('href');
                    console.log(oldlink);
                    $scope.linkPopup($element).then(function (result) {
                        $scope.editor.restoreSelection();
                        switch (result.type) {
                            case "setLink":
                                if (result.link == '#') {
                                    $($scope.editor.getSelectedParentElement()).find("a").contents().unwrap();
                                } else {
                                    $scope.editor.events.base.execAction('createLink', {"value": result.link});
                                }
                                break;
                            case "saveLink":
                                if (angular.isUndefined($scope.thisPageJson.anchor)) {
                                    $scope.thisPageJson.anchor = [];
                                }
                                $scope.thisPageJson.anchor.push(result.link);
                                break;
                        }
                    });
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
                    $scope.editor.events.base.pasteHTML('<editor-image-element></editor-image-element>');
                    $compile($element.contents())($scope);
                }
            });
            $scope.editor = new MediumEditor($element, {
                autoLink: true,
                buttonLabels: 'fontawesome',
                placeholder: false,
                imageDragging: false,
                anchorPreview: {
                    hideDelay: 500
                },
                paste: {
                    forcePlainText: false,
                    cleanPastedHtml: false
                },
                toolbar: {
                    buttons: ['anchorButton', 'imageElementButton', 'fontsize', 'bold', 'italic', 'underline', 'orderedList', 'unorderList', 'justifyLeft', 'justifyRight', 'justifyCenter', 'justifyFull', 'removeFormat', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                },
                extensions: {
                    'imageElementButton': new ImageElementButton(),
                    'anchorButton': new AnchorButton()
                }
            });
        }
    };
    return text;
});
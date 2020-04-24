var app = angular.module('demoApp');
  app.directive('dazzleContainer', function ($compile, $templateRequest, $uibModal, $mdDialog,$dazzlePopup) {
    var editorContainerElement = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        transclude: true,
        template: `
        <md-toolbar class="md-accent dazzle dazzle-container">
        <div class="md-toolbar-tools-dazzle">
            <i class="fa fa-x fa-arrows" aria-hidden="true" ng-click="up()"></i>
            <i class="fa fa-x fa-cog" aria-hidden="true"></i>
            <i class="fa fa-x fa-bank" aria-hidden="true" ng-click="addElement()"></i>
            <i class="fa fa-x fa-database" aria-hidden="true" ng-click="dbsettings()"></i>                            
            <i class="fa fa-x fa-info" aria-hidden="true"></i>                            
            <i class="fa fa-close right" ng-click="remove()"></i>
        </div>
      </md-toolbar>
        <div class="container-content" ng-transclude></div>
        `,
        link: function (scope, element, attrs) {
            scope.http = "http://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = "dazzleContainer";
            scope.type = "dazzleContainer";
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
            
            
            element.bind("mouseenter",function(event){
                element.find('md-toolbar.dazzle-container').show();
                element.addClass('container-border');
                store.set('dropId',element.attr('id'));
            });

            element.bind("dragenter",function(event){
                element.find('md-toolbar.dazzle-container').show();
                element.addClass('container-border');
                store.set('dropId',element.attr('id'));
            });

            element.bind("mouseleave",function(event){
                element.find('md-toolbar.dazzle-container').hide();
                element.removeClass('container-border');

            });
            
            element.bind('dragend',function(event){
                    var dragId,dragPageX,dragPageY;
                    var dropEle;
                    var dropId = store.get('dropId');
                    var dragId =store.get('dragContentId');
//                    var dragId = store.get('dragId');
                    console.log('DragId',dragId);
                    var id = element.attr('id');
                    var code = $('#'+dragId)[0].outerHTML;
                    console.log('DropId',dropId);
                    console.log('Container ID',id);
                    if (dropId == id) {
                    console.log('Container Drop');
                        $('#'+dragId).remove();
                        var html = angular.element(code);
                        element.children('.container-content').append(html);
                        $compile(html)(scope);
                        $dazzlePopup.toast("成功移動");
                    }    
                });
        },
        controller: function ($scope, $element, $attrs,$dazzlePopup) {
            $scope.remove = function(){
                $element.remove();
            };
            $scope.addElement = function() {
                     $dazzlePopup.addElement($scope).then(function (newCode) {
                        var html = angular.element(newCode.code);
                        $element.children('.container-content').append(html);
                        $compile(html)($scope);
                        $dazzlePopup.toast("成功新增");
                    });
           
            };
            $scope.menuOptions = [
                ['編緝', function () {
                    var container = angular.element("<div></div>").append($element.html());
                  
                    
                    $scope.openCodePopup(container.html(), 'html').then(function (newCode) {
                        var newHtml = angular.element("<div></div>").append(newCode);
                        $scope.unwrap(newHtml);
                        newHtml.find("[custom]").each(function (index, element) {
                            var id = $(element).attr('id');
                            if (!angular.isUndefined($scope.atom[id])) {
                                $scope.atom[id].html = $(element).html();
                            }
                        });

                        var id = $element.attr('id');
                        if ('master' in $attrs && !angular.isUndefined($scope.masterAtom[id])) {
                            $scope.masterAtom[id].html = newHtml.html();
                        }
                        if ('custom' in $attrs && !angular.isUndefined($scope.atom[id])) {
                            $scope.atom[id].html = newHtml.html();
                        }
                        $element.html(newHtml.html());
                        $compile($element)($scope);
                    });
                    
                }],
                ['更換背景', function () {
                    $mdDialog.show({
                        controller: "userGalleryPopupController",
                        templateUrl: 'models/userGalleryPopup/popup.html' + '?id=' + new Date().getTime(),
                        locals: {
                            rootScope: $scope
                        }
                    }).then(function (image) {
                        console.log('http://' + $scope.exportBucket + '/' + image.key);
                        $scope.copyFile($scope.userBucket + '/' + encodeURI(image.key), $scope.exportBucket, image.key).then(function () {
                            //    $element.css('background', 'url(' + 'http://' + $scope.exportBucket + '/' + encodeURI(image.key) + ')');
                            //    $element.css('display', 'block');
                            //                 $scope.background='http://' + $scope.exportBucket + '/' + encodeURI(image.key);
                            $element.find('.section-bg').css('background-image', 'url(' + 'http://' + $scope.exportBucket + '/' + encodeURI(image.key) + ')');
                        });


                    });
                }],
                ["取消背景", function () {
                    $element.css('background', 'none');
                    $element.css('display', 'block');
                }],
                ["新增元素/結構", function () {
                    $scope.addElement();
                }]
            ];
        }
    }
    return editorContainerElement; 
  });

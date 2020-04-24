var app = angular.module('demoApp');
app.directive('menuPopup', function ($compile, $templateRequest, $mdDialog, $uibModal,$dazzlePopup) {
    var name = 'menuPopup';
    var link = {
        restrict: 'E',
        scope: true,
        templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/menuPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
                console.log('My Scope',$scope);
                var params = $dazzleUser.getDazzleInfo('params');
                
                  $scope.rootScope = $dazzleUser.getRootScope();

                    $scope.menu = params['menu'];
                
                    $scope.list = $scope.menu || [{
                            id: 'menu-' + new Date().getTime(),
                            title: "新項目",
                            link: "#",
                            type: 'Menu',
                            list: []
                        }];
                
                    $scope.newRootItem = function () {
                        $scope.list.push({
                            id: 'menu-' + new Date().getTime(),
                            title: "新項目",
                            link: "#",
                            type: 'Menu',
                            csss:[],
                            list: []
                        });
                    };
                
                    
                    $scope.cancel = function () {
                        $mdDialog.cancel();
                    };
                
                    $scope.saveMenu = function () {
                    
                       $mdDialog.hide(JSON.parse(angular.toJson($scope.list)));
                    };
                
                    $scope.saveLink = function (node, link) {
                        node.link = link;
                    };
                
                    $scope.newSubItem = function (node) {
                        node.list.push({
                            id: 'submenu-' + new Date().getTime(),
                            title: "新項目",
                            link: "#",
                            type: 'SubMenu',
                            csss:[],
                            list: []
                        });
                    };
                
                    $scope.addCss = function(node){
                        var params = {
                           name: 'cssEditorPopup',
                           directive: '<css-editor-popup></css-editor-popup>'
                        };
                        $dazzlePopup.callPopup(params).then(function(csss){
                            node.csss = csss;                            
                        });
                    }
                    $scope.openLinkPopup = function (node) {
                
                        var params ={
                            oldLink: node.link,
                            directive:"<link-popup></link-popup>"
                        };
 
                        $dazzlePopup.callPopup(params).then(function(output){
                        
                            node.link = output['link'];
                        });
                        
//                        $dazzlePopup.linkPopup(null,node.link,$scope.rootScope).then(function(link){
//                            node.link= link.link;
//                        });
                
                
                    }
                
                    $scope.removeHandle = function (node) {
                        delete node;
                    };
        }
    };
    return link;
});
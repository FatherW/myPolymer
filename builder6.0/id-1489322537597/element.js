var app = angular.module('demoApp');

app.directive('editorToolbar', function ($ocLazyLoad) {
    var path = "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/id-1489322537597";
    var editorToolbar = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: path + '/html/id-1489322537597.html' + '?id=' + new Date().getTime(),
        controller: function ($scope, $element, $attrs, $mdDialog,$timeout) {




              var self = this;

		      self.hidden = false;
		      self.isOpen = false;
		      self.hover = false;

		      // On opening, add a delayed property which shows tooltips after the speed dial has opened
		      // so that they have the proper position; if closing, immediately hide the tooltips
		      $scope.$watch('demo.isOpen', function(isOpen) {
		        if (isOpen) {
		          $timeout(function() {
		            $scope.tooltipVisible = self.isOpen;
		          }, 600);
		        } else {
		          $scope.tooltipVisible = self.isOpen;
		        }
		      });

		      self.items = [
		        { name: "Twitter", icon: "img/icons/twitter.svg", direction: "bottom" },
		        { name: "Facebook", icon: "img/icons/facebook.svg", direction: "top" },
		        { name: "Google Hangout", icon: "img/icons/hangout.svg", direction: "bottom" }
		      ];

		      self.openDialog = function($event, item) {
		        // Show the dialog
		        $mdDialog.show({
		          clickOutsideToClose: true,
		          controller: function($mdDialog) {
		            // Save the clicked item
		            this.item = item;

		            // Setup some handlers
		            this.close = function() {
		              $mdDialog.cancel();
		            };
		            this.submit = function() {
		              $mdDialog.hide();
		            };
		          },
		          controllerAs: 'dialog',
		          templateUrl: 'dialog.html',
		          targetEvent: $event
		        });
		      };



            //element init
            $scope.id = $element[0].id || "ele" + new Date().getTime();
            $element[0].id = $scope.id;
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "src": $scope.src,
                    "link": "#",
                    "html": "<div>hello world</div>"
                };
            }
            $scope.model = $scope.atom[$scope.id];
            $scope.imgMenuOptions = [
                ["Menu", function ($itemScope) {
                    console.log('Menu clicked');
                }]
            ];
            $element[0].addEventListener("DOMSubtreeModified", function () {
                console.log('DOM changed');
            });
            //element init
        }
    }
    return editorToolbar;
});
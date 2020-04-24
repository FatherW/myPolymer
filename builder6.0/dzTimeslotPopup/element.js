var app = angular.module('demoApp');
var name = 'dzTimeslotPopup';

app.config(['calendarConfig', function(calendarConfig) {

            // View all available config
            console.log(calendarConfig);

            // Change the month view template globally to a custom template
        //    calendarConfig.templates.calendarMonthView = 'path/to/custom/template.html';

            // Use either moment or angular to format dates on the calendar. Default angular. Setting this will override any date formats you have already set.
            calendarConfig.dateFormatter = 'moment';

            // This will configure times on the day view to display in 24 hour format rather than the default of 12 hour
            calendarConfig.allDateFormats.moment.date.hour = 'HH:mm';

            // This will configure the day view title to be shorter
            calendarConfig.allDateFormats.moment.title.day = 'ddd D MMM';

            // This will set the week number hover label on the month view
            calendarConfig.i18nStrings.weekNumber = 'Week {week}';

            // This will display all events on a month view even if they're not in the current month. Default false.
            calendarConfig.displayAllMonthEvents = true;

            // Make the week view more like the day view, ***with the caveat that event end times are ignored***.
            calendarConfig.showTimesOnWeekView = true;

        }]);
app.directive(name, function ($compile, $templateRequest, $mdDialog, $uibModal,$dazzleUser,$dazzleS3,$dazzlePopup,$dazzleFn,$dazzleInit,$dazzleData,calendarConfig,moment) {
    
    var link = {
        restrict: 'E',
        scope: true,
        // controllerAs: 'vm',
        // bindToController: true,
        templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/dzTimeslotPopup/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {
            scope.http = "https://d25k6mzsu7mq5l.cloudfront.net/";
            scope.directiveId = name;
            scope.type = name;
            scope.templatePath = "builder6.0/" + scope.directiveId + "/element.html?id=" + new Date().getTime()
            scope.templateUrl = scope.http + scope.templatePath;
        },        
        controller: function ($mdToast,$window,$scope, $element, $attrs,$dazzleS3, $http,$mdSidenav, $mdBottomSheet,$log,$ocLazyLoad,$mdDateLocale) {
//            var vm = this;
            var params = $dazzleUser.getDazzleInfo('params');
	        $scope.calendarView = 'month';
	        $scope.viewDate = new Date().getTime();
	        
           $scope.save = function() {
            $mdDialog.hide($scope.events);
            }


            
          $scope.cancel = function () {
                $mdDialog.cancel();
            }
         
         

    //These variables MUST be set as a minimum for the calendar to work
    $scope.calendarView = 'month';
    $scope.viewDate = new Date();
    var actions = [{
      label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
      onClick: function(args) {
        $dazzlePopup.toast('Edited', args.calendarEvent);
      }
    }, {
      label: '<i class=\'glyphicon glyphicon-remove\'></i>',
      onClick: function(args) {
        $dazzlePopup.toast('Deleted', args.calendarEvent);
      }
    }];
    $scope.events = [
      {
        title: 'An event',
        color: calendarConfig.colorTypes.warning,
        startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
        endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
        draggable: true,
        resizable: true,
        // actions: actions
      }, {
        title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
        color: calendarConfig.colorTypes.info,
        startsAt: moment().subtract(1, 'day').toDate(),
        endsAt: moment().add(5, 'days').toDate(),
        draggable: true,
        resizable: true,
        // actions: actions
      }, {
        title: 'This is a really long event title that occurs on every year',
        color: calendarConfig.colorTypes.important,
        startsAt: moment().startOf('day').add(7, 'hours').toDate(),
        endsAt: moment().startOf('day').add(19, 'hours').toDate(),
        recursOn: 'year',
        draggable: true,
        resizable: true,
        // actions: actions
      }
    ];

    $scope.cellIsOpen = true;

    $scope.addEvent = function() {
      $scope.events.push({
        title: 'New event',
        startsAt: moment().startOf('day').toDate(),
        endsAt: moment().endOf('day').toDate(),
        color: calendarConfig.colorTypes.important,
        draggable: true,
        resizable: true
      });
    };

    $scope.eventClicked = function(event) {
      $dazzlePopup.toast('Clicked', event);
    };

    $scope.eventEdited = function(event) {
      $dazzlePopup.toast('Edited', event);
    };

    $scope.eventDeleted = function(event) {
      $dazzlePopup.toast('Deleted', event);
    };

    $scope.eventTimesChanged = function(event) {
      $dazzlePopup.toast('Dropped or resized', event);
    };

    $scope.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };

    $scope.timespanClicked = function(date, cell) {

      if ($scope.calendarView === 'month') {
        if (($scope.cellIsOpen && moment(date).startOf('day').isSame(moment($scope.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
          $scope.cellIsOpen = false;
        } else {
          $scope.cellIsOpen = true;
          $scope.viewDate = date;
        }
      } else if ($scope.calendarView === 'year') {
        if (($scope.cellIsOpen && moment(date).startOf('month').isSame(moment($scope.viewDate).startOf('month'))) || cell.events.length === 0) {
          $scope.cellIsOpen = false;
        } else {
          $scope.cellIsOpen = true;
          $scope.viewDate = date;
        }
      }

    };
         
         
         
            
        }
    };
    return link;
});



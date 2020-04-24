var app = angular.module('demoApp');
app.requires.push('angular-linq');
app.directive('kpleeChart', function ($compile, $templateRequest) {
    var http = "https://d27btag9kamoke.cloudfront.net/";
    var path = "builder6.0/kpleeChart/";
    var directiveName = "kpleeChart";
    var kpleeChart = {
        restrict: 'E',
        priority: 1000,
        scope: true,
        link: function (scope, element) {
            //console.log('kpleeChart loading start');
            $templateRequest(http + path + "html/element.html?id=" + new Date().getTime()).then(function (html) {
                var template = angular.element(html);
                element.html(template);
                $compile(template)(scope);
            });
            //console.log('kpleeChart loading end');
        },
        controller: function ($scope, $element, $attrs,$http,$linq) {
            //console.log('kpleeChart init start');
            $scope.id = $element.attr('id') || "ele" + new Date().getTime() + "-" + Object.keys($scope.atom).length;
            $element.attr('id', $scope.id);
            if (angular.isUndefined($scope.atom[$scope.id])) {
                $scope.atom[$scope.id] = {
                    "id": $scope.id,
                    "type": "editor-kpleeChart-element"
                };
                if (!$.trim($element.html())) {
                    $scope.atom[$scope.id].html = '<div>kpleeChart</div>'
                } else {
                    $scope.atom[$scope.id].html = $element.html();
                }
            }
            $scope.model = $scope.atom[$scope.id];
            $scope.editorCustomInit($scope, $element);
            //console.log('kpleeChart init end');

            $scope.updateHtml = function () {
                //call this function if your html compiled by data and template
                $templateRequest(http + path + "html/template.html?id=" + new Date().getTime()).then(function (html) {
                    var template = angular.element(html);
                    $compile(template)($scope);
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.model.html = template[0].outerHTML
                                .replace(/(ng-\w+-\w+="(.|\n)*?"|ng-\w+="(.|\n)*?"|ng-(\w+-\w+)|ng-(\w+))/g, "")
                                .replace(/<!--(.*?)-->/gm, "");
                        });
                    }, 500);
                });
            }
            
			$scope.chartMenuOptions = [
                ["更換數據", function ($itemScope) {
                	console.log($itemScope);
                    $uibModal.open({
                        animation: true,
                        templateUrl: 'models/chartPopup/popup.html' + "?id=" + new Date().getTime(),
                        controller: 'chartPopupController',
                        size: 'lg',
                        resolve: {
                            rootScope: function () {
                                return $scope
                            }
                        }
                    }).result.then(function (modelData) {
                    	$scope.atom[$scope.id]=angular.copy(modelData);
                    	$scope.model=angular.copy(modelData);
                    	loadChartData();
                        /*$scope.copyFile($scope.userBucket + '/' + encodeURI(image.key), $scope.exportBucket, image.key).then(function () {
                            $scope.$apply(function () {
                                $scope.model.list[2]['link'] = 'http://' + $scope.exportBucket + '/' + image.key;
                                
                            });
                        });*/
                        console.log("done");
                    });
                }]
            ];
            
        $scope.getUrlParameter = function(sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
            return false;
        };
		$scope.rowdate=[];
        $scope.maxD = new Date();
        $scope.minD = new Date();
        $scope.minD.setFullYear($scope.minD.getFullYear() - 1);
        if ($scope.getUrlParameter('dateMax')) {
            $scope.maxD = new Date(($scope.getUrlParameter('dateMax') * 1000));
        }
        if ($scope.getUrlParameter('dateMin')) {
            $scope.minD = new Date(($scope.getUrlParameter('dateMin') * 1000));
        }
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[1];
        $scope.clear = function() {
            //$scope.maxD = new Date();
        	//$scope.minD = new Date();
        };
        $scope.openMax = function() {
            $scope.popupMax.opened = true;
        };
        $scope.popupMax = {
            opened: false
        };
        $scope.openMin = function() {
            $scope.popupMin.opened = true;
        };
        $scope.popupMin = {
            opened: false
        };
        $scope.dateOptions = {
            //dateDisabled: disabled,
            //formatYear: 'yyyy',
            maxDate: new Date(),
            //minDate: new Date(),
            startingDay: 1
        };
		loadChartData();
        $scope.goSearch = function() {
            window.location = "chart.html?dateMax=" + Math.round($scope.maxD.getTime() / 1000) + "&dateMin=" + Math.round($scope.minD.getTime() / 1000);
            var tmp = [];
            for (var i = 0; i < $scope.names.length; i++) {
                if ($scope.names[i].selected) {
                    tmp.push($scope.names[i].value);
                }
            }
            window.location = "chart.html?cates=" + tmp.toString() + "&dateMax=" + Math.round($scope.maxD.getTime() / 1000) + "&dateMin=" + Math.round($scope.minD.getTime() / 1000);
        }
		function loadChartData(){
        	$http.get("http://sunta520.dazzle.website/content/chart-data.json").then(function(response) {
            $scope.items = response.data;
            var seriesOptions = [];
            var maxTime = Math.round(new Date().getTime() / 1000);
            var minTime = new Date();
            minTime.setFullYear(minTime.getFullYear() - 1);
            minTime = Math.round(minTime.getTime() / 1000);
            if ($scope.getUrlParameter('dateMax')) {
                maxTime = $scope.getUrlParameter('dateMax');
            }
            if ($scope.getUrlParameter('dateMin')) {
                minTime = $scope.getUrlParameter('dateMin');
            }

            seriesCounter = 0,
                $scope.names = [
                    { name: 'WTI', selected: false, value: 1 },
                    { name: 'SM', selected: false, value: 2 },
                    { name: 'BZ', selected: false, value: 3 },
                    { name: 'GPPS', selected: false, value: 4 },
                    { name: 'HIPS', selected: false, value: 5 },
                    { name: 'ABS', selected: false, value: 6 },
                    { name: 'PP-HOMO', selected: false, value: 7 },
                    { name: 'PP-BLOCK', selected: false, value: 8 },
                    { name: 'PP-RANDOM', selected: false, value: 9 },
                    { name: 'C3', selected: false, value: 10 }
                ];
            cates = [1,2,3,10];



            if ($scope.getUrlParameter('cates')) {
                cates = $scope.getUrlParameter('cates').toString().split(',');
                for (var i = 0; i < cates.length; i++) {
                    $scope.names[cates[i] - 1].selected = true;
                }
            } else {
                for (var i = 0; i < cates.length; i++) {
                    $scope.names[cates[i] - 1].selected = true;
                }
            }

            function createChart() {
                //function to create chart
                
                Highcharts.stockChart('chart_container', {
                    rangeSelector: {
                        selected: 4
                    },
                    yAxis: {
                        labels: {
                            formatter: function() {
                                return (this.value > 0 ? ' + ' : '') + this.value + '';
                            }
                        },
                        plotLines: [{
                            value: 0,
                            width: 2,
                            color: 'silver'
                        }]
                    },
                    plotOptions: {
                        series: {
                            compare: 'value',
                            showInNavigator: true
                        }
                    },
                    tooltip: {
                        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change})<br/>',
                        valueDecimals: 2,
                        //split: true,
                        useHTML: true,
                        formatter: function() {
                            var pointsForTooltip = this.points,
                                tooltipsStrings = [],
                                returnString = '',
                                currentPointIndex,
                                currentPointValue,
                                nextPointValue,
                                cDate,
                                compareValue;
        
                            pointsForTooltip.forEach(function(el, inx) {
                                currentPointIndex = el.point.index;
                                currentPointValue = el.y.toFixed(2);
                                cDate=Highcharts.dateFormat('%Y-%m-%d', el.x)
                                if (currentPointIndex !== 0) {
                                    currentPointIndex--;
                                }

                                nextPointValue = el.series.yData[currentPointIndex].toFixed(2);
                                //compareValue = (100 - nextPointValue * 100 / currentPointValue).toFixed(2);
                                compareValue = (currentPointValue - nextPointValue).toFixed(2);
                                //var symbol='<i class="fa fa-arrow-up" aria-hidden="true"></i>';
                                if(compareValue > 0){
                                	symbol="<i></i>";
                                }
                                else if(compareValue > 0){
                                	symbol='<i style="content:"aaa";" class="fa fa-arrow-up" aria-hidden="true"></i>';
                                }
                                else if(compareValue < 0){
                                	symbol='<i style="content:"bbb";" class="fa fa-arrow-down" aria-hidden="true"></i>';
                                }
                    
                                tooltipsStrings.push('<b style="color:' + el.series.color + '">' + el.series.name + ':</b> USD ' + currentPointValue + ' ('+ symbol+ compareValue + ')<br/>');
                            	
                            });
							returnString+='<b>'+cDate+"</b><br>"
                            tooltipsStrings.forEach(function(el) {
                                returnString += el;
                            });
                            return returnString;
                        },
                    },
                    series: seriesOptions
                });
				
                /*
                $('#container').highcharts('StockChart', {
                    rangeSelector: {
                        selected: 4
                    },
                    yAxis: {
                        labels: {
                            formatter: function() {
                                return (this.value > 0 ? ' + ' : '') + this.value + '';
                            }
                        },
                        plotLines: [{
                            value: 0,
                            width: 2,
                            color: 'silver'
                        }]
                    },
                    plotOptions: {
                        series: {
                            compare: 'percent',
                            showInNavigator: true
                        }
                    },

                    tooltip: {
                        pointFormat: '<span style="color:{series.color}">{series.name}</span>：USD<b>{point.y}</b> ({point.change})<br/>',
                        valueDecimals: 2,
                        split: true
                    },
                    series: seriesOptions
                });
                */
            }
			$scope.todayData={};
            $.each(cates, function(i, value) {
                //filter data from json by selected cate
                var data = $linq.Enumerable().From($scope.items)
                    .Where(function(x) {
                        return x.category == (parseInt(value)) && x.dateline >= minTime && x.dateline <= maxTime
                    })
                    .OrderBy(function(x) {
                        return x.dateline
                    })
                    .Select(function(x) {
                        var tmp = [];
                        tmp.push(x.dateline * 1000);
                        tmp.push(x.val);
                        return tmp
                    })
                    .ToArray();
                $scope.todayData[value-1]={};
				var lastData=data[data.length-1][1];
				var diff=parseFloat(data[data.length-1][1]-data[data.length-2][1]).toFixed(2);
				var percentage=parseFloat(diff/lastData).toFixed(2);
				$scope.todayData[value-1]['name']=$scope.names[value-1]['name'];
				$scope.todayData[value-1]['value']=lastData;
				$scope.todayData[value-1]['diff']=diff;
				$scope.todayData[value-1]['percentage']=percentage;
				console.log($scope.todayData);
                //push each data to array
                seriesOptions[i] = {
                    name: $scope.names[value - 1].name,
                    data: data
                };
                seriesCounter += 1;

                if (seriesCounter === cates.length) {
                    createChart();
                }
            });




        });
        }  
            
        }
    };
    return kpleeChart;
});
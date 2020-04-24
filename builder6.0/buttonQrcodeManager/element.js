var app = angular.module('demoApp');
app.directive('buttonQrcodeManager', function ($http, $compile, $templateRequest, $interval, $mdDialog, $mdToast,$dazzleUser, $dazzleInit, $dazzleS3, $dazzlePopup, $ocLazyLoad,$dazzleFn,$dazzleElastic) {
    var name = 'buttonQrcodeManager';
    var link = {
        restrict: 'E',
        scope:  true,
        templateUrl: "//d25k6mzsu7mq5l.cloudfront.net/builder6.0/buttonQrcodeManager/element.html?id=" + new Date().getTime(),
         link: function (scope, element, attrs) {

        },        
        controller: function ($scope, $element, $attrs,$dazzleS3, $http, $mdDialog, $mdSidenav, $mdBottomSheet,$dazzleUser) {
            $scope.load= function() {
                
                console.log('hello');
                
            }
            var qrcode;
            $ocLazyLoad.load([
                '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js',
                '//cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js'
            ], {cache: false}).then(function(){
                qrcode = new QRCode("qrcode", {
                    text: "http://masterhunt.dazzle.website/scan.html#hello"+ $scope.randCode,
                    width: 128,
                    height: 128,
                    colorDark : "#000000",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.H
                });
            });
            
            $scope.massMailPopup = function() {
                var params = {
                    name: 'dazzleMassMailPopup',
                    directive: '<dazzle-mass-mail-popup></dazzle-mass-mail-popup>'
                }
                $dazzlePopup.callPopup(params).then(function(result){
    
                });
            }
            $scope.printQRcode = function(){
                var selectedRows = $dazzleUser.dazzleInfo['selectedRows'];
                var myGrid = $dazzleUser.dazzleInfo['myGrid'];
                console.log(myGrid);
                var html = angular.element("<div id='panel'></div>");
                
                angular.forEach(selectedRows,function(item,index){
                        var grid = angular.element("<div class='grid' style='width:20%; float:left;'></div>");
                        grid.append("<h3>"+item['ID']+"</h3>");
                        grid.append("<img src='"+item['QRcode']+"'/>");                            
                        html.append(grid);
                });
                console.log(html.html());
                var win = window.open("", "QRCode list", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=900,height=1000,top="+(screen.height-400)+",left="+(screen.width-840));
                win.document.body.innerHTML = '';
                win.document.write(html.html());
                
                win.focus();
                win.print();
                win.close();
            }

    
            $scope.generateQRcode = function(){
                var selectedRows = $dazzleUser.dazzleInfo['selectedRows'];
                var myGrid = $dazzleUser.dazzleInfo['myGrid'];
                console.log(myGrid);
                angular.forEach(selectedRows,function(item,index){
                    
                    // http://masterhunt.dazzle.website/scan.html#hello"+ $scope.randCode
                    
                    qrcode.clear(); // clear the code.
                    qrcode.makeCode("http://masterhunt.dazzle.website/scan.html#"+ item['ID']); 
                    var src= $('#qrcode img').attr("src");
                    var url = src.replace(/^data:image\/[^;]+/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20qrcodeconvite.png;');
                    item['QRcode'] = url;
                    // var rowNode = myGrid.api.getRowNode(item['ID']);
                    // console.log(rowNode);
                    // rowNode.setDataValue('QRcode', url);

                    // myGrid.api.setRowData(item);
                    myGrid.api.refreshView();
                });

            }

        }
    };
    return link;
});
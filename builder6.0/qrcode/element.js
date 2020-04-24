var app = angular.module('demoApp');

        app.directive('qrcode', function ($compile, $timeout, $uibModal, $mdDialog, $mdToast, $dazzleS3,$dazzleData, $dazzleUser, $dazzlePopup,$dazzleInit,$ocLazyLoad) {
                   
        
            var qrcode = {
                restrict: 'E',
                priority: 1000,
                scope: true,
                templateUrl: "//d25k6mzsu7mq5l.cloudfront.net/builder6.0/qrcode/element.html?id=" + new Date().getTime(),
                controller: function ($scope, $http, $element) {

                        function hashCode(str){
                            var hash = 0;
                            if (str.length == 0) return hash;
                            for (i = 0; i < str.length; i++) {
                                char = str.charCodeAt(i);
                                hash = ((hash<<5)-hash)+char;
                                hash = hash & hash; // Convert to 32bit integer
                            }
                            return hash;
                        }

                    
                        $scope.randCode =  hasCode(new Date().getTime());
                        
                        
                        $ocLazyLoad.load([
                            '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js',
                            '//cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js'
                        ], {cache: false}).then(function(){
//                        var elText = document.getElementById("text");                    
                            var qrcode = new QRCode("test", {
                                text: "http://masterhunt.dazzle.website/scan.html#"+ $scope.randCode,
                                width: 128,
                                height: 128,
                                colorDark : "#000000",
                                colorLight : "#ffffff",
                                correctLevel : QRCode.CorrectLevel.H
                            });
                        //    qrcode.clear(); // clear the code.
                        //    qrcode.makeCode("http://naver.com");                            
                        });
                        



                }
            };
            return qrcode;
        }); 
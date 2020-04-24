var app = angular.module('demoApp');
app.directive('dazzleToolbar', function ($compile, $templateRequest, $http, $mdDialog,$dazzlePopup,$dazzleUser,pageInfo,atomInfo) {
    var dazzleToolbar = {
        restrict: 'E',
        scope: true,
//        replace:true,
        css: {
                  href: "//d27btag9kamoke.cloudfront.net/builder6.0/dazzleToolbar/element.css?id=" + new Date().getTime(),
                  preload: true
                },
//        template: "<div>Hello</div>"
        // templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/builder6.0/dazzleToolbar/element.html?id=" + new Date().getTime(),
        templateUrl: "//d27btag9kamoke.cloudfront.net/builder6.0/dazzleToolbar/element.html?id=" + new Date().getTime(),
        link: function (scope, element, attrs) {

        },
        controller: function ($scope, $element, $attrs) {
            $scope.display = true;
            
            // var width = $('panel').width();
            // if (width<100)
            //     $scope.display= false;
            
            $scope.hide = false;
            $scope.hideToggle = function() {
                if (!$scope.hide) {
                    console.log('Hide');
                    $('md-toolbar.dazzle').css('width','22px');
                    $('md-toolbar.dazzle').css('overflow','hidden');
                    $scope.hide =true;
                } else {
                    console.log('Unhide');
                    $('md-toolbar.dazzle').css('width','108px');
                    $('md-toolbar.dazzle').css('overflow','hidden');
                    $scope.hide =false;
                }
            }
            $scope.changeBackground = function(){
                var allEle = $('panel').find('*');
                var  bgArray  =[];
                console.log(allEle);
                allEle.each(function(){
                   var bg = $(this).css('background-image'); 
                    console.log('Background',bg);
                    if (bg!='none') {
                        bgArray.push($(this));
                    }
                });
                
                console.log('BG array',bgArray);
                var params = {
                    name: 'dzBackgroundPopup',
                    directive: '<dz-background-popup></dz-background-popup>',
                    items: bgArray
                }
                $dazzlePopup.callPopup(params).then(function(result){
                      //var url = "url("+$scope.getFileUrl('large-web',output.gid)+")";
                        var url = "url("+result+")";
                        console.log('URL',url);
                        // var id = item.attr('id');
                        // console.log('ID',id);
                        // item.css('background-image',url); 
                        // console.log(item);
                        // $('#'+id).css('background-image',url);

                });
                // angular.forEach(allEle,function(item,index){
                //     var bg = item.css('background-image');
                //     console.log('Background',bg);
                // });
            }
            $scope.templateEdit = function() {
                console.log('Atom',atomInfo);
                var text = $('panel').find('dz-text').html();
                var id = $dazzleUser.dazzleInfo['panelId'];
                if (angular.isUndefined(atomInfo.atom[id]))
                    atomInfo.initAtom(id,text);
                    
                text = atomInfo.atom[id]['templateCode'] || null;

                				
				//text = beautify(text, { indent_size: 2, space_in_empty_paren: false });
				
                var params = {
                    name: 'dzCodePopup',
                    directive: '<dz-code-popup></dz-code-popup>',
                    body: text
                }
                    $dazzlePopup.callPopup(params).then(function(result){
                            $dazzleUser.dazzleInfo['templateCode']=result;
                            atomInfo.atom[id]['templateCode'] = result;
                            //$('panel').find('dz-text').html(result);
                            console.log('Atom Info',atomInfo);
                    });             
            
            }
            $scope.sourceEdit = function() {
                
                var text = $('panel').find('dz-text').html();
				
				//text = beautify(text, { indent_size: 2, space_in_empty_paren: false });
				
                var params = {
                    name: 'dzCodePopup',
                    directive: '<dz-code-popup></dz-code-popup>',
                    body: text
                }
                    $dazzlePopup.callPopup(params).then(function(result){
                            $dazzleUser.dazzleInfo['bodyCode']=result;
                            $('panel').find('dz-text').html(result);
                            
                            //console.log(result); 
                            //pageInfo.save();
                    });             
            
            }
            $scope.dbsettings = function() {
                    // var text = $('panel').find('dz-text').html();
                    // var params = {
                    //     name: 'dbSettingPopup',
                    //     directive: '<db-setting-popup></db-setting-popup>'
                    // };
                    // $dazzlePopup.callPopup(params).then(function(result){
                    //      var html = angular.element(text);
                    //      var ele;
                    //      $scope.result = result;
                    //      ele=$compile(html)($scope);
                    //      $('panel').find('dz-text').html(ele);
                    // });
                    
                    var params = {
                        name: 'referFieldPopup',
                        directive: '<refer-field-popup></refer-field-popup>'
                    };
                    
                    $dazzlePopup.callPopup(params).then(function(result){
                        
                    });
                    
                    
            }
            
            
            $scope.remove = function() {
            
            }
        }
    };
    return dazzleToolbar;
});
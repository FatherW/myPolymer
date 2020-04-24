var app = angular.module('demoApp');
app.directive('dzField', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzleS3,$dazzlePopup,
    dataInfo,moment,atomInfo,dbFactory) {
    var dzField = {
        restrict: 'EA',
        priority: 1000,
        scope: true,
//        templateUrl: "https://d25k6mzsu7mq5l.cloudfront.net/file6.0/directive-template.html",
        link: function ($scope, $element, attrs) {
            var json;
            
            
                var id = $element.attr('id') || new Date().getTime();
                $scope.id= id;
                $element.attr('id',id);
                atomInfo.initAtom(id);
                
                
                $scope.field = $element.attr('data-field');
                $scope.type = $element.attr('data-type');
//                $scope.dataId =  $element.attr('data-id') || $('dz-content-id').text();
                
                $scope.dataId =  $element.attr('data-id') || atomInfo.atom['dz-content-id'] || $('dz-content-id').text();
                $scope.exist = true;

                console.log($scope.field,$scope.type,$scope.dataId);
                // console.log(dataInfo.data);

                console.log('Atom Info in Field',atomInfo.atom);                    

                
               var mode = store.get('editMode');
                console.log('Mode',mode);
                //if (angular.isUndefined(mode) || mode=="normal"){
                    console.log($dazzleUser.dazzleInfo['data']);

                    $http({
                      method: 'GET',
                      url: '/content/'+$scope.dataId+'-data.json',
                    }).then(function successCallback(result) {
                        console.log('DZ Field',result.data);
                        json = result.data;
                        $scope.item = json[$scope.field];
                        $scope.formatByType();
                    }, function errorCallback(response) {
    //                    var item = store.get($scope.dataId);
                        console.log('Cannot find data',dbFactory.data);
                        if($scope.dataId)
                            $scope.item = $dazzleUser.dazzleInfo['data'][$scope.dataId][$scope.field];
                        else
                            $scope.item = dbFactory.data["template-data"][$scope.field];

                        console.log('Cannot find data',dbFactory.data,$scope.item,$scope.field);
                        $scope.formatByType();
                    });
                    
                //}
        
                
                
        },
        controller: function ($scope, $element, $attrs) {
            
            $scope.formatByType = function() {
            console.log('Format',$scope.type,$scope.item);
                switch($scope.type){


                    case 'youtube':
                        var embed = `
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/JFuxtn6A3QA" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        `;
                        $element.html(embed);
                        break;

                    case 'timestamp':
                         var time =   parseInt($scope.item)|| 1262304000;
                        if (time < 1000000000000)
                            var a = new Date(time*1000);
                        else
                            var a = new Date(time);
                        str = a.toISOString();
                        var timeStr =moment(str,"YYYY-MM-DD").format("YYYY-MM-DD");
                        $element.text(timeStr);
                        break;

                    case 'album-thumbnail':

                        $element.attr('src',"//"+$scope.item[0]['bucket']+".s3.amazonaws.com/"+$scope.item[0]['path']);

                        break;
                    case 'file':
                    case 'image':
                        $element.attr('src',$scope.item);
                        break;
                        
                    case 'html':
                        $element.html($scope.item);
                        atomInfo.atom[$scope.id].html = $scope.item;
                        break;
                    
                    
                    case 'thumbnail':
                        var item = $scope.item;
                        var src = "//"+item[0]['bucket']+".s3.amazonaws.com/"+item[0]['path'] ;
                        $element.attr('src',src);             
                        break;
                        
                    case 'gallery':
                        var text='';
                        angular.forEach($scope.item,function(item,index){
                           text +='<img src="'+item+'">'; 
                        });
                        
                        $element.html(text);
                        break;
                    
                    case 'date':
                        var time,text;
                        console.log('My Date',$scope.item);
                        if ($scope.item< 9999999999)
                            time = $scope.item*1000;
                        else
                            time= $scope.item;
                        var text = new Date(time).toLocaleDateString() || null;
                        
                        $element.text(text);
                        break;

                    case 'dlink':
                        $element.attr('href',$scope.item);
                        break;

                    case 'link':
                        $element.attr('href',$scope.item+".html");
                        break;
                        
                    case 'currency':
                        
                        $element.text("$"+$scope.item);
                        break;
                    case 'text':
                    default:
                        $element.text($scope.item);
                        atomInfo.atom[$scope.id].html = $scope.item;

                        break;
                    
                }                
            }
            

     
     

        }
    };
    return dzField;
});
var app = angular.module('demoApp');
app.directive('dzNewField', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzleS3,$dazzlePopup,
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
                $scope.type= $element.attr('data-type');
                $scope.table = $element.attr('data-able');
                $scope.dataId = $element.attr('data-id');
                $scope.key = $element.attr('data-key');
                // $scope.datasetId = $element.attr('dataset-id');
                // $scope.datasetIndex = $element.attr('dataset-index');
                // $scope.datasetTable = $element.attr('dataset-table');
                // $scope.datasetKey = $element.attr('dataset-key');
                
//                console.log('Dataset',$scope.datasetId,$scope.datasetIndex);
                console.log(atomInfo.atom);
                
                $scope.dataId = $element.attr('dataid')
                console.log('dbFactory field dataid',$scope.dataId);
                //$scope.data = dbFactory.getAtomData($scope.dataId);
                
                
//                dbFactory.loadDataByID($scope.table,$scope.dataId).then(function(data){

                 var thisPage = decodeURIComponent(location.pathname).substring(location.pathname.lastIndexOf('/') + 1) || 'index.html';
                 $.getJSON( "/json/"+thisPage+"/data.json", function( json ) {
                       
                            console.log('New Set Data',json);
                            $scope.data = json['template-data'];
                            console.log('dbFactory',$scope.data);
                             if($scope.data)
                                    dbFactory.formatByType($scope.type,$scope.data[$scope.field],$element);                   

                        },function(){
                            dbFactory.data = {};
                            console.log('New Set No Data');
                        });


                  //  $scope.data = dbFactory.data[$scope.dataid];
  //              });

                // $scope.data = dbFactory.data[$scope.table][$scope.dataId];
                
                // atomInfo.atom[id]['isData'] = true;
                // atomInfo.atom[id]['data'] = $scope.data;
                // atomInfo.atom[id]['dataKey'] = $scope.key;
                // atomInfo.atom[id]['dataTable'] = $scope.table;
                // atomInfo.atom[id]['dataId'] = $scope.dataId;
                // atomInfo.atom[id]['field'] = $scope.field;
                // atomInfo.atom[id]['dataType'] = $scope.type;
                
                // $scope.model = atomInfo.atom[id];
                
                // $scope.model['data'] = $scope.data;
                // $scope.model['dataTable'] = $scope.datasetTable;
                // $scope.model['datasetIndex'] = $scope.datasetIndex;
                // $scope.model['dataKey'] = $scope.datasetKey;
                // $scope.model['dataId'] = $scope.data[$scope.datasetKey];
                // $scope.model['datasetId'] = $scope.datasetId;
                
//                $scope.model['dataId'] = $scope.data[]
                // atomInfo.atom[$scope.id] = $scope.model;
                

        
                
                
        },
        controller: function ($scope, $element, $attrs) {
            
            $scope.formatByType = function(type,value) {

               switch(type){

                case 'youtube':
                    var embed = `
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/JFuxtn6A3QA" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        `;
                    $element.html(embed);
                    break;

                case 'timestamp':
                    var time =   parseInt(value)|| 1262304000;
                    if (time < 1000000000000)
                        var a = new Date(time*1000);
                    else
                        var a = new Date(time);
                    str = a.toISOString();
                    var timeStr =moment(str,"YYYY-MM-DD").format("YYYY-MM-DD");
                    $element.text(timeStr);
                    break;

                case 'album-thumbnail':

                    $element.attr('src',"//"+value[0]['bucket']+".s3.amazonaws.com/"+value[0]['path']);

                    break;

                case 'file':
                case 'image':

                    $element.attr('src',value);
                    console.log('Image',value);

                    break;

                case 'html':
                    $element.html(value);
                    break;

                case 'gallery':
                    var text='';
                    angular.forEach(value,function(item,index){
                        text +='<img src="'+item+'">';
                    });

                    $element.html(text);
                    break;

                case 'date':
                    var time,text;
                    if ($scope.item< 9999999999)
                        time = value*1000;
                    else
                        time= value;
                    var text = new Date(time).toLocaleDateString();
                    $element.text(text);
                    break;

                case 'dlink':
                    $element.attr('href',value);
                    break;

                case 'link':
                    $element.attr('href',value+".html");
                    break;

                case 'currency':

                    $element.text("$"+value);
                    break;
                    
                case 'text':
                default:
                    $element.text(value);
                    break;

            }
            
        
             }
        }
    }
    return dzField;
});
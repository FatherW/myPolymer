var app = angular.module('demoApp');
app.directive('innoCompany', function ($compile, $templateRequest, $http, $mdDialog,$dazzleUser,$dazzlePopup,
    dzFn,atomInfo,userInfo,dbFactory,pageInfo) {
    var dzLink = {
      restrict: 'E',
        priority: 1000,
        scope: true,
        templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/innoCompany/element.html?id=" + new Date().getTime(),
        css: {
          href: "https://d27btag9kamoke.cloudfront.net/builder6.0/innoCompany/element.css?id=" + new Date().getTime(),
          /* Preload: this will trigger an HTTP request on app load.
           * Once the stylesheet is added, it will be loaded from the browser cache */
          preload: true
        },
                
        link: function ($scope, $element, attrs) {
            
                var id = $element.attr('id') || new Date().getTime();
                $scope.id= id;
                $element.attr('id',id);
                atomInfo.initAtom(id);
                
                
                var default_data = {
                    'name':'請輸入公司名稱',
                    'tags':['標籤一','標籤二','標籤三'],
                    'photos':'http://designerrrr-output.s3.amazonaws.com/images/www.innoaibator.com/large-web/id1552430490563.jpg',
                    'description':'請填上公司介紹',
                    'team':`
                    <div layout="row" layout-wrap="" class="layout-wrap ng-scope layout-row">
                      <div flex="50" class="flex-50">
            				<img dz-image="" src="//designerrrr-output.s3.amazonaws.com/images/www.innoaibator.com/large-web/id1552430490563.jpg" context-meu="imgMenuOptions" id="1552430439499" class="ng-scope">
                      </div>
                      <div flex="50" class="flex-50">
                            <h4>創辦人</h4>
                            <h5>職位</h5>
                            <p>P在這到那民們人市開立民意化不布灣於包創他引……車曾衣面！
            義也國。自春中司房客上增。上難難為及直水成天即得已的走做山其事結技都？朋媽然經。像明麼的還類人書，候成兩處，到外最人雄，羅利爭念聲期人舉制好言據。縣望爭回軍育度的友門包</p>
                      </div>
                      
                    </div>`,
                    'project':'請介紹你的項目',
                    'timeline':[]
                }
         
                var path = pageInfo.thisPage;
                path = path.replace(".html","");
                console.log('Path',path);
                 
                dbFactory.loadDataByID("company",path).then(function(data){
                    console.log('Data',data);
                    // if ($.isEmptyObject(data)){
                    //     $scope.company = default_data;
                    //     atomInfo.atom[$scope.id]['data'] = $scope.company;
                    //     atomInfo.atom[$scope.id]['dataId'] = $scope.company['name'];                                            
                    // } else {
                        $scope.company = data;
                       // atomInfo.atom[$scope.id]['data'] = $scope.company;
                    //    atomInfo.atom[$scope.id]['dataId'] = $scope.company['name'];
                    // }
                    $scope.$apply();
            
                },function(){
                    $scope.company = atomInfo.atom[$scope.id]['data'] || default_data;
                    atomInfo.atom[$scope.id]['data'] = $scope.company;
                    atomInfo.atom[$scope.id]['dataId'] = $scope.company['name'];                                            
                
                });
       
                console.log('User Info',store.get('editMode'));
                
                var editMode = store.get('editMode');
                var subUser = store.get('subUser') || null;
                $scope.isSuper = false;
                if (editMode=='admin'){
                    console.log('Edit Admin Mode');
                    $scope.isSuper = true;
                    $element.find('#dzContextMenu').attr('context-menu','menuOptions');
                    $compile($element.find("#dzContextMenu"))($scope);
                } else if (subUser !=null) {
                    
                    $element.find('#dzContextMenu').attr('context-menu','subMenuOptions');
                    $compile($element.find("#dzContextMenu"))($scope);
                }
                
                //  async function getData(){
                $scope.getData= function(){
                     return new Promise(function (resolve, reject) {
                        var path = location.pathname;
                        var data;
                        path = path.replace(".html","");
                        console.log('Path',path);
                         dbFactory.loadDataByID("company",path).then(function(data){
                            resolve(data); 
                         });
                     });
                }
                
                // if (editMode=="normal"){
                //     $element.find('[context-menu]').attr('context-menu','');
                // }

        },
        controller: function ($scope, $element, $attrs) {

           
            
            $scope.$watch('company.name', function(newValue, oldValue) {
              console.log('Change',newValue,oldValue);
                
            },true);
            $scope.isUser = function(){
                var user = store.get('subUser') || null;
                if (user !=null)
                    return true;
                else
                    return false;
            }  
        

            //$dazzleInit.featherEditorInit($scope);

          $scope.save = function(){
                atomInfo.atom[$scope.id]['data'] = $scope.company;
                atomInfo.atom[$scope.id]['dataId'] = $scope.company['name'];       
                var atom = atomInfo.atom;
                console.log('Save Atom',atom);                
                dzFn.atomExport();
                dbFactory.saveDataByID('company',atomInfo.atom[$scope.id]['dataId'] ,$scope.company).then(function(){
                    alert('更新成功');
                },function(){
                   alert('更新失敗'); 
                });
            }

            $scope.model = {};
            $scope.model['tags'] =["標籤一","標籤二","標籤三"];
            $scope.subMenuOptions = [
                ["儲存公司", function () {
                    $scope.save();
                    dzFn.addNewPage($scope.company['name']+'.html',$scope.company['name'],"company-template.html",$scope.company);

                }]
            ];


            $scope.menuOptions = [
                // ["儲存公司", function () {
                //     $scope.save();
                    
                // }],
                
                ["儲存公司", function () {
//                    dzFn.atomExport($scope.company['name']+'.html');
                    dbFactory.saveDataByID('company',$scope.company['name'] ,$scope.company).then(function(){
                        alert('更新成功');
                    },function(){
                       alert('更新失敗'); 
                    });
//                    pageInfo.addNewPage($scope.company['name']);
                }]
            ];
            
            $scope.myDate = function(timestamp){
                return new Date().getTime();
            }
           // atomInfo.atom[$scope.id]['contextMenu'] = $scope.menuOptions;
            

        }
    };
    return dzLink;
});
var app = angular.module("app", []);
app.controller("AppController", function ($scope, $http) {
 
});
app.directive("pagecontroller", function() {
    return {
        template : `
      <div ng-repeat="item in imageData|orderBy:'id'|filter:{'page':'0'}" ng-if="page==1">
<li class="views-row views-row-{{$index+1}} views-row-odd views-row-first">  
  <div class="views-field-title">
                <span class="field-content"><a href="AAA.html?title={{item.title}}">{{item.title}}</a></span>
  </div>
  
  <div class="views-field-created">
          <label class="views-label-created">
        發表日期:
      </label>
                <span class="field-content">{{subDate(item.date)}}</span>
  </div>
</li>
         
</div>
<div ng-repeat="item in imageData|orderBy:'-nid'|filter:{'page':'1'}" ng-if="page==2">
<li class="views-row views-row-{{$index+1}} views-row-odd views-row-first">  
  <div class="views-field-title">
                <span class="field-content"><a href="AAA.html?title={{item.title}}">{{item.title}}</a></span>
  </div>
  
  <div class="views-field-created">
          <label class="views-label-created">
        發表日期:
      </label>
                <span class="field-content">{{subDate(item.date)}}</span>
  </div>
</li>
         
</div>       

<div ng-repeat="item in imageData|orderBy:'-nid'|filter:{'page':'2'}" ng-if="page==3">
<li class="views-row views-row-{{$index+1}} views-row-odd views-row-first">  
  <div class="views-field-title">
                <span class="field-content"><a href="AAA.html?title={{item.title}}">{{item.title}}</a></span>
  </div>
  
  <div class="views-field-created">
          <label class="views-label-created">
        發表日期:
      </label>
                <span class="field-content">{{subDate(item.date)}}</span>
  </div>
</li>
         
</div>       


        
        
<div>
<ul class="pager"><li class="pager-previous first">
<button ng-click="subPage()" ng-if="page>1"> ‹‹ </button>
<li class="pager-current">{{page}} of 3</li>
<button ng-click="addPage()" ng-if="page<3"> ›› </button>
</ul>
</div>

</ul>




`,
    controller:function ($scope, $http, $element) {
      $http({
            "method":"get",
            "url":"http://hkswgu.dazzle.website/content/news-data.json"}).then(function(result){
                console.log("date format");
                console.log(result);
                $scope.imageData=result.data;
                console.log($scope.imageData.length);
               
                $scope.page = 1;
                $scope.addPage = function(){
                    $scope.page = $scope.page +1;
                }
                $scope.subPage = function(){
                    $scope.page = $scope.page -1;
                }
                $scope.subDate = function(date){
                    console.log("vvvv date");
                    console.log(date);
                    return date;
                }
            });
    
    }
}
    });

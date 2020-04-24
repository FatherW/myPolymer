var app = angular.module('demoApp');
var map,marker;
//require(['store'],function(store){
jQuery.noConflict();
(function( $ ) {
  $(function() {
      
      
app.directive("slideShow", function($compile) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            slides: '='
        },
        template: `
      <div class="slideshow">
        <ul class="slideshow-slides">
        <li ng-repeat="slide in slides" ng-class="{ active: $index == activeIndex }">
          <figure>
            <img ng-src="{{ slide}}" />
          </figure>
        </li>
        </ul>
        <ul class="slideshow-dots">
          <li ng-repeat="slide in slides" ng-class="{ active: $index == activeIndex }">
            <a ng-click="jumpToSlide($index)">{{ $index + 1 }}</a>
          </li>
        </ul>
      </div>
    `,
        link: function($scope, element, attrs) {
            var timer = null;
            $scope.activeIndex = 0;

            $scope.jumpToSlide = function(index) {
                $scope.activeIndex = index;
                console.log($scope.activeIndex);
                // restartTimer();
            };

            setInterval(function(){
                var index;
                index = $scope.activeIndex +1;
                index = index % $scope.slides.length;
                $scope.$apply(function(){
                    $scope.activeIndex = index;
                });
            }, 3000);

        }
    };

});


app.directive('paging', function () {


    /**
     * The regex expression to use for any replace methods
     * Feel free to tweak / fork values for your application
     */
    var regex = /\{page\}/g;


    /**
     * The angular return value required for the directive
     * Feel free to tweak / fork values for your application
     */
    return {

        // Restrict to elements and attributes
        restrict: 'EA',

        // Assign the angular link function
        link: fieldLink,

        // Assign the angular directive template HTML
        template: fieldTemplate,

        // Assign the angular scope attribute formatting
        scope: {
            page: '=',
            pageSize: '=',
            total: '=',
            disabled: '@',
            dots: '@',
            ulClass: '@',
            activeClass: '@',
            disabledClass: '@',
            adjacent: '@',
            pagingAction: '&',
            pgHref: '@',
            textFirst: '@',
            textLast: '@',
            textNext: '@',
            textPrev: '@',
            textFirstClass: '@',
            textLastClass: '@',
            textNextClass: '@',
            textPrevClass: '@',
            textTitlePage: '@',
            textTitleFirst: '@',
            textTitleLast: '@',
            textTitleNext: '@',
            textTitlePrev: '@'
        }

    };


    /**
     * Link the directive to enable our scope watch values
     *
     * @param {object} scope - Angular link scope
     * @param {object} el - Angular link element
     * @param {object} attrs - Angular link attribute
     */
    function fieldLink(scope, el, attrs) {

        // Hook in our watched items
        scope.$watchCollection('[page,pageSize,total,disabled]', function () {
            build(scope, attrs);
        });
    }


    /**
     * Create our template html
     * We use a function to figure out how to handle href correctly
     *
     * @param {object} el - Angular link element
     * @param {object} attrs - Angular link attribute
     */
    function fieldTemplate(el, attrs){
        return '<ul data-ng-hide="Hide" data-ng-class="ulClass"> ' +
            '<li ' +
            'title="{{Item.title}}" ' +
            'data-ng-class="Item.liClass" ' +
            'data-ng-repeat="Item in List"> ' +
            '<a ' +
            (attrs.pgHref ? 'data-ng-href="{{Item.pgHref}}" ' : 'href ') +
            'data-ng-class="Item.aClass" ' +
            'data-ng-click="Item.action()" ' +
            'data-ng-bind="Item.value">'+
            '</a> ' +
            '</li>' +
            '</ul>'
    }


    /**
     * Assign default scope values from settings
     * Feel free to tweak / fork these for your application
     *
     * @param {Object} scope - The local directive scope object
     * @param {Object} attrs - The local directive attribute object
     */
    function setScopeValues(scope, attrs) {

        scope.List = [];
        scope.Hide = false;

        scope.page = parseInt(scope.page) || 1;
        scope.total = parseInt(scope.total) || 0;
        scope.adjacent = parseInt(scope.adjacent) || 2;

        scope.pgHref = scope.pgHref || '';
        scope.dots = scope.dots || '...';

        scope.ulClass = scope.ulClass || 'pagination';
        scope.activeClass = scope.activeClass || 'active';
        scope.disabledClass = scope.disabledClass || 'disabled';

        scope.textFirst = scope.textFirst || '<<';
        scope.textLast = scope.textLast || '>>';
        scope.textNext = scope.textNext || '>';
        scope.textPrev = scope.textPrev || '<';

        scope.textFirstClass = scope.textFirstClass || '';
        scope.textLastClass= scope.textLastClass || '';
        scope.textNextClass = scope.textNextClass || '';
        scope.textPrevClass = scope.textPrevClass || '';

        scope.textTitlePage = scope.textTitlePage || 'Page {page}';
        scope.textTitleFirst = scope.textTitleFirst || 'First Page';
        scope.textTitleLast = scope.textTitleLast || 'Last Page';
        scope.textTitleNext = scope.textTitleNext || 'Next Page';
        scope.textTitlePrev = scope.textTitlePrev || 'Previous Page';

        scope.hideIfEmpty = evalBoolAttribute(scope, attrs.hideIfEmpty);
        scope.showPrevNext = evalBoolAttribute(scope, attrs.showPrevNext);
        scope.showFirstLast = evalBoolAttribute(scope, attrs.showFirstLast);
        scope.scrollTop = evalBoolAttribute(scope, attrs.scrollTop);
        scope.isDisabled = evalBoolAttribute(scope, attrs.disabled);
    }


    /**
     * A helper to perform our boolean eval on attributes
     * This allows flexibility in the attribute for strings and variables in scope
     *
     * @param {Object} scope - The local directive scope object
     * @param {Object} value - The attribute value of interest
     */
    function evalBoolAttribute(scope, value){
        return angular.isDefined(value)
            ? !!scope.$parent.$eval(value)
            : false;
    }


    /**
     * Validate and clean up any scope values
     * This happens after we have set the scope values
     *
     * @param {Object} scope - The local directive scope object
     * @param {int} pageCount - The last page number or total page count
     */
    function validateScopeValues(scope, pageCount) {

        // Block where the page is larger than the pageCount
        if (scope.page > pageCount) {
            scope.page = pageCount;
        }

        // Block where the page is less than 0
        if (scope.page <= 0) {
            scope.page = 1;
        }

        // Block where adjacent value is 0 or below
        if (scope.adjacent <= 0) {
            scope.adjacent = 2;
        }

        // Hide from page if we have 1 or less pages
        // if directed to hide empty
        if (pageCount <= 1) {
            scope.Hide = scope.hideIfEmpty;
        }
    }


    /**
     * Assign the method action to take when a page is clicked
     *
     * @param {Object} scope - The local directive scope object
     * @param {int} page - The current page of interest
     */
    function internalAction(scope, page) {

        // Block clicks we try to load the active page
        if (scope.page == page) {
            return;
        }

        // Block if we are forcing disabled
        if(scope.isDisabled)
        {
            return;
        }

        // Update the page in scope
        scope.page = page;

        // Pass our parameters to the paging action
        scope.pagingAction({
            page: scope.page,
            pageSize: scope.pageSize,
            total: scope.total
        });

        // If allowed scroll up to the top of the page
        if (scope.scrollTop) {
            scrollTo(0, 0);
        }
    }


    /**
     * Add the first, previous, next, and last buttons if desired
     * The logic is defined by the mode of interest
     * This method will simply return if the scope.showPrevNext is false
     * This method will simply return if there are no pages to display
     *
     * @param {Object} scope - The local directive scope object
     * @param {int} pageCount - The last page number or total page count
     * @param {string} mode - The mode of interest either prev or last
     */
    function addPrevNext(scope, pageCount, mode) {

        // Ignore if we are not showing
        // or there are no pages to display
        if ((!scope.showPrevNext && !scope.showFirstLast) || pageCount < 1) {
            return;
        }

        // Local variables to help determine logic
        var disabled, alpha, beta;

        // Determine logic based on the mode of interest
        // Calculate the previous / next page and if the click actions are allowed
        if (mode === 'prev') {

            disabled = scope.page - 1 <= 0;
            var prevPage = scope.page - 1 <= 0 ? 1 : scope.page - 1;

            if(scope.showFirstLast){
                alpha = {
                    value: scope.textFirst,
                    title: scope.textTitleFirst,
                    aClass: scope.textFirstClass,
                    page: 1
                };
            }

            if(scope.showPrevNext){
                beta = {
                    value: scope.textPrev,
                    title: scope.textTitlePrev,
                    aClass: scope.textPrevClass,
                    page: prevPage
                };
            }

        } else {

            disabled = scope.page + 1 > pageCount;
            var nextPage = scope.page + 1 >= pageCount ? pageCount : scope.page + 1;

            if(scope.showPrevNext){
                alpha = {
                    value: scope.textNext,
                    title: scope.textTitleNext,
                    aClass: scope.textNextClass,
                    page: nextPage
                };
            }

            if(scope.showFirstLast){
                beta = {
                    value: scope.textLast,
                    title: scope.textTitleLast,
                    aClass: scope.textLastClass,
                    page: pageCount
                };
            }

        }

        // Create the Add Item Function
        var buildItem = function (item, disabled) {
            return {
                title: item.title,
                aClass: item.aClass,
                value: item.aClass ? '' : item.value,
                liClass: disabled ? scope.disabledClass : '',
                pgHref: disabled ? '' : scope.pgHref.replace(regex, item.page),
                action: function () {
                    if (!disabled) {
                        internalAction(scope, item.page);
                    }
                }
            };
        };

        // Force disabled if specified
        if(scope.isDisabled){
            disabled = true;
        }

        // Add alpha items
        if(alpha){
            var alphaItem = buildItem(alpha, disabled);
            scope.List.push(alphaItem);
        }

        // Add beta items
        if(beta){
            var betaItem = buildItem(beta, disabled);
            scope.List.push(betaItem);
        }
    }


    /**
     * Adds a range of numbers to our list
     * The range is dependent on the start and finish parameters
     *
     * @param {int} start - The start of the range to add to the paging list
     * @param {int} finish - The end of the range to add to the paging list
     * @param {Object} scope - The local directive scope object
     */
    function addRange(start, finish, scope) {

        // Add our items where i is the page number
        var i = 0;
        for (i = start; i <= finish; i++) {

            var pgHref = scope.pgHref.replace(regex, i);
            var liClass = scope.page == i ? scope.activeClass : '';

            // Handle items that are affected by disabled
            if(scope.isDisabled){
                pgHref = '';
                liClass = scope.disabledClass;
            }


            scope.List.push({
                value: i,
                title: scope.textTitlePage.replace(regex, i),
                liClass: liClass,
                pgHref: pgHref,
                action: function () {
                    internalAction(scope, this.value);
                }
            });
        }
    }


    /**
     * Add Dots ie: 1 2 [...] 10 11 12 [...] 56 57
     * This is my favorite function not going to lie
     *
     * @param {Object} scope - The local directive scope object
     */
    function addDots(scope) {
        scope.List.push({
            value: scope.dots,
            liClass: scope.disabledClass
        });
    }


    /**
     * Add the first or beginning items in our paging list
     * We leverage the 'next' parameter to determine if the dots are required
     *
     * @param {Object} scope - The local directive scope object
     * @param {int} next - the next page number in the paging sequence
     */
    function addFirst(scope, next) {

        addRange(1, 2, scope);

        // We ignore dots if the next value is 3
        // ie: 1 2 [...] 3 4 5 becomes just 1 2 3 4 5
        if (next != 3) {
            addDots(scope);
        }
    }


    /**
     * Add the last or end items in our paging list
     * We leverage the 'prev' parameter to determine if the dots are required
     *
     * @param {int} pageCount - The last page number or total page count
     * @param {Object} scope - The local directive scope object
     * @param {int} prev - the previous page number in the paging sequence
     */
    // Add Last Pages
    function addLast(pageCount, scope, prev) {

        // We ignore dots if the previous value is one less that our start range
        // ie: 1 2 3 4 [...] 5 6  becomes just 1 2 3 4 5 6
        if (prev != pageCount - 2) {
            addDots(scope);
        }

        addRange(pageCount - 1, pageCount, scope);
    }



    /**
     * The main build function used to determine the paging logic
     * Feel free to tweak / fork values for your application
     *
     * @param {Object} scope - The local directive scope object
     * @param {Object} attrs - The local directive attribute object
     */
    function build(scope, attrs) {

        // Block divide by 0 and empty page size
        if (!scope.pageSize || scope.pageSize <= 0) {
            scope.pageSize = 1;
        }

        // Determine the last page or total page count
        var pageCount = Math.ceil(scope.total / scope.pageSize);

        // Set the default scope values where needed
        setScopeValues(scope, attrs);

        // Validate the scope values to protect against strange states
        validateScopeValues(scope, pageCount);

        // Create the beginning and end page values
        var start, finish;

        // Calculate the full adjacency value
        var fullAdjacentSize = (scope.adjacent * 2) + 2;


        // Add the Next and Previous buttons to our list
        addPrevNext(scope, pageCount, 'prev');

        // If the page count is less than the full adjacnet size
        // Then we simply display all the pages, Otherwise we calculate the proper paging display
        if (pageCount <= (fullAdjacentSize + 2)) {

            start = 1;
            addRange(start, pageCount, scope);

        } else {

            // Determine if we are showing the beginning of the paging list
            // We know it is the beginning if the page - adjacent is <= 2
            if (scope.page - scope.adjacent <= 2) {

                start = 1;
                finish = 1 + fullAdjacentSize;

                addRange(start, finish, scope);
                addLast(pageCount, scope, finish);
            }

            // Determine if we are showing the middle of the paging list
            // We know we are either in the middle or at the end since the beginning is ruled out above
            // So we simply check if we are not at the end
            // Again 2 is hard coded as we always display two pages after the dots
            else if (scope.page < pageCount - (scope.adjacent + 2)) {

                start = scope.page - scope.adjacent;
                finish = scope.page + scope.adjacent;

                addFirst(scope, start);
                addRange(start, finish, scope);
                addLast(pageCount, scope, finish);
            }

            // If nothing else we conclude we are at the end of the paging list
            // We know this since we have already ruled out the beginning and middle above
            else {

                start = pageCount - fullAdjacentSize;
                finish = pageCount;

                addFirst(scope, start);
                addRange(start, finish, scope);
            }
        }

        // Add the next and last buttons to our paging list
        addPrevNext(scope, pageCount, 'next');
    }

});



      
        app.directive('metalMyCompany', function ($compile, $timeout, $uibModal, $mdDialog, $mdToast, $dazzleS3,$dazzleData, $dazzleUser, $dazzlePopup,$dazzleInit) {
                    // Function save$scope.thisPageJson, save$scope.masterJson, saveRootHtml, saveMasterAtom, save$scope.thisPage
                            // $scope.thisPage => $scope.pagename
                            // $scope.websiteKey => 'website/'+$scope.hostname;
        
            var metalMyCompany = {
                restrict: 'E',
                priority: 1000,
                scope: true,
                templateUrl: "https://d27btag9kamoke.cloudfront.net/builder6.0/metalMyCompany/element.html?id=" + new Date().getTime(),
                controller: function ($scope, $http, $element) {
                         $scope.currentPage =0;
                        $scope.pageSize = 20;
                        $scope.total = 200;
                        $scope.isLogin = false;
                        //$scope.isAdmin = false;
                        $scope.shelf = "1";
            
                        $scope.noOnShelf = 0;
                        $scope.noOffShelf = 0;
            			$scope.filterCat = '';
            
                        $scope.isAdmin = function(){
                            var user = store.get('user');
                            console.log('User',user);
                            if (!angular.isUndefined(user) ) {
                                return true;
                            }
                            else {
                                return false;
                            }
            
                        }
                        $scope.cp_search = function() {

                             if ($scope.keyword) {
                            

                                $http({
                                    "method": "post",
                                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                                    "data": {
                                        "action": "searchData",
                                        "index": "5metal.dazzle.website",
                                        "type": "product",
                                        "body": {
                                            "query": {
                                                "bool":{
                                                    "must":[
                                                        {
                                                            "match": {
                                                                "company_id": $scope.company['nid']
                                                            }
                                                        },
                                                        {
                                                          "bool": {
                                                               "should": [
                                                                  {"match_phrase": {"title": $scope.keyword}},
                                                                  {"match_phrase": {"body": $scope.keyword}}
                                                                ]
                                                          }
                                                        }
                                                    ]
                                                }

                                            }
                                        }
                                    }
                                }).then(function (result) {
                                    console.log(result);
                                    if (result.data.code < 0) {

                                    } else {
                                        $scope.company['myProducts'] = result.data.resolve;
                                        $compile($('.cp-product-list'))($scope);
                                    }

                                });


                            } else
                                return;

                        }
                        $scope.findLocationByAddress = function(address){
            
                            var url;
                            url = "https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=AIzaSyAfeyIhvQi2PT6DOfO-zEf_FficjX_gevY";
            
                            $http({
                                method: 'GET',
                                url: url
                            }).then(function successCallback(response) {
                                // console.log('Success Find Location',response);
                                $scope.company['longitude'] = response.data.results[0].geometry.location.lng;
                                $scope.company['latitude'] = response.data.results[0].geometry.location.lat;
                                // console.log('Position',$scope.company['longitude'],$scope.company['latitude']);
                                moveMarker($scope.company['latitude'],$scope.company['longitude']);
            
            
            
                            }, function errorCallback(response) {
                                // console.log('UnSuccess');
                                $scope.company['longitude'] = -1;
                                $scope.company['latitude'] = -1;
            
                            });
            
                        }
                        $scope.loadGoogleMap = function(){
                        //   console.log('Load Google Map',$scope.company['longitude'],$scope.company['latitude']);
                            var lat = 22.3103686;
                            var long = 114.22270349999997;
            
                            moveMarker(lat,long);
            
            
                        }
            			$scope.catFilter = function(cat) {
            				var arr = [];
            				angular.forEach($scope.company['myProducts'],function(item,index){
            					if (item['category'].indexOf(cat)>-1)
            						arr.push(item);
            				});
            				$scope.filteredProduct = arr;
            			}
            			 function filterFn(con){
            			 	if(!$scope.filterCat)
            			 		return true;
            			 		
            			    return con.indexOf($scope.filterCat) > -1;
            			  }
                        $scope.update = function(item){
                            $http({
                                "method": "post",
                                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                                "data": {
                                    "action": "updateData",
                                    "index": "5metal.dazzle.website",
                                    "type": "product",
                                    "id": item['nid'],
                                    "body": {
                                        "doc":item
                                    }
                                }
                            }).then(function (result) {
                             //   console.log(result);
                            });
                        }
            
                        $scope.save = function() {
                            var length = $scope.company['myProducts'].length;
                            var i =0;
                            return new Promise(function (resolve, reject) {
                                angular.forEach($scope.company['myProducts'], function (item, index) {
                                    $http({
                                        "method": "post",
                                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                                        "data": {
                                            "action": "updateData",
                                            "index": "5metal.dazzle.website",
                                            "type": "product",
                                            "id": item['nid'],
                                            "doc": item
                                        }
                                    }).then(function (result) {
                                       // console.log(result);
                                        i++;
                                        // if (i > length )
                                        //     resolve();
                                    });
            
                                });
                            });
            
                        }
                        $scope.delete = function(item){
                            var id = item['nid'];
                            $http({
                                "method": "post",
                                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                                "data": {
                                    "action": "deleteData",
                                    "index": "5metal.dazzle.website",
                                    "type": "product",
                                    "id": id
                                }
                            }).then(function (result) {
                                  // console.log('Delete',result);
                                    location.reload();
                            });
                        }
            
            
            
            
                        $scope.slides = [{
                            imageUrl: "https://i.ytimg.com/vi/MxwjEacvrtY/hqdefault.jpg",
                            caption: "Allan Allan Al Al Allan"
                        }, {
                            imageUrl: "https://pbs.twimg.com/profile_images/2576554888/s8vftzr3j0a9r703xdfn.jpeg",
                            caption: "Steve Steve Steve"
                        }];
            
                        $scope.loadCss = function(href) {
            
                            var cssLink = $("<link>");
                            $("head").append(cssLink); //IE hack: append before setting href
            
                            cssLink.attr({
                                rel:  "stylesheet",
                                type: "text/css",
                                href: href
                            });
            
                        };
            
                        $scope.checkLogin = function(uid,pass){
                            $scope.isLogin = true;
                            //$scope.isAdmin = false;
                        }
                        $scope.tab = function(page){
                            var i, tabcontent, tablinks;
                            $('.tabcontent').hide();
                            $('#'+page).show();
                        }
                        $scope.category = '';
                        $scope.categorys = {};
                        $scope.updateCategory = function(cat){
                            $scope.category = cat;
                            // console.log($scope.category);
                        }
                        $scope.getAllCategory = function(){
                            //$scope.categorys = $scope.company['company_type'];
            				$scope.categorys = [];
                           // console.log('Products',$scope.company['company_type']);
                              
                               angular.forEach($scope.company['myProducts'],function(item,index){
                               	// console.log(item['category']);
                              	angular.forEach(item['category'],function(item2,index2){
               					// 	console.log('Category',item2);
                                   if ($scope.categorys.indexOf(item2)<0)
                                       $scope.categorys.push(item2);                 		
                              	});
                                 
                               });
            
            
                            // console.log('Categorys',$scope.categorys);
                        }
            
            
            			$scope.increaseView = function(id,view){
            				 $http({
                                    "method": "post",
                                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                                    "data": {
                                        "action": "updateData",
                                        "index": "5metal.dazzle.website",
                                        "type": "company",
                                        "id": id,
                                        "body" :{
                                        	"doc":{
                                        		"company_views":view
                                        	}
                                        }
                                    }
                                }).then(function(result){
                                	//console.log(result);
                                });
            			}
            
                        $scope.init = function(id) {
                            console.log(id);
            			 //   console.log('ID',$scope.company_id);
            			 //   console.log('ID2',$scope.model);
                            return new Promise(function (resolve, reject) {
                                var isCompanyLoad = false,isProductLoad = false;
            
                                console.log('company Init');
                                $http({
                                    "method": "post",
                                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                                    "data": {
                                        "action": "getData",
                                        "index": "5metal.dazzle.website",
                                        "type": "company",
                                        "id": id
                                    }
                                }).then(function (result) {
                                    //console.log(result);
                                    console.log('ID',id,result);
            
                                    if (result.data.code < 0) {
                                        console.log('Unsuccess');
                                    } else {
                                        $scope.company = result.data.resolve;
                        				$scope.increaseView($scope.company['nid'],$scope.company['company_views']+1);
            
                        				$scope.findLocationByAddress($scope.company['company_address']);
            
                        				console.log('Company',$scope.company);
                                        
                                        $scope.loadCss("https://www.5metal.com.hk/sites/all/themes/metal/company/"+$scope.company['template']+"/style.css");
                                        console.log('Success', $scope.company);
                                        $dazzleUser.dazzleInfo['editType']="company";
                                        $dazzleUser.dazzleInfo['item']=$scope.company;
                                    }
                                    isCompanyLoad = true;
                                    if (isCompanyLoad && isProductLoad) {
            //                            $compile($element.contents())($scope);
                                        console.log('Finish');
                                        //$scope.reload();
                                        resolve();
                                    }
            
                                });
            
                                $http({
                                    "method": "post",
                                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                                    "data": {
                                        "action": "searchData",
                                        "index": "5metal.dazzle.website",
                                        "type": "product",
                                        "body": {
                                            "query": {
                                                "bool":{
                                                    "must":[
                                                        {
                                                            "match": {
                                                                "company_id": id
                                                            }
                                                        }
                                                        // {
                                                        //     "match": {
                                                        //         "status": "1"
                                                        //     }
                                                        // }
            
                                                    ]
                                                }
            
                                            }
                                        }
                                    }
                                }).then(function (result) {
                                    console.log(result);
                                    if (result.data.code < 0) {
                                        $scope.company['noProduct'] = 0;
                                        $scope.company['myProducts'] = [];
                                        $scope.noOnShelf = 0;
                                        $scope.noOffShelf = 0;
                                    } else {
                                        $scope.company['noProduct'] = result.data.resolve.length;
                                        $scope.company['myProducts'] = result.data.resolve;
                                        $scope.filteredProduct = $scope.company['myProducts'];
                                        $scope.myProducts = result.data.resolve;
                                        angular.forEach($scope.company['myProducts'],function(item,index){
                                            if (item['status']=="1")
                                                $scope.noOnShelf++;
                                            else
                                                $scope.noOffShelf++;
                                        });
                                        $scope.getAllCategory();
            
                                    }
            
                                    isProductLoad = true;
                                    if (isCompanyLoad && isProductLoad) {
                             //           $compile($element.contents())($scope);
                                        resolve();
                                    }
                                });
                                $('#Index').show();
            
            
                            });
                        }
            
            
                        $scope.companyAge = function(id) {
                            var age,now,a;
            
            //               now = new Date().getTime();
                            now = Math.floor(Date.now() / 1000);
            
                            //  var d = new Date(now), a = new Date($scope.model['created']);
            
                           // console.log('Now',now);
            
            //                console.log('Register year',a.getFullYear());
                            //console.log($scope.company['created']);
                            age =parseInt(now)-parseInt($scope.company['created']);
                            //console.log('Age',age);
                            var day = Math.floor(age / 3600 / 24 );
                            //              age = now - parseInt($scope.model['created'])*3600*24;
                            // age = age /3600 / 24;
            
            
                            return day + "天";
                        }
            
            
                        $scope.loadImage = function(images) {
                            var url;
                            if (Array.isArray(images))
                                url =  images[0];
                            else
                                url = images;
                               url = url.replace("Product#",""); 
         //                   url = url.replace("#","%23");
            //                console.log(url,encodeURI(url));
            // 			    return encodeURI(url);
            			    return url;
            			}
            
            
            
                        $scope.putOnShelf = function(item){
                            $scope.noOnShelf++;
                            $scope.noOffShelf--;
                            item['status'] = "1";
                            $scope.update(item);
                        }
                        $scope.putOffShelf = function(item){
                            $scope.noOnShelf--;
                            $scope.noOffShelf++;
                            console.log($scope.noOnShelf,$scope.noOffShelf);
                            item['status'] ="0";
                            $scope.update(item);
                        }

                    
                }
            };
            return metalMyCompany;
        }); 
 
 
 
 
  });
})(jQuery);
 



//});
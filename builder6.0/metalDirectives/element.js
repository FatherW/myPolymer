var app = angular.module('demoApp');
app.filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

var no_per_page = 60;
var all_tid_arr = [];
var all_did_arr = [];
var all_sid_arr = [];
var did_ele = 0;
var sid_ele = 0;
var tid_ele = 0;
var order = "";
var order_parm = "";
var order_type = "";
var product_sorting = {};
var tid_query = {};
var did_query = {};
var sid_query = {};
var company_query = [];
var text = "";
var search_keyword = "";
var randomdata = [];
var randomArray = [];
var page = 0;
var start = page * no_per_page;
var end = no_per_page;

var company_name_arr = [];
var company_name = "";


$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
        return null;
    }
    else{
        return decodeURI(results[1]) || 0;
    }
}

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



app.directive('myProduct', function ($compile,$http) {
    var dazzleData = {
        restrict: 'E',
        scope:true,
        scope: {
            name : '='
        },

        link: function(scope,element,attrs) {
            console.log('Link',scope.name);




        },
        controller: function ($scope, $element, $attrs) {


            $scope.init = function() {
                console.log($scope.name);

                var query = {
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data":{
                        "action": "searchData",
                        "index": "5metal.dazzle.website",
                        "type": "product",
                        "body": {
                            "query":{
                                "match":{
                                    "product_company":$scope.name
                                }
                            }
                        },
                        "from":0,
                        "size":20


                    }
                };
                console.log(query);
                $http(query).then(function (result) {

                    console.log('Result',result);
                    if (result.data.code < 0) {
                        console.log('Unsuccess',result);
                    } else {
                        console.log('ID',name,result.data.resolve);
                        $scope.products = result.data.resolve;
                        $scope.model = result.data.resolve;
                        //        $compile($element.contents())($scope);
                        //console.log('Success');
                    }
                });

            }

            $scope.loadImage = function(images) {
                if (Array.isArray(images))
                    return images[0];
                else
                    return images;
            }


        }
    };
    return dazzleData;
});

app.directive('dzField', function ($compile,$http) {
    var dazzleData = {
        restrict: 'E',
        priority: 1000,
        scope: true,

        controller: function ($scope, $element, $attrs) {

            $scope.companyInit = function(id) {
                console.log('company Init');
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data":{
                        "action": "getData",
                        "index": "5metal.dazzle.website",
                        "type": "company",
                        "id": id
                    }
                }).then(function (result) {
                    //console.log(result);
                    if (result.data.code < 0) {
                        console.log('Unsuccess');
                    } else {
                        //console.log('ID',id,result.data.resolve);
                        $scope.model = result.data.resolve;
                        console.log('Success',$scope.model);
                        $compile($element.contents())($scope);
                    }
                });
            }

            $scope.companyCommentNo = function(id) {

            }


            $scope.companyNoProduct = function(id) {

            }
            $scope.companyAge = function(id) {
                var age,now;

                now = new Date().getTime();

                // console.log('Now',now);
                console.log($scope.model['created']);
                age = now - parseInt($scope.model['created']);

                // console.log('Age',age);
                return age;
            }
            $scope.init = function(id) {
                $http({
                    "method": "post",
                    "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                    "data":{
                        "action": "getData",
                        "index": "5metal.dazzle.website",
                        "type": "product",
                        "id": id
                    }
                }).then(function (result) {
                    //console.log(result);
                    if (result.data.code < 0) {
                        console.log('Unsuccess');
                    } else {
                        //console.log('ID',id,result.data.resolve);
                        $scope.model = result.data.resolve;
                        //console.log('Success');
                    }
                });
            }

            $scope.loadImage = function(images) {
                if (Array.isArray(images))
                    return images[0];
                else
                    return images;
            }


        }
    };
    return dazzleData;
});

app.directive('dzProduct', function ($compile,$http) {
    var dazzleData = {
        restrict: 'E',
        priority: 1000,
        scope: true,

        controller: function ($scope, $element, $attrs) {
            
            console.log('Dz Product');
            $scope.init = function(id) {
                return new Promise(function (resolve, reject) {
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "getData",
                            "index": "5metal.dazzle.website",
                            "type": "product",
                            "id": id
                        }
                    }).then(function (result) {
                        //console.log(result);
                        if (result.data.code < 0) {
                            console.log('Unsuccess');
                        } else {
                            //console.log('ID',id,result.data.resolve);
                            $scope.model = result.data.resolve;
                            console.log('5metal Success');
                        }
                        resolve();
                    });
                });
            }
            
             $scope.myDate = function(timestamp){
                //console.log(timestamp);
                if (timestamp> 1000000000000)
                    return new Date(timestamp).toLocaleDateString();
                else
                    return new Date(timestamp*1000).toLocaleDateString();
            }

            $scope.loadImage = function(images) {
                if (Array.isArray(images))
                    return images[0];
                else
                    return images;
            }
              $scope.isAdmin = function(){
               var user = store.get('user');
               console.log('User',user);
               if (!angular.isUndefined(user) && user['uid']==162)
                    return true;
               else
                   return false;
            }


        }
    };
    return dazzleData;
});



app.directive('hotCompany', function ($compile,$http) {
    var dazzleData = {
        restrict: 'E',
        priority: 1000,
        scope: true,

        controller: function ($scope, $element, $attrs) {
            $scope.currentPage =0;
            $scope.pageSize = 10;
            $scope.total = 200;
            $scope.size = 20;

            $scope.category = '';
            $scope.categorys = {};
            $scope.updateCategory = function(cat){
                $scope.category = cat;
                console.log($scope.category);
            }
            $scope.getAllCategory = function(name){
                $scope.categorys = [];
                console.log('Products',$scope.company['myProducts']);
                angular.forEach($scope.company['myProducts'],function(item,index){
                    if (!$scope.categorys.indexOf(item['category']))
                        $scope.categorys.push(item['category']);
                });
                console.log($scope.categorys);
            }


            $scope.init = function(id) {
                return new Promise(function (resolve, reject) {

                    console.log('company Init');
                    $http({
                        "method": "post",
                        "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                        "data": {
                            "action": "searchData",
                            "index": "5metal.dazzle.website",
                            "type": "company",
                            "body": {
                                "_source" : ["nid", "company_logo","title"],
                                "query":{
                                    "match":{
                                        "company_recommend":1
                                    }
                                },
                                "from":0,
                                "size":$scope.size
                            }
                        }
                    }).then(function (result) {
                        //console.log(result);
                        if (result.data.code < 0) {
                            console.log('Unsuccess');
                        } else {
                            //console.log('ID',id,result.data.resolve);
                            $scope.hotCompanyList = result.data.resolve;
                            console.log('Hot Success', $scope.hotCompanyList);
                            $scope.reload();
                            resolve();
                        }
                    });
                });
            }


            $scope.companyAge = function(id) {
                var age,now,a;

//               now = new Date().getTime();
                now = Math.floor(Date.now() / 1000);

                //  var d = new Date(now), a = new Date($scope.model['created']);

                console.log('Now',now);

//                console.log('Register year',a.getFullYear());
                console.log($scope.company['created']);
                age =parseInt(now)-parseInt($scope.company['created']);
                console.log('Age',age);
                var day = Math.floor(age / 3600 / 24 );
                //              age = now - parseInt($scope.model['created'])*3600*24;
                // age = age /3600 / 24;


                return day + "天";
            }


            $scope.loadImage = function(images) {
                if (Array.isArray(images))
                    return images[0];
                else
                    return images;
            }


        }
    };
    return dazzleData;
});




app.filter('startFrom', function() {
    return function(input, start) {
        console.log('Start From',input,start);

        start = +start; //parse to int
        return input.slice(start);
    }
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

app.controller('5metalController', function ($scope, $http, $element, $compile, $templateRequest, $interval, $route, $timeout) {

    $scope.loadImage = function(images) {
        var loadImages;
        if (Array.isArray(images))
            loadImages=images[0];
        else
            loadImages = images;

        if (angular.isUndefined(loadImages))
            loadImages = 'https://www.5metal.com.hk/sites/all/themes/metal/images/logo_company.jpg';

        console.log('Load Images',loadImages);
        return loadImages;

    }
    $scope.list = [
        {
            "id": 1,
            "title": "node1",
            "nodes": [
                {
                    "id": 11,
                    "title": "node1.1",
                    "nodes": [
                        {
                            "id": 111,
                            "title": "node1.1.1",
                            "nodes": []
                        }
                    ]
                },
                {
                    "id": 12,
                    "title": "node1.2",
                    "nodes": []
                }
            ]
        },
        {
            "id": 2,
            "title": "node2",
            "nodrop": true,
            "nodes": [
                {
                    "id": 21,
                    "title": "node2.1",
                    "nodes": []
                },
                {
                    "id": 22,
                    "title": "node2.2",
                    "nodes": []
                }
            ]
        },
        {
            "id": 3,
            "title": "node3",
            "nodes": [
                {
                    "id": 31,
                    "title": "node3.1",
                    "nodes": []
                }
            ]
        }
    ];

    $scope.indexSlides = [
        "http://www.5metal.com.hk/sites/all/themes/metal/images/slide1.jpg",
        "http://www.5metal.com.hk/sites/all/themes/metal/images/slide2.jpg",
        "http://www.5metal.com.hk/sites/all/themes/metal/images/slide3.jpg",
        "http://www.5metal.com.hk/sites/all/themes/metal/images/slide4.jpg"
    ];
    $scope.company = [];
    $scope.data = [];
    $scope.bigdata = [];
    $scope.newdata = [];
    $scope.hotData =[];
//        $scope.tid_query = tid_query;
//        $scope.product_sorting = product_sorting;
//        $scope.company_query = company_query;
//        $scope.order = order;
//        $scope.order_type = order_type;
    $scope.start = start;
    $scope.end = end;
    $scope.status = { "match": { "status":  1 }};
    $scope.grandTotal = 0;
    $scope.randomData = [];
    $scope.recordtotal = 0;
    $scope.index = "5metal.dazzle.website";
    $scope.producttable = "product";
    $scope.companytable = "company";
    $scope.active = {};
    $scope.sortOrder ={};
    $scope.companyActive = {};
    $scope.companySortOrder = {};

    $scope.active['view'] = '';
    $scope.active['price'] = '';
    $scope.active['update'] = 'active';

    $scope.sortOrder['view'] = 'desc';
    $scope.sortOrder['price'] = 'desc';
    $scope.sortOrder['update'] = 'desc';


    $scope.companyActive['view'] = 'active';
    $scope.companyActive['stock'] = '';
    $scope.companyActive['vote'] = '';
    $scope.companyActive['register'] = '';

    $scope.companySortOrder['view'] = 'desc';
    $scope.companySortOrder['stock'] = 'desc';
    $scope.companySortOrder['vote'] = 'desc';
    $scope.companySortOrder['register'] = 'desc';
    $scope.page = 0;
    $scope.from = 0;
    console.log('Load Me');

    $scope.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results==null){
            return null;
        }
        else{
            return decodeURI(results[1]) || 0;
        }
    }

    $scope.reload = function() {

        $timeout(function () {
            // 0 ms delay to reload the page.
            $route.reload();
            $scope.loading = false;
        }, 10);

        // $scope.$apply(function(){
        //     $scope.loading = false;
        // });
    }


    $scope.hotCompanyInit = function(id) {
        return new Promise(function (resolve, reject) {

            console.log('company Init');
            $http({
                "method": "post",
                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                "data": {
                    "action": "searchData",
                    "index": "5metal.dazzle.website",
                    "type": "company",
                    "body": {
                        "_source" : ["nid", "company_logo","title"],
                        "query":{
                            "match":{
                                "company_recommend":1
                            }
                        },
                        "from":0,
                        "size":$scope.size
                    }
                }
            }).then(function (result) {
                //console.log(result);
                if (result.data.code < 0) {
                    console.log('Unsuccess');
                } else {
                    //console.log('ID',id,result.data.resolve);
                    $scope.hotCompanyList = result.data.resolve;
                    console.log('Hot Success', $scope.hotCompanyList);
                    $scope.reload();
                    resolve();
                }
            });
        });
    }
    $scope.loadCompanyMore = function() {
        console.log("More:",start,end,$scope.total,$scope.end,$scope.recordtotal);
        $scope.loading = true;
        if ($scope.recordtotal > 0) { $scope.total = $scope.recordtotal};
        if ($scope.total >= $scope.end) {
            page++;
            start = page * no_per_page;
            //end = (page+1) * 60;
            $scope.initCompany();
        }
    }
    $scope.loadMore = function() {
        console.log("More:",start,end,$scope.total,$scope.end,$scope.recordtotal);
        $scope.loading = true;
        if ($scope.recordtotal > 0) { $scope.total = $scope.recordtotal};
        if ($scope.total >= $scope.end) {
            $scope.page++;
            $scope.from = $scope.page * no_per_page;
            //end = (page+1) * 60;
            $scope.init($scope.queryType);
        }
    }
    $scope.initSetting = function() {
        $.urlParam = function(name){
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            if (results==null){
                return null;
            }
            else{
                return decodeURI(results[1]) || 0;
            }
        }

        order = $.urlParam('order');
        order_type = $.urlParam('order_type');
        //page = $.urlParam('page');
        //console.log('Page:',page);

        if (order == null && order_type == null) {
            $(".order_list li .active.asc").removeClass('active');
            $(".order_list li .active.desc").removeClass('active');
            $("#sort_update").removeClass('asc');
            $('#sort_update').addClass('desc');
            $('#sort_update').addClass('active');
            product_sorting = {"changed": {"order" :"desc"}};
            $scope.product_sorting = product_sorting;
        }

        if (order == null) {
            order = "changed";
            $scope.order = order;
        }

        if (order_type == null) {
            order_type = "desc";
            $scope.order_type = order_type;
        }

        var tid = $.urlParam('tid');
        if (tid != null) {
            var tid_arr = tid.split(',');
            for (var a=0; a<tid_arr.length; a++) {
                if (tid_arr[a] >=1 && tid_arr[a] <= 8) {
                    $("#sub_category_"+tid_arr[a]).children("li").children("a").each(function(){
                        all_tid_arr.push($(this).text());
                    })
                } else if (tid_arr[a] > 8) {
                    if ($.inArray(tid_arr[a], all_tid_arr)) {
                        var tid_name = $("#ref_"+tid_arr[a]).text();
                        all_tid_arr.push(tid_name);
                    }
                }
            }
            tid_ele = 1;
            tid_query = {"terms":{"category": all_tid_arr}};
            $scope.tid_query = tid_query;
            $scope.tid_ele = tid_ele;
        }

        var did = $.urlParam('region');
        if (did != null) {
            var did_arr = did.split(',');
            for (var a=0; a<did_arr.length; a++) {
                if (did_arr[a] >= 4179 && did_arr[a] <= 4182) {
                    console.log("did");
                    switch (did_arr[a]) {
                        case '4179': did = 9; break;
                        case '4180': did = 10; break;
                        case '4181': did = 11; break;
                        case '4182': did = 12; break;
                    }
                    $("#sub_category_"+did).children("li").children("a").each(function(){
                        all_did_arr.push($(this).text());
                    })
                } else {
                    if ($.inArray(did_arr[a], all_did_arr)) {
                        var did_name = $("#ref_"+did_arr[a]).text();
                        all_did_arr.push(did_name);
                    }
                }
            }
            did_ele = 1;
            $scope.did_ele = did_ele;
        }

        var sid = $.urlParam('salestype');
        if (sid != null) {
            var sid_arr = sid.split(',');
            for (var a=0; a<sid_arr.length; a++) {
                switch (sid_arr[a]) {
                    case "批發": all_sid_arr.push('批發為主'); all_sid_arr.push('純批發'); break;
                    case "零售": all_sid_arr.push('零售為主'); all_sid_arr.push('約零售'); break;
                }
            }
            sid_ele = 1;
            $scope.sid_ele = sid_ele;
        }
        /*
        if (did_query != {}) {
            company_query = did_query;
            if (sid_query != {}) {
                company_query = $.extend(did_query, sid_query);
            }
        } else {
            company_query = sid_query;
        }
        */
        console.log("Product tid:",all_tid_arr);
        console.log("Disrict tid:",all_did_arr);
        console.log("Salestype tid:",all_sid_arr);

        if (order == "update") {
            order_type = $('#sort_update').attr('class');
            if (order_type == "asc") {
                $(".order_list li .active.asc").removeClass('active');
                $('#sort_update').addClass('.active');
                text=$('#sort_update').text();
                text=text.replace("遠->近","近->遠");
                $('#sort_update').text(text);
                product_sorting = {
                    "changed": {"order" :"asc"}
                };
            } else if (order_type == "desc") {
                $(".order_list li .active.desc").removeClass('active');
                $('#sort_update').addClass('active');
                text=$('#sort_update').text();
                text=text.replace("近->遠","遠->近");
                $('#sort_update').text(text);
                product_sorting = {
                    "changed": {"order" : "desc"}
                };
            }
        } else if (order == "price") {
            order_type = $('#sort_price').attr('class');
            if (order_type == "asc") {
                $(".order_list li .active.asc").removeClass('active');
                $('#sort_price').addClass('active');
                text=$('#sort_price').text();
                text=text.replace("高->低","低->高");
                $('#sort_price').text(text);
                product_sorting = {
                    "product_price": {"order" :"asc"}
                };
            } else if (order_type == "desc") {
                $(".order_list li .active.desc").removeClass('active');
                $('#sort_price').addClass('active');
                text=$('#sort_price').text();
                text=text.replace("低->高","高->低");
                $('#sort_price').text(text);
                product_sorting = {
                    "product_price": {"order" : "desc"}
                };
            }
        } else if (order == "click") {
            order_type = $('#sort_view').attr('class');
            if (order_type == "asc") {
                $(".order_list li .active.desc").removeClass('active');
                $('#sort_view').addClass('active');
                text=$('#sort_view').text();
                text=text.replace("多->少","少->多");
                $('#sort_view').text(text);
                product_sorting = {
                    "poduct_views": {"order" :"asc"}
                };
            } else if (order_type == "desc") {
                $(".order_list li .active.desc").removeClass('active');
                $('#sort_view').addClass('active');
                text=$('#sort_view').text();
                text=text.replace("少->多","多->少");
                $('#sort_view').text(text);
                product_sorting = {
                    "product_views": {"order" : "desc"}
                };
            }
        }

        $scope.product_sorting = product_sorting;
        $scope.order = order;
    }

    $scope.initCompany = function() {
        console.log('5metal Init');
        keyword = $scope.urlParam('keyword');
        $scope.tid = $scope.urlParam('tid');

        if (keyword)
            $scope.keyword = keyword;
        console.log('Keyword',$scope.keyword);

        console.log('Tid',$scope.tid,'.categories li a[rel="'+$scope.tid+'"]');
        var category;
        $scope.category = $('.sub_category li a[rel="'+$scope.tid+'"]').text();
        if (!$scope.category)
            $scope.category = $('.categories li a[rel="'+$scope.tid+'"]').text();

        $scope.hotTotal = (page+1) *20;
        console.log($scope.category);
        $scope.getCompanyQuery();
    }

    $scope.getCategoryChildren = function(tid){
        console.log('Tid To Category');
        return new Promise(function (resolve, reject) {

            console.log('company Init');
            $http({
                "method": "post",
                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                "data":{
                    "action": "searchData",
                    "index": "5metal.dazzle.website",
                    "type": "product_category",
                    "body": {
                        "query":{
                            "match":{
                                "parent":tid
                            }
                        }
                    }

                }
            }).then(function (result) {
                console.log(result);
                if (result.data.code < 0) {
                    $scope.catChildren = [];
                    resolve([]);
                } else {
                    $scope.catChildren = result.data.resolve;
                    resolve(result.data.resolve);
                }
            });
        });

    }

    $scope.tidToCategory = function(tid){
        console.log('Tid To Category');
        return new Promise(function (resolve, reject) {

            console.log('company Init');
            $http({
                "method": "post",
                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                "data":{
                    "action": "getData",
                    "index": "5metal.dazzle.website",
                    "type": "product_category",
                    "id": tid

                }
            }).then(function (result) {
                console.log(result);
                if (result.data.code < 0) {
                    resolve('');
                } else {

                    resolve(result.data.resolve['name']);
                    //                    return result.data.resolve[0]['nid'];
                }
            });
        });

    }

    $scope.init = function(type) {
        console.log('5metal Init');
      //  angular.element($('body')).scope().init();

        $scope.queryType = type;
        keyword = $scope.urlParam('keyword');
        $scope.tid = $scope.urlParam('tid');

        if (keyword)
            $scope.keyword = keyword;
        console.log('Keyword',$scope.keyword);

        // console.log('Tid',$scope.tid,'.categories li a[rel="'+$scope.tid+'"]');
        // var category;
        //
        // $scope.category = $('.sub_category li a[rel="'+$scope.tid+'"]').text();
        // if (!$scope.category)
        //     $scope.category = $('.categories li a[rel="'+$scope.tid+'"]').text();

        $scope.tidToCategory($scope.tid).then(function(name){
           console.log('Tid Name',name);
           $scope.category = name;
            if (type=='product')
                $scope.getProductQuery();
            else if (type=='company')
                $scope.getCompanyQuery();
        });
//        console.log($scope.category);

    }

    $scope.findCompanyId = function(name){
        return new Promise(function (resolve, reject) {

            console.log('company Init');
            $http({
                "method": "post",
                "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
                "data":{
                    "action": "searchData",
                    "index": "5metal.dazzle.website",
                    "type": "company",
                    "body":{
                        "query": {
                            "title":name
                        }
                    }

                }
            }).then(function (result) {
                console.log(result);
                if (result.data.code < 0) {
                    return 0;
                } else {
                    return result.data.resolve[0]['nid'];
                }
            });
        });

    }
    $scope.randomArray = function(array, total) {
        randomArray = [];
        var randomtotal = Math.floor(total / 4);
        while (randomtotal > 0) {
            var result = Math.floor(Math.random()*total);
            if ($scope.start > 0) {
                result = result + $scope.start;
            }
            if ($.inArray(array[result],randomArray) == -1) {
                randomArray.push(array[result]);
                randomtotal --;
            }
        }

        return array;
    }

    $scope.keyword_search = function() {
        var url;
        console.log('Search',$scope.keyword);
        url = "product_category?keyword="+$scope.keyword;
        document.location.href = url;
    }

    $scope.sortAsc = function(type) {
        $("#sort_"+type).removeClass('asc');
        $("#sort_"+type).addClass('desc');
        $("#sort_"+type).addClass('active');
        text=$("#sort_"+type).text();
        switch (type) {
            case "view": text=text.replace("少->多","多->少"); product_sorting = { "product_views": {"order" : "asc"} }; break;
            case "price": text=text.replace("低->高","高->低"); product_sorting = { "product_price": {"order" : "asc"} }; break;
            case "update": text=text.replace("近->遠","遠->近"); product_sorting = { "changed": {"order" : "asc"} }; break;
        }
        $("#sort_"+type).text(text);
        $scope.product_sorting = product_sorting;
    }

    $scope.sortDesc = function(type) {
        $("#sort_"+type).removeClass('desc');
        $("#sort_"+type).addClass('asc');
        $("#sort_"+type).addClass('active');
        text=$("#sort_"+type).text();
        switch (type) {
            case "view": text=text.replace("多->少","少->多"); product_sorting = { "product_views": {"order" : "desc"} }; break;
            case "price": text=text.replace("高->低","低->高"); product_sorting = { "product_price": {"order" : "desc"} }; break;
            case "update": text=text.replace("遠->近","近->遠"); product_sorting = { "changed": {"order" : "desc"} }; break;
        }
        $("#sort_"+type).text(text);
        $scope.product_sorting = product_sorting;
    }

    $scope.sortClass = function(type){
        var classes =[];

        classes.push($scope.active[type]);
        classes.push($scope.sortOrder[type]);

        return classes;
    }
    $scope.companySortClass = function(type){
        var classes =[];

        classes.push($scope.companyActive[type]);
        classes.push($scope.companySortOrder[type]);

        return classes;
    }

    $scope.companySort = function(type){
        console.log('Sort');

        if ($scope.companyActive[type]=='active') {
            if($scope.companySortOrder[type]=='desc')
                $scope.companySortOrder[type]='asc';
            else
                $scope.companySortOrder[type]='desc';
        } else
            $scope.companySortOrder[type] = 'desc';


        $scope.companyActive['view'] ='';
        $scope.companyActive['stock'] ='';
        $scope.companyActive['vote'] ='';
        $scope.companyActive['register'] ='';
        $scope.companyActive[type] ='active';

        $scope.data = [];
        $scope.randomData = [];
        console.log("Random data:",$scope.randomData.length);

//            start = 0;
//            end = $scope.recordtotal;

        $scope.from = 0;
        $scope.page = 0;
        $scope.getCompanyQuery();


    }

    $scope.sort = function(type){
        console.log('Sort');

        if ($scope.active[type]=='active') {
            if($scope.sortOrder[type]=='desc')
                $scope.sortOrder[type]='asc';
            else
                $scope.sortOrder[type]='desc';
        } else
            $scope.sortOrder[type] = 'desc';


        $scope.active['view'] ='';
        $scope.active['price'] ='';
        $scope.active['update'] ='';

        $scope.active[type] ='active';

        $scope.data = [];
        $scope.randomData = [];
        console.log("Random data:",$scope.randomData.length);

//            start = 0;
//            end = $scope.recordtotal;
        $scope.from = 0;
        $scope.page = 0;
        $scope.getProductQuery();


    }

    $scope.loadSingleProduct = function(id) {
        $http({
            "method": "post",
            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
            "data":{
                "action": "getData",
                "index": "5metal.dazzle.website",
                "type": "product",
                "id": id
            }
        }).then(function (result) {
            console.log(result);
            if (result.data.code < 0) {
                console.log('Unsuccess');
            } else {
                console.log('ID',id,result.data.resolve);
                console.log('Success');
            }
        });
    }

    /* Get company information */
    $scope.loadCompanyInformation = function(query_init, number) {

        console.log('Query',query_init);
        $http(query_init).then(function (result) {
            console.log("Company result:",result);
            if (result.data.code < 0) {
                console.log('Unsuccess');
            } else {
                console.log(result.data.resolve);
                $scope.recordtotal = result.data.resolve.count;
                console.log("Total:",$scope.recordtotal);
                if (number == "part") {
                    $scope.data = $scope.data.concat(result.data.resolve);
                    $scope.newData = $scope.data;
                    $scope.total = $scope.data.length;
                    $scope.randomArray($scope.newData, $scope.total);
                    $scope.randomData = randomArray;
                }

                if (number == "hot") {
                    console.log('Hot Result',result.data.resolve);
                    $scope.hotData = $scope.hotData.concat(result.data.resolve);
                    // $scope.newHotData = $scope.hotData;
                    //$scope.hotTotal = $scope.data.length;
                    // $scope.randomArray($scope.newHotData, Math.round($scope.total/3));
                    // $scope.hotRandomData = randomArray;
                }

                //$scope.loadSingleProduct($scope.data[0]['nid']);
                console.log('Success');
                $scope.reload();
            }
        });
    }

    /* Get product information */
    $scope.loadProductInformation = function(query_init, number) {

        console.log('Query Init',query_init,$scope.from,end);
        $http(query_init).then(function (result) {
            console.log("Product result:",result);
            if (result.data.code < 0) {
                console.log('Unsuccess');
            } else {
                console.log(result.data.resolve);
                $scope.recordtotal = result.data.resolve.count;
                console.log("Total:",$scope.recordtotal);
                if (number == "part") {
                    $scope.data = $scope.data.concat(result.data.resolve);
                    $scope.newData = $scope.data;
                    $scope.total = $scope.data.length;
                    $scope.randomArray($scope.newData, $scope.total);
                    $scope.randomData = randomArray;
                }
                //$scope.loadSingleProduct($scope.data[0]['nid']);
                console.log('Success');
                $scope.reload();
            }
        });
    }

    /* Load product with keyword */
    // $scope.loadProductWithKeyword = function(keyword) {
    //     console.log("Products with keyword");
    //     $http({
    //         "method": "post",
    //         "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
    //         "data":{
    //             "action": "searchData",
    //             "from" : start,
    //             "size" : end,
    //             "index": "5metal.dazzle.website.product",
    //             "type": "_doc",
    //             "body": {
    //                 "sort" : [
    //                     $scope.product_sorting
    //                 ],
    //                 "query": {
    //                     "bool": {
    //                         "should": [
    //                             $scope.status
    //                           ],
    //                         "must": [
    //                             $scope.tid_query
    //                         ]
    //                     },
    //                     "wildcard" : { "title" : keyword }
    //                 }
    //             }
    //         }
    //     }).then(function (result) {
    //         console.log("Product result:",result);
    //         if (result.data.code < 0) {
    //             console.log('Unsuccess');
    //         } else {
    //             console.log(result.data.resolve);
    //             $scope.data = result.data.resolve;
    //             $scope.newData = $scope.data;
    //             $scope.total = $scope.data.length;
    //             //$scope.randomArray($scope.newData, $scope.total);
    //             //$scope.randomData = randomArray;
    //             //$scope.loadSingleProduct($scope.data[0]['nid']);
    //             console.log('Success');
    //             $scope.reload();
    //         }
    //     });
    // }

    $scope.sortingQuery = function() {


        var product_sorting = {};
        if ($scope.active['view']=='active') {
            product_sorting = {
                "product_views": {"order" : $scope.sortOrder['view']}
            };
        }
        if ($scope.active['price']=='active') {
            product_sorting = {
                "product_price": {"order" : $scope.sortOrder['price']}
            };
        }
        if ($scope.active['update']=='active') {
            product_sorting = {
                "created": {"order" : $scope.sortOrder['update']}
            };
        }

        return product_sorting;
    }


    $scope.companySortingQuery = function() {


        var sorting = {};
        if ($scope.companyActive['view']=='active') {
            sorting = {
                "company_views": {"order" : $scope.companySortOrder['view']}
            };
        }
        if ($scope.companyActive['stock']=='active') {
            sorting = {
                "last_post_product_date": {"order" : $scope.companySortOrder['stock']}
            };
        }
        if ($scope.companyActive['vote']=='active') {
            sorting = {
                "voting": {"order" : $scope.companySortOrder['vote']}
            };
        }
        if ($scope.companyActive['register']=='active') {
            sorting = {
                "created": {"order" : $scope.companySortOrder['register']}
            };
        }

        return sorting;
    }

    $scope.getCompanyQuery = function() {
        console.log('Get Company');



        $scope.querystring = {"bool": {"must":[$scope.status]}}

        if ($scope.keyword) {
            $scope.keywordstring = { "bool": { "should": [
                {"match_phrase": {"title": $scope.keyword}},
                {"match_phrase": {"body": $scope.keyword}},
                {"match_phrase": {"company_address": $scope.keyword}},
                {"match_phrase": {"company_code": $scope.keyword}},
                {"match_phrase": {"company_name_en": $scope.keyword}},
                {"match_phrase": {"company_tel": $scope.keyword}},
                {"match_phrase": {"company_type": $scope.keyword}}

            ] } };
            $scope.querystring['bool']['must'].push($scope.keywordstring);
        }

        if ($scope.category) {
            console.log($scope.category);
            var tid_arr = [];
            tid_arr.push($scope.category);

            $scope.categorystring = {"terms":{"company_type": tid_arr}};
            $scope.querystring['bool']['must'].push($scope.categorystring);
        }

        $scope.hotQuery_init =     {
            "method": "post",
            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
            "data": {
                "action": "searchData",
                "index": "5metal.dazzle.website",
                "type": "company",
                "from": Math.round($scope.from /3),
                "size": Math.round(end/3),
                "body": {
                    "_source" : ["nid", "company_logo","title"],
                    "query":{
                        "match":{
                            "status":"1"
                        }
                    },
                    "sort":{
                        "company_views": {"order" : "desc"}
                    }
                }
            }
        }

        $scope.query_init = {
            "method": "post",
            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
            "data":{
                "action": "searchData",
                "from" : $scope.from,
                "size" : end,
                "index": "5metal.dazzle.website",
                "type": "company",
                "body": {
                    "_source" : ["nid", "company_logo","title","company_recommend"],
                    "sort" : [
                        $scope.companySortingQuery()
                    ],
                    "query": $scope.querystring
                }
            }
        }

        $scope.query_count = {
            "method": "post",
            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
            "data":{
                "action": "getCount",
                "index": "5metal.dazzle.website",
                "type": "company",
                "body": {
                    "_source" : ["nid", "company_logo","title"],
                    "sort" : [
                        $scope.companySortingQuery()
                    ],
                    "query": $scope.querystring
                }
            }
        }


        console.log('Query Init',$scope.query_init);
        console.log('Query Count',$scope.query_count);
        console.log('Query Init',$scope.hotQuery_init);

        $scope.loadCompanyInformation($scope.query_count, "all");
       $scope.loadCompanyInformation($scope.hotQuery_init, "hot");
        $scope.loadCompanyInformation($scope.query_init, "part");
    }

    $scope.getProductQuery = function() {
        console.log('Get Product');

        // if (tid_ele == 1) {
        //        $scope.querystring = { "bool": { "should": [ $scope.status ], "must": [ $scope.tid_query ] } }
        //    } else {
        //        $scope.querystring = { "bool": { "should": [ $scope.status ] } };
        //    }

        $scope.querystring = {"bool": {"must":[$scope.status]}}

        if ($scope.keyword) {
            $scope.keywordstring = { "bool": { "should": [
                {"match_phrase": {"title": $scope.keyword}},
                {"match_phrase": {"body": $scope.keyword}}
            ] } };
            $scope.querystring['bool']['must'].push($scope.keywordstring);
        }

        if ($scope.category) {
            console.log($scope.category);
            var tid_arr = [];
            tid_arr.push($scope.category);
//                     $scope.querystring['bool']['must']=[{"terms":{"category": tid_arr}}];
            $scope.categorystring = {"terms":{"category": tid_arr}};
            $scope.querystring['bool']['must'].push($scope.categorystring);
        }

        $scope.query_init = {
            "method": "post",
            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
            "data":{
                "action": "searchData",
                "from" : $scope.from,
                "size" : end,
                "index": "5metal.dazzle.website",
                "type": "product",
                "body": {
                    "sort" : [
//                                $scope.product_sorting
                        $scope.sortingQuery()
                    ],
                    "query": $scope.querystring
                }
            }
        }

        $scope.query_count = {
            "method": "post",
            "url": "https://41khtanrje.execute-api.ap-northeast-1.amazonaws.com/prod/Dazzle-elasticSearchController",
            "data":{
                "action": "getCount",
                "index": "5metal.dazzle.website",
                "type": "product",
                "body": {
                    "sort" : [
                        $scope.sortingQuery()
                    ],
                    "query": $scope.querystring
                }
            }
        }
        // if ($scope.keyword) {
        //     $scope.query_init['data']['body']['query']['wildcard'] = { "title" : $scope.keyword };
        //     $scope.query_count['data']['body']['query']['wildcard'] = { "title" : $scope.keyword };
        // }
        console.log('Query Init',$scope.query_init);
        console.log('Query Count',$scope.query_count);
        $scope.loadProductInformation($scope.query_count, "all");
        $scope.loadProductInformation($scope.query_init, "part");

    }

});
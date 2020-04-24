
   //loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.4/js/bundle.6.5.3.min.js");

//    loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/builder-index.css");


    loadScript("https://d27btag9kamoke.cloudfront.net/cdn6.0/js/store-2.0.12.min.js",function(){

    	var editMode = store.get('editMode') || 'normal';
        loadScript("https://d27btag9kamoke.cloudfront.net/cdn6.4/js/bundle.6.5.4.min.js",function(){
            // loadScript("https://d27btag9kamoke.cloudfront.net/cdn6.4/js/dazzleFactory.lib.js",function() {
            //     $.get( location.pathname, function( data ) {
            //        $(document).ready(function (e) {
            //             console.log('We are Ready');
            //             var htm = $(data);
            //             var head = htm.html('head');
            //             var body = htm.html('body');
            //             console.log('HEAD',head);
            //             console.log('BODY',body);
            //             store.set('html',data);
            //
            //             $('body').attr('ng-app','demoApp');
            //             $('body').attr('ng-controller', 'editorController');
            //             $('body').attr('ng-init','real_init()');
            //
            //             angular.element(document).ready(function() {
            //                 angular.bootstrap(document, ['demoApp']);
            //             });
            //        });
            //         // compile the new element
            //
            //     });
            //
            //
            //
            // });

        });
    });

    function init(){
        $(document).ready(function (e) {
            console.log('We are Ready');
            var htm = $(data);
            var head = htm.html('head');
            var body = htm.html('body');
            console.log('HEAD',head);
            console.log('BODY',body);
            store.set('html',data);

            $('body').attr('ng-app','demoApp');
            $('body').attr('ng-controller', 'editorController');
            $('body').attr('ng-init','init()');

            angular.element(document).ready(function() {
                angular.bootstrap(document, ['demoApp']);
            });
        });
        // compile the new element
    }

    function loadJs(url) {
        var link = document.createElement("script");
        link.type = "application/javascript";
        link.src = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    }

function loadCss(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}
function loadScript(url, callback){

    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function(){
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}





   var QueryString = function () {
       var query_string = {};
       var query = window.location.search.substring(1);
       var vars = query.split("&&&");
       for (var i = 0; i < vars.length; i++) {
           var pair = vars[i].split(":===:");
           if (typeof query_string[pair[0]] === "undefined") {
               query_string[pair[0]] = decodeURIComponent(pair[1]);
           } else if (typeof query_string[pair[0]] === "string") {
               var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
               query_string[pair[0]] = arr;
           } else {
               query_string[pair[0]].push(decodeURIComponent(pair[1]));
           }
       }
       return query_string;
   }();
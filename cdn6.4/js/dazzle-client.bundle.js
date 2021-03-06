
   //loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.4/js/bundle.6.5.3.min.js");

//    loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/builder-index.css");


    loadScript("https://d27btag9kamoke.cloudfront.net/cdn6.0/js/store-2.0.12.min.js",function(){

    	var editMode = store.get('editMode') || 'normal';
    	if (editMode!="normal")
		    loadJs("https://d27btag9kamoke.cloudfront.net/cdn6.4/js/dazzle-client.bundle.6.5.2.min.js");
		else
			loadJs("https://d27btag9kamoke.cloudfront.net/cdn6.4/js/dazzle-client.bundle.6.5.5.min.js");
    });

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
require.config({
    paths: {
        'jquery': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/jquery-2.2.4.min',
        'jquery-ui': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/jquery-ui-1.12.1.min',
        'bootstrap': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/bootstrap-3.3.7.min',
        'slick': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/slick-1.6.0.min',
        'domready': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/domready',
        'aws-sdk': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/aws-sdk-2.83.0.min',
        'interact': 'https://cdnjs.cloudflare.com/ajax/libs/interact.js/1.2.8/interact.min',
        'store': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/store-2.0.12.min',
        'moment': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/moment-2.18.1.min',
        'ace': 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.9/ace',
        //'aviary': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/aviary-3.1.0.min',
        'aviary': 'http://feather.aviary.com/imaging/v3/editor',
        //  'feather': 'http://feather.aviary.com/imaging/v2/editor',
        //   'angular-aviary': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/angular-aviary',
        'medium-editor': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/medium-editor-5.23.1.min',
        'autolist': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/autolist.min',
        'hotkeys': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/hotkeys',
        'ag-grid-enterprise': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/ag-grid-enterprise-11.0.0.min',
        'alasql': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/alasql-0.4.0.min',
        'xlsx': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/xlsx-0.10.8.min',
        'angular': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/angular-1.6.5.min',
		'angular-isteven':'http://www.hot-yeah.com/js/isteven-multi-select',
        'angular-animate': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/angular-1.6.5-animate.min',
        'angular-touch': 'https://cdnjs.cloudflare.com/ajax/libs/angular-touch/1.6.6/angular-touch.min',
        'angular-aria': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/angular-1.6.5-aria.min',
        'angular-route': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/angular-1.6.5-route.min',
        'angular-messages': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/angular-1.6.5-messages.min',
        'angular-moment': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/angular-moment.min',
        'angular-ui-bootstrap': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/angular-ui-bootstrap-tpls-2.5.0.min',
        'angular-ui-sortable': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/angular-ui-sortable-0.14.4',
        'angular-ui-ace': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/angular-ui-ace-0.2.3',
        'angular-ui-tree': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/angular-ui-tree-2.22.5.min',
        'angular-material': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/angular-material-1.1.4.min',
        'angular-material-fileinput': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/angular-material-fileinput-1.5.2',
        'angular-material-timepicker': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/angular-material-timepicker-1.0.7',
        'angular-slick': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/angular-slick-3.1.7.min',
        'angular-grid': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/angular-grid-0.6.5.min',
        'angular-bootstrap-calendar': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/angular-bootstrap-calendar-tpls.min',
        'angular-material-sidemenu': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/angular-material-sidemenu',
        'ocLazyLoad': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/ocLazyLoad-1.1.0.min',
        "angular-contextMenu": "https://dazzle-template.s3.amazonaws.com/cdn6.0/js/angular-bootstrap-contextmenu-0.9.9",
        "multirange-slider": "https://dazzle-template.s3.amazonaws.com/cdn6.0/js/angular-multirange-slider-1.1.1",
        'dazzle': 'https://dazzle-template.s3.amazonaws.com/cdn6.0/js/dazzle-6.3'
    },
    shim: {
        'aws-sdk': {
            exports: 'AWS'
        },
        'store': {
            exports: 'store'
        },
        'moment': {
            exports: 'moment'
        },
        'interact': {
            exports: 'interact'
        },
        'ace': {
            exports: 'ace'
        },
        'aviary': {
            exports:'Aviary'
        },
        // 'angular-aviary': {
        //     deps:['angular','feather']
        // },
        'autolist': {
            exports: 'AutoList'
        },
        'medium-editor': {
            exports: 'MediumEditor'
        },
        'ag-grid-enterprise': {
            deps: ['angular'],
            exports: 'agGrid'
        },
        'alasql': {
            deps: ['xlsx'],
            exports: 'alasql'
        },
        'jquery': {
            exports: '$'
        },
        'jquery-ui': {
            deps: ['jquery']
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'slick': {
            deps: ['jquery']
        },
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
		'angular-isteven': {
			deps:['angular']
		},
        'angular-bootstrap-calendar': {
            deps: ['angular-animate', 'bootstrap', 'moment', 'angular-touch','interact']
        },
        'angular-animate': {
            deps: ['angular']
        },
        'angular-touch': {
            deps: ['angular']
        },
        'angular-aria': {
            deps: ['angular']
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-messages': {
            deps: ['angular']
        },
        'angular-moment': {
            deps: ['angular', 'moment']
        },
        'angular-ui-bootstrap': {
            deps: ['angular', 'bootstrap']
        },
        'angular-ui-sortable': {
            deps: ['angular', 'jquery-ui']
        },
        'angular-ui-ace': {
            deps: ['angular', 'ace']
        },
        'angular-ui-tree': {
            deps: ['angular']
        },
        'angular-material': {
            deps: ['angular-animate', 'angular-aria', 'angular-route']
        },
        'angular-material-sidemenu': {
            deps: ['angular-material']
        },
        'angular-material-fileinput': {
            deps: ['angular-material']
        },
        'angular-material-timepicker': {
            deps: ['angular-material']
        },
        'angular-slick': {
            deps: ['jquery', 'angular', 'slick']
        },
        'angular-grid': {
            deps: ['angular']
        },
        'ocLazyLoad': {
            deps: ['angular']
        },
        'angular-contextMenu': {
            deps: ['angular']
        },
        'multirange-slider': {
            deps: ['angular']
        },
        'hotkeys': {
            deps: ['angular'],
            exports: 'hotkeys'
        }

    }
});


require(['dazzle', 'app'], function () {
    angular.bootstrap(document, ['demoApp']);
    loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/font-awesome-4.7.0.min.css");
    loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/medium-editor-5.23.1.min.css");
    loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/jquery-ui-1.12.1.min.css");
    loadCss("https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.css");
    loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/angular-jk-rating-stars-1.0.7.min.css");
    loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/angular-multirange-slider-1.1.1.css");
    loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/angular-ui-tree-2.22.5.min.css");
    loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/bootstrap-3.3.7.min.css");
    loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/slick-1.6.0.min.css");
    loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/slick-1.6.0-theme.min.css");
    loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/angular-material-fileinput-1.5.2.min.css");
    loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/angular-material-timepicker-1.0.7.css");
//    loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/angular-material-1.1.4.min.css");
    loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/angular-material-1.1.4.min.css");
		loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/isteven-multi-select.css");


    loadCss("https://dazzle-template.s3.amazonaws.com/cdn6.0/css/builder-index.css");
	
	
    loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.0/models/aceEditorPopup/popup.js");
    loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.0/models/pageJsCssPopup/popup.js");
    loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.0/models/directivePopup/popup.js");
    loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.0/models/userGalleryPopup/popup.js");
    loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.0/models/exportPopup/popup.js");
    loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.0/models/nonSingleExportPopup/popup.js");
    loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.0/models/masterPopup/popup.js");
    loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.0/models/addPagePopup/popup.js");
    loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.0/models/linkPopup/popup.js");
    loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.0/models/contentPopup/popup.js");
    loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.0/models/recoveryPopup/popup.js");
    loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.0/models/menuPopup/popup.js");
    loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.0/models/imagePopup/popup.js");
    loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.0/models/chartPopup/popup.js");
    loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.0/models/templatePopup/popup.js");
    loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.0/models/tabPopup/popup.js");
    loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.0/models/suntaGalleryInputPopup/popup.js");
    loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.0/models/addStructurePopup/popup.js");
    loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.0/models/uploadFilePopup/popup.js");
    loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.0/models/formTablePopup/popup.js");
    loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.0/models/dataPopup/popup.js");
    loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.0/models/editSchemaPopup/popup.js");
    loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.0/models/formTextElementPopup/popup.js");
    loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.0/models/codeManagerPopup/popup.js");
    loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.0/models/elementPopup/popup.js?id=asdfflsa");
    loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.0/models/galleryPopup/popup.js");
    loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.0/models/tagPopup/popup.js");
    loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.0/models/infoPopup/popup.js");
    loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.0/models/backgroundPopup/popup.js");
    loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.0/models/editFormSchemaPopup/popup.js");
    loadJs("https://dazzle-template.s3.amazonaws.com/cdn6.0/models/formDataSchemaPopup/popup.js");
    loadJs("https://maps.googleapis.com/maps/api/js?key=AIzaSyAN_dIE_33pcsdRWaRqx-EnJWNTNzOfqQI&libraries=places&callback=initMap");

    //   loadJs("http://maps.google.com/maps?file=api&amp;v=2&amp;key=ABQIAAAAjU0EJWnWPMv7oQ-jjS7dYxSPW5CJgpdgO_s4yyMovOaVh_KvvhSfpvagV18eOyDWu7VytS6Bi1CWxw");
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
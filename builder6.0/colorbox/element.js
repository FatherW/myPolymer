app.directive('colorbox', function($compile, $rootScope){
    return {
        link: function(scope, element, attrs){
            element.click('bind', function(){
                $.colorbox({
                    href: attrs.colorbox,
                    width:1000,
                    onComplete: function(){
                        $rootScope.$apply(function(){
                            var content = $('#cboxLoadedContent');
                            $compile(content)($rootScope);
                        })
                    }
                });
            });
        }
    };
});
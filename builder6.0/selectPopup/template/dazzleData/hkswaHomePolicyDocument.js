$(document).ready(function(){

    

            /*
             * Slicing the content with two pagers and using the URL Hash event
             */
            (function() {

                var prev = {
                    start: 0,
                    stop: 0
                };


                var content = $('#homepaper li');

                var Paging = $(".paging").paging(content.length, {
                    onSelect: function() {

                        var data = this.slice;

                        content.slice(prev[0], prev[1]).css('display', 'none');
                        content.slice(data[0], data[1]).fadeIn("slow");

                        prev = data;

                        return true; // locate!
                    },
                    onFormat: function(type) {

                        switch (type) {

                            case 'block':

                                if (!this.active)
                                    return '<span class="disabled">' + this.value + '</span>';
                                else if (this.value != this.page)
                                    return '<em><a href="#' + this.value + '">' + this.value + '</a></em>';
                                return '<span class="current">' + this.value + '</span>';

                            case 'right':
                            case 'left':

                                if (!this.active) {
                                    return '';
                                }
                                return '<a href="#' + this.value + '">' + this.value + '</a>';

                            case 'next':

                                if (this.active) {
                                    return '<a href="#' + this.value + '" class="next">Next &raquo;</a>';
                                }
                                return '<span class="disabled">Next &raquo;</span>';

                            case 'prev':

                                if (this.active) {
                                    return '<a href="#' + this.value + '" class="prev">&laquo; Previous</a>';
                                }
                                return '<span class="disabled">&laquo; Previous</span>';

                            case 'first':

                                if (this.active) {
                                    return '<a href="#' + this.value + '" class="first">|&lt;</a>';
                                }
                                return '<span class="disabled">|&lt;</span>';

                            case 'last':

                                if (this.active) {
                                    return '<a href="#' + this.value + '" class="prev">&gt;|</a>';
                                }
                                return '<span class="disabled">&gt;|</span>';

                            case 'fill':
                                if (this.active) {
                                    return "...";
                                }
                        }
                        return ""; // return nothing for missing branches
                    },
                    format: '[< ncnnn! >]',
                    perpage: 3,
                    lapping: 0,
                    page: null // we await hashchange() event
                });


                $(window).hashchange(function() {

                    if (window.location.hash)
                        Paging.setPage(window.location.hash.substr(1));
                    else
                        Paging.setPage(1); // we dropped "page" support and need to run it by hand
                });

                $(window).hashchange();
            })();
        

});
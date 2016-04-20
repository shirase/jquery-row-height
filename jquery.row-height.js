(function($) {
    $.fn.rowHeight = $.fn.rowheight = function(selector) {
        var rows = {};
        var self = this;

        if(selector) {
            self.find(selector).css('height', '');
        } else {
            self.css('height', '');
        }

        this.each(function() {
            var $el = $(this);
            var top = $el.position().top;
            if(!rows[top]) {
                rows[top] = [];
            }
            rows[top].push($el);
        });

        if(rows) {
            var top, i;
            for(top in rows) {
                var max = 0;
                if(rows[top].length>1) {
                    for(i in rows[top]) {
                        var e = rows[top][i];
                        var h = e.outerHeight();
                        if(h>max) max = h;
                    }
                    for(i in rows[top]) {
                        var e = rows[top][i];
                        if(selector) {
                            var sel = e.find(selector);
                            sel.outerHeight(sel.height()+max-e.outerHeight());
                        } else {
                            e.outerHeight(max);
                        }
                    }
                }
            }
        }

        var timer;
        $(window).resize(function() {
            if(timer) clearTimeout(timer);
            timer = setTimeout(function() {
                self.rowheight(selector);
            }, 1000);
        });
    }
})(jQuery);
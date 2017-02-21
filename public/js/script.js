(function(win, doc){
    function start() {
        var about = $('.about');
        about.on('click', function(e){
            if($(e.target).hasClass('about')) {
                $(this).toggleClass('show');
            }
        });
    }
    $(doc).ready(start);
})(window, document);
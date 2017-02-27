(function(win, doc) {
    function start() {
        var $about = $('.about');
        $about.on('click', function(e) {
            if ($(e.target).hasClass('about')) {
                $(this).toggleClass('show');
            }
        });

        $(doc).on('click', '.intro__link', function() {
            var $this = $(this);
            $this.addClass('clicked');
            setTimeout(function(){
                $this.removeClass('clicked');
                window.location.href = $this.attr('data-href');
            }, 400);
        });

        if(anime !== 'undefined' && window.innerWidth > 767) {
            var appDiv = anime({
                targets: '#app',
                scale: 0,
                rotate: '1turn',
                direction: 'reverse',
                delay: 0,
                duration: 5000
            });

            var brackets = anime({
                targets: '#svg-bgr path',
                strokeDashoffset: [anime.setDashoffset, 0],
                easing: 'easeInOutSine',
                duration: 2000,
                delay: function(el, i) { return (i * 200) },
                direction: 'alternate',
                autoplay: true,
            });

            var booyah = anime({
                targets: '#svg-bgr text',
                translateX: 10,
                direction: 'alternate',
                delay: 300,
                duration: function(el, i, l) {
                    return ((i+1) * 300);
                },
                complete: function(anim) {
                    var booyahbye = anime({
                      targets: '#svg-bgr text',
                      opacity: 0,
                      delay: function(el, i) { return (i * 100) },
                    });
                }
            });
        } else {
            document.getElementById('svg-bgr').style.display = 'none';
        }
    }
    $(doc).ready(start);
})(window, document);

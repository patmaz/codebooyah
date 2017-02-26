(function(win, doc) {
    function start() {
        var about = $('.about');
        about.on('click', function(e) {
            if ($(e.target).hasClass('about')) {
                $(this).toggleClass('show');
            }
        });
        if(anime !== 'undefined') {
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
	            translateY: 10,
	            direction: 'alternate',
	            delay: 150,
	            duration: function(el, i, l) {
	                return (i * 400);
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

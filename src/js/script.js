(function(win, doc) {
    function start() {
        var stream = new EventSource("/sse");
        var $iss = $('#iss');
        var $issLong = $('#long');
        var $issLat = $('#lat');
        var $usersNo = $('#no');
        var $uptime = $('#uptime');
        var $about = $('.about');
        var usersNumber;
        var numberOfPushes = 0;

        try {
            if(Notification) {
                if (Notification.permission !== "granted") Notification.requestPermission();
            }
        } catch (err) {
            console.error(err);
        }

        function notify(usersNumber) {
            try {
                if (!Notification) {
                    return;
                }

                if (Notification.permission !== "granted")
                    Notification.requestPermission();
                else {
                    var notification = new Notification('Booyah!!!', {
                        body: "Number of users has changed to: " + usersNumber
                    });

                    notification.onclick = function () {
                        $iss.click();
                    };
                }
            } catch (err) {
                console.error(err);
            }
        }

        $about.on('click', function(e) {
            if ($(e.target).hasClass('about')) {
                $(this).toggleClass('show');
            }
        });

        $iss.on('click', function(){
            $iss.toggleClass('active');
        });

        $(doc).on('click', '.intro__link', function() {
            var $this = $(this);
            $this.addClass('clicked');
            if ($this.attr('data-href')) {
                setTimeout(function(){
                    $this.removeClass('clicked');
                    window.location.href = $this.attr('data-href');
                }, 400);
            } else if ($this.attr('data-click')) {
                setTimeout(function(){
                    $this.removeClass('clicked');
                    $('#' + $this.attr('data-click')).click();
                }, 400);
            }
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

        stream.onopen = function() {
          console.log('Opened SSE connection');
        };

        stream.onerror = function (event) {
            $issLat.text('error');
            $issLong.text('error');
            $usersNo.text('error');
            $uptime.text('error');
        };

        stream.onmessage = function (event) {
            numberOfPushes++;
            var data = JSON.parse(event.data);
            $issLat.text(data[0].latitude);
            $issLong.text(data[0].longitude);
            $usersNo.text(data[1]);
            $uptime.text(data[2]);

            if (numberOfPushes === 1) {
                usersNumber = data[1];
            }

            if (usersNumber !== data[1]) {
                usersNumber = data[1];
                notify(data[1]);
            };
        };

        stream.onclose = function(code, reason) {
            console.log(code, reason);
        }

        window.addEventListener('beforeunload', function() {
            stream.close();
        });
    }
    $(doc).ready(start);
})(window, document);

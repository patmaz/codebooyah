!function(e,t){function n(){var e=$(".about");if(e.on("click",function(e){$(e.target).hasClass("about")&&$(this).toggleClass("show")}),"undefined"!==anime&&window.innerWidth>767){anime({targets:"#app",scale:0,rotate:"1turn",direction:"reverse",delay:0,duration:5e3}),anime({targets:"#svg-bgr path",strokeDashoffset:[anime.setDashoffset,0],easing:"easeInOutSine",duration:2e3,delay:function(e,t){return 200*t},direction:"alternate",autoplay:!0}),anime({targets:"#svg-bgr text",translateX:10,direction:"alternate",delay:300,duration:function(e,t,n){return 300*(t+1)},complete:function(e){anime({targets:"#svg-bgr text",opacity:0,delay:function(e,t){return 100*t}})}})}else document.getElementById("svg-bgr").style.display="none"}$(t).ready(n)}(window,document);
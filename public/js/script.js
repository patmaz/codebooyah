!function(t,e){function n(){function t(t){try{if(!Notification)return;if("granted"!==Notification.permission)Notification.requestPermission();else{var e=new Notification("Booyah!!!",{body:"Number of users has changed to: "+t});e.onclick=function(){i.click()}}}catch(t){console.error(t)}}var n,o=new EventSource("/sse"),i=$("#iss"),r=$("#long"),a=$("#lat"),s=$("#no"),c=$("#uptime"),l=$(".about"),u=0;try{Notification&&"granted"!==Notification.permission&&Notification.requestPermission()}catch(t){console.error(t)}if(l.on("click",function(t){$(t.target).hasClass("about")&&$(this).toggleClass("show")}),i.on("click",function(){i.toggleClass("active")}),$(e).on("click",".intro__link",function(){var t=$(this);t.addClass("clicked"),setTimeout(function(){t.removeClass("clicked"),window.location.href=t.attr("data-href")},400)}),"undefined"!==anime&&window.innerWidth>767){anime({targets:"#app",scale:0,rotate:"1turn",direction:"reverse",delay:0,duration:5e3}),anime({targets:"#svg-bgr path",strokeDashoffset:[anime.setDashoffset,0],easing:"easeInOutSine",duration:2e3,delay:function(t,e){return 200*e},direction:"alternate",autoplay:!0}),anime({targets:"#svg-bgr text",translateX:10,direction:"alternate",delay:300,duration:function(t,e,n){return 300*(e+1)},complete:function(t){anime({targets:"#svg-bgr text",opacity:0,delay:function(t,e){return 100*e}})}})}else document.getElementById("svg-bgr").style.display="none";o.onopen=function(){console.log("Opened SSE connection")},o.onerror=function(t){a.text("error"),r.text("error"),s.text("error"),c.text("error")},o.onmessage=function(e){u++;var o=JSON.parse(e.data);a.text(o[0].latitude),r.text(o[0].longitude),s.text(o[1]),c.text(o[2]),1===u&&(n=o[1]),n!==o[1]&&(n=o[1],t(o[1]))},o.onclose=function(t,e){console.log(t,e)},window.addEventListener("beforeunload",function(){o.close()})}$(e).ready(n)}(window,document);
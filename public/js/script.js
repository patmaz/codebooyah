!function(t,o){function e(){function t(t){try{if(!Notification)return;if("granted"!==Notification.permission)Notification.requestPermission();else{var o=new Notification("Booyah!!!",{body:"Number of users has changed to: "+t});o.onclick=function(){i.click()}}}catch(t){console.error(t)}}var e,n=new EventSource("/sse"),i=$("#iss"),c=$("#long"),r=$("#lat"),a=$("#no"),s=$("#uptime"),l=$(".about"),u=0;try{Notification&&"granted"!==Notification.permission&&Notification.requestPermission()}catch(t){console.error(t)}l.on("click",function(t){$(t.target).hasClass("about")&&$(this).toggleClass("show")}),i.on("click",function(){i.toggleClass("active")}),$(o).on("click",".intro__link",function(t){var o=$(this);o.addClass("clicked"),$(t.target).hasClass("repo")||(o.attr("data-href")?setTimeout(function(){o.removeClass("clicked"),window.location.href=o.attr("data-href")},400):o.attr("data-click")&&setTimeout(function(){o.removeClass("clicked"),$("#"+o.attr("data-click")).click()},400))}),n.onopen=function(){console.log("Opened SSE connection")},n.onerror=function(t){r.text("error"),c.text("error"),a.text("error"),s.text("error")},n.onmessage=function(o){u++;var n=JSON.parse(o.data);r.text(n[0].latitude),c.text(n[0].longitude),a.text(n[1]),s.text(n[2]),1===u&&(e=n[1]),e!==n[1]&&(e=n[1],t(n[1]))},n.onclose=function(t,o){console.log(t,o)},window.addEventListener("beforeunload",function(){n.close()})}$(o).ready(e)}(window,document);
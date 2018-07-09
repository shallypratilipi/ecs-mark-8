var serviceWorkerOption = {
  "assets": [
    "/static/js/0.970a506c4b39c568e7b3.js",
    "/static/js/1.e8a288f5aac61bf4f018.js",
    "/static/js/2.98bb839696484c730a06.js",
    "/static/js/3.85240ca764d50607cce5.js",
    "/static/js/4.b45524975623ce72be2f.js",
    "/static/js/5.ef0d5e0097163ce63ffb.js",
    "/static/js/6.bc690522fa0f642f382f.js",
    "/static/js/7.17c6b56f8c470108c5e2.js",
    "/static/js/8.7c62852c85e0f7289a1e.js",
    "/static/js/9.c190ed07abc87103369b.js",
    "/static/js/10.ab4b5be0fe3603208a93.js",
    "/static/js/app.e28c8607494455801355.js",
    "/static/js/vendor.e79eb4334d5dd4194b37.js",
    "/static/js/manifest.e4648670cb67abcdb5e3.js",
    "/static/css/app.93da238171fd4a217fc5d1278b69f156.css"
  ]
};
        
        !function(t){var i={};function n(o){if(i[o])return i[o].exports;var e=i[o]={i:o,l:!1,exports:{}};return t[o].call(e.exports,e,e.exports,n),e.l=!0,e.exports}n.m=t,n.c=i,n.d=function(t,i,o){n.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:o})},n.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(i,"a",i),i},n.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},n.p="/",n(n.s="3gGW")}({"3gGW":function(t,i,n){"use strict";self.addEventListener("push",function(t){var i=t.data&&t.data.json();if(i){var n={badge:"https://storage.googleapis.com/public.pratilipi.com/pratilipi-logo/png/ic_launcher.png",requireInteraction:!0,body:i.summary,icon:"https://storage.googleapis.com/public.pratilipi.com/pratilipi-logo/png/Logo-2C-RGB-200px.png",data:i};t.waitUntil(self.registration.showNotification(i.displayTitle,n))}}),self.addEventListener("notificationclick",function(t){t.notification.close(),t.waitUntil(clients.openWindow(t.notification.data.pageUrl))})}});
//# sourceMappingURL=sw.js.map
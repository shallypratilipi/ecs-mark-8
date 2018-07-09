var serviceWorkerOption = {
  "assets": [
    "/static/js/0.2b525f2294f32d99d05d.js",
    "/static/js/1.e8a288f5aac61bf4f018.js",
    "/static/js/2.d4d4deb254bb21de7f55.js",
    "/static/js/3.3680b20a023750780f5f.js",
    "/static/js/4.7adb6827766c5729fcd7.js",
    "/static/js/5.b1d7250accd3efa19b5c.js",
    "/static/js/6.28cd1a11b561cfe5a1a2.js",
    "/static/js/7.41192ba4ae37496579ae.js",
    "/static/js/8.dc0e13cb6c89018a8835.js",
    "/static/js/9.6a7309dae96972fbcca6.js",
    "/static/js/10.ab4b5be0fe3603208a93.js",
    "/static/js/app.326e210b37652b5f7966.js",
    "/static/js/vendor.6b7c4efc708d012d82e7.js",
    "/static/js/manifest.6c69b543e3b6d397cf5e.js",
    "/static/css/app.a1e9fb267ad0ef8dbe280a6d4c714bd7.css"
  ]
};
        
        !function(t){var i={};function n(o){if(i[o])return i[o].exports;var e=i[o]={i:o,l:!1,exports:{}};return t[o].call(e.exports,e,e.exports,n),e.l=!0,e.exports}n.m=t,n.c=i,n.d=function(t,i,o){n.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:o})},n.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(i,"a",i),i},n.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},n.p="/",n(n.s="3gGW")}({"3gGW":function(t,i,n){"use strict";self.addEventListener("push",function(t){var i=t.data&&t.data.json();if(i){var n={badge:"https://storage.googleapis.com/public.pratilipi.com/pratilipi-logo/png/ic_launcher.png",requireInteraction:!0,body:i.summary,icon:"https://storage.googleapis.com/public.pratilipi.com/pratilipi-logo/png/Logo-2C-RGB-200px.png",data:i};t.waitUntil(self.registration.showNotification(i.displayTitle,n))}}),self.addEventListener("notificationclick",function(t){t.notification.close(),t.waitUntil(clients.openWindow(t.notification.data.pageUrl))})}});
//# sourceMappingURL=sw.js.map
var serviceWorkerOption = {
  "assets": [
    "/static/js/0.7d7a49db03900530e192.js",
    "/static/js/1.e8a288f5aac61bf4f018.js",
    "/static/js/2.c256162fcaefd7374214.js",
    "/static/js/3.79604c6899c326d92b64.js",
    "/static/js/4.07f515445401c4812bac.js",
    "/static/js/5.09fbea5a96d1fd3f10e8.js",
    "/static/js/6.81de2db16fdae52e1084.js",
    "/static/js/7.64d4a2c143e729c1bf57.js",
    "/static/js/8.9abd58f22f01ccde28ca.js",
    "/static/js/9.a96c2c7a74420149c084.js",
    "/static/js/10.ab4b5be0fe3603208a93.js",
    "/static/js/app.215ac9b7751f6d432ee8.js",
    "/static/js/vendor.314b4181eb29db8e9c0d.js",
    "/static/js/manifest.06d4710e944b54b7f173.js",
    "/static/css/app.c4a988ffb5b3856e996190fe94cbfb55.css"
  ]
};
        
        !function(t){var i={};function n(o){if(i[o])return i[o].exports;var e=i[o]={i:o,l:!1,exports:{}};return t[o].call(e.exports,e,e.exports,n),e.l=!0,e.exports}n.m=t,n.c=i,n.d=function(t,i,o){n.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:o})},n.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(i,"a",i),i},n.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},n.p="/",n(n.s="3gGW")}({"3gGW":function(t,i,n){"use strict";self.addEventListener("push",function(t){var i=t.data&&t.data.json();if(i){var n={badge:"https://storage.googleapis.com/public.pratilipi.com/pratilipi-logo/png/ic_launcher.png",requireInteraction:!0,body:i.summary,icon:"https://storage.googleapis.com/public.pratilipi.com/pratilipi-logo/png/Logo-2C-RGB-200px.png",data:i};t.waitUntil(self.registration.showNotification(i.displayTitle,n))}}),self.addEventListener("notificationclick",function(t){t.notification.close(),t.waitUntil(clients.openWindow(t.notification.data.pageUrl))})}});
//# sourceMappingURL=sw.js.map
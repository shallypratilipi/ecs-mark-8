var serviceWorkerOption = {
  "assets": [
    "/static/js/0.790dd80c47afa5cecc83.js",
    "/static/js/1.e8a288f5aac61bf4f018.js",
    "/static/js/2.2779b8660b1bf2511f24.js",
    "/static/js/3.ac124237f8a147114f30.js",
    "/static/js/4.612ec962442c00a5f4dd.js",
    "/static/js/5.5948f11da38e62a32ae6.js",
    "/static/js/6.12beca689949cf4c489e.js",
    "/static/js/7.738a37beea6ebc9c7fad.js",
    "/static/js/8.5d998a5bb0d4ed7cf73e.js",
    "/static/js/9.90142af4375b9a1d43a9.js",
    "/static/js/10.ab4b5be0fe3603208a93.js",
    "/static/js/app.d5397f354723fb3ed0df.js",
    "/static/js/vendor.7e98e7503c1048df8a8d.js",
    "/static/js/manifest.1a1ecf3db43deab24365.js",
    "/static/css/app.59c9922ef36220aa1ebdf77bfc27d150.css"
  ]
};
        
        !function(t){var i={};function n(o){if(i[o])return i[o].exports;var e=i[o]={i:o,l:!1,exports:{}};return t[o].call(e.exports,e,e.exports,n),e.l=!0,e.exports}n.m=t,n.c=i,n.d=function(t,i,o){n.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:o})},n.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(i,"a",i),i},n.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},n.p="/",n(n.s="3gGW")}({"3gGW":function(t,i,n){"use strict";self.addEventListener("push",function(t){var i=t.data&&t.data.json();if(i){var n={badge:"https://storage.googleapis.com/public.pratilipi.com/pratilipi-logo/png/ic_launcher.png",requireInteraction:!0,body:i.summary,icon:"https://storage.googleapis.com/public.pratilipi.com/pratilipi-logo/png/Logo-2C-RGB-200px.png",data:i};t.waitUntil(self.registration.showNotification(i.displayTitle,n))}}),self.addEventListener("notificationclick",function(t){t.notification.close(),t.waitUntil(clients.openWindow(t.notification.data.pageUrl))})}});
//# sourceMappingURL=sw.js.map
var serviceWorkerOption = {
  "assets": [
    "/static/js/0.2ce1954ca905c5acdf2c.js",
    "/static/js/1.e8a288f5aac61bf4f018.js",
    "/static/js/2.29de1402bac0ce4c8b78.js",
    "/static/js/3.b87cf85b1ed0a97c92c9.js",
    "/static/js/4.71713a77320626795d1d.js",
    "/static/js/5.5a2946e5c0c2a4f6035a.js",
    "/static/js/6.a602a82bfd9dbb5812f6.js",
    "/static/js/7.95c18684fa870fa7a087.js",
    "/static/js/8.40633625e256906add2d.js",
    "/static/js/9.5426ee7cfb01f2b844ad.js",
    "/static/js/10.ab4b5be0fe3603208a93.js",
    "/static/js/app.e6c4c1f906f066c97723.js",
    "/static/js/vendor.e21a85e3003d0d9aa88c.js",
    "/static/js/manifest.f7a9054c4c9c7116910d.js",
    "/static/css/app.c93eaa007b34d44890b86114753d851e.css"
  ]
};
        
        !function(t){var i={};function n(o){if(i[o])return i[o].exports;var e=i[o]={i:o,l:!1,exports:{}};return t[o].call(e.exports,e,e.exports,n),e.l=!0,e.exports}n.m=t,n.c=i,n.d=function(t,i,o){n.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:o})},n.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(i,"a",i),i},n.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},n.p="/",n(n.s="3gGW")}({"3gGW":function(t,i,n){"use strict";self.addEventListener("push",function(t){var i=t.data&&t.data.json();if(i){var n={badge:"https://storage.googleapis.com/public.pratilipi.com/pratilipi-logo/png/ic_launcher.png",requireInteraction:!0,body:i.summary,icon:"https://storage.googleapis.com/public.pratilipi.com/pratilipi-logo/png/Logo-2C-RGB-200px.png",data:i};t.waitUntil(self.registration.showNotification(i.displayTitle,n))}}),self.addEventListener("notificationclick",function(t){t.notification.close(),t.waitUntil(clients.openWindow(t.notification.data.pageUrl))})}});
//# sourceMappingURL=sw.js.map
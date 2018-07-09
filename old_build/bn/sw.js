var serviceWorkerOption = {
  "assets": [
    "/static/js/0.40e6a69750951738e722.js",
    "/static/js/1.e8a288f5aac61bf4f018.js",
    "/static/js/2.f5958d6b2a48c475b762.js",
    "/static/js/3.1e2e2bcb06099f07ba03.js",
    "/static/js/4.317b0c5e450d24d4b118.js",
    "/static/js/5.1c828bf10e4224d4432f.js",
    "/static/js/6.811e54dbc1200f1be6f7.js",
    "/static/js/7.2ca2f238e98683990e04.js",
    "/static/js/8.d3cca8c1c9bfdc619a34.js",
    "/static/js/9.ee6948a3cab1056dfb28.js",
    "/static/js/10.ab4b5be0fe3603208a93.js",
    "/static/js/app.069a8eb2121891d4d745.js",
    "/static/js/vendor.1f9db00c861ecac66be8.js",
    "/static/js/manifest.88020d0a12f4a04e8974.js",
    "/static/css/app.2e0b593554fe5ec0d4875e14c6e7ba6f.css"
  ]
};
        
        !function(t){var i={};function n(o){if(i[o])return i[o].exports;var e=i[o]={i:o,l:!1,exports:{}};return t[o].call(e.exports,e,e.exports,n),e.l=!0,e.exports}n.m=t,n.c=i,n.d=function(t,i,o){n.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:o})},n.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(i,"a",i),i},n.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},n.p="/",n(n.s="3gGW")}({"3gGW":function(t,i,n){"use strict";self.addEventListener("push",function(t){var i=t.data&&t.data.json();if(i){var n={badge:"https://storage.googleapis.com/public.pratilipi.com/pratilipi-logo/png/ic_launcher.png",requireInteraction:!0,body:i.summary,icon:"https://storage.googleapis.com/public.pratilipi.com/pratilipi-logo/png/Logo-2C-RGB-200px.png",data:i};t.waitUntil(self.registration.showNotification(i.displayTitle,n))}}),self.addEventListener("notificationclick",function(t){t.notification.close(),t.waitUntil(clients.openWindow(t.notification.data.pageUrl))})}});
//# sourceMappingURL=sw.js.map
var serviceWorkerOption = {
  "assets": [
    "/static/js/0.f3be2f16a0e86e3cd33d.js",
    "/static/js/1.e8a288f5aac61bf4f018.js",
    "/static/js/2.7873730671e825a617ec.js",
    "/static/js/3.309c20a409f312f9807f.js",
    "/static/js/4.5eedd0281d7ea343d76e.js",
    "/static/js/5.8c9ae1965d2c630ab872.js",
    "/static/js/6.963b7baba5673ee44ad1.js",
    "/static/js/7.5df539fa280f2189e59c.js",
    "/static/js/8.a3933696162f2d05aabe.js",
    "/static/js/9.df0d05684fd3c1b93eaa.js",
    "/static/js/10.ab4b5be0fe3603208a93.js",
    "/static/js/app.34133ac0d42fc01da905.js",
    "/static/js/vendor.07dae4973167196fad54.js",
    "/static/js/manifest.f6f24c2a9404fdaa1c58.js",
    "/static/css/app.171c61196b4daf785bdd43b1a34e4d6c.css"
  ]
};
        
        !function(t){var i={};function n(o){if(i[o])return i[o].exports;var e=i[o]={i:o,l:!1,exports:{}};return t[o].call(e.exports,e,e.exports,n),e.l=!0,e.exports}n.m=t,n.c=i,n.d=function(t,i,o){n.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:o})},n.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(i,"a",i),i},n.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},n.p="/",n(n.s="3gGW")}({"3gGW":function(t,i,n){"use strict";self.addEventListener("push",function(t){var i=t.data&&t.data.json();if(i){var n={badge:"https://storage.googleapis.com/public.pratilipi.com/pratilipi-logo/png/ic_launcher.png",requireInteraction:!0,body:i.summary,icon:"https://storage.googleapis.com/public.pratilipi.com/pratilipi-logo/png/Logo-2C-RGB-200px.png",data:i};t.waitUntil(self.registration.showNotification(i.displayTitle,n))}}),self.addEventListener("notificationclick",function(t){t.notification.close(),t.waitUntil(clients.openWindow(t.notification.data.pageUrl))})}});
//# sourceMappingURL=sw.js.map
var serviceWorkerOption = {
  "assets": [
    "/static/js/app.8e143f7380356fee5898.js",
    "/static/js/vendor.4b584befd53755e81a12.js",
    "/static/js/manifest.2ae2e69a05c33dfc65f8.js",
    "/static/css/app.bffc028b7dcd11b5ab0fe5f74d972a55.css"
  ]
};
        
        !function(t){var i={};function n(o){if(i[o])return i[o].exports;var e=i[o]={i:o,l:!1,exports:{}};return t[o].call(e.exports,e,e.exports,n),e.l=!0,e.exports}n.m=t,n.c=i,n.d=function(t,i,o){n.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:o})},n.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(i,"a",i),i},n.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},n.p="/",n(n.s="3gGW")}({"3gGW":function(t,i,n){"use strict";self.addEventListener("push",function(t){var i=t.data&&t.data.json();if(i){var n={badge:"https://storage.googleapis.com/public.pratilipi.com/pratilipi-logo/png/ic_launcher.png",requireInteraction:!0,body:i.summary,icon:"https://storage.googleapis.com/public.pratilipi.com/pratilipi-logo/png/Logo-2C-RGB-200px.png",data:i};t.waitUntil(self.registration.showNotification(i.displayTitle,n))}}),self.addEventListener("notificationclick",function(t){t.notification.close(),t.waitUntil(clients.openWindow(t.notification.data.pageUrl))})}});
//# sourceMappingURL=sw.js.map
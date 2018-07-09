var serviceWorkerOption = {
  "assets": [
    "/static/js/0.d79de393307b3892a7a2.js",
    "/static/js/1.e8a288f5aac61bf4f018.js",
    "/static/js/2.888e9a9579504e0256ff.js",
    "/static/js/3.15c56b0d66afe33f9a21.js",
    "/static/js/4.30fa76e15e8fae0420cd.js",
    "/static/js/5.94b087a06e65de3ba858.js",
    "/static/js/6.0f7a96491505ed8edb3b.js",
    "/static/js/7.a43d330608d8fd42aba0.js",
    "/static/js/8.18a376b966aba176341b.js",
    "/static/js/9.e599ad0de644157ce38e.js",
    "/static/js/10.ab4b5be0fe3603208a93.js",
    "/static/js/app.3caf1c48ae41dffc59d4.js",
    "/static/js/vendor.b36e4d2ff74f983628be.js",
    "/static/js/manifest.b480e57cf0835d5329d7.js",
    "/static/css/app.bb8e78264c601108eec9e25167861ceb.css"
  ]
};
        
        !function(t){var i={};function n(o){if(i[o])return i[o].exports;var e=i[o]={i:o,l:!1,exports:{}};return t[o].call(e.exports,e,e.exports,n),e.l=!0,e.exports}n.m=t,n.c=i,n.d=function(t,i,o){n.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:o})},n.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(i,"a",i),i},n.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},n.p="/",n(n.s="3gGW")}({"3gGW":function(t,i,n){"use strict";self.addEventListener("push",function(t){var i=t.data&&t.data.json();if(i){var n={badge:"https://storage.googleapis.com/public.pratilipi.com/pratilipi-logo/png/ic_launcher.png",requireInteraction:!0,body:i.summary,icon:"https://storage.googleapis.com/public.pratilipi.com/pratilipi-logo/png/Logo-2C-RGB-200px.png",data:i};t.waitUntil(self.registration.showNotification(i.displayTitle,n))}}),self.addEventListener("notificationclick",function(t){t.notification.close(),t.waitUntil(clients.openWindow(t.notification.data.pageUrl))})}});
//# sourceMappingURL=sw.js.map
!function(){function e(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var n=function(){function n(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n)}var t,a,r;return t=n,(a=[{key:"start",value:function(){setInterval((function(){console.log("playing game...")}),500)}}])&&e(t.prototype,a),r&&e(t,r),n}();function t(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var a=function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),this.draw(),this.prepareGame()}var a,r,o;return a=e,(r=[{key:"draw",value:function(){var e=document.createElement("canvas");e.setAttribute("width","500"),e.setAttribute("height","750"),document.getElementById("app").appendChild(e)}},{key:"prepareGame",value:function(){var e=this;this.game=null,document.addEventListener("keypress",(function(){e.game||(e.game=new n,e.game.start())}))}}])&&t(a.prototype,r),o&&t(a,o),e}();window.onload=function(){return new a}}();
//# sourceMappingURL=ts.c84d365c.js.map

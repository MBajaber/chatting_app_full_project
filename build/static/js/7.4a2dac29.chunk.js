(this["webpackJsonpchat-msg"]=this["webpackJsonpchat-msg"]||[]).push([[7],{105:function(e,t,n){"use strict";n.r(t);var i=n(75),c=n.n(i),a=n(36),s=n(77),o=(n(2),n(78),n(109)),r=n(20),u=n(21),l=n(17),h=n(23),p=n(4);t.default=function(){var e=Object(l.b)(),t=function(){var t=Object(s.a)(c.a.mark((function t(){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r.a.signInWithPopup(r.c).then((function(e){var t=e.user;return r.b.collection("users").doc(t.uid).set({name:t.displayName,photoURL:t.photoURL,isOnline:!0,email:t.email,time:h.a.firestore.FieldValue.serverTimestamp(),uid:t.uid}),t})).then((function(t){e(Object(u.d)(Object(a.a)({uid:t.uid,email:t.email,displayName:t.displayName,photoURL:t.photoURL},"uid",t.uid)))})).then((function(){r.b.collection("users").onSnapshot((function(t){var n=[];t.forEach((function(e){return n.push(e.data())})),e(Object(u.c)(n))}))})).catch((function(e){return alert(e.message)}));case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(p.jsx)("div",{className:"login",children:Object(p.jsx)("div",{className:"login_btn",children:Object(p.jsxs)(o.a,{onClick:t,children:[Object(p.jsx)("span",{className:"text",children:"sign in with"}),Object(p.jsx)("img",{src:"google.png",alt:"google icon"})]})})})}},78:function(e,t,n){}}]);
//# sourceMappingURL=7.4a2dac29.chunk.js.map
(this["webpackJsonpapp-user"]=this["webpackJsonpapp-user"]||[]).push([[0],[,,,,,,,,,,,,,,function(e,t,n){},,function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(3),c=n.n(r),a=n(8),s=n.n(a),i=(n(14),n(1)),l=n.n(i),o=n(4),u=n(5),d=(n(16),n.p+"static/media/spring-2021-northern-hemisphere-6753651837108891-law.d2dd3ce3.gif"),j=n(0);function p(e){e.children;return Object(j.jsx)("img",{src:d,alt:"Happy Spring! Google Doodle"})}n(18);function b(e){var t=e.children,n=e.className,r=e.onClick,c=e.type,a=e.id;return Object(j.jsx)("button",{className:"button ".concat(n),onClick:r,type:c,id:a,children:t})}var h=n(2),m=(n(19),n.p+"static/media/pass.27a9fef8.svg");function f(e){e.children;return Object(j.jsx)("img",{src:m,alt:"Yes"})}n(20);function O(e){var t=e.children;return Object(j.jsx)("div",{className:"field",children:t})}var x=n.p+"static/media/fail.089e651e.svg";function v(e){e.children;return Object(j.jsx)("img",{src:x,alt:"No"})}var w=n(9),y="https://"+window.location.host;window.location.host.indexOf("localhost")>-1&&(y="https://localhost:1313");var N={get:function(e){return g.apply(this,arguments)},post:function(e,t){return k.apply(this,arguments)},delete:function(e,t){return _.apply(this,arguments)}};function g(){return(g=Object(o.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(y+t,Object(h.a)({},{headers:{Accept:"application/json","Content-Type":"application/json"},method:"GET",mode:"cors",credentials:"include"}));case 2:if(!S(n=e.sent)){e.next=5;break}return e.abrupt("return");case 5:return e.next=7,C(n);case 7:return e.abrupt("return",e.sent);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function k(){return(k=Object(o.a)(l.a.mark((function e(t,n){var r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(y+t,Object(h.a)(Object(h.a)({},{headers:{Accept:"application/json","Content-Type":"application/json"},method:"GET",mode:"cors",credentials:"include"}),{},{method:"POST",body:JSON.stringify(n||{})}));case 2:if(!S(r=e.sent)){e.next=5;break}return e.abrupt("return");case 5:return e.next=7,C(r);case 7:return e.abrupt("return",e.sent);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function _(){return(_=Object(o.a)(l.a.mark((function e(t,n){var r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(y+t,Object(h.a)(Object(h.a)({},{headers:{Accept:"application/json","Content-Type":"application/json"},method:"GET",mode:"cors",credentials:"include"}),{},{method:"DELETE",body:JSON.stringify(n||{})}));case 2:if(!S(r=e.sent)){e.next=5;break}return e.abrupt("return");case 5:return e.next=7,C(r);case 7:return e.abrupt("return",e.sent);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function S(e){var t,n=!1,r=Object(w.a)(e.headers.entries());try{for(r.s();!(t=r.n()).done;){var c=t.value;if("location"===c[0]){window.location.href=c[1],n=!0;break}}}catch(a){r.e(a)}finally{r.f()}if(200===e.status)return n;console.error("Looks like there was a problem. Status Code: "+e.status)}function C(e){return T.apply(this,arguments)}function T(){return(T=Object(o.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.json().catch((function(e){console.error("e",e)}));case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function E(e){e.children;var t=e.onSuccess,n=Object(r.useState)(null),c=Object(u.a)(n,2),a=c[0],s=c[1],i=Object(r.useState)(null),d=Object(u.a)(i,2),p=d[0],m=d[1];function x(){return(x=Object(o.a)(l.a.mark((function e(n){var r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.preventDefault(),!0!==w(a)){e.next=7;break}return e.next=5,N.post("/api/v1/user",a);case 5:r=e.sent,t(r);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function w(e){m(null);var t=function(e){if(!e)return{};var t=null;if(["fullname","email","password","passwordRepeat"].every((function(n){return!e||null!==e[n]&&void 0!==e[n]&&""!==e[n]||((t=t||{})[n]="Please enter ".concat(n,".")),!0})),t)return t;return!0}(e);return!0===t?t:(m(Object(h.a)(Object(h.a)({},p),t)),p)}function y(e){var t=Object(h.a)({},a);t[e.target.name]=e.target.value,s(t),w(a)}return Object(j.jsxs)("form",{onSubmit:function(e){return x.apply(this,arguments)},children:[Object(j.jsxs)(O,{children:[Object(j.jsx)("div",{className:"wrapper_inner__field",children:Object(j.jsx)("input",{className:"input",type:"text",name:"fullname",id:"create_fullname",onChange:y,placeholder:"Full Name"})}),p&&p.fullname&&Object(j.jsx)("small",{className:"error",children:p.fullname})]}),Object(j.jsxs)(O,{children:[Object(j.jsx)("div",{className:"wrapper_inner__field",children:Object(j.jsx)("input",{className:"input",type:"email",id:"create_email",name:"email",onChange:y,placeholder:"Email"})}),p&&p.email&&Object(j.jsx)("small",{className:"error",children:p.email})]}),Object(j.jsxs)(O,{children:[Object(j.jsx)("div",{className:"wrapper_inner__field",children:Object(j.jsx)("input",{className:"input",type:"password",name:"password",id:"create_password",onChange:y,placeholder:"Password"})}),p&&p.password&&Object(j.jsx)("small",{className:"error",children:p.password})]}),Object(j.jsxs)(O,{children:[Object(j.jsx)("div",{className:"wrapper_inner__field",children:Object(j.jsx)("input",{className:"input",type:"password",name:"passwordRepeat",id:"create_passwordRepeat",onChange:y,placeholder:"Repeat Password"})}),p&&p.passwordRepeat&&Object(j.jsx)("small",{className:"error",children:p.passwordRepeat})]}),Object(j.jsxs)("ul",{className:"list_requirements",children:[Object(j.jsxs)("li",{children:[Object(j.jsx)(f,{})," Minimum 8 characters"]}),Object(j.jsxs)("li",{children:[Object(j.jsx)(v,{})," At least one number."]}),Object(j.jsxs)("li",{children:[Object(j.jsx)(v,{})," At least one characters"]})]}),Object(j.jsx)(b,{className:"button--filled button--block",type:"submit",id:"register",children:"REGISTER"})]})}n(21);function R(e){e.children;var t=e.onSuccess,n=Object(r.useState)(null),c=Object(u.a)(n,2),a=c[0],s=c[1],i=Object(r.useState)(null),d=Object(u.a)(i,2),p=d[0],m=d[1];function f(){return(f=Object(o.a)(l.a.mark((function e(n){var r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.preventDefault(),!0!==x(a)){e.next=7;break}return e.next=5,N.post("/api/v1/session",a);case 5:(r=e.sent)&&!r.error&&t(r);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function x(e){m(null);var t=function(e){if(!e)return{};var t=null;if(["email","password"].every((function(n){return!e||null!==e[n]&&void 0!==e[n]&&""!==e[n]||((t=t||{})[n]="Please enter ".concat(n,".")),!0})),t)return t;return!0}(e);return!0===t?t:(m(Object(h.a)(Object(h.a)({},p),t)),p)}function v(e){var t=Object(h.a)({},a);t[e.target.name]=e.target.value,s(t),x(a)}return Object(j.jsxs)("form",{onSubmit:function(e){return f.apply(this,arguments)},children:[Object(j.jsxs)(O,{children:[Object(j.jsx)("div",{className:"wrapper_inner__field",children:Object(j.jsx)("input",{className:"input",type:"email",id:"login_email",name:"email",onChange:v,placeholder:"Email"})}),p&&p.email&&Object(j.jsx)("small",{className:"error",children:p.email})]}),Object(j.jsxs)(O,{children:[Object(j.jsx)("div",{className:"wrapper_inner__field",children:Object(j.jsx)("input",{className:"input",id:"login_password",type:"password",name:"password",onChange:v,placeholder:"Password"})}),p&&p.password&&Object(j.jsx)("small",{className:"error",children:p.password})]}),Object(j.jsx)(b,{className:"button--filled button--block",type:"submit",id:"login",children:"LOGIN"})]})}function G(){var e=Object(r.useState)({}),t=Object(u.a)(e,2),n=t[0],c=t[1];return Object(j.jsxs)("div",{className:"app",children:[Object(j.jsxs)("ul",{className:"nav",children:[Object(j.jsx)("li",{children:Object(j.jsx)("button",{onClick:d,children:"Register (1)"})}),Object(j.jsx)("li",{children:Object(j.jsx)("button",{id:"nav_login",onClick:i,children:"Login (2)"})}),Object(j.jsx)("li",{children:Object(j.jsx)("button",{onClick:h,children:" (3)"})}),Object(j.jsx)("li",{children:Object(j.jsx)("button",{onClick:function(){var e=document.querySelector(".rec-prism");e&&(e.style.transform="translateZ(-100px) rotateY( 90deg)")},children:"(4)"})}),Object(j.jsx)("li",{children:Object(j.jsx)("button",{onClick:function(){var e=document.querySelector(".rec-prism");e&&(e.style.transform="translateZ(-100px) rotateX( -90deg)")},children:"Happy Spring (Top)"})}),Object(j.jsx)("li",{children:Object(j.jsx)("button",{onClick:m,children:"(Bottom)"})})]}),Object(j.jsx)("div",{className:"wrapper",children:Object(j.jsxs)("div",{className:"rec-prism",children:[Object(j.jsx)("div",{className:"face face-top",children:Object(j.jsxs)("div",{className:"content text--center",children:[Object(j.jsx)(p,{}),Object(j.jsx)("h2",{children:"Happy Spring!!!"}),Object(j.jsx)("h2",{children:"Fr\xf6hlichen Fr\xfchling!!!"})]})}),Object(j.jsx)("div",{className:"face face-front",children:Object(j.jsxs)("div",{className:"content",children:[Object(j.jsx)("h1",{children:"Create an Account"}),Object(j.jsx)(E,{onSuccess:s}),Object(j.jsx)("div",{className:"wrapper_nav",children:Object(j.jsx)(b,{onClick:i,className:"button--nav",children:"LOGIN"})})]})}),Object(j.jsx)("div",{className:"face face-back",children:Object(j.jsxs)("div",{className:"content",children:[Object(j.jsxs)("h1",{id:"message_welcome",children:["Welcome ",n&&n.fullname,"!"]}),Object(j.jsxs)("p",{children:["To logout click ",Object(j.jsx)("button",{id:"logout",onClick:function(){return a.apply(this,arguments)},children:"here"}),"."]})]})}),Object(j.jsx)("div",{className:"face face-right",children:Object(j.jsxs)("div",{className:"content",children:[Object(j.jsx)("h1",{children:"Login"}),Object(j.jsx)(R,{onSuccess:s}),Object(j.jsx)("div",{className:"wrapper_nav wrapper_nav--left",children:Object(j.jsx)(b,{className:"button--block",onClick:d,children:"REGISTER"})})]})}),Object(j.jsx)("div",{className:"face face-left",children:Object(j.jsx)("div",{className:"content",children:Object(j.jsx)("iframe",{width:"270",src:"https://www.youtube.com/embed/hFZFjoX2cGg",title:"YouTube video player",frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0})})}),Object(j.jsx)("div",{className:"face face-bottom",children:Object(j.jsx)("div",{className:"content",children:Object(j.jsxs)("div",{className:"thank-you-msg",children:[Object(j.jsx)("p",{children:"Thank you! You've logged out successfuly. Have a nice day! :-)"}),Object(j.jsx)("a",{rel:"noopener",targe:"_blank",href:"https://codepen.io/nourabusoud/pen/BxJbjJ",children:"Inspiration"})]})})})]})})]});function a(){return(a=Object(o.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N.delete("/api/v1/session",n);case 2:(t=e.sent)&&!t.error&&(c(null),m());case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function s(e){c(e),h()}function i(){var e=document.querySelector(".rec-prism");e&&(e.style.transform="translateZ(-100px) rotateY( -90deg)")}function d(){var e=document.querySelector(".rec-prism");e&&(e.style.transform="translateZ(-100px)")}function h(){var e=document.querySelector(".rec-prism");e&&(e.style.transform="translateZ(-100px) rotateY( -180deg)")}function m(){var e=document.querySelector(".rec-prism");e&&(e.style.transform="translateZ(-100px) rotateX( 90deg)")}}s.a.render(Object(j.jsx)(c.a.StrictMode,{children:Object(j.jsx)(G,{})}),document.getElementById("root"))}],[[22,1,2]]]);
//# sourceMappingURL=main.39926c33.chunk.js.map
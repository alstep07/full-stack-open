(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{42:function(e,n,t){"use strict";t.r(n);var c=t(17),r=t.n(c),u=t(18),a=t(8),i=t(3),o=t(1),d=t(5),l=t.n(d),s="/api/persons",b=function(){return l.a.get(s).then((function(e){return e.data}))},j=function(e){return l.a.post(s,e).then((function(e){return e.data}))},f=function(e){var n="".concat(s,"/").concat(e);l.a.delete(n)},h=function(e,n){return l.a.put("".concat(s,"/").concat(e),n).then((function(e){return e.data}))},m=t(0),O=function(e){var n=e.value,t=e.eventHandler;return Object(m.jsxs)("div",{children:["filter shown with: ",Object(m.jsx)("input",{type:"text",value:n,onChange:t})]})},p=function(e){return Object(m.jsxs)("form",{onSubmit:e.handleSubmit,children:[Object(m.jsxs)("div",{children:["name: ",Object(m.jsx)("input",{type:"text",value:e.newName,onChange:e.handleNameInputChange,required:!0})]}),Object(m.jsxs)("div",{children:["number: ",Object(m.jsx)("input",{type:"tel",value:e.newNumber,onChange:e.handleNumberInputChange,required:!0})]}),Object(m.jsx)("div",{children:Object(m.jsx)("button",{type:"submit",children:"add"})})]})},v=function(e){var n=e.person,t=e.handleButtonClick;return Object(m.jsxs)("div",{children:[Object(m.jsxs)("p",{children:[n.name,": ",n.number]}),Object(m.jsx)("button",{onClick:function(){return t(n.id)},children:"delete"})]})},x=function(e){var n=e.message,t={color:{note:"#22cc44",error:"#cc2244"}[e.type],background:"#ddd",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10};return null===n?null:Object(m.jsx)("div",{style:t,children:n})},g=function(){var e=Object(o.useState)([]),n=Object(i.a)(e,2),t=n[0],c=n[1],r=Object(o.useState)(""),d=Object(i.a)(r,2),l=d[0],s=d[1],g=Object(o.useState)(""),w=Object(i.a)(g,2),C=w[0],y=w[1],S=Object(o.useState)(""),N=Object(i.a)(S,2),k=N[0],I=N[1],T=Object(o.useState)(null),B=Object(i.a)(T,2),D=B[0],q=B[1],E=Object(o.useState)(null),H=Object(i.a)(E,2),J=H[0],L=H[1],z=function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name,"?"))&&(f(e),c(t.filter((function(n){return n.id!==e}))),L("note"),q("Deleted ".concat(n.name)),setTimeout((function(){q(null)}),3e3))},A=t.filter((function(e){return e.name.toLowerCase().includes(k.toLowerCase())}));return Object(o.useEffect)((function(){b().then((function(e){return c(e)}))}),[]),Object(m.jsxs)("div",{children:[Object(m.jsx)("h2",{children:"Phonebook"}),Object(m.jsx)(x,{type:J,message:D}),Object(m.jsx)(O,{value:k,eventHandler:function(e){var n=e.target;I(n.value)}}),Object(m.jsx)("h2",{children:"add a new"}),Object(m.jsx)(p,{handleSubmit:function(e){e.preventDefault(),t.map((function(e){return e.name})).includes(l)?function(){if(window.confirm("".concat(l," is already added to phonebook, replace the old number with new one?"))){var e=t.find((function(e){return e.name===l})),n=Object(a.a)(Object(a.a)({},e),{},{number:C});h(e.id,n).then((function(n){c(t.map((function(t){return t.id===e.id?n:t}))),L("note"),q("".concat(n.name," number updated")),setTimeout((function(){return q(null)}),3e3)})).catch((function(){q("".concat(e.name," is already deleted")),L("error"),c(t.filter((function(n){return n.id!==e.id}))),setTimeout((function(){q(null)}),3e3)}))}}():j({name:l,number:C}).then((function(e){c([].concat(Object(u.a)(t),[e])),L("note"),q("Added ".concat(e.name)),setTimeout((function(){q(null)}),3e3)})).catch((function(e){q(e.response.data.error),L("error"),setTimeout((function(){q(null)}),3e3)})),s(""),y("")},handleNameInputChange:function(e){var n=e.target;s(n.value)},handleNumberInputChange:function(e){var n=e.target;y(n.value)},newName:l,newNumber:C}),Object(m.jsx)("h2",{children:"Numbers"}),A.map((function(e){return Object(m.jsx)(v,{handleButtonClick:z,person:e},e.id)}))]})};r.a.render(Object(m.jsx)(g,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.ad28f076.chunk.js.map
var Te=e=>{throw TypeError(e)};var ie=(e,t,r)=>t.has(e)||Te("Cannot "+r);var s=(e,t,r)=>(ie(e,t,"read from private field"),r?r.call(e):t.get(e)),k=(e,t,r)=>t.has(e)?Te("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),g=(e,t,r,a)=>(ie(e,t,"write to private field"),a?a.call(e,r):t.set(e,r),r),C=(e,t,r)=>(ie(e,t,"access private method"),r);import{$ as _e,a0 as Ge,q as De,p as ne,a1 as Xe,a2 as Ye,a3 as Ze,r as y,n as Je,j as w,i as M,c as $e,a as Re,a4 as we,f as et,g as Ne,s as A,O as u,m as J,x as T,Q as E,e as Qe,u as tt,M as Ee,v as ke,w as Se,d as rt,a5 as at,a6 as st,U as ot,V as le,a7 as it,a8 as Me,a9 as Ue,aa as nt,ab as lt,ac as ct,ad as je,Y as Ae,Z as ut}from"./index-DNNlEPgJ.js";import{a as dt,u as pt}from"./useThemeProps-CoVLpCch.js";const ft=_e(),ht=Ge(),bt=ft("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,t)=>t.root});function vt(e){return dt({props:e,name:"MuiStack",defaultTheme:ht})}function gt(e,t){const r=y.Children.toArray(e).filter(Boolean);return r.reduce((a,l,o)=>(a.push(l),o<r.length-1&&a.push(y.cloneElement(t,{key:`separator-${o}`})),a),[])}const yt=e=>({row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"})[e],Ct=({ownerState:e,theme:t})=>{let r={display:"flex",flexDirection:"column",...De({theme:t},ne({values:e.direction,breakpoints:t.breakpoints.values}),a=>({flexDirection:a}))};if(e.spacing){const a=Xe(t),l=Object.keys(t.breakpoints.values).reduce((i,h)=>((typeof e.spacing=="object"&&e.spacing[h]!=null||typeof e.direction=="object"&&e.direction[h]!=null)&&(i[h]=!0),i),{}),o=ne({values:e.direction,base:l}),n=ne({values:e.spacing,base:l});typeof o=="object"&&Object.keys(o).forEach((i,h,p)=>{if(!o[i]){const L=h>0?o[p[h-1]]:"column";o[i]=L}}),r=Ye(r,De({theme:t},n,(i,h)=>e.useFlexGap?{gap:we(a,i)}:{"& > :not(style):not(style)":{margin:0},"& > :not(style) ~ :not(style)":{[`margin${yt(h?o[h]:e.direction)}`]:we(a,i)}}))}return r=Ze(t.breakpoints,r),r};function mt(e={}){const{createStyledComponent:t=bt,useThemeProps:r=vt,componentName:a="MuiStack"}=e,l=()=>$e({root:["root"]},i=>Re(a,i),{}),o=t(Ct);return y.forwardRef(function(i,h){const p=r(i),m=Je(p),{component:L="div",direction:S="column",spacing:v=0,divider:$,children:R,className:j,useFlexGap:z=!1,...B}=m,q={direction:S,spacing:v,useFlexGap:z},ee=l();return w.jsx(o,{as:L,ownerState:q,ref:h,className:M(ee.root,j),...B,children:$?gt(R,$):R})})}const $t=et(w.jsx("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}),"Cancel");function Rt(e){return Re("MuiChip",e)}const c=Ne("MuiChip",["root","sizeSmall","sizeMedium","colorDefault","colorError","colorInfo","colorPrimary","colorSecondary","colorSuccess","colorWarning","disabled","clickable","clickableColorPrimary","clickableColorSecondary","deletable","deletableColorPrimary","deletableColorSecondary","outlined","filled","outlinedPrimary","outlinedSecondary","filledPrimary","filledSecondary","avatar","avatarSmall","avatarMedium","avatarColorPrimary","avatarColorSecondary","icon","iconSmall","iconMedium","iconColorPrimary","iconColorSecondary","label","labelSmall","labelMedium","deleteIcon","deleteIconSmall","deleteIconMedium","deleteIconColorPrimary","deleteIconColorSecondary","deleteIconOutlinedColorPrimary","deleteIconOutlinedColorSecondary","deleteIconFilledColorPrimary","deleteIconFilledColorSecondary","focusVisible"]),kt=e=>{const{classes:t,disabled:r,size:a,color:l,iconColor:o,onDelete:n,clickable:d,variant:i}=e,h={root:["root",i,r&&"disabled",`size${u(a)}`,`color${u(l)}`,d&&"clickable",d&&`clickableColor${u(l)}`,n&&"deletable",n&&`deletableColor${u(l)}`,`${i}${u(l)}`],label:["label",`label${u(a)}`],avatar:["avatar",`avatar${u(a)}`,`avatarColor${u(l)}`],icon:["icon",`icon${u(a)}`,`iconColor${u(o)}`],deleteIcon:["deleteIcon",`deleteIcon${u(a)}`,`deleteIconColor${u(l)}`,`deleteIcon${u(i)}Color${u(l)}`]};return $e(h,Rt,t)},St=A("div",{name:"MuiChip",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e,{color:a,iconColor:l,clickable:o,onDelete:n,size:d,variant:i}=r;return[{[`& .${c.avatar}`]:t.avatar},{[`& .${c.avatar}`]:t[`avatar${u(d)}`]},{[`& .${c.avatar}`]:t[`avatarColor${u(a)}`]},{[`& .${c.icon}`]:t.icon},{[`& .${c.icon}`]:t[`icon${u(d)}`]},{[`& .${c.icon}`]:t[`iconColor${u(l)}`]},{[`& .${c.deleteIcon}`]:t.deleteIcon},{[`& .${c.deleteIcon}`]:t[`deleteIcon${u(d)}`]},{[`& .${c.deleteIcon}`]:t[`deleteIconColor${u(a)}`]},{[`& .${c.deleteIcon}`]:t[`deleteIcon${u(i)}Color${u(a)}`]},t.root,t[`size${u(d)}`],t[`color${u(a)}`],o&&t.clickable,o&&a!=="default"&&t[`clickableColor${u(a)})`],n&&t.deletable,n&&a!=="default"&&t[`deletableColor${u(a)}`],t[i],t[`${i}${u(a)}`]]}})(J(({theme:e})=>{const t=e.palette.mode==="light"?e.palette.grey[700]:e.palette.grey[300];return{maxWidth:"100%",fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(13),display:"inline-flex",alignItems:"center",justifyContent:"center",height:32,color:(e.vars||e).palette.text.primary,backgroundColor:(e.vars||e).palette.action.selected,borderRadius:32/2,whiteSpace:"nowrap",transition:e.transitions.create(["background-color","box-shadow"]),cursor:"unset",outline:0,textDecoration:"none",border:0,padding:0,verticalAlign:"middle",boxSizing:"border-box",[`&.${c.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity,pointerEvents:"none"},[`& .${c.avatar}`]:{marginLeft:5,marginRight:-6,width:24,height:24,color:e.vars?e.vars.palette.Chip.defaultAvatarColor:t,fontSize:e.typography.pxToRem(12)},[`& .${c.avatarColorPrimary}`]:{color:(e.vars||e).palette.primary.contrastText,backgroundColor:(e.vars||e).palette.primary.dark},[`& .${c.avatarColorSecondary}`]:{color:(e.vars||e).palette.secondary.contrastText,backgroundColor:(e.vars||e).palette.secondary.dark},[`& .${c.avatarSmall}`]:{marginLeft:4,marginRight:-4,width:18,height:18,fontSize:e.typography.pxToRem(10)},[`& .${c.icon}`]:{marginLeft:5,marginRight:-6},[`& .${c.deleteIcon}`]:{WebkitTapHighlightColor:"transparent",color:e.vars?`rgba(${e.vars.palette.text.primaryChannel} / 0.26)`:T(e.palette.text.primary,.26),fontSize:22,cursor:"pointer",margin:"0 5px 0 -6px","&:hover":{color:e.vars?`rgba(${e.vars.palette.text.primaryChannel} / 0.4)`:T(e.palette.text.primary,.4)}},variants:[{props:{size:"small"},style:{height:24,[`& .${c.icon}`]:{fontSize:18,marginLeft:4,marginRight:-4},[`& .${c.deleteIcon}`]:{fontSize:16,marginRight:4,marginLeft:-4}}},...Object.entries(e.palette).filter(E(["contrastText"])).map(([r])=>({props:{color:r},style:{backgroundColor:(e.vars||e).palette[r].main,color:(e.vars||e).palette[r].contrastText,[`& .${c.deleteIcon}`]:{color:e.vars?`rgba(${e.vars.palette[r].contrastTextChannel} / 0.7)`:T(e.palette[r].contrastText,.7),"&:hover, &:active":{color:(e.vars||e).palette[r].contrastText}}}})),{props:r=>r.iconColor===r.color,style:{[`& .${c.icon}`]:{color:e.vars?e.vars.palette.Chip.defaultIconColor:t}}},{props:r=>r.iconColor===r.color&&r.color!=="default",style:{[`& .${c.icon}`]:{color:"inherit"}}},{props:{onDelete:!0},style:{[`&.${c.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:T(e.palette.action.selected,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}}},...Object.entries(e.palette).filter(E(["dark"])).map(([r])=>({props:{color:r,onDelete:!0},style:{[`&.${c.focusVisible}`]:{background:(e.vars||e).palette[r].dark}}})),{props:{clickable:!0},style:{userSelect:"none",WebkitTapHighlightColor:"transparent",cursor:"pointer","&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:T(e.palette.action.selected,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity)},[`&.${c.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:T(e.palette.action.selected,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)},"&:active":{boxShadow:(e.vars||e).shadows[1]}}},...Object.entries(e.palette).filter(E(["dark"])).map(([r])=>({props:{color:r,clickable:!0},style:{[`&:hover, &.${c.focusVisible}`]:{backgroundColor:(e.vars||e).palette[r].dark}}})),{props:{variant:"outlined"},style:{backgroundColor:"transparent",border:e.vars?`1px solid ${e.vars.palette.Chip.defaultBorder}`:`1px solid ${e.palette.mode==="light"?e.palette.grey[400]:e.palette.grey[700]}`,[`&.${c.clickable}:hover`]:{backgroundColor:(e.vars||e).palette.action.hover},[`&.${c.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`& .${c.avatar}`]:{marginLeft:4},[`& .${c.avatarSmall}`]:{marginLeft:2},[`& .${c.icon}`]:{marginLeft:4},[`& .${c.iconSmall}`]:{marginLeft:2},[`& .${c.deleteIcon}`]:{marginRight:5},[`& .${c.deleteIconSmall}`]:{marginRight:3}}},...Object.entries(e.palette).filter(E()).map(([r])=>({props:{variant:"outlined",color:r},style:{color:(e.vars||e).palette[r].main,border:`1px solid ${e.vars?`rgba(${e.vars.palette[r].mainChannel} / 0.7)`:T(e.palette[r].main,.7)}`,[`&.${c.clickable}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette[r].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:T(e.palette[r].main,e.palette.action.hoverOpacity)},[`&.${c.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette[r].mainChannel} / ${e.vars.palette.action.focusOpacity})`:T(e.palette[r].main,e.palette.action.focusOpacity)},[`& .${c.deleteIcon}`]:{color:e.vars?`rgba(${e.vars.palette[r].mainChannel} / 0.7)`:T(e.palette[r].main,.7),"&:hover, &:active":{color:(e.vars||e).palette[r].main}}}}))]}})),It=A("span",{name:"MuiChip",slot:"Label",overridesResolver:(e,t)=>{const{ownerState:r}=e,{size:a}=r;return[t.label,t[`label${u(a)}`]]}})({overflow:"hidden",textOverflow:"ellipsis",paddingLeft:12,paddingRight:12,whiteSpace:"nowrap",variants:[{props:{variant:"outlined"},style:{paddingLeft:11,paddingRight:11}},{props:{size:"small"},style:{paddingLeft:8,paddingRight:8}},{props:{size:"small",variant:"outlined"},style:{paddingLeft:7,paddingRight:7}}]});function ze(e){return e.key==="Backspace"||e.key==="Delete"}const Jt=y.forwardRef(function(t,r){const a=Qe({props:t,name:"MuiChip"}),{avatar:l,className:o,clickable:n,color:d="default",component:i,deleteIcon:h,disabled:p=!1,icon:m,label:L,onClick:S,onDelete:v,onKeyDown:$,onKeyUp:R,size:j="medium",variant:z="filled",tabIndex:B,skipFocusWhenDisabled:q=!1,...ee}=a,te=y.useRef(null),x=tt(te,r),K=O=>{O.stopPropagation(),v&&v(O)},re=O=>{O.currentTarget===O.target&&ze(O)&&O.preventDefault(),$&&$(O)},We=O=>{O.currentTarget===O.target&&v&&ze(O)&&v(O),R&&R(O)},ae=n!==!1&&S?!0:n,se=ae||v?Ee:i||"div",oe={...a,component:se,disabled:p,size:j,color:d,iconColor:y.isValidElement(m)&&m.props.color||d,onDelete:!!v,clickable:ae,variant:z},F=kt(oe),He=se===Ee?{component:i||"div",focusVisibleClassName:F.focusVisible,...v&&{disableRipple:!0}}:{};let Oe=null;v&&(Oe=h&&y.isValidElement(h)?y.cloneElement(h,{className:M(h.props.className,F.deleteIcon),onClick:K}):w.jsx($t,{className:M(F.deleteIcon),onClick:K}));let Pe=null;l&&y.isValidElement(l)&&(Pe=y.cloneElement(l,{className:M(F.avatar,l.props.className)}));let Le=null;return m&&y.isValidElement(m)&&(Le=y.cloneElement(m,{className:M(F.icon,m.props.className)})),w.jsxs(St,{as:se,className:M(F.root,o),disabled:ae&&p?!0:void 0,onClick:S,onKeyDown:re,onKeyUp:We,ref:x,tabIndex:q&&p?-1:B,ownerState:oe,...He,...ee,children:[Pe||Le,w.jsx(It,{className:M(F.label),ownerState:oe,children:L}),Oe]})});function xt(e){return Re("MuiLinearProgress",e)}Ne("MuiLinearProgress",["root","colorPrimary","colorSecondary","determinate","indeterminate","buffer","query","dashed","dashedColorPrimary","dashedColorSecondary","bar","barColorPrimary","barColorSecondary","bar1Indeterminate","bar1Determinate","bar1Buffer","bar2Indeterminate","bar2Buffer"]);const ce=4,ue=ke`
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
`,Ot=typeof ue!="string"?Se`
        animation: ${ue} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
      `:null,de=ke`
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
`,Pt=typeof de!="string"?Se`
        animation: ${de} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
      `:null,pe=ke`
  0% {
    opacity: 1;
    background-position: 0 -23px;
  }

  60% {
    opacity: 0;
    background-position: 0 -23px;
  }

  100% {
    opacity: 1;
    background-position: -200px -23px;
  }
`,Lt=typeof pe!="string"?Se`
        animation: ${pe} 3s infinite linear;
      `:null,Tt=e=>{const{classes:t,variant:r,color:a}=e,l={root:["root",`color${u(a)}`,r],dashed:["dashed",`dashedColor${u(a)}`],bar1:["bar",`barColor${u(a)}`,(r==="indeterminate"||r==="query")&&"bar1Indeterminate",r==="determinate"&&"bar1Determinate",r==="buffer"&&"bar1Buffer"],bar2:["bar",r!=="buffer"&&`barColor${u(a)}`,r==="buffer"&&`color${u(a)}`,(r==="indeterminate"||r==="query")&&"bar2Indeterminate",r==="buffer"&&"bar2Buffer"]};return $e(l,xt,t)},Ie=(e,t)=>e.vars?e.vars.palette.LinearProgress[`${t}Bg`]:e.palette.mode==="light"?at(e.palette[t].main,.62):st(e.palette[t].main,.5),Dt=A("span",{name:"MuiLinearProgress",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[`color${u(r.color)}`],t[r.variant]]}})(J(({theme:e})=>({position:"relative",overflow:"hidden",display:"block",height:4,zIndex:0,"@media print":{colorAdjust:"exact"},variants:[...Object.entries(e.palette).filter(E()).map(([t])=>({props:{color:t},style:{backgroundColor:Ie(e,t)}})),{props:({ownerState:t})=>t.color==="inherit"&&t.variant!=="buffer",style:{"&::before":{content:'""',position:"absolute",left:0,top:0,right:0,bottom:0,backgroundColor:"currentColor",opacity:.3}}},{props:{variant:"buffer"},style:{backgroundColor:"transparent"}},{props:{variant:"query"},style:{transform:"rotate(180deg)"}}]}))),wt=A("span",{name:"MuiLinearProgress",slot:"Dashed",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.dashed,t[`dashedColor${u(r.color)}`]]}})(J(({theme:e})=>({position:"absolute",marginTop:0,height:"100%",width:"100%",backgroundSize:"10px 10px",backgroundPosition:"0 -23px",variants:[{props:{color:"inherit"},style:{opacity:.3,backgroundImage:"radial-gradient(currentColor 0%, currentColor 16%, transparent 42%)"}},...Object.entries(e.palette).filter(E()).map(([t])=>{const r=Ie(e,t);return{props:{color:t},style:{backgroundImage:`radial-gradient(${r} 0%, ${r} 16%, transparent 42%)`}}})]})),Lt||{animation:`${pe} 3s infinite linear`}),Et=A("span",{name:"MuiLinearProgress",slot:"Bar1",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.bar,t[`barColor${u(r.color)}`],(r.variant==="indeterminate"||r.variant==="query")&&t.bar1Indeterminate,r.variant==="determinate"&&t.bar1Determinate,r.variant==="buffer"&&t.bar1Buffer]}})(J(({theme:e})=>({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",variants:[{props:{color:"inherit"},style:{backgroundColor:"currentColor"}},...Object.entries(e.palette).filter(E()).map(([t])=>({props:{color:t},style:{backgroundColor:(e.vars||e).palette[t].main}})),{props:{variant:"determinate"},style:{transition:`transform .${ce}s linear`}},{props:{variant:"buffer"},style:{zIndex:1,transition:`transform .${ce}s linear`}},{props:({ownerState:t})=>t.variant==="indeterminate"||t.variant==="query",style:{width:"auto"}},{props:({ownerState:t})=>t.variant==="indeterminate"||t.variant==="query",style:Ot||{animation:`${ue} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite`}}]}))),Mt=A("span",{name:"MuiLinearProgress",slot:"Bar2",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.bar,t[`barColor${u(r.color)}`],(r.variant==="indeterminate"||r.variant==="query")&&t.bar2Indeterminate,r.variant==="buffer"&&t.bar2Buffer]}})(J(({theme:e})=>({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",variants:[...Object.entries(e.palette).filter(E()).map(([t])=>({props:{color:t},style:{"--LinearProgressBar2-barColor":(e.vars||e).palette[t].main}})),{props:({ownerState:t})=>t.variant!=="buffer"&&t.color!=="inherit",style:{backgroundColor:"var(--LinearProgressBar2-barColor, currentColor)"}},{props:{color:"inherit"},style:{opacity:.3}},...Object.entries(e.palette).filter(E()).map(([t])=>({props:{color:t,variant:"buffer"},style:{backgroundColor:Ie(e,t),transition:`transform .${ce}s linear`}})),{props:({ownerState:t})=>t.variant==="indeterminate"||t.variant==="query",style:{width:"auto"}},{props:({ownerState:t})=>t.variant==="indeterminate"||t.variant==="query",style:Pt||{animation:`${de} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite`}}]}))),er=y.forwardRef(function(t,r){const a=Qe({props:t,name:"MuiLinearProgress"}),{className:l,color:o="primary",value:n,valueBuffer:d,variant:i="indeterminate",...h}=a,p={...a,color:o,variant:i},m=Tt(p),L=rt(),S={},v={bar1:{},bar2:{}};if((i==="determinate"||i==="buffer")&&n!==void 0){S["aria-valuenow"]=Math.round(n),S["aria-valuemin"]=0,S["aria-valuemax"]=100;let $=n-100;L&&($=-$),v.bar1.transform=`translateX(${$}%)`}if(i==="buffer"&&d!==void 0){let $=(d||0)-100;L&&($=-$),v.bar2.transform=`translateX(${$}%)`}return w.jsxs(Dt,{className:M(m.root,l),ownerState:p,role:"progressbar",...S,ref:r,...h,children:[i==="buffer"?w.jsx(wt,{className:m.dashed,ownerState:p}):null,w.jsx(Et,{className:m.bar1,ownerState:p,style:v.bar1}),i==="determinate"?null:w.jsx(Mt,{className:m.bar2,ownerState:p,style:v.bar2})]})}),tr=mt({createStyledComponent:A("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,t)=>t.root}),useThemeProps:e=>pt({props:e,name:"MuiStack"})});var P,b,Y,I,V,W,D,Z,H,_,N,Q,U,G,f,X,fe,he,be,ve,ge,ye,Ce,qe,Ve,Ut=(Ve=class extends ot{constructor(t,r){super();k(this,f);k(this,P);k(this,b);k(this,Y);k(this,I);k(this,V);k(this,W);k(this,D);k(this,Z);k(this,H);k(this,_);k(this,N);k(this,Q);k(this,U);k(this,G,new Set);this.options=r,g(this,P,t),g(this,D,null),this.bindMethods(),this.setOptions(r)}bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(s(this,b).addObserver(this),Be(s(this,b),this.options)?C(this,f,X).call(this):this.updateResult(),C(this,f,ve).call(this))}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return me(s(this,b),this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return me(s(this,b),this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,C(this,f,ge).call(this),C(this,f,ye).call(this),s(this,b).removeObserver(this)}setOptions(t,r){const a=this.options,l=s(this,b);if(this.options=s(this,P).defaultQueryOptions(t),le(a,this.options)||s(this,P).getQueryCache().notify({type:"observerOptionsUpdated",query:s(this,b),observer:this}),typeof this.options.enabled<"u"&&typeof this.options.enabled!="boolean")throw new Error("Expected enabled to be a boolean");this.options.queryKey||(this.options.queryKey=a.queryKey),C(this,f,Ce).call(this);const o=this.hasListeners();o&&Fe(s(this,b),l,this.options,a)&&C(this,f,X).call(this),this.updateResult(r),o&&(s(this,b)!==l||this.options.enabled!==a.enabled||this.options.staleTime!==a.staleTime)&&C(this,f,fe).call(this);const n=C(this,f,he).call(this);o&&(s(this,b)!==l||this.options.enabled!==a.enabled||n!==s(this,U))&&C(this,f,be).call(this,n)}getOptimisticResult(t){const r=s(this,P).getQueryCache().build(s(this,P),t),a=this.createResult(r,t);return zt(this,a)&&(g(this,I,a),g(this,W,this.options),g(this,V,s(this,b).state)),a}getCurrentResult(){return s(this,I)}trackResult(t){const r={};return Object.keys(t).forEach(a=>{Object.defineProperty(r,a,{configurable:!1,enumerable:!0,get:()=>(s(this,G).add(a),t[a])})}),r}getCurrentQuery(){return s(this,b)}refetch({...t}={}){return this.fetch({...t})}fetchOptimistic(t){const r=s(this,P).defaultQueryOptions(t),a=s(this,P).getQueryCache().build(s(this,P),r);return a.isFetchingOptimistic=!0,a.fetch().then(()=>this.createResult(a,r))}fetch(t){return C(this,f,X).call(this,{...t,cancelRefetch:t.cancelRefetch??!0}).then(()=>(this.updateResult(),s(this,I)))}createResult(t,r){var te;const a=s(this,b),l=this.options,o=s(this,I),n=s(this,V),d=s(this,W),h=t!==a?t.state:s(this,Y),{state:p}=t;let{error:m,errorUpdatedAt:L,fetchStatus:S,status:v}=p,$=!1,R;if(r._optimisticResults){const x=this.hasListeners(),K=!x&&Be(t,r),re=x&&Fe(t,a,r,l);(K||re)&&(S=ct(t.options.networkMode)?"fetching":"paused",p.dataUpdatedAt||(v="pending")),r._optimisticResults==="isRestoring"&&(S="idle")}if(r.select&&typeof p.data<"u")if(o&&p.data===(n==null?void 0:n.data)&&r.select===s(this,Z))R=s(this,H);else try{g(this,Z,r.select),R=r.select(p.data),R=je(o==null?void 0:o.data,R,r),g(this,H,R),g(this,D,null)}catch(x){g(this,D,x)}else R=p.data;if(typeof r.placeholderData<"u"&&typeof R>"u"&&v==="pending"){let x;if(o!=null&&o.isPlaceholderData&&r.placeholderData===(d==null?void 0:d.placeholderData))x=o.data;else if(x=typeof r.placeholderData=="function"?r.placeholderData((te=s(this,_))==null?void 0:te.state.data,s(this,_)):r.placeholderData,r.select&&typeof x<"u")try{x=r.select(x),g(this,D,null)}catch(K){g(this,D,K)}typeof x<"u"&&(v="success",R=je(o==null?void 0:o.data,x,r),$=!0)}s(this,D)&&(m=s(this,D),R=s(this,H),L=Date.now(),v="error");const j=S==="fetching",z=v==="pending",B=v==="error",q=z&&j;return{status:v,fetchStatus:S,isPending:z,isSuccess:v==="success",isError:B,isInitialLoading:q,isLoading:q,data:R,dataUpdatedAt:p.dataUpdatedAt,error:m,errorUpdatedAt:L,failureCount:p.fetchFailureCount,failureReason:p.fetchFailureReason,errorUpdateCount:p.errorUpdateCount,isFetched:p.dataUpdateCount>0||p.errorUpdateCount>0,isFetchedAfterMount:p.dataUpdateCount>h.dataUpdateCount||p.errorUpdateCount>h.errorUpdateCount,isFetching:j,isRefetching:j&&!z,isLoadingError:B&&p.dataUpdatedAt===0,isPaused:S==="paused",isPlaceholderData:$,isRefetchError:B&&p.dataUpdatedAt!==0,isStale:xe(t,r),refetch:this.refetch}}updateResult(t){const r=s(this,I),a=this.createResult(s(this,b),this.options);if(g(this,V,s(this,b).state),g(this,W,this.options),s(this,V).data!==void 0&&g(this,_,s(this,b)),le(a,r))return;g(this,I,a);const l={},o=()=>{if(!r)return!0;const{notifyOnChangeProps:n}=this.options,d=typeof n=="function"?n():n;if(d==="all"||!d&&!s(this,G).size)return!0;const i=new Set(d??s(this,G));return this.options.throwOnError&&i.add("error"),Object.keys(s(this,I)).some(h=>{const p=h;return s(this,I)[p]!==r[p]&&i.has(p)})};(t==null?void 0:t.listeners)!==!1&&o()&&(l.listeners=!0),C(this,f,qe).call(this,{...l,...t})}onQueryUpdate(){this.updateResult(),this.hasListeners()&&C(this,f,ve).call(this)}},P=new WeakMap,b=new WeakMap,Y=new WeakMap,I=new WeakMap,V=new WeakMap,W=new WeakMap,D=new WeakMap,Z=new WeakMap,H=new WeakMap,_=new WeakMap,N=new WeakMap,Q=new WeakMap,U=new WeakMap,G=new WeakMap,f=new WeakSet,X=function(t){C(this,f,Ce).call(this);let r=s(this,b).fetch(this.options,t);return t!=null&&t.throwOnError||(r=r.catch(it)),r},fe=function(){if(C(this,f,ge).call(this),Me||s(this,I).isStale||!Ue(this.options.staleTime))return;const r=nt(s(this,I).dataUpdatedAt,this.options.staleTime)+1;g(this,N,setTimeout(()=>{s(this,I).isStale||this.updateResult()},r))},he=function(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(s(this,b)):this.options.refetchInterval)??!1},be=function(t){C(this,f,ye).call(this),g(this,U,t),!(Me||this.options.enabled===!1||!Ue(s(this,U))||s(this,U)===0)&&g(this,Q,setInterval(()=>{(this.options.refetchIntervalInBackground||lt.isFocused())&&C(this,f,X).call(this)},s(this,U)))},ve=function(){C(this,f,fe).call(this),C(this,f,be).call(this,C(this,f,he).call(this))},ge=function(){s(this,N)&&(clearTimeout(s(this,N)),g(this,N,void 0))},ye=function(){s(this,Q)&&(clearInterval(s(this,Q)),g(this,Q,void 0))},Ce=function(){const t=s(this,P).getQueryCache().build(s(this,P),this.options);if(t===s(this,b))return;const r=s(this,b);g(this,b,t),g(this,Y,t.state),this.hasListeners()&&(r==null||r.removeObserver(this),t.addObserver(this))},qe=function(t){Ae.batch(()=>{t.listeners&&this.listeners.forEach(r=>{r(s(this,I))}),s(this,P).getQueryCache().notify({query:s(this,b),type:"observerResultsUpdated"})})},Ve);function jt(e,t){return t.enabled!==!1&&!e.state.dataUpdatedAt&&!(e.state.status==="error"&&t.retryOnMount===!1)}function Be(e,t){return jt(e,t)||e.state.dataUpdatedAt>0&&me(e,t,t.refetchOnMount)}function me(e,t,r){if(t.enabled!==!1){const a=typeof r=="function"?r(e):r;return a==="always"||a!==!1&&xe(e,t)}return!1}function Fe(e,t,r,a){return r.enabled!==!1&&(e!==t||a.enabled===!1)&&(!r.suspense||e.state.status!=="error")&&xe(e,r)}function xe(e,t){return e.isStaleByTime(t.staleTime)}function zt(e,t){return!le(e.getCurrentResult(),t)}var Ke=y.createContext(!1),Bt=()=>y.useContext(Ke);Ke.Provider;function Ft(){let e=!1;return{clearReset:()=>{e=!1},reset:()=>{e=!0},isReset:()=>e}}var Vt=y.createContext(Ft()),Nt=()=>y.useContext(Vt);function Qt(e,t){return typeof e=="function"?e(...t):!!e}var At=(e,t)=>{(e.suspense||e.throwOnError)&&(t.isReset()||(e.retryOnMount=!1))},qt=e=>{y.useEffect(()=>{e.clearReset()},[e])},Kt=({result:e,errorResetBoundary:t,throwOnError:r,query:a})=>e.isError&&!t.isReset()&&!e.isFetching&&a&&Qt(r,[e.error,a]),Wt=e=>{e.suspense&&typeof e.staleTime!="number"&&(e.staleTime=1e3)},Ht=(e,t)=>(e==null?void 0:e.suspense)&&t.isPending,_t=(e,t,r)=>t.fetchOptimistic(e).catch(()=>{r.clearReset()});function Gt(e,t,r){const a=ut(),l=Bt(),o=Nt(),n=a.defaultQueryOptions(e);n._optimisticResults=l?"isRestoring":"optimistic",Wt(n),At(n,o),qt(o);const[d]=y.useState(()=>new t(a,n)),i=d.getOptimisticResult(n);if(y.useSyncExternalStore(y.useCallback(h=>{const p=l?()=>{}:d.subscribe(Ae.batchCalls(h));return d.updateResult(),p},[d,l]),()=>d.getCurrentResult(),()=>d.getCurrentResult()),y.useEffect(()=>{d.setOptions(n,{listeners:!1})},[n,d]),Ht(n,i))throw _t(n,d,o);if(Kt({result:i,errorResetBoundary:o,throwOnError:n.throwOnError,query:a.getQueryCache().get(n.queryHash)}))throw i.error;return n.notifyOnChangeProps?i:d.trackResult(i)}function rr(e,t){return Gt(e,Ut)}export{Jt as C,er as L,tr as S,Qt as s,rr as u};

import{r,aF as J,aG as K,e as O,aH as N,T as W,c as _,b as B,R as Q,j as X,i as P,aI as Y,P as e,V as Z}from"./index-B_NzBSD9.js";function ne({controlled:n,default:l,name:s,state:a="value"}){const{current:o}=r.useRef(n!==void 0),[d,c]=r.useState(l),m=o?n:d;{r.useEffect(()=>{o!==(n!==void 0)&&console.error([`MUI: A component is changing the ${o?"":"un"}controlled ${a} state of ${s} to be ${o?"un":""}controlled.`,"Elements should not switch from uncontrolled to controlled (or vice versa).",`Decide between using a controlled or uncontrolled ${s} element for the lifetime of the component.`,"The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.","More info: https://fb.me/react-controlled-components"].join(`
`))},[a,s,n]);const{current:f}=r.useRef(l);r.useEffect(()=>{!o&&!Object.is(f,l)&&console.error([`MUI: A component is changing the default ${a} state of an uncontrolled ${s} after being initialized. To suppress this warning opt to use a controlled ${s}.`].join(`
`))},[JSON.stringify(l)])}const h=r.useCallback(f=>{o||c(f)},[]);return[m,h]}function oe(n){var T;const{elementType:l,externalSlotProps:s,ownerState:a,skipResolvingSlotProps:o=!1,...d}=n,c=o?{}:J(s,a),{props:m,internalRef:h}=K({...d,externalSlotProps:c}),f=O(h,c==null?void 0:c.ref,(T=n.additionalProps)==null?void 0:T.ref);return N(l,{...m,ref:f},a)}function $(n){return`scale(${n}, ${n**2})`}const ee={entering:{opacity:1,transform:$(1)},entered:{opacity:1,transform:"none"}},w=typeof navigator<"u"&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),j=r.forwardRef(function(l,s){const{addEndListener:a,appear:o=!0,children:d,easing:c,in:m,onEnter:h,onEntered:f,onEntering:A,onExit:T,onExited:C,onExiting:D,style:v,timeout:p="auto",TransitionComponent:H=W,...F}=l,G=_(),S=r.useRef(),E=B(),R=r.useRef(null),I=O(R,Q(d),s),y=t=>g=>{if(t){const i=R.current;g===void 0?t(i):t(i,g)}},L=y(A),V=y((t,g)=>{Y(t);const{duration:i,delay:b,easing:u}=P({style:v,timeout:p,easing:c},{mode:"enter"});let x;p==="auto"?(x=E.transitions.getAutoHeightDuration(t.clientHeight),S.current=x):x=i,t.style.transition=[E.transitions.create("opacity",{duration:x,delay:b}),E.transitions.create("transform",{duration:w?x:x*.666,delay:b,easing:u})].join(","),h&&h(t,g)}),M=y(f),U=y(D),k=y(t=>{const{duration:g,delay:i,easing:b}=P({style:v,timeout:p,easing:c},{mode:"exit"});let u;p==="auto"?(u=E.transitions.getAutoHeightDuration(t.clientHeight),S.current=u):u=g,t.style.transition=[E.transitions.create("opacity",{duration:u,delay:i}),E.transitions.create("transform",{duration:w?u:u*.666,delay:w?i:i||u*.333,easing:b})].join(","),t.style.opacity=0,t.style.transform=$(.75),T&&T(t)}),z=y(C),q=t=>{p==="auto"&&G.start(S.current||0,t),a&&a(R.current,t)};return X.jsx(H,{appear:o,in:m,nodeRef:R,onEnter:V,onEntered:M,onEntering:L,onExit:k,onExited:z,onExiting:U,addEndListener:q,timeout:p==="auto"?null:p,...F,children:(t,{ownerState:g,...i})=>r.cloneElement(d,{style:{opacity:0,transform:$(.75),visibility:t==="exited"&&!m?"hidden":void 0,...ee[t],...v,...d.props.style},ref:I,...i})})});j.propTypes={addEndListener:e.func,appear:e.bool,children:Z.isRequired,easing:e.oneOfType([e.shape({enter:e.string,exit:e.string}),e.string]),in:e.bool,onEnter:e.func,onEntered:e.func,onEntering:e.func,onExit:e.func,onExited:e.func,onExiting:e.func,style:e.object,timeout:e.oneOfType([e.oneOf(["auto"]),e.number,e.shape({appear:e.number,enter:e.number,exit:e.number})])};j&&(j.muiSupportAuto=!0);export{j as G,ne as a,oe as u};

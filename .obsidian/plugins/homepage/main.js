"use strict";var at=Object.defineProperty;var co=Object.getOwnPropertyDescriptor;var uo=Object.getOwnPropertyNames;var fo=Object.prototype.hasOwnProperty;var go=(o,e)=>{for(var t in e)at(o,t,{get:e[t],enumerable:!0})},ho=(o,e,t,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of uo(e))!fo.call(o,i)&&i!==t&&at(o,i,{get:()=>e[i],enumerable:!(r=co(e,i))||r.enumerable});return o};var vo=o=>ho(at({},"__esModule",{value:!0}),o);var Qo={};go(Qo,{default:()=>et});module.exports=vo(Qo);var oe=require("obsidian");var V=require("obsidian");var _=require("obsidian");function pe(o){return o.extension=="md"?o.path.slice(0,-3):o.path}function Ht(o){return o.endsWith(".canvas")?o:`${o}.md`}function Rt(o,e){return(o%e+e)%e}function Fe(o){let e=o.internalPlugins["daily-notes"];return e?.enabled&&e?.instance.options.autorun}function Nt(o){let e=o.vault.getFiles().filter(t=>["md","canvas"].contains(t.extension));if(e.length){let t=Math.floor(Math.random()*e.length);return pe(e[t])}}var Vt=["markdown","canvas","kanban"],le="Main Homepage",We="Mobile Homepage",_e=(r=>(r.ReplaceAll="Replace all open notes",r.ReplaceLast="Replace last note",r.Retain="Keep open notes",r))(_e||{}),nt=(i=>(i.Default="Default view",i.Reading="Reading view",i.Source="Editing view (Source)",i.LivePreview="Editing view (Live Preview)",i))(nt||{}),$e=(a=>(a.File="File",a.Workspace="Workspace",a.MomentDate="Date-dependent file",a.Random="Random file",a.DailyNote="Daily Note",a))($e||{}),De=class{constructor(e,t){this.lastView=void 0;this.revertView=async()=>{if(!this.plugin.loaded||this.lastView==null)return;let e=this.lastView.deref();if(!e||pe(e.file)==this.computedValue)return;let t=e.getState(),r=this.app.vault.config;console.log(t.mode,t.source),t.mode=r.defaultViewMode,t.source=!r.livePreview,await e.leaf.setViewState({type:"markdown",state:t}),this.lastView=void 0};this.name=e,this.plugin=t,this.app=t.app,this.data=t.settings.homepages[e],this.data.commands||(this.data.commands=[],this.save())}async setReversion(e){e&&this.data.view!=="Default view"?this.plugin.registerEvent(this.app.workspace.on("layout-change",this.revertView)):this.app.workspace.off("layout-change",this.revertView)}async open(e=!1){if(this.plugin.hasRequiredPlugin(this.data.kind))if(this.data.kind=="Workspace")await this.launchWorkspace();else{let t=this.plugin.loaded?this.data.manualOpenMode:this.data.openMode;e&&(t="Keep open notes"),await this.launchPage(t)}else{new _.Notice("Homepage cannot be opened due to plugin unavailablity.");return}if(this.data.commands)for(let t of this.data.commands)this.app.commands.executeCommandById(t)}async launchWorkspace(){let e=this.plugin.internalPlugins.workspaces?.instance;if(!(this.data.value in e.workspaces)){new _.Notice(`Cannot find the workspace "${this.data.value}" to use as the homepage.`);return}e.loadWorkspace(this.data.value)}async launchPage(e){if(this.computedValue=this.computeValue(),this.plugin.executing=!0,!(Fe(this.plugin)&&!this.plugin.loaded)){if(!this.data.autoCreate&&await this.isNonextant()){new _.Notice(`Homepage "${this.computedValue}" does not exist.`);return}if(e!="Replace all open notes"){let t=this.getOpened();if(t.length>0){this.app.workspace.setActiveLeaf(t[0]),await this.configure();return}}else Vt.forEach(t=>this.app.workspace.detachLeavesOfType(t));e!="Keep open notes"&&this.app.workspace.getActiveViewOfType(_.View)?.leaf.setPinned(!1);do await this.app.workspace.openLinkText(this.computedValue,"",e=="Keep open notes",{active:!0});while(this.app.workspace.getActiveFile()==null);e=="Replace all open notes"&&this.app.workspace.detachLeavesOfType("empty"),await this.configure()}}async isNonextant(){let e=Ht(this.computedValue);return!await this.app.vault.adapter.exists(e)}async configure(){this.plugin.executing=!1;let e=this.app.workspace.getActiveViewOfType(_.MarkdownView);if(!e){this.data.pin&&this.app.workspace.getActiveViewOfType(_.View)?.leaf.setPinned(!0);return}let t=e.getState();if(this.data.revertView&&this.plugin.loaded&&(this.lastView=new WeakRef(e)),this.data.autoScroll){let r=e.editor.lineCount();t.mode=="preview"?e.previewMode.applyScroll(r-4):(e.editor.setCursor(r),e.editor.focus())}if(this.data.pin&&e.leaf.setPinned(!0),this.data.view!="Default view"){switch(this.data.view){case"Editing view (Live Preview)":case"Editing view (Source)":t.mode="source",t.source=this.data.view!="Editing view (Live Preview)";break;case"Reading view":t.mode="preview";break}await e.leaf.setViewState({type:"markdown",state:t}),this.plugin.loaded&&this.data.refreshDataview&&this.plugin.communityPlugins.dataview?.index.touch()}}getOpened(){return Vt.flatMap(t=>this.app.workspace.getLeavesOfType(t)).filter(t=>pe(t.view.file)==this.computedValue)}computeValue(){let e=this.data.value,t,r;switch(this.data.kind){case"Date-dependent file":e=(0,_.moment)().format(this.data.value);break;case"Random file":let i=Nt(this.app);i&&(e=i);break;case"Daily Note":t=this.plugin.internalPlugins["daily-notes"],r=t.instance.options.format,e=(0,_.moment)().format(r||"YYYY-MM-DD");break}return e}async save(){this.plugin.settings.homepages[this.name]=this.data,await this.plugin.saveSettings()}};var Se=require("obsidian");var ro=require("obsidian");var S="top",L="bottom",M="right",D="left",qe="auto",ee=[S,L,M,D],K="start",me="end",Bt="clippingParents",Ue="viewport",ye="popper",It="reference",st=ee.reduce(function(o,e){return o.concat([e+"-"+K,e+"-"+me])},[]),Ye=[].concat(ee,[qe]).reduce(function(o,e){return o.concat([e,e+"-"+K,e+"-"+me])},[]),wo="beforeRead",yo="read",bo="afterRead",xo="beforeMain",Eo="main",Oo="afterMain",So="beforeWrite",Po="write",To="afterWrite",jt=[wo,yo,bo,xo,Eo,Oo,So,Po,To];function R(o){return o?(o.nodeName||"").toLowerCase():null}function E(o){if(o==null)return window;if(o.toString()!=="[object Window]"){var e=o.ownerDocument;return e&&e.defaultView||window}return o}function $(o){var e=E(o).Element;return o instanceof e||o instanceof Element}function H(o){var e=E(o).HTMLElement;return o instanceof e||o instanceof HTMLElement}function be(o){if(typeof ShadowRoot>"u")return!1;var e=E(o).ShadowRoot;return o instanceof e||o instanceof ShadowRoot}function Do(o){var e=o.state;Object.keys(e.elements).forEach(function(t){var r=e.styles[t]||{},i=e.attributes[t]||{},a=e.elements[t];!H(a)||!R(a)||(Object.assign(a.style,r),Object.keys(i).forEach(function(m){var n=i[m];n===!1?a.removeAttribute(m):a.setAttribute(m,n===!0?"":n)}))})}function Mo(o){var e=o.state,t={popper:{position:e.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(e.elements.popper.style,t.popper),e.styles=t,e.elements.arrow&&Object.assign(e.elements.arrow.style,t.arrow),function(){Object.keys(e.elements).forEach(function(r){var i=e.elements[r],a=e.attributes[r]||{},m=Object.keys(e.styles.hasOwnProperty(r)?e.styles[r]:t[r]),n=m.reduce(function(s,l){return s[l]="",s},{});!H(i)||!R(i)||(Object.assign(i.style,n),Object.keys(a).forEach(function(s){i.removeAttribute(s)}))})}}var Ft={name:"applyStyles",enabled:!0,phase:"write",fn:Do,effect:Mo,requires:["computeStyles"]};function N(o){return o.split("-")[0]}var X=Math.max,ce=Math.min,J=Math.round;function xe(){var o=navigator.userAgentData;return o!=null&&o.brands&&Array.isArray(o.brands)?o.brands.map(function(e){return e.brand+"/"+e.version}).join(" "):navigator.userAgent}function Me(){return!/^((?!chrome|android).)*safari/i.test(xe())}function q(o,e,t){e===void 0&&(e=!1),t===void 0&&(t=!1);var r=o.getBoundingClientRect(),i=1,a=1;e&&H(o)&&(i=o.offsetWidth>0&&J(r.width)/o.offsetWidth||1,a=o.offsetHeight>0&&J(r.height)/o.offsetHeight||1);var m=$(o)?E(o):window,n=m.visualViewport,s=!Me()&&t,l=(r.left+(s&&n?n.offsetLeft:0))/i,p=(r.top+(s&&n?n.offsetTop:0))/a,u=r.width/i,w=r.height/a;return{width:u,height:w,top:p,right:l+u,bottom:p+w,left:l,x:l,y:p}}function ue(o){var e=q(o),t=o.offsetWidth,r=o.offsetHeight;return Math.abs(e.width-t)<=1&&(t=e.width),Math.abs(e.height-r)<=1&&(r=e.height),{x:o.offsetLeft,y:o.offsetTop,width:t,height:r}}function ke(o,e){var t=e.getRootNode&&e.getRootNode();if(o.contains(e))return!0;if(t&&be(t)){var r=e;do{if(r&&o.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function j(o){return E(o).getComputedStyle(o)}function pt(o){return["table","td","th"].indexOf(R(o))>=0}function B(o){return(($(o)?o.ownerDocument:o.document)||window.document).documentElement}function Z(o){return R(o)==="html"?o:o.assignedSlot||o.parentNode||(be(o)?o.host:null)||B(o)}function Wt(o){return!H(o)||j(o).position==="fixed"?null:o.offsetParent}function ko(o){var e=/firefox/i.test(xe()),t=/Trident/i.test(xe());if(t&&H(o)){var r=j(o);if(r.position==="fixed")return null}var i=Z(o);for(be(i)&&(i=i.host);H(i)&&["html","body"].indexOf(R(i))<0;){var a=j(i);if(a.transform!=="none"||a.perspective!=="none"||a.contain==="paint"||["transform","perspective"].indexOf(a.willChange)!==-1||e&&a.willChange==="filter"||e&&a.filter&&a.filter!=="none")return i;i=i.parentNode}return null}function z(o){for(var e=E(o),t=Wt(o);t&&pt(t)&&j(t).position==="static";)t=Wt(t);return t&&(R(t)==="html"||R(t)==="body"&&j(t).position==="static")?e:t||ko(o)||e}function fe(o){return["top","bottom"].indexOf(o)>=0?"x":"y"}function de(o,e,t){return X(o,ce(e,t))}function _t(o,e,t){var r=de(o,e,t);return r>t?t:r}function Ae(){return{top:0,right:0,bottom:0,left:0}}function Ce(o){return Object.assign({},Ae(),o)}function Le(o,e){return e.reduce(function(t,r){return t[r]=o,t},{})}var Ao=function(e,t){return e=typeof e=="function"?e(Object.assign({},t.rects,{placement:t.placement})):e,Ce(typeof e!="number"?e:Le(e,ee))};function Co(o){var e,t=o.state,r=o.name,i=o.options,a=t.elements.arrow,m=t.modifiersData.popperOffsets,n=N(t.placement),s=fe(n),l=[D,M].indexOf(n)>=0,p=l?"height":"width";if(!(!a||!m)){var u=Ao(i.padding,t),w=ue(a),c=s==="y"?S:D,b=s==="y"?L:M,d=t.rects.reference[p]+t.rects.reference[s]-m[s]-t.rects.popper[p],f=m[s]-t.rects.reference[s],y=z(a),P=y?s==="y"?y.clientHeight||0:y.clientWidth||0:0,T=d/2-f/2,g=u[c],h=P-w[p]-u[b],v=P/2-w[p]/2+T,O=de(g,v,h),k=s;t.modifiersData[r]=(e={},e[k]=O,e.centerOffset=O-v,e)}}function Lo(o){var e=o.state,t=o.options,r=t.element,i=r===void 0?"[data-popper-arrow]":r;i!=null&&(typeof i=="string"&&(i=e.elements.popper.querySelector(i),!i)||ke(e.elements.popper,i)&&(e.elements.arrow=i))}var $t={name:"arrow",enabled:!0,phase:"main",fn:Co,effect:Lo,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function U(o){return o.split("-")[1]}var Ho={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Ro(o,e){var t=o.x,r=o.y,i=e.devicePixelRatio||1;return{x:J(t*i)/i||0,y:J(r*i)/i||0}}function qt(o){var e,t=o.popper,r=o.popperRect,i=o.placement,a=o.variation,m=o.offsets,n=o.position,s=o.gpuAcceleration,l=o.adaptive,p=o.roundOffsets,u=o.isFixed,w=m.x,c=w===void 0?0:w,b=m.y,d=b===void 0?0:b,f=typeof p=="function"?p({x:c,y:d}):{x:c,y:d};c=f.x,d=f.y;var y=m.hasOwnProperty("x"),P=m.hasOwnProperty("y"),T=D,g=S,h=window;if(l){var v=z(t),O="clientHeight",k="clientWidth";if(v===E(t)&&(v=B(t),j(v).position!=="static"&&n==="absolute"&&(O="scrollHeight",k="scrollWidth")),v=v,i===S||(i===D||i===M)&&a===me){g=L;var A=u&&v===h&&h.visualViewport?h.visualViewport.height:v[O];d-=A-r.height,d*=s?1:-1}if(i===D||(i===S||i===L)&&a===me){T=M;var C=u&&v===h&&h.visualViewport?h.visualViewport.width:v[k];c-=C-r.width,c*=s?1:-1}}var x=Object.assign({position:n},l&&Ho),F=p===!0?Ro({x:c,y:d},E(t)):{x:c,y:d};if(c=F.x,d=F.y,s){var I;return Object.assign({},x,(I={},I[g]=P?"0":"",I[T]=y?"0":"",I.transform=(h.devicePixelRatio||1)<=1?"translate("+c+"px, "+d+"px)":"translate3d("+c+"px, "+d+"px, 0)",I))}return Object.assign({},x,(e={},e[g]=P?d+"px":"",e[T]=y?c+"px":"",e.transform="",e))}function No(o){var e=o.state,t=o.options,r=t.gpuAcceleration,i=r===void 0?!0:r,a=t.adaptive,m=a===void 0?!0:a,n=t.roundOffsets,s=n===void 0?!0:n;if(!1)var l;var p={placement:N(e.placement),variation:U(e.placement),popper:e.elements.popper,popperRect:e.rects.popper,gpuAcceleration:i,isFixed:e.options.strategy==="fixed"};e.modifiersData.popperOffsets!=null&&(e.styles.popper=Object.assign({},e.styles.popper,qt(Object.assign({},p,{offsets:e.modifiersData.popperOffsets,position:e.options.strategy,adaptive:m,roundOffsets:s})))),e.modifiersData.arrow!=null&&(e.styles.arrow=Object.assign({},e.styles.arrow,qt(Object.assign({},p,{offsets:e.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:s})))),e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-placement":e.placement})}var Ut={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:No,data:{}};var Xe={passive:!0};function Vo(o){var e=o.state,t=o.instance,r=o.options,i=r.scroll,a=i===void 0?!0:i,m=r.resize,n=m===void 0?!0:m,s=E(e.elements.popper),l=[].concat(e.scrollParents.reference,e.scrollParents.popper);return a&&l.forEach(function(p){p.addEventListener("scroll",t.update,Xe)}),n&&s.addEventListener("resize",t.update,Xe),function(){a&&l.forEach(function(p){p.removeEventListener("scroll",t.update,Xe)}),n&&s.removeEventListener("resize",t.update,Xe)}}var Yt={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Vo,data:{}};var Bo={left:"right",right:"left",bottom:"top",top:"bottom"};function Ee(o){return o.replace(/left|right|bottom|top/g,function(e){return Bo[e]})}var Io={start:"end",end:"start"};function ze(o){return o.replace(/start|end/g,function(e){return Io[e]})}function ge(o){var e=E(o),t=e.pageXOffset,r=e.pageYOffset;return{scrollLeft:t,scrollTop:r}}function he(o){return q(B(o)).left+ge(o).scrollLeft}function lt(o,e){var t=E(o),r=B(o),i=t.visualViewport,a=r.clientWidth,m=r.clientHeight,n=0,s=0;if(i){a=i.width,m=i.height;var l=Me();(l||!l&&e==="fixed")&&(n=i.offsetLeft,s=i.offsetTop)}return{width:a,height:m,x:n+he(o),y:s}}function mt(o){var e,t=B(o),r=ge(o),i=(e=o.ownerDocument)==null?void 0:e.body,a=X(t.scrollWidth,t.clientWidth,i?i.scrollWidth:0,i?i.clientWidth:0),m=X(t.scrollHeight,t.clientHeight,i?i.scrollHeight:0,i?i.clientHeight:0),n=-r.scrollLeft+he(o),s=-r.scrollTop;return j(i||t).direction==="rtl"&&(n+=X(t.clientWidth,i?i.clientWidth:0)-a),{width:a,height:m,x:n,y:s}}function ve(o){var e=j(o),t=e.overflow,r=e.overflowX,i=e.overflowY;return/auto|scroll|overlay|hidden/.test(t+i+r)}function Ge(o){return["html","body","#document"].indexOf(R(o))>=0?o.ownerDocument.body:H(o)&&ve(o)?o:Ge(Z(o))}function te(o,e){var t;e===void 0&&(e=[]);var r=Ge(o),i=r===((t=o.ownerDocument)==null?void 0:t.body),a=E(r),m=i?[a].concat(a.visualViewport||[],ve(r)?r:[]):r,n=e.concat(m);return i?n:n.concat(te(Z(m)))}function Oe(o){return Object.assign({},o,{left:o.x,top:o.y,right:o.x+o.width,bottom:o.y+o.height})}function jo(o,e){var t=q(o,!1,e==="fixed");return t.top=t.top+o.clientTop,t.left=t.left+o.clientLeft,t.bottom=t.top+o.clientHeight,t.right=t.left+o.clientWidth,t.width=o.clientWidth,t.height=o.clientHeight,t.x=t.left,t.y=t.top,t}function Xt(o,e,t){return e===Ue?Oe(lt(o,t)):$(e)?jo(e,t):Oe(mt(B(o)))}function Fo(o){var e=te(Z(o)),t=["absolute","fixed"].indexOf(j(o).position)>=0,r=t&&H(o)?z(o):o;return $(r)?e.filter(function(i){return $(i)&&ke(i,r)&&R(i)!=="body"}):[]}function ct(o,e,t,r){var i=e==="clippingParents"?Fo(o):[].concat(e),a=[].concat(i,[t]),m=a[0],n=a.reduce(function(s,l){var p=Xt(o,l,r);return s.top=X(p.top,s.top),s.right=ce(p.right,s.right),s.bottom=ce(p.bottom,s.bottom),s.left=X(p.left,s.left),s},Xt(o,m,r));return n.width=n.right-n.left,n.height=n.bottom-n.top,n.x=n.left,n.y=n.top,n}function He(o){var e=o.reference,t=o.element,r=o.placement,i=r?N(r):null,a=r?U(r):null,m=e.x+e.width/2-t.width/2,n=e.y+e.height/2-t.height/2,s;switch(i){case S:s={x:m,y:e.y-t.height};break;case L:s={x:m,y:e.y+e.height};break;case M:s={x:e.x+e.width,y:n};break;case D:s={x:e.x-t.width,y:n};break;default:s={x:e.x,y:e.y}}var l=i?fe(i):null;if(l!=null){var p=l==="y"?"height":"width";switch(a){case K:s[l]=s[l]-(e[p]/2-t[p]/2);break;case me:s[l]=s[l]+(e[p]/2-t[p]/2);break;default:}}return s}function G(o,e){e===void 0&&(e={});var t=e,r=t.placement,i=r===void 0?o.placement:r,a=t.strategy,m=a===void 0?o.strategy:a,n=t.boundary,s=n===void 0?Bt:n,l=t.rootBoundary,p=l===void 0?Ue:l,u=t.elementContext,w=u===void 0?ye:u,c=t.altBoundary,b=c===void 0?!1:c,d=t.padding,f=d===void 0?0:d,y=Ce(typeof f!="number"?f:Le(f,ee)),P=w===ye?It:ye,T=o.rects.popper,g=o.elements[b?P:w],h=ct($(g)?g:g.contextElement||B(o.elements.popper),s,p,m),v=q(o.elements.reference),O=He({reference:v,element:T,strategy:"absolute",placement:i}),k=Oe(Object.assign({},T,O)),A=w===ye?k:v,C={top:h.top-A.top+y.top,bottom:A.bottom-h.bottom+y.bottom,left:h.left-A.left+y.left,right:A.right-h.right+y.right},x=o.modifiersData.offset;if(w===ye&&x){var F=x[i];Object.keys(C).forEach(function(I){var ie=[M,L].indexOf(I)>=0?1:-1,re=[S,L].indexOf(I)>=0?"y":"x";C[I]+=F[re]*ie})}return C}function ut(o,e){e===void 0&&(e={});var t=e,r=t.placement,i=t.boundary,a=t.rootBoundary,m=t.padding,n=t.flipVariations,s=t.allowedAutoPlacements,l=s===void 0?Ye:s,p=U(r),u=p?n?st:st.filter(function(b){return U(b)===p}):ee,w=u.filter(function(b){return l.indexOf(b)>=0});w.length===0&&(w=u);var c=w.reduce(function(b,d){return b[d]=G(o,{placement:d,boundary:i,rootBoundary:a,padding:m})[N(d)],b},{});return Object.keys(c).sort(function(b,d){return c[b]-c[d]})}function Wo(o){if(N(o)===qe)return[];var e=Ee(o);return[ze(o),e,ze(e)]}function _o(o){var e=o.state,t=o.options,r=o.name;if(!e.modifiersData[r]._skip){for(var i=t.mainAxis,a=i===void 0?!0:i,m=t.altAxis,n=m===void 0?!0:m,s=t.fallbackPlacements,l=t.padding,p=t.boundary,u=t.rootBoundary,w=t.altBoundary,c=t.flipVariations,b=c===void 0?!0:c,d=t.allowedAutoPlacements,f=e.options.placement,y=N(f),P=y===f,T=s||(P||!b?[Ee(f)]:Wo(f)),g=[f].concat(T).reduce(function(we,Q){return we.concat(N(Q)===qe?ut(e,{placement:Q,boundary:p,rootBoundary:u,padding:l,flipVariations:b,allowedAutoPlacements:d}):Q)},[]),h=e.rects.reference,v=e.rects.popper,O=new Map,k=!0,A=g[0],C=0;C<g.length;C++){var x=g[C],F=N(x),I=U(x)===K,ie=[S,L].indexOf(F)>=0,re=ie?"width":"height",W=G(e,{placement:x,boundary:p,rootBoundary:u,altBoundary:w,padding:l}),Y=ie?I?M:D:I?L:S;h[re]>v[re]&&(Y=Ee(Y));var Ne=Ee(Y),ae=[];if(a&&ae.push(W[F]<=0),n&&ae.push(W[Y]<=0,W[Ne]<=0),ae.every(function(we){return we})){A=x,k=!1;break}O.set(x,ae)}if(k)for(var Ve=b?3:1,tt=function(Q){var Te=g.find(function(Ie){var ne=O.get(Ie);if(ne)return ne.slice(0,Q).every(function(ot){return ot})});if(Te)return A=Te,"break"},Pe=Ve;Pe>0;Pe--){var Be=tt(Pe);if(Be==="break")break}e.placement!==A&&(e.modifiersData[r]._skip=!0,e.placement=A,e.reset=!0)}}var zt={name:"flip",enabled:!0,phase:"main",fn:_o,requiresIfExists:["offset"],data:{_skip:!1}};function Gt(o,e,t){return t===void 0&&(t={x:0,y:0}),{top:o.top-e.height-t.y,right:o.right-e.width+t.x,bottom:o.bottom-e.height+t.y,left:o.left-e.width-t.x}}function Kt(o){return[S,M,L,D].some(function(e){return o[e]>=0})}function $o(o){var e=o.state,t=o.name,r=e.rects.reference,i=e.rects.popper,a=e.modifiersData.preventOverflow,m=G(e,{elementContext:"reference"}),n=G(e,{altBoundary:!0}),s=Gt(m,r),l=Gt(n,i,a),p=Kt(s),u=Kt(l);e.modifiersData[t]={referenceClippingOffsets:s,popperEscapeOffsets:l,isReferenceHidden:p,hasPopperEscaped:u},e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-reference-hidden":p,"data-popper-escaped":u})}var Jt={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:$o};function qo(o,e,t){var r=N(o),i=[D,S].indexOf(r)>=0?-1:1,a=typeof t=="function"?t(Object.assign({},e,{placement:o})):t,m=a[0],n=a[1];return m=m||0,n=(n||0)*i,[D,M].indexOf(r)>=0?{x:n,y:m}:{x:m,y:n}}function Uo(o){var e=o.state,t=o.options,r=o.name,i=t.offset,a=i===void 0?[0,0]:i,m=Ye.reduce(function(p,u){return p[u]=qo(u,e.rects,a),p},{}),n=m[e.placement],s=n.x,l=n.y;e.modifiersData.popperOffsets!=null&&(e.modifiersData.popperOffsets.x+=s,e.modifiersData.popperOffsets.y+=l),e.modifiersData[r]=m}var Zt={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Uo};function Yo(o){var e=o.state,t=o.name;e.modifiersData[t]=He({reference:e.rects.reference,element:e.rects.popper,strategy:"absolute",placement:e.placement})}var Qt={name:"popperOffsets",enabled:!0,phase:"read",fn:Yo,data:{}};function ft(o){return o==="x"?"y":"x"}function Xo(o){var e=o.state,t=o.options,r=o.name,i=t.mainAxis,a=i===void 0?!0:i,m=t.altAxis,n=m===void 0?!1:m,s=t.boundary,l=t.rootBoundary,p=t.altBoundary,u=t.padding,w=t.tether,c=w===void 0?!0:w,b=t.tetherOffset,d=b===void 0?0:b,f=G(e,{boundary:s,rootBoundary:l,padding:u,altBoundary:p}),y=N(e.placement),P=U(e.placement),T=!P,g=fe(y),h=ft(g),v=e.modifiersData.popperOffsets,O=e.rects.reference,k=e.rects.popper,A=typeof d=="function"?d(Object.assign({},e.rects,{placement:e.placement})):d,C=typeof A=="number"?{mainAxis:A,altAxis:A}:Object.assign({mainAxis:0,altAxis:0},A),x=e.modifiersData.offset?e.modifiersData.offset[e.placement]:null,F={x:0,y:0};if(v){if(a){var I,ie=g==="y"?S:D,re=g==="y"?L:M,W=g==="y"?"height":"width",Y=v[g],Ne=Y+f[ie],ae=Y-f[re],Ve=c?-k[W]/2:0,tt=P===K?O[W]:k[W],Pe=P===K?-k[W]:-O[W],Be=e.elements.arrow,we=c&&Be?ue(Be):{width:0,height:0},Q=e.modifiersData["arrow#persistent"]?e.modifiersData["arrow#persistent"].padding:Ae(),Te=Q[ie],Ie=Q[re],ne=de(0,O[W],we[W]),ot=T?O[W]/2-Ve-ne-Te-C.mainAxis:tt-ne-Te-C.mainAxis,ao=T?-O[W]/2+Ve+ne+Ie+C.mainAxis:Pe+ne+Ie+C.mainAxis,it=e.elements.arrow&&z(e.elements.arrow),no=it?g==="y"?it.clientTop||0:it.clientLeft||0:0,St=(I=x?.[g])!=null?I:0,so=Y+ot-St-no,po=Y+ao-St,Pt=de(c?ce(Ne,so):Ne,Y,c?X(ae,po):ae);v[g]=Pt,F[g]=Pt-Y}if(n){var Tt,lo=g==="x"?S:D,mo=g==="x"?L:M,se=v[h],je=h==="y"?"height":"width",Dt=se+f[lo],Mt=se-f[mo],rt=[S,D].indexOf(y)!==-1,kt=(Tt=x?.[h])!=null?Tt:0,At=rt?Dt:se-O[je]-k[je]-kt+C.altAxis,Ct=rt?se+O[je]+k[je]-kt-C.altAxis:Mt,Lt=c&&rt?_t(At,se,Ct):de(c?At:Dt,se,c?Ct:Mt);v[h]=Lt,F[h]=Lt-se}e.modifiersData[r]=F}}var eo={name:"preventOverflow",enabled:!0,phase:"main",fn:Xo,requiresIfExists:["offset"]};function dt(o){return{scrollLeft:o.scrollLeft,scrollTop:o.scrollTop}}function gt(o){return o===E(o)||!H(o)?ge(o):dt(o)}function zo(o){var e=o.getBoundingClientRect(),t=J(e.width)/o.offsetWidth||1,r=J(e.height)/o.offsetHeight||1;return t!==1||r!==1}function ht(o,e,t){t===void 0&&(t=!1);var r=H(e),i=H(e)&&zo(e),a=B(e),m=q(o,i,t),n={scrollLeft:0,scrollTop:0},s={x:0,y:0};return(r||!r&&!t)&&((R(e)!=="body"||ve(a))&&(n=gt(e)),H(e)?(s=q(e,!0),s.x+=e.clientLeft,s.y+=e.clientTop):a&&(s.x=he(a))),{x:m.left+n.scrollLeft-s.x,y:m.top+n.scrollTop-s.y,width:m.width,height:m.height}}function Go(o){var e=new Map,t=new Set,r=[];o.forEach(function(a){e.set(a.name,a)});function i(a){t.add(a.name);var m=[].concat(a.requires||[],a.requiresIfExists||[]);m.forEach(function(n){if(!t.has(n)){var s=e.get(n);s&&i(s)}}),r.push(a)}return o.forEach(function(a){t.has(a.name)||i(a)}),r}function vt(o){var e=Go(o);return jt.reduce(function(t,r){return t.concat(e.filter(function(i){return i.phase===r}))},[])}function wt(o){var e;return function(){return e||(e=new Promise(function(t){Promise.resolve().then(function(){e=void 0,t(o())})})),e}}function yt(o){var e=o.reduce(function(t,r){var i=t[r.name];return t[r.name]=i?Object.assign({},i,r,{options:Object.assign({},i.options,r.options),data:Object.assign({},i.data,r.data)}):r,t},{});return Object.keys(e).map(function(t){return e[t]})}var to={placement:"bottom",modifiers:[],strategy:"absolute"};function oo(){for(var o=arguments.length,e=new Array(o),t=0;t<o;t++)e[t]=arguments[t];return!e.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function io(o){o===void 0&&(o={});var e=o,t=e.defaultModifiers,r=t===void 0?[]:t,i=e.defaultOptions,a=i===void 0?to:i;return function(n,s,l){l===void 0&&(l=a);var p={placement:"bottom",orderedModifiers:[],options:Object.assign({},to,a),modifiersData:{},elements:{reference:n,popper:s},attributes:{},styles:{}},u=[],w=!1,c={state:p,setOptions:function(y){var P=typeof y=="function"?y(p.options):y;d(),p.options=Object.assign({},a,p.options,P),p.scrollParents={reference:$(n)?te(n):n.contextElement?te(n.contextElement):[],popper:te(s)};var T=vt(yt([].concat(r,p.options.modifiers)));if(p.orderedModifiers=T.filter(function(x){return x.enabled}),!1){var g;if(getBasePlacement(p.options.placement)===auto)var h;var v,O,k,A,C}return b(),c.update()},forceUpdate:function(){if(!w){var y=p.elements,P=y.reference,T=y.popper;if(oo(P,T)){p.rects={reference:ht(P,z(T),p.options.strategy==="fixed"),popper:ue(T)},p.reset=!1,p.placement=p.options.placement,p.orderedModifiers.forEach(function(x){return p.modifiersData[x.name]=Object.assign({},x.data)});for(var g=0,h=0;h<p.orderedModifiers.length;h++){if(p.reset===!0){p.reset=!1,h=-1;continue}var v=p.orderedModifiers[h],O=v.fn,k=v.options,A=k===void 0?{}:k,C=v.name;typeof O=="function"&&(p=O({state:p,options:A,name:C,instance:c})||p)}}}},update:wt(function(){return new Promise(function(f){c.forceUpdate(),f(p)})}),destroy:function(){d(),w=!0}};if(!oo(n,s))return c;c.setOptions(l).then(function(f){!w&&l.onFirstUpdate&&l.onFirstUpdate(f)});function b(){p.orderedModifiers.forEach(function(f){var y=f.name,P=f.options,T=P===void 0?{}:P,g=f.effect;if(typeof g=="function"){var h=g({state:p,name:y,instance:c,options:T}),v=function(){};u.push(h||v)}})}function d(){u.forEach(function(f){return f()}),u=[]}return c}}var Ko=[Yt,Qt,Ut,Ft,Zt,zt,eo,$t,Jt],bt=io({defaultModifiers:Ko});var xt=class{constructor(e,t,r){this.owner=e,this.containerEl=t,t.on("click",".suggestion-item",this.onSuggestionClick.bind(this)),t.on("mousemove",".suggestion-item",this.onSuggestionMouseover.bind(this)),r.register([],"ArrowUp",i=>{if(!i.isComposing)return this.setSelectedItem(this.selectedItem-1,!0),!1}),r.register([],"ArrowDown",i=>{if(!i.isComposing)return this.setSelectedItem(this.selectedItem+1,!0),!1}),r.register([],"Enter",i=>{if(!i.isComposing)return this.useSelectedItem(i),!1})}onSuggestionClick(e,t){e.preventDefault();let r=this.suggestions.indexOf(t);this.setSelectedItem(r,!1),this.useSelectedItem(e)}onSuggestionMouseover(e,t){let r=this.suggestions.indexOf(t);this.setSelectedItem(r,!1)}setSuggestions(e){this.containerEl.empty();let t=[];e.forEach(r=>{let i=this.containerEl.createDiv("suggestion-item");this.owner.renderSuggestion(r,i),t.push(i)}),this.values=e,this.suggestions=t,this.setSelectedItem(0,!1)}useSelectedItem(e){let t=this.values[this.selectedItem];t&&this.owner.selectSuggestion(t,e)}setSelectedItem(e,t){let r=Rt(e,this.suggestions.length),i=this.suggestions[this.selectedItem],a=this.suggestions[r];i?.removeClass("is-selected"),a?.addClass("is-selected"),this.selectedItem=r,t&&a.scrollIntoView(!1)}},Re=class{constructor(e,t){this.app=e,this.inputEl=t,this.scope=new ro.Scope,this.suggestEl=createDiv("suggestion-container");let r=this.suggestEl.createDiv("suggestion");this.suggest=new xt(this,r,this.scope),this.scope.register([],"Escape",this.close.bind(this)),this.inputEl.addEventListener("input",this.onInputChanged.bind(this)),this.inputEl.addEventListener("focus",this.onInputChanged.bind(this)),this.inputEl.addEventListener("blur",this.close.bind(this)),this.suggestEl.on("mousedown",".suggestion-container",i=>{i.preventDefault()})}onInputChanged(){let e=this.inputEl.value,t=this.getSuggestions(e);t.length>0&&(this.suggest.setSuggestions(t),this.open(this.app.dom.appContainerEl,this.inputEl))}open(e,t){this.app.keymap.pushScope(this.scope),e.appendChild(this.suggestEl),this.popper=bt(t,this.suggestEl,{placement:"bottom-start",modifiers:[{name:"sameWidth",enabled:!0,fn:({state:r,instance:i})=>{let a=`${r.rects.reference.width+100}px`;r.styles.popper.width!==a&&(r.styles.popper.width=a,i.update())},phase:"beforeWrite",requires:["computeStyles"]}]})}close(){this.app.keymap.popScope(this.scope),this.suggest.setSuggestions([]),this.popper&&this.popper.destroy(),this.suggestEl.detach()}};var Ke=class extends Re{getSuggestions(e){let t=this.app.vault.getAllLoadedFiles(),r=[],i=e.toLowerCase();return t.forEach(a=>{a instanceof Se.TFile&&["md","canvas"].contains(a.extension)&&a.path.toLowerCase().contains(i)&&r.push(a)}),r}renderSuggestion(e,t){e.extension=="md"?t.setText(pe(e)):(t.setText(e.path.slice(0,-7)),t.insertAdjacentHTML("beforeend",'<div class="nav-file-tag" style="display:inline-block;vertical-align:middle">canvas</div>'))}selectSuggestion(e){this.inputEl.value=pe(e),this.inputEl.trigger("input"),this.close()}},Je=class extends Re{getSuggestions(e){let t=Object.keys(this.app.internalPlugins.plugins.workspaces?.instance.workspaces),r=e.toLowerCase();return t.filter(i=>i.toLowerCase().contains(r))}renderSuggestion(e,t){t.setText(e)}selectSuggestion(e){this.inputEl.value=e,this.inputEl.trigger("input"),this.close()}},Ze=class extends Se.FuzzySuggestModal{constructor(t){super(t.plugin.app);this.homepage=t.plugin.homepage,this.tab=t}getItems(){return Object.values(this.app.commands.commands)}getItemText(t){return t.name}onChooseItem(t){if(t.id==="homepage:open-homepage"){new Se.Notice("Really?");return}else this.homepage.data.commands||(this.homepage.data.commands=[]);this.homepage.data.commands.push(t.id),this.homepage.save(),this.tab.updateCommandBox()}};var Ot={version:3,homepages:{[le]:{value:"Home",kind:"File",openOnStartup:!0,hasRibbonIcon:!0,openMode:"Replace all open notes",manualOpenMode:"Keep open notes",view:"Default view",revertView:!0,refreshDataview:!1,autoCreate:!0,autoScroll:!1,pin:!1,commands:[]}},separateMobile:!1},Et=Ot.homepages[le],Jo=["Random file","Daily Note"],Qe=class extends V.PluginSettingTab{constructor(t,r){super(t,r);this.workspaceHidden=[];this.plugin=r,this.settings=r.settings}sanitiseNote(t){return t===null||t.match(/^\s*$/)!==null?null:(0,V.normalizePath)(t)}display(){let t=this.plugin.homepage.data.kind=="Workspace",r=Fe(this.plugin),i=document.createElement("article"),a=t?Je:Ke;this.containerEl.empty(),i.id="nv-desc";let m=new V.Setting(this.containerEl).setName("Homepage").addDropdown(async l=>{for(let p of Object.values($e))this.plugin.hasRequiredPlugin(p)&&l.addOption(p,p);l.setValue(this.plugin.homepage.data.kind),l.onChange(async p=>{this.plugin.homepage.data.kind=p,await this.plugin.homepage.save(),this.display()})});switch(m.settingEl.id="nv-main-setting",m.settingEl.append(i),this.plugin.homepage.data.kind){case"File":i.innerHTML="Enter a note or canvas to use.";break;case"Workspace":i.innerHTML="Enter an Obsidian workspace to use.";break;case"Date-dependent file":i.innerHTML=`Enter a note or canvas to use based on <a href="https://momentjs.com/docs/#/displaying/format/" target="_blank" rel="noopener">Moment date formatting</a>.<small>This is separate from Daily or Periodic Notes, but can be set so it corresponds to the same files. Surround words in <code>[brackets]</code> to include them unmodified.
				<br> Currently, your specification will produce: </small>`;break;case"Random file":i.innerHTML="A random note or canvas from your Obsidian folder will be selected.";break;case"Daily Note":i.innerHTML="Your Daily Note will be used.";break}if(this.plugin.homepage.data.kind=="Date-dependent file"){let l=i.lastChild.createEl("b",{attr:{class:"u-pop"}});m.addMomentFormat(p=>p.setDefaultFormat("YYYY-MM-DD").setValue(this.plugin.homepage.data.value).onChange(async u=>{this.plugin.homepage.data.value=u,await this.plugin.homepage.save()}).setSampleEl(l))}else Jo.includes(this.plugin.homepage.data.kind)?m.addText(l=>{l.setDisabled(!0)}):m.addText(l=>{new a(this.app,l.inputEl),l.setPlaceholder(Et.value),l.setValue(Et.value==this.plugin.homepage.data.value?"":this.plugin.homepage.data.value),l.onChange(async p=>{this.plugin.homepage.data.value=this.sanitiseNote(p)||Et.value,await this.plugin.homepage.save()})});let n=this.addToggle("Open on startup","When launching Obsidian, open the homepage.","openOnStartup",l=>this.display(),!0);r&&(n.descEl.createDiv({text:`This setting has been disabled, as it isn't compatible with Daily Notes' "Open daily note on startup" functionality. To use it, disable the Daily Notes setting.`,attr:{class:"mod-warning"}}),this.disableSetting(n.settingEl)),this.addToggle("Use ribbon icon","Show a little house on the ribbon, allowing you to quickly access the homepage.","hasRibbonIcon",l=>this.plugin.setIcon(l),!0),new V.Setting(this.containerEl).setName("Separate mobile homepage").setDesc("For mobile devices, store the homepage and its settings separately.").addToggle(l=>l.setValue(this.plugin.settings.separateMobile).onChange(async p=>{this.plugin.settings.separateMobile=p,this.plugin.homepage=this.plugin.getHomepage(),await this.plugin.saveSettings(),this.display()})),this.addHeading("Commands",!0),this.containerEl.createDiv({cls:"nv-command-desc setting-item-description",text:"Select commands that will be executed when opening the homepage."}),this.commandBox=this.containerEl.createDiv({cls:"nv-command-box"}),this.updateCommandBox(),this.addHeading("Vault environment");let s=this.addDropdown("Opening method","Determine how extant tabs and panes are affected on startup.","openMode",_e);this.addDropdown("Manual opening method","Determine how extant tabs and panes are affected when opening with commands or the ribbon button.","manualOpenMode",_e),this.addToggle("Auto-create","If the homepage doesn't exist, create a note with the specified name.","autoCreate"),this.addToggle("Pin","Pin the homepage when opening.","pin"),this.addHeading("Pane"),this.addDropdown("Homepage view","Choose what view to open the homepage in.","view",nt),this.addToggle("Revert view on close","When navigating away from the homepage, restore the default view.","revertView",l=>this.plugin.homepage.setReversion(l)),this.addToggle("Auto-scroll","When opening the homepage, scroll to the bottom and focus on the last line.","autoScroll"),"dataview"in this.plugin.communityPlugins&&this.addToggle("Refresh Dataview","Always attempt to reload Dataview views when opening the homepage.","refreshDataview").descEl.createDiv({text:"Requires Dataview auto-refresh to be enabled.",attr:{class:"mod-warning"}}),V.Platform.isMobile||new V.ButtonComponent(this.containerEl).setButtonText("Copy debug info").setClass("nv-debug-button").onClick(async()=>await this.copyDebugInfo()),t&&this.workspaceHidden.forEach(this.disableSetting),(!this.plugin.homepage.data.openOnStartup||r)&&this.disableSetting(s.settingEl)}disableSetting(t){t.setAttribute("nv-greyed","")}addHeading(t,r=!1){let i=new V.Setting(this.containerEl).setHeading().setName(t);return r||this.workspaceHidden.push(i.settingEl),i}addDropdown(t,r,i,a,m){let n=new V.Setting(this.containerEl).setName(t).setDesc(r).addDropdown(async s=>{for(let l of Object.values(a))s.addOption(l,l);s.setValue(this.plugin.homepage.data[i]),s.onChange(async l=>{this.plugin.homepage.data[i]=l,await this.plugin.homepage.save(),m&&m(l)})});return this.workspaceHidden.push(n.settingEl),n}addToggle(t,r,i,a,m=!1){let n=new V.Setting(this.containerEl).setName(t).setDesc(r).addToggle(s=>s.setValue(this.plugin.homepage.data[i]).onChange(async l=>{this.plugin.homepage.data[i]=l,await this.plugin.homepage.save(),a&&a(l)}));return m||this.workspaceHidden.push(n.settingEl),n}updateCommandBox(){this.commandBox.innerHTML="";for(let[t,r]of this.plugin.homepage.data.commands.entries()){let i=this.app.commands.findCommand(r);if(!i)continue;let a=this.commandBox.createDiv({cls:"nv-command-pill",text:i.name});new V.ButtonComponent(a).setIcon("trash-2").setClass("clickable-icon").onClick(()=>{this.plugin.homepage.data.commands.splice(t,1),this.plugin.homepage.save(),this.updateCommandBox()})}new V.ButtonComponent(this.commandBox).setClass("nv-command-add-button").setButtonText("Add...").onClick(()=>{new Ze(this).open()})}async copyDebugInfo(){let t=this.app.vault.config,r={...this.settings,_defaultViewMode:t.defaultViewMode||"default",_livePreview:t.livePreview||"default",_focusNewTab:t.focusNewTab||"default",_plugins:Object.keys(this.plugin.communityPlugins),_internalPlugins:Object.values(this.plugin.internalPlugins).flatMap(i=>i.enabled?[i.instance.id]:[]),_obsidianVersion:window.electron.ipcRenderer.sendSync("version")};await navigator.clipboard.writeText(JSON.stringify(r)),new V.Notice("Copied homepage debug information to clipboard")}};var Zo='<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5"><path d="M10.025 21H6v-7H3v-1.5L12 3l9 9.5V14h-3v7h-4v-7h-3.975v7Z" style="fill:none;stroke:currentColor;stroke-width:2px"/></svg>',et=class extends oe.Plugin{constructor(){super(...arguments);this.loaded=!1;this.executing=!1}async onload(){let t=document.body.querySelector(".progress-bar")!==null;this.settings=await this.loadSettings(),this.internalPlugins=this.app.internalPlugins.plugins,this.communityPlugins=this.app.plugins.plugins,this.homepage=this.getHomepage(),this.app.workspace.onLayoutReady(async()=>{let r=this.communityPlugins["new-tab-default-page"];r&&(r._checkForNewTab=r.checkForNewTab,r.checkForNewTab=async i=>{if(!(this&&this.executing))return await r._checkForNewTab(i)}),t&&this.homepage.data.openOnStartup&&await this.homepage.open(),this.loaded=!0}),(0,oe.addIcon)("homepage",Zo),this.setIcon(this.homepage.data.hasRibbonIcon),this.homepage.setReversion(this.homepage.data.revertView),this.addSettingTab(new Qe(this.app,this)),this.addCommand({id:"open-homepage",name:"Open homepage",callback:()=>this.homepage.open()}),console.log(`Homepage: ${this.homepage.computeValue()} (method: ${this.homepage.data.openMode}, view: ${this.homepage.data.view}, kind: ${this.homepage.data.kind})`)}async onunload(){let t=this.communityPlugins["new-tab-default-page"];t&&(t.checkForNewTab=t._checkForNewTab)}getHomepage(){return this.settings.separateMobile&&oe.Platform.isMobile?(We in this.settings.homepages||(this.settings.homepages[We]={...this.settings.homepages[le]}),new De(We,this)):new De(le,this)}async loadSettings(){let t=await this.loadData();if(!t||t.version!==2)return Object.assign({},Ot,t);{let r={version:3,homepages:{},separateMobile:!1},i=t;return t.workspaceEnabled?(i.value=i.workspace,i.kind="Workspace"):t.useMoment?(i.value=i.momentFormat,i.kind="Date-dependent file"):(i.value=i.defaultNote,i.kind="File"),i.commands=[],delete i.workspace,delete i.momentFormat,delete i.defaultNote,delete i.useMoment,delete i.workspaceEnabled,r.homepages[le]=i,r}}async saveSettings(){await this.saveData(this.settings)}setIcon(t){t?this.addRibbonIcon("homepage","Open homepage",r=>this.homepage.open(r.button==2||oe.Keymap.isModifier(r,"Mod"))).setAttribute("id","nv-homepage-icon"):document.getElementById("nv-homepage-icon")?.remove()}hasRequiredPlugin(t){switch(t){case"Daily Note":return this.internalPlugins["daily-notes"]?.enabled;case"Workspace":return this.internalPlugins.workspaces?.enabled;default:return!0}}};

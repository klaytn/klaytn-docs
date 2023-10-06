"use strict";(self.webpackChunkklaytn_docs_test=self.webpackChunkklaytn_docs_test||[]).push([[3237],{7589:(e,t,n)=>{n.r(t),n.d(t,{default:()=>C});var l=n(7294),i=n(2263),r=n(9889),a=n(9521);const o=n.p+"assets/images/banner-0c852c8e1e36a36da7f79aca7dc4601a.png",c=a.ZP.div`
  display: flex;
  flex-direction: column;
`,s=((0,a.ZP)(c)`
  flex-direction: row;
`,e=>{let{size:t}=e;return t?`${t}px`:"100%"}),m=a.ZP.div`
  display: inline-block;
  background-image: url(${e=>e.src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  height: ${s};
  width: ${s};
  min-width: ${e=>{let{size:t}=e;return`${t}px`||""}};
`,d=e=>l.createElement(m,e);var u=n(7462),p=n(9960);const g=n.p+"assets/images/thum_01_L-41b5606ef15342d3264abcad376922f2.png",E=n.p+"assets/images/thum_02_L-06a287e5ee821d221a1b956bb90f320b.png",h=n.p+"assets/images/thum_03_L-375e85d0334029dbeccf9ecb092180dc.png",b=1440,x=1024,Z={overWideDesktop:"(min-width: 1921px)",overDesktop:"(min-width: 1441px)",mini:"(max-width: 320px)",mobile:"(max-width: 480px)",tablet:"(max-width: 1024px)"},w=(a.iv`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`,a.iv`
  cursor: pointer;
  :hover {
    box-shadow: 0px 0px 6px white;
  }
`,a.iv`
  display: block;
  overflow-x: hidden;
  text-overflow: ellipsis;
`,e=>a.iv`
  margin: 0 auto;
  width: ${"lg"===e?b:"sm"===e?480:x}px;
  max-width: 100%;
  @media ${Z.tablet} {
    width: auto;
    margin: 0;
  }
`),v=Z;var y=n(5999);const f=a.ZP.section`
  ${w("lg")}
`,k=(0,a.ZP)(c)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 60px 0;
  gap: 40px;

  @media ${v.tablet} {
    grid-template-columns: 1fr;
  }
`,$=(0,a.ZP)(c)`
  align-items: center;
  padding-bottom: 20px;
`,_=[{title:l.createElement(y.Z,null,"Klaytn Overview"),imgSrc:g,description:l.createElement(y.Z,null,"Want to know about Klaytn?"),to:"/docs/intro"},{title:l.createElement(y.Z,null,"Getting Started"),imgSrc:E,description:l.createElement(y.Z,null,"Want to start building on Klaytn?"),to:"/docs/intro"},{title:l.createElement(y.Z,null,"Node Operators"),imgSrc:h,description:l.createElement(y.Z,null,"Instructions on running Klaytn's nodes"),to:"/docs/intro"},{title:l.createElement(y.Z,null,"Awesome Klaytn"),imgSrc:h,description:l.createElement(y.Z,null,"Klaytn's vast ecosystem"),to:"/docs/intro"},{title:l.createElement(y.Z,null,"Klaytn Developer Hub"),imgSrc:h,description:l.createElement(y.Z,null,"Klaytn's Developer portal"),to:"/docs/intro"},{title:l.createElement(y.Z,null,"Klaytn Developer Forum"),imgSrc:h,description:l.createElement(y.Z,null,"Got a question? Visit our forum!"),to:"/docs/intro"}];function K(e){let{imgSrc:t,title:n,description:i,to:r}=e;return l.createElement(c,null,l.createElement(p.Z,{to:r},l.createElement($,null,l.createElement(d,{src:t,style:{width:"100%",height:150}})),l.createElement(c,{style:{alignItems:"center"}},l.createElement("h3",null,n),l.createElement("p",{style:{textAlign:"center"}}," ",i))))}function S(){return l.createElement(f,null,l.createElement(k,null,_.map(((e,t)=>l.createElement(K,(0,u.Z)({key:t},e))))))}const P=(0,a.ZP)(c)`
  background-image: url(${o});
  padding: 60px 0;
  align-items: center;
`;function D(){const{siteConfig:e}=(0,i.Z)(),t=e.title,n=e.tagline;return l.createElement(P,null,l.createElement("h1",{style:{color:"white"}},l.createElement(y.Z,{values:{title:t}},"{title}")),l.createElement("p",{style:{color:"white"}},l.createElement(y.Z,{values:{tagline:n}},"{tagline}")))}function C(){const{siteConfig:e}=(0,i.Z)();return l.createElement(r.Z,{title:`${e.title}`,description:"Description will go into a meta tag in <head />"},l.createElement(D,null),l.createElement("main",null,l.createElement(S,null)))}}}]);
"use strict";(self.webpackChunkinteractive_docs=self.webpackChunkinteractive_docs||[]).push([[128],{8864:(a,t,e)=>{e.r(t),e.d(t,{assets:()=>c,contentTitle:()=>r,default:()=>l,frontMatter:()=>i,metadata:()=>o,toc:()=>d});e(7294);var n=e(5893),s=e(1151);const i={sidebar_position:1,title:"What is SnapStart"},r=void 0,o={unversionedId:"lambda-snapstart/lambda-snapstart",id:"lambda-snapstart/lambda-snapstart",title:"What is SnapStart",description:"Lambda SnapStart is a feature of AWS Lambda announced at re:Invent 2022. SnapStart can improve cold start performance for latency-sensitive applications by up to 10x. Typically, this is with no changes to your existing application code.",source:"@site/docs/lambda-snapstart/lambda-snapstart.md",sourceDirName:"lambda-snapstart",slug:"/lambda-snapstart/",permalink:"/docs/lambda-snapstart/",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/lambda-snapstart/lambda-snapstart.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"What is SnapStart"},sidebar:"tutorialSidebar",previous:{title:"Lambda SnapStart",permalink:"/docs/category/lambda-snapstart"},next:{title:"Enabling SnapStart",permalink:"/docs/lambda-snapstart/enabling-snapstart"}},c={},d=[];function p(a){const t=Object.assign({p:"p",a:"a",img:"img"},(0,s.ah)(),a.components);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.a,{href:"https://docs.aws.amazon.com/lambda/latest/dg/snapstart.html",children:"Lambda SnapStart"})," is a feature of AWS Lambda announced at re:Invent 2022. SnapStart can improve cold start performance for latency-sensitive applications by up to 10x. Typically, this is with no changes to your existing application code."]}),"\n",(0,n.jsx)(t.p,{children:"SnapStart works by running the initialization phase of your Lambda function at the point in which a new version is published. Lambda takes a Firecracked microVM snapshot of the memory and disk state. The snapshot is then encrypted and cached for low-latency access."}),"\n",(0,n.jsx)(t.p,{children:"When a request is received into your Lambda function, this snapshot is then restored and is used to handle the request."}),"\n",(0,n.jsxs)(t.p,{children:["If your application depends on uniqueness of state, the AWS documentation contains a deep dive into how to ",(0,n.jsx)(t.a,{href:"https://docs.aws.amazon.com/lambda/latest/dg/snapstart-uniqueness.html",children:"handle uniqueness"}),". Lambda uses a single snapshot as the initial state, which is then re-used for multiple request handling execution environments.\nUniqueness, network connections and temporary data all need to be considered for your existing applications."]}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.a,{href:"https://www.youtube.com/watch?v=ZbnAithBNYY",children:(0,n.jsx)(t.img,{src:"https://img.youtube.com/vi/ZbnAithBNYY/0.jpg",alt:"SnapStart reInvent title screen"})})})]})}const l=function(a){void 0===a&&(a={});const{wrapper:t}=Object.assign({},(0,s.ah)(),a.components);return t?(0,n.jsx)(t,Object.assign({},a,{children:(0,n.jsx)(p,a)})):p(a)}}}]);
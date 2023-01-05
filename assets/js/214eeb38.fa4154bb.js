"use strict";(self.webpackChunkinteractive_docs=self.webpackChunkinteractive_docs||[]).push([[736],{3954:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>u,frontMatter:()=>o,metadata:()=>a,toc:()=>c});s(7294);var i=s(5893),n=s(1151);const o={sidebar_position:1,title:"An Introduction to Serverless Testing"},r=void 0,a={unversionedId:"testing/serverless-testing-introduction",id:"testing/serverless-testing-introduction",title:"An Introduction to Serverless Testing",description:"A variety of different testing techniques are required to build production ready serverless applications. Some of which require a fundamental change from what you as a developer might be used to. I'm a Java developer too, so I know how much you love running up an application on localhost and stepping through with your debugger. With serverless, this can be a challenge.",source:"@site/docs/testing/serverless-testing-introduction.md",sourceDirName:"testing",slug:"/testing/serverless-testing-introduction",permalink:"/docs/testing/serverless-testing-introduction",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/testing/serverless-testing-introduction.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"An Introduction to Serverless Testing"},sidebar:"tutorialSidebar",previous:{title:"Testing",permalink:"/docs/category/testing"},next:{title:"Test Ready Lambda Functions",permalink:"/docs/testing/test-ready-lambda-functions"}},l={},c=[{value:"Mocks vs Emulators",id:"mocks-vs-emulators",level:2},{value:"Further Reading",id:"further-reading",level:2}];function d(e){const t=Object.assign({p:"p",strong:"strong",a:"a",img:"img",h2:"h2",ul:"ul",li:"li"},(0,n.ah)(),e.components);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.p,{children:"A variety of different testing techniques are required to build production ready serverless applications. Some of which require a fundamental change from what you as a developer might be used to. I'm a Java developer too, so I know how much you love running up an application on localhost and stepping through with your debugger. With serverless, this can be a challenge."}),"\n",(0,i.jsx)(t.p,{children:"Serverless applications comprise lots of small, loosely joined pieces of application functionality. Each piece of your application code has a single responsibility, and they work through integrations. Serverless applications are commonly heavily reliant on other cloud services to handle these integrations."}),"\n",(0,i.jsxs)(t.p,{children:["Because of the heavy reliance on integrations, I would always recommend to ",(0,i.jsx)(t.strong,{children:"test in the cloud"})," as early as possible. Add IAM and permissions into the mix as well and trying to fake/emulate all of this locally is difficult. It\u2019s important to test your application against actual cloud services! Write unit tests to test your business logic locally, but run integration tests in the cloud."]}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.a,{href:"https://engineering.atspotify.com/2018/01/testing-of-microservices/",children:"Spotify engineering wrote a fantastic blog article"})," around how they test microservices, including the introduction of the term 'testing honeycomb'. In the testing honeycomb, there are a few unit tests to test business logic, followed by many integration tests to test how the service in question works in a deployed environment, and then a minimal number of integrated or system tests."]}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{src:s(5125).Z+"",loading:"lazy",alt:"Testing pyramid and honeycomb",width:"885",height:"327"})}),"\n",(0,i.jsx)(t.p,{children:"In this section, we will walk through different testing patterns you can use when building serverless applications."}),"\n",(0,i.jsx)(t.h2,{id:"mocks-vs-emulators",children:"Mocks vs Emulators"}),"\n",(0,i.jsx)(t.p,{children:"When building a serverless app, the recommendation for local development is to mock where possible and use emulators sparingly. Whilst emulating the whole of AWS locally on your machine may seem like a good idea, make them an edge case. Lack of feature parity (+ IAM), configuration cost and limited service coverage are some reasons why relying on emulators as a test strategy may not provide a great developer experience."}),"\n",(0,i.jsx)(t.p,{children:"The same applies to mocking. Although mocking enables you to control the functionality of an AWS SDK, there is still a cost in configuration and the lack of feature parity. Mocks are useful for testing your business logic without needing to worry about external integrations, but for truly valuable tests, get in the cloud as quickly as possible."}),"\n",(0,i.jsx)(t.h2,{id:"further-reading",children:"Further Reading"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:["The AWS Samples GitHub organisation contains a ",(0,i.jsx)(t.a,{href:"https://github.com/aws-samples/serverless-test-samples",children:"serverless-test-samples repository"})]}),"\n"]})]})}const u=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,n.ah)(),e.components);return t?(0,i.jsx)(t,Object.assign({},e,{children:(0,i.jsx)(d,e)})):d(e)}},5125:(e,t,s)=>{s.d(t,{Z:()=>i});const i=s.p+"assets/images/testing-shapes-872404af670229480a31c4290d094f5d.png"}}]);
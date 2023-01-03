---
sidebar_position: 1
title: What is SnapStart
---

[Lambda SnapStart](https://docs.aws.amazon.com/lambda/latest/dg/snapstart.html) is a feature of AWS Lambda announced at re:Invent 2022. SnapStart can improve cold start performance for latency-sensitive applications by up to 10x. Typically, this is with no changes to your existing application code.

SnapStart works by running the initialization phase of your Lambda function at the point in which a new version is published. Lambda takes a Firecracked microVM snapshot of the memory and disk state. The snapshot is then encrypted and cached for low-latency access.

When a request is received into your Lambda function, this snapshot is then restored and is used to handle the request.

If your application depends on uniqueness of state, the AWS documentation contains a deep dive into how to [handle uniqueness](https://docs.aws.amazon.com/lambda/latest/dg/snapstart-uniqueness.html). Lambda uses a single snapshot as the initial state, which is then re-used for multiple request handling execution environments.
Uniqueness, network connections and temporary data all need to be considered for your existing applications.

[![SnapStart reInvent title screen](https://img.youtube.com/vi/ZbnAithBNYY/0.jpg)](https://www.youtube.com/watch?v=ZbnAithBNYY)
---
sidebar_position: 2
title: Add Spring Lambda Handler
---

As described in the [create a Lambda function](/docs/tutorial-your-first-lambda/create-a-lambda-function) section, AWS Lambda requires a handler. The same is true when running Spring on Lambda. For that, you need to create the entrypoint class.

<CH.Scrollycoding>

## Interface

The created class needs to implement the _`RequestStreamHandler`_ interface. This interface provides a method to override that handles the request from Lambda and passes that on to _`SpringBootLambdaContainerHandler`_.

```java StreamLambdaHandler.java focus=14:14
package com.example.demo;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import com.amazonaws.serverless.exceptions.ContainerInitializationException;
import com.amazonaws.serverless.proxy.model.AwsProxyRequest;
import com.amazonaws.serverless.proxy.model.AwsProxyResponse;
import com.amazonaws.serverless.proxy.spring.SpringBootLambdaContainerHandler;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestStreamHandler;

public class StreamLambdaHandler implements RequestStreamHandler {
    private static SpringBootLambdaContainerHandler<AwsProxyRequest, AwsProxyResponse> handler;
    static {
        try {
            handler = SpringBootLambdaContainerHandler.getAwsProxyHandler(DemoApplication.class);
            // If you are using HTTP APIs with the version 2.0 of the proxy model, use the getHttpApiV2ProxyHandler
            // method: handler = SpringBootLambdaContainerHandler.getHttpApiV2ProxyHandler(Application.class);
        } catch (ContainerInitializationException e) {
            // if we fail here. We re-throw the exception to force another cold start
            e.printStackTrace();
            throw new RuntimeException("Could not initialize Spring Boot application", e);
        }
    }
    @Override
    public void handleRequest(InputStream inputStream, OutputStream outputStream,
            Context context) throws IOException {
        handler.proxyStream(inputStream, outputStream, context);

    }}

```

---

## Initialization

A static constructor is used to configure the _`SpringBootLambdaContainerHandler`_. The handler has a _`getAwsProxyHandler`_ method that requires a class annotated with the _`@SpringBootApplication`_. In this case, the application class for our Spring Boot API is called _`DemoApplication`_. The handler property should be static, so that Lambda can re-use it through multiple invocations.

```java StreamLambdaHandler.java focus=16:26
package com.example.demo;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import com.amazonaws.serverless.exceptions.ContainerInitializationException;
import com.amazonaws.serverless.proxy.model.AwsProxyRequest;
import com.amazonaws.serverless.proxy.model.AwsProxyResponse;
import com.amazonaws.serverless.proxy.spring.SpringBootLambdaContainerHandler;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestStreamHandler;

public class StreamLambdaHandler implements RequestStreamHandler {
    private static SpringBootLambdaContainerHandler<AwsProxyRequest, AwsProxyResponse> handler;
    static {
        try {
            handler = SpringBootLambdaContainerHandler.getAwsProxyHandler(DemoApplication.class);
            // If you are using HTTP APIs with the version 2.0 of the proxy model, use the getHttpApiV2ProxyHandler
            // method: handler = SpringBootLambdaContainerHandler.getHttpApiV2ProxyHandler(Application.class);
        } catch (ContainerInitializationException e) {
            // if we fail here. We re-throw the exception to force another cold start
            e.printStackTrace();
            throw new RuntimeException("Could not initialize Spring Boot application", e);
        }
    }
    @Override
    public void handleRequest(InputStream inputStream, OutputStream outputStream,
            Context context) throws IOException {
        handler.proxyStream(inputStream, outputStream, context);

    }}

```

---

## Handler

The _`handleRequest`_ method overrides the method from the _`RequestStreamHandler`_ class. It takes the payload from Lambda and passes that on to the Spring application.

```java StreamLambdaHandler.java focus=27:31
package com.example.demo;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import com.amazonaws.serverless.exceptions.ContainerInitializationException;
import com.amazonaws.serverless.proxy.model.AwsProxyRequest;
import com.amazonaws.serverless.proxy.model.AwsProxyResponse;
import com.amazonaws.serverless.proxy.spring.SpringBootLambdaContainerHandler;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestStreamHandler;

public class StreamLambdaHandler implements RequestStreamHandler {
    private static SpringBootLambdaContainerHandler<AwsProxyRequest, AwsProxyResponse> handler;
    static {
        try {
            handler = SpringBootLambdaContainerHandler.getAwsProxyHandler(DemoApplication.class);
            // If you are using HTTP APIs with the version 2.0 of the proxy model, use the getHttpApiV2ProxyHandler
            // method: handler = SpringBootLambdaContainerHandler.getHttpApiV2ProxyHandler(Application.class);
        } catch (ContainerInitializationException e) {
            // if we fail here. We re-throw the exception to force another cold start
            e.printStackTrace();
            throw new RuntimeException("Could not initialize Spring Boot application", e);
        }
    }
    @Override
    public void handleRequest(InputStream inputStream, OutputStream outputStream,
            Context context) throws IOException {
        handler.proxyStream(inputStream, outputStream, context);
    }}

```

---

</CH.Scrollycoding>

If video is more your thing, check out this video on [deploying a Spring API to AWS Lambda](https://www.youtube.com/watch?v=A1rYiHTy9Lg).

---
sidebar_position: 2
title: Create A Lambda Function
description: A guide to creating a Lambda function with AWS SAM
keywords: [aws sam, cli, java]
---

# Create a Lambda Function

Now it's time to create your first Lambda function. AWS SAM provides an initialization workflow to start a new project. In an empty folder, run the below command and follow the wizard.

```shellscript sam-new
sam init
```

- AWS Quick Start Template
- Package as ZIP
- java11 runtime
- maven as package manager
- project name as _`java-sam-app`_
- hello-world example

The created folder structure contains the following files and folders:

```
root
└── events
  ├── event.json
└── HelloWorldFunction
   ├── src
    ├── main
      ├── java
        ├── helloworld
          ├── App.java
   ├── test
    ├── java
      ├── helloworld
        ├── AppTest.java
   ├── target
   ├── pom.xml
```

We will come to tests in a later section, let's first focus on the Lambda function code itself in `App.java`. Open up the `App.java` file in the IDE of your choice.

<CH.Scrollycoding>

## Lambda Functions in Java

In it's simplest form, a Lambda function is just a public method. This is the method that will be invoked by the Lambda service. It can be called whatever you want, call it banana if you like.

Typically, it's a good idea to standardize on something along the lines of _`handleRequest`_ or _`functionHandler`_.

```java App.java
package helloworld;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;

/**
 * Handler for requests to Lambda function.
 */
public class App implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

    public APIGatewayProxyResponseEvent handleRequest(
      final APIGatewayProxyRequestEvent input,
      final Context context) {
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");

        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent()
                .withHeaders(headers);
        try {
            final String pageContents = this.getPageContents("https://checkip.amazonaws.com");
            String output = String.format("{ \"message\": \"hello world\", \"location\": \"%s\" }", pageContents);

            return response
                    .withStatusCode(200)
                    .withBody(output);
        } catch (IOException e) {
            return response
                    .withBody("{}")
                    .withStatusCode(500);
        }
    }

    private String getPageContents(String address) throws IOException{
        URL url = new URL(address);
        try(BufferedReader br = new BufferedReader(new InputStreamReader(url.openStream()))) {
            return br.lines().collect(Collectors.joining(System.lineSeparator()));
        }
    }
}

```

---

## Handler Interfaces

The _`App`_ class can implement either the _`RequestHandler`_ or _`RequestStreamHandler`_ interface. The interface simplifies handler configuration and validates your request handler signature at compile time.

The _`RequestHandler`_ interface is a generic type that takes 2 input parameters. The Lambda runtime for Java provides serialization and deserialization for the types specified in the _`RequestHandler`_.

```java App.java focus=1:1
public class App implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

    public APIGatewayProxyResponseEvent handleRequest(
      final APIGatewayProxyRequestEvent input,
      final Context context) {
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");

        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent()
                .withHeaders(headers);
        try {
            final String pageContents = this.getPageContents("https://checkip.amazonaws.com");
            String output = String.format("{ \"message\": \"hello world\", \"location\": \"%s\" }", pageContents);

            return response
                    .withStatusCode(200)
                    .withBody(output);
        } catch (IOException e) {
            return response
                    .withBody("{}")
                    .withStatusCode(500);
        }
    }

    private String getPageContents(String address) throws IOException{
        URL url = new URL(address);
        try(BufferedReader br = new BufferedReader(new InputStreamReader(url.openStream()))) {
            return br.lines().collect(Collectors.joining(System.lineSeparator()));
        }
    }
}

```

---

## Custom Serialization

If custom serialization is required then implement the _`RequestStreamHandler`_ interface. The method handling the request now requires a slightly different signature. Override the _`handleRequest`_ method that takes an _`InputStream`_, _`OutputStream`_ and _`Context`_ as parameters.

```java App.java
public class App implements RequestStreamHandler {
    Gson gson = new GsonBuilder().setPrettyPrinting().create();

    @Override
    public void handleRequest(
      InputStream inputStream,
      OutputStream outputStream
      Context context) {
        // Read from InputStream

        try {

            // Write to OutputStream

        }
        catch (IOException e) {

        }
        finally
        {
          // Remember to close the reader and writer
        }
    }
}

```

---

## The Function Handler

The handler itself is a simple method. It be sync or async, that's up to you. The important parts are the method parameters. A Lambda function handler can take up to 2 parameters.

[The first is the payload](focus://2). This is the event payload the Lambda service will pass into your function. In this example, we are passing in a Java object representing an API Gateway event payload.

[The second is the Lambda `Context`](focus://3). This is an optional parameter, delete it if you wish. The _`Context`_ object holds contextual information about this specific invoke. Things like the `RequestId`, `FunctionName` and the `FunctionVersion`.

```java App.java
public APIGatewayProxyResponseEvent handleRequest(
  final APIGatewayProxyRequestEvent input,
  final Context context) {
    Map<String, String> headers = new HashMap<>();
    headers.put("Content-Type", "application/json");
    headers.put("X-Custom-Header", "application/json");

    APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent()
            .withHeaders(headers);
    try {
        final String pageContents = this.getPageContents("https://checkip.amazonaws.com");
        String output = String.format("{ \"message\": \"hello world\", \"location\": \"%s\" }", pageContents);

        return response
                .withStatusCode(200)
                .withBody(output);
    } catch (IOException e) {
        return response
                .withBody("{}")
                .withStatusCode(500);
    }
}

```

</CH.Scrollycoding>

And that is all there is to your first Lambda function. Feeling good? Now let's go and deploy it to your AWS account.

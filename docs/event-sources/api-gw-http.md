---
sidebar_position: 1
title: API Gateway HTTP API
---

## Trigger AWS Lambda with API Gateway HTTP API

![API Gateway to AWS Lambda diagram](/img/event-sources/api-gw-http-lambda.png)

In this pattern, we will walk through how to trigger AWS Lambda from an API call to an API Gateway HTTP API endpoint.

## Packages Required

```shellscript install
aws-lambda-java-events
```

## Imports Required

```java
import com.amazonaws.services.lambda.runtime.events.APIGatewayV2HTTPEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayV2HTTPResponse;
```

## Function Code

The API Gateway to Lambda integration is what is known as a synchronous invoke. API Gateway will wait for Lambda to return a response that is then passed back to the caller. For that reason, we have a _`APIGatewayV2HTTPEvent`_ as our event payload and _`APIGatewayV2HTTPResponse`_ as our method response.

```java App.java
public class App implements RequestHandler<APIGatewayV2HTTPEvent, APIGatewayV2HTTPResponse> {

    public APIGatewayV2HTTPResponse handleRequest(final APIGatewayV2HTTPEvent input, final Context context) {
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("X-Custom-Header", "application/json");

        APIGatewayV2HTTPResponse response = new APIGatewayV2HTTPResponse();
        response.setHeaders(headers);

        try {
            // Perform business logic

            response.setStatusCode(200);
            response.setBody("{}");
        } catch (IOException e) {
            response.setBody("{}");
            response.setStatusCode(500);
        }

        return response;
    }
}
```

## Best Practices

- Catch exceptions and return a useful response to API Gateway

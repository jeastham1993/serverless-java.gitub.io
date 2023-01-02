---
sidebar_position: 2
title: Amazon EventBridge
---

## Trigger AWS Lambda from SQS

![AmazonEventBridge to AWS Lambda diagram](/img/event-sources/event-bridge-lambda.png)

In this pattern, we will walk through how to trigger AWS Lambda from an event in Amazon EventBridge.

## Packages Required

```shellscript install
aws-lambda-java-events
```

## Imports Required

```java
import com.amazonaws.services.lambda.runtime.events.ScheduledEvent;
```

## Function Code

The Amazon EventBridge to Lambda integration is what is known as an asynchronous invoke. The event passed into Lambda will contain a _`detail`_ property that contains the actual event payload.

```java App.java
public class App implements RequestHandler<ScheduledEvent, String> {

    public String handleRequest(final ScheduledEvent input, final Context context) {


        try {
            // Perform business logic
            var detail = input.getDetail(); // Event payload is in this property.
            var detailType = input.getDetailType();
            var source = input.getSource();

        } catch (Exception e) {
            return "ERROR";
        }

        return "OK";
    }
}
```

## Best Practices

- Configure **DeadLetterQueues** both on the EventBridge integration and Lambda itself. Without DLQ's, failed messages will be lost.

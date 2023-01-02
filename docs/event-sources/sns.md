---
sidebar_position: 4
title: Amazon SNS
---

## Trigger AWS Lambda from SNS

![SNS to AWS Lambda diagram](/img/event-sources/sns-lambda.png)

In this pattern, we will walk through how to trigger AWS Lambda from messages sent to an SNS topic.

## Packages Required

```shellscript install
aws-lambda-java-events
```

## Imports Required

```java
import com.amazonaws.services.lambda.runtime.events.SNSEvent;
```

## Function Code

The SNS to Lambda integration is what is known as an asynchronous invoke. Events are forwarded to the Lambda service and processed asynchronously, meaning the caller can continue doing other work.

The _`SNSEvent`_ object contains a _`getSns()`_ method that returns a List of _`SNS`_ objects. The _`SNS`_ object contains all the message metadata including the Message body itself, the type of message and the ARN of the topic the message came from. The message is retrieved using the _`getSns()`_ method.

It's important to implement error handling and dead letter queues. If the Lambda functions fails and no dead letter queue is configured, messages will be lost.

```java App.java
public class App implements RequestHandler<SNSEvent, String> {

    public String handleRequest(final SNSEvent input, final Context context) {

        try {
            // Perform business logic
            input.getRecords().forEach((snsEvent) -> {
                var snsMessage = snsEvent.getSNS().getMessage();
            });

        } catch (Exception e) {
            return "ERROR";
        }

        return "OK";
    }
}
```

## Best Practices

- Ensure errors are handled. If the Lambda function fails messages will be lost if no dead letter queue is configured

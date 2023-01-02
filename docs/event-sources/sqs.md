---
sidebar_position: 5
title: Amazon SQS
---

## Trigger AWS Lambda from SQS

![SQS to AWS Lambda diagram](/img/event-sources/sqs-lambda.png)

In this pattern, we will walk through how to trigger AWS Lambda from messages placed in an SQS queue.

## Packages Required

```shellscript install
aws-lambda-java-events
```

## Imports Required

```java
import com.amazonaws.services.lambda.runtime.events.SQSEvent;
```

## Function Code

The SQS to Lambda integration is what is known as a poll based invoke. The Lambda service will poll SQS on your behalf and pass batches of messages into Lambda.

The _`SQSEvent`_ object contains a _`getRecords()`_ method that returns a list of _`SQSMessage`_ objects. The number of messages per batch is configured at the event source.

You can also return an _`SQSBatchResponse`_ object to handle a situation in which some of the messages in a batch fail. Using a try/catch block within the iteration allows you to create a new _`BatchItemFailure`_ object, setting the item identifier for the individual message that fails.

```java App.java
public class App implements RequestHandler<SQSEvent, SQSBatchResponse> {

    public SQSBatchResponse handleRequest(final SQSEvent input, final Context context) {

        var batchFailures = new ArrayList<SQSBatchResponse.BatchItemFailure>();

        // Perform business logic
        input.getRecords().forEach((sqsEvent) -> {
            try {
                var messageBody = sqsEvent.getMd5OfBody();
            }
            catch (Exception ex) {
                SQSBatchResponse.BatchItemFailure failure = new SQSBatchResponse.BatchItemFailure();
                failure.setItemIdentifier(sqsEvent.getMessageId());

                batchFailures.add(failure);
            }
        });

        var batchResponse = SQSBatchResponse.builder()
            .withBatchItemFailures(batchFailures);

        return batchResponse.build();
    }
}
```

## Best Practices

- Ensure errors are handled. If the Lambda function fails **all** messages will go back on to the SQS queue. Try/catch and return an _`SQSBatchResponse`_ object to handle any partial batch failures.

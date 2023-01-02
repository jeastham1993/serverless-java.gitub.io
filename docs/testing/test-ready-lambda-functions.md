---
sidebar_position: 2
title: Test Ready Lambda Functions
---

To enable easy testing of our serverless applications there are some slight tweaks to make to our Lambda function. Instead of having a single constructor and performing all of our initialization there, we are leveraging a separate constructor. The parameterless constructor is used by the Lambda service, the second constructor is where initialization logic is performed.

This enables a specific version of the DDBUtils object to be passed in. Or created at initialization time within the Lambda service.

<CH.Scrollycoding>

## The Lambda Service Constructor

Remember, the Lambda service **always** needs a public, parameterless constructor. Without this, the Lambda service won't be able to initialize your handler class. When the Lambda service initializes the function, the main constructor is called passing in a null value for the DDBUtils object.

```java App.java focus=22:24
public class TicketFunction implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

  private static final Logger logger = LoggerFactory.getLogger(TicketFunction.class);
  private static final ObjectMapper mapper = new ObjectMapper();
  private DDBUtils ddbUtils;

  public TicketFunction(DDBUtils ddbUtils) {
    if (ddbUtils == null) {
      DynamoDbClient ddb = DynamoDbClient.builder()
        .credentialsProvider(EnvironmentVariableCredentialsProvider.create())
        .region(Region.US_EAST_1)
        .build();
      DynamoDbEnhancedClient enhancedClient = DynamoDbEnhancedClient.builder()
        .dynamoDbClient(ddb)
        .build();
      this.ddbUtils = new DDBUtils(enhancedClient);
    } else {
      this.ddbUtils = ddbUtils;
    }
  }

  public TicketFunction() {
    this(null);
  }

  // Handler method goes here
}
```

---

## Main Constructor

All of our initialization logic is separated into a separate constructor.

This gives us an entrypoint in which we can pass in mock implementations of our services to test how the logic of our Lambda functions functions with different event payloads. If the object passed into the constructor is not null, the passed in one is used. Otherwise, a new DynamoDB client is built.

```java App.java focus=7:20
public class TicketFunction implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

  private static final Logger logger = LoggerFactory.getLogger(TicketFunction.class);
  private static final ObjectMapper mapper = new ObjectMapper();
  private DDBUtils ddbUtils;

  public TicketFunction(DDBUtils ddbUtils) {
    if (ddbUtils == null) {
      DynamoDbClient ddb = DynamoDbClient.builder()
        .credentialsProvider(EnvironmentVariableCredentialsProvider.create())
        .region(Region.US_EAST_1)
        .build();
      DynamoDbEnhancedClient enhancedClient = DynamoDbEnhancedClient.builder()
        .dynamoDbClient(ddb)
        .build();
      this.ddbUtils = new DDBUtils(enhancedClient);
    } else {
      this.ddbUtils = ddbUtils;
    }
  }

  public TicketFunction() {
    this(null);
  }

  // Handler method goes here
}
```

---

</CH.Scrollycoding>

## Further Reading

- The AWS Samples GitHub organisation contains a [serverless-test-samples repository](https://github.com/aws-samples/serverless-test-samples)

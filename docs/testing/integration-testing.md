---
sidebar_position: 5
title: Integration Test In The Cloud
---

Our unit tests have all passed (Yay!) and we are confident our business logic works. Now it's time to test if the integrations themselves work, in this case an an actual interaction with DynamoDB

Run these tests against **deployed cloud resources**. A first pass against an emulated version of DynamoDB might be useful, but running against Dynamo itself as early as possible will catch issues quickly.

<CH.Scrollycoding>

## Integration Test Setup

[jUnit](https://junit.org/junit5/) is used for all testing. For integration tests, it's possible to just use the same default constructor that the Lambda service will use in the cloud.

```java App.java focus=22
// This is an integration test as it requires an actual AWS account.
// It assumes that a DynamoDB table with name "tickets" exists on AWS in US-EAST-1
@ExtendWith(SystemStubsExtension.class)
public class TicketFunctionIntegrationTest {

  @SystemStub
  private static EnvironmentVariables environmentVariables;
  private final DynamoDbClient ddbClient = DynamoDbClient.builder()
    .region(Region.US_EAST_1)
    .build();
  private List<String> ticketList = new ArrayList<>();

  @AfterEach
  public void cleanup() {
    DynamoTestUtil.deleteFromDDBTable(ddbClient, ticketList);
    ticketList.clear();
  }

  @ParameterizedTest
  @Event(value = "events/apigw_request_1.json", type = APIGatewayProxyRequestEvent.class)
  public void testPutTicket(APIGatewayProxyRequestEvent event, EnvironmentVariables environmentVariables) {
    TicketFunction function = new TicketFunction();
    APIGatewayProxyResponseEvent response = function.handleRequest(event, null);
    Assertions.assertNotNull(response);
    Assertions.assertNotNull(response.getBody());
    String uuidStr = response.getBody();
    Assertions.assertNotNull(uuidStr);
    ticketList.add(uuidStr.substring(1, uuidStr.length() - 1));
    DynamoTestUtil.validateItems(ticketList, ddbClient);
  }
}

```

---

## Assert On What Your Users Want

Fundamentally, we write tests to ensure that the code we deploy into production services the needs of our customers and doesn't break any existing functionality. Working backwards from this statement tells us to assert based on what our users are expecting. Testing that the API call to DynamoDB actually happened may be useful, but our users don't care about the internals if the service itself isn't working.

```java App.java focus=11:20
// This is an integration test as it requires an actual AWS account.
// It assumes that a DynamoDB table with name "tickets" exists on AWS in US-EAST-1
@ExtendWith(SystemStubsExtension.class)
public class TicketFunctionIntegrationTest {

  // Removed for brevity...

  @ParameterizedTest
  @Event(value = "events/apigw_request_1.json", type = APIGatewayProxyRequestEvent.class)
  public void testPutTicket(APIGatewayProxyRequestEvent event, EnvironmentVariables environmentVariables) {
    TicketFunction function = new TicketFunction();
    APIGatewayProxyResponseEvent response = function.handleRequest(event, null);
    Assertions.assertNotNull(response);
    Assertions.assertNotNull(response.getBody());
    String uuidStr = response.getBody();
    Assertions.assertNotNull(uuidStr);
    ticketList.add(uuidStr.substring(1, uuidStr.length() - 1));
    DynamoTestUtil.validateItems(ticketList, ddbClient);
  }
}

```

---

## Cleanup

Throughout the test run the created tickets are collected into a list. That list is then used to cleanup the DynamoDB table after the test run is finished. This ensures the state of the system is consistent for every run.

```java App.java focus=7:11
// This is an integration test as it requires an actual AWS account.
// It assumes that a DynamoDB table with name "tickets" exists on AWS in US-EAST-1
@ExtendWith(SystemStubsExtension.class)
public class TicketFunctionIntegrationTest {

  @AfterEach
  public void cleanup() {
    DynamoTestUtil.deleteFromDDBTable(ddbClient, ticketList);
    ticketList.clear();
  }

  @ParameterizedTest
  @Event(value = "events/apigw_request_1.json", type = APIGatewayProxyRequestEvent.class)
  public void testPutTicket(APIGatewayProxyRequestEvent event, EnvironmentVariables environmentVariables) {
    TicketFunction function = new TicketFunction();
    APIGatewayProxyResponseEvent response = function.handleRequest(event, null);
    Assertions.assertNotNull(response);
    Assertions.assertNotNull(response.getBody());
    String uuidStr = response.getBody();
    Assertions.assertNotNull(uuidStr);
    ticketList.add(uuidStr.substring(1, uuidStr.length() - 1));
    DynamoTestUtil.validateItems(ticketList, ddbClient);
  }
}

```

</CH.Scrollycoding>

## Further Reading

- The AWS Samples GitHub organisation contains a [serverless-test-samples repository](https://github.com/aws-samples/serverless-test-samples)

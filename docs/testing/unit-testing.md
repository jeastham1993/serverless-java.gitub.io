---
sidebar_position: 2
title: Unit Test Your Business Logic
---

There are two opposing views to unit testing, both of which are valid in the right scenario. The first, using mocks to remove non-determinism when talking to remote services, is one of the most important when writing unit tests against serverless applications. Unit tests could quite easily interact with the cloud services themselves, but there are a number of potential blockers here.

- Does your company allow each developer to have their own resources/AWS account?
- Do you have permission to connect directly from your developer machine to AWS?
- What if another engineer changes the resources you've perfectly aligned for your test run?

There are a number of factors that can make your unit tests non-deterministic, making them brittle.

Instead, **focus on your business logic** when developing locally. Let's look at an example:

<CH.Scrollycoding>

## Mock Integrations

This example uses the [Mockito](https://site.mockito.org/) library to create mock implementations of the SDK calls. This Lambda function is written to interact with DynamoDB. The _`@Mock`_ annotation creates and injects mocked instances.

```java UnitTest.java focus=3:4
public class TicketFunctionMockTest {

  @Mock
  private transient DDBUtils testUtils;
  private transient String uuid = null;
  private TicketFunction function;

  @BeforeEach
  public void beforeEach() {
    MockitoAnnotations.openMocks(this);
    function = new TicketFunction(testUtils);
  }

  @ParameterizedTest
  @Event(value = "events/apigw_request_1.json", type = APIGatewayProxyRequestEvent.class)
  public void testEventDeserialization(APIGatewayProxyRequestEvent event) {
    uuid = UUID.randomUUID().toString();
    Mockito.when(testUtils.persistTicket(Mockito.any(Ticket.class))).thenReturn(uuid);

    APIGatewayProxyResponseEvent response = function.handleRequest(event, null);
    ArgumentCaptor<Ticket> ticketArgumentCaptor = ArgumentCaptor.forClass(Ticket.class);

    Mockito.verify(testUtils).persistTicket(ticketArgumentCaptor.capture());

    Assertions.assertEquals("Lambda rocks", ticketArgumentCaptor.getValue().getDescription());
    Assertions.assertEquals("testuser", ticketArgumentCaptor.getValue().getUserId());
  }
}

```

---

## Use The Main Constructor

When initializing our _`Function`_ under test the internal constructor is used. This allows the mocks that have just been created to be passed into the Function. Our function code is none the wiser, it runs it's logic as normal. The _`TicketFunction`_ is initialized before each test method runs to ensure a new function is used for each test.

```java UnitTest.java focus=11:11
public class TicketFunctionMockTest {

  @Mock
  private transient DDBUtils testUtils;
  private transient String uuid = null;
  private TicketFunction function;

  @BeforeEach
  public void beforeEach() {
    MockitoAnnotations.openMocks(this);
    function = new TicketFunction(testUtils);
  }

  @ParameterizedTest
  @Event(value = "events/apigw_request_1.json", type = APIGatewayProxyRequestEvent.class)
  public void testEventDeserialization(APIGatewayProxyRequestEvent event) {
    uuid = UUID.randomUUID().toString();
    Mockito.when(testUtils.persistTicket(Mockito.any(Ticket.class))).thenReturn(uuid);

    APIGatewayProxyResponseEvent response = function.handleRequest(event, null);
    ArgumentCaptor<Ticket> ticketArgumentCaptor = ArgumentCaptor.forClass(Ticket.class);

    Mockito.verify(testUtils).persistTicket(ticketArgumentCaptor.capture());

    Assertions.assertEquals("Lambda rocks", ticketArgumentCaptor.getValue().getDescription());
    Assertions.assertEquals("testuser", ticketArgumentCaptor.getValue().getUserId());
  }
}

```

---

## Assert

Now we can assert based on the mock implementation _`Mockito.verify`_ method, as well as the _`Assertions.assertEquals`_ method.

```java UnitTest.java focus=23:26
public class TicketFunctionMockTest {

  @Mock
  private transient DDBUtils testUtils;
  private transient String uuid = null;
  private TicketFunction function;

  @BeforeEach
  public void beforeEach() {
    MockitoAnnotations.openMocks(this);
    function = new TicketFunction(testUtils);
  }

  @ParameterizedTest
  @Event(value = "events/apigw_request_1.json", type = APIGatewayProxyRequestEvent.class)
  public void testEventDeserialization(APIGatewayProxyRequestEvent event) {
    uuid = UUID.randomUUID().toString();
    Mockito.when(testUtils.persistTicket(Mockito.any(Ticket.class))).thenReturn(uuid);

    APIGatewayProxyResponseEvent response = function.handleRequest(event, null);
    ArgumentCaptor<Ticket> ticketArgumentCaptor = ArgumentCaptor.forClass(Ticket.class);

    Mockito.verify(testUtils).persistTicket(ticketArgumentCaptor.capture());

    Assertions.assertEquals("Lambda rocks", ticketArgumentCaptor.getValue().getDescription());
    Assertions.assertEquals("testuser", ticketArgumentCaptor.getValue().getUserId());
  }
}

```

---

## Testing Problems

We can use this same framework to test for errors. Using Mockito it's possible to specify an exception to throw. When the _`persistTicket`_ method is called, a _`DynamoDbException`_ will throw.

```java UnitTest.java focus=17:17
public class TicketFunctionMockTest {

  @Mock
  private transient DDBUtils testUtils;
  private transient String uuid = null;
  private TicketFunction function;

  @BeforeEach
  public void beforeEach() {
    MockitoAnnotations.openMocks(this);
    function = new TicketFunction(testUtils);
  }

  @ParameterizedTest
  @Event(value = "events/apigw_request_1.json", type = APIGatewayProxyRequestEvent.class)
  public void testDynamoDBError(APIGatewayProxyRequestEvent event) {
    Mockito.when(testUtils.persistTicket(Mockito.any(Ticket.class))).thenThrow(DynamoDbException.class);
    APIGatewayProxyResponseEvent response = function.handleRequest(event, null);
    Assertions.assertNotNull(response);
    Assertions.assertEquals(HttpStatusCode.INTERNAL_SERVER_ERROR, response.getStatusCode());
  }
}
```

---

## Asserting On Problems

That can be seen in the assertions. In this instance, checking that a response is still returned from the _`handleRequest`_ method and that the API status code is _`INTERNAL_SERVER_ERROR`_.

```java UnitTest.java focus=19:20
public class TicketFunctionMockTest {

  @Mock
  private transient DDBUtils testUtils;
  private transient String uuid = null;
  private TicketFunction function;

  @BeforeEach
  public void beforeEach() {
    MockitoAnnotations.openMocks(this);
    function = new TicketFunction(testUtils);
  }

  @ParameterizedTest
  @Event(value = "events/apigw_request_1.json", type = APIGatewayProxyRequestEvent.class)
  public void testDynamoDBError(APIGatewayProxyRequestEvent event) {
    Mockito.when(testUtils.persistTicket(Mockito.any(Ticket.class))).thenThrow(DynamoDbException.class);
    APIGatewayProxyResponseEvent response = function.handleRequest(event, null);
    Assertions.assertNotNull(response);
    Assertions.assertEquals(HttpStatusCode.INTERNAL_SERVER_ERROR, response.getStatusCode());
  }
}
```

</CH.Scrollycoding>

## Debugging

Remember, when running unit tests in either IntelliJ, VS Code or the IDE of your choice you can attach a debugger to your test run. As Java developers expecting that 'localhost' development experience this is a powerful alternative. Use the test framework as the harness for our debugger.

The second benefit of this, we now have a full suite of unit tests that can be re-used by other developers and CICD pipelines. It removes 'intuition based' debugging on local host and makes it something repeatable.

## Further Reading

- The AWS Samples GitHub organisation contains a [serverless-test-samples repository](https://github.com/aws-samples/serverless-test-samples)

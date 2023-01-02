---
sidebar_position: 1
title: AWS SAM
---

The [AWS Serverless Application Model (SAM)](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html) is a framework for building serverless applications. AWS SAM is split into two parts, a shorthand syntax that adds additional resources on top of CloudFormation and a command line interface (CLI).

## AWS SAM Template

<CH.Scrollycoding>

## Globals

The global sections of the SAM template allows default properties to be set across all Lambda functions. You can also override each of these properties at a specific function level.

```yaml template.yml  focus=4:14
AWSTemplateFormatVersion: "2010-09-09"
Transform: AWS::Serverless-2016-10-31

Globals:
  Function:
    MemorySize: 1024
    Architectures: [x86_64]
    Runtime: java11
    Timeout: 30
    Tracing: Active
    Environment:
      Variables:
        PRODUCT_TABLE_NAME: !Ref Table
        JAVA_TOOL_OPTIONS: -XX:+TieredCompilation -XX:TieredStopAtLevel=1 # More info about tiered compilation https://aws.amazon.com/blogs/compute/optimizing-aws-lambda-function-performance-for-java/

Resources:
  HelloWorldFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: HelloWorldFunction
      Handler: helloworld.App::handleRequest
      Events:
        Api:
          Type: HttpApi
          Properties:
            Path: /
            Method: GET
      Policies:
        - DynamoDBReadPolicy:
            TableName: !Ref DynamoDbTable

  DynamoDbTable:
    Type: AWS::DynamoDB::Table
    Properties:
      AttributeDefinitions:
        - AttributeName: id
          AttributeType: S
      BillingMode: PAY_PER_REQUEST
      KeySchema:
        - AttributeName: id
          KeyType: HASH
```

---

## Function

Lambda functions are specified using a resource of type _`AWS::Serverless::Function`_. There are 8 supported resources that can be found in the [AWS Docs](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-specification-generated-resources.html). The _`CodeUri`_ property tells the SAM CLI which folder the code for this function is stored under.

The Handler property determines the method the Lambda service will invoke. The string is made up of the jar file name, plus the class name, followed by a double colon and the method name.

```yaml template.yml  focus=16:30
AWSTemplateFormatVersion: "2010-09-09"
Transform: AWS::Serverless-2016-10-31

Globals:
  Function:
    MemorySize: 1024
    Architectures: [x86_64]
    Runtime: java11
    Timeout: 30
    Tracing: Active
    Environment:
      Variables:
        PRODUCT_TABLE_NAME: !Ref Table
        JAVA_TOOL_OPTIONS: -XX:+TieredCompilation -XX:TieredStopAtLevel=1 # More info about tiered compilation https://aws.amazon.com/blogs/compute/optimizing-aws-lambda-function-performance-for-java/

Resources:
  HelloWorldFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: HelloWorldFunction
      Handler: helloworld.App::handleRequest
      Events:
        Api:
          Type: HttpApi
          Properties:
            Path: /
            Method: GET
      Policies:
        - DynamoDBReadPolicy:
            TableName: !Ref DynamoDbTable

  DynamoDbTable:
    Type: AWS::DynamoDB::Table
    Properties:
      AttributeDefinitions:
        - AttributeName: id
          AttributeType: S
      BillingMode: PAY_PER_REQUEST
      KeySchema:
        - AttributeName: id
          KeyType: HASH
```

---

## IAM permissions

SAM provides a set of pre-built [policy templates](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-policy-templates.html) to simplify IAM policies.

```yaml template.yml  focus=28:30
AWSTemplateFormatVersion: "2010-09-09"
Transform: AWS::Serverless-2016-10-31

Globals:
  Function:
    MemorySize: 1024
    Architectures: [x86_64]
    Runtime: java11
    Timeout: 30
    Tracing: Active
    Environment:
      Variables:
        PRODUCT_TABLE_NAME: !Ref Table
        JAVA_TOOL_OPTIONS: -XX:+TieredCompilation -XX:TieredStopAtLevel=1 # More info about tiered compilation https://aws.amazon.com/blogs/compute/optimizing-aws-lambda-function-performance-for-java/

Resources:
  HelloWorldFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: HelloWorldFunction
      Handler: helloworld.App::handleRequest
      Events:
        Api:
          Type: HttpApi
          Properties:
            Path: /
            Method: GET
      Policies:
        - DynamoDBReadPolicy:
            TableName: !Ref DynamoDbTable

  DynamoDbTable:
    Type: AWS::DynamoDB::Table
    Properties:
      AttributeDefinitions:
        - AttributeName: id
          AttributeType: S
      BillingMode: PAY_PER_REQUEST
      KeySchema:
        - AttributeName: id
          KeyType: HASH
```

</CH.Scrollycoding>

## SAM CLI

The SAM CLI is used to _`build`_ and _`deploy`_ your serverless application.

The _`sam build`_ command both compiles the application code and applies generates a CloudFormation ready template. Under the hood, the build command runs a foreach over all of the specified _`AWS::Serverless::Function`_ resources, and compiles your Java code. The compiled jar file is then output to the _`.aws-sam`_ folder, along with the generated CloudFormation template.

After running _`sam build`_, run _`sma deploy --guided`_ to deploy the application to AWS. The --guided flag provides a deployment wizard experience.

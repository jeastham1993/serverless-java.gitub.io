---
sidebar_position: 2
title: Enabling SnapStart
---

In it's simplest form, SnapStart is enabled by setting a single property. AWS SAM supports SnapStart, so let's take the example from the [your first Lambda](/docs/tutorial-your-first-lambda/install-tooling) and enable SnapStart.

To do that, the only change to make is in the _`template.yaml`_ file.

<CH.Scrollycoding>

## Aliases

SnapStart takes a snapshot whenever a new version of a Lambda function is published. AWS SAM handles this using the _`AutoPublishAlias`_ property. When specified, the _`AutoPublishAlias`_ property creates a new alias for the Lambda function using the name specified. A new version of the function is then published and associated with the named alias.

```yaml template.yaml focus=22
AWSTemplateFormatVersion: "2010-09-09"
Transform: AWS::Serverless-2016-10-31
Description: >
  java-sam-app

  Sample SAM Template for java-sam-app

# More info about Globals: https://github.com/awslabs/serverless-application-model/blob/master/docs/globals.rst
Globals:
  Function:
    Timeout: 20
    MemorySize: 128

Resources:
  HelloWorldFunction:
    Type: AWS::Serverless::Function # More info about Function Resource: https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#awsserverlessfunction
    Properties:
      CodeUri: HelloWorldFunction
      Handler: helloworld.App::handleRequest
      Runtime: java11
      MemorySize: 512
      AutoPublishAlias: production
      SnapStart:
        ApplyOn: PublishedVersions
      Environment: # More info about Env Vars: https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#environment-object
        Variables:
          JAVA_TOOL_OPTIONS: -XX:+TieredCompilation -XX:TieredStopAtLevel=1 # More info about tiered compilation https://aws.amazon.com/blogs/compute/optimizing-aws-lambda-function-performance-for-java/
      Events:
        HelloWorld:
          Type: Api # More info about API Event Source: https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#api
          Properties:
            Path: /hello
            Method: get

Outputs:
  # ServerlessRestApi is an implicit API created out of Events key under Serverless::Function
  # Find out more about other implicit resources you can reference within SAM
  # https://github.com/awslabs/serverless-application-model/blob/master/docs/internals/generated_resources.rst#api
  HelloWorldApi:
    Description: "API Gateway endpoint URL for Prod stage for Hello World function"
    Value: !Sub "https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/hello/"
  HelloWorldFunction:
    Description: "Hello World Lambda Function ARN"
    Value: !GetAtt HelloWorldFunction.Arn
  HelloWorldFunctionIamRole:
    Description: "Implicit IAM Role created for Hello World function"
    Value: !GetAtt HelloWorldFunctionRole.Arn
```

---

## SnapStart Configuration

SnapStart is enabled with a single property. The _`SnapStart:ApplyOn`_ property is set to _`PublishedVersions`_.

```yaml template.yaml focus=23:24
AWSTemplateFormatVersion: "2010-09-09"
Transform: AWS::Serverless-2016-10-31
Description: >
  java-sam-app

  Sample SAM Template for java-sam-app

# More info about Globals: https://github.com/awslabs/serverless-application-model/blob/master/docs/globals.rst
Globals:
  Function:
    Timeout: 20
    MemorySize: 128

Resources:
  HelloWorldFunction:
    Type: AWS::Serverless::Function # More info about Function Resource: https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#awsserverlessfunction
    Properties:
      CodeUri: HelloWorldFunction
      Handler: helloworld.App::handleRequest
      Runtime: java11
      MemorySize: 512
      AutoPublishAlias: production
      SnapStart:
        ApplyOn: PublishedVersions
      Environment: # More info about Env Vars: https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#environment-object
        Variables:
          JAVA_TOOL_OPTIONS: -XX:+TieredCompilation -XX:TieredStopAtLevel=1 # More info about tiered compilation https://aws.amazon.com/blogs/compute/optimizing-aws-lambda-function-performance-for-java/
      Events:
        HelloWorld:
          Type: Api # More info about API Event Source: https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#api
          Properties:
            Path: /hello
            Method: get

Outputs:
  # ServerlessRestApi is an implicit API created out of Events key under Serverless::Function
  # Find out more about other implicit resources you can reference within SAM
  # https://github.com/awslabs/serverless-application-model/blob/master/docs/internals/generated_resources.rst#api
  HelloWorldApi:
    Description: "API Gateway endpoint URL for Prod stage for Hello World function"
    Value: !Sub "https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/hello/"
  HelloWorldFunction:
    Description: "Hello World Lambda Function ARN"
    Value: !GetAtt HelloWorldFunction.Arn
  HelloWorldFunctionIamRole:
    Description: "Implicit IAM Role created for Hello World function"
    Value: !GetAtt HelloWorldFunctionRole.Arn
```

</CH.Scrollycoding>

And that's it! That is all there is to enabling SnapStart for your Lambda functions.

If video is more your thing, check out this video on [enabling SnapStart for your Spring Boot API's](https://www.youtube.com/watch?v=2m-lNBDpvKk&list=PLCOG9xkUD90IDm9tcY-5nMK6X6g8SD-Sz&index=4).

Or this one, on [aliases and versions](https://www.youtube.com/watch?v=DjCwoontXM4&list=PLCOG9xkUD90IDm9tcY-5nMK6X6g8SD-Sz&index=5).

---
sidebar_position: 3
title: Deploy
---

You can use [AWS SAM](/docs/developer-tooling/aws-sam) to deploy the application. Create a new _`template.yaml`_ file in the same folder as the pom.xml file. Update the file to include the below yaml:

```yaml template.yaml
AWSTemplateFormatVersion: "2010-09-09"
Transform: AWS::Serverless-2016-10-31

Globals:
  Function:
    Timeout: 30

Resources:
  DemoSpringLambdaFunction:
    Type: AWS::Serverless::Function # More info about Function Resource: https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#awsserverlessfunction
    Properties:
      CodeUri: .
      Handler: com.example.demo.StreamLambdaHandler::handleRequest
      Runtime: java11
      Architectures:
        - x86_64
      MemorySize: 2048
      Environment: # More info about Env Vars: https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#environment-object
        Variables:
          JAVA_TOOL_OPTIONS: -XX:+TieredCompilation -XX:TieredStopAtLevel=1 # More info about tiered compilation https://aws.amazon.com/blogs/compute/optimizing-aws-lambda-function-performance-for-java/
      Events:
        DemoApi:
          Type: Api # More info about API Event Source: https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#api
          Properties:
            Path: /{proxy+}
            Method: ANY
```

As the template.yaml file is in the same folder as the pom.xml, the _`CodeUri`_ property is set to the current folder. If the SAM template is in a different folder the _`CodeUri`_ path should navigate to the pom.xml file.

The configured API event uses a _`/{proxy+}`_ route for _`ANY`_ method. This ensures all requests received to this API are passed directly on to the Spring Boot API. The request is then routed by Spring itself.

Once configured, run the below commands to deploy:

```bash deploy.sh
sam build
sam deploy --guided
```

If video is more your thing, check out this video on [deploying a Spring API to AWS Lambda](https://www.youtube.com/watch?v=A1rYiHTy9Lg).

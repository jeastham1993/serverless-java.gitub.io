---
sidebar_position: 3
title: Deploy
description: A guide deploying a Lambda function with the SAM CLI
keywords: [aws sam, cli, java]
---

# Deploy

Ok, now it's actually time to deploy. I promise! Now that we have configured our Lambda function, deploying it is as simple as running a couple of commands in your terminal window. Ensure you are in the same directory as the _`template.yaml`_.

```shellscript deploy
sam build
sam deploy --guided
```

The _`sam build`_ compiles your Java application and generates a jar file. Generated files are placed into a folder named _`.aws-sam`_.

The _`sam deploy --guided`_ command will deploy the application into AWS. Passing in the --guided flag provides a walk through that allows you to configure your application:

- Stack Name: 'java-sam-app'
- AWS region: _Your choice_
- Confirm changes before deploying: N
- Allow SAM CLI Role Creation: Y
- No authorization defined, Is this okay?: Y
- Save arguments to config file: Y
- SAM Configuration file: _default_
- SAM Configuration environment: _default_

If this is your first time deploying, this will take a few minutes. Go grab a coffee.

## Test

Once the deployment is complete, your terminal window will output an API endpoint. Open that URL in a browser of your choice, or use CuRL if you're that way inclined. You will get back a JSON payload that looks something like this:

```json apiresponse.json
{
  "message": "hello world",
  "location": "3.251.254.194"
}
```

## Congratulations

You've just deployed your first Lambda function. If you want to clean up after yourself, run the _`sam delete`_ command from the same folder as the template.yaml file.

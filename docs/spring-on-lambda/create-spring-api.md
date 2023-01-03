---
sidebar_position: 1
title: Creating a new Spring Boot API
---

To run Spring on Lambda you can use the [aws-serverless-java-container](https://github.com/awslabs/aws-serverless-java-container/wiki/Quick-start---Spring-Boot2).

Update your _`pom.xml`_ to include additional dependencies.

```xml pom.xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-log4j2</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
<dependency>
    <groupId>io.github.crac.com.amazonaws</groupId>
    <artifactId>aws-lambda-java-runtime-interface-client</artifactId>
    <version>1.0.0</version>
</dependency>
<dependency>
    <groupId>com.amazonaws.serverless</groupId>
    <artifactId>aws-serverless-java-container-springboot2</artifactId>
    <version>1.9</version>
</dependency>
```

Once the dependencies are added, you now also need to update the build section. The default Spring API comes with Tomcat included, that can be excluded when running within the Lambda context. Update the build section as the below:

```xml pom.xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-shade-plugin</artifactId>
            <version>3.2.4</version>
            <configuration>
                <createDependencyReducedPom>false</createDependencyReducedPom>
            </configuration>
            <executions>
                <execution>
                    <phase>package</phase>
                    <goals>
                        <goal>shade</goal>
                    </goals>
                    <configuration>
                        <artifactSet>
                            <excludes>
                                <exclude>org.apache.tomcat.embed:*</exclude>
                            </excludes>
                        </artifactSet>
                    </configuration>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

That's all of the configuration, now to just add a Lambda handler.

If video is more your thing, check out this video on [deploying a Spring API to AWS Lambda](https://www.youtube.com/watch?v=A1rYiHTy9Lg).

[![Deploy a Spring API to Lambda title screen](https://img.youtube.com/vi/A1rYiHTy9Lg/0.jpg)](https://www.youtube.com/watch?v=A1rYiHTy9Lg)

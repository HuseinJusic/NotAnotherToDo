FROM maven:3.8.3-openjdk-17-slim

ADD . /notanothertodo
WORKDIR /notanothertodo

RUN ls -l

RUN mvn clean install

FROM openjdk:17-jdk

MAINTAINER Husein Jusic

VOLUME /tmp
COPY --from=0 "/notanothertodo/backend/target/backend-0.0.1-SNAPSHOT.jar" app.jar
ENV JAVA_OPTS=""
ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /app.jar" ]
FROM amazoncorretto:11-alpine-jdk
ARG JAR_FILE
COPY ${JAR_FILE} app.jar
ENTRYPOINT [ "java", "-jar", "-Xms512m", "-Xmx512m","/app.jar" ]
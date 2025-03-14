# Etapa 1: Build do Projeto
FROM maven:3.8.3-openjdk-17 AS build

# Diretório de trabalho para o build
WORKDIR /usr/src/app

# Copie o arquivo pom.xml e baixe as dependências
COPY pom.xml ./
RUN mvn dependency:go-offline -B

# Copie o código-fonte do projeto
COPY . ./

# Compile o projeto e gere o JAR
RUN mvn clean package -DskipTests

# Etapa 2: Runtime
FROM openjdk:17-jdk-slim

# Diretório onde o JAR será copiado
WORKDIR /usr/app

# Copie o JAR gerado na etapa de build
COPY --from=build /usr/src/app/target/potemanager.jar app.jar

# Comando para executar o JAR
ENTRYPOINT ["java", "-jar", "app.jar"]

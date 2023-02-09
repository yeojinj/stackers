package com.ssafy.stackers.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.security.SecurityScheme.In;
import io.swagger.v3.oas.models.security.SecurityScheme.Type;
import java.util.Arrays;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI openAPI() {
        Info info = new Info()
                .title("Stackers API Documentation")
                .version("v1.0.0")
                .description("Stackers API에 대한 설명 문서입니다\uD83E\uDD73");

        SecurityScheme securityScheme = new SecurityScheme()
                .type(Type.HTTP)
                .scheme("Bearer")
                .bearerFormat("JWT")
                .in(In.HEADER).name("Authorization");
        SecurityRequirement schemaRequirment = new SecurityRequirement().addList("bearerAuth");

        return new OpenAPI()
                .components(new Components().addSecuritySchemes("bearerAuth", securityScheme)).security(
                        Arrays.asList(schemaRequirment)).info(info);
    }
}
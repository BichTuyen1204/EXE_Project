package com.example.fbookStore.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration

public class WebConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/api/v1/account**")
//                        .allowedOrigins("http://localhost:3000") // Thay đổi URL theo client của bạn
//                        .allowedMethods("GET", "POST", "PUT", "DELETE");
//
//            }
//        };
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // First mapping
                registry.addMapping("/api/v1/account**")
                        .allowedOrigins("http://localhost:3000") // Adjust the URL according to your client
                        .allowedMethods("GET", "POST", "PUT", "DELETE");

                // Second mapping
                registry.addMapping("/api/v1/product**")
                        .allowedOrigins("http://localhost:3000") // This can be different if you have another client
                        .allowedMethods("GET", "POST", "PUT", "DELETE");

//                // Add additional mappings as needed
//                // Example for a third mapping
//                registry.addMapping("/api/v1/orders**")
//                        .allowedOrigins("http://localhost:3000")
//                        .allowedMethods("GET", "POST", "PUT", "DELETE");
            }
        };
    }


}

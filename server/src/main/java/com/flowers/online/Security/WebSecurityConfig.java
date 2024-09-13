package com.flowers.online.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF protection (if needed)
                .authorizeHttpRequests(auth -> auth

                        // Allow public access to product listing
                        .requestMatchers("GET", "/api/products/**").permitAll()

                        // Restrict product creation, update, and deletion to admins
                        .requestMatchers("POST", "/api/products/**").hasRole("ADMIN")
                        .requestMatchers("PUT", "/api/products/**").hasRole("ADMIN")
                        .requestMatchers("DELETE", "/api/products/**").hasRole("ADMIN")

                        // Allow public access to user registration and login
                        .requestMatchers("/api/users/check-email", "/api/users/register", "/api/users/login", "/api/users/forgot-password", "/api/users/reset-password").permitAll()

                        // Restrict all other routes to authenticated users
                        .anyRequest().authenticated()
                )
                .httpBasic(basic -> {})  // Enable HTTP Basic authentication
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

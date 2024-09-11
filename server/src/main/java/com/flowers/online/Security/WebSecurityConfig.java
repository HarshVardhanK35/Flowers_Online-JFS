package com.flowers.online.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF protection (if needed)
                .authorizeHttpRequests(auth -> auth

                        // Restrict product creation, update, and deletion to admins
                        .requestMatchers("POST", "/api/products/**").hasRole("ADMIN")
                        .requestMatchers("PUT", "/api/products/**").hasRole("ADMIN")
                        .requestMatchers("DELETE", "/api/products/**").hasRole("ADMIN")

                        // Allow public access to product listing
                        .requestMatchers("GET", "/api/products/**").permitAll()

                        // Allow public access to user registration and login
                        .requestMatchers("/api/users/register", "/api/users/login").permitAll()

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

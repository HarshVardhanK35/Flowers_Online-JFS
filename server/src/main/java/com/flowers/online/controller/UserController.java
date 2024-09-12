package com.flowers.online.controller;

import com.flowers.online.Model.User;
import com.flowers.online.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;  // Import the correct PasswordEncoder

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        // Log the registration attempt
        logger.info("Registering user with username: {}", user.getUsername());

        // Ensure the role is set correctly. If no role is provided, default to USER
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("ROLE_USER");  // Default to ROLE_USER if no role provided
        }
        else if (!user.getRole().startsWith("ROLE_")) {
            user.setRole("ROLE_" + user.getRole().toUpperCase());  // Ensure role is prefixed with ROLE_
        }

        // Encode the password before saving
//         user.setPassword(passwordEncoder.encode(user.getPassword()));
        User newUser = userService.registerNewUser(user);

        // Log success
        logger.info("User registered successfully with username: {}", user.getUsername());

        return ResponseEntity.status(201).body(newUser);
    }

    // Custom login method
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginUser) {
        logger.info("Login attempt for username: {}", loginUser.getUsername());

        // Check if the user exists
        Optional<User> user = userService.findByUsername(loginUser.getUsername());

        if (user.isPresent()) {
            logger.info("User found for username: {}", loginUser.getUsername());

            // Verify the password
            if (passwordEncoder.matches(loginUser.getPassword(), user.get().getPassword())) {
                logger.info("Password match for username: {}", loginUser.getUsername());

                // Remove password before returning the response
                User loggedInUser = user.get();
                loggedInUser.setPassword(null);  // Don't return the password
                return ResponseEntity.ok(loggedInUser);
            }
            else {
                logger.warn("Password mismatch for username: {}", loginUser.getUsername());
                return ResponseEntity.status(401).body("Invalid credentials");
            }
        }
        else {
            logger.warn("User not found for username: {}", loginUser.getUsername());
            return ResponseEntity.status(404).body("User not found");
        }
    }
}
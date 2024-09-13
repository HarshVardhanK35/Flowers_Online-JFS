package com.flowers.online.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Entity
@Table(name = "app_user", uniqueConstraints = {@UniqueConstraint(columnNames = "email")})  // Ensure email is unique
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    private String title;  // Mr., Mrs., etc.

    @Setter
    private String firstName;

    @Setter
    private String lastName;

    @Setter
    private String email;  // Email must be unique

    @Setter
    private String phone;

    @Setter
    private String country;

    @Setter
    private String username;  // Optional if separate from email

    @Setter
    private String password;

    @Setter
    private String role;  // Roles: ADMIN, CUSTOMER

    public User() {}

    public User(String title, String firstName, String lastName, String email, String phone, String country, String password, String role) {
        this.title = title;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.country = country;
        this.password = password;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getCountry() {
        return country;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getRole() {
        return role;
    }
}

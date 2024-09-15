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
    private String title;

    @Setter
    private String firstName;

    @Setter
    private String lastName;

    @Setter
    private String email;

    @Setter
    private String phone;

    @Setter
    private String city;

    @Setter
    private String password;

    @Setter
    private String role;  // Roles: ADMIN, CUSTOMER

    public User() {}

    public User(String title, String firstName, String lastName, String email, String phone, String city, String password, String role) {
        this.title = title;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.city = city;
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

    public String getCity() {
        return city;
    }

    public String getPassword() {
        return password;
    }

    public String getRole() {
        return role;
    }
}

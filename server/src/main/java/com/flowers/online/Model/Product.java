package com.flowers.online.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Setter;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    private String name;
    @Setter
    private String category;
    @Setter
    private double price;
    @Setter
    private String description;

    // Constructors, Getters, and Setters
    public Product() {}

    public Product(String name, String category, double price, String description) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.description = description;
    }

    public Long getId() { return id; }
    public String getName() { return name; }

    public String getCategory() { return category; }

    public double getPrice() { return price; }

    public String getDescription() { return description; }
}
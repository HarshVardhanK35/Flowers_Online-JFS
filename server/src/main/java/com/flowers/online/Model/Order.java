package com.flowers.online.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "app_order")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    @ManyToOne
    private User user;  // This ensures a relationship between Order and User

    @Setter
    @Getter
    @ManyToMany
    private List<Product> products;

    @Setter
    private double totalPrice;

    public Order() {}

    public Order(User user, List<Product> products, double totalPrice) {
        this.user = user;
        this.products = products;
        this.totalPrice = totalPrice;
    }
}
package com.flowers.online.Model;
import jakarta.persistence.*;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;
@Entity
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Setter
    @OneToOne
    private User user;
    @Setter
    @OneToMany(cascade = CascadeType.MERGE) // or PERSIST
    private List<CartItem> cartItems = new ArrayList<>();
    @Setter
    private double totalPrice;
    public Cart() {}
    public Cart(User user) {
        this.user = user;
        this.totalPrice = 0.0;
    }
    public Long getId() {
        return id;
    }
    public User getUser() {
        return user;
    }
    public List<CartItem> getCartItems() {
        return cartItems;
    }
    public double getTotalPrice() {
        return totalPrice;
    }
}
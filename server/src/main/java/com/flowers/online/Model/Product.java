package com.flowers.online.Model;

import jakarta.persistence.*;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category;
    private double price;
    private String size;
    private String photo;
    private String currency;
    private String about;

    @Column(nullable = true)
    private int availableQuantity;

    @ElementCollection
    @CollectionTable(name = "product_stock_by_size", joinColumns = @JoinColumn(name = "product_id"))
    @MapKeyColumn(name = "size")
    @Column(name = "stock")
    private Map<String, Integer> stockBySize = new HashMap<>();

    public Product() {
    }

    public Product(String name, double price, String category, String photo, String size, String currency, String about, int availableQuantity) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.photo = photo;
        this.size = size;
        this.currency = currency;
        this.about = about;
        this.availableQuantity = availableQuantity;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public int getAvailableQuantity() {
        return availableQuantity;
    }

    public void setAvailableQuantity(int availableQuantity) {
        this.availableQuantity = availableQuantity;
    }

    public Map<String, Integer> getStockBySize() {
        return stockBySize;
    }

    public void increaseStock(int amount, String size) {
        int currentStock = this.stockBySize.getOrDefault(size, 0);
        this.stockBySize.put(size, currentStock + amount);
    }

    public void decreaseStock(int amount, String size) {
        int currentStock = this.stockBySize.getOrDefault(size, 0);
        this.stockBySize.put(size, Math.max(currentStock - amount, 0));
    }
}
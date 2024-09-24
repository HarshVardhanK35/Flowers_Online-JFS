package com.flowers.online.Model;
import jakarta.persistence.*;
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String category;
    private double price;
    private String photo;
    private String size;
    private String currency;
    private String about;

    @Column(nullable = true)
    private Integer quantityAvailable = 0;

    public Product() {
        this.quantityAvailable = 0;
    }

    public Product(String name, double price, String category, String photo,  String size, String currency, String about, Integer quantityAvailable) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.photo = photo;
        this.size = size;
        this.currency = currency;
        this.about = about;
        this.quantityAvailable = quantityAvailable != null ? quantityAvailable : 0;
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
    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }
    public String getCurrency() {
        return currency;
    }
    public void setCurrency(String currency) {
        this.currency = currency;
    }
    public String getAbout() { return about; }
    public void setAbout(String about) { this.about = about; }
    public int getQuantityAvailable() {
        return quantityAvailable;
    }
    public void setQuantityAvailable(int quantityAvailable) {
        this.quantityAvailable = quantityAvailable;
    }
}

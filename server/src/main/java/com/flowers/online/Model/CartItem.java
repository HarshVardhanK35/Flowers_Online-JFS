package com.flowers.online.Model;
import com.flowers.online.Exceptions.InsufficientStockException;
import jakarta.persistence.*;

@Entity
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Product product;
    private String size;
    private int quantity;

    public CartItem() {}

    public CartItem(Product product, String size, int quantity) {
        this.product = product;
        this.size = size;
        this.quantity = quantity;
    }
    public Long getId() {
        return id;
    }
    public Product getProduct() {
        return product;
    }
    public void setProduct(Product product) {
        this.product = product;
    }
    public String getSize() {
        return size;
    }
    public void setSize(String size) {
        this.size = size;
    }
    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    public void validateStock(CartItem cartItem) {
        Product product = cartItem.getProduct();
        int availableStock = product.getStockForSize(cartItem.getSize());
        if (cartItem.getQuantity() > availableStock) {
            throw new InsufficientStockException("Not enough stock available for this product and size.");
        }
    }

}
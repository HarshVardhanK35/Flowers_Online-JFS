package com.flowers.online.Service;

import com.flowers.online.Model.Product;
import com.flowers.online.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getProductsWithStock() {
        return productRepository.findProductsWithStock();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public void decreaseAvailableQuantity(Long productId, int amount) {
        Product product = getProductById(productId);
        if (product != null) {
            int newQuantity = Math.max(product.getAvailableQuantity() - amount, 0);
            product.setAvailableQuantity(newQuantity);
            productRepository.save(product);
        }
    }

    public void increaseAvailableQuantity(Long productId, int amount) {
        Product product = getProductById(productId);
        if (product != null) {
            product.setAvailableQuantity(product.getAvailableQuantity() + amount);
            productRepository.save(product);
        }
    }
}
package com.flowers.online.controller;

import com.flowers.online.Model.Product;
import com.flowers.online.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException; // Use java.io.IOException here
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/";

    // Create product with file upload (Admin only)
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Product createProduct(
            @RequestParam("name") String name,
            @RequestParam("category") String category,
            @RequestParam("price") String price,
            @RequestParam("photo") MultipartFile photo) {

        // Save the file locally
        String photoFilename = photo.getOriginalFilename();
        try {
            Path path = Paths.get(UPLOAD_DIR + photoFilename);
            Files.createDirectories(path.getParent()); // Ensure the upload directory exists
            Files.write(path, photo.getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Error saving file", e);
        }

        // Create and save the product
        Product newProduct = new Product(name, price, category, "/uploads/" + photoFilename);
        return productService.saveProduct(newProduct);
    }

    // Fetch all products
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // Fetch product details by ID
    @GetMapping("/{id}")
    public Product getProductDetails(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    // Fetch products by category
    @GetMapping("/category/{category}")
    public List<Product> getProductsByCategory(@PathVariable String category) {
        return productService.getProductsByCategory(category);
    }

    // Delete product (Admin only)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }

    // Update product (Admin only)
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
        Product existingProduct = productService.getProductById(id);
        if (existingProduct != null) {
            existingProduct.setName(updatedProduct.getName());
            existingProduct.setPrice(updatedProduct.getPrice());
            existingProduct.setPhoto(updatedProduct.getPhoto());
            existingProduct.setCategory(updatedProduct.getCategory());

            return productService.saveProduct(existingProduct);
        } else {
            throw new RuntimeException("Product not found");
        }
    }
}

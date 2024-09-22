package com.flowers.online.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.flowers.online.Model.Product;
import com.flowers.online.Service.ProductService;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Product createProduct(
            @RequestParam("name") String name,
            @RequestParam("category") String category,
            @RequestParam("price") String price,
            @RequestParam("currency") String currency,
            @RequestParam("photo") MultipartFile photo,
            @RequestParam("size") String size,
            @RequestParam("about") String about){
        String photoFilename = photo.getOriginalFilename();
        try {
            Path path = Paths.get(UPLOAD_DIR + photoFilename);
            Files.createDirectories(path.getParent());
            Files.write(path, photo.getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Error saving file", e);
        }
        double parsedPrice = Double.parseDouble(price);
        Product newProduct = new Product(name, parsedPrice, category, "/uploads/" + photoFilename, size, currency, about);
        return productService.saveProduct(newProduct);
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

//    @GetMapping("/{id}")
//    public Product getProductDetails(@PathVariable Long id) {
//        return productService.getProductById(id);
//    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductDetails(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        if (product == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(product);
    }

    @GetMapping("/category/{category}")
    public List<Product> getProductsByCategory(@PathVariable String category) {
        return productService.getProductsByCategory(category);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }

    @PutMapping("/edit/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Product editProduct(@PathVariable Long id,
                               @RequestParam("name") String name,
                               @RequestParam("category") String category,
                               @RequestParam("price") String price,
                               @RequestParam("currency") String currency,
                               @RequestParam("size") String size,
                               @RequestParam(value = "photo", required = false) MultipartFile photo,
                               @RequestParam("about") String about) {
        Product existingProduct = productService.getProductById(id);
        if (existingProduct == null) {
            throw new RuntimeException("Product not found");
        }

        if (photo != null && !photo.isEmpty()) {
            String photoFilename = photo.getOriginalFilename();
            try {
                Path path = Paths.get(UPLOAD_DIR + photoFilename);
                Files.createDirectories(path.getParent());
                Files.write(path, photo.getBytes());
                existingProduct.setPhoto("/uploads/" + photoFilename);
            } catch (IOException e) {
                throw new RuntimeException("Error saving file", e);
            }
        }

        existingProduct.setName(name);
        existingProduct.setCategory(category);
        existingProduct.setPrice(Double.parseDouble(price));
        existingProduct.setCurrency(currency);
        existingProduct.setSize(size);
        existingProduct.setAbout(about);

        return productService.saveProduct(existingProduct);
    }
}
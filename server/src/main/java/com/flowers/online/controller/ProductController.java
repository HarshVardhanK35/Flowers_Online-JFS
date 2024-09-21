package com.flowers.online.controller;
import com.flowers.online.Model.Product;
import com.flowers.online.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
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
            @RequestParam("size") String size){

        String photoFilename = photo.getOriginalFilename();

        try {
            Path path = Paths.get(UPLOAD_DIR + photoFilename);
            Files.createDirectories(path.getParent());
            Files.write(path, photo.getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Error saving file", e);
        }

        double parsedPrice = Double.parseDouble(price);
        Product newProduct = new Product(name, parsedPrice, category, "/uploads/" + photoFilename, size, currency);

        return productService.saveProduct(newProduct);
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductDetails(@PathVariable Long id) {
        return productService.getProductById(id);
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
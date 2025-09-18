package com.flowers.online.controller;
import com.flowers.online.Model.User;
import com.flowers.online.Service.UserService;
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
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

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
            @RequestParam("about") String about,
            @RequestParam(value = "quantityAvailable", defaultValue = "0") Integer quantityAvailable
    ) {
        String photoFilename = photo.getOriginalFilename();
        try {
            Path path = Paths.get(UPLOAD_DIR + photoFilename);
            Files.createDirectories(path.getParent());
            Files.write(path, photo.getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Error saving file", e);
        }
        double parsedPrice = Double.parseDouble(price);
        Product newProduct = new Product(name, parsedPrice, category, "/uploads/" + photoFilename, size, currency, about, quantityAvailable);
        return productService.saveProduct(newProduct);
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts(Principal principal) {
        if (principal == null) { // Non-logged-in users can see products with available stock
            List<Product> productsWithStock = productService.getProductsWithStock();
            return ResponseEntity.ok(productsWithStock);
        }

        User user = userService.findByEmail(principal.getName()).orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole().equals("ROLE_ADMIN")) { // Admins can see all products
            List<Product> products = productService.getAllProducts();
            return ResponseEntity.ok(products);
        } else { // Regular users can only see products with available stock
            List<Product> productsWithStock = productService.getProductsWithStock();
            return ResponseEntity.ok(productsWithStock);
        }
    }

    @GetMapping("/category/{category}")
    public List<Product> getProductsByCategory(@PathVariable String category) {
        return productService.getProductsByCategory(category.toLowerCase());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductDetails(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        if (product == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }

    @PutMapping("/edit/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Product editProduct(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("category") String category,
            @RequestParam("price") String price,
            @RequestParam("currency") String currency,
            @RequestParam("size") String size,
            @RequestParam(value = "photo", required = false) MultipartFile photo,
            @RequestParam("about") String about,
            @RequestParam(value = "quantityAvailable", defaultValue = "0") Integer quantityAvailable
    ) {
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
        existingProduct.setAvailableQuantity(quantityAvailable);
        return productService.saveProduct(existingProduct);
    }
}
package com.flowers.online.Repository;
import com.flowers.online.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);
    // Fetch all products
    List<Product> findAll();

    // Fetch only products with available stock for regular users
    @Query("SELECT p FROM Product p WHERE p.availableQuantity > 0")
    List<Product> findProductsWithStock();
}
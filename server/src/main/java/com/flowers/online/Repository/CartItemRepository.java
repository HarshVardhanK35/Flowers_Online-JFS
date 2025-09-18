package com.flowers.online.Repository;
import com.flowers.online.Model.Cart;
import com.flowers.online.Model.CartItem;
import com.flowers.online.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByCartAndProductIdAndSize(Cart cart, Long productId, String size);
    // Allow multiple results instead of Optional
    List<CartItem> findByCartAndProductAndSize(Cart cart, Product product, String size);
}
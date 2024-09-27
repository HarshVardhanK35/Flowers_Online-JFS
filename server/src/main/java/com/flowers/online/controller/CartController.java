package com.flowers.online.controller;
import com.flowers.online.Dto.CartItemDTO;
import com.flowers.online.Model.Cart;
import com.flowers.online.Model.CartItem;
import com.flowers.online.Model.User;
import com.flowers.online.Service.CartService;
import com.flowers.online.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;
@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartService cartService;
    @Autowired
    private UserService userService;
    @GetMapping
    public Cart getCart(Principal principal) {
        User user = userService.findByEmail(principal.getName()).orElseThrow();
        return cartService.getCartByUser(user);
    }
    @PostMapping("/{userId}/add")
    public ResponseEntity<?> addToCart(@PathVariable Long userId, @RequestBody CartItemDTO cartItemDTO) {
        User user = userService.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Cart cart = cartService.addToCart(user, cartItemDTO.getProductId(), cartItemDTO.getSize(), cartItemDTO.getQuantity());
        return ResponseEntity.ok(cart);
    }
    @PostMapping("/{userId}/remove")
    public ResponseEntity<?> removeFromCart(@PathVariable Long userId, @RequestBody CartItemDTO cartItemDTO) {
        User user = userService.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        cartService.removeFromCart(user, cartItemDTO.getProductId(), cartItemDTO.getSize());
        return ResponseEntity.ok("Removed successfully");
    }
    @GetMapping("/{userId}")
    public List<CartItem> getUserCart(@PathVariable Long userId) {
        User user = userService.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return cartService.getUserCart(user);
    }
}

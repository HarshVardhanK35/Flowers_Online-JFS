package com.flowers.online.Controller;

import com.flowers.online.Model.Cart;
import com.flowers.online.Model.Product;
import com.flowers.online.Service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/{userId}")
    public Cart getCart(@PathVariable Long userId) {
        return cartService.getCartByUserId(userId);
    }

    @PostMapping("/{userId}/add")
    public Cart addProductToCart(@PathVariable Long userId, @RequestBody Product product) {
        Cart cart = cartService.getCartByUserId(userId);
        return cartService.addProductToCart(cart, product);
    }

    @PostMapping("/{userId}/remove")
    public Cart removeProductFromCart(@PathVariable Long userId, @RequestBody Product product) {
        Cart cart = cartService.getCartByUserId(userId);
        return cartService.removeProductFromCart(cart, product);
    }

    @PostMapping("/{userId}/clear")
    public void clearCart(@PathVariable Long userId) {
        Cart cart = cartService.getCartByUserId(userId);
        cartService.clearCart(cart);
    }
}
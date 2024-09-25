package com.flowers.online.controller;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.validation.Valid;
import com.flowers.online.Dto.CartItemDTO;
import com.flowers.online.Model.Cart;
import com.flowers.online.Model.CartItem;
import com.flowers.online.Service.ProductService;
import com.flowers.online.Security.CustomUserDetails;
import com.flowers.online.Service.CartService;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private ProductService productService;

    @GetMapping("/{userId}")
    public Cart getCart(@PathVariable Long userId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails authenticatedUser = (CustomUserDetails) auth.getPrincipal();  // Correct casting
        Long authenticatedUserId = authenticatedUser.getUserId();  // Now it correctly fetches user ID

        if (!userId.equals(authenticatedUserId)) {
            throw new AccessDeniedException("You are not allowed to access this cart.");
        }
        return cartService.getCartByUserId(userId);
    }

    @PostMapping("/{userId}/add")
    public Cart addProductToCart(@PathVariable Long userId, @Valid @RequestBody CartItemDTO cartItemDTO) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Long authenticatedUserId = ((CustomUserDetails) auth.getPrincipal()).getUserId();

        if (!userId.equals(authenticatedUserId)) {
            throw new AccessDeniedException("You are not allowed to access this cart.");
        }

        CartItem cartItem = new CartItem();

        cartItem.setProduct(productService.getProductById(cartItemDTO.getProductId()));
        cartItem.setSize(cartItemDTO.getSize());
        cartItem.setQuantity(cartItemDTO.getQuantity());

        Cart cart = cartService.getCartByUserId(userId);
        return cartService.addProductToCart(cart, cartItem);
    }

    @PostMapping("/{userId}/remove")
    public Cart removeProductFromCart(@PathVariable Long userId, @RequestBody CartItem cartItem) {
        Cart cart = cartService.getCartByUserId(userId);
        return cartService.removeProductFromCart(cart, cartItem);
    }

    @PostMapping("/{userId}/clear")
    public void clearCart(@PathVariable Long userId) {
        Cart cart = cartService.getCartByUserId(userId);
        cartService.clearCart(cart);
    }

    public static class CartResponseDTO {
        private List<CartItemDTO> cartItems;
        private double totalPrice;
        public List<CartItemDTO> getCartItems() {
            return cartItems;
        }
        public void setCartItems(List<CartItemDTO> cartItems) {
            this.cartItems = cartItems;
        }
        public double getTotalPrice() {
            return totalPrice;
        }
        public void setTotalPrice(double totalPrice) {
            this.totalPrice = totalPrice;
        }
    }
}

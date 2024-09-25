package com.flowers.online.Service;
import com.flowers.online.Exceptions.InsufficientStockException;
import com.flowers.online.Model.Cart;
import com.flowers.online.Model.CartItem;
import com.flowers.online.Model.Product;
import com.flowers.online.Model.User;
import com.flowers.online.Repository.CartRepository;
import com.flowers.online.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    public Cart getCartByUserId(Long userId) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) {
            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            cart = new Cart(user);
            cartRepository.save(cart);
        }
        return cart;
    }

    public Cart addProductToCart(Cart cart, CartItem cartItem) {
        boolean productExists = false;
        Map<String, CartItem> cartItemsMap = new HashMap<>();
        for (CartItem item : cart.getCartItems()) {
            String key = item.getProduct().getId() + "_" + item.getSize();
            cartItemsMap.put(key, item);
            if (item.getProduct().getId().equals(cartItem.getProduct().getId())
                    && item.getSize().equals(cartItem.getSize())) {
                item.setQuantity(item.getQuantity() + cartItem.getQuantity());
                cart.setTotalPrice(cart.getTotalPrice() + (cartItem.getProduct().getPrice() * cartItem.getQuantity()));
                productExists = true;
                break;
            }
        }
        if (!productExists) {
            cart.getCartItems().add(cartItem);
            cart.setTotalPrice(cart.getTotalPrice() + (cartItem.getProduct().getPrice() * cartItem.getQuantity()));
        }
        return cartRepository.save(cart);
    }

    public Cart removeProductFromCart(Cart cart, CartItem cartItem) {
        cart.getCartItems().removeIf(item ->
                item.getProduct().getId().equals(cartItem.getProduct().getId()) && item.getSize().equals(cartItem.getSize())
        );
        cart.setTotalPrice(cart.getTotalPrice() - (cartItem.getProduct().getPrice() * cartItem.getQuantity()));
        return cartRepository.save(cart);
    }

    public void clearCart(Cart cart) {
        cart.getCartItems().clear();
        cart.setTotalPrice(0.0);
        cartRepository.save(cart);
    }

    public double calculateTotalPrice(Cart cart) {
        double totalPrice = 0.0;
        for (CartItem item : cart.getCartItems()) {
            totalPrice += item.getProduct().getPrice() * item.getQuantity();
        }
        return totalPrice;
    }

    public void validateStock(CartItem cartItem) {
        Product product = cartItem.getProduct();
        int availableStock = product.getStockForSize(cartItem.getSize());
        if (cartItem.getQuantity() > availableStock) {
            throw new InsufficientStockException("Not enough stock available for this product and size.");
        }
    }
}

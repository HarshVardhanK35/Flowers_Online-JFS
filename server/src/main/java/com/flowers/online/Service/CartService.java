package com.flowers.online.Service;

import com.flowers.online.Model.Cart;
import com.flowers.online.Model.CartItem;
import com.flowers.online.Model.Product;
import com.flowers.online.Model.User;
import com.flowers.online.Repository.CartItemRepository;
import com.flowers.online.Repository.CartRepository;
import com.flowers.online.Repository.ProductRepository;
import com.flowers.online.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductService productService;

    public Cart getCartByUser(User user) {
        return cartRepository.findByUser(user).orElseGet(() -> createCart(user));
    }

    private Cart createCart(User user) {
        Cart cart = new Cart(user);
        return cartRepository.save(cart);
    }

    public Cart addToCart(User user, Long productId, String size, int quantity) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
        if (product.getAvailableQuantity() < quantity) {
            throw new RuntimeException("Not enough stock available");
        }

        productService.decreaseAvailableQuantity(productId, quantity);

        Cart cart = getCartByUser(user);
        CartItem cartItem = cartItemRepository.findByCartAndProductIdAndSize(cart, productId, size)
                .orElseGet(() -> new CartItem(cart, product, 0));

        cartItem.setQuantity(cartItem.getQuantity() + quantity);
        cartItemRepository.save(cartItem);

        cart.getItems().add(cartItem);
        return cartRepository.save(cart);
    }

    public void removeFromCart(User user, Long productId, String size) {
        Cart cart = getCartByUser(user);
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));

        List<CartItem> cartItems = cartItemRepository.findByCartAndProductAndSize(cart, product, size);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Product not found in cart");
        }

        CartItem cartItem = cartItems.get(0); // Taking the first result
        productService.increaseAvailableQuantity(productId, cartItem.getQuantity());

        cartItemRepository.delete(cartItem);
        cart.getItems().remove(cartItem);
        cartRepository.save(cart);
    }

    public CartItem updateCartQuantity(User user, Long productId, int newQuantity) {
        Cart cart = getCartByUser(user);
        CartItem cartItem = cartItemRepository.findByCartAndProductIdAndSize(cart, productId, null)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        int availableQuantity = cartItem.getProduct().getAvailableQuantity();
        int currentQuantity = cartItem.getQuantity();
        int quantityDifference = newQuantity - currentQuantity;

        if (availableQuantity < quantityDifference) {
            throw new RuntimeException("Not enough stock available");
        }

        productService.decreaseAvailableQuantity(productId, quantityDifference);

        cartItem.setQuantity(newQuantity);
        cartItemRepository.save(cartItem);

        return cartItem;
    }


    public List<CartItem> getUserCart(User user) {
        Cart cart = getCartByUser(user);
        System.out.println("Items in cart: " + cart.getItems());
        return cart.getItems();
    }
}
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
    public Cart getCartByUser(User user) {
        return cartRepository.findByUser(user).orElseGet(() -> createCart(user));
    }
    private Cart createCart(User user) {
        Cart cart = new Cart(user);
        return cartRepository.save(cart);
    }
    public Cart addToCart(User user, Long productId, String size, int quantity) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));

        // Decrease stock based on the size
        product.decreaseStock(quantity, size);
        productRepository.save(product);

        CartItem cartItem = new CartItem();
        cartItem.setProduct(product);
        cartItem.setSize(size);
        cartItem.setQuantity(quantity);
        cartItemRepository.save(cartItem);

        Cart cart = getCartByUser(user);
        cart.getItems().add(cartItem);
        return cartRepository.save(cart);
    }

    public void removeFromCart(User user, Long productId, String size) {
        Cart cart = getCartByUser(user);
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem cartItem = cartItemRepository.findByCartAndProductAndSize(cart, product, size)
                .orElseThrow(() -> new RuntimeException("Product not found in cart"));

        // Increase stock based on the size
        product.increaseStock(cartItem.getQuantity(), size);
        productRepository.save(product);

        cartItemRepository.delete(cartItem);
    }

    public List<CartItem> getUserCart(User user) {
        Cart cart = getCartByUser(user);
        return cart.getItems();
    }
}

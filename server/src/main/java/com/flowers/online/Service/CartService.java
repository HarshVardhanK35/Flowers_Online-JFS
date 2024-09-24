package com.flowers.online.Service;
import com.flowers.online.Model.Cart;
import com.flowers.online.Model.Product;
import com.flowers.online.Repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;
    public Cart getCartByUserId(Long userId) {
        return cartRepository.findByUserId(userId);
    }
    public Cart addProductToCart(Cart cart, Product product) {
        cart.getProducts().add(product);
        cart.setTotalPrice(cart.getTotalPrice() + product.getPrice());
        return cartRepository.save(cart);
    }
    public Cart removeProductFromCart(Cart cart, Product product) {
        cart.getProducts().remove(product);
        cart.setTotalPrice(cart.getTotalPrice() - product.getPrice());
        return cartRepository.save(cart);
    }
    public void clearCart(Cart cart) {
        cart.getProducts().clear();
        cart.setTotalPrice(0.0);
        cartRepository.save(cart);
    }
}
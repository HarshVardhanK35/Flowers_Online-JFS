package com.flowers.online.Repository;
import com.flowers.online.Model.Cart;
import com.flowers.online.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser(User user);
}
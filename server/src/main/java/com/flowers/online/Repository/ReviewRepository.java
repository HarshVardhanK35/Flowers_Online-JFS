package com.flowers.online.Repository;

import com.flowers.online.Model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
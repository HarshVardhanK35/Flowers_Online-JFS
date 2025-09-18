package com.flowers.online.Repository;

import com.flowers.online.Model.ShopLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ShopLocationRepository extends JpaRepository<ShopLocation, Long> {
    List<ShopLocation> findByCity(String city);
}

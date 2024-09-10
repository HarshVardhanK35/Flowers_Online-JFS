package com.flowers.online.Service;

import com.flowers.online.Model.ShopLocation;
import com.flowers.online.Repository.ShopLocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShopLocationService {

    @Autowired
    private ShopLocationRepository shopLocationRepository;

    public List<ShopLocation> getAllShopLocations() {
        return shopLocationRepository.findAll();
    }

    public ShopLocation addShopLocation(ShopLocation shopLocation) {
        return shopLocationRepository.save(shopLocation);
    }

    public void deleteShopLocation(Long id) {
        shopLocationRepository.deleteById(id);
    }
}
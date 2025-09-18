package com.flowers.online.Service;

import com.flowers.online.Model.ShopLocation;
import com.flowers.online.Repository.ShopLocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ShopLocationService {

    @Autowired
    private ShopLocationRepository shopLocationRepository;

    public List<ShopLocation> getAllShopLocations() {
        return shopLocationRepository.findAll();
    }

    public ShopLocation getShopById(Long id) {
        Optional<ShopLocation> shop = shopLocationRepository.findById(id);
        return shop.orElse(null);
    }

    public List<ShopLocation> getShopLocationsByCity(String city) {
        return shopLocationRepository.findByCity(city);
    }

    public ShopLocation addShopLocation(ShopLocation shopLocation) {
        return shopLocationRepository.save(shopLocation);
    }

    public ShopLocation updateShopLocation(Long id, ShopLocation updatedShop) {
        Optional<ShopLocation> existingShopOpt = shopLocationRepository.findById(id);
        if (existingShopOpt.isPresent()) {
            ShopLocation existingShop = existingShopOpt.get();
            existingShop.setName(updatedShop.getName());
            existingShop.setAddress(updatedShop.getAddress());
            existingShop.setCity(updatedShop.getCity());
            existingShop.setPhoneNumber(updatedShop.getPhoneNumber());
            return shopLocationRepository.save(existingShop);
        }
        return null; // Shop not found
    }

    public void deleteShopLocation(Long id) {
        shopLocationRepository.deleteById(id);
    }
}

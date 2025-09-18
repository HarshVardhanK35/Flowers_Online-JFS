package com.flowers.online.controller;

import com.flowers.online.Model.ShopLocation;
import com.flowers.online.Service.ShopLocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/shops")
public class ShopLocationController {

    @Autowired
    private ShopLocationService shopLocationService;

    @GetMapping
    public List<ShopLocation> getAllShopLocations() {
        return shopLocationService.getAllShopLocations();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ShopLocation> getShopById(@PathVariable Long id) {
        ShopLocation shop = shopLocationService.getShopById(id);
        if (shop != null) {
            return ResponseEntity.ok(shop);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Get distinct city names for the dropdown in registration
    @GetMapping("/cities")
    public List<String> getCities() {
        return shopLocationService.getAllShopLocations().stream()
                .map(ShopLocation::getCity)
                .distinct()
                .collect(Collectors.toList());
    }

    // Get shop locations by city for rendering available shop locations
    @GetMapping("/city/{city}")
    public ResponseEntity<List<ShopLocation>> getShopsByCity(@PathVariable String city) {
        List<ShopLocation> shops = shopLocationService.getShopLocationsByCity(city);
        return ResponseEntity.ok(shops);
    }

    // Add new shop location - restricted to ADMIN only
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ShopLocation addShopLocation(@RequestBody ShopLocation shopLocation) {
        return shopLocationService.addShopLocation(shopLocation);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ShopLocation> updateShopLocation(@PathVariable Long id, @RequestBody ShopLocation updatedShop) {
        ShopLocation shop = shopLocationService.updateShopLocation(id, updatedShop);
        if (shop != null) {
            return ResponseEntity.ok(shop);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteShopLocation(@PathVariable Long id) {
        shopLocationService.deleteShopLocation(id);
    }
}

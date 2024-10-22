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

    // Delete shop location - restricted to ADMIN only
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteShopLocation(@PathVariable Long id) {
        shopLocationService.deleteShopLocation(id);
    }
}

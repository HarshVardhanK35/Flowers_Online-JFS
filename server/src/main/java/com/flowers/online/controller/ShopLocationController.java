package com.flowers.online.controller;


import com.flowers.online.Model.ShopLocation;
import com.flowers.online.Service.ShopLocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shoplocations")
public class ShopLocationController {

    @Autowired
    private ShopLocationService shopLocationService;

    @GetMapping
    public List<ShopLocation> getAllShopLocations() {
        return shopLocationService.getAllShopLocations();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ShopLocation addShopLocation(@RequestBody ShopLocation shopLocation) {
        return shopLocationService.addShopLocation(shopLocation);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteShopLocation(@PathVariable Long id) {
        shopLocationService.deleteShopLocation(id);
    }
}
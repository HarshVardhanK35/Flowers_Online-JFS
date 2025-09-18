package com.flowers.online.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminDashboard() {
        return "Admin Dashboard";
    }

    @PostMapping("/details")
    @PreAuthorize("hasRole('ADMIN')")
    public String updateAdminDetails() {
        return "Admin details updated successfully";
    }

    @PostMapping("/add-product")
    @PreAuthorize("hasRole('ADMIN')")
    public String addProduct() {
        return "Product added successfully";
    }
    
    @PostMapping("/add-shop")
    @PreAuthorize("hasRole('ADMIN')")
    public String addShopLocation() {
        return "Shop location added successfully";
    }
}
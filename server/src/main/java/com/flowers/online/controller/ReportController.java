package com.flowers.online.controller;

import com.flowers.online.Model.Order;
import com.flowers.online.Model.User;
import com.flowers.online.Service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

public class ReportController {
    @Autowired
    private ReportService reportService;

    // Endpoint for Sales Report
    @GetMapping("/sales")
    public List<Order> getSalesReport() {
        return reportService.getSalesReport();
    }

    // Endpoint for Customer Report
    @GetMapping("/customers")
    public List<User> getCustomerReport() {
        return reportService.getCustomerReport();
    }
}

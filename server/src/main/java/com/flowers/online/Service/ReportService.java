package com.flowers.online.Service;

import com.flowers.online.Model.Order;
import com.flowers.online.Model.User;
import com.flowers.online.Repository.OrderRepository;
import com.flowers.online.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

public class ReportService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    // Generate Sales Report (Tabular format)
    public List<Order> getSalesReport() {
        return orderRepository.findAll();
    }

    // Generate Customer Report (Tabular format)
    public List<User> getCustomerReport() {
        return userRepository.findAll();
    }
}
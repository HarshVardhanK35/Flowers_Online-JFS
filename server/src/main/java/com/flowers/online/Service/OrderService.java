package com.flowers.online.Service;

import com.flowers.online.Model.Order;
import com.flowers.online.Repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private EmailService emailService;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order createOrder(Order order) {
        Order savedOrder = orderRepository.save(order);
        String emailBody = "Your order has been placed successfully. Order details: " + savedOrder.toString();
        emailService.sendOrderConfirmationEmail(order.getUser().getUsername(), "Order Confirmation", emailBody);
        return savedOrder;
    }
}
package com.example.e_bazar.controller;

import com.example.e_bazar.model.*;
import com.example.e_bazar.service.OrderService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/payment")
@CrossOrigin(origins = "http://localhost:3000", exposedHeaders = {"Access-Control-Allow-Origin"})
public class PaymentController {

    private final OrderService orderService;

    public PaymentController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/charge")
    public Map<String, Object> charge(@RequestBody ChargeRequest chargeRequest) throws StripeException {
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(chargeRequest.getAmount())
                .setCurrency(chargeRequest.getCurrency())
                .setPaymentMethod(chargeRequest.getId())
                .setConfirm(false)
                .build();
        PaymentIntent paymentIntent = PaymentIntent.create(params);

        Order order = new Order();
        order.setUserId(chargeRequest.getUserId());
        order.setTotal(BigDecimal.valueOf(chargeRequest.getAmount()).movePointLeft(2));
        order.setPaymentId(chargeRequest.getId());

        orderService.saveOrder(order);

        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem : chargeRequest.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItems.add(orderItem);

            orderService.saveOrderItem(orderItem);
        }

        order.setItems(orderItems);

        orderService.saveOrder(order);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("paymentIntentId", paymentIntent.getId());

        return response;
    }
}

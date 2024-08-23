package com.example.e_bazar.config;

import com.stripe.Stripe;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;

@Configuration
public class StripeConfig {
    @PostConstruct
    public void init() {
        Stripe.apiKey = "sk_test_51ObmnAISwy2ghL1I1AFbIup87zoi6EtqEIp0WmCYu1UWYX0tVlRh5wkfK2WS95FZPsdJLT77H8BrCI5jD9An9Utx0072272Pa7";
    }
}

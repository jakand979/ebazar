package com.example.e_bazar.controller;

import com.example.e_bazar.model.Cart;
import com.example.e_bazar.model.CartItem;
import com.example.e_bazar.service.CartService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/carts")
@CrossOrigin(origins = "http://localhost:3000", exposedHeaders = {"Access-Control-Allow-Origin"})
public class CartController {
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/cart/{userId}")
    public Cart getCartByUserId(@PathVariable Long userId) {
        return cartService.getCartByUserId(userId);
    }

    @GetMapping("/{userId}")
    public Long getCartIdByUserId(@PathVariable Long userId) {
        Cart cart = cartService.getCartByUserId(userId);
        return cart.getCartId();
    }

    @PostMapping("/add/{cartId}/{productId}/{quantity}")
    public void addItemToCart(@PathVariable Long cartId, @PathVariable Long productId, @PathVariable Integer quantity) {
        cartService.addItemToCart(cartId, productId, quantity);
    }

    @PutMapping("/items/{itemId}/{quantity}")
    public CartItem updateCartItemQuantity(@PathVariable Long itemId, @PathVariable Integer quantity) {
        return cartService.updateItemQuantity(itemId, quantity);
    }

    @DeleteMapping("/items/{itemId}")
    public void removeCartItem(@PathVariable Long itemId) {
        cartService.removeItemFromCart(itemId);
    }
}

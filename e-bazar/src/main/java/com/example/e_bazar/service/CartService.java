package com.example.e_bazar.service;

import com.example.e_bazar.model.Cart;
import com.example.e_bazar.model.CartItem;
import com.example.e_bazar.model.Product;
import com.example.e_bazar.repository.CartItemRepository;
import com.example.e_bazar.repository.CartRepository;
import com.example.e_bazar.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    public CartService(CartRepository cartRepository, CartItemRepository cartItemRepository, ProductRepository productRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
    }

    public Cart getCartByUserId(Long userId) {
        return cartRepository.findByUserId(userId).orElseGet(() -> {
            Cart newCart = new Cart();
            newCart.setUserId(userId);
            return cartRepository.save(newCart);
        });
    }

    public void addItemToCart(Long cartId, Long productId, Integer quantity) {
        Optional<Cart> cartOptional = cartRepository.findById(cartId);
        Cart cart = null;
        if (cartOptional.isPresent()) {
            cart = cartOptional.get();
        }

        Optional<Product> productOptional = productRepository.findById(productId);
        Product product = null;
        if (productOptional.isPresent()) {
            product = productOptional.get();
        }

        Optional<CartItem> cartItemOptional = cartItemRepository.findByCart_CartIdAndProduct_ProductId(cartId, productId);
        CartItem cartItem;
        if (cartItemOptional.isPresent()) {
            cartItem = cartItemOptional.get();
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        } else {
            cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
        }
        cartItemRepository.save(cartItem);
    }

    public CartItem updateItemQuantity(Long itemId, Integer quantity) {
        CartItem cartItem = cartItemRepository.findById(itemId).orElse(null);
        if (cartItem != null) {
            cartItem.setQuantity(quantity);
            return cartItemRepository.save(cartItem);
        }
        return null;
    }

    public void removeItemFromCart(Long itemId) {
        cartItemRepository.deleteById(itemId);
    }
}

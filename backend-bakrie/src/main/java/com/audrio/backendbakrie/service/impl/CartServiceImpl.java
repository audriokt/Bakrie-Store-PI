package com.audrio.backendbakrie.service.impl;

import com.audrio.backendbakrie.Repository.CartRepository;
import com.audrio.backendbakrie.entity.Carts;
import com.audrio.backendbakrie.entity.Customers;
import com.audrio.backendbakrie.io.CartRequest;
import com.audrio.backendbakrie.io.CartResponse;
import com.audrio.backendbakrie.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Override
    public CartResponse createCart(CartRequest request) {
        // Asumsinya Customer sudah ada, dan cart dibuat tanpa input idCustomer
        // Jika kamu mau relasikan langsung, bisa dari login user / session user
        Customers customer = new Customers();
        // idCustomer akan otomatis dibuat di DB ketika customer disave di tempat lain

        Carts cart = new Carts();
        cart.setCustomer(customer);
        cart.setCreatedAt(request.getCreatedAt());
        cart.setUpdatedAt(request.getUpdatedAt());

        Carts savedCart = cartRepository.save(cart);
        return mapToResponse(savedCart);
    }

    @Override
    public CartResponse getCartById(UUID id) {
        Carts cart = cartRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        return mapToResponse(cart);
    }

    @Override
    public List<CartResponse> getAllCarts() {
        return cartRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public CartResponse updateCart(UUID id, CartRequest request) {
        Carts cart = cartRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        cart.setCreatedAt(request.getCreatedAt());
        cart.setUpdatedAt(request.getUpdatedAt());

        Carts updatedCart = cartRepository.save(cart);
        return mapToResponse(updatedCart);
    }

    @Override
    public void deleteCart(UUID id) {
        cartRepository.deleteById(id);
    }

    private CartResponse mapToResponse(Carts cart) {
        CartResponse response = new CartResponse();
        response.setIdCart(cart.getIdCart());
        response.setCustomerId(cart.getCustomer().getId_customer()); // masih bisa diambil dari entity
        response.setCreatedAt(cart.getCreatedAt());
        response.setUpdatedAt(cart.getUpdatedAt());
        return response;
    }
}



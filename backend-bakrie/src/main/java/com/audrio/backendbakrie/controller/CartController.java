package com.audrio.backendbakrie.controller;

import com.audrio.backendbakrie.entity.Carts;
import com.audrio.backendbakrie.entity.Customers;
import com.audrio.backendbakrie.io.CartResponse;
import com.audrio.backendbakrie.repository.CustomerRepository;
import com.audrio.backendbakrie.service.CartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/customer/cart")
public class CartController {

    private final CartService cartService;
    private final CustomerRepository customerRepository;

    @GetMapping("/{customerId}")
    @ResponseStatus(HttpStatus.OK)
    public CartResponse getCartByCustomer(@PathVariable UUID customerId) {
        try {
            log.info("GET /customer/cart/{}", customerId);

            Customers customer = customerRepository.findByIdCustomer(customerId)
                    .orElseThrow(() -> new RuntimeException("Customer tidak ditemukan"));

            Carts cart = cartService.getCartByCustomerId(customer);

            return CartResponse.builder()
                    .cartId(cart.getCartId())
                    .customerId(customerId)
                    .totalPrice(cart.getTotalPrice())
                    .item_carts(cart.getItemCarts())
                    .build();

        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/delete/{customerId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCart(@PathVariable UUID customerId) {
        try {
            log.info("DELETE /customer/cart/delete/{}", customerId);

            Customers customer = customerRepository.findByIdCustomer(customerId)
                    .orElseThrow(() -> new RuntimeException("Customer tidak ditemukan"));

            Carts cart = cartService.getCartByCustomerId(customer);
            cartService.deleteCart(cart);

        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}

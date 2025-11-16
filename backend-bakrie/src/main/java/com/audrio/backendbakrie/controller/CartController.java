package com.audrio.backendbakrie.controller;

import com.audrio.backendbakrie.entity.Carts;
import com.audrio.backendbakrie.entity.Customers;
import com.audrio.backendbakrie.entity.Products;
import com.audrio.backendbakrie.io.CartRequest;
import com.audrio.backendbakrie.io.CartResponse;
import com.audrio.backendbakrie.repository.CustomerRepository;
import com.audrio.backendbakrie.repository.ProductRepository;
import com.audrio.backendbakrie.service.CartService;
import com.audrio.backendbakrie.service.ItemCartService;
import com.audrio.backendbakrie.utils.Exceptions.CustomerNotFoundException;
import com.audrio.backendbakrie.utils.Exceptions.ProductNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/customer/cart")
public class CartController {

    private final CartService cartService;
    private final CustomerRepository customerRepository;
    private final ItemCartService itemCartService;

    @GetMapping("/customer/mycart/{customerId}")
    @ResponseStatus(HttpStatus.OK)
    public CartResponse getCustomerCart(@PathVariable String customerId) {
        try {
            log.info("GET /customer/mycart/{}", customerId);
            return cartService.getCartByCustomerId(customerId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/customer/cart/delete/{customerId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCart(@PathVariable String customerId) {
        try {
            log.info("DELETE /customer/cart/delete/{}", customerId);
            cartService.deleteCart(customerId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/customer/cart/delete/itemCart/{itemCartId}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteItemCart(@PathVariable UUID itemCartId) {
        log.info("DELETE /customer/cart/delete/itemCart/{}", itemCartId);
        itemCartService.removeItemFromCart(itemCartId);
    }

    @PostMapping("/customer/cart/add/itemCart")
    @ResponseStatus(HttpStatus.OK)
    public CartResponse addItemCart(@RequestBody CartRequest cartRequest, Principal principal) {
        log.info("POST /customer/cart/add/itemCart - Request: {}", cartRequest);
        String customerId = principal.getName();
        System.out.printf("Customer Id: %s".formatted(customerId));
        return itemCartService.addItemToCart(cartRequest, customerId);
    }

}

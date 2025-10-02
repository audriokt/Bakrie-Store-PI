package com.audrio.backendbakrie.controller;

import com.audrio.backendbakrie.io.CartRequest;
import com.audrio.backendbakrie.io.CartResponse;
import com.audrio.backendbakrie.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/carts")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CartResponse createCart(@RequestBody CartRequest request) {
        // Ambil ID customer dari user yang sedang login (contoh: username atau UUID di JWT)
        return cartService.createCart(request);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public CartResponse getCartById(@PathVariable UUID id) {
        return cartService.getCartById(id);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<CartResponse> getAllCarts() {
        return cartService.getAllCarts();
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public CartResponse updateCart(@PathVariable UUID id, @RequestBody CartRequest request) {
        return cartService.updateCart(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCart(@PathVariable UUID id) {
        cartService.deleteCart(id);
    }
}


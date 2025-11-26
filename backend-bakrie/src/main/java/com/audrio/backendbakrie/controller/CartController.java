package com.audrio.backendbakrie.controller;

import com.audrio.backendbakrie.io.AddItemCartRequest;
import com.audrio.backendbakrie.io.CartResponse;
import com.audrio.backendbakrie.io.UpdateItemRequest;
import com.audrio.backendbakrie.service.CartService;
import com.audrio.backendbakrie.service.CustomerService;
import com.audrio.backendbakrie.service.ItemCartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/customer/cart")
public class   CartController {

    private final CartService cartService;
    private final ItemCartService itemCartService;

    @GetMapping("/mycart/{customerId}")
    @ResponseStatus(HttpStatus.OK)
    public CartResponse getCustomerCart(@PathVariable String customerId) {
        try {
            log.info("GET /customer/mycart/{}", customerId);
            return cartService.getCartByCustomerId(customerId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/delete/{customerId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCart(@PathVariable String customerId) {
        try {
            log.info("DELETE /customer/cart/delete/{}", customerId);
            cartService.deleteCart(customerId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/delete/itemCart/{itemCartId}")
    public ResponseEntity<Void> deleteItemCart(@PathVariable String itemCartId) {
        log.info("DELETE /customer/cart/delete/itemCart/{}", itemCartId);
        itemCartService.removeItemFromCartIfOwnedByUser(itemCartId);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/add/itemCart")
    @ResponseStatus(HttpStatus.OK)
    public CartResponse addItemCart(@RequestBody AddItemCartRequest cartRequest) {
        log.info("POST /customer/cart/add/itemCart - Request: {}", cartRequest);
        return itemCartService.addItemToCart(cartRequest);
    }

    @PutMapping("/update/itemCart")
    @ResponseStatus(HttpStatus.OK)
    public CartResponse updateQuantityItemCart(@RequestBody UpdateItemRequest request) {
        log.info("PUT /customer/cart/update/itemCart - Request: {}", request);
        return itemCartService.updateItemQuantity(request);
    }
}

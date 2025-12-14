package com.audrio.backendbakrie.service.impl;

import com.audrio.backendbakrie.entity.Carts;
import com.audrio.backendbakrie.entity.Customers;
import com.audrio.backendbakrie.entity.Item_Carts;
import com.audrio.backendbakrie.entity.Products;
import com.audrio.backendbakrie.io.*;
import com.audrio.backendbakrie.repository.CartRepository;
import com.audrio.backendbakrie.repository.CustomerRepository;
import com.audrio.backendbakrie.repository.ItemCartsRepository;
import com.audrio.backendbakrie.repository.ProductRepository;
import com.audrio.backendbakrie.service.CartService;
import com.audrio.backendbakrie.service.CustomerService;
import com.audrio.backendbakrie.service.ItemCartService;
import com.audrio.backendbakrie.utils.Exceptions.CustomerNotFoundException;
import com.audrio.backendbakrie.utils.Exceptions.ProductNotFoundException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.aspectj.runtime.internal.Conversions.doubleValue;

@Slf4j
@Service
@RequiredArgsConstructor
public class
     ItemCartServiceImpl implements ItemCartService {

    private final ItemCartsRepository itemCartRepository;
    private final CartRepository cartRepository;
    private final CustomerRepository customerRepository;
    private final CartService cartService;
    private final ProductRepository productRepository;
    private final CustomerService customerService;

    @SneakyThrows
    @Transactional
    @Override
    public CartResponse addItemToCart(AddItemCartRequest cartRequest) {
        UUID productId = cartRequest.getProductUUID();
        int quantity = cartRequest.getQuantity();
        UUID customerId = cartRequest.getCustomerUUID();

        log.info("Add item to cart initiated. Customer ID: {}, Product ID: {}, Quantity: {}", customerId, productId, quantity);
        validateQuantity(quantity);

        Customers customer = getCustomer(customerId);
        Carts cart = getCart(customer);
        Products product = getProduct(productId);

        Optional<Item_Carts> itemOpt = itemCartRepository.findByCartAndProduct(cart, product);

        if (itemOpt.isPresent()) {
            Item_Carts item = itemOpt.get();
            int updatedQuantity = item.getQuantity() + quantity;
            item.setQuantity(updatedQuantity);
            item.setSubPrice((BigDecimal.valueOf(updatedQuantity)).doubleValue() * product.getProduct_price());
            itemCartRepository.save(item);
            log.info("Updated existing item. Product ID: {}, New Quantity: {}, New SubPrice: {}", productId, updatedQuantity, item.getSubPrice());
        } else {
            Item_Carts item = createNewItem(cart, product, quantity);
            itemCartRepository.save(item);
            log.info("Created new item. Product ID: {}, Quantity: {}, SubPrice: {}", productId, quantity, item.getSubPrice());
        }

        cartService.recalculateTotal(cart);
        CartResponse cartResponse = convertToResponse(cart);
        log.info("Returning CartResponse: {}", new ObjectMapper().writeValueAsString(cartResponse));
        return cartResponse;
    }

    @Override
    public void removeItemFromCartIfOwnedByUser(String itemCartId) {
        String currentCustomer = customerService.getCurrentCustomer().getUsername();
        Item_Carts item = itemCartRepository.findById(UUID.fromString(itemCartId))
                .orElseThrow(() -> new RuntimeException("Item in not found in your cart"));

        if (!item.getCart().getCustomer().getEmail().equals(currentCustomer)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only delete your own cart items");
        }
        log.info("current user: {}", currentCustomer);
        itemCartRepository.delete(item);
        cartService.recalculateTotal(item.getCart());
    }

    @Override
    @Transactional
    public CartResponse updateItemQuantity(UpdateItemRequest request) {
        int newQuantity = request.getQuantity();
        UUID itemCartId = request.getItemCartId();
        try {
            log.info("Updating item quantity. ItemCart ID: {}, New Quantity: {}", itemCartId, newQuantity);
            validateQuantity(newQuantity);

            Item_Carts item = itemCartRepository.findById(itemCartId)
                    .orElseThrow(() -> {
                        log.warn("Item not found with ID: {}", itemCartId);
                        return new RuntimeException("Item not found with ID: " + itemCartId);
                    });

            item.setQuantity(newQuantity);
            item.setSubPrice(item.getProduct().getProduct_price() * newQuantity);
            itemCartRepository.save(item);

            log.info("Item updated. Product ID: {}, Quantity: {}, SubPrice: {}",
                    item.getProduct().getIdProduct(), newQuantity, item.getSubPrice());

            cartService.recalculateTotal(item.getCart());
            log.info("Cart total recalculated for Customer ID: {}", item.getCart().getCustomer().getIdCustomer());
            return convertToResponse(item.getCart());

        } catch (Exception e) {
            log.error("Failed to update item quantity. ItemCart ID: {}, Error: {}", itemCartId, e.getMessage(), e);
            throw e;
        }
    }

    private void validateQuantity(int quantity) {
        if(quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than 0");
        }
    }
    private Customers getCustomer(UUID customerId) {
        return customerRepository.findByIdCustomer(customerId)
                .orElseThrow(() ->
                        new CustomerNotFoundException("Customer tidak ditemukan"));
    }
    private Products getProduct(UUID productId) {
        return productRepository.findByIdProduct(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product tidak ditemukan"));
    }
    private Carts getCart(Customers customer) {
        return cartRepository.findByCustomer(customer)
                .orElseGet(() -> cartRepository.save(Carts.builder()
                        .customer(customer)
                                .itemCarts(new ArrayList<>())
                                .totalPrice(0.0)
                        .build()));
    }
    private Item_Carts createNewItem(Carts cart, Products product, int quantity) {
        double subPrice = product.getProduct_price() * (BigDecimal.valueOf(quantity)).doubleValue();

        Item_Carts newItem = Item_Carts.builder()
                                        .cart(cart)
                                        .product(product)
                                        .quantity(quantity)
                                        .subPrice(subPrice)
                                        .build();
        cart.getItemCarts().add(newItem);
        return newItem;
    }

    private CartResponse convertToResponse(Carts cart) {
        List<ItemCartResponse> itemResponses = cart.getItemCarts().stream()
                .map(item -> {
                        Products p = item.getProduct();
                        return ItemCartResponse.builder()
                        .productId(p.getIdProduct())
                        .itemCartId(item.getIdItemCarts())
                        .quantity(item.getQuantity())
                        .subPrice(item.getSubPrice())
                        .productName(p.getProductName())
                        .productImgUrl(p.getImage_url())
                        .build();
                })
                .toList();

        return CartResponse.builder()
                .customerId(cart.getCustomer().getIdCustomer().toString())
                .cartId(cart.getCartId().toString())
                .totalPrice(cart.getTotalPrice())
                .item_carts(itemResponses)
                .build();
    }
}

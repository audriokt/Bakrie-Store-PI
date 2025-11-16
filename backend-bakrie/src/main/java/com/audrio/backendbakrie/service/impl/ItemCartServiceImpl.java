package com.audrio.backendbakrie.service.impl;

import com.audrio.backendbakrie.entity.Carts;
import com.audrio.backendbakrie.entity.Customers;
import com.audrio.backendbakrie.entity.Item_Carts;
import com.audrio.backendbakrie.entity.Products;
import com.audrio.backendbakrie.io.CartRequest;
import com.audrio.backendbakrie.io.CartResponse;
import com.audrio.backendbakrie.io.ItemCartResponse;
import com.audrio.backendbakrie.repository.CartRepository;
import com.audrio.backendbakrie.repository.CustomerRepository;
import com.audrio.backendbakrie.repository.ItemCartsRepository;
import com.audrio.backendbakrie.repository.ProductRepository;
import com.audrio.backendbakrie.service.CartService;
import com.audrio.backendbakrie.service.ItemCartService;
import com.audrio.backendbakrie.utils.Exceptions.CustomerNotFoundException;
import com.audrio.backendbakrie.utils.Exceptions.ProductNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

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

    @Transactional
    @Override
    public CartResponse addItemToCart(CartRequest cartRequest, String customerId) {
        UUID productId = UUID.fromString(cartRequest.getProductId());
        int quantity = cartRequest.getQuantity();

        log.info("Add item to cart initiated. Customer ID: {}, Product ID: {}, Quantity: {}", customerId, productId, quantity);
        validateQuantity(quantity);
        Customers customer = getCustomer(UUID.fromString(customerId));
        Carts cart = getCart(customer);
        Products product = getProduct(productId);

        Optional<Item_Carts> itemOpt = itemCartRepository.findByCartAndProduct(cart, product);

        if (itemOpt.isPresent()) {
            Item_Carts item = itemOpt.get();
            int updatedQuantity = item.getQuantity() + quantity;
            item.setQuantity(updatedQuantity);
            item.setSubPrice(product.getProduct_price() * updatedQuantity);
            itemCartRepository.save(item);
            log.info("Updated existing item. Product ID: {}, New Quantity: {}, New SubPrice: {}", productId, updatedQuantity, item.getSubPrice());
        } else {
            Item_Carts item;
            item = createNewItem(cart, product, quantity);
            itemCartRepository.save(item);
            log.info("Created new item. Product ID: {}, Quantity: {}, SubPrice: {}", productId, quantity, item.getSubPrice());
        }

        cartService.recalculateTotal(cart);
        return convertToResponse(cart);
    }

    @Override
    public void removeItemFromCart(UUID itemCartId) {
        Item_Carts item = itemCartRepository.findById(itemCartId)
                .orElseThrow(() -> new RuntimeException("Item not found"));
        Carts cart = item.getCart();
        itemCartRepository.delete(item);
        cartService.recalculateTotal(cart);
    }

    @Override
    @Transactional
    public void updateItemQuantity(UUID itemCartId, int newQuantity) {
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

            Carts cart = item.getCart();
            cartService.recalculateTotal(cart);
            log.info("Cart total recalculated for Customer ID: {}", cart.getCustomer().getIdCustomer());

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
                        .build()));
    }
    private Item_Carts createNewItem(Carts cart, Products product, int quantity) {
        double subPrice = product.getProduct_price() * quantity;

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
                .map(item -> ItemCartResponse.builder()
                        .productId(UUID.fromString(item.getProduct().getIdProduct().toString()))
                        .itemCartId(item.getIdItemCarts())
                        .quantity(item.getQuantity())
                        .subPrice(item.getSubPrice())
                        .productName(item.getProduct().getProduct_name())
                        .productImgUrl(item.getProduct().getImage_url())
                        .build())
                .toList();

        return CartResponse.builder()
                .customerId(cart.getCustomer().getIdCustomer().toString())
                .cartId(String.valueOf(cart.getCartId()))
                .totalPrice(cart.getTotalPrice())
                .item_carts(itemResponses)
                .build();
    }
}

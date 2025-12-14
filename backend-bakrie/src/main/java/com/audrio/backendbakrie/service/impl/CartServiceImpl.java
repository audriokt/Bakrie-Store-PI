package com.audrio.backendbakrie.service.impl;

import com.audrio.backendbakrie.entity.Carts;
import com.audrio.backendbakrie.entity.Customers;
import com.audrio.backendbakrie.entity.Item_Carts;
import com.audrio.backendbakrie.io.CartResponse;
import com.audrio.backendbakrie.io.ItemCartResponse;
import com.audrio.backendbakrie.repository.CartRepository;
import com.audrio.backendbakrie.repository.CustomerRepository;
import com.audrio.backendbakrie.service.CartService;
import com.audrio.backendbakrie.utils.Exceptions.CartNotFoundException;
import com.audrio.backendbakrie.utils.Exceptions.CustomerNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CustomerRepository customerRepository;
    private final CartRepository cartRepository;

    @Override
    public void recalculateTotal(Carts cart) {
        double total = cart.getItemCarts().stream()
                .map(Item_Carts::getSubPrice)
                .reduce(0.0, Double::sum);
        cart.setTotalPrice(total);
        cartRepository.save(cart);
    }

    @Override
    public void deleteCart(String customerId) {
        Customers customer = customerRepository.findByIdCustomer(UUID.fromString(customerId))
                .orElseThrow(() -> new CustomerNotFoundException("Customer not found"));
        Carts cart = cartRepository.findByCustomer(customer)
                .orElseThrow(() -> new CartNotFoundException("Cart not found by customer id: " + customerId));
        try {
            cartRepository.delete(cart);
            log.info("Berhasil menghapus keranjang user: {}", customerId);
        } catch (Exception e) {
            log.error("Error deleting cart for customer {}: {}", customerId, e.getMessage());
            throw new RuntimeException("Error deleting cart");
        }

    }

    @Override
    public CartResponse getCartByCustomerId(String customerId) {
        Customers customer = customerRepository.findByIdCustomer(UUID.fromString(customerId))
                .orElseThrow(() -> new CustomerNotFoundException("Customer not found"));
        Carts cart = cartRepository.findByCustomer(customer)
                .orElseThrow(() -> new CartNotFoundException("Cart not found by customer id: " + customer.getIdCustomer()));

        return convertToResponse(cart);
    }

    private CartResponse convertToResponse(Carts cart) {
        List<ItemCartResponse> itemResponses = cart.getItemCarts().stream()
                .map(item -> ItemCartResponse.builder()
                        .productId(UUID.fromString(item.getProduct().getIdProduct().toString()))
                        .itemCartId(item.getIdItemCarts())
                        .quantity(item.getQuantity())
                        .subPrice(item.getSubPrice())
                        .productName(item.getProduct().getProductName())
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


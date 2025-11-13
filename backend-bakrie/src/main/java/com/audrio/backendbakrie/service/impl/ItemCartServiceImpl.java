package com.audrio.backendbakrie.service.impl;

import com.audrio.backendbakrie.entity.Carts;
import com.audrio.backendbakrie.entity.Customers;
import com.audrio.backendbakrie.entity.Item_Carts;
import com.audrio.backendbakrie.entity.Products;
import com.audrio.backendbakrie.repository.CartRepository;
import com.audrio.backendbakrie.repository.CustomerRepository;
import com.audrio.backendbakrie.repository.ItemCartRepository;
import com.audrio.backendbakrie.repository.ProductRepository;
import com.audrio.backendbakrie.service.CartService;
import com.audrio.backendbakrie.service.ItemCartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor

public class ItemCartServiceImpl implements ItemCartService {

    private final ItemCartRepository itemCartRepository;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final CustomerRepository customerRepository;
    private final CartService cartService;

    @Override
    public Carts addItemToCart(UUID customerId, UUID productId, int quantity) {
        Customers customer = customerRepository.findByIdCustomer(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Carts cart = cartRepository.findByCustomer(customer)
                .orElseGet(() -> {
                    Carts newCart = new Carts();
                    newCart.setCustomer(customer);
                    newCart.setTotalPrice(0);
                    return cartRepository.save(newCart);
                });

        Optional<Item_Carts> existingItem = cart.getItemCarts().stream()
                .filter(i -> i.getProduct().getIdProduct().equals(productId))
                .findFirst();

        if (existingItem.isPresent()) {
            Item_Carts item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
            item.setSubPrice(item.getProduct().getPrice() * item.getQuantity());
            itemCartRepository.save(item);
        } else {
            Item_Carts newItem = new Item_Carts();
            newItem.setCart(cart);
            newItem.setProduct(product);
            newItem.setQuantity(quantity);
            newItem.setPricePerUnit(product.getProduct_price());
            newItem.setSubPrice(product.getProduct_price() * quantity);
            itemCartRepository.save(newItem);
            cart.getItemCarts().add(newItem);
        }

        cartService.recalculateTotal(cart);
        return cart;
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
    public void updateItemQuantity(UUID itemCartId, int newQuantity) {
        Item_Carts item = itemCartRepository.findById(itemCartId)
                .orElseThrow(() -> new RuntimeException("Item not found"));
        item.setQuantity(newQuantity);
        item.setSubPrice(item.getPricePerUnit() * newQuantity);
        itemCartRepository.save(item);

        Carts cart = item.getCart();
        cartService.recalculateTotal(cart);
    }
}

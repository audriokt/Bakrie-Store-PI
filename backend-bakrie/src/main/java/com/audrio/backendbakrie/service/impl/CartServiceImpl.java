package com.audrio.fibackendbakrie.service.impl;

import com.audrio.backendbakrie.entity.Carts;
import com.audrio.backendbakrie.entity.Customers;
import com.audrio.backendbakrie.entity.Item_Carts;
import com.audrio.backendbakrie.repository.CartRepository;
import com.audrio.backendbakrie.repository.CustomerRepository;
import com.audrio.backendbakrie.service.CartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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
    public void deleteCart(Carts cart) {
        Optional<Customers> existingCustomer = customerRepository.findByIdCustomer(cart.getCustomer().getIdCustomer());
        if(existingCustomer.isPresent()){
            try{
                cartRepository.delete(cart);
            } catch (Exception e){
                log.error("Error deleting cart for customer {}: {}", existingCustomer.get().getIdCustomer(), e.getMessage());
                throw new RuntimeException("Error deleting cart");
            }
            log.info("Berhasil menghapus keranjang user: {} ", existingCustomer.get().getIdCustomer());
        }else{
            log.warn("Customer tidak ditemukan");
            throw new RuntimeException("Customer not found");
        }
    }

    @Override
    public Carts getCartByCustomerId(UUID customerId) {
        return cartRepository.findByCustomerId(customerId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
    }
}


package com.audrio.backendbakrie.repository;

import com.audrio.backendbakrie.entity.Carts;
import com.audrio.backendbakrie.entity.Item_Carts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ItemCartsRepository extends JpaRepository<Item_Carts, UUID> {
    Item_Carts findByIdItemCarts(UUID idItemCarts);
    void deleteByIdItemCarts(UUID idItemCarts);
    void deleteAllByIdCart(Carts cart);
    Optional<Item_Carts> findByIdCart(Carts cart);

}

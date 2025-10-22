package com.audrio.backendbakrie.repository;

import com.audrio.backendbakrie.entity.Customers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CustomerRepository extends JpaRepository<Customers, Long> {
    Optional<Customers> findByIdCustomer(UUID idCustomer);
    @Modifying
    @Query("UPDATE Customers c SET c.username = :username, " +
            "c.password = :password, " +
            "c.address = :address, " +
            "c.email = :email, " +
            "c.phone_num = :phoneNum, " +
            "c.img_url = :imgUrl " +
            "WHERE c.idCustomer = :id_customer")
    void updateCustomerFields(
            @Param("idCustomer") UUID idCustomer,
            @Param("username") String username,
            @Param("password") String password,
            @Param("address") String address,
            @Param("email") String email,
            @Param("phoneNum") String phoneNum,
            @Param("imgUrl") String imgUrl
    );
    Optional<Customers> findByVerificationToken(String token);
    Customers findByEmail(String email);
}

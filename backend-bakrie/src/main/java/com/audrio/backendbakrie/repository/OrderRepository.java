package com.audrio.backendbakrie.repository;

import com.audrio.backendbakrie.entity.Customers;
import com.audrio.backendbakrie.entity.Orders;
import com.audrio.backendbakrie.entity.Products;
import com.audrio.backendbakrie.io.ProductResponse;
import com.audrio.backendbakrie.io.admin.TopSellingProductsResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Orders, UUID> {
    Optional<Orders> findByOrderNumber(String orderNumber);
    List<Orders> findByCustomers(Customers customer);

    @Query("SELECT COALESCE(SUM(o.total), 0) FROM Orders o WHERE o.orderStatus = :status AND o.orderDate BETWEEN :start AND :end")
    Optional<BigDecimal> sumTotalAmountByStatusAndDateRange(
            @Param("status") String status,
            @Param("start") LocalDateTime start,
            @Param("end")   LocalDateTime end);

    @Query("SELECT COUNT(o) FROM Orders o WHERE o.orderDate BETWEEN :start AND :end")
    long countByOrderDateBetween(
            @Param("start") LocalDateTime start,
            @Param("end")   LocalDateTime end);

    @Query("""
        SELECT 
            p.idProduct     AS id_product,
            p.productName             AS product_name,
            p.product_price            AS product_price,
            p.description              AS description,
            p.product_stock            AS product_stock,
            p.image_url                AS image_url,
            p.created_at               AS created_at,
            p.updated_at              AS updated_at,
            SUM(od.quantity)           AS totalSold
        FROM OrderDetail od
        JOIN od.product p
        JOIN od.orders o
        WHERE o.orderStatus IN ('PENDING', 'PAID')  
        GROUP BY p.idProduct, p.productName, p.product_price, p.description, 
                 p.product_stock, p.image_url, p.created_at, p.updated_at
        ORDER BY totalSold DESC
        LIMIT 10
        """)
    List<TopSellingProductsResponse> findTop10SellingProducts();


    long countByOrderStatus(Orders.OrderStatus status);

    default long countByOrderStatus(String status) {
        if (status == null || status.isBlank()) {
            return 0L;
        }
        try {
            return countByOrderStatus(Orders.OrderStatus.valueOf(status.toUpperCase().trim()));
        } catch (IllegalArgumentException e) {
            return 0L;
        }
    }
}

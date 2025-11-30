//package com.audrio.backendbakrie.service.impl;
//
//import com.audrio.backendbakrie.io.analytics.*;
//import com.audrio.backendbakrie.service.ProductAnalyticsService;
//import jakarta.persistence.EntityManager;
//import jakarta.persistence.Query;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDate;
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//public class ProductAnalyticsServiceImpl implements ProductAnalyticsService {
//
//    private final EntityManager em;
//
//    @Override
//    public List<TopProductDto> getTopProductsByQuantity(LocalDate from, LocalDate to, int limit) {
//        String sql = """
//            SELECT
//                p.id_product AS productId,
//                p.product_name AS productName,
//                COALESCE(SUM(od.quantity), 0) AS totalQuantity,
//                COUNT(DISTINCT o.id_order) AS totalOrders,
//                COALESCE(SUM(od.subtotal), 0) AS totalRevenue
//            FROM products p
//            LEFT JOIN order_detail od ON p.id_product = od.product_id
//            LEFT JOIN orders o ON od.order_id = o.id_order
//                AND o.order_status IN ('COMPLETED', 'SHIPPED')
//                AND DATE(o.order_date) BETWEEN :from AND :to
//            GROUP BY p.id_product, p.product_name
//            ORDER BY totalQuantity DESC
//            LIMIT :limit
//            """;
//
//        Query query = em.createNativeQuery(sql);
//        query.setParameter("from", from);
//        query.setParameter("to", to);
//        query.setParameter("limit", limit);
//
//        return mapToTopProductDto(query.getResultList());
//    }
//
//    @Override
//    public List<TopProductDto> getTopProductsByRevenue(LocalDate from, LocalDate to, int limit) {
//        String sql = """
//            SELECT
//                p.id_product AS productId,
//                p.product_name AS productName,
//                COALESCE(SUM(od.quantity), 0) AS totalQuantity,
//                COUNT(DISTINCT o.id_order) AS totalOrders,
//                COALESCE(SUM(od.subtotal), 0) AS totalRevenue
//            FROM products p
//            LEFT JOIN order_detail od ON p.id_product = od.product_id
//            LEFT JOIN orders o ON od.order_id = o.id_order
//                AND o.order_status IN ('COMPLETED', 'SHIPPED')
//                AND DATE(o.order_date) BETWEEN :from AND :to
//            GROUP BY p.id_product, p.product_name
//            ORDER BY totalRevenue DESC
//            LIMIT :limit
//            """;
//
//        Query query = em.createNativeQuery(sql);
//        query.setParameter("from", from);
//        query.setParameter("to", to);
//        query.setParameter("limit", limit);
//
//        return mapToTopProductDto(query.getResultList());
//    }
//
//    @Override
//    public List<ProductCancellationDto> getProductsWithHighestCancellationRate(int limit) {
//        String sql = """
//            SELECT
//                p.id_product,
//                p.product_name,
//                SUM(od.quantity) AS ordered_qty,
//                SUM(CASE WHEN o.order_status = 'CANCELLED' THEN od.quantity ELSE 0 END) AS cancelled_qty,
//                ROUND(
//                    100.0 * SUM(CASE WHEN o.order_status = 'CANCELLED' THEN od.quantity ELSE 0 END)
//                    / NULLIF(SUM(od.quantity), 0), 2
//                ) AS cancellation_rate
//            FROM order_detail od
//            JOIN orders o ON od.order_id = o.id_order
//            JOIN products p ON od.product_id = p.id_product
//            GROUP BY p.id_product, p.product_name
//            HAVING SUM(od.quantity) > 0
//            ORDER BY cancellation_rate DESC
//            LIMIT :limit
//            """;
//
//        Query query = em.createNativeQuery(sql);
//        query.setParameter("limit", limit);
//
//        List<Object[]> rows = query.getResultList();
//        return rows.stream().map(row -> new ProductCancellationDto(
//                ((Number) row[0]).longValue(),
//                (String) row[1],
//                ((Number) row[2]).longValue(),
//                ((Number) row[3]).longValue(),
//                row[4] != null ? ((Number) row[4]).doubleValue() : 0.0
//        )).toList();
//    }
//
//    @Override
//    public List<ProductProfitDto> getProfitReport(LocalDate from, LocalDate to, int limit) {
//        // Pastikan tabel products punya kolom cost_price (harga beli). Kalau belum ada → tambah dulu!
//        String sql = """
//            SELECT
//                p.id_product,
//                p.product_name,
//                COALESCE(SUM(od.quantity), 0) AS qty_sold,
//                COALESCE(SUM(od.subtotal), 0) AS revenue,
//                COALESCE(SUM(od.quantity) * (p.product_price - p.cost_price), 0) AS gross_profit,
//                CASE
//                    WHEN SUM(od.subtotal) > 0 THEN
//                        ROUND(100.0 * SUM(od.quantity) * (p.product_price - p.cost_price) / SUM(od.subtotal), 2)
//                    ELSE 0
//                END AS profit_margin
//            FROM products p
//            LEFT JOIN order_detail od ON p.id_product = od.product_id
//            LEFT JOIN orders o ON od.order_id = o.id_order
//                AND o.order_status IN ('COMPLETED', 'SHIPPED')
//                AND DATE(o.order_date) BETWEEN :from AND :to
//            GROUP BY p.id_product, p.product_name, p.product_price, p.cost_price
//            ORDER BY gross_profit DESC
//            LIMIT :limit
//            """;
//
//        Query query = em.createNativeQuery(sql);
//        query.setParameter("from", from);
//        query.setParameter("to", to);
//        query.setParameter("limit", limit);
//
//        List<Object[]> rows = query.getResultList();
//        return rows.stream().map(row -> new ProductProfitDto(
//                ((Number) row[0]).longValue(),
//                (String) row[1],
//                ((Number) row[2]).longValue(),
//                ((Number) row[3]).doubleValue(),
//                ((Number) row[4]).doubleValue(),
//                ((Number) row[5]).doubleValue()
//        )).toList();
//    }
//
//    // Helper untuk TopProductDto
//    private List<TopProductDto> mapToTopProductDto(List<Object[]> rows) {
//        return rows.stream().map(row -> new TopProductDto(
//                ((Number) row[0]).longValue(),
//                (String) row[1],
//                ((Number) row[2]).longValue(),
//                ((Number) row[3]).longValue(),
//                ((Number) row[4]).doubleValue(),
//                null // category bisa ditambah kalau mau
//        )).toList();
//    }
//}

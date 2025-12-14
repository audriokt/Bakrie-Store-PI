package com.audrio.backendbakrie.service.impl;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import com.audrio.backendbakrie.io.ProductResponse;
import com.audrio.backendbakrie.io.admin.TopSellingProductsResponse;
import com.audrio.backendbakrie.repository.CustomerRepository;
import com.audrio.backendbakrie.repository.OrderRepository;
import com.audrio.backendbakrie.repository.ProductRepository;
import org.springframework.stereotype.Service;
import com.audrio.backendbakrie.io.admin.DashboardSummaryResponse;
import com.audrio.backendbakrie.service.DashboardService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {
    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;

    // DashboardServiceImpl.java
    @Override
    public DashboardSummaryResponse getDashboardSummary() {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.atTime(LocalTime.MAX);

        long totalCustomers = customerRepository.count();
        long totalProducts = productRepository.count();

        BigDecimal todayRevenue = orderRepository.sumTotalAmountByStatusAndDateRange(
                "PAID", startOfDay, endOfDay).orElse(BigDecimal.ZERO);

        long todayOrders = orderRepository.countByOrderDateBetween(startOfDay, endOfDay);
        long totalOrders = orderRepository.count();
        long pendingOrders = orderRepository.countByOrderStatus("PENDING");
        long shippedOrders = orderRepository.countByOrderStatus("SHIPPED");

        // Ambil top 10 produk terlaris (hanya PENDING & PAID)
        List<TopSellingProductsResponse> topProducts = orderRepository.findTop10SellingProducts();

        return DashboardSummaryResponse.builder()
                .totalCustomers(totalCustomers)
                .totalProducts(totalProducts)
                .totalOrders(totalOrders)
                .todayOrders(todayOrders)
                .todayRevenue(todayRevenue.doubleValue())
                .pendingOrders(pendingOrders)
                .shippedOrders(shippedOrders)
                .topTenProductsSell(topProducts)                 // sekarang tipe sudah cocok
                .build();
    }
}

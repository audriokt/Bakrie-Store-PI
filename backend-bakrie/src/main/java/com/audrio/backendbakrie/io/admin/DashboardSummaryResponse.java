package com.audrio.backendbakrie.io.admin;

import com.audrio.backendbakrie.io.admin.TopSellingProductsResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardSummaryResponse {
    private long totalCustomers;
    private long totalProducts;
    private long totalOrders;
    private long todayOrders;
    private double todayRevenue;
    private long pendingOrders;
    private long shippedOrders;

    // Ubah dari ProductResponse menjadi yang baru
    private List<TopSellingProductsResponse> topTenProductsSell;
}
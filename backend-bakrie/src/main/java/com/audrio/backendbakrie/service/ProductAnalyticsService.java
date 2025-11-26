package com.audrio.backendbakrie.service;

import com.audrio.backendbakrie.io.analytics.ProductCancellationDto;
import com.audrio.backendbakrie.io.analytics.ProductProfitDto;
import com.audrio.backendbakrie.io.analytics.TopProductDto;

import java.time.LocalDate;
import java.util.List;

public interface ProductAnalyticsService {
    List<TopProductDto> getTopProductsByQuantity(LocalDate from, LocalDate to, int limit);
    List<TopProductDto> getTopProductsByRevenue(LocalDate from, LocalDate to, int limit);
    List<ProductCancellationDto> getProductsWithHighestCancellationRate(int limit);
    List<ProductProfitDto> getProfitReport(LocalDate from, LocalDate to, int limit);
}

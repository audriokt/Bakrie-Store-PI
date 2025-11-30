//package com.audrio.backendbakrie.controller;
//
//import com.audrio.backendbakrie.io.analytics.ProductCancellationDto;
//import com.audrio.backendbakrie.io.analytics.ProductProfitDto;
//import com.audrio.backendbakrie.io.analytics.TopProductDto;
//import com.audrio.backendbakrie.service.ProductAnalyticsService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.time.LocalDate;
//import java.util.List;
//
////GET /api/v1/analytics/products/top-by-quantity?from=2025-01-01&to=2025-11-25&limit=10
////GET /api/v1/analytics/products/top-by-revenue
////GET /api/v1/analytics/products/cancellation-rate?limit=20
////GET /api/v1/analytics/products/profit?from=2025-01-01&to=2025-11-25
//
//@RestController
//@RequestMapping("/analytics/products")
//@RequiredArgsConstructor
//public class AnalyticsController {
//
//    private final ProductAnalyticsService analyticsService;
//
//    @GetMapping("/top-by-quantity")
//    public ResponseEntity<List<TopProductDto>> topByQuantity(
//            @RequestParam(defaultValue = "2025-01-01") LocalDate from,
//            @RequestParam(defaultValue = "2025-12-31") LocalDate to,
//            @RequestParam(defaultValue = "20") int limit) {
//        return ResponseEntity.ok(analyticsService.getTopProductsByQuantity(from, to, limit));
//    }
//
//    @GetMapping("/top-by-revenue")
//    public ResponseEntity<List<TopProductDto>> topByRevenue(
//            @RequestParam(defaultValue = "2025-01-01") LocalDate from,
//            @RequestParam(defaultValue = "2025-12-31") LocalDate to,
//            @RequestParam(defaultValue = "20") int limit) {
//        return ResponseEntity.ok(analyticsService.getTopProductsByRevenue(from, to, limit));
//    }
//
//    @GetMapping("/cancellation-rate")
//    public ResponseEntity<List<ProductCancellationDto>> cancellationRate(
//            @RequestParam(defaultValue = "15") int limit) {
//        return ResponseEntity.ok(analyticsService.getProductsWithHighestCancellationRate(limit));
//    }
//
//    @GetMapping("/profit")
//    public ResponseEntity<List<ProductProfitDto>> profitReport(
//            @RequestParam(defaultValue = "2025-01-01") LocalDate from,
//            @RequestParam(defaultValue = "2025-12-31") LocalDate to,
//            @RequestParam(defaultValue = "50") int limit) {
//        return ResponseEntity.ok(analyticsService.getProfitReport(from, to, limit));
//    }
//}

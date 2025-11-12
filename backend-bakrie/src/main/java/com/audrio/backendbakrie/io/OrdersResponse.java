package com.audrio.backendbakrie.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.audrio.backendbakrie.entity.Orders;
import com.audrio.backendbakrie.entity.OrderDetail;
import com.audrio.backendbakrie.entity.Products;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrdersResponse {

    private UUID id_order;
    private UUID id_customer;
    private UUID id_employee;
    private String deliverAddress;
    private String orderNumber;
    private Timestamp orderDate;
    private String orderStatus;
    private List<Item> items;

    /**
     * Konstruktor untuk membentuk response dari entity Orders.
     */
    public OrdersResponse(Orders order) {
        if (order == null) {
            throw new IllegalArgumentException("Orders tidak boleh null");
        }

        this.id_order = order.getId_order();
        this.id_customer = order.getCustomers() != null ? order.getCustomers().getIdCustomer() : null;
        this.id_employee = order.getEmployees() != null ? order.getEmployees().getIdEmployee() : null;
        this.deliverAddress = order.getDeliverAddress();
        this.orderNumber = order.getOrderNumber();
        this.orderDate = order.getOrderDate();
        this.orderStatus = order.getOrderStatus();

        // Mapping dari OrderDetail → Item
        this.items = new ArrayList<>();
        if (order.getOrderDetails() != null) {
            for (OrderDetail detail : order.getOrderDetails()) {
                Products product = detail.getProduct(); // ambil produk dari detail
                Item item = Item.builder()
                        .idProduct(product != null ? product.getIdProduct() : null)
                        .product_name(product != null ? product.getProduct_name() : null)
                        .product_price(product != null ? product.getProduct_price() : 0.0)
                        .quantity(detail.getQuantity())
                        .build();
                this.items.add(item);
            }
        }
    }

    /**
     * Inner class untuk item produk di dalam order.
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Item implements java.io.Serializable {
        private UUID idProduct;
        private String product_name;
        private double product_price;
        private int quantity;
    }
}

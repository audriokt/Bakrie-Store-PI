package com.audrio.backendbakrie.controller;

import com.audrio.backendbakrie.io.OrdersResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@Slf4j
public class OrderController {

    @GetMapping("/customer/myorders")
    @ResponseStatus(HttpStatus.OK)
    public OrdersResponse getCustomerOrders(){
        log.info("GET /customer/myorders");
        return null;
    }

    @GetMapping("/employee/orders/fetchOrders")
    @ResponseStatus(HttpStatus.OK)
    public OrdersResponse fetchAllOrders(){
        log.info("GET /employee/orders/fetchOrders");
        return null;
    }

    @GetMapping("/employee/orders/fetchOrder/{orderId}")
    @ResponseStatus(HttpStatus.OK)
    public OrdersResponse fetchOrderById(@PathVariable String orderId){
        log.info("GET /employee/orders/fetchOrder/{}", orderId);
        return null;
    }

    @GetMapping("/employee/orders/fetchOrder/customer/{customerId}")
    @ResponseStatus(HttpStatus.OK)
    public OrdersResponse fetchOrderByCustomerId(@PathVariable String customerId){
        log.info("GET /employee/orders/fetchOrder/customer/{}", customerId);
        return null;
    }

    @PostMapping("/customer/orders/add")
    @ResponseStatus(HttpStatus.CREATED)
    public OrdersResponse addOrder(){
        log.info("POST /customer/orders/add");
        return null;
    }

    @PutMapping("/employee/orders/update")
    @ResponseStatus(HttpStatus.OK)
    public OrdersResponse updateOrder(){
        log.info("PUT /employee/orders/update");
        return null;
    }

    @DeleteMapping("/employee/orders/delete/{orderId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOrder(@PathVariable String orderId){
        try{
            log.info("DELETE /employee/orders/delete/{}", orderId);

        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}

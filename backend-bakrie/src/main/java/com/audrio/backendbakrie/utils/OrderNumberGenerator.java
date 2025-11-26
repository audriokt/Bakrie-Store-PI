package com.audrio.backendbakrie.utils;

import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class OrderNumberGenerator {
    private final AtomicInteger counter = new AtomicInteger(1);

    public String generate() {
        String date = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        int seq = counter.getAndIncrement();
        return "ORD-" + date + "-" + String.format("%04d", seq);
    }
}

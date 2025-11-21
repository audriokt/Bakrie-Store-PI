package com.audrio.backendbakrie.io;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import java.util.UUID;
import java.util.List;

@Builder
@Data

public class OrdersRequest {

    @NotNull(message = "ID customer wajib diisi")
    private UUID customerId;

    @NotBlank(message = "Alamat pengiriman tidak boleh kosong")
    private String deliverAddress;

    @NotNull(message = "Detail pesanan wajib diisi")
    private List<OrderDetailRequest> orderDetails;

}

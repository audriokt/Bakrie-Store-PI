package com.audrio.backendbakrie.io.analytics;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductCancellationDto {
    private Long productId;
    private String productName;
    private Long orderedQty;
    private Long cancelledQty;
    private Double cancellationRate; // dalam persen
}

package com.audrio.backendbakrie.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "transactions")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Transactions {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_transaction")
    private UUID idTransaction;

    @OneToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Orders orders;

    @NotNull
    @Size(max = 100)
    @Column(name = "payment_token")
    private String paymentToken;

    @NotNull
    @Size(max = 30)
    @Column(name = "payment_method")
    private String paymentMethod;

    @NotNull
    @Size(max = 30)
    @Column(name = "payment_status")
    private String paymentStatus;

    @NotNull
    @CreationTimestamp
    @Column(name = "payment_time")
    private LocalDateTime paymentTime;

    @NotNull
    @Column(name = "total_amount", precision = 10, scale = 2)
    private BigDecimal totalAmount;
}
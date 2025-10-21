package com.audrio.backendbakrie.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "customers")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Customers {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private UUID idCustomer;

    @NotNull
    @Size(max = 100, min = 15, message = "Email tidak boleh kurang dari 15 karakter dan tidak boleh lebih dari 100")
    @Column(name = "email", unique = true)
    private String email;

    @NotNull
    @Size(max = 30, min = 5, message = "Username tidak boleh kurang dari 5 karakter atau/dan tidak boleh lebih dari 30 karakter")
    @Column(name = "username")
    private String  username;

    @NotNull
    @Size(max = 300, min = 20, message = "Alamat tidak boleh kurang dari 20 karakter")
    @Column(name = "address")
    private String address;

    @NotNull
    @Size(max = 13, min = 11, message = "nomor telepon minimal 11 karakter dan maksimal 13 karakter")
    @Column(name = "phone_num",  unique = true)
    private String phone_num;

    @NotNull
    @Column(name = "password")
    private String password;

    @Column(name="image_url")
    private String img_url;

    @Column(name = "verification_token", unique = true)
    private String verificationToken;

    @Column(name = "reset_token")
    private String reset_token;

    @Column(name = "is_verified")
    private Boolean is_verified;

    @CreationTimestamp
    @Column(name="created_at", updatable = false)
    private Timestamp created_at;

    @UpdateTimestamp
    private Timestamp updated_at;

    @OneToMany(mappedBy = "customer")
    private List<Orders> orders;

}

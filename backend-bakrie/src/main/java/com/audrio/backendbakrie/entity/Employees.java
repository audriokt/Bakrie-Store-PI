package com.audrio.backendbakrie.entity;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

import com.audrio.backendbakrie.roles.Roles;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "employees")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Employees implements UserDetails{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID idEmployee;

    @NotNull
    @Size(max = 100)
    @Column(name = "email", unique = true)
    private String email;

    @NotNull
    @Size(max = 200)
    @Column(name = "password", unique = true)
    private String password;

    @ManyToOne
    @JoinColumn(name = "roles_id", nullable = false)
    private Roles roles;

    @NotNull
    @Column(name = "img_url")
    private String img_url;

    @Column(name = "verification_token", unique = true)
    private String verificationToken;

    @Column(name = "reset_token")
    private String reset_token;

    @Column(name = "is_verified")
    private Boolean is_verified;

    @NotNull
    @CreationTimestamp
    @Column(updatable = false)
    private Timestamp created_at;

    @NotNull
    @UpdateTimestamp
    private Timestamp updated_at;

    @OneToMany(mappedBy = "customer")
    private List<Orders> orders;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getUsername() {
        return "";
    }
}
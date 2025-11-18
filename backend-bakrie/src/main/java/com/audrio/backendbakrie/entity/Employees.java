package com.audrio.backendbakrie.entity;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import com.audrio.backendbakrie.roles.Roles;
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
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "employees",
uniqueConstraints = @UniqueConstraint(columnNames = {"username", "email"}))
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Employees implements UserDetails{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID idEmployee;

    @NotNull
    @Column(unique = true, name = "username")
    private String username;

    @NotNull
    @Size(max = 100)
    @Column(unique = true,  name= "email")
    private String email;

    @NotNull
    @Size(max = 200, min = 8)
    @Column(name = "password")
    private String password;

    @Column(name = "img_url", nullable = true)
    private String img_url;

    @Column(name = "verification_token", unique = true)
    private String verificationToken;

    @Column(name = "reset_token")
    private String reset_token;

    @Column(name = "is_verified")
    private Boolean is_verified;

    @CreationTimestamp
    @Column(updatable = false)
    private Timestamp created_at;

    @UpdateTimestamp
    private Timestamp updated_at;

    @OneToMany(mappedBy = "employees")
    private List<Orders> orders;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String roleName = empRoles.getName();
        if (!roleName.startsWith("ROLE_")) {
            roleName = "ROLE_" + roleName;
        }
        return AuthorityUtils.createAuthorityList(roleName);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Employees)) return false;
        Employees employee = (Employees) o;
        return Objects.equals(idEmployee, employee.idEmployee);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idEmployee);
    }

    @Override
    public String getUsername() {
        return email;
    }

    @ManyToOne
    @JoinColumn(name = "roles_id", nullable = false)
    private Roles empRoles;

}
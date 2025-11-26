package com.audrio.backendbakrie.service.impl;

import com.audrio.backendbakrie.entity.Customers;
import com.audrio.backendbakrie.entity.Employees;
import com.audrio.backendbakrie.repository.CustomerRepository;
import com.audrio.backendbakrie.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final EmployeeRepository employeeRepository;
    private final CustomerRepository customerRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Employees employee = employeeRepository.findByEmail(email).orElse(null);
        if (employee != null) {
            return User.withUsername(employee.getEmail())  // ← selalu email
                    .password(employee.getPassword())
                    .authorities("ROLE_" + employee.getEmpRoles().getName().toUpperCase())
                    .build();
        }

        Customers customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        return User.withUsername(customer.getEmail())  // ← SELALU EMAIL, BUKAN username field!
                .password(customer.getPassword())
                .authorities("ROLE_" + customer.getCusRoles().getName().toUpperCase())
                .build();
    }
}

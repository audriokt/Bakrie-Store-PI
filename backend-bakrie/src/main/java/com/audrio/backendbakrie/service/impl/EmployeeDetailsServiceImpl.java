package com.audrio.backendbakrie.service.impl;

import com.audrio.backendbakrie.entity.Employees;
import com.audrio.backendbakrie.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@RequiredArgsConstructor
@Service
public class EmployeeDetailsServiceImpl implements UserDetailsService {

    private final EmployeeRepository employeeRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Employees employee = employeeRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User with email: "+email+" not found"));

        return new User(
                employee.getEmail(),
                employee.getPassword(),
                List.of(new SimpleGrantedAuthority(employee.getRoles().getRole()))

        );
    }
}

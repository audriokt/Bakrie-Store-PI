package com.audrio.backendbakrie.service.impl;

import com.audrio.backendbakrie.entity.Employees;
import com.audrio.backendbakrie.io.*;
import com.audrio.backendbakrie.repository.EmployeeRepository;
import com.audrio.backendbakrie.repository.RolesRepository;
import com.audrio.backendbakrie.roles.Roles;
import com.audrio.backendbakrie.service.CloudinaryService;
import com.audrio.backendbakrie.service.EmailService;
import com.audrio.backendbakrie.service.EmployeeService;
import com.audrio.backendbakrie.utils.Exceptions.*;
import com.audrio.backendbakrie.utils.JwtUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/*
*
* */
@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final CloudinaryService cloudinaryService;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final RolesRepository rolesRepository;
    private final AuthenticationManager authenticationManager;

    /**
     * Menyimpan data karyawan baru ke database.
     * Jika email sudah terdaftar namun belum diverifikasi, maka token verifikasi akan dikirim ulang.
     * Jika email belum terdaftar, maka data baru akan disimpan dan token verifikasi dikirim.
     *
     * @param request objek permintaan berisi data karyawan
     * @param file file gambar profil karyawan
     * @return EmployeeResponse berisi data karyawan yang disimpan
     * @throws UserAlreadyVerifiedException jika email sudah diverifikasi sebelumnya
     */
    @Override
    public EmployeeResponse add(EmployeeRequest request, MultipartFile file) {
        validateRequest(request, file);

        Optional<Employees> optionalEmployee = employeeRepository.findByEmail(request.getEmail().trim());
        HashMap<String, Object> claims = new HashMap<>();
        claims.put("purpose", "email-verification");
        String token = jwtUtils.generateToken(claims, request.getEmail().trim());

        if (optionalEmployee.isPresent()) {
            Employees existing = optionalEmployee.get();
            if (existing.getIs_verified()) {
                throw new UserAlreadyVerifiedException("Email sudah terverifikasi");
            }
            existing.setVerificationToken(token);
            employeeRepository.save(existing);
            emailService.sendEmpVerificationEmail(existing.getEmail(), token);
            return convertToResponse(existing);
        }

        // Upload file
        if (file.getSize() > 5 * 1024 * 1024) {
            throw new ImageSizeUnaproriateException("File maksimal 5MB");
        }
        if (!file.getContentType().startsWith("image/")) {
            throw new ImageInvalidExtentionException("Hanya file gambar");
        }

        String idImg = UUID.randomUUID().toString();
        String imgUrl = cloudinaryService.uploadFile(file, idImg).getUrl();

        Employees newEmployee = convertToEntity(request);
        newEmployee.setPassword(passwordEncoder.encode(request.getPassword()));
        newEmployee.setImg_url(imgUrl);
        newEmployee.setVerificationToken(token);
        newEmployee.setIs_verified(false);

        employeeRepository.save(newEmployee);
        emailService.sendEmpVerificationEmail(newEmployee.getEmail(), token);

        return convertToResponse(newEmployee);
    }

    /**
     * Menghapus data karyawan berdasarkan ID.
     *
     * @param id UUID dari karyawan yang ingin dihapus
     * @throws EmployeeNotFoundException jika karyawan dengan ID tersebut tidak ditemukan
     */
    @Override
    @Transactional
    public EmployeeResponse update(UUID id, EmployeeRequest request) {
        Employees employee = employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee not found: " + id));

        employee.setUsername(request.getUsername().trim());
        employee.setEmail(request.getEmail().trim());
        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            employee.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        if (request.getImg_url() != null) {
            employee.setImg_url(request.getImg_url());
        }

        employeeRepository.save(employee);
        return convertToResponse(employee);
    }

    /**
     * Menghapus data karyawan berdasarkan ID.
     *
     * @param id UUID dari karyawan yang ingin dihapus
     * @throws EmployeeNotFoundException jika karyawan dengan ID tersebut tidak ditemukan
     */
    @Override
    public void delete(UUID id) {
        Employees existingCustomer = employeeRepository.findByIdEmployee(id)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee with id: " + id + " not found"));
        try{
            cloudinaryService.deleteFile(existingCustomer.getImg_url());
        } catch (Exception e){
            System.out.printf("Error deleting image: %s".formatted(e.getMessage()));
        }
        employeeRepository.delete(existingCustomer);
    }

    /**
     * Mengambil seluruh data karyawan dari database.
     *
     * @return List<EmployeeResponse> daftar semua karyawan dalam bentuk response
     */
    @Override
    public List<EmployeeResponse> getAll() {
        List<Employees> employees = employeeRepository.findAll();
        return employees.stream()
                .map(this::convertToResponse)
                .toList();
    }

    /**
     * Memverifikasi email karyawan berdasarkan token JWT.
     * Token harus valid dan cocok dengan token yang tersimpan di database.
     *
     * @param token token verifikasi yang dikirim melalui email
     * @return ResponseEntity dengan pesan sukses jika verifikasi berhasil
     * @throws EmailShouldntBlankException jika token kosong
     * @throws EmployeeNotFoundException jika email tidak ditemukan
     * @throws VerificationTokenEmptyException jika token verifikasi kosong
     * @throws VerificationTokenNotValidException jika token tidak valid atau tidak cocok
     */
    @Override
    public ResponseEntity<String> verifyEmail(String token) {
        if (token == null || token.isBlank()) {
            throw new EmailShouldntBlankException("Token tidak boleh kosong");
        }

        String email = jwtUtils.extractEmail(token);
        if (email == null) {
            throw new VerificationTokenNotValidException("Token tidak valid");
        }

        String purpose = jwtUtils.extractClaim(token, claims -> claims.get("purpose", String.class));
        if (!"email-verification".equals(purpose)) {
            throw new VerificationTokenNotValidException("Token bukan untuk verifikasi email");
        }

        Employees employee = employeeRepository.findByEmail(email)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee tidak ditemukan"));

        if (!token.equals(employee.getVerificationToken())) {
            throw new VerificationTokenNotValidException("Token tidak cocok");
        }

        employee.setIs_verified(true);
        employee.setVerificationToken(null); // hapus token
        employeeRepository.save(employee);

        return ResponseEntity.ok("Email berhasil diverifikasi");
    }

    @Override
    public AuthResponse login(EmployeeAuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        Employees employee = employeeRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new EmployeeNotFoundException("Employee tidak ditemukan"));

        if (!employee.getIs_verified()) {
            throw new UserNotVerifiedException("Email belum diverifikasi");
        }

        HashMap<String, Object> claims = new HashMap<>();
        claims.put("role", employee.getEmpRoles().getName());
        claims.put("purpose", "access");

        String token = jwtUtils.generateToken(claims, employee.getEmail());
        return new AuthResponse(token);
    }

    /**
     * Mengubah objek Employees menjadi EmployeeResponse.
     *
     * @param newEmployee entitas Employees dari database
     * @return EmployeeResponse representasi data untuk dikirim ke client
     */
    private EmployeeResponse convertToResponse(Employees newEmployee) {
        return EmployeeResponse.builder()
                .employee_id(newEmployee.getIdEmployee().toString())
                .username(newEmployee.getUsername())
                .email(newEmployee.getEmail())
                .img_url(newEmployee.getImg_url())
                .created_at(newEmployee.getCreated_at())
                .updated_at(newEmployee.getUpdated_at())
                .build();
    }

    /**
     * Mengubah objek EmployeeRequest menjadi entitas Employees.
     * Digunakan saat menyimpan data baru.
     *
     * @param request objek permintaan dari client
     * @return entitas Employees yang siap disimpan
     */
    private Employees convertToEntity(EmployeeRequest request) {
        Roles role = rolesRepository.findByName("ROLE_CASHIER")
                .orElseThrow(() -> new  RoleNotFoundException("CASHIER Role not found"));
        return Employees.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .img_url(request.getImg_url())
                .empRoles(role)
                .build();
    }

    /**
     * Melakukan validasi terhadap data permintaan karyawan yang dikirim dari client.
     * Validasi mencakup:
     * Memastikan objek request tidak null
     * Memastikan format email sesuai standar RFC sederhana
     * Memastikan password tidak null dan memiliki minimal 8 karakter
     * Memastikan username tidak kosong, memiliki panjang antara 8–32 karakter, dan hanya terdiri dari huruf tanpa angka atau simbol
     * Jika salah satu validasi gagal, method ini akan melempar exception yang sesuai.
     *
     * @param request objek permintaan karyawan yang berisi data email, password, dan username
     * @throws RequestShouldntEmptyException jika objek request bernilai null
     * @throws EmailNotValidException jika format email tidak sesuai
     * @throws PasswordMinLengthException jika password kurang dari 8 karakter
     * @throws UsernameShouldntBlankException jika username kosong atau hanya spasi
     * @throws UsernameContainNumberOrDigitsException jika username mengandung angka atau simbol
     */
    private void validateRequest(EmployeeRequest request, MultipartFile file) {
        if (request == null) {
            throw new RequestShouldntEmptyException("Request tidak boleh null");
        }

        //field Email
        if (request.getEmail() == null || !request.getEmail().matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
            throw new EmailNotValidException("Email tidak valid");
        }

        //field Password
        if (request.getPassword() == null || request.getPassword().length() < 8) {
            throw new PasswordMinLengthException("Password harus minimal 8 karakter");
        }

        //field Username
        String username = request.getUsername();
        if (username == null || username.trim().isEmpty()) {
            throw new UsernameShouldntBlankException("Nama tidak boleh kosong");
        }
        if (username.length() < 8 || username.length() > 32) {
            throw new UsernameInvalidLengthException("Username harus 8-32 karakter");
        }

        if (username.matches(".*\\d.*") || username.matches(".*[^a-zA-Z0-9].*")) {
            throw new UsernameContainNumberOrDigitsException("Username hanya boleh mengandung huruf");
        }

        //field file
        if(file.isEmpty()){
            throw new ImageFileEmptyException("File tidak boleh kosong");
        }
    }
}

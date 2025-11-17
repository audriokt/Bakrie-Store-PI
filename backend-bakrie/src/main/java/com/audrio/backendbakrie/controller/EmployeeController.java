package com.audrio.backendbakrie.controller;

import com.audrio.backendbakrie.io.EmployeeRequest;
import com.audrio.backendbakrie.io.EmployeeResponse;
import com.audrio.backendbakrie.service.EmployeeService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

/*
 * Only Admin responsible for create,update, delete employee account
 *
 */
@Slf4j
@RestController
@AllArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    /*
    * Controller for create employee account,
    * called add() from employeeServiceImpl() class in directory "service/impl"
    */
    @PostMapping(value = "/admin/auth/register/employee", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public EmployeeResponse createEmployee(@Valid @RequestBody EmployeeRequest employeeRequest){
            return employeeService.add(employeeRequest);
    }

    /*
    * controller for get all employee's data from database.
    * called getAll() from employeeServiceImpl class in directory "service/impl"
    * */
    @GetMapping("/admin/employees/fetchEmployees")
    @ResponseStatus(HttpStatus.OK)
    public List<EmployeeResponse> fetchAllEmployees() {
        return employeeService.getAll();
    }

    /*
    * controller get employee's data based on id from database
    * accept id parameter in url, only can get 1 employee's data at a time.
    * called update() from employeeServiceImpl class in directory "service/impl"
    */
    @PutMapping("/admin/employee/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public EmployeeResponse updateEmployee(@Valid @PathVariable String id,
                                           @RequestPart("employee") String employeeString,
                                           @RequestPart("file") MultipartFile file) {
        ObjectMapper mapper = new ObjectMapper();
        try{
            EmployeeRequest request = mapper.readValue(employeeString, EmployeeRequest.class);
            return employeeService.update(UUID.fromString(id), request, file);
        }catch (JsonProcessingException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Exception occur while parsing json to employee request"+e.getMessage());
        }
    }

    /*
    * controller for delete employee,
    * called delete() from employeeServiceImpl() class in directory "service/impl"
    * accept id parameter in url, only can delete one employee at a time
    */
    @DeleteMapping("/admin/employee/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCustomer(@Valid @PathVariable String id) {
        try {
            employeeService.delete(UUID.fromString(id));
        } catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}

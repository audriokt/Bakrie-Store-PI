package com.audrio.backendbakrie.controller;

import com.audrio.backendbakrie.io.EmployeeRequest;
import com.audrio.backendbakrie.io.EmployeeResponse;
import com.audrio.backendbakrie.service.EmployeeService;
import com.audrio.backendbakrie.utils.Exceptions.ImageFileEmptyException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
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
    @PostMapping("/admin/register/employee")
    @ResponseStatus(HttpStatus.CREATED)
    public EmployeeResponse createEmployee(@RequestPart("employee") String employeeString,
                                           @RequestPart("file") MultipartFile file){
        ObjectMapper mapper = new ObjectMapper();
        EmployeeRequest request = null;
        try{
            request = mapper.readValue(employeeString,EmployeeRequest.class);
            return employeeService.add(request, file);
        }catch(JsonProcessingException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Exception occur while parsing json to customer request"+e.getMessage());
        }
    }

    /*
    * controller for get all employee's data from database.
    * called getAll() from employeeServiceImpl class in directory "service/impl"
    * */
    @GetMapping("/admin/fetchEmployee")
    @ResponseStatus(HttpStatus.OK)
    public List<EmployeeResponse> fetchAllEmployees() {
        return employeeService.getAll();
    }

    /*
    * controller get employee's data based on id from database
    * accept id parameter in url, only can get 1 employee's data at a time.
    * called update() from employeeServiceImpl class in directory "service/impl"
    */
    @PutMapping("/admin/update/employee/{id}")
    @ResponseStatus(HttpStatus.OK)
    public EmployeeResponse updateEmployee(@PathVariable String id, @RequestBody EmployeeRequest employeeRequest) {
        return employeeService.update(UUID.fromString(id), employeeRequest);
    }

    /*
    * controller for delete employee,
    * called delete() from employeeServiceImpl() class in directory "service/impl"
    * accept id parameter in url, only can delete one employee at a time
    */
    @DeleteMapping("/admin/delete/employee/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCustomer(@PathVariable String id) {
        try {
            employeeService.delete(UUID.fromString(id));
        } catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}

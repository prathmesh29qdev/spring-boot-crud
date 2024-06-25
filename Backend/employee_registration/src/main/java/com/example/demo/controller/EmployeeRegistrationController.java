package com.example.demo.controller;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entity.Employee;
import com.example.demo.service.EmployeeRegistrationService;

/**
 * <h3>Emlpoyee Registration Controller</h3>
 * <p>
 * This class is a controller handling all the requests from the frontend to connect with the API endpoints.
 * </p>
 * 
 * @author Prathmesh
 */
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class EmployeeRegistrationController {

	@Autowired
	private EmployeeRegistrationService employeeRegistrationService;

	@GetMapping("/employees/{pageNumber}")
	public List<Employee> getSpecificEmployees(@PathVariable Integer pageNumber) {
		if (pageNumber != -1) {
			return  employeeRegistrationService.findSpecificEmployees(pageNumber);
		} else {
			return employeeRegistrationService.findAll();
		}
	}

	@PostMapping("/employees")
	public Employee saveEmployee(@RequestBody Employee employee) {
		return employeeRegistrationService.save(employee);
	}

	@GetMapping("/employee/{id}")
	public Employee getById(@PathVariable Integer id) {
		return employeeRegistrationService.getEmployeeByid(id);
	}

	@PutMapping("/employee/{id}")
	public Employee updateEmployee(@PathVariable Integer id, @RequestBody Employee updatedEmployee) {
		return employeeRegistrationService.updateEmployeeById(id, updatedEmployee);
	}

	@DeleteMapping("/employee/delete/{id}")
	public void deleteEmployee(@PathVariable Integer id) {
		employeeRegistrationService.deleteEmployeeById(id);
	}

}
package com.example.demo.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.example.demo.entity.Employee;

/**
 * <h3>Employee Registration Service</h3>
 * <p>
 * This interface is the service layer between the controller and repository.
 * </p>
 * 
 * @author Prathmesh
 */
@Service
public interface EmployeeRegistrationService {

	List<Employee> findAll();

	Employee save(Employee employee);

	Employee getEmployeeByid(int id);

	Employee updateEmployeeById(Integer id, Employee employee);

	void deleteEmployeeById(int id);

	List<Employee> findSpecificEmployees(Integer pageNumber);

	boolean ifExists(Employee employee);

}
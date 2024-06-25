package com.example.demo.service.impl;

import java.io.Console;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.entity.Employee;
import com.example.demo.repository.EmployeeRegistratonRepository;
import com.example.demo.service.EmployeeRegistrationService;

/**
 * <h3>Employee Registration Service Impl</h3>
 * <p>
 * This class is the implementation of the Employee.Registration service.
 * </p>
 * 
 * @author Prathmesh
 */
@Service
public class EmployeeRegistrationServiceImpl implements EmployeeRegistrationService {

	@Autowired
	private EmployeeRegistratonRepository employeeRegistratonRepository;

	public List<Employee> findAll() {
		List<Employee> employees = employeeRegistratonRepository.findAll(); 
		return employees;
	}

	public List<Employee> findSpecificEmployees(Integer pageNumber) {
		List<Employee> employees = employeeRegistratonRepository.findAll();
		List<Employee> specificEmployees;
		if (pageNumber == 0) {
			if ((pageNumber + 5) > employees.size()) {
				specificEmployees = employees.subList(pageNumber, employees.size());
			} else {
			specificEmployees = employees.subList(pageNumber, pageNumber + 5);
			}
		} else {
			pageNumber = pageNumber * 5;
			if ((pageNumber + 5) > employees.size()) {
				specificEmployees = employees.subList(pageNumber, employees.size());
			} else {
				specificEmployees = employees.subList(pageNumber, pageNumber + 5);
			}
		}
		return specificEmployees;
	}

	public Employee save(Employee employee) {
		employeeRegistratonRepository.save(employee);
		return employee;
	}

	public Employee getEmployeeByid(int id) {
		Optional<Employee> employee = employeeRegistratonRepository.findById(id);
		Employee employeeToBeReturned = employee.get();
		return employeeToBeReturned;
	}

	@Override
	public Employee updateEmployeeById(Integer id, Employee updatedEmployee) {
		Optional<Employee> getEmployee = employeeRegistratonRepository.findById(id);
		Employee employee = getEmployee.get();
		employee.setFirstName(updatedEmployee.getFirstName());
		employee.setLastName(updatedEmployee.getLastName());
		employee.setAddress1(updatedEmployee.getAddress1());
		employee.setAddress2(updatedEmployee.getAddress2());
		employee.setAge(updatedEmployee.getAge());
		employee.setDateOfBirth(updatedEmployee.getDateOfBirth());
		employee.setEmail(updatedEmployee.getEmail());
		employee.setGender(updatedEmployee.getGender());
		employee.setMobilePrefix(updatedEmployee.getMobilePrefix());
		employee.setMobile(updatedEmployee.getMobile());
		Employee employeeToBeReturned = employeeRegistratonRepository.save(employee);
		return employeeToBeReturned;
	}

	@Override
	public void deleteEmployeeById(int id) {
		Optional<Employee> employee = employeeRegistratonRepository.findById(id);
		Employee employeeToBeDeleted = employee.get();
		employeeRegistratonRepository.delete(employeeToBeDeleted);
	}

	@Override
	public boolean ifExists(Employee employee) {
		Boolean duplicate = false;
		List<Employee> employees = employeeRegistratonRepository.findAll();
		for(Employee data : employees) {
			System.out.println(data.getEmail().toLowerCase().trim().toString() + " " + employee.getEmail().toLowerCase().trim().toString());
			String email1 = data.getEmail().toLowerCase().trim().toString();
			String email2 = employee.getEmail().toLowerCase().trim().toString();
			System.out.println(email1 + " " + email2);
			if (email1.equals(email2)) {
				duplicate = true;
				break;
			}
		}
		return duplicate;
	}

}
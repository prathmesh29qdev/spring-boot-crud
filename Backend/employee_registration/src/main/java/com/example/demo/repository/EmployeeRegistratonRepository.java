package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Employee;

/**
 * <h3>Employee Registration Entity</h3>
 * <p>
 * This class is a repository to connect with the database for any request.
 * </p>
 * 
 * @author Prathmesh
 */
@Repository
public interface EmployeeRegistratonRepository extends JpaRepository<Employee, Integer> {

}
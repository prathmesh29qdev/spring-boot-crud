package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Employee;
import com.example.demo.entity.MobilePrefix;

/**
 * <h3>Mobile Prefix Service</h3>
 * <p>
 * This interface is the service layer between the controller and repository for mobile prefix.
 * </p>
 * 
 * @author Prathmesh
 */
public interface MobilePrefixService {

	List<MobilePrefix> getAllMobilePrefixes();

	MobilePrefix getMobilePrefixByid(Integer id);

}
package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Employee;
import com.example.demo.entity.MobilePrefix;
import com.example.demo.service.MobilePrefixService;

/**
 * <h3>Mobile Prefix Controller</h3>
 * <p>
 * This class is a controller for the mobile prefix data and has the API endpoints for the same.
 * </p>
 * 
 * @author Prathmesh
 */
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class MobilePrefixController {

	@Autowired
	private MobilePrefixService mobilePrefixService;

	@GetMapping("/mobileprefix")
	public List<MobilePrefix> getAllMobilePrefixes(){
		return mobilePrefixService.getAllMobilePrefixes();
	}

	@GetMapping("/mobileprefix/{id}")
	public MobilePrefix getById(@PathVariable Integer id) {
		return mobilePrefixService.getMobilePrefixByid(id);
	}

}
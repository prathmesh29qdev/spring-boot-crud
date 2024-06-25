package com.example.demo.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Employee;
import com.example.demo.entity.MobilePrefix;
import com.example.demo.repository.MobilePrefixRepository;
import com.example.demo.service.MobilePrefixService;

/**
 * <h3>Mobile Prefix Service Impl</h3>
 * <p>
 * This class is the implementation of the Mobile Prefix service.
 * </p>
 * 
 * @author Prathmesh
 */
@Service
public class MobilePrefixServiceImpl implements MobilePrefixService{

	@Autowired
	private MobilePrefixRepository mobilePrefixRepository;;

	@Override
	public List<MobilePrefix> getAllMobilePrefixes() {
		List<MobilePrefix> mobilePrefix = mobilePrefixRepository.findAll(); 
		return mobilePrefix;
	}

	public MobilePrefix getMobilePrefixByid(Integer id) {
		Optional<MobilePrefix> mobilePrefix = mobilePrefixRepository.findById(id);
		MobilePrefix mobilePrefixToBeReturned = mobilePrefix.get();
		return mobilePrefixToBeReturned;
	}

}
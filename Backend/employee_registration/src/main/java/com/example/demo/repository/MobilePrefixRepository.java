package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.entity.MobilePrefix;

/**
 * <h3>Mobile Prefix Entity</h3>
 * <p>
 * This class is a repository for mobile prefix table to connect with the database for any request.
 * </p>
 * 
 * @author Prathmesh
 */
@Repository
public interface MobilePrefixRepository extends JpaRepository<MobilePrefix, Integer> {

}
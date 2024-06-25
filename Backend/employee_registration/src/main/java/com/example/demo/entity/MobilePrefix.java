package com.example.demo.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

/**
 * <h3>Employee Entity</h3>
 * <p>
 * This class is having all the fields of Mobile Prefix and is considered as the entity.
 * </p>
 * 
 * @author Prathmesh
 */
@Getter
@Setter
@Entity
@Table
public class MobilePrefix {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@Column(name = "country_code")
	private String countryCode;

	@Column(name = "country_name")
	private String countryName;

}
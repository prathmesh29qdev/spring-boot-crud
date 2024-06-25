package com.example.demo.entity;

import java.sql.Date;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;

/**
 * <h3>Employee Entity</h3>
 * <p>
 * This class is having all the fields of Employee and is considered as the entity.
 * </p>
 * 
 * @author Prathmesh
 */
@Getter
@Setter
@Entity
@Table
public class Employee {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@Column(name = "first_name", nullable = false)
	private String firstName;

	@Column(name = "last_name", nullable = false)
	private String lastName;

	@Column(name = "date_of_birth", nullable = false)
	private Date dateOfBirth;

	@Column(name = "address1", nullable = false)
	private String address1;

	@Column(name = "address2")
	private String address2;

	@Column(name = "age", nullable = false)
	private int age;

	@Column(name = "gender", nullable = false)
	private int gender;

	@Column(name = "email", unique = true, nullable = false)
	private String email;

	@Column(name = "mobile", nullable = false)
	private String mobile;

	@JoinColumn(name = "mobilePrefix_id")
	@ManyToOne(fetch = FetchType.EAGER)
	private MobilePrefix mobilePrefix;

}
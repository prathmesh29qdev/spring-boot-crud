import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Employee } from '../Employee';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MobilePrefix } from '../MobilePrefix';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { DatePipe, NgIfContext } from '@angular/common';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent implements OnInit {

  id: number;
  employee: Employee = new Employee;
  mobilePrefixes: MobilePrefix[];
  mobilePrefix: MobilePrefix = new MobilePrefix;
  registerForm: FormGroup<any>;
  errorFirstNameMessage: any;
  errorLastNameMessage: any;
  errorAdressMessage: String;
  errorAgeMessage: String;
  errorGenderMessage: String;
  canSubmit: boolean = false;
  errorEmailMessage: String;
  errorMobileMessage: String;
  updateRecord: TemplateRef<NgIfContext<boolean>> | null;
  today: any;
  dateLimit: any;
  date: Date = new Date();
  calculateDate: Date = new Date();
  employees: Employee[];
  duplicate: boolean = false;
  duplicateEmail: boolean;
  male: any;
  female: any;
  checkTheBox: boolean;
  addressLength: number;
  remainingLength: number = 150;
  address2Length: number;
  remainingLength2: number = 150;
  submitError: string;
  mobileDuplicate: boolean;
  currentmobilePrefix: MobilePrefix;

  constructor(private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getEmployees();
    this.today = this.datePipe.transform(this.date, "yyyy-MM-dd");
    this.date.setFullYear(this.date.getFullYear() - 150);
    this.dateLimit = this.datePipe.transform(this.date, "yyyy-MM-dd");
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getMobilePrefix().subscribe(data => {
      this.mobilePrefixes = data;
    })

    if (this.id != undefined) {
      this.employeeService.getEmployeeById(this.id).subscribe(data => {
        this.employee = data;
        this.employeeService.getMobilePrefixById(this.employee.mobilePrefix.id).subscribe( data => {
          this.currentmobilePrefix = data;
        });
        if (this.employee.gender == "1") {
          this.checkTheBox = true;
          this.employee.gender = "1";
        } else {
          this.checkTheBox = false;
          this.employee.gender = "0";
        }
        this.mobilePrefix = this.employee.mobilePrefix;
        this.address2Length = this.employee.address2.length;
        this.remainingLength2 = 150 - this.address2Length;
        this.addressLength = this.employee.address1.length;
        this.remainingLength = 150 - this.addressLength;
      }, error => console.log(error));
    }
  }

  getEmployees() {
    this.employeeService.getEmployeesList(-1).subscribe(data => {
      this.employees = data;
    });
  }

  getMobilePrefixById() {
    this.employeeService.getMobilePrefixById(this.mobilePrefix.id).subscribe( data => {
      this.currentmobilePrefix = data;
      this.validateName('mobile');
    });
  }

  saveEmployee() {
    this.mobileDuplicate = false;
    this.duplicateEmail = false;
    this.submitError = "";
    this.enableSubmit();
    this.getMobilePrefixById()
    if (this.canSubmit == false) {
      this.submitError = "*Something went wrong"
    } else {
      this.getEmployees();
      this.employees.forEach(data => {
        let existingMobileNumber = data.mobilePrefix.countryCode.toString() + data.mobile.toString();
        let employeeMobileNumber = this.currentmobilePrefix.countryCode.toString() + this.employee.mobile.toString();
        if (existingMobileNumber == employeeMobileNumber && data.id != this.employee.id) {
          this.mobileDuplicate = true;
          return;
        }
      });
      if (this.mobileDuplicate) {
        this.setError("mobile", "Mobile number is duplicate");
        this.enableSubmit();
        this.canSubmit = false;
      }
      this.employees.forEach(data => {
        if (data.email.toLowerCase() == this.employee.email.trim().toLowerCase() && data.id != this.employee.id) {
          this.duplicateEmail = true;
          return;
        }
      });
      if (this.duplicateEmail) {
        this.setError("email", "Email Id is duplicate");
        this.enableSubmit();
        this.canSubmit = false;
      }
      if (!this.mobileDuplicate && !this.duplicateEmail) {
        this.mobilePrefix.id = Number(this.mobilePrefix.id);
        this.employee.mobilePrefix = this.mobilePrefix;
        this.employee.address1 = this.employee.address1.trim();
        if (this.employee.address2) {
          this.employee.address2 = this.employee.address2.trim();
        }
        this.employee.email = this.employee.email.trim().toLowerCase();
        this.employee.firstName = this.employee.firstName.trim();
        this.employee.lastName = this.employee.lastName.trim();
        if (this.employee.id == 0 || this.employee.id == undefined) {
          this.employeeService.createEmployee(this.employee).subscribe(data => {
            this.gotoEmployeesList();
          },
            error => console.log(error));
        }
        else {
          this.employeeService.updateEmployee(this.employee.id, this.employee).subscribe(data => {
            this.gotoEmployeesList();
          },
          error => { 
            console.log(error.error.message + "This is " + error)
            let errorDuplicate = error.error.message.toString();
            if(errorDuplicate.includes("employee.UK_fopic1oh5oln2khj8eat6ino0")) {
              this.errorEmailMessage = "Email Id is duplicate";
              this.enableSubmit();
              this.canSubmit = false;
            } 
            if (errorDuplicate.includes("employee.UK_4ts03wxs8exmr93khm543lt4x")) {
              this.errorMobileMessage = "Mobile number is duplicate"
              this.enableSubmit();
              this.canSubmit = false;
            }
          });
        }
      }
    }
  }

  gotoEmployeesList() {
    this.router.navigate(['/employees']);
  }

  enableSubmit() {
    this.submitError = "";
    if (this.employee.firstName && this.employee.lastName && this.employee.address1 && this.employee.age && this.employee.dateOfBirth
      && this.employee.email && this.employee.gender && this.employee.mobile && this.mobilePrefix.id && !this.errorFirstNameMessage && !this.errorLastNameMessage
      && !this.errorAdressMessage && !this.errorAgeMessage && !this.errorEmailMessage && !this.errorGenderMessage && !this.errorMobileMessage) {
      this.canSubmit = true;
    } else {
      this.canSubmit = false;
    }
  }

  handleChange(event: MatRadioChange) {
    this.submitError = "";
    this.employee.gender = event.value;
    this.enableSubmit();
  }

  validateData(event: KeyboardEvent) {
    event.preventDefault();
  }

  validateName(name: String) {
    this.submitError = "";
    this.duplicate = false;
    this.duplicateEmail = false;
    if (name == "firstName") {
      let firstname: string = this.employee.firstName.toString().trim();
      let regex: RegExp = /^[A-Za-z]+$/;
      if (!firstname) {
        this.setError("firstName", "First name should not be empty");
        this.canSubmit = false;
      } else if (firstname !== "" && firstname !== null) {
        if (!regex.test(firstname)) {
          this.setError("firstName", "Name should only have alphabets");
          this.canSubmit = false;
        } else {
          this.setError("firstName", "");
          this.enableSubmit();
        }
      }
    } else if (name == "lastName") {
      let lastname: string = this.employee.lastName.toString().trim();
      let regex: RegExp = /^[A-Za-z]+$/;
      if (!lastname) {
        this.setError("lastName", "Name should not be empty");
        this.canSubmit = false;
      } else if (lastname !== "" && lastname !== null) {
        if (!regex.test(lastname)) {
          this.setError("lastName", "Name should only have alphabets");
          this.canSubmit = false;
        } else {
          this.setError("lastName", "");
          this.enableSubmit();
        }
      }
    } else if (name == "address1") {
      this.addressLength = this.employee.address1.length;
      this.remainingLength = 150 - this.addressLength;
      let adress1: string = this.employee.address1.toString().trim();
      if (!adress1) {
        this.setError("address1", "Address should not be empty");
        this.canSubmit = false;
      } else {
        this.setError("address1", "");
        this.enableSubmit();
      }
    } else if (name == "age") {
      let age: string = this.employee.age.toString().trim();
      if (this.employee.age) {
        let ageNumber: number = this.employee.age;
        if (ageNumber && ageNumber > 150 || ageNumber < 18) {
          if (ageNumber < 18) {
            this.setError("age", "Age should be atleast 18");
            this.canSubmit = false;
          } else {
            this.setError("age", "Enter valid age");
            this.canSubmit = false;
          }
          this.canSubmit = false;
        } else {
          if (age != null) {
            let regex: RegExp = /^-?(0|[1-9]\d*)?$/;
            if (!regex.test(age)) {
              this.setError("age", "Age should a number");
              this.canSubmit = false;
            } else {
              this.setError("age", "");
              let employeeBirthDate: string = this.employee.dateOfBirth.toString();
              let employeeDate: Date = new Date(employeeBirthDate);
              let employeeAge = this.calculateDate.getFullYear() - employeeDate.getFullYear();
              if (employeeAge != this.employee.age && this.employee.dateOfBirth) {
                this.setError("age", "Age is not matching with birth date");
                this.canSubmit = false;
              } else {
                this.setError("age", "");
                this.enableSubmit();
              }
            }
          }
        }
      } else {
        this.setError("age", "Age should not be empty");
        this.canSubmit = false;
      }
    } else if (name == "gender") {
      let gender = this.employee.gender.toLowerCase().trim();
      if (!gender) {
        this.setError("gender", "Gender should not be empty");
        this.canSubmit = false;
      } else if (gender !== "" && gender !== null) {
        if (gender != "male" && gender != "female") {
          this.setError("gender", "Enter a valid gender");
          this.canSubmit = false;
        } else {
          this.setError("gender", "");
          this.enableSubmit();
        }
      }
    } else if (name == "email") {
      let emailExpression: RegExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      let email = this.employee.email.trim();
      this.getEmployees();
      this.employees.forEach(data => {
        if (data.email.toLowerCase() == this.employee.email.toLowerCase() && data.id != this.employee.id) {
          this.duplicateEmail = true;
          return;
        }
      });
      if (this.duplicateEmail) {
        this.setError("email", "Email Id is duplicate");
        this.enableSubmit();
        this.canSubmit = false;
      } else {
        if (!email) {
          this.setError("email", "Email should not be empty.");
          this.canSubmit = false;
        } else if (email !== "" && email !== null) {
          if (!emailExpression.test(email)) {
            this.setError("email", "Email Id is invalid");
            this.canSubmit = false;
          } else {
            this.setError("email", "");
            this.enableSubmit();
          }
        }
      }
    } else if (name == "mobile") {
      this.setError("mobile", "");
      let mobileExpression: RegExp = /^(0|91)?[0-9]\d{9}$/;
      let mobile = this.employee.mobile.toString();
      this.getEmployees();
      this.employees.forEach(data => {
        let existingMobileNumber = data.mobilePrefix.countryCode.toString() + data.mobile.toString();
        let employeeMobileNumber = this.currentmobilePrefix.countryCode.toString() + this.employee.mobile.toString();
        if (existingMobileNumber == employeeMobileNumber && data.id != this.employee.id) {
          this.duplicate = true;
          return;
        }
      });
      if (this.duplicate) {
        this.setError("mobile", "Mobile number is duplicate");
        this.enableSubmit();
        this.canSubmit = false;
      } else {
        if (!mobile) {
          this.setError("mobile", "Mobile number should not be empty");
          this.canSubmit = false;
        } else if (mobile != "" && mobile != null) {
          if (!mobileExpression.test(mobile)) {
            this.setError("mobile", "Mobile number should have only 10 digits");
            this.canSubmit = false;
          } else {
            this.setError("mobile", "");
            this.enableSubmit();
          }
        }
      }
    } else if (name == "dateOfBirth") {
      let employeeBirthDate: string = this.employee.dateOfBirth.toString();
      let employeeDate: Date = new Date(employeeBirthDate);
      let employeeAge = this.calculateDate.getFullYear() - employeeDate.getFullYear();
      if (employeeAge != this.employee.age && this.employee.age) {
        this.setError("age", "Age is not matching with birth date");
      } else {
        this.setError("age", "");
        this.enableSubmit();
      }
    } else if (name == "address2") {
      this.address2Length = this.employee.address2.length;
      this.remainingLength2 = 150 - this.address2Length;
    }
  }

  validCheckAlphabets(event: KeyboardEvent) {
    this.submitError = "";
    let regex: RegExp = /^[A-Za-z]+$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  }

  validCheckNumbers(event: KeyboardEvent) {
    this.submitError = "";
    let regex = /^(0|[1-9]\d*)+$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  }

  setError(name: string, error: String): void {
    if (name == "firstName") {
      this.errorFirstNameMessage = error;
    } else if (name == "lastName") {
      this.errorLastNameMessage = error;
    } else if (name == "address1") {
      this.errorAdressMessage = error;
    } else if (name == "age") {
      this.errorAgeMessage = error;
    } else if (name == "gender") {
      this.errorGenderMessage = error;
    } else if (name == "email") {
      this.errorEmailMessage = error;
    } else if (name == "mobile") {
      this.errorMobileMessage = error;
    }
  }
}

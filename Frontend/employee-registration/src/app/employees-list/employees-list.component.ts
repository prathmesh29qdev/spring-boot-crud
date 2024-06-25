import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../Employee';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteRecordComponent } from '../delete-record/delete-record.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.css'
})
export class EmployeesListComponent implements OnInit {

  private modalService = inject(NgbModal);
  numberOfRecords: any;
  partition: number;
  specificEmployees: Employee[];
  employees: Employee[];
  employeesToDisplay: Employee[];
  startIndex: number;

  constructor(private employeeService: EmployeeService,
    private router: Router,
    public dialog: MatDialog) { }


  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployeesList(-1).subscribe(data => {
      this.employees = data;
      this.numberOfRecords = this.employees.length;
      this.partition = Math.ceil(this.numberOfRecords / 5);
      this.showList(0);
    });
    console.log("THis is the data" + this.employees);

  }

  updateEmployee(id: number) {
    this.router.navigate(['addemployees', id]);
  }

  addEmployees() {
    this.router.navigate(['addemployees']);
  }

  openVerticallyCentered(content: TemplateRef<any>, id: number) {
    this.modalService.open(content, { centered: true });
  }
  display: any = undefined;
  showDialog(selected: any) {
    this.display = selected;
  }

  deleteEmployee(id: number, firstName: String, lastName: String): void {
    const dialogRef = this.dialog.open(DeleteRecordComponent, {
      width: '300px',
      data: { id: id, firstName: firstName, lastName: lastName },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log("This is the id we are getting " + id);
        this.employeeService.deleteEmployee(id).subscribe(data => {
          console.log(data);
          this.getEmployees();
        });
      }
    });
  }

  showList(count: number) {
    console.log("This is the count " + count);
    this.startIndex = count;
    if (count == 0) {
      this.startIndex = 1;
    } else {
      this.startIndex = this.startIndex * 5 + 1;
    }
    this.employeeService.getEmployeesList(count).subscribe(data => {
      this.specificEmployees = data;
      this.displayEmployees();
    }
    );
  }

  displayEmployees() {
    this.specificEmployees.forEach(data => {
      if (data.gender == "0") {
        data.gender = "Female"
      } else if (data.gender == "1") {
        data.gender = "Male";
      }
    });
    this.employeesToDisplay = this.specificEmployees;
  }

}

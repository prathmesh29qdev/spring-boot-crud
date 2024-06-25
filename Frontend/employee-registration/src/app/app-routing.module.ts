import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

const routes: Routes = [
  {path: 'employees', component: EmployeesListComponent},
  {path: 'addemployees', component: AddEmployeeComponent},
  {path: 'addemployees/:id', component: AddEmployeeComponent},
  {path: '', component: AddEmployeeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
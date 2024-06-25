import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './Employee';
import { Observable } from 'rxjs';
import { MobilePrefix } from './MobilePrefix';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) { }

  getEmployeesList(pageNumber: number): Observable<any> {
    return this.httpClient.get<Employee[]>(`${this.baseURL}` + "/employees/" + `${pageNumber}`);
  }

  createEmployee(employee: Employee): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}` + "/employees", employee);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseURL}` + "/employee/" + `${id}`);
  }

  updateEmployee(id: number, employee: Employee): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}` + "/employee/" + `${id}`, employee);
  }

  deleteEmployee(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}` + "/employee/delete/" + `${id}`);
  }

  getMobilePrefix(): Observable<any> {
    return this.httpClient.get(`${this.baseURL}` + "/mobileprefix");
  }

  getMobilePrefixById(id: number) : Observable<MobilePrefix> {
    return this.httpClient.get<MobilePrefix>(`${this.baseURL}` + "/mobileprefix/" + `${id}`)
  }

} 

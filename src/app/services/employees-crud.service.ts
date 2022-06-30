import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export class Employees {
  id: any;
  name: string;
  dob: string;
  telephone: string;
  email: string;
  salary: number;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeesCrudService {
  endpoint = 'http://localhost:3000/employees';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  // melihat semua data employees
  getAllEmployees(): Observable<Employees[]> {
    return this.httpClient.get<Employees[]>(this.endpoint).pipe(
      tap((employees) => console.log('All Employees are retrieved')),
      catchError(this.handlingError<Employees[]>('Get employees', []))
    );
  }

  // melihat 1 data employee
  getEmployeeById(id): Observable<Employees[]> {
    return this.httpClient.get<Employees[]>(this.endpoint + '/' + id).pipe(
      tap((_) => console.log(`Get employee with ID: ${id}`)),
      catchError(this.handlingError<Employees[]>(`Employee ID: ${id}`))
    );
  }

  // membuat data employee baru
  createEmployee(employee: Employees): Observable<any> {
    return this.httpClient
      .post<Employees>(
        this.endpoint,
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(
        catchError(
          this.handlingError<Employees>('Error while creating employee')
        )
      );
  }

  // mengubah data employee
  updateEmployee(id, employee: Employees): Observable<any> {
    return this.httpClient
      .put(this.endpoint + '/' + id, JSON.stringify(employee), this.httpOptions)
      .pipe(
        tap((_) => console.log(`Employee is updated with ID: ${id}`)),
        catchError(this.handlingError<Employees[]>(`Employee ID: ${id}`))
      );
  }

  // menghapus data employee
  deleteEmployee(id): Observable<Employees[]> {
    return this.httpClient
      .delete<Employees[]>(this.endpoint + '/' + id, this.httpOptions)
      .pipe(
        tap((_) => console.log(`Employee is deleted with ID: ${id}`)),
        catchError(this.handlingError<Employees[]>(`Employee ID: ${id}`))
      );
  }

  // handling error
  private handlingError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} is failed: ${error.message}`);
      return of(result as T);
    };
  }
}

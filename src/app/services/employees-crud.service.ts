import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export class Employees {
  _id: string;
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
  // membuat data employee baru
  // mengubah data employee
  // menghapus data employee

  // handling error
  private handlingError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} is failed: ${error.message}`);
      return of(result as T);
    };
  }
}

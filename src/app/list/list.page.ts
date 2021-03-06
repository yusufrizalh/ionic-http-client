import { Component, OnInit } from '@angular/core';
import { EmployeesCrudService } from '../services/employees-crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  Employees: any = [];

  constructor(
    private employeesCrudService: EmployeesCrudService,
    private router: Router
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.employeesCrudService.getAllEmployees().subscribe((res) => {
      this.Employees = res;
    });
  }

  removeEmployee(employee, i) {
    if (window.confirm('Are you sure to delete?')) {
      this.employeesCrudService.deleteEmployee(employee.id).subscribe(() => {
        console.log(`Employee is deleted!`);
        this.ionViewDidEnter();
      });
    }
  }
}

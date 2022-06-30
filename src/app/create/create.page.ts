import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmployeesCrudService } from '../services/employees-crud.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  employeeForm: FormGroup;

  constructor(
    private router: Router,
    private zone: NgZone,
    private empCrudService: EmployeesCrudService,
    public formBuilder: FormBuilder
  ) {
    this.employeeForm = this.formBuilder.group({
      name: [''],
      dob: [''],
      telephone: [''],
      email: [''],
      salary: [''],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (!this.employeeForm.valid) {
      return false;
    } else {
      this.empCrudService
        .createEmployee(this.employeeForm.value)
        .subscribe((res) => {
          this.zone.run(() => {
            this.employeeForm.reset();
            this.router.navigate(['/list']);
          });
        });
    }
  }
}

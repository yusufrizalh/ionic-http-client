import { Component, OnInit } from '@angular/core';
import { EmployeesCrudService } from '../services/employees-crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  updateEmpForm: FormGroup;
  id: any;

  constructor(
    private empCrudService: EmployeesCrudService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.retrievedEmployee(this.id);
    this.updateEmpForm = this.formBuilder.group({
      name: [''],
      dob: [''],
      telephone: [''],
      email: [''],
      salary: [''],
    });
  }

  retrievedEmployee(id) {
    this.empCrudService.getEmployeeById(id).subscribe((data) => {
      this.updateEmpForm.setValue({
        name: data['name'],
        dob: data['dob'],
        telephone: data['telephone'],
        email: data['email'],
        salary: data['salary'],
      });
    });
  }

  onUpdateSubmit() {
    if (!this.updateEmpForm.valid) {
      return false;
    } else {
      this.empCrudService
        .updateEmployee(this.id, this.updateEmpForm.value)
        .subscribe(() => {
          this.updateEmpForm.reset();
          this.router.navigate(['/list']);
        });
    }
  }
}

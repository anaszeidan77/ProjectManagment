import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Role } from '../../model/role';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.css'
})
export class RoleListComponent implements OnInit{
  roles : Role[] = [];
  roleForm: FormGroup;
  constructor(
     private roleServices : RoleService
    ,private router: Router,
     private fb: FormBuilder,
     private toastr:ToastrService){
      this.roleForm = this.fb.group({
        name: ['', Validators.required]
      });
    }
  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles(){
    this.roleServices.getAll().subscribe({
      next:(response)=> {
        
        this.roles = response;
      },
      error(err) {
        console.log(err);
      },
    })
  }
  onSubmit() {
    if (this.roleForm.valid) {
      const newRole: Role = {
        name: this.roleForm.value.name
      };

      this.roleServices.addRole(newRole).subscribe({
        next: (response) => {
          this.toastr.success("add role successeded","success")
          this.getAllRoles()

          this.router.navigate(['/roles']);
        },
        error: (error) => {
          this.toastr.error("error in add rols","error")

        }
      });
    } else {
      console.error('النموذج غير صالح');
    }
  }

  ManagePermissions(roleId : string):void{
    this.router.navigate(['/ManagePermissions',roleId]);
  }
  openMode(model : any){

  }
}

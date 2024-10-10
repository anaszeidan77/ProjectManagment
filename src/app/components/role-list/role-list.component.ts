import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Role } from '../../model/role';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../shared/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.css'
})
export class RoleListComponent implements OnInit{


  deleteRole(roleId: string) {    
    if(roleId!=null){

   
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.message = 'Are you sure you want to delete this Roles?';

    modalRef.result.then((result) => {
      if (result === 'delete') {
        this.roleServices.delete(roleId)
          .subscribe({
            next: (response) => {
     
              // console.log('team deleted successfully');
              const index = this.roles.findIndex(role => role.id === roleId);
            
              if (index !== -1) {
                this.roles.splice(index, 1);
              }
             // this.toastr.success('team deleted successfully', 'Success');
            },
            error: (error) => {
              
              console.error('Error deleting team:', error);
              //this.toastr.error('Error deleting team','Error')
            }
          });
      }
    });

  }else{
    console.log('role is null');
    
  }
  }


  roles : Role[] = [];
  roleForm: FormGroup;
  constructor(
     private roleServices : RoleService
    ,private router: Router,
    private modalService: NgbModal,
    private fb: FormBuilder){
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
          this.getAllRoles()
          this.router.navigate(['/roles']);
        },
        error: (error) => {
          console.error(error);

        }
      });
    } else {
      console.error('ivaldi Form');
    }
  }

  ManagePermissions(roleId : string):void{
    this.router.navigate(['/ManagePermissions',roleId]);
  }
  openMode(model : any){

  }
}

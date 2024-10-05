import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../model/user';
import { UserService } from '../../../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  users: User[] = [];
  selectedUser: any;
  roles: any[] = [];
  roleForm!: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAllUser();
    this.roleForm = this.fb.group({
      roles: this.fb.array([]),
    });
  }
  
  openRoleModal(user: User, modal: any) {
    this.selectedUser = user;
  
    // Clear previous roles
    this.selectedUserRoles.clear();
  
    this.userService.manageRole(user.id).subscribe((response) => {
      this.roles = response.roles;
  
      // Populate the FormArray with new controls
      this.roles.forEach((role) => {
        const control = this.fb.control(role.isSelected);
        this.selectedUserRoles.push(control);
      });
  
      // Open the modal after populating the FormArray
      this.modalService.open(modal);
    });
  }
  
  get selectedUserRoles(): FormArray {
    return this.roleForm.get('roles') as FormArray;
  }

  getAllUser() {
    this.userService.getAll().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  saveRoles() {
    if (!this.selectedUser) {
      alert('لم يتم تحديد مستخدم.');
      return;
    }

    const updatedRoles = this.selectedUserRoles.value.map((isSelected: boolean, index: number) => ({
      displayValue: this.roles[index].displayValue,
      isSelected: isSelected,
    }));

    this.userService.updateRoles(this.selectedUser, updatedRoles).subscribe({
      next: () => {
        alert('تم تحديث الأدوار بنجاح!');
        this.modalService.dismissAll();
        this.getAllUser(); // إعادة تحميل قائمة المستخدمين لتحديث العرض
      },
      error: (err) => {
        console.error('Error updating roles:', err);
        alert('فشل في تحديث الأدوار.');
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-permissions',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './manage-permissions.component.html',
  styleUrl: './manage-permissions.component.css'
})
export class ManagePermissionsComponent implements OnInit {
  roleId! : string;
  roleName!: string;
  roleClaims : any=[];
  constructor(private route: ActivatedRoute,private roleServices :RoleService,private router:Router){}
  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.roleId=params['Id']
    });
    this.getAllManagePermissions();
  }

  getAllManagePermissions() {
    this.roleServices.ManagePermissions(this.roleId).subscribe({
      next: (response) => {
        this.roleId = response.roleId;
        this.roleName = response.roleName;
        this.roleClaims = response.roleClaims;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  saveChanges() {
    const updatedData = {
      roleId: this.roleId,
      roleName: this.roleName,
      roleClaims: this.roleClaims
    };

    this.roleServices.updatePermissions(updatedData).subscribe({
      next: (response) => {
        console.log('update permissions sacsseded');
        this.router.navigate(['/dashboard/roles'])
      },
      error: (err) => {
        console.log('error in permissions', err);
      },
    });
  }
}

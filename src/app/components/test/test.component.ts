import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../services/roles.service';
import { test } from '../../model/test/test';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit{

  lst:test[]=[];

  constructor(private test:RolesService){

  }
  ngOnInit(): void {

    this.getall()
  }


  getall(){
    this.test.getAllRoles().subscribe({
      next:(response) =>{
          this.lst=response;
      },
      error:(error)=>{
        console.log(error);

      }
    })
  }
}

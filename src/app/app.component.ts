import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { PageLayout } from './enums/page-layout.enum';
import { PageLayoutService } from './services/page-layout.service';
import { CommonModule } from '@angular/common';
import { TestComponent } from "./components/test/test.component";
import { CardComponent } from "./components/shared/card/card.component";
import { ButtonComponent } from "./components/shared/button/button.component";
import { TextControlComponent } from "./components/shared/text-control/text-control.component";
import { TestService } from './services/test.service';
import { TableComponent } from "./components/shared/table/table.component";
import { Task } from './model/Task';
import { TaskService } from './services/task.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DashboardComponent, CommonModule, TestComponent,ReactiveFormsModule, CardComponent, ButtonComponent, TextControlComponent, TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  
handleSubmit($event: Event) {

}

  readonly PageLayout = PageLayout;
  title = 'ProjectManagment';

  constructor(public pageLayoutService:PageLayoutService,
    private testService:TestService,
    private taskService: TaskService,
    private fb: FormBuilder){}
  ngOnInit(): void {
    this.initForm();
    this.loadTasks(this.pageNumber, this.pageSize);
  
  }

  form!: FormGroup;
initForm(){
  this.form = this.fb.group({
    username: ['']
  });
}
logIn() {
 console.log(this.form.value);
 
  }













 


  tableData: (string | number | boolean)[][] = [];
  headers = ['Task Name', 'Description', 'Due Date', 'Priority', 'Status'];
  totalItems: number = 0;
  totalPages: number = 1;
  pageNumber: number = 1;
  pageSize: number = 10;
  
  
  loadTasks(pageNumber: number, pageSize: number): void {
    this.taskService.getTasks(pageNumber, pageSize).subscribe((tableData: (string | number | boolean)[][]) => {
      this.tableData = tableData;
  
    });
  }

  fetchPageData = (pageNumber: number, pageSize: number) => {
    this.loadTasks(pageNumber, pageSize);
  };



  
}





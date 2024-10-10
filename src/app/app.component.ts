import { Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { PageLayout } from './enums/page-layout.enum';
import { PageLayoutService } from './services/page-layout.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from "./components/shared/card/card.component";
import { ButtonComponent } from "./components/shared/button/button.component";
import { TextControlComponent } from "./components/shared/text-control/text-control.component";
import { TestService } from './services/test.service';
import { TableComponent } from "./components/shared/table/table.component";

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskComponent } from "./components/task/task.component";
import { ModalService } from './services/modal.service';
import { AuthComponent} from "./components/auth/auth.component";
import { LoderService } from './services/loder.service';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { NotFoundComponent } from "./components/shared/not-found/not-found.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    DashboardComponent,
    CommonModule,
    ReactiveFormsModule,
    CardComponent,
    ButtonComponent,
    TextControlComponent,
    TableComponent, TaskComponent, AuthComponent, NotFoundComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  
handleSubmit($event: Event) {

}

  isLoggedIn$!: Observable<boolean>;
  readonly PageLayout = PageLayout;
  title = 'ProjectManagment';
  constructor(public pageLayoutService:PageLayoutService,
    private testService:TestService,
    private modalService: ModalService,
    public loderService:LoderService,
    private authService:AuthService,
    private fb: FormBuilder){}
  ngOnInit(): void {
    this.initForm();
    // this.loadTasks(this.pageNumber, this.pageSize);
    this.isLoggedIn$ = this.authService.isLoggedIn$;
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













 


  // tableData: (string | number | boolean)[][] = [];
  // headers = ['Task Name', 'Description', 'Due Date', 'Priority', 'Status'];
  // totalItems: number = 0;
  // totalPages: number = 1;
  // pageNumber: number = 1;
  // pageSize: number = 10;
  
  
  // loadTasks(pageNumber: number, pageSize: number): void {
  //   this.taskService.getTasks(pageNumber, pageSize).subscribe((tableData: (string | number | boolean)[][]) => {
  //     this.tableData = tableData;
  
  //   });
  // }

  // fetchPageData = (pageNumber: number, pageSize: number) => {
  //   this.loadTasks(pageNumber, pageSize);
  // };




  










}





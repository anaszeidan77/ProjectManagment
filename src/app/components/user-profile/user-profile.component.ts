import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../model/task';
import { PriorityPipe } from '../../Pipes/priority.pipe';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [PriorityPipe, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'] // تأكد من تصحيح اسم الملف
})
export class UserProfileComponent implements OnInit {
  selectedTask: any;
  tasks: Task[] = [];
  completeTask: boolean = false;
  userName: string = localStorage.getItem("userName") as string;
  email: string = localStorage.getItem("email") as string;
  roles: string = localStorage.getItem("roles") as string;

  constructor(private taskServices: TaskService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getTaskByUser();
  }

  userId = localStorage.getItem("userId");
  
  getTaskByUser(): void {
    this.taskServices.getTaskByUserId(this.userId!).subscribe({
      next: (tasks: Task[]) => {
        console.log(tasks);
        this.tasks = tasks;
      },
      error: (error) => {
        console.error('Error fetching tasks', error);
      },
      complete: () => {
        console.log('Task data fetching completed');
      }
    });
  }

  onSubTaskSelected(sub: any, event: Event) {
    const inputElement = event.target as HTMLInputElement; // تحويل الـ event.target إلى HTMLInputElement
    sub.isCompleted = inputElement.checked; // تحديث حالة isCompleted
  }

  saveSubTasks() {
    // إعداد قائمة للتحديث بناءً على العناصر المحددة
    const updatedSubTasksTrue = this.selectedTask.subTaskDtos.filter((sub: any) => {
      return sub.isCompleted; // أخذ فقط المهام الفرعية المحددة
    });
    updatedSubTasksTrue.forEach((sub: any) => {
      this.updateSubTask(sub.subTaskId); // تحديث المهام الفرعية المحددة
    });


    this.closeModel(); // إغلاق المودال بعد الحفظ
  }

  updateSubTask(subTaskId: string) {
    this.taskServices.updateSubTask(subTaskId).subscribe({
      next: (res) => {
        console.log(`Subtask ${subTaskId} updated successfully:`, res);
      },
      error: (err) => {
        console.error(`Error updating subtask ${subTaskId}:`, err);
      }
    });
  }

  openEditModal(task: Task, modal: any): void {
    this.selectedTask = task;
    this.modalService.open(modal);
  }

  closeModel() {
    this.modalService.dismissAll();
  }
}

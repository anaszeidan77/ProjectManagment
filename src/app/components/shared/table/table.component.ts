import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() id!: string;
  @Input() class!: string;
  @Input() btnClass: string = '';
  @Input() headers: string[] = [];
  @Input() data: any[][] = [];


  @Input() width: string = '';
  @Input() color: string = '';
  @Input() backgroundColor: string = '';
  @Input() border: string = '';
  @Input() borderRadius: string = '';
 


  @Input() headerAlign: string = '';
  @Input() dataAlign: string = '';

  @Input() rowHeight: string = ''; 
  @Input() columnWidths: string[] = []; 
  @Input() sortable: boolean = false;
  @Input() filterable: boolean = false;
  @Input() hoverColor: string = ''; 
  @Input() selectedRowColor: string = '';
  @Input() pagination: boolean = false;
  @Input() pageSize: number = 10;

@Input() totalItems: number = 0;
@Input() totalPages: number = 1;
@Input() pageNumber: number = 1;
@Input() fetchPageData!: (pageNumber: number, pageSize: number) => void;

  currentPage: number = 1;
  paginatedData: any[][] = [];
  selectedRow: number | null = null;

  ngOnChanges(): void {
    if (this.pagination) {
      this.totalPages = Math.ceil(this.data.length / this.pageSize);
      this.paginateData();
    }
  }

  paginateData(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedData = this.data.slice(start, end);
  }

  previousPage(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.fetchPageData(this.pageNumber, this.pageSize);
    }
  }
  
  nextPage(): void {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.fetchPageData(this.pageNumber, this.pageSize);
    }
  }
  
  onHeaderClick(event: Event, index: number): void {
    
  }

  onRowClick(index: number): void {
    this.selectedRow = index;
  }
}


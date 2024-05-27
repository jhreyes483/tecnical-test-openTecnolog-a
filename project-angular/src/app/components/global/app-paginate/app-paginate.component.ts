import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'AppPaginateComponent',
  templateUrl: './app-paginate.component.html',
  styleUrl: './app-paginate.component.css'
})
export class AppPaginateComponent {
  @Input() currentPage: number = 1;
  @Input() lastPage: number = 1;


  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  nextPage() {
    if (this.currentPage < this.lastPage) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }
}

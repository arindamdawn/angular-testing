import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from './datatable.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [DatatableComponent],
  imports: [CommonModule, TableModule],
  exports: [DatatableComponent],
})
export class DatatableModule {}

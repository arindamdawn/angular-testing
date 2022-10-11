import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { ButtonModule as PrimengButtonModule } from 'primeng/button';

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule, PrimengButtonModule],
  exports: [ButtonComponent],
})
export class ButtonModule {}

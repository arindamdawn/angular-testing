import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline.component';
import { TimelineModule as PrimengTimelineModule } from 'primeng/timeline';

@NgModule({
  declarations: [TimelineComponent],
  imports: [CommonModule, PrimengTimelineModule],
  exports: [TimelineComponent],
})
export class TimelineModule {}

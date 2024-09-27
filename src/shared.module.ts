// shared.module.ts
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonTimepickerComponent } from './custom-timepicker/custom-timepicker.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CommonTimepickerComponent],
  imports: [CommonModule, FormsModule, NgbModule],
  exports: [CommonTimepickerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class SharedModule {}

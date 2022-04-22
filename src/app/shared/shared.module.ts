import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomDropdownDirective } from './directives/custom-dropdown.directive';
import { LoadingSpinner } from './components/loading-spinner.component';

@NgModule({
  declarations: [CustomDropdownDirective, LoadingSpinner],
  imports: [FormsModule, CommonModule],
  exports: [CustomDropdownDirective, LoadingSpinner],
})
export class SharedModule {}

import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `<div class="d-flex justify-content-center text-primary">
    <div
      class="spinner-border"
      style="width: 4rem; height: 4rem;"
      role="status"
    ></div>
  </div>`,
})
export class LoadingSpinner {}

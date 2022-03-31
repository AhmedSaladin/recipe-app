import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loadedFeature: String = 'recipe';
  onNavigate(feature: String) {
    this.loadedFeature = feature;
  }
}

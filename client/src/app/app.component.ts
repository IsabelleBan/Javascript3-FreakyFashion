import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from './public/components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'client';

  constructor(private http: HttpClient) {
    this.http.get('/api/tasks').subscribe((tasks) => {
      console.log(tasks);
    });
  }
}

import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService],
})
export class AppComponent {
  constructor(private primeNGConfig: PrimeNGConfig) {}
  title = 'my-angular-store';

  ngOnInit() {
    this.primeNGConfig.ripple = true;
  }
}

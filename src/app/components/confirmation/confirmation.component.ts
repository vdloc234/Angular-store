import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {
  constructor(private route: ActivatedRoute) {}
  fullName: string | null = '';
  totalPrice: number | null = 0;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.fullName = params.get('fullName');
      this.totalPrice = Number(params.get('totalPrice'));
    });
  }
}

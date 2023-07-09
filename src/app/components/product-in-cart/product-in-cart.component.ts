import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICartProduct } from 'src/app/models';

@Component({
  selector: 'app-product-in-cart',
  templateUrl: './product-in-cart.component.html',
  styleUrls: ['./product-in-cart.component.css'],
})
export class ProductInCartComponent implements OnInit {
  @Input() productInCart!: ICartProduct;
  @Output() removeCartProduct: EventEmitter<number> = new EventEmitter();
  @Output() changeCartProductQuantity: EventEmitter<{
    id: number;
    quantity: number;
  }> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onChangeQuantity(id: number, event: any) {
    const quantity = event.target.value;
    this.changeCartProductQuantity.emit({ id, quantity });
  }

  onDeleteItem(productId: number) {
    this.removeCartProduct.emit(productId);
  }
}

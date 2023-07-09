import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { ICartProduct } from 'src/app/models';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartProducts: ICartProduct[] = [];
  totalPrice: number = 0;
  formError: boolean = false;

  constructor(
    private messageService: MessageService,
    private productService: ProductService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.cartProducts = this.productService.getProductInCart();
    this.calculateTotalPrice();
  }

  showMessage(params: {
    type: 'success' | 'info' | 'error';
    message: string;
    summary: string;
  }) {
    const { type, summary, message } = params;
    this.messageService.add({
      severity: type,
      summary: summary,
      detail: message,
    });
  }

  showSuccessMessage(message: string) {
    this.showMessage({ type: 'success', message, summary: 'Success' });
  }

  showErrorMessage(message: string) {
    this.showMessage({ type: 'error', message, summary: 'Error' });
  }

  clearMessage() {
    this.messageService.clear();
  }

  onRemoveProduct(id: number) {
    const newCartProducts = this.cartProducts.filter(
      (cartProduct) => cartProduct.id !== id
    );

    this.cartProducts = newCartProducts;
    this.productService.addProductToCart(this.cartProducts);

    this.showSuccessMessage('Remove product successfully!');
    this.calculateTotalPrice();
  }

  onChangeQuantityOfProduct({
    id,
    quantity,
  }: {
    id: number;
    quantity: number;
  }) {
    if (quantity < 1) {
      this.showErrorMessage('Invalid quantity!');
      this.formError = true;
      return;
    }

    this.clearMessage();
    this.formError = false;
    this.cartProducts.forEach((cartProduct) => {
      if (cartProduct.id === id) {
        cartProduct.quantity = quantity.toString();
      }
    });
    this.productService.addProductToCart(this.cartProducts);
    this.calculateTotalPrice();
  }

  onCheckoutSuccess(fullName: string): void {
    if (this.formError) {
      this.showErrorMessage(
        'Quantity/Quantities of some products are invalid! Please modify it/them before checkout. '
      );
      return;
    }

    this.productService.clearCart();
    this.route.navigateByUrl(`confirmation/${fullName}/${this.totalPrice}`);
  }

  calculateTotalPrice() {
    this.totalPrice = +this.cartProducts
      .reduce(
        (sum: number, cartProduct: ICartProduct) =>
          sum + cartProduct.price * +cartProduct.quantity,
        0
      )
      .toFixed(2);
  }
}

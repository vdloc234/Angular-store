import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { quantityOptions } from 'src/app/constant';
import { ICartProduct, IProduct } from 'src/app/models';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input()
  product!: IProduct;

  constructor(
    private messageService: MessageService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {}

  quantityOptions: string[] = quantityOptions;
  quantityOfProduct: string = '1';

  onChangeOptions(option: string) {
    this.quantityOfProduct = option;
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

  showInfoMessage(message: string) {
    this.showMessage({ type: 'info', message, summary: 'Updated' });
  }

  showErrorMessage(message: string) {
    this.showMessage({ type: 'error', message, summary: 'Error' });
  }

  onAddItem(event: any) {
    const chosenQuantity = this.quantityOfProduct;
    const cartProducts: ICartProduct[] = this.productService.getProductInCart();

    const productIdx = cartProducts.findIndex(
      (item) => item.id === this.product.id
    );

    if (!cartProducts.length || productIdx === -1) {
      const newProductToCart: ICartProduct = {
        ...this.product,
        quantity: chosenQuantity,
      };
      const message = `Added to cart!`;
      this.showSuccessMessage(message);
      this.productService.addProductToCart([...cartProducts, newProductToCart]);
      return;
    }

    const currentQuantityOfCartProduct = +cartProducts[productIdx].quantity;
    const newQuantityOfCartProduct =
      currentQuantityOfCartProduct + +chosenQuantity;

    cartProducts[productIdx].quantity = newQuantityOfCartProduct.toString();
    const message = `Updated quantity of ${this.product.name} from ${currentQuantityOfCartProduct} to ${newQuantityOfCartProduct} in cart!`;
    this.showInfoMessage(message);
    this.productService.addProductToCart([...cartProducts]);
  }
}

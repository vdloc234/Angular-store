import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { quantityOptions } from 'src/app/constant';
import { ICartProduct, IProduct } from 'src/app/models';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent implements OnInit {
  id: number | null = null;
  products: IProduct[] = [];
  quantityOptions: string[] = quantityOptions;
  quantityOfProduct: string = '1';
  product: IProduct = {} as IProduct;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
    });

    this.productService.getAllProducts().subscribe((res) => {
      this.products = res;
      this.product = res.find((product) => product.id === this.id) as IProduct;
    });
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

  onChangeOptions(option: string) {
    this.quantityOfProduct = option;
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

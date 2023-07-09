import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICartProduct, IProduct } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  localStore = window.localStorage;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('http://localhost:4200/assets/data.json');
  }

  addProductToCart(product: ICartProduct[]): void {
    this.localStore.setItem('cart', JSON.stringify(product));
  }

  getProductInCart(): ICartProduct[] | [] {
    const productInCart = this.localStore.getItem('cart');
    return productInCart ? JSON.parse(productInCart) : [];
  }

  clearCart(): void {
    this.localStore.clear();
  }
}

import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  constructor(private productService: ProductService) {}

  products: IProduct[] = [];

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((res) => {
      this.products = res;
    });
  }
}

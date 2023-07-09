import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HeaderComponent } from 'src/layout/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { ProductItemDetailComponent } from './components/product-item-detail/product-item-detail.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductListComponent } from './components/product-list/product-list.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ProductInCartComponent } from './components/product-in-cart/product-in-cart.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    HeaderComponent,
    ProductItemComponent,
    CartComponent,
    ConfirmationComponent,
    ProductItemDetailComponent,
    ProductInCartComponent,
    CustomerFormComponent,
  ],
  imports: [
    BrowserModule,
    RippleModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastModule,
    ButtonModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

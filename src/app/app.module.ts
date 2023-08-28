import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteHeaderComponent } from './sharedcomponents/site-header/site-header.component';
import { SiteFooterComponent } from './sharedcomponents/site-footer/site-footer.component';
import { IndexComponent } from './pages/index/index.component';
import { SliderComponent } from './pages/index/slider/slider.component';
import { SpecialProductsComponent } from './pages/index/special-products/special-products.component';
import { NewProductsComponent } from './pages/index/new-products/new-products.component';
import { FavoriteProductsComponent } from './pages/index/favorite-products/favorite-products.component';
import { LatestNewsComponent } from './pages/index/latest-news/latest-news.component';
import { BrandsComponent } from './pages/index/brands/brands.component';
import { SliderService } from './Services/slider.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { EshopInterceptor } from 'src/Utilities/EshopInterceptor';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductsService } from './Services/products.service';
import { SingleProductComponent } from './SharedComponents/single-product/single-product.component';
import { NgxLoadingModule } from 'ngx-loading';
import { TestComponent } from './pages/test/test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import { Component } from '@angular/core';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { HeaderBasketComponent } from './SharedComponents/header-basket/header-basket.component';
import { EditAccountComponent } from './pages/account/edit-account/edit-account.component';


@NgModule({
  declarations: [
    AppComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    IndexComponent,
    SliderComponent,
    SpecialProductsComponent,
    NewProductsComponent,
    FavoriteProductsComponent,
    LatestNewsComponent,
    BrandsComponent,
    AboutUsComponent,
    ContactUsComponent,
    LoginComponent,
    RegisterComponent,
    ActivateAccountComponent,
    ProductsComponent,
    SingleProductComponent,
    TestComponent,
    ProductDetailComponent,
    HeaderBasketComponent,
    EditAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    MatSliderModule,
    FormsModule,
    NgxLoadingModule.forRoot({
      fullScreenBackdrop:true
    }),
    SweetAlert2Module.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [SliderService,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:EshopInterceptor,
    multi:true
  },CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { ProductsComponent } from './pages/products/products.component';
import { TestComponent } from './pages/test/test.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { AuthGuardService } from './Services/AuthGuardService';
import { EditAccountComponent } from './pages/account/edit-account/edit-account.component';
import { BasketUserComponent } from './pages/account/basket-user/basket-user.component';

const routes: Routes = [
  {path:'',component:IndexComponent},
  {path:'about-us', component:AboutUsComponent},
  {path:'contact-us', component:ContactUsComponent},
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'activate-account',component:ActivateAccountComponent},
  {path:'products', component:ProductsComponent},
  {path:'products/:productId/:productName',component:ProductDetailComponent},
  {path:'user/edit',component:EditAccountComponent,canActivate:[AuthGuardService]},
  {path:'user/basket',component:BasketUserComponent,canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

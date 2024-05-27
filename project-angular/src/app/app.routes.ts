import { Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
/**************** */
import { ProductMainComponent } from './components/product/product-main/product-main.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserMainComponent } from './components/user/user-main/user-main.component';
import { UserRegisterComponent } from './components/user/user-register/user-register.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';


export const routes: Routes = [
  {
    path: 'products',
    component: ProductMainComponent,
  },
  {
    path: 'product/detail/:id',
    component: ProductDetailComponent,
    data: { case: 'd' }
  },
  {
    path: 'product/create',
    component: ProductDetailComponent,
    data: { case: 'c' }
  },
  {
    path: 'product/edition/:id',
    component: ProductDetailComponent,
    data: { case: 'e' }
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: UserLoginComponent
  },
  {
    path: 'users',
    component: UserMainComponent
  },
  {
    path: 'register',
    component: UserRegisterComponent
  },
  {
    path: 'products',
    component: ProductMainComponent
  },

  /****************************** */
  {
    path: '**',
    component: ErrorComponent,
    // canActivate: [IdentityGuard]
  },


]
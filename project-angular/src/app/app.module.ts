import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
/* libs para routes */
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
/* archivo creado */
import { routes } from './app.routes';
/* */

/* libs para formularios */
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; /* se debe cargar este modulo para leer formularios*/
/* */
import { AppComponent } from './app.component';

/* componentes creados */
import { ErrorComponent } from './components/error/error.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { EsParPipe } from './pipes/espar.pipe';

/* services axios*/
import { ProductService } from './services/product/product.service'; 
import { UserService } from './services/user/user.service';
/* */

/* modulos creados */
import { ProductMainComponent } from './components/product/product-main/product-main.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserMainComponent } from './components/user/user-main/user-main.component';
import { AppPaginateComponent } from './components/global/app-paginate/app-paginate.component';
import { UserRegisterComponent } from './components/user/user-register/user-register.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';





@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HeaderComponent,
    FooterComponent,
    EsParPipe,
    ProductMainComponent,
    UserLoginComponent,
    UserMainComponent,
    AppPaginateComponent,
    UserRegisterComponent,
    ProductDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, /* se debe cargar este modulo*/
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    /* importar los servicios aca */
    ProductService,
    UserService,
    /** */
    
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

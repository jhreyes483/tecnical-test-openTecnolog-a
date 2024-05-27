import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product/product.service'; /* se debe agregar siempre en el appmodule */
import Swal from 'sweetalert2';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-product-main',
  templateUrl: './product-main.component.html',
  styleUrl: './product-main.component.css'
})
export class ProductMainComponent implements OnInit {
  public products: any
  public users: any
  public currentPage: any;
  public lastPage: any;
  public isLoader : any;
  public dataSearch : any;

  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.isLoader = false;
    this.dataSearch = { q: null, page : 1 }
  }

  ngOnInit() {
    this.getProducts();
  }

  changePage(page : any){
    this.dataSearch.page = page;
    this.getProducts()
  }

  redirectToProduct(id : any , caseCrud : any){
    let route :any =[];
    switch(caseCrud){
      case 'c': route = ['product/create']; break;
      case 'd': route = ['product/detail', id]; break;
      case 'e': route = ['product/edition', id]; break;
    }
    this._router.navigate(route);
  }


  deleteProduct(id : any){
    this._productService.deleteProduct(id).then(response => {
      response = response.data;
      if (response.status) {
        this.getProducts();
        Swal.fire({
          icon: 'success',
          title: 'Ok',
          text: 'Elimino producto'
        });

      } else {
        // Muestra una alerta con SweetAlert2 si hay un error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al elimino producto. Por favor, inténtelo de nuevo más tarde.'
        });
      }
      response = response.data;
    }).catch(error => {
      // Muestra una alerta con SweetAlert2 si hay un error en la solicitud
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al elimino producto. Por favor, inténtelo de nuevo más tarde.'
      });
      this.isLoader = false; // Asegúrate de detener el loader en caso de error
    });

    console.log('delete id->',id);
  }

  getProducts() {
    this.isLoader = true;
    this._productService.getProduts(this.dataSearch).then(response => {
      response = response.data;
      if (response.status) {

        this.isLoader    = false;
        this.products    = response.products.data;
        this.currentPage = response.products.current_page;
        this.lastPage    = response.products.last_page;
      } else {
        // Muestra una alerta con SweetAlert2 si hay un error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al obtener los productos.'
        });
      }
      response = response.data;
    }).catch(error => {
      // Muestra una alerta con SweetAlert2 si hay un error en la solicitud
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al obtener los productos. Por favor, inténtelo de nuevo más tarde.'
      });
      this.isLoader = false; // Asegúrate de detener el loader en caso de error
    });
  }
}





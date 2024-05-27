import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product } from '../../../models/product/product';
import { ProductService } from '../../../services/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  public id: any;
  public case: any;
  public title: any;
  public product: any;
  public disabled: any;
  public isLoader: any;

  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.product = new Product(1, '', '', '');
    this.disabled = false;

  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.id = params['id']
    });
    this._route.data.subscribe(data => {
      this.case = data['case']
    });
    this.setPage();
    console.log('this.product', this.product)
  }


  setPage() {
    console.log(this.case);
    switch (this.case) {
      case 'e':
        this.title = 'Editar producto'
        this.getProduct();
        break;
      case 'c':
        this.title = 'Crear producto'
        break;
      case 'd':
        this.title = 'Detalle de producto'
        this.getProduct();
        this.disabled = true;
        break;
    }
  }

  getProduct() {
    this.isLoader = true;
    this._productService.getProduct(this.id).then(response => {
      response = response.data;
      if (response.status) {
        this.isLoader = false;
        this.product = response.product;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al obtener los productos.'
        });
      }
      response = response.data;
    }).catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al obtener los productos. Por favor, inténtelo de nuevo más tarde.'
      });
      this.isLoader = false;
    });
  }

  onCreate() {
    this._productService.storeProduct(this.product).then(response => {
      this.isLoader = true;
      response = response.data;
      if (response.status) {
        this.isLoader = false;
        Swal.fire({
          icon: 'success',
          title: 'Ok',
          text: 'Producto creado'
        }).then(() => {
          this._router.navigate(['/products']);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al crear producto, intente más tarde'
        });
      }
      response = response.data;
    }).catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al crear producto, intente más tarde.'
      });
      this.isLoader = false;
    });
    console.log('onCreate', this.product)
  }

  onUpdate() {
    this.isLoader = true;
    this._productService.updateProduct(this.product).then(response => {
      response = response.data;
      if (response.status) {
        this.isLoader = false;
        Swal.fire({
          icon: 'success',
          title: 'Ok',
          text: 'Producto actualizado'
        }).then(() => {
          this._router.navigate(['/products']);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al crear producto, intente más tarde'
        });
      }
      response = response.data;
    }).catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al crear producto, intente más tarde.'
      });
      this.isLoader = false;
    });
    console.log('onSave', this.product)

  }
  

}

import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/user/login';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

  public status;
  public user;
  public isSubmit;
  public isLoader;
  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {

    this.status = '';
    this.isSubmit = false;
    this.isLoader = false;
    this.user = new User('', '');
  }

  showCredentialsAlert() {
    Swal.fire({
      title: 'Credenciales Públicas de Ingreso',
      html: '<p>Correo: jav-rn@hotmail.com</p><p>Contraseña: password</p> ',
      icon: 'info'
    });
  }

  onSubmit(form: any) {
    this.isSubmit = true;
    this.isLoader = true;
    this._userService.login(this.user).then(response => {
      response = response.data;
      console.log(response.data);

      if (response.status && response.status === "success") {
        this.isLoader = false;
        this._userService.autLocalStorage(response.authorisation.token, response.user);
        this._router.navigate([this._userService.routeHome]);
        Swal.fire({
          icon: 'success',
          title: 'Bienvendo',
          text: 'login ok'
        });


      } else {

        Swal.fire({
          icon: 'error',
          title: 'Credenciales incorrectas',
          text: 'Intente nuevamente'
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
}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../models/user/user';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent implements OnInit {
  public page_title: string;
  public user: User;
  public status: string;
  public isSubmit: boolean;
  public cities: any;
  public isLoader: any;


  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {

    this.page_title = 'Registrate';
    this.status = '';
    this.isSubmit = false;
    this.user = new User(1, '', '', '', '', '', '', '');
  }

  onSubmit(form: any) {
    this.isSubmit = true;
    console.log(this.user)
    let resp = this._userService.register(this.user).then(response => {
      response = response.data;
      if (response.status) {
        form.reset();
        Swal.fire({
          icon: 'success',
          text: 'Se registro correctamente'
        }).then(() => {
          this._router.navigate(['/login']);
        });

      } else {
        Swal.fire({
          icon: 'success',
          text: 'Error a registrar, intente más tarde'
        })
      }
    }).catch(error => {
      Swal.fire({
        icon: 'success',
        text: 'Error a registrar, intente más tarde.'
      })
    });
  }

  ngOnInit() {
    this.user.city_id = 0;
    this.getComplements();
  }

  getComplements() {
    this._userService.getComplements().then(response => {
      response = response.data;
      if (response.status) {
        this.cities = response.cities;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al consutar cities, intente más tarde.'
        });
      }
      response = response.data;
    }).catch(error => {
      // Muestra una alerta con SweetAlert2 si hay un error en la solicitud
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al consutar cities, intente más tarde'
      });
      console.log('error-->', error);
      this.isLoader = false; // Asegúrate de detener el loader en caso de error
    });
  }


}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrl: './user-main.component.css'
})
export class UserMainComponent implements OnInit {
  public users: any;
  public currentPage: any;
  public lastPage: any;
  public isLoader: any;
  public cities: any;
  public dataSearch : any;
  constructor(
    private _userService: UserService,
  ) {
    this.isLoader = true;

  }

  ngOnInit(): void {
    this.setDefaultValue();
    this.getUsers();
    this.getComplements();
  }

  setDefaultValue(){
    this.dataSearch = {page: 1, q: null, c: 0}
  }


  getUsers() {
    this._userService.getUsers( this.dataSearch ).then(response => {
      response = response.data;
      if (response.status) {
        this.isLoader = false;
        this.users = response.users.data;
        this.currentPage = response.users.current_page;
        this.lastPage = response.users.last_page;
        console.log(this.users);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al consutar users, intente más tarde.'
        });
      }
      response = response.data;
    }).catch(error => {
      // Muestra una alerta con SweetAlert2 si hay un error en la solicitud
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al consutar users, intente más tarde'
      });
      //console.log('error-->', error);
      this.isLoader = false; // Asegúrate de detener el loader en caso de error
    });
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

  changePage(page : any){
    this.dataSearch.page = page;
    this.getUsers()
  }
}

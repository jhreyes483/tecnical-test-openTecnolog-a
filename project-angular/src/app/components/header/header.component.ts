import { Component, DoCheck } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})


export class HeaderComponent implements DoCheck {
  public checkToken : any;
  public entity : any;

  constructor(
    private _userService : UserService,
    private _route: ActivatedRoute,
    private _router: Router,
  ){
  }

  ngDoCheck(): void {
    this.checkToken = this._userService.existToken();
    this.entity = this._userService.getIdentity();
  }

  logout(){
    this._userService.logoutToken()
    this._router.navigate(['/login']);
    Swal.fire({
      icon: 'success',
      title: 'Ok',
      text: 'Cerro sesión'
    });
  }



}

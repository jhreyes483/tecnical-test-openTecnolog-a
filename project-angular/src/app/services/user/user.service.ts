import { Injectable } from "@angular/core";
import { DadService } from '../dad.service';


@Injectable()
export class UserService extends DadService {

    constructor() {
        super();
    }

    async register(user: any): Promise<any> {
        return await this.axios.post(this.base_url + 'api/user', user);
    }

    async login(user: any): Promise<any> {
        return await this.axios.post(this.base_url + 'api/login', user);
    }

    async getUsers(body: any): Promise<any> {
        return await this.axios.post(this.base_url + 'api/user/index', body);
    }

    async getComplements(): Promise<any>{
        return await this.axios.get(this.base_url + 'api/user/get_complements');
    }

}

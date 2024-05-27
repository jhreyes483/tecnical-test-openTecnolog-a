import { Injectable } from "@angular/core";
import { DadService } from '../dad.service';


@Injectable()
export class ProductService extends DadService{

    constructor() {
        super();
    }

    async getProduts(body : any) : Promise<any>  {
        return await this.axios.post(this.base_url + 'api/product/index', body);
    } 

    async getProduct(id : any) : Promise<any> {
        return await this.axios.get(this.base_url + 'api/product/'+id);
    }

    async storeProduct(product : any) : Promise <any>{
        return await this.axios.post(this.base_url + 'api/product/', product);
    }

    async updateProduct(product : any) : Promise <any>{
        return await this.axios.put(this.base_url + 'api/product/' + product.id, product);
    }

    async deleteProduct(id : any) : Promise <any>{
        return await this.axios.delete(this.base_url + 'api/product/' + id);
    }

}
